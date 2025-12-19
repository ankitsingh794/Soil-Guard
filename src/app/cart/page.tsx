'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from '@/components/LoginModal';

export default function CartPage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated } = useAuth();
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const total = getTotal();
  const shipping = total > 2000 ? 0 : 150;
  const finalTotal = total + shipping;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-custom py-16 min-h-[60vh] flex flex-col items-center justify-center text-center">
          <ShoppingBag className="w-24 h-24 text-soil-300 mb-6" />
          <h1 className="text-3xl font-display font-bold text-soil-800 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-soil-600 mb-8 max-w-md">
            Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
          </p>
          <Button variant="primary" size="lg" onClick={() => (window.location.href = '/products')}>
            Browse Products
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-sand-50 min-h-screen py-12">
        <div className="container-custom">
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-soil-800 mb-8">
            Shopping Cart
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.variantId}`} className="card p-6">
                  <div className="flex gap-6">
                    {/* Image */}
                    <Link href={`/products/${item.product.slug}`} className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="font-semibold text-soil-800 hover:text-botanical-600 transition-colors block mb-1"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-soil-600 mb-3">{item.product.shortDescription}</p>

                      <div className="flex items-center gap-4">
                        {/* Quantity */}
                        <div className="flex items-center border border-soil-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variantId)}
                            className="px-3 py-2 hover:bg-sand-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variantId)}
                            className="px-3 py-2 hover:bg-sand-100 transition-colors"
                            disabled={item.quantity >= item.product.stock}
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.product.id, item.variantId)}
                          className="p-2 text-accent-error hover:bg-red-50 rounded-lg transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-2xl font-bold text-botanical-600">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                      <p className="text-sm text-soil-600 mt-1">
                        {formatPrice(item.product.price)} each
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart */}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                leftIcon={<Trash2 className="w-4 h-4" />}
                className="text-accent-error hover:bg-red-50"
              >
                Clear Cart
              </Button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-soil-800 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-soil-700">
                    <span>Subtotal</span>
                    <span className="font-medium">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-soil-700">
                    <span>Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-botanical-600">FREE</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  {shipping > 0 && total < 2000 && (
                    <div className="bg-botanical-50 border border-botanical-200 rounded-lg p-3 text-sm text-botanical-700">
                      Add {formatPrice(2000 - total)} more for free shipping!
                    </div>
                  )}
                  <div className="border-t border-soil-200 pt-4">
                    <div className="flex justify-between text-lg font-bold text-soil-800">
                      <span>Total</span>
                      <span>{formatPrice(finalTotal)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full mb-3"
                  onClick={() => {
                    if (!isAuthenticated) {
                      setShowLoginModal(true);
                    } else {
                      window.location.href = '/checkout';
                    }
                  }}
                >
                  Proceed to Checkout
                </Button>

                <Button variant="outline" size="lg" className="w-full" onClick={() => (window.location.href = '/products')}>
                  Continue Shopping
                </Button>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-soil-200 space-y-3 text-sm text-soil-600">
                  <div className="flex items-center gap-2">
                    <span className="text-botanical-600">✓</span>
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-botanical-600">✓</span>
                    <span>Free returns within 30 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-botanical-600">✓</span>
                    <span>Premium quality guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        message="Please login to proceed with checkout"
      />
    </Layout>
  );
}
