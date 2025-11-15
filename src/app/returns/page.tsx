'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import ChatBot from '@/components/ChatBot';
import { RotateCcw, Package, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function ReturnsPage() {
  const returnReasons = [
    { icon: <Package className="w-6 h-6" />, label: 'Defective Product', eligible: true },
    { icon: <Package className="w-6 h-6" />, label: 'Wrong Item Received', eligible: true },
    { icon: <Package className="w-6 h-6" />, label: 'Damaged During Shipping', eligible: true },
    { icon: <RotateCcw className="w-6 h-6" />, label: 'Change of Mind', eligible: true, note: 'Within 30 days' },
    { icon: <XCircle className="w-6 h-6" />, label: 'Used or Opened Products', eligible: false },
    { icon: <XCircle className="w-6 h-6" />, label: 'After 30 Days', eligible: false },
  ];

  return (
    <Layout>
      {/* Hero */}
      <div className="bg-gradient-to-br from-botanical-500 to-soil-600 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              Returns & Refunds
            </h1>
            <p className="text-xl text-botanical-100">
              Your satisfaction is our priority. Easy returns within 30 days.
            </p>
          </div>
        </div>
      </div>

      {/* Return Policy Overview */}
      <section className="section-spacing bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 bg-botanical-50 border-2 border-botanical-200 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-botanical-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-soil-800 mb-3">
                    30-Day Return Policy
                  </h2>
                  <p className="text-soil-700 leading-relaxed">
                    We offer a hassle-free 30-day return policy on all products. If you're not completely
                    satisfied with your purchase, you can return it for a full refund or exchange within
                    30 days of delivery.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-display font-bold text-soil-800 mb-8">
              Eligible Return Reasons
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {returnReasons.map((reason, index) => (
                <div key={index} className="card p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        reason.eligible
                          ? 'bg-botanical-100 text-botanical-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {reason.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-soil-800">{reason.label}</h3>
                        {reason.eligible ? (
                          <span className="text-xs bg-botanical-100 text-botanical-700 px-2 py-1 rounded">
                            Eligible
                          </span>
                        ) : (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                            Not Eligible
                          </span>
                        )}
                      </div>
                      {reason.note && (
                        <p className="text-sm text-soil-600">{reason.note}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to Return */}
      <section className="section-spacing bg-sand-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-soil-800 mb-12 text-center">
              How to Return a Product
            </h2>
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              {[
                {
                  step: 1,
                  title: 'Contact Us',
                  description: 'Email or call us to initiate a return',
                },
                {
                  step: 2,
                  title: 'Get Return Label',
                  description: 'We\'ll send you a prepaid return shipping label',
                },
                {
                  step: 3,
                  title: 'Ship It Back',
                  description: 'Pack the item securely and ship it back',
                },
                {
                  step: 4,
                  title: 'Get Refund',
                  description: 'Refund processed within 5-7 business days',
                },
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-botanical-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-soil-800 mb-2">{step.title}</h3>
                  <p className="text-sm text-soil-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Policy */}
      <section className="section-spacing bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-12">
            <div>
              <h2 className="text-3xl font-display font-bold text-soil-800 mb-8">
                Return Conditions
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-soil-800 mb-4">Items Must Be:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-soil-700">
                      <CheckCircle className="w-5 h-5 text-botanical-600 flex-shrink-0 mt-0.5" />
                      <span>In original, unopened packaging (for hygiene products)</span>
                    </li>
                    <li className="flex items-start gap-3 text-soil-700">
                      <CheckCircle className="w-5 h-5 text-botanical-600 flex-shrink-0 mt-0.5" />
                      <span>Unused and in resalable condition</span>
                    </li>
                    <li className="flex items-start gap-3 text-soil-700">
                      <CheckCircle className="w-5 h-5 text-botanical-600 flex-shrink-0 mt-0.5" />
                      <span>Accompanied by original receipt or proof of purchase</span>
                    </li>
                    <li className="flex items-start gap-3 text-soil-700">
                      <CheckCircle className="w-5 h-5 text-botanical-600 flex-shrink-0 mt-0.5" />
                      <span>Returned within 30 days of delivery date</span>
                    </li>
                  </ul>
                </div>

                <div className="card p-6 bg-accent-warning/10 border-l-4 border-accent-warning">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-accent-warning flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-soil-800 mb-2">Important Notes</h4>
                      <ul className="space-y-2 text-soil-700 text-sm">
                        <li>• Opened bags of soil cannot be returned for hygiene reasons</li>
                        <li>• Custom or bulk orders may have different return conditions</li>
                        <li>• Sale items may not be eligible for return (check product page)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-display font-bold text-soil-800 mb-8">
                Refund Policy
              </h2>
              <div className="space-y-6">
                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-soil-800 mb-4">Refund Timeline</h3>
                  <div className="space-y-4 text-soil-700">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-botanical-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium mb-1">1-2 Days: Return Received</p>
                        <p className="text-sm text-soil-600">We inspect the returned item</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-botanical-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium mb-1">3-5 Days: Refund Initiated</p>
                        <p className="text-sm text-soil-600">Refund processed to original payment method</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-botanical-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium mb-1">5-7 Days: Refund Completed</p>
                        <p className="text-sm text-soil-600">Amount reflects in your account</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-soil-800 mb-4">Refund Methods</h3>
                  <ul className="space-y-3 text-soil-700">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-botanical-600 flex-shrink-0 mt-0.5" />
                      <span>Refunds are issued to the original payment method</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-botanical-600 flex-shrink-0 mt-0.5" />
                      <span>Credit/Debit card refunds take 5-7 business days</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-botanical-600 flex-shrink-0 mt-0.5" />
                      <span>UPI/Wallet refunds take 3-5 business days</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-botanical-600 flex-shrink-0 mt-0.5" />
                      <span>Cash on Delivery orders refunded via bank transfer</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-display font-bold text-soil-800 mb-8">
                Exchanges
              </h2>
              <div className="card p-6 bg-botanical-50 border-botanical-200">
                <p className="text-soil-700 mb-4">
                  We offer exchanges for defective or damaged products. If you'd like to exchange an item:
                </p>
                <ol className="space-y-3 text-soil-700 list-decimal list-inside">
                  <li>Contact our support team within 30 days of delivery</li>
                  <li>Provide photos of the defective/damaged product</li>
                  <li>We'll arrange for pickup and send a replacement</li>
                  <li>No additional charges for defective/damaged items</li>
                </ol>
                <p className="text-soil-700 mt-4">
                  For change-of-mind exchanges, return the original item and place a new order for the desired product.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-display font-bold text-soil-800 mb-8">
                Return Shipping Costs
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full card">
                  <thead className="bg-sand-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-soil-800">Return Reason</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-soil-800">Who Pays Shipping</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-soil-200">
                      <td className="px-6 py-4 text-soil-700">Defective or Damaged Product</td>
                      <td className="px-6 py-4 text-botanical-600 font-medium">We Pay (Free Return)</td>
                    </tr>
                    <tr className="border-t border-soil-200">
                      <td className="px-6 py-4 text-soil-700">Wrong Item Received</td>
                      <td className="px-6 py-4 text-botanical-600 font-medium">We Pay (Free Return)</td>
                    </tr>
                    <tr className="border-t border-soil-200">
                      <td className="px-6 py-4 text-soil-700">Change of Mind</td>
                      <td className="px-6 py-4 text-soil-800">Customer Pays (₹150)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-display font-bold text-soil-800 mb-8">
                Non-Returnable Items
              </h2>
              <ul className="space-y-3 text-soil-700">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>Opened bags of soil or growing medium (unless defective)</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>Products returned after 30 days</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>Items without original packaging or tags</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>Custom or specially ordered products (unless defective)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-spacing bg-botanical-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-soil-800 mb-4">
              Need to Return Something?
            </h2>
            <p className="text-lg text-soil-600 mb-8">
              Contact our support team and we'll guide you through the process
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn btn-primary btn-lg">
                Contact Support
              </a>
              <a href="mailto:support@soilguard.com" className="btn btn-outline btn-lg">
                Email: support@soilguard.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <ChatBot />
    </Layout>
  );
}
