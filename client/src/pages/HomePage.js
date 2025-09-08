import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRightIcon,
  StarIcon,
  ClockIcon,
  TruckIcon,
  ShieldCheckIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import axios from '../utils/axios';
import { useAuth } from '../contexts/AuthContext';
import PromoBanner from '../components/promotions/PromoBanner';
import OfferCard from '../components/promotions/OfferCard';
import ProductCard from '../components/product/ProductCard';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleOrderNow = () => {
    if (isAuthenticated) {
      navigate('/menu');
    } else {
      navigate('/login');
    }
  };

  // Mock offers data
  const offers = [
    {
      id: 1,
      title: 'Pizza Combo Deal',
      description: 'Get any large pizza with garlic bread and coke',
      discount: 30,
      code: 'PIZZA30',
      image: '/images/pizza-combo.jpg',
      category: 'Pizza',
      validUntil: 'Dec 31',
      minOrder: 500,
      type: 'combo'
    },
    {
      id: 2,
      title: 'Burger Bonanza',
      description: 'Buy 2 burgers and get 1 free with any beverage',
      discount: 40,
      code: 'BURGER40',
      image: '/images/burger-offer.jpg',
      category: 'Burgers',
      validUntil: 'Dec 25',
      minOrder: 300,
      type: 'discount'
    },
    {
      id: 3,
      title: 'Free Delivery Weekend',
      description: 'Free delivery on all orders this weekend',
      discount: 100,
      code: 'FREEDEL',
      image: '/images/delivery-offer.jpg',
      category: '',
      validUntil: 'This Weekend',
      minOrder: 200,
      type: 'free-delivery'
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get('/api/products/featured'),
          axios.get('/api/products/categories')
        ]);
        
        setFeaturedProducts(productsRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const features = [
    {
      icon: TruckIcon,
      title: 'Fast Delivery',
      description: 'Get your food delivered in 30 minutes or less'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Quality Assured',
      description: 'Fresh ingredients and hygienic preparation'
    },
    {
      icon: HeartIcon,
      title: 'Made with Love',
      description: 'Every dish is prepared with care and passion'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Amazing food quality and super fast delivery! The customization options are fantastic.',
      image: '/images/user1.jpg'
    },
    {
      name: 'Mike Chen',
      rating: 5,
      comment: 'Best food delivery app I\'ve used. The pizza customization is exactly what I needed.',
      image: '/images/user2.jpg'
    },
    {
      name: 'Emily Davis',
      rating: 4,
      comment: 'Great variety of options and the app is very user-friendly. Highly recommended!',
      image: '/images/user3.jpg'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="container-mobile section-padding">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-responsive-xl font-bold bg-gradient-to-r from-red-900 via-pink-500 to-yellow-500 bg-clip-text text-transparent mb-4 sm:mb-6">
                Delicious Food
                <span className="text-gradient block">Delivered Fast</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto">
                Customize your favorite meals exactly how you like them.
                From pizzas to burgers, we deliver fresh, hot food right to your doorstep.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOrderNow}
                  className="btn btn-primary btn-lg group btn-touch"
                >
                  Order Now
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/menu"
                    className="btn btn-outline btn-lg btn-touch"
                  >
                    View Menu
                  </Link>
                </motion.div>
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
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-responsive-lg font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to delivering the best food experience with unmatched quality and service.
            </p>
          </motion.div>

          <div className="grid-responsive-features">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
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
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-responsive-lg font-bold text-gray-900 mb-4">
              Browse Categories
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Discover our wide range of delicious food categories
            </p>
          </motion.div>

          {!loading && (
            <div className="grid-responsive-categories">
              {categories.map((category, index) => (
                <motion.div
                  key={category._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={`/menu?category=${category._id}`}
                    className="block p-6 bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 text-center group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: -10 }}
                      className="text-4xl mb-4"
                    >
                      {category._id === 'Pizza' && '🍕'}
                      {category._id === 'Burgers' && '🍔'}
                      {category._id === 'Fries' && '🍟'}
                      {category._id === 'Beverages' && '🥤'}
                      {category._id === 'Combos' && '🍽️'}
                      {category._id === 'Desserts' && '🍰'}
                    </motion.div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {category._id}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
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
            viewport={{ once: true }}
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

          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="btn btn-primary btn-lg"
            >
              View All Items
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container-mobile">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-responsive-lg font-bold text-gray-900 mb-4">
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
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="card p-8 text-center"
              >
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIconSolid
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center justify-center space-x-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Order?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of satisfied customers and experience the best food delivery service
            </p>
            <Link
              to="/menu"
              className="btn bg-white text-primary-600 hover:bg-gray-100 btn-lg"
            >
              Start Ordering Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;