'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import ChatBot from '@/components/ChatBot';
import Button from '@/components/ui/Button';
import { Award, Users, Target, Heart, Leaf, TrendingUp } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  const values = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: 'Sustainability',
      description: 'We prioritize eco-friendly practices and sustainable sourcing in everything we do.',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Quality First',
      description: 'Every product is lab-tested and certified to ensure premium quality for our customers.',
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Customer Care',
      description: 'Your success is our success. We provide expert guidance and support at every step.',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Innovation',
      description: 'Constantly evolving our products and services to meet modern agricultural needs.',
    },
  ];

  const stats = [
    { number: '10+', label: 'Years Experience' },
    { number: '1000+', label: 'Happy Customers' },
    { number: '50+', label: 'Products' },
    { number: '100%', label: 'Certified Quality' },
  ];

  const team = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Chief Soil Scientist',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      bio: '20+ years in soil science and agricultural research',
    },
    {
      name: 'Priya Sharma',
      role: 'Operations Director',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      bio: 'Expert in sustainable supply chain management',
    },
    {
      name: 'Arjun Patel',
      role: 'Customer Success Lead',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      bio: 'Passionate about helping customers find the right solutions',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-botanical-500 to-soil-600 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              Growing Better Together
            </h1>
            <p className="text-xl text-botanical-100 mb-8">
              We're on a mission to provide premium soil solutions that help your plants,
              gardens, and projects thrive while protecting our planet.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <section className="section-spacing bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-soil-800 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-soil-700 leading-relaxed">
                <p>
                  Founded in 2015, Soil Guard began with a simple observation: quality soil is
                  the foundation of every successful garden, farm, and green space. Yet finding
                  the right soil for specific needs was complicated and time-consuming.
                </p>
                <p>
                  We set out to change that. Starting with a small team of soil scientists and
                  passionate gardeners, we developed a range of premium, lab-tested soil
                  products tailored for different applications.
                </p>
                <p>
                  Today, we're proud to serve thousands of homeowners, landscapers, and
                  industrial clients across India. Our commitment to quality, sustainability,
                  and customer success drives everything we do.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-card-hover">
              <Image
                src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800"
                alt="Our Team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-botanical-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-botanical-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-soil-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-spacing bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="card p-8">
              <div className="w-14 h-14 bg-botanical-100 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-botanical-600" />
              </div>
              <h3 className="text-2xl font-display font-bold text-soil-800 mb-4">
                Our Mission
              </h3>
              <p className="text-soil-700 leading-relaxed">
                To empower every grower with premium, sustainable soil solutions that make
                their projects succeed. We believe quality soil is the foundation of healthy
                plants and a healthier planet.
              </p>
            </div>
            <div className="card p-8">
              <div className="w-14 h-14 bg-soil-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-soil-600" />
              </div>
              <h3 className="text-2xl font-display font-bold text-soil-800 mb-4">
                Our Vision
              </h3>
              <p className="text-soil-700 leading-relaxed">
                To become India's most trusted soil solutions provider, known for innovation,
                sustainability, and unwavering commitment to customer success in every garden
                and field we serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-spacing bg-sand-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-soil-800 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-soil-600 max-w-2xl mx-auto">
              These core principles guide every decision we make and every product we create
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card p-6 text-center hover:shadow-card-hover transition-shadow">
                <div className="w-16 h-16 bg-botanical-100 rounded-full flex items-center justify-center mx-auto mb-4 text-botanical-600">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-soil-800 mb-3">{value.title}</h3>
                <p className="text-soil-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-spacing bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-soil-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-soil-600 max-w-2xl mx-auto">
              Passionate experts dedicated to your success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card overflow-hidden group">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-soil-800 mb-1">{member.name}</h3>
                  <p className="text-botanical-600 font-medium mb-3">{member.role}</p>
                  <p className="text-soil-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-gradient-to-br from-botanical-500 to-soil-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
              Ready to Transform Your Garden?
            </h2>
            <p className="text-xl text-botanical-100 mb-8">
              Join thousands of satisfied customers who trust Soil Guard for their soil needs
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => (window.location.href = '/products')}
                className="bg-white text-botanical-600 hover:bg-sand-50"
              >
                Shop Products
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => (window.location.href = '/contact')}
                className="border-white text-white hover:bg-white/10"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ChatBot />
    </Layout>
  );
}
