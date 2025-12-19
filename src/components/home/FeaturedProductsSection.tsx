import React from 'react';
import ProductCard from '@/components/products/ProductCard';
import { mockProducts } from '@/lib/mockData';

const FeaturedProductsSection: React.FC = () => {
  const featuredProducts = mockProducts.filter((p) => p.featured);

  return (
    <section id="featured-products" className="section-spacing bg-sand-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-soil-800 mb-4">
            Featured Soil Solutions
          </h2>
          <p className="text-lg text-soil-600 max-w-2xl mx-auto">
            Our most popular and highly-rated soil products, trusted by thousands of customers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/products"
            className="inline-flex items-center justify-center px-8 py-4 bg-botanical-500 hover:bg-botanical-600 text-white font-medium rounded-lg transition-colors shadow-sm hover:shadow-md"
          >
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
