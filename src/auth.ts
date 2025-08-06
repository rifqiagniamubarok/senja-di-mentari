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

        const envEmail = process.env.EMAIL;
        const envPassword = process.env.PASSWORD;

        if (email !== envEmail || password !== envPassword) {
          throw new Error('Invalid credentials');
        }

        return {
          id: '1',
          name: 'Admin',
          email: envEmail,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
