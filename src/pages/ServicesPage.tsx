import React from 'react';
import { useEffect } from 'react';
import { TrendingUp, Shield, Users, FileCheck, Calculator, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Hero from '../components/Hero';
import Modal from '../components/Modal';

const ServicesPage: React.FC = () => {
  const [selectedService, setSelectedService] = React.useState<number | null>(null);

  useEffect(() => {
    try {
      const trackingData = JSON.parse(localStorage.getItem('userInterest') || '{}');
      trackingData.services = (trackingData.services || 0) + 1;
      localStorage.setItem('userInterest', JSON.stringify(trackingData));
    } catch (error) {
      console.error("Failed to parse or set user interest in localStorage", error);
    }
  }, []);

  const services = [
    {
      icon: Calculator,
      title: 'Accounting Services',
      description: 'Full range of accounting services designed to support businesses in managing their financial health and ensuring long-term success.',
      features: ['Annual Financial Statements', 'Management Accounts', 'Bank Reconciliations', 'Monthly Bookkeeping', 'Budgeting & Forecasting', 'Financial Analysis & Reporting'],
      detailedDescription: 'At RTdynamicBC, we offer a full range of Accounting Services designed to support businesses in managing their financial health and ensuring long-term success. Our team of qualified Chartered Accountants deliver accurate, timely, and reliable financial information, helping you make informed decisions and stay compliant with regulations.',
      benefits: [
        'Accurate and timely financial reporting',
        'Professional annual financial statements',
        'Monthly management accounts for decision making',
        'Streamlined bank reconciliation processes',
        'Comprehensive budgeting and forecasting support'
      ],
      process: [
        'Initial financial records assessment',
        'Setup of accounting systems and processes',
        'Monthly bookkeeping and reconciliations',
        'Quarterly management reporting',
        'Annual financial statement preparation'
      ]
    },
    {
      icon: FileCheck,
      title: 'Taxation Services',
      description: 'Comprehensive taxation services to help businesses and individuals navigate tax complexities, minimize liabilities, and ensure full compliance.',
      features: ['Income Tax', 'Provisional Income Tax', 'Bank Reconciliations', 'Audit Facilitation with SARS'],
      detailedDescription: 'At RTdynamicBC, we offer comprehensive Taxation Services to help businesses and individuals navigate the complexities of tax laws, minimize liabilities, and ensure full compliance with all regulations. Our team of qualified Chartered Accountants provides personalized solutions tailored to your unique financial situation, maximising tax efficiency and minimising risks.',
      benefits: [
        'Minimize tax liabilities through strategic planning',
        'Ensure full compliance with SARS regulations',
        'Professional audit facilitation and support',
        'Timely provisional tax submissions',
        'Expert guidance on complex tax matters'
      ],
      process: [
        'Tax situation assessment and planning',
        'Quarterly provisional tax calculations',
        'Annual income tax preparation and filing',
        'SARS audit support and facilitation',
        'Ongoing tax advisory and compliance monitoring'
      ]
    },
    {
      icon: Shield,
      title: 'Auditing & Assurance',
      description: 'Comprehensive audit & assurance services to help businesses ensure accuracy, compliance, and transparency in their financial reporting.',
      features: ['Independent Reviews', 'Internal Audit'],
      detailedDescription: 'At RTdynamicBC, we offer comprehensive Audit & Assurance services to help businesses ensure accuracy, compliance, and transparency in their financial reporting. Our team of qualified Chartered Accountants provides independent and objective audits, enhancing your business credibility and helping you meet regulatory standards.',
      benefits: [
        'Enhanced business credibility with stakeholders',
        'Independent and objective financial assessments',
        'Improved internal controls and risk management',
        'Compliance with regulatory audit requirements',
        'Professional audit opinions and recommendations'
      ],
      process: [
        'Audit planning and risk assessment',
        'Detailed examination of financial records',
        'Testing of internal controls and procedures',
        'Audit findings and recommendations',
        'Final audit report and management letter'
      ]
    },
    {
      icon: Users,
      title: 'Payroll Services',
      description: 'Reliable and efficient payroll services to ensure your employees are paid accurately and on time, while keeping your business compliant.',
      features: ['Monthly EMP201 submissions', 'Bi-Annual EMP501', 'Annual IRP5s submissions', 'Monthly Pay Slip compilation', 'Regular UIF submissions'],
      detailedDescription: 'At RTdynamicBC, we offer reliable and efficient Payroll Services to ensure your employees are paid accurately and on time, while also keeping your business compliant with ever-changing tax regulations. Our payroll solutions are tailored to your company\'s needs, providing peace of mind and allowing you to focus on your core business operations.',
      benefits: [
        'Accurate and timely employee payments',
        'Full compliance with SARS and UIF requirements',
        'Professional monthly payslips and reports',
        'Automated tax submissions and filings',
        'Peace of mind with expert payroll management'
      ],
      process: [
        'Payroll system setup and employee data capture',
        'Monthly payroll processing and calculations',
        'Generation of payslips and reports',
        'SARS submissions (EMP201, EMP501, IRP5s)',
        'UIF submissions and compliance monitoring'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Finance & Other Services',
      description: 'Wide range of finance and business services designed to support the financial health, growth, and sustainability of your business.',
      features: ['Business Development & Strategy', 'Market Research & Business Plans', 'Business Registrations', 'CIPC Services', 'CSD Services', 'NCR Compliance Documents', 'Financial Analysis & Valuations', 'Asset Management'],
      detailedDescription: 'At RTdynamicBC, we provide a wide range of Finance & Other Services designed to support the financial health, growth, and sustainability of your South African business. Our team of qualified CA(SA) Chartered Accountants offers customised solutions that help you manage your finances, minimise risks, and achieve your strategic goals while ensuring compliance with South African business regulations.',
      benefits: [
        'Comprehensive business development strategies',
        'Professional business plans and market research',
        'Streamlined business registration processes',
        'CIPC and CSD compliance support',
        'Expert financial valuations and analysis',
        'Professional asset management services'
      ],
      process: [
        'Business needs assessment and goal setting',
        'Strategy development and planning',
        'Implementation of recommended solutions',
        'Ongoing monitoring and support',
        'Regular review and optimization'
      ]
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <Hero
        title="Our Services"
        subtitle="Comprehensive financial operations solutions designed to optimize your South African business performance and ensure regulatory compliance."
      />

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} hover className="h-full">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-secondary-teal/10 rounded-full flex items-center justify-center">
                  <service.icon className="h-8 w-8 text-secondary-teal" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                </div>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-secondary-teal rounded-full mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="ghost" 
                  className="w-full mt-6"
                  onClick={() => setSelectedService(index)}
                >
                  Learn More
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-8">
            <h2>Ready to Optimize Your Financial Operations?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Let's discuss how our services can be tailored to meet your specific business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="accent" size="lg">
                  Schedule Consultation
                </Button>
              </Link>
              <Link to="/health-check">
                <Button variant="ghost" size="lg">
                  Start Health Check
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      {selectedService !== null && (
        (() => {
          const IconComponent = services[selectedService].icon;
          return (
        <Modal
          isOpen={true}
          onClose={() => setSelectedService(null)}
          title={services[selectedService].title}
        >
          <div className="space-y-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-secondary-teal/10 rounded-full flex items-center justify-center">
                <IconComponent className="h-6 w-6 text-secondary-teal" />
              </div>
              <h3 className="text-xl font-semibold">{services[selectedService].title}</h3>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Overview</h4>
              <p className="text-gray-600 leading-relaxed">
                {services[selectedService].detailedDescription}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Key Benefits</h4>
              <ul className="space-y-2">
                {services[selectedService].benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-semantic-success flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Our Process</h4>
              <ol className="space-y-2">
                {services[selectedService].process.map((step, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="w-6 h-6 bg-primary-navy text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 text-sm">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-background-offwhite rounded-lg p-6">
              <h4 className="font-semibold mb-3">Ready to Get Started?</h4>
              <p className="text-gray-600 text-sm mb-4">
                Contact us today to discuss how this service can benefit your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/contact" className="flex-1">
                  <Button variant="accent" size="md" className="w-full">
                    Schedule Consultation
                  </Button>
                </Link>
                <Link to="/health-check" className="flex-1">
                  <Button variant="ghost" size="md" className="w-full">
                    Start Health Check
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Modal>
          );
        })()
      )}
    </div>
  );
};

export default ServicesPage;