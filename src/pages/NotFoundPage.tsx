import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-offwhite flex items-center justify-center py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Card>
          <div className="space-y-8">
            <div className="w-24 h-24 bg-accent-ochre/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-4xl font-bold text-accent-ochre">404</span>
            </div>
            
            <div className="space-y-4">
              <h1>Page Not Found</h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button variant="primary" size="lg" icon={Home} iconPosition="left">
                  Go Home
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="lg" 
                icon={ArrowLeft} 
                iconPosition="left"
                onClick={() => window.history.back()}
              >
                Go Back
              </Button>
            </div>

            <div className="bg-background-offwhite rounded-lg p-6">
              <h3 className="font-semibold mb-4">Popular Pages</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <Link to="/services" className="text-secondary-teal hover:underline">
                  Our Services
                </Link>
                <Link to="/health-check" className="text-secondary-teal hover:underline">
                  Health Check
                </Link>
                <Link to="/about" className="text-secondary-teal hover:underline">
                  About Us
                </Link>
                <Link to="/contact" className="text-secondary-teal hover:underline">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NotFoundPage;