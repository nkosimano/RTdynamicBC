import React from 'react';
import Input from './Input';
import Select from './Select';
import Textarea from './Textarea';
import { TrendingUp } from 'lucide-react';
import { FormData } from '@/types/formData';

interface Goals {
  currentChallenges: string;
  primaryGoal: 'compliance' | 'growth' | 'cleanup';
}

interface Contact {
  email: string;
  phone: string;
}

interface Step4GoalsAndContactProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const Step4_GoalsAndContact: React.FC<Step4GoalsAndContactProps> = ({ formData, setFormData }) => {
  const primaryGoalOptions = [
    { value: 'compliance', label: 'Ensure Compliance & Risk Management' },
    { value: 'growth', label: 'Support Business Growth & Expansion' },
    { value: 'cleanup', label: 'Clean Up & Organize Financial Records' },
  ];

  const handleGoalsChange = (field: keyof Goals, value: string) => {
    setFormData(prev => ({
      ...prev,
      goals: {
        ...prev.goals,
        [field]: value
      }
    }));
  };

  const handleContactChange = (field: keyof Contact, value: string) => {
    setFormData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2>Goals &amp; Contact Information</h2>
        <p className="text-gray-600">Tell us about your objectives and how we can reach you</p>
      </div>
      
      <div className="space-y-6">
        <Select
          label="What is your primary goal for working with us?"
          value={formData.goals.primaryGoal}
          onChange={(e) => handleGoalsChange('primaryGoal', e.target.value as Goals['primaryGoal'])}
          options={primaryGoalOptions}
          placeholder="Select your primary goal"
          required
        />
        
        <Textarea
          label="What are your biggest financial or operational challenges?"
          value={formData.goals.currentChallenges}
          onChange={(e) => handleGoalsChange('currentChallenges', e.target.value)}
          placeholder="Describe your current challenges, pain points, or areas where you'd like to improve..."
          rows={6}
          helper="The more detail you provide, the better we can tailor our recommendations."
        />

        <div className="bg-accent-ochre/10 border border-accent-ochre/20 rounded-lg p-6">
          <h4 className="font-semibold text-accent-ochre mb-2">Common Areas We Help With:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Cash flow management and forecasting</li>
            <li>• Regulatory compliance and reporting</li>
            <li>• Cost reduction and efficiency improvements</li>
            <li>• Financial planning and budgeting</li>
            <li>• Risk management and mitigation</li>
            <li>• Business structure optimization</li>
          </ul>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Email Address"
              type="email"
              value={formData.contact.email}
              onChange={(e) => handleContactChange('email', e.target.value)}
              placeholder="your@email.com"
              required
            />
            
            <Input
              label="Phone Number"
              type="tel"
              value={formData.contact.phone}
              onChange={(e) => handleContactChange('phone', e.target.value)}
              placeholder="+27 65 892 0000"
            />
          </div>
        </div>

        <div className="bg-secondary-teal/10 border border-secondary-teal/20 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <TrendingUp className="h-6 w-6 text-secondary-teal flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-secondary-teal mb-2">What You'll Receive:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Comprehensive business health assessment</li>
                <li>• Personalized optimization recommendations</li>
                <li>• Priority areas for improvement</li>
                <li>• Estimated ROI projections</li>
                <li>• Next steps and implementation roadmap</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4_GoalsAndContact;