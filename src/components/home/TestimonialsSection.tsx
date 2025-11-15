import React from 'react';
import { Star } from 'lucide-react';
import { mockTestimonials } from '@/lib/mockData';

const TestimonialsSection: React.FC = () => {
  return (
    <section className="section-spacing bg-gradient-to-br from-botanical-50 to-sand-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-soil-800 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-soil-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Soil Guard for their soil needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {mockTestimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="card p-6 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Rating */}
              <div className="flex text-yellow-500 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-soil-700 leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="pt-4 border-t border-soil-200">
                <p className="font-semibold text-soil-800">{testimonial.name}</p>
                <p className="text-sm text-soil-600">
                  {testimonial.role}
                  {testimonial.company && (
                    <span className="text-botanical-600"> • {testimonial.company}</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-display font-bold text-botanical-600 mb-2">
              1000+
            </p>
            <p className="text-soil-600">Happy Customers</p>
          </div>
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-display font-bold text-botanical-600 mb-2">
              4.8
            </p>
            <p className="text-soil-600">Average Rating</p>
          </div>
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-display font-bold text-botanical-600 mb-2">
              50+
            </p>
            <p className="text-soil-600">Soil Products</p>
          </div>
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-display font-bold text-botanical-600 mb-2">
              100%
            </p>
            <p className="text-soil-600">Quality Certified</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
