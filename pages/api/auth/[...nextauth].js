import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios'

export default NextAuth({
  // pages: {
  //   signIn: '/sign-in',
  //   error: '/sign-in',
  // },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (credentials.username === "john", credentials.password === "test") {
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
  },
  debug: true,
});
