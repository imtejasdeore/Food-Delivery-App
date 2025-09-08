import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import axios from '../utils/axios';
import toast from 'react-hot-toast';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/contact', formData);
      toast.success('Your message has been sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container-mobile section-padding-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-responsive-lg font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We'd love to hear from you! Whether you have a question about our menu, need assistance with an order, or just want to provide feedback, please don't hesitate to get in touch.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="label">Message</label>
                  <textarea
                    name="message"
                    id="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="input"
                    required
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                  <PhoneIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">Talk to our customer support team.</p>
                  <a href="tel:+1234567890" className="text-primary-600 hover:underline mt-1 block">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                  <EnvelopeIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">Send us an email for any inquiries.</p>
                  <a href="mailto:support@512bites.com" className="text-primary-600 hover:underline mt-1 block">
                    support@512bites.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                  <MapPinIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Our Location</h3>
                  <p className="text-gray-600">123 Foodie Lane, Flavor Town, 51200</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;