# LID EVENT - Professional Event Planning Website

A modern, elegant event planning website for a Nigeria-based company offering comprehensive event services including wedding planning, corporate events, modelling, entertainment, and more.

## Features

### Public Pages
- **Homepage**: Stunning hero section with company overview and key statistics
- **Services Catalog**: Detailed showcase of 6 professional services
- **Portfolio Gallery**: Showcase of past events with categories and details
- **Team Directory**: Meet the professionals behind every successful event
- **Testimonials**: Client reviews and success stories
- **Booking System**: Complete event booking form with service selection
- **Contact Page**: Multiple contact methods and inquiry form

### Admin Features
- **Secure Authentication**: NextAuth.js with credentials-based login
- **Admin Dashboard**: Overview of all bookings with real-time statistics
- **Booking Management**: Track booking status (pending, contacted, confirmed, cancelled)
- **Responsive Interface**: Works seamlessly on desktop and mobile devices

### Technical Highlights
- **Database**: MongoDB for scalable data management
- **Email System**: Nodemailer integration for booking confirmations and admin notifications
- **Design**: Elegant luxury theme inspired by business card branding
- **SEO Optimized**: Meta tags and semantic HTML for better search visibility
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 16 with React 19
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js with JWT
- **Email**: Nodemailer
- **Styling**: Tailwind CSS 4 with shadcn/ui components
- **Form Validation**: React Hook Form with Zod
- **Notifications**: Sonner for toast notifications

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd events-and-more
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/events_db

# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-generate-with-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3000

# Email Configuration (Gmail Example)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@eventsandmore.ng
EMAIL_ADMIN=admin@eventsandmore.ng
```

### 4. MongoDB Setup
1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a cluster and database named `events_db`
3. Get your connection string and add to `.env.local`

### 5. Email Configuration
For Gmail:
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password at https://myaccount.google.com/apppasswords
3. Use the 16-character password in `EMAIL_PASSWORD`

### 6. NextAuth Secret
Generate a secure secret:
```bash
openssl rand -base64 32
```

### 7. Run Development Server
```bash
pnpm dev
```

Visit http://localhost:3000 to see the application.

## Creating Admin User

1. Connect to your MongoDB database
2. Insert an admin user into the `admins` collection:
```javascript
db.admins.insertOne({
  email: "admin@eventsandmore.ng",
  password: "$2b$10$...", // bcrypt hashed password
  name: "Admin",
  createdAt: new Date()
})
```

To hash a password, use:
```bash
node -e "require('bcrypt').hash('your-password', 10, (err, hash) => console.log(hash))"
```

Or use the admin panel (once implemented) to create users securely.

## Project Structure

```
events-and-more/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── booking/                    # Booking page
│   ├── contact/                    # Contact page
│   ├── admin/
│   │   ├── login/                  # Admin login
│   │   └── dashboard/              # Admin dashboard
│   ├── api/
│   │   ├── auth/                   # NextAuth routes
│   │   ├── bookings/               # Booking API
│   │   ├── contact/                # Contact API
│   │   └── admin/                  # Admin APIs
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── navigation.tsx              # Main navigation
│   ├── footer.tsx                  # Footer
│   └── sections/
│       ├── hero.tsx                # Hero section
│       ├── services.tsx            # Services section
│       ├── portfolio.tsx           # Portfolio section
│       ├── team.tsx                # Team section
│       ├── testimonials.tsx        # Testimonials section
│       └── cta.tsx                 # Call-to-action section
├── lib/
│   ├── mongodb.ts                  # MongoDB connection
│   ├── auth.ts                     # NextAuth config
│   └── mailer.ts                   # Nodemailer setup
├── models/
│   └── index.ts                    # Mongoose schemas
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## Key Routes

### Public Routes
- `/` - Homepage
- `/booking` - Event booking form
- `/contact` - Contact/inquiry form

### Admin Routes
- `/admin/login` - Admin login page
- `/admin/dashboard` - Admin dashboard (requires authentication)

### API Routes
- `POST /api/bookings/create` - Submit booking request
- `POST /api/contact` - Submit contact inquiry
- `GET /api/admin/bookings` - Fetch bookings (admin only)

## Database Collections

### Services
Stores available event services with descriptions and pricing.

### Bookings
Stores client booking requests with:
- Client information (name, email, phone)
- Event details (date, type, location, guest count)
- Budget range
- Selected services
- Booking status (pending, contacted, confirmed, cancelled)

### Team Members
Profiles of team professionals with:
- Name, role, specialty
- Bio and professional information

### Portfolio
Past events with:
- Event title, description
- Photos and testimonials
- Services provided

### Testimonials
Client reviews with rating and message.

### Contact Messages
Inquiry form submissions with status tracking.

### Admins
Administrator accounts for dashboard access.

## Email Templates

The system includes professional email templates for:
- **Booking Confirmation**: Sent to clients after booking submission
- **Admin Notification**: Alerts admin of new bookings
- **Contact Confirmation**: Acknowledges client inquiries

Templates use the LID EVENT brand colors and styling for professional appearance.

## Deployment

### Vercel Deployment
1. Push your code to GitHub
2. Go to https://vercel.com/new
3. Connect your GitHub repository
4. Add environment variables in project settings
5. Deploy

### Environment Variables for Production
Ensure all environment variables are set in Vercel project settings:
- `MONGODB_URI`
- `NEXTAUTH_SECRET` (generate new secure value)
- `NEXTAUTH_URL` (your production domain)
- Email configuration variables

## Customization

### Branding
- Update company name in navigation and footer
- Modify color scheme in `globals.css`
- Update contact information in CTA section
- Replace placeholder images with actual photos

### Services
Edit the `services` array in `components/sections/services.tsx`

### Team Members
Add team members in MongoDB or update `components/sections/team.tsx`

### Testimonials
Update client testimonials in `components/sections/testimonials.tsx` or MongoDB

## Security Considerations

1. **Passwords**: Always hash passwords using bcrypt
2. **Environment Variables**: Never commit `.env.local`
3. **Authentication**: NextAuth secures admin routes
4. **API Routes**: Protected endpoints require authentication
5. **Email**: Credentials stored securely in environment variables
6. **HTTPS**: Always use HTTPS in production

## Troubleshooting

### Email Not Sending
1. Check `EMAIL_USER` and `EMAIL_PASSWORD` in `.env.local`
2. For Gmail, ensure App Password is used (not regular password)
3. Check email service logs for errors

### MongoDB Connection Error
1. Verify `MONGODB_URI` is correct
2. Check IP whitelist in MongoDB Atlas
3. Ensure database is created

### Admin Login Not Working
1. Verify admin user exists in MongoDB
2. Check password is correctly bcrypt hashed
3. Ensure `NEXTAUTH_SECRET` is set

## Support & Contact

For issues or questions about implementation, check the project documentation or contact support.

## License

This project is provided as-is for the LID EVENT company.
