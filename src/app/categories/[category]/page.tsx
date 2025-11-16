'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ChatBot from '@/components/ChatBot';
import ProductCard from '@/components/products/ProductCard';
import { mockProducts } from '@/lib/mockData';
import { Leaf, Filter, SortDesc } from 'lucide-react';

interface PageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: PageProps) {
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState('all');

  const categoryNames: Record<string, string> = {
    'garden-lawn': 'Garden & Lawn',
    'indoor-planting': 'Indoor Planting',
    'industrial-remediation': 'Industrial & Remediation',
  };

  const categoryDescriptions: Record<string, string> = {
    'garden-lawn': 'Premium soil solutions for your garden and lawn needs. From vegetable gardens to beautiful flower beds and lush lawns.',
    'indoor-planting': 'Specialized potting mixes for indoor plants, houseplants, and container gardening. Perfect drainage and nutrition.',
    'industrial-remediation': 'Professional-grade soil solutions for industrial sites, remediation projects, and commercial applications.',
  };

  const categoryName = categoryNames[params.category] || 'Products';
  const categoryDescription = categoryDescriptions[params.category] || 'Browse our products';

  // Filter products by category
  let filteredProducts = mockProducts.filter(
    (product) => product.category === params.category
  );

  // Apply price filter
  if (priceRange !== 'all') {
    filteredProducts = filteredProducts.filter((product) => {
      if (priceRange === 'under-500') return product.price < 500;
      if (priceRange === '500-1000') return product.price >= 500 && product.price < 1000;
      if (priceRange === '1000-2000') return product.price >= 1000 && product.price < 2000;
      if (priceRange === 'over-2000') return product.price >= 2000;
      return true;
    });
  }

  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    if (sortBy === 'popular') return (b.reviewCount || 0) - (a.reviewCount || 0);
    return 0;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-botanical-500 to-soil-600 text-white py-16">
        <div className="container-custom">
          <div className="flex items-center gap-3 mb-4">
            <Leaf className="w-8 h-8" />
            <h1 className="text-4xl font-display font-bold">{categoryName}</h1>
          </div>
          <p className="text-botanical-100 text-lg max-w-2xl">
            {categoryDescription}
          </p>
        </div>
      </div>

      {/* Filters & Products */}
      <section className="section-spacing bg-sand-50">
        <div className="container-custom">
          {/* Filter Bar */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-soil-600" />
                <span className="font-semibold text-soil-800">
                  {sortedProducts.length} Products
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                {/* Price Filter */}
                <div>
                  <label className="block text-sm font-medium text-soil-700 mb-2">
                    Price Range
                  </label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="px-4 py-2 border border-soil-300 rounded-lg focus:ring-2 focus:ring-botanical-500 focus:border-transparent"
                  >
                    <option value="all">All Prices</option>
                    <option value="under-500">Under ₹500</option>
                    <option value="500-1000">₹500 - ₹1,000</option>
                    <option value="1000-2000">₹1,000 - ₹2,000</option>
                    <option value="over-2000">Over ₹2,000</option>
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-soil-700 mb-2">
                    <SortDesc className="w-4 h-4 inline mr-1" />
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-soil-300 rounded-lg focus:ring-2 focus:ring-botanical-500 focus:border-transparent"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-sand-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-10 h-10 text-soil-400" />
              </div>
              <h3 className="text-xl font-semibold text-soil-800 mb-2">
                No products found
              </h3>
              <p className="text-soil-600 mb-6">
                Try adjusting your filters to see more products
              </p>
              <button
                onClick={() => {
                  setPriceRange('all');
                  setSortBy('popular');
                }}
                className="px-6 py-3 bg-botanical-500 text-white rounded-lg hover:bg-botanical-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <ChatBot />
    </Layout>
  );
}
