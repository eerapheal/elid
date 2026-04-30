# LID EVENT - Quick Start Guide

Get your event planning website up and running in minutes!

## 1. Prerequisites

- Node.js 18+ and pnpm
- MongoDB account (MongoDB Atlas: https://www.mongodb.com/cloud/atlas)
- Gmail account with App Password (for email notifications)

## 2. Local Setup

### Clone and Install
```bash
# Install dependencies
pnpm install
```

### Configure Environment Variables

Create a `.env.local` file in the root directory with your credentials:

```env
# MongoDB - Get from Atlas
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/events_db

# NextAuth - Generate with: openssl rand -base64 32
NEXTAUTH_SECRET=your-generated-secret-here
NEXTAUTH_URL=http://localhost:3000

# Email - Use Gmail App Password
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
EMAIL_FROM=noreply@eventsandmore.ng
EMAIL_ADMIN=admin@eventsandmore.ng

NODE_ENV=development
```

### Run Development Server
```bash
pnpm dev
```

Open http://localhost:3000 in your browser.

## 3. Create Admin User

Once the app is running, create your first admin account:

```bash
node scripts/setup-admin.js
```

Follow the prompts to create an admin user. Then visit:
- **Admin Login**: http://localhost:3000/admin/login
- **Dashboard**: http://localhost:3000/admin/dashboard

## 4. Test the Features

### Public Pages
- **Home**: http://localhost:3000
- **Services**: Scroll to Services section
- **Portfolio**: Scroll to Portfolio section
- **Book Event**: http://localhost:3000/booking
- **Contact**: http://localhost:3000/contact

### Admin Features
- **Login**: http://localhost:3000/admin/login
- **Dashboard**: http://localhost:3000/admin/dashboard (after login)

## 5. Customize Your Site

### Update Contact Information
Edit `components/sections/cta.tsx` and `components/footer.tsx`:
- Phone number
- Email address
- Business hours
- Location

### Modify Services
Edit `components/sections/services.tsx` to add/remove/modify services.

### Update Team Members
Edit `components/sections/team.tsx` with your actual team information.

### Customize Testimonials
Edit `components/sections/testimonials.tsx` with real client testimonials.

## 6. Deploy to Vercel

### Connect to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/events-and-more.git
git push -u origin main
```

### Deploy on Vercel
1. Go to https://vercel.com/new
2. Connect your GitHub repository
3. Add environment variables in Settings:
   - `MONGODB_URI`
   - `NEXTAUTH_SECRET` (generate a new one)
   - `NEXTAUTH_URL` (your production domain)
   - All email variables

4. Click Deploy

## 7. Set Up Email Notifications

### For Gmail:
1. Enable 2-Step Verification: https://myaccount.google.com/security
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Select "Mail" and "Windows Computer" (or your device)
4. Copy the 16-character password
5. Use it as `EMAIL_PASSWORD` in `.env.local`

### For Other Services:
- **SendGrid**: Use API key with app password
- **Mailgun**: Use domain and API key
- **Custom SMTP**: Configure host and port

## 8. MongoDB Setup

### Create Database:
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user (use a strong password)
4. Get connection string
5. Replace username, password, and database name in the URI

Example URI:
```
mongodb+srv://eventuser:SecurePassword123@cluster.mongodb.net/events_db?retryWrites=true&w=majority
```

## 9. Troubleshooting

### Email Not Sending
- Check EMAIL_USER and EMAIL_PASSWORD in `.env.local`
- For Gmail, verify App Password is being used (not regular password)
- Check spam folder

### MongoDB Connection Error
- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas (should allow 0.0.0.0/0 for development)
- Ensure database exists

### Admin Login Not Working
- Verify admin user was created with setup script
- Check NEXTAUTH_SECRET is set
- Look at browser console for errors

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `pnpm install`
- Check all environment variables are set

## 10. Next Steps

- [ ] Update company information
- [ ] Add actual team photos
- [ ] Update services and pricing
- [ ] Add portfolio items and images
- [ ] Set up email notifications
- [ ] Create admin user
- [ ] Test booking form
- [ ] Deploy to production
- [ ] Set up custom domain
- [ ] Monitor analytics

## 11. Additional Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **MongoDB Documentation**: https://docs.mongodb.com
- **NextAuth.js Documentation**: https://next-auth.js.org
- **Nodemailer Documentation**: https://nodemailer.com
- **Tailwind CSS**: https://tailwindcss.com

## Support

For issues or questions, refer to the main README.md file for detailed documentation.

Happy building! 🎉
