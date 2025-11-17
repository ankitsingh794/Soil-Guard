'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

const HeroSection: React.FC = () => {

  return (
    <section className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 overflow-hidden">
      {/* Modern animated background decoration */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-botanical-400 to-emerald-500 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-tr from-green-400 to-teal-500 rounded-full blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-botanical-300 to-green-300 rounded-full blur-3xl opacity-10" />
        
        {/* Floating particles */}
        <div className="absolute top-40 left-1/4 w-2 h-2 bg-botanical-500 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3s' }} />
        <div className="absolute top-60 right-1/3 w-3 h-3 bg-green-500 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-emerald-500 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3.5s' }} />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
      </div>

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[650px] py-16 lg:py-24">
          {/* Left content */}
          <div className="space-y-6 lg:space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-botanical-100 to-emerald-100 text-botanical-800 rounded-full text-sm font-semibold shadow-lg border border-botanical-200/50 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Premium Certified Soil Solutions</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-8xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-botanical-700 via-green-700 to-emerald-700 leading-none tracking-tight drop-shadow-sm">
                Soil Guard
              </h1>
              <h2 className="text-3xl lg:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 leading-tight tracking-wide">
                NATURE'S ALLY FARMER'S FRIEND
              </h2>
            </div>
            
            <p className="text-lg lg:text-xl text-soil-700 leading-relaxed max-w-xl font-medium">
              Empowering farmers and nature lovers with premium soil solutions. 
              From sustainable farming to lush gardens, we're your trusted partner 
              in nurturing the earth. AI-powered recommendations, quality tested, 
              delivered to your doorstep.
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

            {/* Soil Testing CTA - Modern card */}
            <div className="relative bg-gradient-to-br from-botanical-500 via-green-600 to-emerald-600 rounded-2xl p-6 shadow-2xl border border-white/20 backdrop-blur-sm overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl transform -translate-x-12 translate-y-12" />
              
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🔬</span>
                    <h3 className="text-white font-bold text-xl">
                      Professional Soil Testing
                    </h3>
                  </div>
                  <p className="text-green-50 text-sm font-medium">
                    Comprehensive soil analysis for optimal growth • Starting at ₹50-100
                  </p>
                </div>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => window.location.href = '/soil-testing'}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="whitespace-nowrap bg-white text-botanical-700 hover:bg-green-50 shadow-lg"
                >
                  Book Now
                </Button>
              </div>
            </div>

            {/* Trust indicators - Modern glassmorphism style */}
            <div className="flex flex-wrap items-center gap-4 lg:gap-6 pt-4">
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-md hover:shadow-lg transition-shadow border border-white/50">
                <div className="w-12 h-12 bg-gradient-to-br from-botanical-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">✓</span>
                </div>
                <div>
                  <p className="font-bold text-soil-800 text-sm">Quality Certified</p>
                  <p className="text-xs text-soil-600">Lab tested products</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-md hover:shadow-lg transition-shadow border border-white/50">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🌱</span>
                </div>
                <div>
                  <p className="font-bold text-soil-800 text-sm">Eco-Friendly</p>
                  <p className="text-xs text-soil-600">100% Sustainable</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-md hover:shadow-lg transition-shadow border border-white/50">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <p className="font-bold text-soil-800 text-sm">1000+ Reviews</p>
                  <p className="text-xs text-soil-600">Customer trusted</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right image - Enhanced with modern frame */}
          <div className="relative lg:h-[600px] h-[450px] animate-slide-up">
            {/* Modern frame with depth */}
            <div className="relative w-full h-full">
              {/* Layered background cards for depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-botanical-300 to-green-400 rounded-3xl transform rotate-3 opacity-20 blur-sm" />
              <div className="absolute inset-0 bg-gradient-to-br from-green-300 to-emerald-400 rounded-3xl transform -rotate-2 opacity-20 blur-sm" />
              
              {/* Main image container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 backdrop-blur-sm">
                <Image
                  src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80"
                  alt="Premium soil with healthy plants growing"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-soil-900/60 via-transparent to-transparent" />
                
                {/* Modern floating card with glassmorphism */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xl rounded-2xl p-5 shadow-2xl border border-white/50 hover:scale-[1.02] transition-transform duration-300">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-gradient-to-r from-botanical-500 to-green-500 text-white text-xs font-bold rounded-full">BESTSELLER</span>
                      </div>
                      <p className="font-bold text-soil-900 text-lg">Premium Garden Soil Mix</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex text-amber-400 text-lg">
                          {'★'.repeat(5)}
                        </div>
                        <span className="text-sm text-soil-600 font-semibold">(247)</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-botanical-600 to-green-600">₹699</p>
                      <p className="text-sm text-soil-500 line-through font-medium">₹899</p>
                      <p className="text-xs text-green-600 font-bold mt-1">22% OFF</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced decorative elements with animation */}
              <div className="absolute -top-8 -right-8 w-28 h-28 bg-gradient-to-br from-botanical-400 to-green-500 rounded-full opacity-30 blur-2xl animate-pulse" style={{ animationDuration: '3s' }} />
              <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-gradient-to-tr from-green-400 to-emerald-500 rounded-full opacity-25 blur-2xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
              <div className="absolute top-1/2 -right-12 w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full opacity-20 blur-xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '0.5s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Modern wave separator with gradient */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          className="w-full h-20 text-white drop-shadow-lg"
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.95)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
            </linearGradient>
          </defs>
          <path
            d="M0 60h1440V0c-240 50-480 50-720 25C480 0 240 0 0 25v35z"
            fill="url(#waveGradient)"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
