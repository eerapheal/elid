import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import dbConnect from './mongodb';
import { Admin } from '@/models';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('[LID AUTH] NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
        console.log('[LID AUTH] Authorizing:', credentials?.email);
        if (!credentials?.email || !credentials?.password) {
          console.error('[LID AUTH] Missing credentials');
          throw new Error('Email and password required');
        }

        try {
          await dbConnect();
          console.log('[LID AUTH] DB Connected');
          const admin = await Admin.findOne({ email: credentials.email.toLowerCase() });

          if (!admin) {
            console.error('[LID AUTH] Admin not found for email:', credentials.email);
            // Check if ANY admin exists
            const anyAdmin = await Admin.findOne({});
            console.log('[LID AUTH] Any admin exists in DB?', !!anyAdmin);
            throw new Error('No user found with that email');
          }

          console.log('[LID AUTH] Admin found:', admin.email);
          const isPasswordValid = await bcrypt.compare(credentials.password, admin.password);

          if (!isPasswordValid) {
            console.error('[LID AUTH] Invalid password for:', credentials.email);
            throw new Error('Invalid password');
          }

          console.log('[LID AUTH] Auth successful:', credentials.email);
          return {
            id: admin._id.toString(),
            email: admin.email,
            name: admin.name,
          };
        } catch (error) {
          console.error('[LID AUTH] Error:', error);
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
};
