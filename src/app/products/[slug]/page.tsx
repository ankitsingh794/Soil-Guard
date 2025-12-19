'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import ChatBot from '@/components/ChatBot';
import { mockProducts, mockReviews, mockFAQs } from '@/lib/mockData';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { ShoppingCart, Star, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import ProductCard from '@/components/products/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const product = mockProducts.find((p) => p.slug === slug);
  const productReviews = mockReviews.filter((r) => r.productId === product?.id);
  const relatedProducts = mockProducts
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 3);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <h1 className="text-3xl font-bold text-soil-800 mb-4">Product Not Found</h1>
          <p className="text-soil-600 mb-8">The product you're looking for doesn't exist.</p>
          <Button variant="primary" onClick={() => (window.location.href = '/products')}>
            Browse All Products
          </Button>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <Layout>
      <div className="bg-white">
        {/* Breadcrumb */}
        <div className="bg-sand-50 py-4">
          <div className="container-custom">
            <nav className="text-sm text-soil-600">
              <a href="/" className="hover:text-botanical-600">
                Home
              </a>
              <span className="mx-2">/</span>
              <a href="/products" className="hover:text-botanical-600">
                Products
              </a>
              <span className="mx-2">/</span>
              <span className="text-soil-800">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="container-custom py-12">
          {/* Product Main Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Images */}
            <div>
              <div className="relative aspect-square rounded-lg overflow-hidden mb-4 bg-sand-100">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? 'border-botanical-500'
                          : 'border-transparent hover:border-soil-300'
                      }`}
                    >
                      <Image src={image} alt={`${product.name} ${index + 1}`} fill className="object-cover" sizes="25vw" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              {/* Category & Stock */}
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="info">{product.category.replace('-', ' & ')}</Badge>
                {product.popular && <Badge variant="success">Popular</Badge>}
                {product.stock < 20 && product.stock > 0 && (
                  <Badge variant="warning">Only {product.stock} left</Badge>
                )}
              </div>

              <h1 className="text-3xl lg:text-4xl font-display font-bold text-soil-800 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
                    />
                  ))}
                  <span className="ml-2 text-soil-700 font-medium">{product.rating}</span>
                </div>
                <span className="text-soil-600">({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <p className="text-4xl font-bold text-botanical-600 mb-2">
                  {formatPrice(product.price)}
                </p>
                {product.originalPrice && (
                  <div className="flex items-center gap-3">
                    <p className="text-xl text-soil-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </p>
                    <Badge variant="warning">
                      Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </Badge>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-soil-700 leading-relaxed mb-6">{product.description}</p>

              {/* Benefits */}
              <div className="mb-8">
                <h3 className="font-semibold text-soil-800 mb-3">Key Benefits:</h3>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-soil-700">
                      <CheckCircle className="w-5 h-5 text-botanical-500 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-soil-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-sand-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-6 py-3 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-4 py-3 hover:bg-sand-100 transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<ShoppingCart className="w-5 h-5" />}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1"
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
              </div>

              {/* Certifications */}
              {product.certifications && product.certifications.length > 0 && (
                <div className="border-t border-soil-200 pt-6">
                  <h3 className="font-semibold text-soil-800 mb-3">Certifications:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.certifications.map((cert, index) => (
                      <Badge key={index} variant="success">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Specifications */}
          <div className="mb-16">
            <h2 className="text-2xl font-display font-bold text-soil-800 mb-6">Specifications</h2>
            <div className="card p-6">
              <div className="grid md:grid-cols-2 gap-4">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between py-3 border-b border-soil-200 last:border-0">
                    <span className="font-medium text-soil-700">{spec.label}</span>
                    <span className="text-soil-600">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews */}
          {productReviews.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-display font-bold text-soil-800 mb-6">Customer Reviews</h2>
              <div className="space-y-6">
                {productReviews.map((review) => (
                  <div key={review.id} className="card p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-soil-800">{review.userName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex text-yellow-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : ''}`} />
                            ))}
                          </div>
                          {review.verified && (
                            <Badge variant="success" className="text-xs">
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-soil-500">{review.date}</span>
                    </div>
                    <h4 className="font-semibold text-soil-800 mb-2">{review.title}</h4>
                    <p className="text-soil-700 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs */}
          <div className="mb-16">
            <h2 className="text-2xl font-display font-bold text-soil-800 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {mockFAQs.map((faq, index) => (
                <div key={index} className="card">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full p-6 flex items-center justify-between text-left hover:bg-sand-50 transition-colors"
                  >
                    <h3 className="font-semibold text-soil-800 pr-4">{faq.question}</h3>
                    {expandedFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-soil-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-soil-600 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-6 pb-6">
                      <p className="text-soil-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-display font-bold text-soil-800 mb-6">You May Also Like</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <ChatBot />
    </Layout>
  );
}
