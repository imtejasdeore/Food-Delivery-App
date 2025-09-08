import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

const PrivacyPolicyPage = () => {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container-mobile section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheckIcon className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-responsive-xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className="card p-6 sm:p-8 lg:p-12">
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
                <p className="text-gray-600 mb-4">
                  We collect information you provide directly to us, such as when you create an account, 
                  place an order, or contact us for support.
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Personal information (name, email, phone number)</li>
                  <li>Delivery address and payment information</li>
                  <li>Order history and preferences</li>
                  <li>Communication records with our support team</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">
                  We use the information we collect to provide, maintain, and improve our services:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Process and deliver your food orders</li>
                  <li>Send order confirmations and delivery updates</li>
                  <li>Provide customer support</li>
                  <li>Improve our menu and services</li>
                  <li>Send promotional offers (with your consent)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
                <p className="text-gray-600 mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties, 
                  except in the following circumstances:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>With delivery partners to fulfill your orders</li>
                  <li>With payment processors to handle transactions</li>
                  <li>When required by law or to protect our rights</li>
                  <li>With your explicit consent</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
                <p className="text-gray-600 mb-4">
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction. This includes:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Encryption of sensitive data</li>
                  <li>Secure payment processing</li>
                  <li>Regular security audits</li>
                  <li>Limited access to personal information</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
                <p className="text-gray-600 mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Delete your account and data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Request data portability</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking</h2>
                <p className="text-gray-600 mb-4">
                  We use cookies and similar technologies to enhance your experience, analyze usage, 
                  and provide personalized content. You can control cookie settings through your browser.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Us</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">
                    <strong>Email:</strong> privacy@fooddelivery.com<br />
                    <strong>Phone:</strong> +91 98765 43210<br />
                    <strong>Address:</strong> 123 Food Street, Mumbai, Maharashtra 400001
                  </p>
                </div>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;