import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios'
import { redirect } from 'next/dist/server/api-utils';

export default NextAuth({
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30,
  },
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-in'
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (credentials.username === "a", credentials.password === "a") {
          return { id: 1, name: 'J Smith', email: 'jsmith@example.com' };
        }
        return null
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async session({ session, user, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.user = token.user;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        const { access_token, refresh_token, ...profile } = user;
        token.accessToken = user.access_token;
        token.refreshToken = user.refresh_token;
        token.user = profile;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    }
  },
  debug: true,
});
