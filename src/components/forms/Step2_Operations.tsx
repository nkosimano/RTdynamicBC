import React from 'react';
import Select from './Select';
import Input from './Input';
import { FormData } from '@/types/formData';

interface Operations {
  hasEmployees: 'yes' | 'no' | '';
  managesStock: 'yes' | 'no' | '';
  usesForeignCurrency: 'yes' | 'no' | '';
  employeeCount?: '1-10' | '11-50' | '51-200' | 'over-200';
  stockTrackingMethod?: string;
}

interface Step2OperationsProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const Step2_Operations: React.FC<Step2OperationsProps> = ({ formData, setFormData }) => {
  const yesNoOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ];

  const employeeCountOptions = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: 'over-200', label: 'Over 200 employees' },
  ];

  const handleOperationsChange = (field: keyof Operations, value: string) => {
    setFormData(prev => {
      const newOperations = {
        ...prev.operations,
        [field]: value
      };

      // Clear conditional fields when parent field changes
      if (field === 'hasEmployees' && value === 'no') {
        delete newOperations.employeeCount;
      }
      if (field === 'managesStock' && value === 'no') {
        delete newOperations.stockTrackingMethod;
      }

      return {
        ...prev,
        operations: newOperations
      };
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2>Operational Complexity</h2>
        <p className="text-gray-600">Help us understand your business operations</p>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Do you have employees?"
            value={formData.operations.hasEmployees}
            onChange={(e) => handleOperationsChange('hasEmployees', e.target.value as Operations['hasEmployees'])}
            options={yesNoOptions}
            placeholder="Select an option"
            required
          />
          
          <Select
            label="Do you manage stock/inventory?"
            value={formData.operations.managesStock}
            onChange={(e) => handleOperationsChange('managesStock', e.target.value as Operations['managesStock'])}
            options={yesNoOptions}
            placeholder="Select an option"
            required
          />
        </div>

        <Select
          label="Do you deal with foreign currency?"
          value={formData.operations.usesForeignCurrency}
          onChange={(e) => handleOperationsChange('usesForeignCurrency', e.target.value as Operations['usesForeignCurrency'])}
          options={yesNoOptions}
          placeholder="Select an option"
          required
        />

        {/* Conditional Fields */}
        {formData.operations.hasEmployees === 'yes' && (
          <Select
            label="How many employees do you have?"
            value={formData.operations.employeeCount || ''}
            onChange={(e) => handleOperationsChange('employeeCount', e.target.value as Operations['employeeCount'])}
            options={employeeCountOptions}
            placeholder="Select employee count"
            required
          />
        )}

        {formData.operations.managesStock === 'yes' && (
          <Input
            label="How do you currently track your stock?"
            value={formData.operations.stockTrackingMethod || ''}
            onChange={(e) => handleOperationsChange('stockTrackingMethod', e.target.value)}
            placeholder="e.g., Manual spreadsheets, Inventory software, etc."
            helper="Describe your current stock tracking method"
          />
        )}
      </div>
    </div>
  );
};

export default Step2_Operations;