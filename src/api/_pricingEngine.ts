// src/api/_pricingEngine.ts
/**
 * This file contains the re-engineered logic for calculating client quotes,
 * based on the strategic principles of value-based and modular pricing.
 * It separates calculations for Sole Proprietorships and Pty Ltd companies,
 * and further deconstructs Pty Ltd quotes into Monthly Retainers and Annual Compliance Fees.
 *
 * All prices are in ZAR and are based on the strategic document provided.
 */

import { FormData, QuoteResult } from '../types/formData';
import {
  ITR12_FEES,
  ADDON_FEES,
  BOOKKEEPING_FEES,
  PAYROLL_FEES,
  MONTHLY_FEES,
  COMPLEXITY_MODIFIERS,
  INDUSTRY_RISK,
  ANNUAL_FEES,
  CIPC_FEES,
  ROUNDING_PRECISION,
} from '../config/pricing';

// --- CORE PRICING LOGIC ---
/**
 * Main function to calculate a quote based on form data.
 * It directs the data to the appropriate calculation path based on entity type.
 */
export function calculateQuote(formData: FormData): QuoteResult {
  const { companyInfo } = formData;

  if (companyInfo.entityType === 'sole_prop') {
    return calculateSoleProprietorQuote(formData);
  }

  if (companyInfo.entityType === 'p_ltd') {
    return calculatePtyLtdQuote(formData);
  }

  // Fallback for 'other' entity types
  return {
    monthlyTotal: 0,
    onceOffTotal: 0,
    annualTotal: 0,
    breakdown: ['Custom quote required for this entity type. Please contact for consultation.'],
  };
}

// ===================================================================================
// SECTION 2: RE-ENGINEERED SOLE PROPRIETORSHIP PATH
// ===================================================================================
function calculateSoleProprietorQuote(formData: FormData) {
  const { operations, companyInfo } = formData;
  let onceOffTotal = 0;
  const breakdown: string[] = [];

  // 2.1: Tiered Personal Income Tax Return (ITR12) Fee
  let itr12Fee = 0;
  if (operations.hasEmployees === 'yes' || operations.managesStock === 'yes' || companyInfo.revenue !== 'under-1m') {
    itr12Fee = ITR12_FEES.BUSINESS;
    breakdown.push(`Personal Income Tax (ITR12 - Business Tier): R${itr12Fee}`);
  } else if (operations.usesForeignCurrency === 'yes') {
    itr12Fee = ITR12_FEES.STANDARD;
    breakdown.push(`Personal Income Tax (ITR12 - Standard Tier): R${itr12Fee}`);
  } else {
    itr12Fee = ITR12_FEES.SIMPLE;
    breakdown.push(`Personal Income Tax (ITR12 - Simple Tier): R${itr12Fee}`);
  }
  onceOffTotal += itr12Fee;

  // 2.2: Add-On Modules
  if (operations.managesStock === 'yes') {
      const bookkeepingFee = ADDON_FEES.BOOKKEEPING_STOCK;
      onceOffTotal += bookkeepingFee;
      breakdown.push(`Add-On: Bookkeeping & Data Capture (for stock records): R${bookkeepingFee}`);
  }

  if (itr12Fee > ITR12_FEES.STANDARD) {
      const provisionalTaxFee = ADDON_FEES.PROVISIONAL_TAX_PER_SUBMISSION * 2;
      onceOffTotal += provisionalTaxFee;
      breakdown.push(`Add-On: Provisional Tax Submissions (2 x IRP6): R${provisionalTaxFee}`);
  }

  return {
    monthlyTotal: 0,
    onceOffTotal: Math.round(onceOffTotal / ROUNDING_PRECISION) * ROUNDING_PRECISION,
    annualTotal: 0,
    breakdown,
  };
}

// ===================================================================================
// SECTIONS 3 & 4: RE-ENGINEERED PRIVATE LIMITED COMPANY (PTY LTD) PATH
// ===================================================================================
function calculatePtyLtdQuote(formData: FormData) {
  const monthlyBreakdown: string[] = [];
  const annualBreakdown: string[] = [];
  const { companyInfo, operations } = formData;

  // --- 3.1: Calculate Monthly Retainer ---
  const bookkeepingFee = getBookkeepingFee(companyInfo.revenue);
  const payrollFee = getPayrollFee(operations.hasEmployees, operations.employeeCount);
  const vatFee = companyInfo.revenue !== 'under-1m' ? MONTHLY_FEES.VAT_COMPLIANCE : 0;
  const techFee = MONTHLY_FEES.TECHNOLOGY;

  const subtotal = bookkeepingFee + payrollFee + vatFee + techFee;
  monthlyBreakdown.push(`Core Bookkeeping (Turnover-based): R${bookkeepingFee}`);
  if (payrollFee > 0) monthlyBreakdown.push(`Hybrid Payroll (Base + Per-Employee): R${payrollFee}`);
  if (vatFee > 0) monthlyBreakdown.push(`VAT Compliance (Bi-monthly VAT201): R${vatFee}`);
  monthlyBreakdown.push(`Technology & Software Fee: R${techFee}`);
  monthlyBreakdown.push(`----------------------------------`);
  monthlyBreakdown.push(`Base Retainer Subtotal: R${subtotal}`);
  monthlyBreakdown.push(`----------------------------------`);

  // --- 3.2: Advanced Complexity Modifiers (Additive) ---
  const inventoryMod = operations.managesStock === 'yes' ? COMPLEXITY_MODIFIERS.INVENTORY : 0;
  const forexMod = operations.usesForeignCurrency === 'yes' ? COMPLEXITY_MODIFIERS.FOREIGN_CURRENCY : 0;

  const bookkeepingComplexityAdjustment = bookkeepingFee * (inventoryMod + forexMod);
  if (bookkeepingComplexityAdjustment > 0) {
      monthlyBreakdown.push(`Bookkeeping Complexity Adjustment (+${((inventoryMod + forexMod) * 100).toFixed(0)}%): R${bookkeepingComplexityAdjustment.toFixed(2)}`);
  }

  const industryRiskMod = getIndustryRiskModifier(companyInfo.industry);
  const riskAdjustment = subtotal * industryRiskMod;
   if (riskAdjustment > 0) {
      monthlyBreakdown.push(`Industry Risk Adjustment (+${(industryRiskMod * 100).toFixed(0)}%): R${riskAdjustment.toFixed(2)}`);
  }

  const finalMonthlyTotal = subtotal + bookkeepingComplexityAdjustment + riskAdjustment;

  // --- 4.1-4.4: Calculate Annual & Once-Off Fees ---
  const afsFee = getAfsFee(companyInfo.revenue);
  const corpTaxFee = ANNUAL_FEES.CORPORATE_TAX;
  const provTaxFee = ANNUAL_FEES.PROVISIONAL_TAX_PER_SUBMISSION * 2;
  const [cipcStatutory, cipcService] = getCipcReturnFee(companyInfo.revenue);

  const finalAnnualTotal = afsFee + corpTaxFee + provTaxFee + cipcStatutory + cipcService;
  annualBreakdown.push(`Annual Financial Statements (AFS - Compilation): R${afsFee}`);
  annualBreakdown.push(`Corporate Income Tax Return (IT14): R${corpTaxFee}`);
  annualBreakdown.push(`Provisional Tax Returns (2 x IRP6): R${provTaxFee}`);
  annualBreakdown.push(`CIPC Annual Return (Service Fee): R${cipcService}`);
  annualBreakdown.push(`CIPC Annual Return (Statutory Fee at cost): R${cipcStatutory}`);

  return {
    monthlyTotal: Math.round(finalMonthlyTotal / ROUNDING_PRECISION) * ROUNDING_PRECISION,
    onceOffTotal: 0,
    annualTotal: Math.round(finalAnnualTotal / ROUNDING_PRECISION) * ROUNDING_PRECISION,
    breakdown: {
        monthly: monthlyBreakdown,
        annual: annualBreakdown,
    },
  };
}

// --- HELPER FUNCTIONS ---
function getBookkeepingFee(revenue: FormData['companyInfo']['revenue']): number {
  return BOOKKEEPING_FEES[revenue] || BOOKKEEPING_FEES['under-1m'];
}

function getPayrollFee(hasEmployees: string, employeeCount?: string): number {
  if (hasEmployees === 'no') return 0;
  const baseAdminFee = PAYROLL_FEES.BASE_ADMIN;
  const perEmployeeFee = PAYROLL_FEES.PER_EMPLOYEE;
  const numEmployees = employeeCount ? PAYROLL_FEES.EMPLOYEE_COUNTS[employeeCount] || 0 : 0;
  return baseAdminFee + (perEmployeeFee * numEmployees);
}

function getIndustryRiskModifier(industry: string): number {
  const lowerIndustry = industry.toLowerCase();
  
  if (INDUSTRY_RISK.HIGH_RISK.INDUSTRIES.includes(lowerIndustry)) {
    return INDUSTRY_RISK.HIGH_RISK.MODIFIER;
  }
  
  if (INDUSTRY_RISK.MEDIUM_RISK.INDUSTRIES.includes(lowerIndustry)) {
    return INDUSTRY_RISK.MEDIUM_RISK.MODIFIER;
  }
  
  return INDUSTRY_RISK.LOW_RISK.MODIFIER;
}

function getAfsFee(revenue: FormData['companyInfo']['revenue']): number {
  return ANNUAL_FEES.AFS[revenue] || ANNUAL_FEES.AFS['under-1m'];
}

function getCipcReturnFee(revenue: FormData['companyInfo']['revenue']): [number, number] {
  return CIPC_FEES[revenue] || CIPC_FEES['under-1m'];
}