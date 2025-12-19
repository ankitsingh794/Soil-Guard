'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import ChatBot from '@/components/ChatBot';
import { Package, Truck, MapPin, Clock, IndianRupee, CheckCircle } from 'lucide-react';

export default function ShippingPage() {
  const shippingMethods = [
    {
      name: 'Standard Shipping',
      duration: '3-5 business days',
      cost: '₹150',
      description: 'Available for all orders',
      icon: <Package className="w-8 h-8" />,
    },
    {
      name: 'Express Shipping',
      duration: '1-2 business days',
      cost: '₹350',
      description: 'Fast delivery for urgent orders',
      icon: <Truck className="w-8 h-8" />,
    },
    {
      name: 'Free Shipping',
      duration: '3-5 business days',
      cost: 'FREE',
      description: 'On orders above ₹2,000',
      icon: <CheckCircle className="w-8 h-8" />,
      highlight: true,
    },
  ];

  const deliveryZones = [
    {
      zone: 'Metro Cities',
      cities: 'Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad',
      standard: '3-4 days',
      express: '1-2 days',
    },
    {
      zone: 'Tier 1 Cities',
      cities: 'Pune, Ahmedabad, Jaipur, Lucknow, Surat, etc.',
      standard: '4-5 days',
      express: '2-3 days',
    },
    {
      zone: 'Tier 2/3 Cities',
      cities: 'All other cities and towns',
      standard: '5-7 days',
      express: '3-4 days',
    },
    {
      zone: 'Remote Areas',
      cities: 'Rural and remote locations',
      standard: '7-10 days',
      express: 'Not Available',
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <div className="bg-gradient-to-br from-botanical-500 to-soil-600 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              Shipping Information
            </h1>
            <p className="text-xl text-botanical-100">
              Fast, reliable delivery across India
            </p>
          </div>
        </div>
      </div>

      {/* Shipping Methods */}
      <section className="section-spacing bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-display font-bold text-soil-800 mb-12 text-center">
            Shipping Methods
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {shippingMethods.map((method, index) => (
              <div
                key={index}
                className={`card p-8 text-center ${
                  method.highlight ? 'border-2 border-botanical-500 relative' : ''
                }`}
              >
                {method.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-botanical-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Best Value
                  </div>
                )}
                <div className="w-16 h-16 bg-botanical-100 rounded-full flex items-center justify-center mx-auto mb-4 text-botanical-600">
                  {method.icon}
                </div>
                <h3 className="text-xl font-semibold text-soil-800 mb-2">{method.name}</h3>
                <div className="text-3xl font-bold text-botanical-600 mb-2">{method.cost}</div>
                <div className="text-soil-600 mb-4">{method.duration}</div>
                <p className="text-sm text-soil-600">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Zones */}
      <section className="section-spacing bg-sand-50">
        <div className="container-custom">
          <h2 className="text-3xl font-display font-bold text-soil-800 mb-12 text-center">
            Delivery Zones & Timeline
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full card">
                <thead className="bg-botanical-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-soil-800">Zone</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-soil-800">Coverage</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-soil-800">Standard</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-soil-800">Express</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryZones.map((zone, index) => (
                    <tr key={index} className="border-t border-soil-200">
                      <td className="px-6 py-4 font-semibold text-soil-800">{zone.zone}</td>
                      <td className="px-6 py-4 text-soil-700 text-sm">{zone.cities}</td>
                      <td className="px-6 py-4 text-soil-700">{zone.standard}</td>
                      <td className="px-6 py-4 text-soil-700">{zone.express}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Policy */}
      <section className="section-spacing bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-soil-800 mb-8">
              Shipping Policy
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-soil-800 mb-4">Order Processing</h3>
                <ul className="space-y-3 text-soil-700">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-botanical-600 flex-shrink-0 mt-0.5" />
                    <span>All orders are processed within 24 hours of placement (excluding weekends and holidays)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-botanical-600 flex-shrink-0 mt-0.5" />
                    <span>You'll receive an order confirmation email with tracking information once shipped</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-botanical-600 flex-shrink-0 mt-0.5" />
                    <span>Orders placed after 2 PM will be processed the next business day</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-soil-800 mb-4">Tracking Your Order</h3>
                <div className="card p-6 bg-sand-50">
                  <p className="text-soil-700 mb-4">
                    Once your order ships, you'll receive a tracking number via email and SMS. You can track your package:
                  </p>
                  <ul className="space-y-2 text-soil-700 list-disc list-inside">
                    <li>On our <a href="/track-order" className="text-botanical-600 hover:underline font-medium">Order Tracking Page</a></li>
                    <li>Through the shipping carrier's website</li>
                    <li>By contacting our customer support</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-soil-800 mb-4">Shipping Restrictions</h3>
                <ul className="space-y-3 text-soil-700">
                  <li className="flex items-start gap-3">
                    <span className="text-botanical-600 font-bold">•</span>
                    <span>We currently ship within India only</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-botanical-600 font-bold">•</span>
                    <span>Some remote areas may have limited shipping options</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-botanical-600 font-bold">•</span>
                    <span>Bulk orders (&gt;500kg) require special arrangements - contact us for details</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-botanical-600 font-bold">•</span>
                    <span>PO Box addresses are not accepted for delivery</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-soil-800 mb-4">Delivery Guidelines</h3>
                <ul className="space-y-3 text-soil-700">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-botanical-600 flex-shrink-0 mt-0.5" />
                    <span>Ensure someone is available to receive the package</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-botanical-600 flex-shrink-0 mt-0.5" />
                    <span>Inspect packages for damage upon delivery</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-botanical-600 flex-shrink-0 mt-0.5" />
                    <span>Report any issues within 48 hours of delivery</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-botanical-600 flex-shrink-0 mt-0.5" />
                    <span>Provide accurate address and contact information</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-soil-800 mb-4">Shipping Charges</h3>
                <div className="card p-6 bg-botanical-50 border-botanical-200">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-soil-700">Orders below ₹2,000</span>
                      <span className="font-semibold text-soil-800">₹150</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-soil-700">Orders ₹2,000 and above</span>
                      <span className="font-semibold text-botanical-600">FREE</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-soil-700">Express Shipping</span>
                      <span className="font-semibold text-soil-800">+ ₹200</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-soil-800 mb-4">Delayed or Missing Shipments</h3>
                <p className="text-soil-700 mb-4">
                  If your order hasn't arrived within the expected timeframe:
                </p>
                <ol className="space-y-3 text-soil-700 list-decimal list-inside">
                  <li>Check your tracking information for updates</li>
                  <li>Verify the delivery address you provided</li>
                  <li>Contact the shipping carrier directly</li>
                  <li>If still unresolved, contact our support team at <a href="mailto:support@soilguard.com" className="text-botanical-600 hover:underline">support@soilguard.com</a></li>
                </ol>
              </div>

              <div className="card p-6 bg-accent-warning/10 border-l-4 border-accent-warning">
                <h4 className="font-semibold text-soil-800 mb-2">Important Note</h4>
                <p className="text-soil-700">
                  Delivery times are estimates and not guaranteed. Delays may occur due to weather conditions,
                  carrier issues, or unforeseen circumstances. We're not responsible for delays caused by the
                  shipping carrier.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-spacing bg-botanical-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-soil-800 mb-4">
              Have Questions About Shipping?
            </h2>
            <p className="text-lg text-soil-600 mb-8">
              Our customer support team is here to help with any shipping-related queries
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn btn-primary btn-lg">
                Contact Support
              </a>
              <a href="/help" className="btn btn-outline btn-lg">
                Visit Help Center
              </a>
            </div>
          </div>
        </div>
      </section>

      <ChatBot />
    </Layout>
  );
}
