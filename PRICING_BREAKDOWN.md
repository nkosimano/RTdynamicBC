# RTD FinOps Pricing Calculation Methodology

## Overview

This document explains how the RTD FinOps health check form calculates quotes based on client inputs. The pricing engine uses a sophisticated methodology that considers entity type, revenue tiers, operational complexity, and industry risk factors to provide accurate, value-based pricing.

## Pricing Engine Logic

The system operates on two distinct calculation paths:

1. **Sole Proprietorship Path**: Focuses on personal income tax returns (ITR12) with tiered pricing and add-on modules
2. **Private Limited Company (Pty Ltd) Path**: Comprehensive monthly retainers plus annual compliance fees

---

## Service Categories & Pricing Structure

### 🏢 **Sole Proprietorship Services**

| Service Category | Specific Service | Frequency / Type | Estimated Base Price (R) |
|------------------|------------------|------------------|---------------------------|
| **Taxation Services 🇿🇦** | Personal Income Tax (ITR12 - Simple) | Annually | R950 |
| | Personal Income Tax (ITR12 - Standard) | Annually | R1,500 |
| | Personal Income Tax (ITR12 - Business) | Annually | R3,500 |
| | Provisional Tax Submissions (IRP6) | Per Submission (x2) | R1,800 each |
| **Accounting Services 🧾** | Bookkeeping & Data Capture (Stock) | Once-Off Add-On | R2,000 |

### 🏢 **Private Limited Company (Pty Ltd) Services**

#### Monthly Retainer Services

| Service Category | Specific Service | Frequency / Type | Estimated Base Price (R) |
|------------------|------------------|------------------|---------------------------|
| **Accounting Services 🧾** | Core Bookkeeping (Under R1M) | Monthly | R3,500 |
| | Core Bookkeeping (R1M-R5M) | Monthly | R5,500 |
| | Core Bookkeeping (R5M-R25M) | Monthly | R8,500 |
| | Core Bookkeeping (Over R25M) | Monthly | R12,000 |
| **Payroll Services 🧑‍💼** | Base Payroll Administration | Monthly | R800 |
| | Per Employee Fee (1-10 employees) | Monthly | R180 × 5 = R900 |
| | Per Employee Fee (11-50 employees) | Monthly | R180 × 30 = R5,400 |
| | Per Employee Fee (51-200 employees) | Monthly | R180 × 125 = R22,500 |
| | Per Employee Fee (Over 200 employees) | Monthly | R180 × 250 = R45,000 |
| **Taxation Services 🇿🇦** | VAT Compliance (VAT201) | Bi-Monthly | R1,500 |
| **Technology & Software ⚙️** | Platform & Software Access | Monthly | R400 |

#### Annual Compliance Services

| Service Category | Specific Service | Frequency / Type | Estimated Base Price (R) |
|------------------|------------------|------------------|---------------------------|
| **Accounting Services 🧾** | Annual Financial Statements (Under R1M) | Annually | R5,500 |
| | Annual Financial Statements (R1M-R5M) | Annually | R9,750 |
| | Annual Financial Statements (R5M-R25M) | Annually | R18,000 |
| | Annual Financial Statements (Over R25M) | Annually | R25,000 |
| **Taxation Services 🇿🇦** | Corporate Income Tax Return (IT14) | Annually | R6,500 |
| | Provisional Tax Returns (IRP6) | Per Submission (x2) | R2,500 each |
| **Compliance & Regulatory 📋** | CIPC Annual Return (Service Fee - Under R1M) | Annually | R750 |
| | CIPC Annual Return (Service Fee - R1M-R5M) | Annually | R850 |
| | CIPC Annual Return (Service Fee - R5M-R25M) | Annually | R1,000 |
| | CIPC Annual Return (Service Fee - Over R25M) | Annually | R1,250 |
| | CIPC Statutory Fees (Under R1M) | Annually | R100 |
| | CIPC Statutory Fees (R1M-R5M) | Annually | R450 |
| | CIPC Statutory Fees (R5M-R25M) | Annually | R2,000 |
| | CIPC Statutory Fees (Over R25M) | Annually | R3,000 |

---

## Calculation Methodology

### Sole Proprietorship Calculation

**Step 1: Determine ITR12 Tier**
- **Simple Tier (R950)**: Basic sole proprietor with no employees, no stock, revenue under R1M, no foreign currency
- **Standard Tier (R1,500)**: Uses foreign currency but otherwise simple
- **Business Tier (R3,500)**: Has employees OR manages stock OR revenue over R1M

**Step 2: Add Required Modules**
- **Stock Management**: +R2,000 (if manages stock)
- **Provisional Tax**: +R3,600 (2 × R1,800) (if Business Tier)

**Example Calculation:**
```
Sole Proprietor with employees and stock:
- ITR12 Business Tier: R3,500
- Bookkeeping Add-on: R2,000
- Provisional Tax (2x): R3,600
Total: R9,100
```

### Pty Ltd Calculation

**Step 1: Calculate Monthly Retainer Base**
```
Base Components:
+ Core Bookkeeping (revenue-based)
+ Payroll (base + per-employee)
+ VAT Compliance (if revenue > R1M)
+ Technology Fee
= Monthly Subtotal
```

**Step 2: Apply Complexity Modifiers**
- **Inventory Management**: +15% on bookkeeping
- **Foreign Currency**: +20% on bookkeeping
- **Industry Risk**: +0-30% on total subtotal
  - High Risk (Finance, Healthcare): +30%
  - Medium Risk (Construction, Real Estate, Manufacturing): +15%
  - Low Risk (All others): +0%

**Step 3: Calculate Annual Fees**
```
Annual Components:
+ Annual Financial Statements (revenue-based)
+ Corporate Tax Return (IT14)
+ Provisional Tax Returns (2x)
+ CIPC Service Fee (revenue-based)
+ CIPC Statutory Fee (revenue-based)
= Annual Total
```

**Example Calculation - Medium Company:**
```
Pty Ltd, R3M revenue, 15 employees, manages stock, construction industry:

Monthly Retainer:
- Core Bookkeeping (R1M-R5M): R5,500
- Payroll Base: R800
- Payroll Per-Employee (30 × R180): R5,400
- VAT Compliance: R1,500
- Technology Fee: R400
Subtotal: R13,600

Complexity Adjustments:
- Inventory (+15% on bookkeeping): R825
- Industry Risk (+15% on subtotal): R2,040
Monthly Total: R16,465 (rounded to R16,450)

Annual Fees:
- AFS (R1M-R5M): R9,750
- Corporate Tax: R6,500
- Provisional Tax (2x): R5,000
- CIPC Service: R850
- CIPC Statutory: R450
Annual Total: R22,550
```

---

## Form Input Mapping

### Company Information
- **Entity Type**: Determines calculation path (Sole Prop vs Pty Ltd)
- **Revenue**: Sets bookkeeping tier and AFS pricing
- **Industry**: Applies risk modifiers (0%, 15%, or 30%)

### Operations
- **Has Employees**: Triggers payroll calculations and ITR12 business tier
- **Employee Count**: Determines per-employee multiplier
- **Manages Stock**: Adds inventory complexity modifier and bookkeeping add-on
- **Foreign Currency**: Adds forex complexity modifier and may upgrade ITR12 tier

### Compliance (Pty Ltd only)
- Used for advisory purposes, doesn't affect pricing calculations

---

## Pricing Modifiers Summary

| Modifier Type | Condition | Impact |
|---------------|-----------|--------|
| **Revenue Tier** | Company turnover | Sets base bookkeeping and AFS fees |
| **Employee Count** | Number of staff | Multiplies per-employee payroll fees |
| **Inventory Management** | Manages stock | +15% on bookkeeping fees |
| **Foreign Currency** | Uses forex | +20% on bookkeeping fees |
| **High-Risk Industry** | Finance, Healthcare | +30% on monthly subtotal |
| **Medium-Risk Industry** | Construction, Real Estate, Manufacturing | +15% on monthly subtotal |
| **VAT Registration** | Revenue > R1M | Adds R1,500 monthly VAT compliance |

---

## Rounding & Final Adjustments

All final totals are rounded to the nearest R50 for clean pricing presentation.

**Example**: R16,465 becomes R16,450

This methodology ensures transparent, value-based pricing that scales appropriately with business complexity and regulatory requirements.