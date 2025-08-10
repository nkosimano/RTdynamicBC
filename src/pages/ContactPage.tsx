import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/forms/Input';
import Select from '../components/forms/Select';
import Textarea from '../components/forms/Textarea';

interface ContactForm {
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const subjectOptions = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'consultation', label: 'Schedule Consultation' },
    { value: 'services', label: 'Services Information' },
    { value: 'support', label: 'Client Support' },
    { value: 'partnership', label: 'Partnership Opportunity' },
  ];

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: 'info@rtdynamicbc.co.za',
      description: 'Send us an email anytime',
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+27 11 234 5678',
      description: 'Mon-Fri from 8am to 5pm SAST',
    },
    {
      icon: MapPin,
      title: 'Office',
      details: 'Sandton, Johannesburg',
      description: 'Available for in-person meetings',
    },
    {
      icon: Clock,
      title: 'Response Time',
      details: '< 24 hours',
      description: 'We respond to all inquiries quickly',
    },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background-offwhite py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center">
            <div className="w-20 h-20 bg-semantic-success/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Send className="h-10 w-10 text-semantic-success" />
            </div>
            <h1 className="mb-6">Message Sent Successfully!</h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Thank you for reaching out to us. We've received your message and will get back to you 
              within 24 hours.
            </p>
            <Button variant="primary" size="lg" onClick={() => setIsSubmitted(false)}>
              Send Another Message
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-navy to-primary-navy/90 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            <h1 className="text-white">Contact Us</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your financial operations? Get in touch with our team of experts 
              and discover how we can help optimize your business.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <h2 className="mb-8">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                  
                  <Input
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john@company.com"
                    required
                  />
                  
                  <Input
                    label="Company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder="Your Company Name"
                  />
                  
                  <Input
                    label="Phone Number"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+27 65 892 0000"
                  />
                </div>
                
                <Select
                  label="Subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  options={subjectOptions}
                  placeholder="Select a subject"
                  required
                />
                
                <Textarea
                  label="Message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Tell us about your business needs and how we can help..."
                  rows={6}
                  required
                />
                
                <Button type="submit" variant="accent" size="lg" className="w-full" icon={Send} iconPosition="right">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Get in Touch</h3>
            <p className="text-gray-600 leading-relaxed">
              We're here to help you optimize your financial operations. Reach out through any of these channels.
            </p>
            
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-secondary-teal/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-6 w-6 text-secondary-teal" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-navy">{info.title}</h4>
                      <p className="text-lg font-medium text-text-charcoal">{info.details}</p>
                      <p className="text-sm text-gray-600">{info.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="bg-accent-ochre text-white p-6">
              <h4 className="text-lg font-semibold mb-3 text-white">Quick Start</h4>
              <p className="text-white/90 mb-4 text-sm">
                Not sure where to begin? Start with our free business health check.
              </p>
              <Button variant="primary" size="sm" className="w-full">
                Start Health Check
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-background-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2>Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Common questions about our services and process
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card>
              <h4 className="font-semibold mb-3">How long does the health check take?</h4>
              <p className="text-gray-600 text-sm">
                Our business health check takes about 10-15 minutes to complete. You'll receive 
                your comprehensive report within 1-2 business days.
              </p>
            </Card>
            
            <Card>
              <h4 className="font-semibold mb-3">What industries do you serve?</h4>
              <p className="text-gray-600 text-sm">
                We serve businesses across all South African industries, from emerging tech companies 
                to established mining and manufacturing enterprises. Our solutions comply with local regulations.
              </p>
            </Card>
            
            <Card>
              <h4 className="font-semibold mb-3">Do you offer ongoing support?</h4>
              <p className="text-gray-600 text-sm">
                Yes! We provide ongoing support to ensure your business remains SARS compliant 
                and your financial operations continue to improve over time.
              </p>
            </Card>
            
            <Card>
              <h4 className="font-semibold mb-3">How do you ensure data security?</h4>
              <p className="text-gray-600 text-sm">
                We use enterprise-grade security measures and comply with POPIA (Protection of Personal 
                Information Act) and all relevant South African data protection regulations.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;