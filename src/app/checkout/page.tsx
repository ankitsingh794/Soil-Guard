'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ChatBot from '@/components/ChatBot';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { ShoppingCart, CreditCard, CheckCircle, ArrowRight, ArrowLeft, Package, Lock } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = getTotal();
  const shipping = subtotal > 2000 ? 0 : 150;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  if (items.length === 0 && currentStep !== 4) {
    return (
      <Layout>
        <div className="container-custom py-16 min-h-[60vh] flex flex-col items-center justify-center text-center">
          <ShoppingCart className="w-24 h-24 text-soil-300 mb-6" />
          <h1 className="text-3xl font-display font-bold text-soil-800 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-soil-600 mb-8 max-w-md">
            Add some products to your cart before proceeding to checkout.
          </p>
          <Button variant="primary" size="lg" onClick={() => router.push('/products')}>
            Browse Products
          </Button>
        </div>
        <ChatBot />
      </Layout>
    );
  }

  const validateShipping = () => {
    const newErrors: Record<string, string> = {};
    
    if (!shippingInfo.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!shippingInfo.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingInfo.email)) newErrors.email = 'Invalid email';
    if (!shippingInfo.phone.trim()) newErrors.phone = 'Phone is required';
    if (!shippingInfo.addressLine1.trim()) newErrors.addressLine1 = 'Address is required';
    if (!shippingInfo.city.trim()) newErrors.city = 'City is required';
    if (!shippingInfo.state.trim()) newErrors.state = 'State is required';
    if (!shippingInfo.postalCode.trim()) newErrors.postalCode = 'Postal code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors: Record<string, string> = {};
    
    if (!paymentInfo.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    else if (!/^\d{16}$/.test(paymentInfo.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Invalid card number';
    if (!paymentInfo.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
    if (!paymentInfo.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
    if (!paymentInfo.cvv.trim()) newErrors.cvv = 'CVV is required';
    else if (!/^\d{3,4}$/.test(paymentInfo.cvv)) newErrors.cvv = 'Invalid CVV';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateShipping()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validatePayment()) {
      setCurrentStep(3);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(4);
      clearCart();
    }, 2000);
  };

  const steps = [
    { number: 1, label: 'Shipping', icon: <Package className="w-5 h-5" /> },
    { number: 2, label: 'Payment', icon: <CreditCard className="w-5 h-5" /> },
    { number: 3, label: 'Review', icon: <ShoppingCart className="w-5 h-5" /> },
  ];

  return (
    <Layout>
      <div className="bg-sand-50 min-h-screen py-12">
        <div className="container-custom">
          {currentStep !== 4 ? (
            <>
              {/* Progress Steps */}
              <div className="mb-12">
                <div className="flex items-center justify-center">
                  {steps.map((step, index) => (
                    <React.Fragment key={step.number}>
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                            currentStep >= step.number
                              ? 'bg-botanical-500 text-white'
                              : 'bg-soil-200 text-soil-500'
                          }`}
                        >
                          {step.icon}
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            currentStep >= step.number ? 'text-soil-800' : 'text-soil-500'
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`w-24 h-1 mx-4 mb-8 transition-colors ${
                            currentStep > step.number ? 'bg-botanical-500' : 'bg-soil-200'
                          }`}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  {/* Step 1: Shipping Information */}
                  {currentStep === 1 && (
                    <div className="card p-8">
                      <h2 className="text-2xl font-display font-bold text-soil-800 mb-6">
                        Shipping Information
                      </h2>
                      <div className="space-y-6">
                        <Input
                          label="Full Name"
                          value={shippingInfo.fullName}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                          error={errors.fullName}
                        />
                        <div className="grid md:grid-cols-2 gap-6">
                          <Input
                            label="Email"
                            type="email"
                            value={shippingInfo.email}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                            error={errors.email}
                          />
                          <Input
                            label="Phone"
                            type="tel"
                            value={shippingInfo.phone}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                            error={errors.phone}
                          />
                        </div>
                        <Input
                          label="Address Line 1"
                          value={shippingInfo.addressLine1}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, addressLine1: e.target.value })}
                          error={errors.addressLine1}
                        />
                        <Input
                          label="Address Line 2 (Optional)"
                          value={shippingInfo.addressLine2}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, addressLine2: e.target.value })}
                        />
                        <div className="grid md:grid-cols-3 gap-6">
                          <Input
                            label="City"
                            value={shippingInfo.city}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                            error={errors.city}
                          />
                          <Input
                            label="State"
                            value={shippingInfo.state}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                            error={errors.state}
                          />
                          <Input
                            label="Postal Code"
                            value={shippingInfo.postalCode}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                            error={errors.postalCode}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Payment Information */}
                  {currentStep === 2 && (
                    <div className="card p-8">
                      <h2 className="text-2xl font-display font-bold text-soil-800 mb-6">
                        Payment Information
                      </h2>
                      <div className="bg-botanical-50 border border-botanical-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                        <Lock className="w-5 h-5 text-botanical-600" />
                        <p className="text-sm text-botanical-700">
                          Your payment information is secure and encrypted
                        </p>
                      </div>
                      <div className="space-y-6">
                        <Input
                          label="Card Number"
                          value={paymentInfo.cardNumber}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                          error={errors.cardNumber}
                          placeholder="1234 5678 9012 3456"
                        />
                        <Input
                          label="Cardholder Name"
                          value={paymentInfo.cardName}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                          error={errors.cardName}
                        />
                        <div className="grid md:grid-cols-2 gap-6">
                          <Input
                            label="Expiry Date"
                            value={paymentInfo.expiryDate}
                            onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                            error={errors.expiryDate}
                            placeholder="MM/YY"
                          />
                          <Input
                            label="CVV"
                            value={paymentInfo.cvv}
                            onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                            error={errors.cvv}
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Review Order */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="card p-8">
                        <h2 className="text-2xl font-display font-bold text-soil-800 mb-6">
                          Review Your Order
                        </h2>
                        
                        {/* Shipping Address */}
                        <div className="mb-6">
                          <h3 className="font-semibold text-soil-800 mb-3">Shipping Address</h3>
                          <div className="bg-sand-50 rounded-lg p-4 text-sm text-soil-700">
                            <p className="font-medium">{shippingInfo.fullName}</p>
                            <p>{shippingInfo.addressLine1}</p>
                            {shippingInfo.addressLine2 && <p>{shippingInfo.addressLine2}</p>}
                            <p>
                              {shippingInfo.city}, {shippingInfo.state} {shippingInfo.postalCode}
                            </p>
                            <p className="mt-2">{shippingInfo.email}</p>
                            <p>{shippingInfo.phone}</p>
                          </div>
                        </div>

                        {/* Payment Method */}
                        <div>
                          <h3 className="font-semibold text-soil-800 mb-3">Payment Method</h3>
                          <div className="bg-sand-50 rounded-lg p-4 text-sm text-soil-700">
                            <p>Card ending in {paymentInfo.cardNumber.slice(-4)}</p>
                            <p>{paymentInfo.cardName}</p>
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="card p-8">
                        <h3 className="font-semibold text-soil-800 mb-4">Order Items</h3>
                        <div className="space-y-4">
                          {items.map((item) => (
                            <div key={item.product.id} className="flex gap-4 pb-4 border-b border-soil-200 last:border-0">
                              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-sand-100 flex-shrink-0">
                                <Image
                                  src={item.product.images[0]}
                                  alt={item.product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-soil-800">{item.product.name}</h4>
                                <p className="text-sm text-soil-600">Qty: {item.quantity}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-soil-800">
                                  {formatPrice(item.product.price * item.quantity)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between mt-8">
                    {currentStep > 1 && (
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setCurrentStep(currentStep - 1)}
                        leftIcon={<ArrowLeft className="w-5 h-5" />}
                      >
                        Back
                      </Button>
                    )}
                    {currentStep < 3 ? (
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={handleNext}
                        rightIcon={<ArrowRight className="w-5 h-5" />}
                        className="ml-auto"
                      >
                        Continue
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={handlePlaceOrder}
                        isLoading={isProcessing}
                        className="ml-auto"
                      >
                        {isProcessing ? 'Processing...' : 'Place Order'}
                      </Button>
                    )}
                  </div>
                </div>

                {/* Order Summary Sidebar */}
                <div className="lg:col-span-1">
                  <div className="card p-6 sticky top-8">
                    <h3 className="text-xl font-semibold text-soil-800 mb-6">Order Summary</h3>
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-soil-700">
                        <span>Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-soil-700">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? <span className="text-botanical-600">FREE</span> : formatPrice(shipping)}</span>
                      </div>
                      <div className="flex justify-between text-soil-700">
                        <span>Tax (GST 18%)</span>
                        <span>{formatPrice(tax)}</span>
                      </div>
                      <div className="border-t border-soil-200 pt-4">
                        <div className="flex justify-between text-lg font-bold text-soil-800">
                          <span>Total</span>
                          <span>{formatPrice(total)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="space-y-3 text-sm text-soil-600 pt-6 border-t border-soil-200">
                      <div className="flex items-center gap-2">
                        <span className="text-botanical-600">✓</span>
                        <span>Secure checkout</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-botanical-600">✓</span>
                        <span>30-day return policy</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-botanical-600">✓</span>
                        <span>Premium quality guaranteed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Success Page */
            <div className="max-w-2xl mx-auto text-center">
              <div className="card p-12">
                <div className="w-20 h-20 bg-botanical-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-botanical-600" />
                </div>
                <h1 className="text-3xl font-display font-bold text-soil-800 mb-4">
                  Order Placed Successfully!
                </h1>
                <p className="text-lg text-soil-600 mb-8">
                  Thank you for your order. We've sent a confirmation email to {shippingInfo.email}
                </p>
                <div className="bg-sand-50 rounded-lg p-6 mb-8">
                  <p className="text-sm text-soil-600 mb-2">Order Number</p>
                  <p className="text-2xl font-bold text-soil-800">
                    SG{Date.now().toString().slice(-8)}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => router.push('/products')}
                  >
                    Continue Shopping
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => alert('Track order feature coming soon!')}
                  >
                    Track Order
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ChatBot />
    </Layout>
  );
}
