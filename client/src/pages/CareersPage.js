import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BriefcaseIcon, UserGroupIcon, SparklesIcon } from '@heroicons/react/24/outline';

const CareersPage = () => {
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
            <h1 className="text-responsive-lg font-bold text-gray-900 mb-4">Careers</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join our team and help us build the future of food delivery.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 mb-12">
            <div className="text-center">
              <BriefcaseIcon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Open Positions</h2>
              <p className="text-gray-600">
                Explore our open positions and find the perfect role for you.
              </p>
            </div>
            <div className="text-center">
              <UserGroupIcon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Our Culture</h2>
              <p className="text-gray-600">
                Learn about our company culture and what it's like to work with us.
              </p>
            </div>
            <div className="text-center">
              <SparklesIcon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Perks & Benefits</h2>
              <p className="text-gray-600">
                We offer competitive salaries, health insurance, and other benefits.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CareersPage;