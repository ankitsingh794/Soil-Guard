'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import ChatBot from '@/components/ChatBot';

export default function TermsPage() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using the Soil Guard website and services, you accept and agree to be bound by these Terms of Service.',
        'If you do not agree to these terms, please do not use our services.',
        'We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.',
      ],
    },
    {
      title: 'Use of Services',
      content: [
        'You must be at least 18 years old to use our services.',
        'You agree to provide accurate, current, and complete information during registration and use.',
        'You are responsible for maintaining the confidentiality of your account credentials.',
        'You agree not to use our services for any unlawful or prohibited purposes.',
      ],
    },
    {
      title: 'Product Information',
      content: [
        'We strive to provide accurate product descriptions, images, and pricing.',
        'However, we do not warrant that product descriptions or other content is accurate, complete, or error-free.',
        'We reserve the right to correct errors, inaccuracies, or omissions and to change or update information at any time without prior notice.',
        'All products are subject to availability.',
      ],
    },
    {
      title: 'Orders and Payments',
      content: [
        'By placing an order, you make an offer to purchase products at the stated price.',
        'We reserve the right to refuse or cancel any order for any reason.',
        'Payment must be received before order processing begins.',
        'All prices are in Indian Rupees (INR) and include applicable taxes unless stated otherwise.',
        'We accept various payment methods as displayed during checkout.',
      ],
    },
    {
      title: 'Shipping and Delivery',
      content: [
        'Shipping times are estimates and not guaranteed.',
        'We are not responsible for delays caused by shipping carriers or circumstances beyond our control.',
        'Risk of loss passes to you upon delivery to the shipping carrier.',
        'You are responsible for providing accurate shipping information.',
      ],
    },
    {
      title: 'Returns and Refunds',
      content: [
        'We offer a 30-day return policy on most products.',
        'Products must be returned in original condition with packaging.',
        'Refunds will be processed within 5-7 business days after receipt of returned items.',
        'Shipping costs for returns are the customer\'s responsibility unless the product is defective or incorrect.',
        'Some products may have specific return restrictions.',
      ],
    },
    {
      title: 'Intellectual Property',
      content: [
        'All content on this website, including text, images, logos, and designs, is owned by Soil Guard or our licensors.',
        'You may not copy, reproduce, distribute, or create derivative works without our written permission.',
        'Product names and trademarks are the property of their respective owners.',
      ],
    },
    {
      title: 'User Content',
      content: [
        'You may submit reviews, comments, and other content ("User Content").',
        'By submitting User Content, you grant us a non-exclusive, royalty-free license to use, reproduce, and display such content.',
        'You are responsible for your User Content and must not post anything illegal, offensive, or infringing.',
        'We reserve the right to remove any User Content at our discretion.',
      ],
    },
    {
      title: 'Limitation of Liability',
      content: [
        'TO THE MAXIMUM EXTENT PERMITTED BY LAW:',
        '• Our liability is limited to the amount you paid for the product or service',
        '• We are not liable for indirect, incidental, or consequential damages',
        '• We do not guarantee uninterrupted or error-free service',
        '• Use of our products and services is at your own risk',
      ],
    },
    {
      title: 'Product Use and Safety',
      content: [
        'Products must be used in accordance with provided instructions.',
        'We are not liable for misuse of products or failure to follow safety guidelines.',
        'Consult professional advice for specific applications or concerns.',
        'Keep products away from children and pets unless specified as safe.',
      ],
    },
    {
      title: 'Indemnification',
      content: [
        'You agree to indemnify and hold Soil Guard harmless from any claims, damages, or expenses arising from:',
        '• Your use of our services',
        '• Your violation of these terms',
        '• Your violation of any third-party rights',
      ],
    },
    {
      title: 'Governing Law',
      content: [
        'These terms are governed by the laws of India.',
        'Any disputes shall be subject to the exclusive jurisdiction of courts in Bangalore, Karnataka.',
        'If any provision is found unenforceable, the remaining provisions remain in effect.',
      ],
    },
    {
      title: 'Termination',
      content: [
        'We may terminate or suspend your account at any time for violations of these terms.',
        'You may close your account at any time by contacting us.',
        'Upon termination, your right to use our services ceases immediately.',
      ],
    },
    {
      title: 'Contact Information',
      content: [
        'For questions about these Terms of Service, contact us:',
        'Email: legal@soilguard.com',
        'Phone: +91 123 456 7890',
        'Address: 123 Green Lane, Eco District, Bangalore, Karnataka 560001',
      ],
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <div className="bg-gradient-to-br from-botanical-500 to-soil-600 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-botanical-100">
              Last Updated: November 15, 2025
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="section-spacing bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-soil-700 leading-relaxed mb-8">
                Welcome to Soil Guard. These Terms of Service ("Terms") govern your access to and
                use of our website, products, and services. Please read these terms carefully
                before using our services.
              </p>

              {sections.map((section, index) => (
                <div key={index} className="mb-12">
                  <h2 className="text-2xl font-display font-bold text-soil-800 mb-4">
                    {index + 1}. {section.title}
                  </h2>
                  <div className="space-y-3">
                    {section.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-soil-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              <div className="mt-12 p-6 bg-accent-warning/10 border-l-4 border-accent-warning rounded-r-lg">
                <p className="text-soil-700 font-medium">
                  <strong>Important:</strong> By using Soil Guard's services, you acknowledge that
                  you have read, understood, and agree to be bound by these Terms of Service and
                  our Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ChatBot />
    </Layout>
  );
}
