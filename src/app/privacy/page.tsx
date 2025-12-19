'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import ChatBot from '@/components/ChatBot';

export default function PrivacyPage() {
  const sections = [
    {
      title: 'Information We Collect',
      content: [
        'Personal Information: When you create an account or place an order, we collect information such as your name, email address, phone number, shipping address, and payment details.',
        'Browsing Information: We automatically collect information about your device, browser, IP address, and how you interact with our website using cookies and similar technologies.',
        'Communication: When you contact us, we collect the information you provide in your messages.',
      ],
    },
    {
      title: 'How We Use Your Information',
      content: [
        'To process and fulfill your orders',
        'To communicate with you about your orders and account',
        'To provide customer support',
        'To send you marketing communications (with your consent)',
        'To improve our products, services, and website',
        'To prevent fraud and enhance security',
        'To comply with legal obligations',
      ],
    },
    {
      title: 'Information Sharing',
      content: [
        'We do not sell your personal information to third parties.',
        'We may share your information with:',
        '• Service Providers: Payment processors, shipping carriers, and other service providers who help us operate our business',
        '• Legal Requirements: When required by law or to protect our rights',
        '• Business Transfers: In connection with a merger, acquisition, or sale of assets',
      ],
    },
    {
      title: 'Data Security',
      content: [
        'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
        'Payment information is encrypted using SSL technology.',
        'We regularly review our security practices and update them as needed.',
      ],
    },
    {
      title: 'Cookies and Tracking',
      content: [
        'We use cookies and similar technologies to:',
        '• Remember your preferences and settings',
        '• Understand how you use our website',
        '• Improve website performance',
        '• Deliver personalized content and advertisements',
        'You can control cookies through your browser settings.',
      ],
    },
    {
      title: 'Your Rights',
      content: [
        'You have the right to:',
        '• Access your personal information',
        '• Correct inaccurate information',
        '• Request deletion of your information',
        '• Opt-out of marketing communications',
        '• Withdraw consent for data processing',
        'To exercise these rights, contact us at privacy@soilguard.com',
      ],
    },
    {
      title: 'Data Retention',
      content: [
        'We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.',
        'Order information is typically retained for 7 years for accounting and legal purposes.',
      ],
    },
    {
      title: 'Children\'s Privacy',
      content: [
        'Our services are not intended for children under 18 years of age.',
        'We do not knowingly collect personal information from children.',
        'If you believe we have collected information from a child, please contact us immediately.',
      ],
    },
    {
      title: 'Changes to This Policy',
      content: [
        'We may update this Privacy Policy from time to time.',
        'We will notify you of significant changes by posting the new policy on our website and updating the "Last Updated" date.',
        'Your continued use of our services after changes constitutes acceptance of the updated policy.',
      ],
    },
    {
      title: 'Contact Us',
      content: [
        'If you have questions about this Privacy Policy, please contact us:',
        'Email: privacy@soilguard.com',
        'Phone: +91 123 456 7890',
        'Address: Sector II, Kolkata, West Bengal, India',
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
              Privacy Policy
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
                At Soil Guard, we are committed to protecting your privacy and ensuring the security
                of your personal information. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you visit our website or use our services.
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

              <div className="mt-12 p-6 bg-botanical-50 border-l-4 border-botanical-500 rounded-r-lg">
                <p className="text-soil-700 font-medium">
                  By using our website and services, you agree to the collection and use of
                  information in accordance with this Privacy Policy.
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
