import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sprout,
  Heart,
  ShoppingBag,
  Mic,
  TestTube,
  ArrowRight
} from 'lucide-react';

const Home = () => {
  const modules = [
    {
      name: 'KrishiConnect',
      description: 'Smart agriculture support with crop recommendations and weather updates',
      icon: Sprout,
      href: '/krishi',
      color: 'bg-green-500',
      features: ['Crop Recommendations', 'Weather Updates', 'Pest Alerts']
    },
    {
      name: 'ArogyaSetu Rural',
      description: 'Basic telemedicine and health information for rural communities',
      icon: Heart,
      href: '/arogya',
      color: 'bg-red-500',
      features: ['Symptom Checker', 'Health Tips', 'Doctor Connect']
    },
    {
      name: 'Grameen Bazaar',
      description: 'Local marketplace for farmers and rural entrepreneurs',
      icon: ShoppingBag,
      href: '/bazaar',
      color: 'bg-blue-500',
      features: ['Product Listings', 'Local Market', 'Secure Payments']
    },
    {
      name: 'VoiceGov',
      description: 'Government scheme awareness with chat support (Voice features coming soon)',
      icon: Mic,
      href: '/voicegov',
      color: 'bg-purple-500',
      features: ['Scheme Info', 'Chat Support', 'Voice Assistant (Soon)']
    },
    {
      name: 'MittiCheck',
      description: 'Soil health guidance and crop recommendations',
      icon: TestTube,
      href: '/mitti',
      color: 'bg-orange-500',
      features: ['Soil Analysis', 'Fertilizer Tips', 'Crop Planning']
    }
  ];



  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-yellow-400">GramSathi</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
              Empowering rural communities through unified digital solutions
            </p>
            <p className="text-lg mb-8 text-gray-200 max-w-2xl mx-auto">
              गांव की सेवा में - आपका डिजिटल साथी
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/krishi"
                className="btn-hero-primary flex items-center justify-center space-x-2"
              >
                <Sprout size={20} />
                <span>Start with Agriculture</span>
              </Link>
              <Link
                to="/arogya"
                className="btn-hero-secondary flex items-center justify-center space-x-2"
              >
                <Heart size={20} />
                <span>Health Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>



      {/* Modules Section */}
      <section className="py-16 bg-clean-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-clean-secondary max-w-2xl mx-auto">
              Comprehensive digital solutions designed specifically for rural communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <div key={index} className="card-clean overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 ${module.color} rounded-lg flex items-center justify-center mr-4 shadow-md`}>
                        <Icon className="text-white" size={24} />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">{module.name}</h3>
                    </div>
                    <p className="text-clean-secondary mb-4">{module.description}</p>
                    <ul className="space-y-2 mb-6">
                      {module.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-clean-secondary">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={module.href}
                      className="inline-flex items-center text-clean-primary hover:text-clean-accent font-medium transition-colors"
                    >
                      Explore {module.name}
                      <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
            Join thousands of rural communities already benefiting from GramSathi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/krishi"
              className="btn-hero-primary"
            >
              Start Your Journey
            </Link>
            <a
              href="tel:1800-123-4567"
              className="btn-hero-secondary"
            >
              Call for Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
