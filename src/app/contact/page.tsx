'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ChatBot from '@/components/ChatBot';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Visit Us',
      details: ['123 Green Lane, Eco District', 'Bangalore, Karnataka 560001', 'India'],
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      details: ['+91 123 456 7890', '+91 987 654 3210', 'Mon-Sat: 9 AM - 6 PM'],
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Us',
      details: ['hello@soilguard.com', 'support@soilguard.com', 'sales@soilguard.com'],
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Working Hours',
      details: ['Monday - Friday: 9:00 AM - 7:00 PM', 'Saturday: 9:00 AM - 5:00 PM', 'Sunday: Closed'],
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-botanical-500 to-soil-600 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-botanical-100">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <section className="section-spacing bg-sand-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-32">
            {contactInfo.map((info, index) => (
              <div key={index} className="card p-6 text-center hover:shadow-card-hover transition-shadow">
                <div className="w-14 h-14 bg-botanical-100 rounded-full flex items-center justify-center mx-auto mb-4 text-botanical-600">
                  {info.icon}
                </div>
                <h3 className="text-lg font-semibold text-soil-800 mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-soil-600">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="section-spacing bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-display font-bold text-soil-800 mb-4">
                Send Us a Message
              </h2>
              <p className="text-soil-600 mb-8">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>

              {isSuccess && (
                <div className="bg-botanical-50 border border-botanical-200 rounded-lg p-4 mb-6">
                  <p className="text-botanical-700 font-medium">
                    ✓ Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="John Doe"
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="john@example.com"
                  />
                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-soil-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`input ${errors.subject ? 'border-accent-error' : ''}`}
                  >
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="bulk-order">Bulk Order</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && (
                    <p className="text-sm text-accent-error mt-1">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-soil-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your requirements..."
                    className={`input min-h-[150px] resize-y ${errors.message ? 'border-accent-error' : ''}`}
                  />
                  {errors.message && (
                    <p className="text-sm text-accent-error mt-1">{errors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  isLoading={isSubmitting}
                  rightIcon={<Send className="w-5 h-5" />}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-display font-bold text-soil-800 mb-4">
                  Find Our Store
                </h2>
                <p className="text-soil-600 mb-6">
                  Visit our physical location to see our products in person and speak with our soil experts.
                </p>
              </div>

              {/* Map Placeholder */}
              <div className="relative h-[400px] bg-soil-100 rounded-lg overflow-hidden shadow-card">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.1155811682844!2d77.59451931482229!3d12.96545099086649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBangalore%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Soil Guard Location"
                />
              </div>

              {/* Quick Contact */}
              <div className="card p-6 bg-botanical-50 border-botanical-200">
                <h3 className="text-xl font-semibold text-soil-800 mb-4">
                  Need Immediate Assistance?
                </h3>
                <p className="text-soil-600 mb-4">
                  Our customer support team is available during business hours. You can also chat with our AI assistant for instant help.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => window.location.href = 'tel:+911234567890'}
                    leftIcon={<Phone className="w-4 h-4" />}
                  >
                    Call Now
                  </Button>
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => {
                      // This would trigger the chatbot
                      const chatButton = document.querySelector('[aria-label="Open chat"]') as HTMLButtonElement;
                      chatButton?.click();
                    }}
                  >
                    Chat with Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="section-spacing bg-sand-50">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-soil-800 mb-4">
              Common Questions
            </h2>
            <p className="text-soil-600">
              Looking for quick answers? Check out our{' '}
              <a href="/help" className="text-botanical-600 hover:underline font-medium">
                Help Center
              </a>
            </p>
          </div>
        </div>
      </section>

      <ChatBot />
    </Layout>
  );
}
