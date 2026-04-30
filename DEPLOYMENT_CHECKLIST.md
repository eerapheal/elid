# Deployment Checklist - LID EVENT & MORE

Use this checklist to ensure everything is configured correctly before deploying to production.

## Pre-Deployment Setup

### Local Testing
- [ ] Run `pnpm install` successfully
- [ ] Create `.env.local` with all required variables
- [ ] Test locally with `pnpm dev`
- [ ] Create admin user with `node scripts/setup-admin.js`
- [ ] Test admin login at `/admin/login`
- [ ] Test booking form at `/booking`
- [ ] Test contact form at `/contact`
- [ ] Verify booking emails are received
- [ ] Run build successfully with `pnpm build`

### Database Setup
- [ ] Create MongoDB Atlas account
- [ ] Create a cluster
- [ ] Create a database user with strong password
- [ ] Whitelist IP addresses (0.0.0.0/0 for development, specific IPs for production)
- [ ] Get MongoDB connection URI
- [ ] Test connection locally

### Email Configuration
- [ ] Gmail: Enable 2-Step Verification
- [ ] Gmail: Generate App Password
- [ ] Test email sending locally
- [ ] Verify booking confirmation emails are formatted correctly
- [ ] Verify admin notification emails contain required details

### Customization
- [ ] Update company name throughout (navigation, footer, CTA)
- [ ] Update phone number and email addresses
- [ ] Update business hours
- [ ] Update company location
- [ ] Update or remove placeholder services
- [ ] Update or remove placeholder team members
- [ ] Update or remove placeholder testimonials
- [ ] Update portfolio items (or remove portfolio section)
- [ ] Review all text for accuracy and professionalism

## Pre-Vercel Deployment

### Code Quality
- [ ] No console errors in development
- [ ] No TypeScript errors
- [ ] Build completes without warnings
- [ ] All environment variables documented in .env.example
- [ ] Remove any debug console.log statements
- [ ] Review README.md for accuracy

### Git & GitHub
- [ ] Initialize git repository: `git init`
- [ ] Add all files: `git add .`
- [ ] Create initial commit: `git commit -m "Initial commit"`
- [ ] Create GitHub repository
- [ ] Connect local repo: `git remote add origin <github-url>`
- [ ] Push to GitHub: `git push -u origin main`
- [ ] Verify all files are on GitHub

## Vercel Deployment

### Create Vercel Project
- [ ] Go to https://vercel.com/new
- [ ] Select GitHub repository
- [ ] Choose project name
- [ ] Configure build settings (should auto-detect Next.js)

### Environment Variables on Vercel
- [ ] Copy `.env.local` variables
- [ ] Add to Vercel project settings:
  - [ ] `MONGODB_URI` (production MongoDB URI)
  - [ ] `NEXTAUTH_SECRET` (generate NEW secure secret)
  - [ ] `NEXTAUTH_URL` (your production domain, e.g., https://eventsandmore.ng)
  - [ ] `EMAIL_SERVICE`
  - [ ] `EMAIL_USER`
  - [ ] `EMAIL_PASSWORD`
  - [ ] `EMAIL_FROM`
  - [ ] `EMAIL_ADMIN`
  - [ ] `NODE_ENV=production`

### Deploy
- [ ] Click Deploy
- [ ] Wait for build to complete
- [ ] Check preview URL works
- [ ] Verify all pages load correctly
- [ ] Test booking form
- [ ] Test contact form
- [ ] Verify emails are received

### Post-Deployment
- [ ] Promote to production domain
- [ ] Update DNS if using custom domain
- [ ] Test admin login
- [ ] Create production admin user
- [ ] Verify all functionality works in production

## Production Configuration

### Security
- [ ] HTTPS is enabled (automatic with Vercel)
- [ ] NEXTAUTH_URL matches your domain
- [ ] NEXTAUTH_SECRET is strong and unique
- [ ] Email passwords are NOT stored in code
- [ ] MongoDB password is strong
- [ ] IP whitelist configured in MongoDB for production IPs

### Monitoring
- [ ] Set up error tracking (Sentry, LogRocket, etc.)
- [ ] Enable Vercel Analytics
- [ ] Set up email notifications for errors
- [ ] Monitor booking submissions daily
- [ ] Check email delivery status

### Backup & Recovery
- [ ] Enable MongoDB backup
- [ ] Document recovery procedures
- [ ] Test recovery process quarterly
- [ ] Keep secure copies of all passwords

## Post-Launch Maintenance

### Ongoing Tasks
- [ ] Check admin dashboard daily for new bookings
- [ ] Respond to booking inquiries within 24 hours
- [ ] Review contact form submissions
- [ ] Update portfolio with new events
- [ ] Update team information as needed
- [ ] Monitor email delivery
- [ ] Check website uptime monitoring

### Periodic Reviews (Monthly)
- [ ] Review booking trends
- [ ] Update testimonials with new clients
- [ ] Review and optimize performance
- [ ] Check for security updates
- [ ] Review error logs

### Annual Tasks
- [ ] Review and update all company information
- [ ] Audit and test all forms
- [ ] Security audit and penetration testing
- [ ] Database maintenance and cleanup
- [ ] Disaster recovery drill

## Troubleshooting During Deployment

### Build Fails on Vercel
- [ ] Check build logs on Vercel dashboard
- [ ] Verify all environment variables are set
- [ ] Ensure MongoDB connection is successful
- [ ] Clear cache and redeploy
- [ ] Check for missing dependencies

### Emails Not Sending in Production
- [ ] Verify EMAIL_PASSWORD is correct app password
- [ ] Check email service logs
- [ ] Verify email addresses are correct
- [ ] Check spam folder
- [ ] Test with different email address

### Admin Login Not Working
- [ ] Verify admin user exists in production MongoDB
- [ ] Check NEXTAUTH_SECRET is set and consistent
- [ ] Verify NEXTAUTH_URL is correct
- [ ] Clear browser cookies and try again

### Database Connection Issues
- [ ] Verify MONGODB_URI in Vercel environment
- [ ] Check IP whitelist in MongoDB Atlas
- [ ] Ensure database user has correct permissions
- [ ] Test connection manually using MongoDB client

## Domain Setup (Custom Domain)

### DNS Configuration
- [ ] Purchase domain from registrar
- [ ] In Vercel: Add custom domain
- [ ] Copy DNS records from Vercel
- [ ] Add DNS records to domain registrar
- [ ] Wait for DNS propagation (up to 24 hours)
- [ ] Verify domain works with https
- [ ] Redirect www to main domain (or vice versa)

### Email with Custom Domain
- [ ] Set up SPF record
- [ ] Set up DKIM record
- [ ] Set up DMARC record
- [ ] Test email authentication (mailtester.com)
- [ ] Monitor email delivery reputation

## Success Criteria

Your deployment is successful when:
✅ Website loads without errors on production URL
✅ All pages are accessible
✅ Forms submit successfully
✅ Emails are received automatically
✅ Admin dashboard shows new bookings
✅ Admin can log in and view bookings
✅ Performance is acceptable (check Vercel Analytics)
✅ No security issues detected

---

**Deployment Complete** when all items are checked!

For questions or issues, refer to README.md or QUICKSTART.md.
