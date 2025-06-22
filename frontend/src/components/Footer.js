import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">ग</span>
              </div>
              <span className="text-xl font-bold">GramSathi</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Empowering rural communities through digital solutions. Connecting farmers, 
              health services, local markets, and government schemes in one unified platform.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone size={16} />
                <span>1800-123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail size={16} />
                <span>support@gramsathi.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/krishi" className="text-gray-300 hover:text-primary-400 transition-colors">
                  KrishiConnect
                </Link>
              </li>
              <li>
                <Link to="/arogya" className="text-gray-300 hover:text-primary-400 transition-colors">
                  ArogyaSetu Rural
                </Link>
              </li>
              <li>
                <Link to="/bazaar" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Grameen Bazaar
                </Link>
              </li>
              <li>
                <Link to="/voicegov" className="text-gray-300 hover:text-primary-400 transition-colors">
                  VoiceGov
                </Link>
              </li>
              <li>
                <Link to="/mitti" className="text-gray-300 hover:text-primary-400 transition-colors">
                  MittiCheck
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <button className="text-gray-300 hover:text-primary-400 transition-colors text-left">
                  Help Center
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-primary-400 transition-colors text-left">
                  Contact Us
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-primary-400 transition-colors text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-primary-400 transition-colors text-left">
                  Terms of Service
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-primary-400 transition-colors text-left">
                  FAQ
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 GramSathi. All rights reserved.
          </div>
          <div className="flex items-center space-x-1 text-gray-400 text-sm">
            <span>Made with</span>
            <Heart size={16} className="text-red-500" />
            <span>for rural India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
