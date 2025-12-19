'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ChatBot from '@/components/ChatBot';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Search, Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Mock tracking data
  const mockOrder = {
    orderNumber: 'SG12345678',
    status: 'in-transit',
    orderDate: '2025-11-10',
    estimatedDelivery: '2025-11-18',
    items: [
      { name: 'Premium Garden Soil Mix', quantity: 2, size: '25kg' },
      { name: 'Organic Lawn Fertilizer Soil', quantity: 1, size: '10kg' },
    ],
    shippingAddress: {
      name: 'John Doe',
      address: '123 Green Lane, Eco District',
      city: 'Bangalore',
      state: 'Karnataka',
      postalCode: '560001',
    },
    trackingHistory: [
      {
        status: 'Order Placed',
        date: '2025-11-10',
        time: '10:30 AM',
        location: 'Soil Guard Warehouse, Bangalore',
        completed: true,
      },
      {
        status: 'Order Processed',
        date: '2025-11-10',
        time: '02:15 PM',
        location: 'Soil Guard Warehouse, Bangalore',
        completed: true,
      },
      {
        status: 'Shipped',
        date: '2025-11-11',
        time: '09:00 AM',
        location: 'Bangalore Sorting Center',
        completed: true,
      },
      {
        status: 'In Transit',
        date: '2025-11-13',
        time: '11:45 AM',
        location: 'Bangalore Local Hub',
        completed: true,
      },
      {
        status: 'Out for Delivery',
        date: '2025-11-15',
        time: 'Expected by 6:00 PM',
        location: 'Local Delivery Partner',
        completed: false,
      },
      {
        status: 'Delivered',
        date: '',
        time: '',
        location: '',
        completed: false,
      },
    ],
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSearching(true);

    // Simulate API call
    setTimeout(() => {
      if (orderNumber.toLowerCase().includes('sg')) {
        setTrackingResult(mockOrder);
        setError('');
      } else {
        setError('Order not found. Please check your order number and email address.');
        setTrackingResult(null);
      }
      setIsSearching(false);
    }, 1000);
  };

  const getStatusIcon = (status: string) => {
    if (status.includes('Delivered')) return <CheckCircle className="w-6 h-6 text-botanical-600" />;
    if (status.includes('Transit') || status.includes('Out for Delivery')) return <Truck className="w-6 h-6 text-botanical-600" />;
    if (status.includes('Shipped')) return <Package className="w-6 h-6 text-botanical-600" />;
    return <Clock className="w-6 h-6 text-botanical-600" />;
  };

  const getStatusColor = (status: string) => {
    if (status === 'delivered') return 'text-botanical-600';
    if (status === 'in-transit') return 'text-blue-600';
    if (status === 'processing') return 'text-yellow-600';
    return 'text-soil-600';
  };

  return (
    <Layout>
      {/* Hero */}
      <div className="bg-gradient-to-br from-botanical-500 to-soil-600 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              Track Your Order
            </h1>
            <p className="text-xl text-botanical-100">
              Enter your order details to track your delivery
            </p>
          </div>
        </div>
      </div>

      {/* Search Form */}
      <section className="section-spacing bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="card p-8">
              <h2 className="text-2xl font-display font-bold text-soil-800 mb-6">
                Find Your Order
              </h2>
              <form onSubmit={handleTrack} className="space-y-6">
                <Input
                  label="Order Number"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="e.g., SG12345678"
                  helperText="You can find this in your order confirmation email"
                  required
                  leftIcon={<Package className="w-5 h-5 text-soil-400" />}
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  helperText="The email address used when placing the order"
                  required
                />
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                    {error}
                  </div>
                )}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  isLoading={isSearching}
                  rightIcon={<Search className="w-5 h-5" />}
                >
                  {isSearching ? 'Searching...' : 'Track Order'}
                </Button>
              </form>

              <div className="mt-8 pt-8 border-t border-soil-200 text-center">
                <p className="text-sm text-soil-600 mb-4">
                  Don't have your order number? Check your email for the order confirmation.
                </p>
                <a href="/contact" className="text-botanical-600 hover:underline font-medium">
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tracking Result */}
      {trackingResult && (
        <section className="section-spacing bg-sand-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Order Status Card */}
              <div className="card p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-soil-800 mb-2">
                      Order {trackingResult.orderNumber}
                    </h2>
                    <p className="text-soil-600">
                      Placed on {new Date(trackingResult.orderDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-4 py-2 rounded-full font-semibold ${getStatusColor(trackingResult.status)}`}>
                      {trackingResult.status === 'in-transit' && '📦 In Transit'}
                      {trackingResult.status === 'delivered' && '✓ Delivered'}
                      {trackingResult.status === 'processing' && '⏳ Processing'}
                    </span>
                    <p className="text-sm text-soil-600 mt-2">
                      Est. Delivery: {new Date(trackingResult.estimatedDelivery).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </p>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-sand-50 rounded-lg p-6 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-botanical-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-soil-800 mb-2">Shipping Address</h3>
                      <p className="text-soil-700">
                        {trackingResult.shippingAddress.name}<br />
                        {trackingResult.shippingAddress.address}<br />
                        {trackingResult.shippingAddress.city}, {trackingResult.shippingAddress.state} {trackingResult.shippingAddress.postalCode}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="font-semibold text-soil-800 mb-4">Items in this order</h3>
                  <div className="space-y-3">
                    {trackingResult.items.map((item: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-soil-200">
                        <div>
                          <p className="font-medium text-soil-800">{item.name}</p>
                          <p className="text-sm text-soil-600">{item.size}</p>
                        </div>
                        <span className="text-soil-700">Qty: {item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tracking Timeline */}
              <div className="card p-8">
                <h2 className="text-2xl font-display font-bold text-soil-800 mb-8">
                  Tracking History
                </h2>
                <div className="space-y-6">
                  {trackingResult.trackingHistory.map((event: any, index: number) => (
                    <div key={index} className="relative pl-12">
                      {/* Timeline line */}
                      {index !== trackingResult.trackingHistory.length - 1 && (
                        <div className={`absolute left-3 top-8 bottom-0 w-0.5 ${event.completed ? 'bg-botanical-500' : 'bg-soil-200'}`} />
                      )}
                      
                      {/* Timeline dot */}
                      <div className={`absolute left-0 top-0 w-6 h-6 rounded-full border-4 ${
                        event.completed ? 'bg-botanical-500 border-botanical-100' : 'bg-white border-soil-200'
                      }`} />

                      <div className={`pb-6 ${event.completed ? '' : 'opacity-50'}`}>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className={`font-semibold text-lg ${event.completed ? 'text-soil-800' : 'text-soil-600'}`}>
                            {event.status}
                          </h3>
                          {event.date && (
                            <span className="text-sm text-soil-600">
                              {new Date(event.date).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                              })} {event.time}
                            </span>
                          )}
                        </div>
                        {event.location && (
                          <p className="text-soil-600">{event.location}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.print()}
                  className="flex-1"
                >
                  Print Details
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    setTrackingResult(null);
                    setOrderNumber('');
                    setEmail('');
                  }}
                  className="flex-1"
                >
                  Track Another Order
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Help Section */}
      {!trackingResult && (
        <section className="section-spacing bg-botanical-50">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-display font-bold text-soil-800 mb-4">
                Need Help?
              </h2>
              <p className="text-lg text-soil-600 mb-8">
                Can't find your order or having issues with tracking?
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="card p-6">
                  <Package className="w-12 h-12 text-botanical-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-soil-800 mb-2">Check Email</h3>
                  <p className="text-sm text-soil-600">
                    Look for order confirmation with tracking info
                  </p>
                </div>
                <div className="card p-6">
                  <Clock className="w-12 h-12 text-botanical-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-soil-800 mb-2">Allow 24 Hours</h3>
                  <p className="text-sm text-soil-600">
                    Tracking info may take time to update
                  </p>
                </div>
                <div className="card p-6">
                  <CheckCircle className="w-12 h-12 text-botanical-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-soil-800 mb-2">Contact Support</h3>
                  <p className="text-sm text-soil-600">
                    Our team is ready to help you
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <a href="/contact" className="btn btn-primary btn-lg">
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      <ChatBot />
    </Layout>
  );
}
