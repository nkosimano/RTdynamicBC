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
  const [quote, setQuote] = useState<QuoteResult | null>(null);

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

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    try {
      const calculatedQuote = calculateQuote(formData);
      setQuote(calculatedQuote);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error calculating quote:', error);
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background-offwhite py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <Card className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Health Check Complete!
              </h2>
              <p className="text-gray-600 mb-4">
                Thank you for completing our business health check. Here's your personalized quote:
              </p>
            </Card>

            {/* Quote Display */}
            {quote && (
              <div className="space-y-6">
                {/* Monthly Retainer */}
                {quote.monthlyTotal > 0 && (
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      Monthly Retainer
                      <span className="ml-auto text-2xl font-bold text-primary-600">
                        R{quote.monthlyTotal.toLocaleString()}
                      </span>
                    </h3>
                    {quote.breakdown?.monthly && (
                      <div className="space-y-2">
                        {quote.breakdown.monthly.map((item, index) => (
                          <div key={index} className="flex justify-between text-gray-600">
                            <span>{item.split(': R')[0]}</span>
                            <span>R{item.split(': R')[1]}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                )}

                {/* Annual Fees */}
                {quote.annualTotal > 0 && (
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      Annual Fees
                      <span className="ml-auto text-2xl font-bold text-primary-600">
                        R{quote.annualTotal.toLocaleString()}
                      </span>
                    </h3>
                    {quote.breakdown?.annual && (
                      <div className="space-y-2">
                        {quote.breakdown.annual.map((item, index) => (
                          <div key={index} className="flex justify-between text-gray-600">
                            <span>{item.split(': R')[0]}</span>
                            <span>R{item.split(': R')[1]}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                )}

                {/* Once-Off Fees */}
                {quote.onceOffTotal > 0 && (
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      Once-Off Fees
                      <span className="ml-auto text-2xl font-bold text-primary-600">
                        R{quote.onceOffTotal.toLocaleString()}
                      </span>
                    </h3>
                    {Array.isArray(quote.breakdown) && (
                      <div className="space-y-2">
                        {quote.breakdown.map((item, index) => (
                          <div key={index} className="flex justify-between text-gray-600">
                            <span>{item.split(': R')[0]}</span>
                            <span>R{item.split(': R')[1]}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                )}

                {/* Custom Quote Message */}
                {typeof quote.breakdown === 'string' && (
                  <Card className="p-6 text-center">
                    <p className="text-lg text-gray-700">{quote.breakdown}</p>
                  </Card>
                )}

                {/* Disclaimer */}
                <Card className="p-4 bg-gray-50">
                  <p className="text-sm text-gray-600 text-center">
                    *This is an estimate. Final pricing may vary after consultation.
                  </p>
                </Card>
              </div>
            )}

            <div className="text-center">
              <Link to="/">
                <Button variant="accent">
                  Return to Home
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