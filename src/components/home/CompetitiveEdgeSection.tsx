'use client';

import React from 'react';
import { Zap, DollarSign, Globe, Leaf, Shield, Target } from 'lucide-react';

const CompetitiveEdgeSection: React.FC = () => {
  const advantages = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: 'Affordable Testing',
      description: '₹50-100 bio-soil testing',
      comparison: 'Private labs charge ₹500+'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Fast Results',
      description: 'Personalized results in 24-48 hours',
      comparison: 'Government tests take weeks'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Multilingual Support',
      description: '100% WhatsApp advisory in your language',
      comparison: 'Apps struggle with local languages'
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: 'Natural Solutions',
      description: 'Organic, yield-boosting bio-amendments',
      comparison: 'Others push harmful chemicals'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Long-term Care',
      description: 'Soil regeneration, not quick fixes',
      comparison: 'Big agri focuses on sales'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Farmer-First',
      description: 'Impact-focused & CSR-ready',
      comparison: 'Others prioritize profits'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #4A7C59 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container-custom relative">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-botanical-100 text-botanical-700 rounded-full text-sm font-medium mb-4">
            <Target className="w-4 h-4" />
            <span>Why Choose Us</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-soil-800 mb-4">
            Our
            <span className="text-gradient"> Competitive Edge</span>
          </h2>
          <p className="text-lg text-soil-600">
            Fast, affordable, and effective—SoilGuard combines what competitors can't. 
            We're farmer-first, impact-focused, and built for scale.
          </p>
        </div>

        {/* Comparison grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-white to-sand-50 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-sand-200 hover:border-botanical-300 overflow-hidden"
            >
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-botanical-500/5 to-soil-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-botanical-100 text-botanical-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {advantage.icon}
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-soil-800 mb-2">
                  {advantage.title}
                </h3>
                <p className="text-soil-700 font-medium mb-3">
                  ✓ {advantage.description}
                </p>
                
                {/* Comparison */}
                <div className="pt-3 border-t border-sand-200">
                  <p className="text-sm text-soil-500">
                    <span className="text-red-500">✗</span> Competitors: {advantage.comparison}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom highlight */}
        <div className="bg-gradient-to-r from-botanical-500 via-botanical-600 to-soil-600 rounded-2xl p-8 lg:p-12 shadow-xl text-center">
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Speed × Cost × Simplicity = SoilGuard
          </h3>
          <p className="text-botanical-100 text-lg mb-6 max-w-3xl mx-auto">
            We offer what no competitor combines: ₹50-100 testing, multilingual WhatsApp support, 
            and personalized natural solutions. Private labs are costly, apps are generic, and 
            sellers push chemicals. We stay farmer-first, impact-focused, and CSR-ready.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/30">
              <div className="text-2xl font-bold text-white">140M+</div>
              <div className="text-sm text-botanical-100">Potential Farmers</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/30">
              <div className="text-2xl font-bold text-white">50%</div>
              <div className="text-sm text-botanical-100">Farms Degraded</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/30">
              <div className="text-2xl font-bold text-white">11% CAGR</div>
              <div className="text-sm text-botanical-100">Market Growth</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitiveEdgeSection;
