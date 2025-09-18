import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  StarIcon,
  ClockIcon,
  TruckIcon,
  ShieldCheckIcon,
  HeartIcon,
  FireIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import axios from "../utils/axios";
import { useAuth } from "../contexts/AuthContext";
import PromoBanner from "../components/promotions/PromoBanner";
import OfferCard from "../components/promotions/OfferCard";
import ProductCard from "../components/product/ProductCard";

import ChatBot from "../pages/ChatBot";   // <-- Add at the top with other imports


const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [reviews, setReviews] = useState(2500);

   useEffect(() => {
    const interval = setInterval(() => {
      setReviews(prev => prev + 1);
    }, 2000); // 2000 ms = 2 seconds

    return () => clearInterval(interval); // cleanup
  }, []);

  // ✅ 2) Scroll to top on first render
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []); // runs only once, when the component mounts


  const handleOrderNow = () => {
    if (isAuthenticated) {
      navigate("/menu");
    } else {
      navigate("/login");
    }
  };

  // Mock offers data
  const offers = [
    {
      id: 1,
      title: "Pizza Combo Deal",
      description: "Get any large pizza with garlic bread and coke",
      discount: 30,
      code: "PIZZA30",
      image: "/user.jpg",
      category: "Pizza",
      validUntil: "Dec 31",
      minOrder: 500,
      type: "combo",
      popular: true,
    },
    {
      id: 2,
      title: "Burger Bonanza",
      description: "Buy 2 burgers and get 1 free with any beverage",
      discount: 40,
      code: "BURGER40",
      image: "/user.jpg",
      category: "Burgers",
      validUntil: "Dec 25",
      minOrder: 300,
      type: "discount",
      popular: true,
    },
    {
      id: 3,
      title: "Free Delivery Weekend",
      description: "Free delivery on all orders this weekend",
      discount: 100,
      code: "FREEDEL",
      image: "/user.jpg",
      category: "",
      validUntil: "This Weekend",
      minOrder: 200,
      type: "free-delivery",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get("/api/products/featured"),
          axios.get("/api/products/categories"),
        ]);

        setFeaturedProducts(productsRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const features = [
    {
      icon: TruckIcon,
      title: "Fast Delivery",
      description: "Get your food delivered in 30 minutes or less",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: ShieldCheckIcon,
      title: "Quality Assured",
      description: "Fresh ingredients and hygienic preparation",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: HeartIcon,
      title: "Made with Love",
      description: "Every dish is prepared with care and passion",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: ClockIcon,
      title: "24/7 Service",
      description: "Order anytime, day or night",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const testimonials = [
    {
      name: "Tejas Deore",
      rating: 5,
      comment:
        "Amazing food quality and super fast delivery! The customization options are fantastic.",
      image: "/user.jpg",
      location: "Regular Customer",
    },
    {
      name: "Ganesh Patil",
      rating: 5,
      comment:
        "Best food delivery app I've used. The pizza customization is exactly what I needed.",
      image: "/user.jpg",
      location: "Food Blogger",
    },
    {
      name: "Kabir Pathan",
      rating: 4,
      comment:
        "Great variety of options and the app is very user-friendly. Highly recommended!",
      image: "/user.jpg",
      location: "New Customer",
    },
  ];

  // Floating delivery images configuration
  const floatingImages = [
    {
      src: "/delivery1.jpg",
      type: "image",
      className:
        "w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-white shadow-xl",
      style: { top: "20%", left: "5%" },
    },
    {
      src: "/delivery2.jpg",
      type: "image",
      className:
        "w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-4 border-white shadow-xl",
      style: { top: "60%", left: "10%" },
    },
    {
      src: "/delivery3.jpg",
      type: "image",
      className:
        "w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-4 border-white shadow-xl",
      style: { top: "30%", right: "8%" },
    },
    {
      src: "/delivery4.jpg",
      type: "image",
      className:
        "w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-white shadow-xl",
      style: { bottom: "20%", right: "5%" },
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 to-orange-50 overflow-hidden">
        <div className="absolute inset-0 bg-white opacity-20"></div>
        <div className="container-mobile section-padding relative z-10">
          <div className="text-center relative">
            {/* Floating Delivery Images */}
            {floatingImages.map((image, index) => (
              <motion.div
                key={index}
                className={`absolute hidden md:block z-10 ${image.className}`}
                style={image.style}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -15, 0],
                }}
                transition={{
                  opacity: { duration: 0.5, delay: index * 0.2 },
                  scale: { duration: 0.5, delay: index * 0.2 },
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.5,
                    ease: "easeInOut",
                  },
                }}
              >
                {image.type === "video" ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover rounded-full"
                  >
                    <source src={image.src} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={image.src}
                    alt="Delivery illustration"
                    className="w-full h-full object-cover rounded-full"
                  />
                )}
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center bg-red-100 text-red-700 rounded-full px-4 py-2 mb-6 text-sm font-medium"
              >
                <FireIcon className="w-4 h-4 mr-1" />
                <span>Most ordered food this week</span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-4 sm:mb-6">
                Delicious Food
                <span className="block mt-2">Delivered Fast</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto">
                Customize your favorite meals exactly how you like them. From
                pizzas to burgers, we deliver fresh, hot food right to your
                doorstep.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOrderNow}
                  className="btn bg-red-600 hover:bg-red-700 text-white btn-lg group btn-touch relative overflow-hidden"
                >
                  <span className="relative z-10">Order Now</span>
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
                  <motion.div
                    className="absolute inset-0 bg-red-800 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.button>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/menu"
                    className="btn btn-outline border-gray-300 text-gray-700 hover:bg-gray-50 btn-lg btn-touch"
                  >
                    View Menu
                  </Link>
                </motion.div>
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-6 text-gray-600">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm">30-min delivery</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm">Free delivery over ₹25</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm">
                    4.9/5 ({reviews.toLocaleString()}+ reviews)
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="section-padding-sm bg-white">
        <div className="container-mobile">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PromoBanner type="welcome" />
            <PromoBanner type="flash" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-mobile">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to delivering the best food experience with
              unmatched quality and service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true, margin: "-50px" }}
                className="text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                >
                  <feature.icon className="w-8 h-8" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-mobile">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Browse Categories
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Discover our wide range of delicious food categories
            </p>
          </motion.div>

          {!loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ y: -5 }}
                >
                  <Link
                    to={`/menu?category=${category._id}`}
                    className="block p-4 sm:p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 text-center group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: -5 }}
                      className="text-3xl sm:text-4xl mb-3 sm:mb-4"
                    >
                      {category._id === "Pizza" && "🍕"}
                      {category._id === "Burgers" && "🍔"}
                      {category._id === "Fries" && "🍟"}
                      {category._id === "Beverages" && "🥤"}
                      {category._id === "Combos" && "🍽️"}
                      {category._id === "Desserts" && "🍰"}
                    </motion.div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors text-sm sm:text-base">
                      {category._id}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      {category.count} items
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Items
            </h2>
            <p className="text-xl text-gray-600">
              Try our most popular and highly-rated dishes
            </p>
          </motion.div>

          {!loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          <motion.div
            className="text-center mt-12"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/menu"
              className="btn bg-red-600 hover:bg-red-700 text-white btn-lg inline-flex items-center"
            >
              View All Items
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="section-padding bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container-mobile">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center bg-red-100 text-red-700 rounded-full px-4 py-2 mb-4 text-sm font-medium">
              <FireIcon className="w-4 h-4 mr-1" />
              <span>Limited Time Offers</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Special Offers & Deals
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Don't miss out on these amazing limited-time offers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer, index) => (
              <OfferCard key={offer.id} offer={offer} index={index} />
            ))}
          </div>

          {/* Additional Promo Banners */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            <PromoBanner type="delivery" />
            <PromoBanner type="weekend" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it - hear from our satisfied
              customers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center"
              >
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIconSolid
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic text-lg">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center justify-center space-x-3">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-red-100"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-500 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Order?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of satisfied customers and experience the best food
              delivery service
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/menu"
                className="btn bg-white text-red-600 hover:bg-gray-100 btn-lg font-semibold inline-flex items-center"
              >
                Start Ordering Now
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-white opacity-80">
              <div className="flex items-center">
                <ShieldCheckIcon className="w-4 h-4 mr-2" />
                <span className="text-sm">Secure Payment</span>
              </div>
              <div className="flex items-center">
                <TruckIcon className="w-4 h-4 mr-2" />
                <span className="text-sm">Fast Delivery</span>
              </div>
              <div className="flex items-center">
                <StarIcon className="w-4 h-4 mr-2" />
                <span className="text-sm">4.9/5 Rating</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
