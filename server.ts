import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Email configuration
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Email server is running' });
});

// Format form data for email
function formatHealthCheckReport(formData: any, quote: any): { html: string; text: string } {
  const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;
  const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`;
  const formatArray = (arr: string[]) => arr && arr.length > 0 ? arr.join(', ') : 'None';

  const html = `
    <h2>Health Check Report</h2>
    
    <h3>Company Information</h3>
    <ul>
      <li><strong>Company Name:</strong> ${formData.companyName || 'N/A'}</li>
      <li><strong>Industry:</strong> ${formData.industry || 'N/A'}</li>
      <li><strong>Company Size:</strong> ${formData.companySize || 'N/A'}</li>
      <li><strong>Annual Revenue:</strong> ${formData.annualRevenue ? formatCurrency(formData.annualRevenue) : 'N/A'}</li>
    </ul>

    <h3>Contact Information</h3>
    <ul>
      <li><strong>Name:</strong> ${formData.contact?.name || 'N/A'}</li>
      <li><strong>Email:</strong> ${formData.contact?.email || 'N/A'}</li>
      <li><strong>Phone:</strong> ${formData.contact?.phone || 'N/A'}</li>
      <li><strong>Position:</strong> ${formData.contact?.position || 'N/A'}</li>
    </ul>

    <h3>Current Operations</h3>
    <ul>
      <li><strong>Current Systems:</strong> ${formatArray(formData.currentSystems)}</li>
      <li><strong>Pain Points:</strong> ${formatArray(formData.painPoints)}</li>
      <li><strong>Integration Needs:</strong> ${formatArray(formData.integrationNeeds)}</li>
      <li><strong>Data Volume:</strong> ${formData.dataVolume || 'N/A'}</li>
      <li><strong>Users Count:</strong> ${formData.usersCount || 'N/A'}</li>
    </ul>

    <h3>Goals & Objectives</h3>
    <ul>
      <li><strong>Primary Goals:</strong> ${formatArray(formData.primaryGoals)}</li>
      <li><strong>Timeline:</strong> ${formData.timeline || 'N/A'}</li>
      <li><strong>Budget Range:</strong> ${formData.budgetRange || 'N/A'}</li>
      <li><strong>Success Metrics:</strong> ${formatArray(formData.successMetrics)}</li>
    </ul>

    <h3>Quote Results</h3>
    <ul>
      <li><strong>Base Price:</strong> ${quote.basePrice ? formatCurrency(quote.basePrice) : 'N/A'}</li>
      <li><strong>Implementation Cost:</strong> ${quote.implementationCost ? formatCurrency(quote.implementationCost) : 'N/A'}</li>
      <li><strong>Monthly Recurring:</strong> ${quote.monthlyRecurring ? formatCurrency(quote.monthlyRecurring) : 'N/A'}</li>
      <li><strong>Total First Year:</strong> ${quote.totalFirstYear ? formatCurrency(quote.totalFirstYear) : 'N/A'}</li>
      <li><strong>Complexity Score:</strong> ${quote.complexityScore ? formatPercentage(quote.complexityScore) : 'N/A'}</li>
      <li><strong>Risk Level:</strong> ${quote.riskLevel || 'N/A'}</li>
    </ul>

    <h3>Recommendations</h3>
    <ul>
      ${quote.recommendations && quote.recommendations.length > 0 ? quote.recommendations.map((rec: string) => `<li>${rec}</li>`).join('') : '<li>No recommendations available</li>'}
    </ul>

    <p><em>Report generated on ${new Date().toLocaleString()}</em></p>
  `;

  const text = `
HEALTH CHECK REPORT

Company Information:
- Company Name: ${formData.companyName || 'N/A'}
- Industry: ${formData.industry || 'N/A'}
- Company Size: ${formData.companySize || 'N/A'}
- Annual Revenue: ${formData.annualRevenue ? formatCurrency(formData.annualRevenue) : 'N/A'}

Contact Information:
- Name: ${formData.contact?.name || 'N/A'}
- Email: ${formData.contact?.email || 'N/A'}
- Phone: ${formData.contact?.phone || 'N/A'}
- Position: ${formData.contact?.position || 'N/A'}

Current Operations:
- Current Systems: ${formatArray(formData.currentSystems)}
- Pain Points: ${formatArray(formData.painPoints)}
- Integration Needs: ${formatArray(formData.integrationNeeds)}
- Data Volume: ${formData.dataVolume || 'N/A'}
- Users Count: ${formData.usersCount || 'N/A'}

Goals & Objectives:
- Primary Goals: ${formatArray(formData.primaryGoals)}
- Timeline: ${formData.timeline || 'N/A'}
- Budget Range: ${formData.budgetRange || 'N/A'}
- Success Metrics: ${formatArray(formData.successMetrics)}

Quote Results:
- Base Price: ${quote.basePrice ? formatCurrency(quote.basePrice) : 'N/A'}
- Implementation Cost: ${quote.implementationCost ? formatCurrency(quote.implementationCost) : 'N/A'}
- Monthly Recurring: ${quote.monthlyRecurring ? formatCurrency(quote.monthlyRecurring) : 'N/A'}
- Total First Year: ${quote.totalFirstYear ? formatCurrency(quote.totalFirstYear) : 'N/A'}
- Complexity Score: ${quote.complexityScore ? formatPercentage(quote.complexityScore) : 'N/A'}
- Risk Level: ${quote.riskLevel || 'N/A'}

Recommendations:
${quote.recommendations && quote.recommendations.length > 0 ? quote.recommendations.map((rec: string) => `- ${rec}`).join('\n') : '- No recommendations available'}

Report generated on ${new Date().toLocaleString()}
  `;

  return { html, text };
}

// Send health check email endpoint
app.post('/api/send-health-check-email', async (req, res) => {
  try {
    const { formData, quote } = req.body;

    if (!formData || !quote) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required data (formData and quote)' 
      });
    }

    const { html, text } = formatHealthCheckReport(formData, quote);
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'rtdynamicsbc@gmail.com',
      subject: `Health Check Report - ${formData.companyName || 'New Submission'}`,
      html,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    
    res.status(200).json({
      success: true,
      message: 'Health check report sent successfully',
      messageId: info.messageId,
    });
  } catch (error) {
    console.error('Error in send-health-check-email API:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Email server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

export default app;