# Email Setup with Nodemailer

This project now includes email functionality using Nodemailer. Follow these steps to configure and send emails.

## 📦 Installation

The required packages are already installed:
- `nodemailer` - Email sending library
- `@types/nodemailer` - TypeScript definitions
- `dotenv` - Environment variable management

## ⚙️ Configuration

### 1. Set up your email credentials

Edit the `.env` file in the project root and replace the placeholder values:

```env
# Your email address
EMAIL_USER=your-actual-email@gmail.com

# Your email app password (NOT your regular password)
EMAIL_PASS=your-actual-app-password

# Email service provider
EMAIL_SERVICE=gmail
```

### 2. For Gmail users:

1. **Enable 2-Factor Authentication** on your Google account
2. **Generate an App Password**:
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Navigate to Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this app password in the `.env` file (NOT your regular password)

### 3. For other email providers:

- **Outlook/Hotmail**: Use your regular password or generate an app password
- **Yahoo**: Enable "Less secure app access" or use app password
- **Custom SMTP**: Update the `emailConfig` in `send-email.js`

## 🚀 Usage

### Send a test email

```bash
npm run send-email
```

This will send a test email to `rtdynamicsbc@gmail.com` with:
- Professional HTML formatting
- Current timestamp
- Test message content

### Customize the email

Edit `send-email.js` to modify:
- **Recipient**: Change the `to` field in `mailOptions`
- **Subject**: Update the `subject` field
- **Content**: Modify the `html` and `text` fields
- **Sender**: Update the `from` field

## 📧 Email Script Features

- ✅ HTML and plain text email support
- ✅ Professional email template
- ✅ Environment variable configuration
- ✅ Error handling with helpful messages
- ✅ Support for multiple email providers
- ✅ Secure credential management

## 🔧 Troubleshooting

### Authentication Errors
- Ensure you're using an app password, not your regular password
- Verify 2-factor authentication is enabled
- Check that your email and password are correct in `.env`

### Network Errors
- Check your internet connection
- Verify firewall settings allow SMTP connections
- Try a different email provider if issues persist

### Other Issues
- Make sure `.env` file exists and has correct values
- Verify nodemailer is properly installed
- Check the console output for specific error messages

## 🔒 Security Notes

- Never commit your `.env` file to version control
- Use app passwords instead of regular passwords
- Keep your email credentials secure
- The `.env` file is already in `.gitignore`

## 📝 Example Success Output

```
🚀 Sending email to rtdynamicsbc@gmail.com...
✅ Email sent successfully!
📧 Message ID: <message-id@gmail.com>
📬 Preview URL: https://ethereal.email/message/...
```

---

**Ready to send emails!** 📬

Update your `.env` file with real credentials and run `npm run send-email` to test the setup.