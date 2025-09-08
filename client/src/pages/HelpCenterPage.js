import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { QuestionMarkCircleIcon, ShieldCheckIcon, BookOpenIcon } from '@heroicons/react/24/outline';

const HelpCenterPage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container-mobile section-padding-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-responsive-lg font-bold text-gray-900 mb-4">Help Center</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're here to help! Find answers to your questions and learn how to get the most out of our service.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 mb-12">
            <div className="text-center">
              <QuestionMarkCircleIcon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">FAQs</h2>
              <p className="text-gray-600">
                Find answers to frequently asked questions about our service.
              </p>
            </div>
            <div className="text-center">
              <ShieldCheckIcon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Safety</h2>
              <p className="text-gray-600">
                Learn about our safety measures and how we protect your data.
              </p>
            </div>
            <div className="text-center">
              <BookOpenIcon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Guides</h2>
              <p className="text-gray-600">
                Read our guides to learn how to use our service effectively.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpCenterPage;