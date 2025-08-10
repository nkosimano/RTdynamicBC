import React from 'react';
import Select from './Select';
import { AlertTriangle } from 'lucide-react';
import { FormData } from '@/types/formData';

interface Compliance {
  isCipcReturnFiled: 'yes' | 'no' | 'unsure';
  isBeneficialOwnershipFiled: 'yes' | 'no' | 'unsure';
}

interface Step3ComplianceProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const Step3_Compliance: React.FC<Step3ComplianceProps> = ({ formData, setFormData }) => {
  const complianceOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
    { value: 'unsure', label: 'Unsure' },
  ];

  const handleComplianceChange = (field: keyof Compliance, value: string) => {
    setFormData(prev => ({
      ...prev,
      compliance: {
        ...prev.compliance,
        [field]: value
      } as Compliance
    }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2>Compliance Requirements</h2>
        <p className="text-gray-600">CIPC compliance questions for Private Limited Companies</p>
      </div>
      
      <div className="bg-accent-ochre/10 border border-accent-ochre/20 rounded-lg p-6 mb-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-6 w-6 text-accent-ochre flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-accent-ochre mb-2">Important Compliance Information</h4>
            <p className="text-sm text-gray-700">
              As a Private Limited Company (Pty Ltd), you have specific compliance obligations with CIPC 
              (Companies and Intellectual Property Commission). These questions help us assess your current 
              compliance status.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Select
          label="Have you filed your Annual Return with CIPC?"
          value={formData.compliance?.isCipcReturnFiled || ''}
          onChange={(e) => handleComplianceChange('isCipcReturnFiled', e.target.value as Compliance['isCipcReturnFiled'])}
          options={complianceOptions}
          placeholder="Select an option"
          helper="Annual Returns must be filed within 30 business days of your anniversary date"
          required
        />
        
        <Select
          label="Have you filed your Beneficial Ownership information?"
          value={formData.compliance?.isBeneficialOwnershipFiled || ''}
          onChange={(e) => handleComplianceChange('isBeneficialOwnershipFiled', e.target.value as Compliance['isBeneficialOwnershipFiled'])}
          options={complianceOptions}
          placeholder="Select an option"
          helper="Beneficial Ownership information must be filed and kept up to date with CIPC"
          required
        />
      </div>

      <div className="bg-secondary-teal/10 border border-secondary-teal/20 rounded-lg p-6">
        <h4 className="font-semibold text-secondary-teal mb-2">Why This Matters:</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Non-compliance can result in penalties and deregistration</li>
          <li>• Proper compliance protects your company's good standing</li>
          <li>• We can help you get back on track if you're behind</li>
          <li>• Regular compliance reduces long-term costs and risks</li>
        </ul>
      </div>
    </div>
  );
};

export default Step3_Compliance;