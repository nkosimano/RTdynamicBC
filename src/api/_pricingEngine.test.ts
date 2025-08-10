import { calculateQuote } from './_pricingEngine';
import { FormData } from '../types/formData';

describe('Pricing Engine Tests', () => {
  // Test Case 1: Simple Sole Proprietor
  test('Simple Sole Proprietor - no employees or stock', () => {
    const formData: FormData = {
      companyInfo: {
        entityType: 'sole_prop',
        revenue: 'under-1m',
        companyName: 'Test Business',
        industry: 'consulting'
      },
      operations: {
        hasEmployees: 'no',
        managesStock: 'no',
        usesForeignCurrency: 'no'
      },
      compliance: {
        isCipcReturnFiled: 'unsure',
        isBeneficialOwnershipFiled: 'unsure'
      },
      goals: {
        currentChallenges: 'Test challenges',
        primaryGoal: 'compliance',
        timeline: 'immediate',
        budget: 'under-5k'
      },
      contact: {
        fullName: 'John Doe',
        email: 'john@test.com',
        phone: '123456789',
        preferredContact: 'email'
      }
    };

    const result = calculateQuote(formData);

    expect(result.monthlyTotal).toBe(0);
    expect(result.annualTotal).toBe(0);
    expect(result.onceOffTotal).toBe(950); // Simple ITR12 fee
    expect(Array.isArray(result.breakdown)).toBe(true);
    expect(result.breakdown).toContain('Personal Income Tax (ITR12 - Simple Tier): R950');
  });

  // Test Case 2: Complex Pty Ltd
  test('Complex Pty Ltd - high-risk industry with employees and stock', () => {
    const formData: FormData = {
      companyInfo: {
        entityType: 'p_ltd',
        revenue: '5m-25m',
        companyName: 'Test Pty Ltd',
        industry: 'construction' // High-risk industry
      },
      operations: {
        hasEmployees: 'yes',
        employeeCount: '11-50',
        managesStock: 'yes',
        usesForeignCurrency: 'yes'
      },
      compliance: {
        isCipcReturnFiled: 'no',
        isBeneficialOwnershipFiled: 'yes'
      },
      goals: {
        currentChallenges: 'Complex operations',
        primaryGoal: 'growth',
        timeline: '3-6months',
        budget: '15k-30k'
      },
      contact: {
        fullName: 'Jane Smith',
        email: 'jane@testptyltd.com',
        phone: '987654321',
        preferredContact: 'phone'
      }
    };

    const result = calculateQuote(formData);

    expect(result.monthlyTotal).toBeGreaterThan(0);
    expect(result.annualTotal).toBeGreaterThan(0);
    expect(result.onceOffTotal).toBe(0);
    expect(typeof result.breakdown).toBe('object');
    expect(result.breakdown).toHaveProperty('monthly');
    expect(result.breakdown).toHaveProperty('annual');
    
    // Verify that complexity modifiers are applied
    expect(result.monthlyTotal).toBeGreaterThan(8500); // Base bookkeeping fee for 5m-25m
    expect(result.annualTotal).toBeGreaterThan(12000); // Should include AFS fees
  });

  // Test Case 3: Edge Case - 'other' entity type
  test('Edge Case - other entity type returns custom quote message', () => {
    const formData: FormData = {
      companyInfo: {
        entityType: 'other',
        revenue: '1m-5m',
        companyName: 'Special Entity',
        industry: 'technology'
      },
      operations: {
        hasEmployees: 'yes',
        employeeCount: '1-10',
        managesStock: 'no',
        usesForeignCurrency: 'no'
      },
      compliance: {
        isCipcReturnFiled: 'yes',
        isBeneficialOwnershipFiled: 'yes'
      },
      goals: {
        currentChallenges: 'Unique structure',
        primaryGoal: 'efficiency',
        timeline: 'flexible',
        budget: 'over-30k'
      },
      contact: {
        fullName: 'Alex Johnson',
        email: 'alex@special.com',
        phone: '555123456',
        preferredContact: 'whatsapp'
      }
    };

    const result = calculateQuote(formData);

    expect(result.monthlyTotal).toBe(0);
    expect(result.annualTotal).toBe(0);
    expect(result.onceOffTotal).toBe(0);
    expect(typeof result.breakdown).toBe('string');
    expect(result.breakdown).toContain('Custom quote required');
  });

  // Additional Test: Sole Proprietor with employees and stock
  test('Sole Proprietor with employees and stock - business tier ITR12', () => {
    const formData: FormData = {
      companyInfo: {
        entityType: 'sole_prop',
        revenue: '1m-5m',
        companyName: 'Growing Business',
        industry: 'retail'
      },
      operations: {
        hasEmployees: 'yes',
        employeeCount: '1-10',
        managesStock: 'yes',
        usesForeignCurrency: 'no'
      },
      compliance: {
        isCipcReturnFiled: 'unsure',
        isBeneficialOwnershipFiled: 'unsure'
      },
      goals: {
        currentChallenges: 'Growing complexity',
        primaryGoal: 'growth',
        timeline: '1-3months',
        budget: '5k-15k'
      },
      contact: {
        fullName: 'Mike Wilson',
        email: 'mike@growing.com',
        phone: '444555666',
        preferredContact: 'email'
      }
    };

    const result = calculateQuote(formData);

    expect(result.monthlyTotal).toBe(0);
    expect(result.annualTotal).toBe(0);
    expect(result.onceOffTotal).toBeGreaterThan(3500); // Business tier ITR12 + add-ons
    expect(Array.isArray(result.breakdown)).toBe(true);
    expect(result.breakdown).toContain('Personal Income Tax (ITR12 - Business Tier): R3500');
    expect(result.breakdown).toContain('Add-On: Bookkeeping & Data Capture (for stock records): R2000');
    expect(result.breakdown).toContain('Add-On: Provisional Tax Submissions (2 x IRP6): R3600');
  });

  // Test rounding functionality
  test('Verify rounding to nearest 50', () => {
    const formData: FormData = {
      companyInfo: {
        entityType: 'p_ltd',
        revenue: 'under-1m',
        companyName: 'Small Pty Ltd',
        industry: 'technology'
      },
      operations: {
        hasEmployees: 'no',
        managesStock: 'no',
        usesForeignCurrency: 'no'
      },
      compliance: {
        isCipcReturnFiled: 'yes',
        isBeneficialOwnershipFiled: 'yes'
      },
      goals: {
        currentChallenges: 'Basic compliance',
        primaryGoal: 'compliance',
        timeline: 'immediate',
        budget: 'under-5k'
      },
      contact: {
        fullName: 'Sarah Lee',
        email: 'sarah@small.com',
        phone: '333222111',
        preferredContact: 'email'
      }
    };

    const result = calculateQuote(formData);

    // Check that totals are rounded to nearest 50
    expect(result.monthlyTotal % 50).toBe(0);
    expect(result.annualTotal % 50).toBe(0);
    expect(result.onceOffTotal % 50).toBe(0);
  });
});