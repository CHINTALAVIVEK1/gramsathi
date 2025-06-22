import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sprout, Heart, ShoppingBag, Mic, TestTube } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: null },
    { name: 'KrishiConnect', href: '/krishi', icon: Sprout },
    { name: 'ArogyaSetu', href: '/arogya', icon: Heart },
    { name: 'Grameen Bazaar', href: '/bazaar', icon: ShoppingBag },
    { name: 'VoiceGov', href: '/voicegov', icon: Mic },
    { name: 'MittiCheck', href: '/mitti', icon: TestTube },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">ग</span>
              </div>
              <span className="text-xl font-bold text-gray-900">GramSathi</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                  }`}
                >
                  {Icon && <Icon size={16} />}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Language Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-sm text-gray-600 hover:text-primary-600 font-medium">
              हिंदी
            </button>
            <span className="text-gray-400">|</span>
            <button className="text-sm text-primary-600 font-medium">
              English
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary-600 focus:outline-none focus:text-primary-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                  }`}
                >
                  {Icon && <Icon size={18} />}
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <div className="flex items-center space-x-4 px-3 py-2">
              <button className="text-sm text-gray-600 hover:text-primary-600 font-medium">
                हिंदी
              </button>
              <span className="text-gray-400">|</span>
              <button className="text-sm text-primary-600 font-medium">
                English
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
