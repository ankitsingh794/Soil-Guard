'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import FeaturedProductsSection from '@/components/home/FeaturedProductsSection';
import SoilTestingSection from '@/components/home/SoilTestingSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ChatBot from '@/components/ChatBot';

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <CategoriesSection />
      <HowItWorksSection />
      <FeaturedProductsSection />
      <SoilTestingSection />
      <TestimonialsSection />
      <ChatBot />
    </Layout>
  );
}
