import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    products: [
      { label: 'Garden & Lawn', href: '/categories/garden-lawn' },
      { label: 'Indoor Planting', href: '/categories/indoor-planting' },
      { label: 'Industrial Remediation', href: '/categories/industrial-remediation' },
      { label: 'Specialty Soils', href: '/categories/specialty-soils' },
      { label: 'Organic Solutions', href: '/categories/organic' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Story', href: '/story' },
      { label: 'Certifications', href: '/certifications' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
    ],
    support: [
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Shipping Info', href: '/shipping' },
      { label: 'Returns & Refunds', href: '/returns' },
      { label: 'Track Order', href: '/track-order' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  };

  const trustBadges = [
    { icon: '🔒', label: 'Secure Checkout' },
    { icon: '✓', label: 'Certified Quality' },
    { icon: '🚚', label: 'Free Shipping' },
    { icon: '⭐', label: '1000+ Reviews' },
  ];

  return (
    <footer className="bg-soil-800 text-white">
      {/* Trust badges section */}
      <div className="bg-soil-700 py-8">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-3 text-center"
              >
                <span className="text-3xl">{badge.icon}</span>
                <span className="text-sm font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-botanical-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">SG</span>
              </div>
              <div>
                <h2 className="text-xl font-display font-bold">Soil Guard</h2>
                <p className="text-xs text-soil-300">Smart Soil Solutions</p>
              </div>
            </div>
            <p className="text-soil-300 mb-6 leading-relaxed">
              Your trusted partner for premium soil solutions. From garden beds to
              industrial sites, we provide certified, sustainable soil products
              tailored to your needs.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-botanical-400 flex-shrink-0 mt-0.5" />
                <span className="text-soil-300">
                  123 Green Lane, Eco District<br />
                  Bangalore, Karnataka 560001
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 text-botanical-400 flex-shrink-0" />
                <a href="tel:+911234567890" className="text-soil-300 hover:text-white transition-colors">
                  +91 123 456 7890
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-5 h-5 text-botanical-400 flex-shrink-0" />
                <a href="mailto:hello@soilguard.com" className="text-soil-300 hover:text-white transition-colors">
                  hello@soilguard.com
                </a>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-soil-700 hover:bg-botanical-500 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-soil-700 hover:bg-botanical-500 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-soil-700 hover:bg-botanical-500 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-soil-700 hover:bg-botanical-500 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Products</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-soil-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-soil-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2 mb-6">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-soil-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-soil-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter section */}
      <div className="border-t border-soil-700">
        <div className="container-custom py-8">
          <div className="max-w-2xl">
            <h3 className="font-semibold text-lg mb-2">Subscribe to Our Newsletter</h3>
            <p className="text-soil-300 text-sm mb-4">
              Get soil tips, product updates, and exclusive offers delivered to your inbox.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 rounded-lg bg-soil-700 border border-soil-600 text-white placeholder:text-soil-400 focus:outline-none focus:ring-2 focus:ring-botanical-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-botanical-500 hover:bg-botanical-600 rounded-lg font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-soil-700">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-soil-400">
            <p>
              © {currentYear} Soil Guard. All rights reserved.
            </p>
            <p className="flex items-center gap-1">
              Made with <span className="text-botanical-400">♥</span> for a greener tomorrow
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
