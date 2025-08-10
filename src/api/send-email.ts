import nodemailer from 'nodemailer';
import { FormData, QuoteResult } from '../types/formData.js';

// Email configuration
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Format form data for email
function formatHealthCheckReport(formData: FormData, quote: QuoteResult): { html: string; text: string } {
  const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;
  const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`;
  const formatArray = (arr: string[]) => arr.length > 0 ? arr.join(', ') : 'None';

  const html = `
    <h2>Health Check Report</h2>
    
    <h3>Company Information</h3>
    <ul>
      <li><strong>Company Name:</strong> ${formData.companyName}</li>
      <li><strong>Industry:</strong> ${formData.industry}</li>
      <li><strong>Company Size:</strong> ${formData.companySize}</li>
      <li><strong>Annual Revenue:</strong> ${formatCurrency(formData.annualRevenue)}</li>
    </ul>

    <h3>Contact Information</h3>
    <ul>
      <li><strong>Name:</strong> ${formData.contact.name}</li>
      <li><strong>Email:</strong> ${formData.contact.email}</li>
      <li><strong>Phone:</strong> ${formData.contact.phone}</li>
      <li><strong>Position:</strong> ${formData.contact.position}</li>
    </ul>

    <h3>Current Operations</h3>
    <ul>
      <li><strong>Current Systems:</strong> ${formatArray(formData.currentSystems)}</li>
      <li><strong>Pain Points:</strong> ${formatArray(formData.painPoints)}</li>
      <li><strong>Integration Needs:</strong> ${formatArray(formData.integrationNeeds)}</li>
      <li><strong>Data Volume:</strong> ${formData.dataVolume}</li>
      <li><strong>Users Count:</strong> ${formData.usersCount}</li>
    </ul>

    <h3>Goals & Objectives</h3>
    <ul>
      <li><strong>Primary Goals:</strong> ${formatArray(formData.primaryGoals)}</li>
      <li><strong>Timeline:</strong> ${formData.timeline}</li>
      <li><strong>Budget Range:</strong> ${formData.budgetRange}</li>
      <li><strong>Success Metrics:</strong> ${formatArray(formData.successMetrics)}</li>
    </ul>

    <h3>Quote Results</h3>
    <ul>
      <li><strong>Base Price:</strong> ${formatCurrency(quote.basePrice)}</li>
      <li><strong>Implementation Cost:</strong> ${formatCurrency(quote.implementationCost)}</li>
      <li><strong>Monthly Recurring:</strong> ${formatCurrency(quote.monthlyRecurring)}</li>
      <li><strong>Total First Year:</strong> ${formatCurrency(quote.totalFirstYear)}</li>
      <li><strong>Complexity Score:</strong> ${formatPercentage(quote.complexityScore)}</li>
      <li><strong>Risk Level:</strong> ${quote.riskLevel}</li>
    </ul>

    <h3>Recommendations</h3>
    <ul>
      ${quote.recommendations.map(rec => `<li>${rec}</li>`).join('')}
    </ul>

    <p><em>Report generated on ${new Date().toLocaleString()}</em></p>
  `;

  const text = `
HEALTH CHECK REPORT

Company Information:
- Company Name: ${formData.companyName}
- Industry: ${formData.industry}
- Company Size: ${formData.companySize}
- Annual Revenue: ${formatCurrency(formData.annualRevenue)}

Contact Information:
- Name: ${formData.contact.name}
- Email: ${formData.contact.email}
- Phone: ${formData.contact.phone}
- Position: ${formData.contact.position}

Current Operations:
- Current Systems: ${formatArray(formData.currentSystems)}
- Pain Points: ${formatArray(formData.painPoints)}
- Integration Needs: ${formatArray(formData.integrationNeeds)}
- Data Volume: ${formData.dataVolume}
- Users Count: ${formData.usersCount}

Goals & Objectives:
- Primary Goals: ${formatArray(formData.primaryGoals)}
- Timeline: ${formData.timeline}
- Budget Range: ${formData.budgetRange}
- Success Metrics: ${formatArray(formData.successMetrics)}

Quote Results:
- Base Price: ${formatCurrency(quote.basePrice)}
- Implementation Cost: ${formatCurrency(quote.implementationCost)}
- Monthly Recurring: ${formatCurrency(quote.monthlyRecurring)}
- Total First Year: ${formatCurrency(quote.totalFirstYear)}
- Complexity Score: ${formatPercentage(quote.complexityScore)}
- Risk Level: ${quote.riskLevel}

Recommendations:
${quote.recommendations.map(rec => `- ${rec}`).join('\n')}

Report generated on ${new Date().toLocaleString()}
  `;

  return { html, text };
}

export async function sendHealthCheckEmail(formData: FormData, quote: QuoteResult) {
  const { html, text } = formatHealthCheckReport(formData, quote);
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'rtdynamicsbc@gmail.com',
    subject: `Health Check Report - ${formData.companyName}`,
    html,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}