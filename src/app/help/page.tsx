'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ChatBot from '@/components/ChatBot';
import { Search, ChevronDown, ChevronUp, MessageCircle, Phone, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Topics' },
    { id: 'orders', label: 'Orders & Shipping' },
    { id: 'products', label: 'Products' },
    { id: 'payments', label: 'Payments' },
    { id: 'returns', label: 'Returns & Refunds' },
    { id: 'account', label: 'Account' },
  ];

  const faqs = [
    {
      category: 'orders',
      question: 'How long does shipping take?',
      answer:
        'Standard shipping typically takes 3-5 business days within India. Express shipping is available for delivery within 1-2 business days. Orders are processed within 24 hours of placement.',
    },
    {
      category: 'orders',
      question: 'Do you offer free shipping?',
      answer:
        'Yes! We offer free shipping on all orders over ₹2,000. For orders below this amount, a flat shipping fee of ₹150 applies.',
    },
    {
      category: 'orders',
      question: 'Can I track my order?',
      answer:
        'Absolutely! Once your order ships, you\'ll receive a tracking number via email. You can use this to track your package on our website or the carrier\'s website.',
    },
    {
      category: 'products',
      question: 'How do I choose the right soil for my needs?',
      answer:
        'Use our AI chatbot assistant to get personalized recommendations based on your specific project. You can also browse our product categories or read the detailed descriptions on each product page.',
    },
    {
      category: 'products',
      question: 'Are your products organic and certified?',
      answer:
        'Yes, all our products are lab-tested and certified for quality. Many of our products are organic certified. Check individual product pages for specific certifications.',
    },
    {
      category: 'products',
      question: 'What sizes are available?',
      answer:
        'We offer various package sizes ranging from 5kg bags to bulk orders of 1000kg+. Most products are available in 5kg, 10kg, 25kg, and 50kg packages.',
    },
    {
      category: 'payments',
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit/debit cards, UPI, net banking, and digital wallets. All payments are processed securely through encrypted channels.',
    },
    {
      category: 'payments',
      question: 'Is it safe to use my credit card?',
      answer:
        'Yes, absolutely! We use industry-standard SSL encryption and PCI-compliant payment gateways to ensure your payment information is completely secure.',
    },
    {
      category: 'returns',
      question: 'What is your return policy?',
      answer:
        'We offer a 30-day return policy on all products. If you\'re not satisfied with your purchase, you can return it for a full refund or exchange, provided it\'s in original condition.',
    },
    {
      category: 'returns',
      question: 'How do I return a product?',
      answer:
        'Contact our customer support team to initiate a return. We\'ll provide you with a return shipping label and instructions. Once we receive the returned item, we\'ll process your refund within 5-7 business days.',
    },
    {
      category: 'returns',
      question: 'Who pays for return shipping?',
      answer:
        'For defective or incorrect products, we cover return shipping costs. For change-of-mind returns, customers are responsible for return shipping fees.',
    },
    {
      category: 'account',
      question: 'Do I need an account to place an order?',
      answer:
        'No, you can checkout as a guest. However, creating an account lets you track orders, save addresses, and access exclusive offers.',
    },
    {
      category: 'account',
      question: 'How do I reset my password?',
      answer:
        'Click on "Forgot Password" on the login page. Enter your email address and we\'ll send you a link to reset your password.',
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const quickLinks = [
    { title: 'Track Your Order', description: 'Check the status of your delivery', link: '/track-order' },
    { title: 'Shipping Information', description: 'Learn about our shipping policies', link: '/shipping' },
    { title: 'Returns & Refunds', description: 'View our return policy', link: '/returns' },
    { title: 'Contact Support', description: 'Get in touch with our team', link: '/contact' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-botanical-500 to-soil-600 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              How Can We Help You?
            </h1>
            <p className="text-xl text-botanical-100 mb-8">
              Search our knowledge base or browse topics below
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-soil-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg text-soil-800 placeholder:text-soil-400 focus:outline-none focus:ring-2 focus:ring-botanical-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <section className="section-spacing bg-sand-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.link}
                className="card p-6 hover:shadow-card-hover transition-shadow group"
              >
                <h3 className="text-lg font-semibold text-soil-800 mb-2 group-hover:text-botanical-600 transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-soil-600">{link.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-spacing bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-display font-bold text-soil-800 mb-8 text-center">
            Frequently Asked Questions
          </h2>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-botanical-500 text-white'
                    : 'bg-sand-100 text-soil-700 hover:bg-sand-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="max-w-3xl mx-auto space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div key={index} className="card overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-sand-50 transition-colors"
                  >
                    <span className="font-semibold text-soil-800 pr-4">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-soil-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-soil-600 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-soil-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-soil-600">No results found. Try a different search or category.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="section-spacing bg-botanical-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-soil-800 mb-4">
              Still Need Help?
            </h2>
            <p className="text-lg text-soil-600 mb-8">
              Our support team is here to assist you
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="card p-6 text-center">
                <div className="w-12 h-12 bg-botanical-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-botanical-600" />
                </div>
                <h3 className="font-semibold text-soil-800 mb-2">Live Chat</h3>
                <p className="text-sm text-soil-600 mb-4">Chat with our AI assistant</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const chatButton = document.querySelector('[aria-label="Open chat"]') as HTMLButtonElement;
                    chatButton?.click();
                  }}
                >
                  Start Chat
                </Button>
              </div>

              <div className="card p-6 text-center">
                <div className="w-12 h-12 bg-botanical-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-botanical-600" />
                </div>
                <h3 className="font-semibold text-soil-800 mb-2">Call Us</h3>
                <p className="text-sm text-soil-600 mb-4">Mon-Sat: 9 AM - 6 PM</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.href = 'tel:+911234567890'}
                >
                  +91 123 456 7890
                </Button>
              </div>

              <div className="card p-6 text-center">
                <div className="w-12 h-12 bg-botanical-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-botanical-600" />
                </div>
                <h3 className="font-semibold text-soil-800 mb-2">Email Us</h3>
                <p className="text-sm text-soil-600 mb-4">Response within 24 hours</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.href = '/contact'}
                >
                  Contact Form
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ChatBot />
    </Layout>
  );
}
