import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Email configuration
const emailConfig = {
  service: 'gmail', // You can change this to your email provider
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com', // Replace with your email
    pass: process.env.EMAIL_PASS || 'your-app-password' // Replace with your app password
  }
};

// Create transporter
const transporter = nodemailer.createTransport(emailConfig);

// Email options
const mailOptions = {
  from: process.env.EMAIL_USER || 'your-email@gmail.com',
  to: 'rtdynamicsbc@gmail.com',
  subject: 'Test Email from RTdynamicBC Application',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1e3a8a;">Hello from RTdynamicBC!</h2>
      <p>This is a test email sent using Nodemailer from the RTdynamicBC application.</p>
      
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #374151; margin-top: 0;">Email Details:</h3>
        <ul style="color: #6b7280;">
          <li><strong>Sent from:</strong> RTdynamicBC Application</li>
          <li><strong>Date:</strong> ${new Date().toLocaleString()}</li>
          <li><strong>Purpose:</strong> Testing Nodemailer Setup</li>
        </ul>
      </div>
      
      <p style="color: #6b7280;">If you received this email, the Nodemailer setup is working correctly!</p>
      
      <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
        <p style="color: #9ca3af; font-size: 12px; margin: 0;">
          This email was sent from the RTdynamicBC application for testing purposes.
        </p>
      </div>
    </div>
  `,
  text: `
    Hello from RTdynamicBC!
    
    This is a test email sent using Nodemailer from the RTdynamicBC application.
    
    Email Details:
    - Sent from: RTdynamicBC Application
    - Date: ${new Date().toLocaleString()}
    - Purpose: Testing Nodemailer Setup
    
    If you received this email, the Nodemailer setup is working correctly!
  `
};

// Send email function
async function sendEmail() {
  try {
    console.log('🚀 Sending email to rtdynamicsbc@gmail.com...');
    
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    console.log('📬 Preview URL:', nodemailer.getTestMessageUrl(info));
    
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    
    if (error.code === 'EAUTH') {
      console.log('\n🔐 Authentication failed. Please check:');
      console.log('1. Your email and password are correct');
      console.log('2. You\'re using an app password (not your regular password)');
      console.log('3. 2-factor authentication is enabled and app password is generated');
    }
    
    if (error.code === 'ENOTFOUND') {
      console.log('\n🌐 Network error. Please check your internet connection.');
    }
  }
}

// Run the email sending function
sendEmail();

// Export for potential use in other files
export { sendEmail, transporter };