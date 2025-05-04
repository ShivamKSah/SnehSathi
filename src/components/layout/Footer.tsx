import React from 'react';
import { NavLink } from 'react-router-dom';
import { Baby, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/snehsathika.png" 
                alt="SnehSathi Logo" 
                className="h-10 w-auto"
              />
              <span className="text-xl font-medium">SnehSathi</span>
            </div>
            <p className="text-gray-600 mb-6">
              Empowering mothers with AI-driven healthcare solutions for maternal well-being and childcare.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <NavLink to="/" className="text-gray-600 hover:text-primary">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about" className="text-gray-600 hover:text-primary">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/risk-assessment" className="text-gray-600 hover:text-primary">Health Risk Assessment</NavLink>
              </li>
              <li>
                <NavLink to="/nutrition" className="text-gray-600 hover:text-primary">Nutrition Guide</NavLink>
              </li>
              <li>
                <NavLink to="/schemes" className="text-gray-600 hover:text-primary">Healthcare Schemes</NavLink>
              </li>
              <li>
                <NavLink to="/community" className="text-gray-600 hover:text-primary">Community</NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <NavLink to="/articles" className="text-gray-600 hover:text-primary">Articles</NavLink>
              </li>
              <li>
                <NavLink to="/faq" className="text-gray-600 hover:text-primary">FAQ</NavLink>
              </li>
              <li>
                <NavLink to="/support" className="text-gray-600 hover:text-primary">Support</NavLink>
              </li>
              <li>
                <NavLink to="/privacy-policy" className="text-gray-600 hover:text-primary">Privacy Policy</NavLink>
              </li>
              <li>
                <NavLink to="/terms-of-service" className="text-gray-600 hover:text-primary">Terms of Service</NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail size={18} className="text-primary mr-3 mt-1 shrink-0" />
                <span className="text-gray-600">info@snehsathi.org</span>
              </li>
              <li className="flex items-start">
                <Phone size={18} className="text-primary mr-3 mt-1 shrink-0" />
                <span className="text-gray-600">+91 1234567890</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="text-primary mr-3 mt-1 shrink-0" />
                <span className="text-gray-600">SnehSathi Foundation, Healthcare Plaza, New Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} SnehSathi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
