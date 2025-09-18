import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PaperAirplaneIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// FAQs
const FAQs = [
  { question: "delivery", answer: "🚚 We deliver 24/7 in all major areas. Average delivery time is 30-40 minutes." },
  { question: "minimum order", answer: "🍴 The minimum order is ₹200. For orders below that, a delivery fee of ₹30 applies." },
  { question: "delivery charge", answer: "💰 Free delivery above ₹500. Otherwise, ₹30–50 based on distance." },
  { question: "track", answer: "📍 Track your order in 'My Orders'. Or share your order ID here and I’ll check for you!" },
  { question: "payment", answer: "💳 We accept UPI, Credit/Debit Cards, Netbanking, Wallets, and Cash on Delivery." },
  { question: "refund", answer: "⏳ Refunds for failed/returned orders reflect within 5-7 business days." },
  { question: "offers", answer: "🎁 Current offers:\n- FOODIE20 → 20% off above ₹500\n- FIRST100 → ₹100 off your first order\n- FESTIVE50 → 50% off desserts this week!" },
  { question: "loyalty", answer: "⭐ Earn 5 points for every ₹100 spent. Redeem 100 points = ₹50 off." },
  { question: "vegetarian", answer: "🥗 Yes, we have 100% vegetarian restaurants and vegan options too!" },
  { question: "menu", answer: "🍽️ Categories: Pizza, Burgers, Biryani, Desserts, Beverages.\nPopular: Margherita Pizza, Cheeseburger, Chicken Biryani, Chocolate Lava Cake." },
  { question: "account", answer: "👤 You can update your profile, address, and saved payment methods in Settings." },
  { question: "password", answer: "🔑 Forgot password? Use 'Forgot Password' option on login or contact support." },
  { question: "contact", answer: "☎️ Call 1800-123-456 (9AM–11PM) or mail support@foodieapp.com" },
  { question: "hygiene", answer: "🧼 All restaurants follow FSSAI hygiene standards and contactless delivery." },
  { question: "cancel order", answer: "⚠️ Orders can be cancelled within 5 minutes of placing, else charges may apply." },
  { question: "feedback", answer: "💬 We’d love your feedback! Type your review or rate us ⭐⭐⭐⭐⭐" },
];


const sampleMenu = {
  categories: ["Pizza", "Burgers", "Sushi", "Desserts", "Beverages"],
  popular: ["Margherita Pizza", "Cheeseburger", "Chocolate Lava Cake", "Coke"],
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋! I'm FoodieBot. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const lower = userMsg.text.toLowerCase();
      let botReply = "";

      // FAQs
      const faq = FAQs.find((f) => lower.includes(f.question));
      if (faq) botReply = faq.answer;

      // Menu requests
      else if (
        lower.includes("menu") ||
        lower.includes("food") ||
        lower.includes("show me")
      ) {
        botReply = `🍽️ Here are our categories: ${sampleMenu.categories.join(
          ", "
        )}\nPopular dishes: ${sampleMenu.popular.join(", ")}`;
      }

      // Place order
      else if (lower.includes("order") || lower.includes("buy")) {
        botReply =
          "🛒 Sure! Please tell me the dish name and quantity, e.g., '1 Margherita Pizza'.";
      }

      // Track order
      else if (lower.includes("track order") || lower.includes("where is my")) {
        botReply =
          "🚚 Your order is on the way! Estimated delivery in 25-30 minutes.";
      }

      // Offers
      else if (
        lower.includes("offers") ||
        lower.includes("coupon") ||
        lower.includes("discount")
      ) {
        botReply =
          "🎁 You can use promo code FOODIE20 for 20% off on orders above ₹500!";
      }

      // Feedback
      else if (
        lower.includes("feedback") ||
        lower.includes("rate") ||
        lower.includes("review")
      ) {
        botReply =
          "⭐ We'd love your feedback! Please type your review or rate us out of 5.";
      }

      // Fallback
      else {
        botReply =
          "Thanks for your message! Our support team will get back to you shortly.";
      }

      setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.1 }}
          className="fixed bottom-6 right-6 z-50 bg-red-600 text-white p-4 rounded-full shadow-lg focus:outline-none"
        >
          <ChatBubbleLeftRightIcon className="w-6 h-6" />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-20 right-6 w-80 sm:w-96 bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-red-600 text-white px-4 py-3">
              <h3 className="font-semibold">FoodieBot</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Messages (scrollable area) */}
            <div className="flex-1 p-4 overflow-y-auto max-h-96 space-y-3">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-3 py-2 rounded-lg text-sm max-w-[75%] ${
                      msg.from === "user"
                        ? "bg-red-600 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.text.split("\n").map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center border-t border-gray-200"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message…"
                className="flex-1 px-3 py-2 text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="p-2 text-red-600 hover:text-red-700 focus:outline-none"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
