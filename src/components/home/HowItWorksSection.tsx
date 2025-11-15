import React from 'react';
import { MessageCircle, Search, ShoppingCart } from 'lucide-react';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      number: '01',
      title: 'Tell Us Your Need',
      description: 'Use our AI assistant to describe your project or browse our categories to find what you need.',
    },
    {
      icon: <Search className="w-8 h-8" />,
      number: '02',
      title: 'Get Suggestions',
      description: 'Receive personalized soil recommendations based on your specific requirements and budget.',
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      number: '03',
      title: 'Buy & Deliver',
      description: 'Order online with secure checkout and get premium soil delivered right to your doorstep.',
    },
  ];

  return (
    <section className="section-spacing bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-soil-800 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-soil-600 max-w-2xl mx-auto">
            Finding the perfect soil solution has never been easier
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line - hidden on mobile */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] right-[-40%] h-0.5 bg-botanical-200">
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                    <div className="w-3 h-3 bg-botanical-200 rotate-45" />
                  </div>
                </div>
              )}

              <div className="relative bg-white rounded-2xl p-8 text-center group hover:shadow-card-hover transition-shadow">
                {/* Number badge */}
                <div className="absolute top-6 right-6 text-6xl font-display font-bold text-botanical-100 group-hover:text-botanical-200 transition-colors">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="relative z-10 w-16 h-16 mx-auto mb-6 bg-botanical-100 text-botanical-600 rounded-xl flex items-center justify-center group-hover:bg-botanical-500 group-hover:text-white transition-colors">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-soil-800 mb-3 relative z-10">
                  {step.title}
                </h3>
                <p className="text-soil-600 leading-relaxed relative z-10">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
