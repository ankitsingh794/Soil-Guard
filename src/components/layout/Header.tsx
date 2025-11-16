'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingCart, Menu, X, User, Phone } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const itemCount = useCartStore((state) => state.getItemCount());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/categories/garden-lawn', label: 'Garden & Lawn' },
    { href: '/categories/industrial-remediation', label: 'Industrial' },
    { href: '/categories/indoor-planting', label: 'Indoor Plants' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-white'
      )}
    >
      {/* Top banner */}
      <div className="bg-botanical-500 text-white py-2">
        <div className="container-custom">
          <div className="flex items-center justify-between text-sm">
            <p className="hidden sm:block">
              🌱 Free shipping on orders over ₹2,000 | Certified Quality Soil Solutions
            </p>
            <div className="flex items-center gap-4 ml-auto">
              <Link
                href="/chat"
                className="flex items-center gap-1 hover:underline"
                aria-label="Open chat support"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">Need help? Chat with us</span>
                <span className="sm:hidden">Support</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container-custom py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-botanical-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">SG</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-display font-bold text-soil-700">
                Soil Guard
              </h1>
              <p className="text-xs text-soil-500">Smart Soil Solutions</p>
            </div>
          </Link>

          {/* Search bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden lg:flex flex-1 max-w-xl"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-soil-400 w-5 h-5" />
              <input
                type="search"
                placeholder="Search for soil solutions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-soil-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-botanical-500 focus:border-transparent"
                aria-label="Search products"
              />
            </div>
          </form>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <Link href="/chat">
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex"
              >
                Get Suggestion
              </Button>
            </Link>

            <Link
              href="/profile"
              className="p-2 hover:bg-sand-100 rounded-lg transition-colors"
              aria-label="My account"
            >
              <User className="w-6 h-6 text-soil-600" />
            </Link>

            <Link
              href="/cart"
              className="relative p-2 hover:bg-sand-100 rounded-lg transition-colors"
              aria-label={`Shopping cart with ${itemCount} items`}
            >
              <ShoppingCart className="w-6 h-6 text-soil-600" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-botanical-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-sand-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-soil-600" />
              ) : (
                <Menu className="w-6 h-6 text-soil-600" />
              )}
            </button>
          </div>
        </div>

        {/* Search bar - Mobile */}
        <form onSubmit={handleSearch} className="lg:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-soil-400 w-5 h-5" />
            <input
              type="search"
              placeholder="Search for soil solutions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-soil-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-botanical-500 focus:border-transparent"
            />
          </div>
        </form>

        {/* Desktop navigation */}
        <nav className="hidden lg:block mt-4 pt-4 border-t border-soil-200">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-botanical-600',
                    pathname === link.href
                      ? 'text-botanical-600'
                      : 'text-soil-700'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <nav className="lg:hidden border-t border-soil-200 bg-white">
          <ul className="container-custom py-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'block px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'bg-botanical-50 text-botanical-700'
                      : 'text-soil-700 hover:bg-sand-100'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link href="/chat" onClick={() => setIsMenuOpen(false)}>
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                >
                  Get Soil Suggestion
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
