'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import ImpactSection from '@/components/home/ImpactSection';
import MissionSection from '@/components/home/MissionSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import FeaturedProductsSection from '@/components/home/FeaturedProductsSection';
import CompetitiveEdgeSection from '@/components/home/CompetitiveEdgeSection';
import WhatsAppSection from '@/components/home/WhatsAppSection';
import SoilTestingSection from '@/components/home/SoilTestingSection';
import CSRSection from '@/components/home/CSRSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ChatBot from '@/components/ChatBot';

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <ImpactSection />
      <MissionSection />
      <CategoriesSection />
      <CompetitiveEdgeSection />
      <WhatsAppSection />
      <HowItWorksSection />
      <FeaturedProductsSection />
      <SoilTestingSection />
      <CSRSection />
      <TestimonialsSection />
      <ChatBot />
    </Layout>
  );
}
