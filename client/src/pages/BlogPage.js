import React from 'react';
import { motion } from 'framer-motion';
import { NewspaperIcon, RssIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const BlogPage = () => {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container-mobile section-padding-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-responsive-lg font-bold text-gray-900 mb-4">Blog</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Read our latest articles and stay up-to-date with the latest news and trends in the food industry.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 mb-12">
            <div className="text-center">
              <NewspaperIcon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Latest Articles</h2>
              <p className="text-gray-600">
                Read our latest articles on food, health, and nutrition.
              </p>
            </div>
            <div className="text-center">
              <RssIcon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Subscribe</h2>
              <p className="text-gray-600">
                Subscribe to our newsletter and get the latest articles delivered to your inbox.
              </p>
            </div>
            <div className="text-center">
              <ChatBubbleLeftRightIcon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Community</h2>
              <p className="text-gray-600">
                Join our community and share your thoughts on our articles.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage;