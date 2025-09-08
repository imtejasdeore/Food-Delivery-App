const express = require("express");
const { body, validationResult } = require("express-validator");
const { auth } = require("../middleware/auth");
const Order = require("../models/Order");
const OrderTracking = require("../models/OrderTracking");
const User = require("../models/User");

const router = express.Router();

// Utility: Generate tracking number
const generateTrackingNumber = () => {
  return "TRK-" + Date.now() + "-" + Math.floor(Math.random() * 10000);
};

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post(
  "/",
  auth,
  [
    body("items")
      .isArray({ min: 1 })
      .withMessage("Order must have at least one item"),
    body("totalAmount").isNumeric().withMessage("Total amount is required"),
    body("shippingAddress.type")
      .isIn(["home", "office", "work"])
      .withMessage("Type must be home, office, or work"),
    body("shippingAddress.street").notEmpty().withMessage("Street is required"),
    body("shippingAddress.city").notEmpty().withMessage("City is required"),
    body("shippingAddress.state").notEmpty().withMessage("State is required"),
    body("shippingAddress.zipCode").notEmpty().withMessage("Zip code is required"),
    body("paymentDetails").notEmpty().withMessage("Payment details are required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { items, totalAmount, shippingAddress, paymentDetails } = req.body;

      const formattedItems = items.map((item) => ({
        ...item,
        customizations: item.customizations || [],
      }));

      const order = new Order({
        user: req.user._id,
        items: formattedItems,
        totalAmount,
        shippingAddress,
        paymentDetails,
      });

      const createdOrder = await order.save();

      const estimatedDeliveryTime = new Date();
      estimatedDeliveryTime.setMinutes(estimatedDeliveryTime.getMinutes() + 45);

      const trackingNumber = generateTrackingNumber();

      const orderTracking = new OrderTracking({
        orderId: createdOrder._id,
        user: req.user._id,
        trackingNumber,
        currentStatus: "Pending",
        estimatedDeliveryTime,
        deliveryAddress: shippingAddress, // ✅ includes type
        statusHistory: [
          {
            status: "Pending",
            timestamp: new Date(),
            notes: "Order placed successfully",
          },
        ],
      });

      await orderTracking.save();

      res.status(201).json({
        ...createdOrder.toObject(),
        trackingNumber: orderTracking.trackingNumber,
      });
    } catch (error) {
      console.error("Error in POST /api/orders:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);


// @route   GET /api/orders
// @desc    Get all orders for a user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    console.error("Error in GET /api/orders:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/orders/:id
// @desc    Get an order by ID
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product", "name image price"); 

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (
      order.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // ✅ FIX: use order.items (not order.orderItems)
    res.json({ ...order.toObject(), items: order.items });
  } catch (error) {
    console.error("Error in GET /api/orders/:id:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// @route   GET /api/orders/tracking/:trackingNumber
// @desc    Get order tracking by tracking number
// @access  Private
router.get("/tracking/:trackingNumber", auth, async (req, res) => {
  try {
    const tracking = await OrderTracking.findOne({
      trackingNumber: req.params.trackingNumber,
    }).populate("orderId", "items totalAmount createdAt");

    if (!tracking) {
      return res
        .status(404)
        .json({ message: "Tracking information not found" });
    }

    if (
      tracking.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json(tracking.getCurrentTrackingInfo());
  } catch (error) {
    console.error("Error in GET /tracking/:trackingNumber:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/orders/:id/tracking
// @desc    Get order tracking by order ID
// @access  Private
router.get("/:id/tracking", auth, async (req, res) => {
  try {
    const tracking = await OrderTracking.findOne({
      orderId: req.params.id,
    }).populate("orderId", "items totalAmount createdAt");

    if (!tracking) {
      return res
        .status(404)
        .json({ message: "Tracking information not found" });
    }

    if (
      tracking.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json(tracking);
  } catch (error) {
    console.error("Error in GET /:id/tracking:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/orders/:id/tracking
// @desc    Update order tracking status (Admin only)
// @access  Private (Admin)
router.put(
  "/:id/tracking",
  auth,
  [
    body("status")
      .isIn([
        "Pending",
        "Confirmed",
        "Preparing",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ])
      .withMessage("Invalid status"),
    body("notes").optional().isString(),
    body("location").optional().isString(),
  ],
  async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admin only." });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { status, notes, location } = req.body;

      const tracking = await OrderTracking.findOne({ orderId: req.params.id });
      if (!tracking) {
        return res
          .status(404)
          .json({ message: "Tracking information not found" });
      }

      await tracking.updateStatus(status, notes, req.user._id, location);
      await Order.findByIdAndUpdate(req.params.id, { status });

      res.json({
        message: "Tracking status updated successfully",
        tracking: tracking.getCurrentTrackingInfo(),
      });
    } catch (error) {
      console.error("Error in PUT /:id/tracking:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
