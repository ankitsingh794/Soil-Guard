'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import { ArrowRight, Beaker, CheckCircle, Clock, FileText } from 'lucide-react';

const SoilTestingSection: React.FC = () => {
  const features = [
    {
      icon: <Beaker className="w-6 h-6" />,
      title: 'Lab-Certified Testing',
      description: 'Comprehensive analysis by certified laboratories',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Quick Results',
      description: 'Get detailed reports in 3-7 business days',
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Detailed Reports',
      description: 'Easy-to-understand results with recommendations',
    },
  ];

  const packages = [
    {
      name: 'Basic',
      price: 1499,
      tests: ['pH Level', 'NPK Analysis', 'Organic Matter', 'Soil Texture'],
      popular: false,
    },
    {
      name: 'Advanced',
      price: 2999,
      tests: ['Basic Tests', 'Micronutrients', 'EC & CEC', 'Heavy Metals'],
      popular: true,
    },
    {
      name: 'Premium',
      price: 4999,
      tests: ['Advanced Tests', 'Pesticide Residue', 'Bio-Activity', 'Custom Recommendations'],
      popular: false,
    },
  ];

  return (
    <section className="section-spacing bg-gradient-to-br from-botanical-50 via-white to-sand-50">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-botanical-100 text-botanical-700 rounded-full text-sm font-medium mb-6">
            <Beaker className="w-4 h-4" />
            <span>Professional Soil Analysis</span>
          </div>
          <h2 className="section-title mb-4">
            Know Your Soil,
            <span className="text-gradient block">Grow Better Results</span>
          </h2>
          <p className="text-soil-600 text-lg">
            Get comprehensive soil testing with detailed analysis and expert recommendations
            for optimal plant growth and soil health.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 bg-botanical-100 rounded-full flex items-center justify-center mx-auto mb-4 text-botanical-600">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-soil-800 mb-2">{feature.title}</h3>
              <p className="text-soil-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Packages */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`card p-8 relative hover:scale-105 transition-transform ${
                pkg.popular ? 'border-2 border-botanical-500 shadow-xl' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-botanical-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-soil-800 mb-2">{pkg.name}</h3>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold text-botanical-600">₹{pkg.price}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {pkg.tests.map((test, i) => (
                  <li key={i} className="flex items-start gap-2 text-soil-700">
                    <CheckCircle className="w-5 h-5 text-botanical-500 flex-shrink-0 mt-0.5" />
                    <span>{test}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={pkg.popular ? 'primary' : 'outline'}
                size="lg"
                className="w-full"
                onClick={() => window.location.href = '/soil-testing'}
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Select Package
              </Button>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-botanical-500 to-botanical-600 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Analyze Your Soil?</h3>
          <p className="text-botanical-100 text-lg mb-8 max-w-2xl mx-auto">
            Book a professional soil test today and receive detailed insights to optimize
            your soil health and plant growth.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => window.location.href = '/soil-testing'}
            rightIcon={<ArrowRight className="w-5 h-5" />}
          >
            Book Soil Testing Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SoilTestingSection;
