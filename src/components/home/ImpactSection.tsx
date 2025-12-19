'use client';

import React from 'react';
import { Users, TrendingUp, Trees, Award } from 'lucide-react';

const ImpactSection: React.FC = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: '140M+',
      label: 'Farmers Reached',
      description: 'Small & marginal farmers across India',
      color: 'botanical'
    },
    {
      icon: <Trees className="w-8 h-8" />,
      value: '300+',
      label: 'Trees Revived',
      description: 'Using our bio-soil care kits',
      color: 'soil'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: '50-100%',
      label: 'Yield Improvement',
      description: 'With personalized soil solutions',
      color: 'botanical'
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: '₹50-100',
      label: 'Affordable Testing',
      description: 'Accessible to every farmer',
      color: 'soil'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-botanical-50 via-white to-sand-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-botanical-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-soil-500 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-botanical-100 text-botanical-700 rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            <span>Real Impact, Real Results</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-soil-800 mb-4">
            Transforming Agriculture,
            <span className="text-gradient"> One Soil at a Time</span>
          </h2>
          <p className="text-lg text-soil-600">
            From an idea on paper to a movement restoring soil health across India—
            here's the impact we've made together.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 lg:p-8 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-botanical-300"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-${stat.color}-100 text-${stat.color}-600 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl lg:text-4xl font-bold text-soil-800">
                  {stat.value}
                </h3>
                <p className="text-lg font-semibold text-soil-700">
                  {stat.label}
                </p>
                <p className="text-sm text-soil-500">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 lg:mt-16 text-center">
          <div className="bg-gradient-to-r from-botanical-500 to-soil-600 rounded-2xl p-8 lg:p-12 shadow-xl">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Join the Soil Revolution
            </h3>
            <p className="text-botanical-100 text-lg mb-6 max-w-2xl mx-auto">
              Step by step, we're turning vision into reality. Be part of the movement 
              that's restoring soil health, improving yields, and empowering farmers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-botanical-600 rounded-lg font-semibold hover:bg-botanical-50 transition-colors shadow-lg">
                Start Your Journey
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
