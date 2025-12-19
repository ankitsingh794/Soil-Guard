'use client';

import React from 'react';
import { Building2, Users, TrendingUp, Award, ArrowRight, CheckCircle } from 'lucide-react';

const CSRSection: React.FC = () => {
  const benefits = [
    'Direct impact on 140M+ farmers',
    'Measurable environmental outcomes',
    'Tax benefits & CSR compliance',
    'Brand visibility in rural India',
    'Quarterly impact reports',
    'Sustainable development goals'
  ];

  const opportunities = [
    {
      icon: <Building2 className="w-6 h-6" />,
      title: 'Village Adoption',
      amount: '₹35,000',
      description: 'Full pilot village setup',
      impact: 'Reaches 500+ farmers'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'District Partnership',
      amount: '₹2.75L',
      description: 'Scale across a district',
      impact: 'Impacts 5,000+ farmers'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'State-Level Program',
      amount: 'Custom',
      description: 'State-wide implementation',
      impact: 'Transform entire regions'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-soil-50 via-sand-50 to-botanical-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-botanical-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-soil-500 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-botanical-100 text-botanical-700 rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            <span>CSR Partnership Opportunities</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-soil-800 mb-4">
            Partner for
            <span className="text-gradient"> Sustainable Impact</span>
          </h2>
          <p className="text-lg text-soil-600">
            Join India's leading corporates in transforming agriculture. 
            Tap into the ₹5,000+ crore CSR opportunity while making real social impact.
          </p>
        </div>

        {/* Partnership tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {opportunities.map((opportunity, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 lg:p-8 shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-botanical-300"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-botanical-100 text-botanical-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                {opportunity.icon}
              </div>
              <h3 className="text-xl font-bold text-soil-800 mb-2">
                {opportunity.title}
              </h3>
              <div className="text-3xl font-bold text-botanical-600 mb-3">
                {opportunity.amount}
              </div>
              <p className="text-soil-600 mb-2">
                {opportunity.description}
              </p>
              <p className="text-sm text-botanical-600 font-semibold mb-4">
                {opportunity.impact}
              </p>
              <button className="w-full px-4 py-2 bg-botanical-500 text-white rounded-lg font-semibold hover:bg-botanical-600 transition-colors flex items-center justify-center gap-2 group-hover:gap-3 duration-300">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Benefits section */}
        <div className="bg-gradient-to-br from-soil-800 to-botanical-900 rounded-2xl p-8 lg:p-12 shadow-xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left - Benefits list */}
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">
                Why Partner with SoilGuard?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-sand-100"
                  >
                    <CheckCircle className="w-5 h-5 text-botanical-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Stats & CTA */}
            <div className="space-y-6">
              {/* Market opportunity */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white">Market Opportunity</h4>
                  <TrendingUp className="w-6 h-6 text-botanical-300" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-sand-200 text-sm">CSR Budget (Annual)</span>
                    <span className="text-2xl font-bold text-botanical-300">₹5,000Cr+</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-sand-200 text-sm">Market Growth</span>
                    <span className="text-2xl font-bold text-botanical-300">11% CAGR</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-sand-200 text-sm">Farmers Needing Help</span>
                    <span className="text-2xl font-bold text-botanical-300">140M+</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <button className="w-full px-6 py-4 bg-white text-soil-800 rounded-xl font-bold hover:bg-sand-100 transition-colors shadow-lg flex items-center justify-center gap-2">
                Schedule CSR Discussion
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-center text-sand-300 text-sm">
                Join 50+ corporate partners making a difference
              </p>
            </div>
          </div>
        </div>

        {/* Bottom testimonial */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl p-6 lg:p-8 shadow-md max-w-2xl mx-auto border border-sand-200">
            <div className="flex items-center justify-center gap-1 text-yellow-500 mb-3">
              {'★'.repeat(5)}
            </div>
            <blockquote className="text-lg text-soil-700 italic mb-4">
              "Partnering with SoilGuard aligned perfectly with our CSR goals. 
              The measurable impact and transparent reporting made it an easy decision."
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-botanical-100 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-botanical-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-soil-800">Corporate Partner</p>
                <p className="text-sm text-soil-500">Leading Indian Conglomerate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CSRSection;
