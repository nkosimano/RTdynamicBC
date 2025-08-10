// src/types/formData.ts
/**
 * Centralized FormData interface for the Health Check form
 * Used across all form components and the pricing engine
 */

export interface FormData {
  companyInfo: {
    entityType: 'sole_prop' | 'p_ltd' | 'other' | '';
    revenue: 'under-1m' | '1m-5m' | '5m-25m' | 'over-25m' | '';
    companyName: string;
    industry: string;
  };
  operations: {
    hasEmployees: 'yes' | 'no' | '';
    managesStock: 'yes' | 'no' | '';
    usesForeignCurrency: 'yes' | 'no' | '';
    employeeCount?: '1-10' | '11-50' | '51-200' | 'over-200';
    stockTrackingMethod?: string;
  };
  compliance?: {
    isCipcReturnFiled: 'yes' | 'no' | 'unsure';
    isBeneficialOwnershipFiled: 'yes' | 'no' | 'unsure';
  };
  goals: {
    currentChallenges: string;
    primaryGoal: 'compliance' | 'growth' | 'cleanup';
  };
  contact: {
    email: string;
    phone: string;
  };
}

// Quote result interface for pricing engine responses
export interface QuoteResult {
  monthlyTotal: number;
  onceOffTotal: number;
  annualTotal: number;
  breakdown: string[] | {
    monthly: string[];
    annual: string[];
  };
}