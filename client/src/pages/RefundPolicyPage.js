import React from 'react';
import { motion } from 'framer-motion';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';

const RefundPolicyPage = () => {
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
              <CurrencyDollarIcon className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-responsive-xl font-bold text-gray-900 mb-4">
              Refund Policy
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className="card p-6 sm:p-8 lg:p-12">
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Refund Eligibility</h2>
                <p className="text-gray-600 mb-4">
                  We want you to be completely satisfied with your order. Refunds are available under 
                  the following circumstances:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Order cancelled within 5 minutes of placement</li>
                  <li>Restaurant is unable to fulfill your order</li>
                  <li>Significant delay in delivery (over 60 minutes from estimated time)</li>
                  <li>Food quality issues or incorrect items delivered</li>
                  <li>Technical errors resulting in duplicate charges</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Non-Refundable Situations</h2>
                <p className="text-gray-600 mb-4">
                  Refunds will not be provided in the following cases:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Change of mind after order confirmation</li>
                  <li>Unavailability at delivery address</li>
                  <li>Delays due to weather conditions or natural disasters</li>
                  <li>Orders that have been consumed</li>
                  <li>Customization preferences not met (unless significantly different from order)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Refund Process</h2>
                <p className="text-gray-600 mb-4">
                  To request a refund, please follow these steps:
                </p>
                <div className="bg-blue-50 p-6 rounded-lg mb-4">
                  <ol className="list-decimal pl-6 text-gray-700 space-y-3">
                    <li>Contact our customer support within 24 hours of order delivery</li>
                    <li>Provide your order number and reason for refund request</li>
                    <li>Submit any supporting evidence (photos for quality issues)</li>
                    <li>Our team will review your request within 24-48 hours</li>
                    <li>If approved, refund will be processed to your original payment method</li>
                  </ol>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Refund Timeline</h2>
                <p className="text-gray-600 mb-4">
                  Refund processing times vary by payment method:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Credit/Debit Cards</h4>
                    <p className="text-gray-600 text-sm">3-5 business days</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Digital Wallets</h4>
                    <p className="text-gray-600 text-sm">1-3 business days</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Bank Transfer</h4>
                    <p className="text-gray-600 text-sm">5-7 business days</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Store Credit</h4>
                    <p className="text-gray-600 text-sm">Immediate</p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Partial Refunds</h2>
                <p className="text-gray-600 mb-4">
                  In some cases, partial refunds may be offered:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>When only part of your order is affected</li>
                  <li>For minor quality issues that don't warrant a full refund</li>
                  <li>Delivery fee refunds for significant delays</li>
                  <li>Compensation for missing items</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Store Credit Option</h2>
                <p className="text-gray-600 mb-4">
                  As an alternative to monetary refunds, we may offer store credit:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Store credit is often processed faster than monetary refunds</li>
                  <li>Credit can be used for future orders</li>
                  <li>No expiration date on store credit</li>
                  <li>Can be combined with promotional offers</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Quality Guarantee</h2>
                <p className="text-gray-600 mb-4">
                  We stand behind the quality of food delivered through our platform:
                </p>
                <div className="bg-green-50 p-6 rounded-lg">
                  <ul className="list-disc pl-6 text-green-800 space-y-2">
                    <li>Fresh ingredients and proper food handling</li>
                    <li>Temperature maintenance during delivery</li>
                    <li>Accurate order fulfillment</li>
                    <li>Timely delivery within estimated windows</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Dispute Resolution</h2>
                <p className="text-gray-600 mb-4">
                  If you're not satisfied with our refund decision:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>You can escalate the matter to our senior support team</li>
                  <li>Provide additional evidence or clarification</li>
                  <li>We will review escalated cases within 3-5 business days</li>
                  <li>Final decisions will be communicated via email</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact for Refunds</h2>
                <p className="text-gray-600 mb-4">
                  To request a refund or ask questions about our refund policy:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">
                    <strong>Email:</strong> refunds@fooddelivery.com<br />
                    <strong>Phone:</strong> +91 98765 43210<br />
                    <strong>Live Chat:</strong> Available 24/7 on our website<br />
                    <strong>Support Hours:</strong> Monday - Sunday, 9:00 AM - 11:00 PM
                  </p>
                </div>
              </section>

              <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">Important Note</h3>
                <p className="text-yellow-700 text-sm">
                  This refund policy is subject to change. We recommend reviewing this page periodically 
                  for any updates. Continued use of our service after changes constitutes acceptance of 
                  the updated policy.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;