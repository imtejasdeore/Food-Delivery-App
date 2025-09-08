import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

const TermsPage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

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
              <DocumentTextIcon className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-responsive-xl font-bold text-gray-900 mb-4">
              Terms and Conditions
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className="card p-6 sm:p-8 lg:p-12">
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600 mb-4">
                  By accessing and using FoodDelivery's services, you accept and agree to be bound by the 
                  terms and provision of this agreement. If you do not agree to abide by the above, 
                  please do not use this service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Service Description</h2>
                <p className="text-gray-600 mb-4">
                  FoodDelivery is an online food ordering and delivery platform that connects customers 
                  with local restaurants and food providers. We facilitate the ordering process but do 
                  not prepare the food ourselves.
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Online food ordering platform</li>
                  <li>Delivery coordination services</li>
                  <li>Customer support</li>
                  <li>Payment processing</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
                <p className="text-gray-600 mb-4">
                  To place orders, you must create an account and provide accurate information:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>You must be at least 18 years old to create an account</li>
                  <li>Provide accurate and complete information</li>
                  <li>Keep your login credentials secure</li>
                  <li>Notify us immediately of any unauthorized use</li>
                  <li>You are responsible for all activities under your account</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Orders and Payment</h2>
                <p className="text-gray-600 mb-4">
                  When you place an order through our platform:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>All orders are subject to availability</li>
                  <li>Prices are subject to change without notice</li>
                  <li>Payment is required at the time of order</li>
                  <li>We accept major credit cards and digital payments</li>
                  <li>Additional fees may apply for delivery and service</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Delivery Terms</h2>
                <p className="text-gray-600 mb-4">
                  Our delivery service is subject to the following terms:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Delivery times are estimates and may vary</li>
                  <li>Delivery is available within our service areas only</li>
                  <li>You must be available to receive your order</li>
                  <li>Additional charges may apply for special delivery requests</li>
                  <li>We are not responsible for delays due to weather or traffic</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cancellation and Refunds</h2>
                <p className="text-gray-600 mb-4">
                  Order cancellations and refunds are subject to our refund policy:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Orders can be cancelled within 5 minutes of placement</li>
                  <li>Refunds for cancelled orders will be processed within 3-5 business days</li>
                  <li>No refunds for orders that have been prepared or dispatched</li>
                  <li>Quality issues will be addressed on a case-by-case basis</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Prohibited Uses</h2>
                <p className="text-gray-600 mb-4">
                  You may not use our service:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>For any unlawful purpose or to solicit others to unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
                <p className="text-gray-600 mb-4">
                  FoodDelivery shall not be liable for any indirect, incidental, special, consequential, 
                  or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
                  or other intangible losses.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to Terms</h2>
                <p className="text-gray-600 mb-4">
                  We reserve the right to modify these terms at any time. Changes will be effective 
                  immediately upon posting. Your continued use of the service constitutes acceptance 
                  of the modified terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Information</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about these Terms and Conditions, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">
                    <strong>Email:</strong> legal@fooddelivery.com<br />
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

export default TermsPage;