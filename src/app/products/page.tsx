'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import ChatBot from '@/components/ChatBot';
import { mockProducts } from '@/lib/mockData';
import { Product, SortOption } from '@/types';
import { SlidersHorizontal } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [showFilters, setShowFilters] = useState(false);

  const handleSort = (option: SortOption) => {
    setSortBy(option);
    let sorted = [...filteredProducts];

    switch (option) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // In real app, would sort by date
        break;
      case 'popularity':
      default:
        sorted.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    setFilteredProducts(sorted);
  };

  return (
    <Layout>
      <div className="bg-sand-50 min-h-screen">
        {/* Page Header */}
        <div className="bg-botanical-500 text-white py-16">
          <div className="container-custom">
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4">
              All Soil Products
            </h1>
            <p className="text-lg text-botanical-100 max-w-2xl">
              Browse our complete range of premium soil solutions
            </p>
          </div>
        </div>

        <div className="container-custom py-8">
          {/* Filters & Sort Bar */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<SlidersHorizontal className="w-4 h-4" />}
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                Filters
              </Button>
              <p className="text-soil-600">
                Showing <span className="font-semibold">{filteredProducts.length}</span> products
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="text-sm text-soil-600">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => handleSort(e.target.value as SortOption)}
                className="px-4 py-2 border border-soil-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-botanical-500"
              >
                <option value="popularity">Popularity</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-soil-600 mb-4">No products found</p>
              <Button variant="primary" onClick={() => setFilteredProducts(mockProducts)}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
      <ChatBot />
    </Layout>
  );
}
