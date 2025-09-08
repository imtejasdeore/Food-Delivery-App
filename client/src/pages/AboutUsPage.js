import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BuildingOffice2Icon, UsersIcon, HeartIcon } from '@heroicons/react/24/outline';

const AboutUsPage = () => {

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
            <h1 className="text-responsive-lg font-bold text-gray-900 mb-4">About Us</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We are a passionate team of food lovers dedicated to bringing you the best culinary experience.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 mb-12">
            <div className="text-center">
              <BuildingOffice2Icon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Our Story</h2>
              <p className="text-gray-600">
                Founded in 2023, our mission is to provide a seamless and enjoyable food ordering experience.
              </p>
            </div>
            <div className="text-center">
              <UsersIcon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Our Team</h2>
              <p className="text-gray-600">
                We are a diverse team of developers, designers, and food enthusiasts.
              </p>
            </div>
            <div className="text-center">
              <HeartIcon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Our Values</h2>
              <p className="text-gray-600">
                We believe in quality, customer satisfaction, and continuous improvement.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUsPage;