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
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required');
        }

        try {
          await dbConnect();
          const admin = await Admin.findOne({ email: credentials.email });

          if (!admin) {
            throw new Error('No user found with that email');
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, admin.password);

          if (!isPasswordValid) {
            throw new Error('Invalid password');
          }

          return {
            id: admin._id.toString(),
            email: admin.email,
            name: admin.name,
          };
        } catch (error) {
          console.error('[ELID] Auth error:', error);
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
};
