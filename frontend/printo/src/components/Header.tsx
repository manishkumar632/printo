'use client';

import { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">PrintO</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-purple-600 transition-colors">
              Products
            </Link>
            <Link href="/customize" className="text-gray-700 hover:text-purple-600 transition-colors">
              Customize
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-purple-600 transition-colors">
              Pricing
            </Link>
            <Link href="/how-it-works" className="text-gray-700 hover:text-purple-600 transition-colors">
              How It Works
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-gray-700 hover:text-purple-600 transition-colors">
              Sign In
            </Link>
            <Link 
              href="/get-started" 
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-purple-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link href="/products" className="block px-3 py-2 text-gray-700 hover:text-purple-600">
                Products
              </Link>
              <Link href="/customize" className="block px-3 py-2 text-gray-700 hover:text-purple-600">
                Customize
              </Link>
              <Link href="/pricing" className="block px-3 py-2 text-gray-700 hover:text-purple-600">
                Pricing
              </Link>
              <Link href="/how-it-works" className="block px-3 py-2 text-gray-700 hover:text-purple-600">
                How It Works
              </Link>
              <div className="border-t pt-3 mt-3">
                <Link href="/login" className="block px-3 py-2 text-gray-700 hover:text-purple-600">
                  Sign In
                </Link>
                <Link 
                  href="/get-started" 
                  className="block px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 mx-3 mt-2 text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;