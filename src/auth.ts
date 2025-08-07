import axios from 'axios';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials.email as string;
        const password = credentials.password as string;

        const envEmail = process.env.EMAIL as string;
        const envPassword = process.env.PASSWORD as string;

        if (email === envEmail && password === envPassword) {
          return {
            id: '1',
            name: 'Admin',
            email: envEmail,
          };
        } else {
          throw new Error('Invalid credentials');
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
