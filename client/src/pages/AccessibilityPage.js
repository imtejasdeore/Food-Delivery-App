import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { EyeIcon, SpeakerWaveIcon, CursorArrowRaysIcon } from '@heroicons/react/24/outline';

const AccessibilityPage = () => {
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
            <h1 className="text-responsive-lg font-bold text-gray-900 mb-4">Accessibility</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We are committed to making our website accessible to everyone, regardless of ability.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 mb-12">
            <div className="text-center">
              <EyeIcon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Visual</h2>
              <p className="text-gray-600">
                We provide high-contrast text and resizable fonts to ensure readability.
              </p>
            </div>
            <div className="text-center">
              <SpeakerWaveIcon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Auditory</h2>
              <p className="text-gray-600">
                We provide transcripts and captions for all of our video content.
              </p>
            </div>
            <div className="text-center">
              <CursorArrowRaysIcon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Motor</h2>
              <p className="text-gray-600">
                Our website is fully navigable with a keyboard and other assistive technologies.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AccessibilityPage;