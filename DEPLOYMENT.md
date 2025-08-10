# Deployment Guide - Netlify CI/CD Setup

This guide will help you deploy your RT Dynamics Business Consulting app to Netlify with automated CI/CD.

## 🚀 Quick Setup

### 1. Netlify Site Setup

1. **Connect to Netlify:**
   - Go to [Netlify](https://netlify.com)
   - Sign up/Login with your GitHub account
   - Click "New site from Git"
   - Choose your repository

2. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

### 2. GitHub Secrets Configuration

Add these secrets to your GitHub repository:

1. Go to your GitHub repo → Settings → Secrets and variables → Actions
2. Add the following secrets:

```
NETLIFY_AUTH_TOKEN=your_netlify_personal_access_token
NETLIFY_SITE_ID=your_netlify_site_id
```

**To get these values:**

- **NETLIFY_AUTH_TOKEN**: 
  - Go to Netlify → User Settings → Applications → Personal access tokens
  - Generate new token

- **NETLIFY_SITE_ID**:
  - Go to your Netlify site → Site settings → General
  - Copy the "Site ID"

### 3. Environment Variables (Optional)

If you need environment variables for your app:

1. In Netlify: Site settings → Environment variables
2. Add your variables (they should start with `VITE_` for Vite to include them)

## 📁 Files Created

### `netlify.toml`
- Netlify configuration file
- Handles build settings, redirects, and headers
- Fixes MIME type issues
- Configures SPA routing

### `.github/workflows/deploy.yml`
- GitHub Actions workflow
- Automatically deploys on push to main/master
- Creates deploy previews for pull requests
- Runs linting and builds before deployment

### `public/_redirects`
- Netlify redirects file
- Handles React Router SPA routing
- Adds security headers

### Updated `vite.config.ts`
- Optimized build configuration
- Proper asset handling
- Code splitting for better performance

## 🔧 Troubleshooting

### MIME Type Errors
The configuration files should resolve MIME type issues by:
- Setting proper Content-Type headers in `netlify.toml`
- Optimizing build output in `vite.config.ts`
- Ensuring proper asset serving

### 404 Errors on Refresh
The `_redirects` file handles SPA routing by redirecting all routes to `index.html`

### Build Failures
1. Check Node.js version (should be 18)
2. Ensure all dependencies are in `package.json`
3. Check build logs in Netlify or GitHub Actions

## 🚦 Deployment Process

1. **Push to GitHub**: Code is automatically deployed when pushed to main/master
2. **Pull Requests**: Create deploy previews for testing
3. **Manual Deploy**: Use Netlify CLI or dashboard for manual deployments

## 📊 Monitoring

- **Netlify Dashboard**: Monitor deployments and site analytics
- **GitHub Actions**: Check build status and logs
- **Netlify Functions**: Ready for serverless functions if needed

## 🔐 Security

- Security headers are automatically added
- Environment variables are properly handled
- Build artifacts are excluded from version control

## 📞 Support

If you encounter issues:
1. Check Netlify deploy logs
2. Review GitHub Actions workflow runs
3. Verify all secrets are properly set
4. Ensure your repository is public or you have proper permissions

---

**Your app should now be automatically deployed to Netlify with every code change!**