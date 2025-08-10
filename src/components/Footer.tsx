import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-secondary-teal" />
              <span>Sandton City, Johannesburg, Gauteng</span>
            </div>
            <p className="text-gray-300 text-sm">
              Your trusted partner for financial operations, compliance, and business optimization in South Africa.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/services" className="hover:text-secondary-teal transition-colors">Accounting Services</Link></li>
              <li><Link to="/services" className="hover:text-secondary-teal transition-colors">Taxation Services</Link></li>
              <li><Link to="/services" className="hover:text-secondary-teal transition-colors">Auditing & Assurance</Link></li>
              <li><Link to="/services" className="hover:text-secondary-teal transition-colors">Payroll Services</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/about" className="hover:text-secondary-teal transition-colors">About Us</Link></li>
              <li><Link to="/health-check" className="hover:text-secondary-teal transition-colors">Health Check</Link></li>
              <li><Link to="/contact" className="hover:text-secondary-teal transition-colors">Resources</Link></li>
              <li><Link to="/contact" className="hover:text-secondary-teal transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-secondary-teal" />
                <span>info@rtdynamicbc.co.za</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-secondary-teal" />
                <span>+27 65 892 0000</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-secondary-teal" />
                <span>Grand Central, Midrand, Johannesburg</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; 2025 RTdynamicBC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;