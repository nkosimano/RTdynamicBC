import React, { useState } from 'react';
import { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import Step1_CoreInfo from '../components/forms/Step1_CoreInfo';
import Step2_Operations from '../components/forms/Step2_Operations';
import Step3_Compliance from '../components/forms/Step3_Compliance';
import Step4_GoalsAndContact from '../components/forms/Step4_GoalsAndContact';
import { FormData, QuoteResult } from '@/types/formData';
import { calculateQuote } from '../api/_pricingEngine';
import { EmailService } from '../services/emailService';

const HealthCheckPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    companyInfo: {
      entityType: '',
      revenue: '',
      companyName: '',
      industry: '',
    },
    operations: {
      hasEmployees: '',
      managesStock: '',
      usesForeignCurrency: '',
    },
    compliance: {
      isCipcReturnFiled: 'unsure',
      isBeneficialOwnershipFiled: 'unsure',
    },
    goals: {
      currentChallenges: '',
      primaryGoal: 'compliance',
      timeline: 'flexible',
      budget: 'under-5k',
    },
    contact: {
      fullName: '',
      email: '',
      phone: '',
      preferredContact: 'email',
    },
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Calculate total steps dynamically based on entity type
  const getTotalSteps = () => {
    return formData.companyInfo.entityType === 'p_ltd' ? 4 : 3;
  };
  
  const totalSteps = getTotalSteps();
  const progress = (currentStep / totalSteps) * 100;

  useEffect(() => {
    try {
      const trackingData = JSON.parse(localStorage.getItem('userInterest') || '{}');
      trackingData.healthCheck = (trackingData.healthCheck || 0) + 1;
      localStorage.setItem('userInterest', JSON.stringify(trackingData));
    } catch (error) {
      console.error("Failed to parse or set user interest in localStorage", error);
    }
  }, []);

  // Navigation logic with conditional step handling
  const getNextStep = (current: number) => {
    if (current === 2 && formData.companyInfo.entityType !== 'p_ltd') {
      return 3; // Go to final step (which is step 3 for non-Pty Ltd)
    }
    return current + 1;
  };

  const getPreviousStep = (current: number) => {
    if (current === 3 && formData.companyInfo.entityType !== 'p_ltd') {
      return 2; // Skip compliance step when going back
    }
    return current - 1;
  };

  const handleNext = () => {
    const nextStep = getNextStep(currentStep);
    if (nextStep <= totalSteps) {
      setCurrentStep(nextStep);
    }
  };

  const handlePrevious = () => {
    const prevStep = getPreviousStep(currentStep);
    if (prevStep >= 1) {
      setCurrentStep(prevStep);
    }
  };

  const handleSubmit = async () => {
     console.log('Form submitted:', formData);
     try {
       const calculatedQuote = calculateQuote(formData);
       setIsSubmitted(true);
       
       // Send health check report via email
       try {
         await EmailService.sendHealthCheckReport(formData, calculatedQuote);
         console.log('Health check report sent successfully');
       } catch (emailError) {
         console.error('Failed to send email:', emailError);
         // Don't show error to user as the main functionality worked
       }
     } catch (error) {
       console.error('Error processing submission:', error);
     }
   };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background-offwhite py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <Card className="text-center py-12">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Thank You for Your Submission!
              </h2>
              <div className="space-y-4 text-gray-600 max-w-2xl mx-auto">
                <p className="text-lg">
                  We have successfully received your business health check information.
                </p>
                <p>
                  Our team will carefully review your submission and prepare a customized analysis and quote based on your specific needs.
                </p>
                <p className="font-medium text-primary-600">
                  We will contact you within 24 hours to discuss the next steps.
                </p>
              </div>
            </Card>

            {/* Next Steps */}
            <Card className="p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                What Happens Next?
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary-600 font-bold text-lg">1</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Review & Analysis</h4>
                  <p className="text-gray-600 text-sm">
                    Our experts will analyze your business requirements and current setup
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary-600 font-bold text-lg">2</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Personal Consultation</h4>
                  <p className="text-gray-600 text-sm">
                    We'll schedule a call to discuss your specific needs and answer questions
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary-600 font-bold text-lg">3</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Custom Proposal</h4>
                  <p className="text-gray-600 text-sm">
                    Receive a detailed proposal with pricing and implementation timeline
                  </p>
                </div>
              </div>
            </Card>

            <div className="text-center">
              <Link to="/">
                <Button variant="outline" className="mr-4">
                  Back to Home
                </Button>
              </Link>
              <Link to="/contact">
                <Button>
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-offwhite py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="mb-6">Business Health Check</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Get a comprehensive analysis of your business's financial health and discover 
            optimization opportunities in just a few minutes.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar 
            progress={progress} 
            variant="primary" 
            showLabel 
            label={`Step ${currentStep} of ${totalSteps}`}
          />
        </div>

        <Card>
          {/* Step 1: Core Info */}
          {currentStep === 1 && (
            <Step1_CoreInfo formData={formData} setFormData={setFormData} />
          )}

          {/* Step 2: Operations */}
          {currentStep === 2 && (
            <Step2_Operations formData={formData} setFormData={setFormData} />
          )}

          {/* Step 3: Compliance (Only for Pty Ltd) */}
          {currentStep === 3 && formData.companyInfo.entityType === 'p_ltd' && (
            <Step3_Compliance formData={formData} setFormData={setFormData} />
          )}

          {/* Step 4: Goals & Contact */}
          {(currentStep === 4 && formData.companyInfo.entityType === 'p_ltd') || 
           (currentStep === 3 && formData.companyInfo.entityType !== 'p_ltd') ? (
            <Step4_GoalsAndContact formData={formData} setFormData={setFormData} />
          ) : null}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            <div className="flex space-x-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    i + 1 <= currentStep ? 'bg-secondary-teal' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {(() => {
              const isLastStep = currentStep === totalSteps;
              
              return isLastStep ? (
                <Button variant="accent" onClick={handleSubmit}>
                  Submit & Get Quote
                </Button>
              ) : (
                <Button variant="primary" onClick={handleNext}>
                  Next
                </Button>
              );
            })()}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HealthCheckPage;