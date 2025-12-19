'use client';

import React from 'react';
import { MessageCircle, Globe, Smartphone, Zap, Languages, Clock } from 'lucide-react';
import Image from 'next/image';

const WhatsAppSection: React.FC = () => {
  const features = [
    {
      icon: <Languages className="w-5 h-5" />,
      title: 'Multilingual Support',
      description: '100% support in your local language'
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Instant Responses',
      description: 'Get answers in seconds, not days'
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: '24/7 Available',
      description: 'Chat anytime, from anywhere'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-green-50 via-white to-botanical-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-green-500 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              <MessageCircle className="w-4 h-4" />
              <span>Smart Communication</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-soil-800">
                Get Soil Advice on
                <span className="block text-green-600">WhatsApp 💬</span>
              </h2>
              <p className="text-lg text-soil-600 leading-relaxed">
                No app downloads. No technical knowledge needed. Just simple, 
                personalized soil guidance in your language, directly on WhatsApp.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm border border-sand-200 hover:border-green-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-soil-800 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-soil-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-1">
                    Start Chatting Now
                  </h3>
                  <p className="text-green-100 text-sm">
                    Send "Hi" to get started with personalized soil advice
                  </p>
                </div>
                <button className="flex-shrink-0 px-6 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors shadow-md">
                  Open WhatsApp
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-green-600">₹50/mo</div>
                <div className="text-sm text-soil-600">Subscription Cost</div>
              </div>
              <div className="w-px h-12 bg-soil-200" />
              <div>
                <div className="text-3xl font-bold text-green-600">10k+</div>
                <div className="text-sm text-soil-600">Active Users</div>
              </div>
              <div className="w-px h-12 bg-soil-200" />
              <div>
                <div className="text-3xl font-bold text-green-600">15+</div>
                <div className="text-sm text-soil-600">Languages</div>
              </div>
            </div>
          </div>

          {/* Right image/mockup */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              {/* Phone mockup */}
              <div className="relative mx-auto w-full max-w-sm">
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-[3rem] p-4 shadow-2xl">
                  <div className="bg-white rounded-[2.5rem] overflow-hidden">
                    {/* Status bar */}
                    <div className="bg-green-600 text-white px-6 py-3 flex items-center justify-between">
                      <span className="text-sm font-semibold">SoilGuard Bot</span>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-xs">Online</span>
                      </div>
                    </div>
                    
                    {/* Chat messages */}
                    <div className="p-4 space-y-3 bg-green-50 h-96 overflow-hidden">
                      {/* Bot message */}
                      <div className="flex items-start gap-2">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                          🌱
                        </div>
                        <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-sm max-w-[75%]">
                          <p className="text-sm text-soil-800">
                            Namaste! I'm your soil health assistant. How can I help you today?
                          </p>
                          <span className="text-xs text-soil-400 mt-1 block">9:00 AM</span>
                        </div>
                      </div>

                      {/* User message */}
                      <div className="flex items-start gap-2 justify-end">
                        <div className="bg-green-500 text-white rounded-2xl rounded-tr-none p-3 shadow-sm max-w-[75%]">
                          <p className="text-sm">
                            मेरी मिट्टी में पोषक तत्व कम हैं। क्या करूँ?
                          </p>
                          <span className="text-xs text-green-100 mt-1 block text-right">9:01 AM</span>
                        </div>
                      </div>

                      {/* Bot response */}
                      <div className="flex items-start gap-2">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                          🌱
                        </div>
                        <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-sm max-w-[75%]">
                          <p className="text-sm text-soil-800">
                            आपकी मिट्टी के लिए हमारे बायो-सॉइल किट की सिफारिश करता हूँ। ₹300 से शुरू होता है।
                          </p>
                          <button className="mt-2 text-xs text-green-600 font-semibold">
                            View Details →
                          </button>
                          <span className="text-xs text-soil-400 mt-1 block">9:01 AM</span>
                        </div>
                      </div>
                    </div>

                    {/* Input area */}
                    <div className="border-t border-sand-200 p-3 bg-white">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-sand-100 rounded-full px-4 py-2">
                          <span className="text-sm text-soil-400">Type your message...</span>
                        </div>
                        <button className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                          <MessageCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-lg border border-green-200 animate-float">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 shadow-lg border border-green-200 animate-float" style={{ animationDelay: '1s' }}>
                <Smartphone className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppSection;
