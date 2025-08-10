// src/config/pricing.ts
/**
 * Centralized pricing configuration for the business health check quote calculator
 * All fee structures, risk modifiers, and pricing tiers are defined here
 */

// Sole Proprietor ITR12 Fee Tiers
export const ITR12_FEES = {
  SIMPLE: 950,
  STANDARD: 1500,
  BUSINESS: 3500,
} as const;

// Add-on module fees
export const ADDON_FEES = {
  BOOKKEEPING_STOCK: 2000,
  PROVISIONAL_TAX_PER_SUBMISSION: 1800,
} as const;

// Pty Ltd Monthly Retainer Base Fees
export const BOOKKEEPING_FEES = {
  'under-1m': 3500,
  '1m-5m': 5500,
  '5m-25m': 8500,
  'over-25m': 12000,
} as const;

// Payroll fees
export const PAYROLL_FEES = {
  BASE_ADMIN: 800,
  PER_EMPLOYEE: 180,
  EMPLOYEE_COUNTS: {
    '1-10': 5,
    '11-50': 30,
    '51-200': 125,
    'over-200': 250,
  },
} as const;

// Other monthly fees
export const MONTHLY_FEES = {
  VAT_COMPLIANCE: 1500,
  TECHNOLOGY: 400,
} as const;

// Complexity modifiers (as percentages)
export const COMPLEXITY_MODIFIERS = {
  INVENTORY: 0.15,
  FOREIGN_CURRENCY: 0.20,
} as const;

// Industry risk categories and modifiers
export const INDUSTRY_RISK = {
  HIGH_RISK: {
    MODIFIER: 0.30,
    INDUSTRIES: ['finance', 'healthcare'],
  },
  MEDIUM_RISK: {
    MODIFIER: 0.15,
    INDUSTRIES: ['construction', 'real-estate', 'manufacturing'],
  },
  LOW_RISK: {
    MODIFIER: 0,
    INDUSTRIES: [], // All other industries
  },
} as const;

// Annual fees for Pty Ltd
export const ANNUAL_FEES = {
  AFS: {
    'under-1m': 5500,
    '1m-5m': 9750,
    '5m-25m': 18000,
    'over-25m': 25000,
  },
  CORPORATE_TAX: 6500,
  PROVISIONAL_TAX_PER_SUBMISSION: 2500,
} as const;

// CIPC fees [statutory, service]
export const CIPC_FEES = {
  'under-1m': [100, 750],
  '1m-5m': [450, 850],
  '5m-25m': [2000, 1000],
  'over-25m': [3000, 1250],
} as const;

// Rounding precision
export const ROUNDING_PRECISION = 50;