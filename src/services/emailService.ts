import { FormData, QuoteResult } from '../types/formData';

// Email service for sending health check reports
export class EmailService {
  private static async sendEmail(emailData: any): Promise<boolean> {
    try {
      const response = await fetch('http://localhost:3001/api/send-health-check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Email sent successfully:', result);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }

  static async sendHealthCheckReport(
    formData: FormData, 
    quote: QuoteResult
  ): Promise<boolean> {
    const emailData = {
      formData,
      quote
    };

    return await this.sendEmail(emailData);
  }

  private static generateHealthCheckEmailContent(
    formData: FormData, 
    quote: QuoteResult
  ): { html: string; text: string } {
    const currentDate = new Date().toLocaleString();
    
    // Generate HTML email content
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; background-color: #f9fafb;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Business Health Check Report</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Submitted on ${currentDate}</p>
        </div>

        <!-- Company Information -->
        <div style="background: white; margin: 20px; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #1e3a8a; margin-top: 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Company Information</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px;">
            <div>
              <strong style="color: #374151;">Company Name:</strong><br>
              <span style="color: #6b7280;">${formData.companyInfo.companyName || 'Not provided'}</span>
            </div>
            <div>
              <strong style="color: #374151;">Entity Type:</strong><br>
              <span style="color: #6b7280;">${this.formatEntityType(formData.companyInfo.entityType)}</span>
            </div>
            <div>
              <strong style="color: #374151;">Industry:</strong><br>
              <span style="color: #6b7280;">${formData.companyInfo.industry || 'Not specified'}</span>
            </div>
            <div>
              <strong style="color: #374151;">Annual Revenue:</strong><br>
              <span style="color: #6b7280;">${this.formatRevenue(formData.companyInfo.revenue)}</span>
            </div>
          </div>
        </div>

        <!-- Operations -->
        <div style="background: white; margin: 20px; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #1e3a8a; margin-top: 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Operations</h2>
          <div style="margin-top: 20px;">
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Has Employees:</strong>
              <span style="color: #6b7280; margin-left: 10px;">${formData.operations.hasEmployees === 'yes' ? 'Yes' : 'No'}</span>
              ${formData.operations.employeeCount ? `<span style="color: #6b7280;"> (${this.formatEmployeeCount(formData.operations.employeeCount)})</span>` : ''}
            </div>
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Manages Stock:</strong>
              <span style="color: #6b7280; margin-left: 10px;">${formData.operations.managesStock === 'yes' ? 'Yes' : 'No'}</span>
            </div>
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Uses Foreign Currency:</strong>
              <span style="color: #6b7280; margin-left: 10px;">${formData.operations.usesForeignCurrency === 'yes' ? 'Yes' : 'No'}</span>
            </div>
            ${formData.operations.stockTrackingMethod ? `
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Stock Tracking Method:</strong><br>
              <span style="color: #6b7280;">${formData.operations.stockTrackingMethod}</span>
            </div>
            ` : ''}
          </div>
        </div>

        ${formData.compliance ? `
        <!-- Compliance -->
        <div style="background: white; margin: 20px; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #1e3a8a; margin-top: 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Compliance Status</h2>
          <div style="margin-top: 20px;">
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">CIPC Return Filed:</strong>
              <span style="color: #6b7280; margin-left: 10px;">${this.formatComplianceStatus(formData.compliance.isCipcReturnFiled)}</span>
            </div>
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Beneficial Ownership Filed:</strong>
              <span style="color: #6b7280; margin-left: 10px;">${this.formatComplianceStatus(formData.compliance.isBeneficialOwnershipFiled)}</span>
            </div>
          </div>
        </div>
        ` : ''}

        <!-- Goals & Challenges -->
        <div style="background: white; margin: 20px; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #1e3a8a; margin-top: 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Goals & Challenges</h2>
          <div style="margin-top: 20px;">
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Primary Goal:</strong>
              <span style="color: #6b7280; margin-left: 10px;">${this.formatPrimaryGoal(formData.goals.primaryGoal)}</span>
            </div>
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Current Challenges:</strong><br>
              <div style="background: #f9fafb; padding: 15px; border-radius: 6px; margin-top: 8px; color: #6b7280; line-height: 1.6;">
                ${formData.goals.currentChallenges || 'No specific challenges mentioned'}
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Information -->
        <div style="background: white; margin: 20px; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #1e3a8a; margin-top: 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Contact Information</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px;">
            <div>
              <strong style="color: #374151;">Email:</strong><br>
              <a href="mailto:${formData.contact.email}" style="color: #2563eb; text-decoration: none;">${formData.contact.email}</a>
            </div>
            <div>
              <strong style="color: #374151;">Phone:</strong><br>
              <a href="tel:${formData.contact.phone}" style="color: #2563eb; text-decoration: none;">${formData.contact.phone}</a>
            </div>
          </div>
        </div>

        <!-- Quote Summary -->
        <div style="background: linear-gradient(135deg, #059669 0%, #047857 100%); margin: 20px; padding: 25px; border-radius: 8px; color: white;">
          <h2 style="margin-top: 0; color: white; border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 10px;">Quote Summary</h2>
          <div style="margin-top: 20px;">
            ${quote.monthlyTotal > 0 ? `
            <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 6px; margin-bottom: 15px;">
              <div style="font-size: 18px; font-weight: bold;">Monthly Retainer: R${quote.monthlyTotal.toLocaleString()}</div>
            </div>
            ` : ''}
            ${quote.annualTotal > 0 ? `
            <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 6px; margin-bottom: 15px;">
              <div style="font-size: 18px; font-weight: bold;">Annual Fees: R${quote.annualTotal.toLocaleString()}</div>
            </div>
            ` : ''}
            ${quote.onceOffTotal > 0 ? `
            <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 6px; margin-bottom: 15px;">
              <div style="font-size: 18px; font-weight: bold;">Once-Off Fees: R${quote.onceOffTotal.toLocaleString()}</div>
            </div>
            ` : ''}
            ${typeof quote.breakdown === 'string' ? `
            <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 6px;">
              <div style="font-size: 16px;">${quote.breakdown}</div>
            </div>
            ` : ''}
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #374151; color: white; padding: 20px; margin: 20px; border-radius: 8px; text-align: center;">
          <p style="margin: 0; font-size: 14px; opacity: 0.8;">
            This health check report was generated automatically from the RTdynamicBC website.<br>
            For questions or follow-up, please contact us at info@rtdynamicbc.co.za
          </p>
        </div>
      </div>
    `;

    // Generate plain text version
    const text = `
BUSINESS HEALTH CHECK REPORT
Submitted on ${currentDate}

=== COMPANY INFORMATION ===
Company Name: ${formData.companyInfo.companyName || 'Not provided'}
Entity Type: ${this.formatEntityType(formData.companyInfo.entityType)}
Industry: ${formData.companyInfo.industry || 'Not specified'}
Annual Revenue: ${this.formatRevenue(formData.companyInfo.revenue)}

=== OPERATIONS ===
Has Employees: ${formData.operations.hasEmployees === 'yes' ? 'Yes' : 'No'}${formData.operations.employeeCount ? ` (${this.formatEmployeeCount(formData.operations.employeeCount)})` : ''}
Manages Stock: ${formData.operations.managesStock === 'yes' ? 'Yes' : 'No'}
Uses Foreign Currency: ${formData.operations.usesForeignCurrency === 'yes' ? 'Yes' : 'No'}
${formData.operations.stockTrackingMethod ? `Stock Tracking Method: ${formData.operations.stockTrackingMethod}\n` : ''}
${formData.compliance ? `
=== COMPLIANCE STATUS ===
CIPC Return Filed: ${this.formatComplianceStatus(formData.compliance.isCipcReturnFiled)}
Beneficial Ownership Filed: ${this.formatComplianceStatus(formData.compliance.isBeneficialOwnershipFiled)}
` : ''}
=== GOALS & CHALLENGES ===
Primary Goal: ${this.formatPrimaryGoal(formData.goals.primaryGoal)}
Current Challenges: ${formData.goals.currentChallenges || 'No specific challenges mentioned'}

=== CONTACT INFORMATION ===
Email: ${formData.contact.email}
Phone: ${formData.contact.phone}

=== QUOTE SUMMARY ===
${quote.monthlyTotal > 0 ? `Monthly Retainer: R${quote.monthlyTotal.toLocaleString()}\n` : ''}${quote.annualTotal > 0 ? `Annual Fees: R${quote.annualTotal.toLocaleString()}\n` : ''}${quote.onceOffTotal > 0 ? `Once-Off Fees: R${quote.onceOffTotal.toLocaleString()}\n` : ''}${typeof quote.breakdown === 'string' ? `${quote.breakdown}\n` : ''}
---
This health check report was generated automatically from the RTdynamicBC website.
For questions or follow-up, please contact us at info@rtdynamicbc.co.za
    `;

    return { html, text };
  }

  // Helper methods for formatting
  private static formatEntityType(entityType: string): string {
    const types: { [key: string]: string } = {
      'sole_prop': 'Sole Proprietorship',
      'p_ltd': 'Private Limited Company (Pty Ltd)',
      'other': 'Other Entity Type'
    };
    return types[entityType] || 'Not specified';
  }

  private static formatRevenue(revenue: string): string {
    const revenues: { [key: string]: string } = {
      'under-1m': 'Under R1 million',
      '1m-5m': 'R1 - R5 million',
      '5m-25m': 'R5 - R25 million',
      'over-25m': 'Over R25 million'
    };
    return revenues[revenue] || 'Not specified';
  }

  private static formatEmployeeCount(count: string): string {
    const counts: { [key: string]: string } = {
      '1-10': '1-10 employees',
      '11-50': '11-50 employees',
      '51-200': '51-200 employees',
      'over-200': 'Over 200 employees'
    };
    return counts[count] || count;
  }

  private static formatComplianceStatus(status: string): string {
    const statuses: { [key: string]: string } = {
      'yes': 'Yes',
      'no': 'No',
      'unsure': 'Unsure'
    };
    return statuses[status] || 'Not specified';
  }

  private static formatPrimaryGoal(goal: string): string {
    const goals: { [key: string]: string } = {
      'compliance': 'Ensure Compliance & Risk Management',
      'growth': 'Support Business Growth & Expansion',
      'cleanup': 'Clean Up & Organize Financial Records'
    };
    return goals[goal] || goal;
  }
}