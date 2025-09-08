import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { StarIcon, ChatBubbleLeftRightIcon, LightBulbIcon } from '@heroicons/react/24/outline';

const FeedbackPage = () => {
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
            <h1 className="text-responsive-lg font-bold text-gray-900 mb-4">Feedback</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We value your feedback! Please let us know how we can improve our service.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 mb-12">
            <div className="text-center">
              <StarIcon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Rate Us</h2>
              <p className="text-gray-600">
                Rate your experience with our service and help us improve.
              </p>
            </div>
            <div className="text-center">
              <ChatBubbleLeftRightIcon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Send Feedback</h2>
              <p className="text-gray-600">
                Send us your feedback and suggestions for improvement.
              </p>
            </div>
            <div className="text-center">
              <LightBulbIcon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Suggestions</h2>
              <p className="text-gray-600">
                Share your ideas and suggestions for new features and improvements.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeedbackPage;