import React from 'react';
import Input from './Input';
import Select from './Select';
import { FormData } from '@/types/formData';

interface CompanyInfo {
  entityType: 'sole_prop' | 'p_ltd' | 'other' | '';
  revenue: 'under-1m' | '1m-5m' | '5m-25m' | 'over-25m' | '';
  companyName: string;
  industry: string;
}

interface Step1CoreInfoProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const Step1_CoreInfo: React.FC<Step1CoreInfoProps> = ({ formData, setFormData }) => {
  const entityTypeOptions = [
    { value: 'sole_prop', label: 'Sole Proprietorship' },
    { value: 'p_ltd', label: 'Private Limited Company (Pty Ltd)' },
    { value: 'other', label: 'Other' },
  ];

  const revenueOptions = [
    { value: 'under-1m', label: 'Under R1M' },
    { value: '1m-5m', label: 'R1M - R5M' },
    { value: '5m-25m', label: 'R5M - R25M' },
    { value: 'over-25m', label: 'Over R25M' },
  ];

  const industryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Financial Services' },
    { value: 'retail', label: 'Retail' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'other', label: 'Other' },
  ];

  const handleCompanyInfoChange = (field: keyof CompanyInfo, value: string) => {
    setFormData(prev => ({
      ...prev,
      companyInfo: {
        ...prev.companyInfo,
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2>Company Information</h2>
        <p className="text-gray-600">Tell us about your business structure and size</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Entity Type"
          value={formData.companyInfo.entityType}
          onChange={(e) => handleCompanyInfoChange('entityType', e.target.value as CompanyInfo['entityType'])}
          options={entityTypeOptions}
          placeholder="Select your entity type"
          required
        />
        
        <Select
          label="Annual Revenue"
          value={formData.companyInfo.revenue}
          onChange={(e) => handleCompanyInfoChange('revenue', e.target.value as CompanyInfo['revenue'])}
          options={revenueOptions}
          placeholder="Select revenue range"
          required
        />
        
        <Input
          label="Company Name"
          value={formData.companyInfo.companyName}
          onChange={(e) => handleCompanyInfoChange('companyName', e.target.value)}
          placeholder="Enter your company name"
          required
        />
        
        <Select
          label="Industry"
          value={formData.companyInfo.industry}
          onChange={(e) => handleCompanyInfoChange('industry', e.target.value)}
          options={industryOptions}
          placeholder="Select your industry"
          required
        />
      </div>
    </div>
  );
};

export default Step1_CoreInfo;