'use client';

import React from 'react';
import { Target, Heart, Shield, Sprout } from 'lucide-react';

const MissionSection: React.FC = () => {
  const missions = [
    {
      icon: <Sprout className="w-6 h-6" />,
      title: 'Restore Soil Health',
      description: 'Using eco-friendly, bio-based solutions that regenerate soil naturally and sustainably.'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Empower Farmers',
      description: 'Providing affordable soil testing and personalized guidance for better yields and income.'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Support Gardeners',
      description: 'Helping passionate gardeners grow healthy plants with proper soil knowledge and care.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Protect Biodiversity',
      description: 'Building a climate-smart model that strengthens food security and environmental health.'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-soil-900 via-soil-800 to-botanical-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-botanical-500 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sand-500 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium">
              <Target className="w-4 h-4" />
              <span>Our Purpose</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-display font-bold">
                Mission That
                <span className="block text-botanical-300">Drives Us Forward</span>
              </h2>
              <p className="text-lg text-sand-200 leading-relaxed">
                We're on a mission to restore soil health with eco-friendly solutions, 
                make technology accessible through multilingual support, and empower 
                small farmers with affordable testing and personalized guidance.
              </p>
            </div>

            {/* Vision statement */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="text-2xl">🌍</span>
                Our Vision
              </h3>
              <p className="text-sand-200">
                To build a climate-smart, sustainable agricultural model that improves 
                livelihoods, protects biodiversity, and strengthens food security across India.
              </p>
            </div>

            {/* Key stat */}
            <div className="flex items-center gap-6 pt-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-botanical-300">80%</div>
                <div className="text-sm text-sand-300">Small & Marginal Farmers</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <div className="text-4xl font-bold text-botanical-300">50%</div>
                <div className="text-sm text-sand-300">Farms Need Soil Care</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <div className="text-4xl font-bold text-botanical-300">11%</div>
                <div className="text-sm text-sand-300">Market Growth Rate</div>
              </div>
            </div>
          </div>

          {/* Right content - Mission cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {missions.map((mission, index) => (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 hover:border-botanical-300 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-botanical-500/20 text-botanical-300 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {mission.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {mission.title}
                </h3>
                <p className="text-sm text-sand-200 leading-relaxed">
                  {mission.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <div className="mt-16 text-center">
          <blockquote className="text-2xl lg:text-3xl font-display italic text-sand-100 max-w-4xl mx-auto">
            "Step by step, we've turned an idea into a real solution for farmers—
            from blueprint to brand, from website to working chatbot, and from vision to reality."
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
