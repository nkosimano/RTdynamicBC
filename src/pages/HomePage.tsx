import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, TrendingUp, Shield, Users } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

import WebGLBackground, { WebGLBackgroundHandle } from '../components/WebGLBackground';
import AnimatedFinancialLine, { AnimationHandle } from '../components/AnimatedFinancialLine';

const HomePage: React.FC = () => {
  const main = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationHandle>(null);
  const webGLBackgroundRef = useRef<WebGLBackgroundHandle>(null);
  
  // Animation counter for cycling through different camera animations
  const animationCounterRef = useRef(0);

  useLayoutEffect(() => {
    const mainEl = main.current;
    if (!mainEl) return;

    // Spotlight effect that follows the mouse
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top } = mainEl.getBoundingClientRect();
      mainEl.style.setProperty('--x', `${e.clientX - left}px`);
      mainEl.style.setProperty('--y', `${e.clientY - top}px`);
    };

    // Enhanced click handler to cycle through different animations
    const handleClick = () => {
      animationRef.current?.speedUp();
      
      // Cycle through different camera animations
      const animations = ['triggerCameraAnimation', 'triggerDramaticZoom', 'triggerOrbitAnimation'] as const;
      const currentAnimation = animations[animationCounterRef.current % animations.length];
      webGLBackgroundRef.current?.[currentAnimation]();
      animationCounterRef.current++;
    };

    mainEl.addEventListener('mousemove', handleMouseMove);
    mainEl.addEventListener('click', handleClick);

    // Cleanup function to remove event listeners
    return () => {
      mainEl.removeEventListener('mousemove', handleMouseMove);
      mainEl.removeEventListener('click', handleClick);
    };
  }, []);

  const features = [
    {
      icon: TrendingUp,
      title: 'Financial Optimization',
      description: 'Streamline your financial operations with data-driven insights and strategic analysis.',
    },
    {
      icon: Shield,
      title: 'Compliance Management',
      description: 'Stay compliant with automated tracking and reporting for all regulatory requirements.',
    },
    {
      icon: Users,
      title: 'Expert Consultation',
      description: 'Access to seasoned financial professionals and business optimization specialists.',
    },
  ];

  const benefits = [
    'Professional annual financial statements',
    'Monthly bookkeeping and reconciliations',
    'SARS tax compliance and submissions',
    'Payroll processing and UIF management',
    'Business registration and CIPC services',
    'Expert audit and assurance services',
  ];

  return (
    <>
      <div ref={main} className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-navy to-primary-navy/90 text-white overflow-hidden">
        {/* Immersive 3D Background */}
        <div className="absolute inset-0 z-0">
          <WebGLBackground ref={webGLBackgroundRef} />
        </div>

        {/* Animated Line Component */}
        <div className="absolute inset-0 z-10 spotlight-effect">
          <AnimatedFinancialLine ref={animationRef} />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-white">
                Transform Your Financial Operations with RT Dynamic Business Consulting
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                Unlock your South African business potential with our comprehensive financial operations services. 
                From SARS compliance to strategic optimization, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/health-check">
                  <Button variant="accent" size="lg" icon={ArrowRight} iconPosition="right">
                    Start Free Health Check
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="ghost" size="lg" className="border-white text-white hover:bg-white hover:text-primary-navy">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-xl font-semibold mb-6 text-white">Quick Business Health Check</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-secondary-teal" />
                    <span className="text-gray-200">Financial Analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-secondary-teal" />
                    <span className="text-gray-200">Compliance Review</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-secondary-teal" />
                    <span className="text-gray-200">Optimization Opportunities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-4 mb-16">
          <h2>Why Choose RTdynamicBC?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive services combine cutting-edge technology with expert financial consultation 
            to deliver measurable results for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} hover className="text-center">
              <div className="w-16 h-16 bg-secondary-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <feature.icon className="h-8 w-8 text-secondary-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-background-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-8">Measurable Business Results</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-semantic-success flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <Card className="bg-primary-navy text-white">
              <h3 className="text-2xl font-semibold mb-6 text-white">Ready to Get Started?</h3>
              <p className="text-gray-200 mb-8 leading-relaxed">
                Take our comprehensive business health check and discover optimization 
                opportunities tailored specifically for your business.
              </p>
              <Link to="/health-check">
                <Button variant="accent" size="lg" className="w-full" icon={ArrowRight} iconPosition="right">
                  Get In Touch
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-gradient-to-r from-secondary-teal to-secondary-teal/90 rounded-2xl p-12 text-white">
          <h2 className="text-white mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Join hundreds of South African businesses that have achieved SARS compliance and optimized their financial operations with RTdynamicBC.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/health-check">
              <Button variant="accent" size="lg" icon={ArrowRight} iconPosition="right">
                Start Health Check
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost" size="lg" className="border-white text-white hover:bg-white hover:text-secondary-teal">
                Contact Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default HomePage;
