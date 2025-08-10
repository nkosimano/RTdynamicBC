import React from 'react';
import { useEffect } from 'react';
import { Users, Award, Target, TrendingUp, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

const AboutPage: React.FC = () => {
  useEffect(() => {
    try {
      const trackingData = JSON.parse(localStorage.getItem('userInterest') || '{}');
      trackingData.about = (trackingData.about || 0) + 1;
      localStorage.setItem('userInterest', JSON.stringify(trackingData));
    } catch (error) {
      console.error("Failed to parse or set user interest in localStorage", error);
    }
  }, []);

  const values = [
    {
      icon: Target,
      title: 'Precision',
      description: 'We deliver accurate, data-driven insights that drive real business results.',
    },
    {
      icon: Users,
      title: 'Partnership',
      description: 'We work alongside you as trusted advisors, not just service providers.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Our commitment to quality ensures exceptional outcomes for every client.',
    },
    {
      icon: TrendingUp,
      title: 'Growth',
      description: 'We focus on sustainable growth strategies that build long-term value.',
    },
  ];

  const team = [
    {
      name: 'Rabelani',
      role: 'Managing Director & CA(SA)',
      experience: '10+ years in South African business consulting',
      specialties: ['SARS Compliance', 'Financial Strategy', 'Business Development'],
    },
    {
      name: 'Tshepi',
      role: 'Senior Financial Consultant & CA(SA)',
      experience: '8+ years in financial operations',
      specialties: ['Tax Compliance', 'Financial Reporting', 'Audit & Assurance'],
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-navy to-primary-navy/90 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            <h1 className="text-white">About RTD FinOps</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              We are RT Dynamic Business Consulting, your trusted partner in financial operations 
              excellence. With decades of combined experience, we help businesses optimize their 
              financial performance and achieve sustainable growth.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2>Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              To empower South African businesses with the financial clarity and operational efficiency they need 
              to thrive in today's competitive landscape. We believe that every business deserves 
              access to enterprise-level financial expertise.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Through our comprehensive platform and expert consultation, we transform complex 
              financial challenges into clear, actionable strategies that drive measurable results.
            </p>
          </div>
          <Card className="bg-secondary-teal text-white">
            <h3 className="text-2xl font-semibold mb-6 text-white">Why We're Different</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-white flex-shrink-0" />
                <span>Personalized approach to every client</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-white flex-shrink-0" />
                <span>Technology-driven solutions</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-white flex-shrink-0" />
                <span>Proven track record of success</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-white flex-shrink-0" />
                <span>Ongoing support and partnership</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-background-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2>Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-navy/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-primary-navy" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2>Meet Our Team</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experienced professionals dedicated to your success
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <Card key={index} hover className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-secondary-teal to-primary-navy rounded-full mx-auto mb-6 flex items-center justify-center">
                <Users className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-secondary-teal font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm mb-4">{member.experience}</p>
              <div className="space-y-2">
                {member.specialties.map((specialty, specialtyIndex) => (
                  <span
                    key={specialtyIndex}
                    className="inline-block bg-primary-navy/10 text-primary-navy px-3 py-1 rounded-full text-xs font-medium mr-2 mb-2"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-accent-ochre to-accent-ochre/90 rounded-2xl p-12 text-white text-center">
          <h2 className="text-white mb-6">Ready to Work Together?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help optimize your financial operations and drive your business forward.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="primary" size="lg">
                Schedule Consultation
              </Button>
            </Link>
            <Link to="/health-check">
              <Button variant="ghost" size="lg" className="border-white text-white hover:bg-white hover:text-accent-ochre">
                Start Health Check
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;