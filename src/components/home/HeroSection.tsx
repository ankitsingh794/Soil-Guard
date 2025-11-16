'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

const HeroSection: React.FC = () => {

  return (
    <section className="relative bg-gradient-to-br from-sand-50 via-white to-botanical-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-botanical-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-soil-500 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px] py-12 lg:py-20">
          {/* Left content */}
          <div className="space-y-6 lg:space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-botanical-100 text-botanical-700 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Certified Quality Soil Solutions</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-8xl font-display font-bold text-soil-800 leading-none tracking-tight">
                Soil Guard
              </h1>
              <h2 className="text-2xl lg:text-4xl font-display font-semibold text-gradient leading-tight">
                Smart Soil Solutions for Every Need
              </h2>
            </div>
            
            <p className="text-lg lg:text-xl text-soil-600 leading-relaxed max-w-xl">
              From garden beds to industrial sites, find the perfect soil solution
              with our AI-powered assistant. Quality tested, sustainably sourced,
              delivered to your door.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/chat">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Find Your Soil Solution
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  document.getElementById('featured-products')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
              >
                Browse Products
              </Button>
            </div>

            {/* Soil Testing CTA */}
            <div className="bg-gradient-to-r from-botanical-500 to-botanical-600 rounded-xl p-6 shadow-lg border-2 border-botanical-400">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">
                    🔬 Professional Soil Testing
                  </h3>
                  <p className="text-botanical-100 text-sm">
                    Get detailed analysis of your soil. Starting at ₹1,499
                  </p>
                </div>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => window.location.href = '/soil-testing'}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="whitespace-nowrap"
                >
                  Book Now
                </Button>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-botanical-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-soil-800">Quality Certified</p>
                  <p className="text-sm text-soil-500">Lab tested products</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-botanical-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🌱</span>
                </div>
                <div>
                  <p className="font-semibold text-soil-800">Eco-Friendly</p>
                  <p className="text-sm text-soil-500">Sustainable sourcing</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-botanical-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <p className="font-semibold text-soil-800">1000+ Reviews</p>
                  <p className="text-sm text-soil-500">Customer trusted</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="relative lg:h-[600px] h-[400px] animate-slide-up">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80"
                alt="Premium soil with healthy plants growing"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="gradient-overlay" />
              
              {/* Floating card */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-soil-600 mb-1">Popular Choice</p>
                    <p className="font-semibold text-soil-800">Premium Garden Soil Mix</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex text-yellow-500">
                        {'★'.repeat(5)}
                      </div>
                      <span className="text-sm text-soil-600">(247 reviews)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-botanical-600">₹899</p>
                    <p className="text-sm text-soil-500 line-through">₹1,199</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-botanical-500 rounded-full opacity-20 blur-2xl animate-pulse-slow" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-soil-500 rounded-full opacity-20 blur-2xl animate-pulse-slow" />
          </div>
        </div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-16 text-white"
          viewBox="0 0 1440 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 48h1440V0c-240 48-480 48-720 24C480 0 240 0 0 24v24z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
