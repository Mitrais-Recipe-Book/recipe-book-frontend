import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios'
import Swal from 'sweetalert2'

export default NextAuth({
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30,
  },
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-in',
    error: '/sign-in'
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { username, password } = credentials;

        const login = await axios
          .post(`https://recipyb-dev.herokuapp.com/auth/sign-in`, {
            username,
            password,
          })
          .then(({ data }) => {
            let user = data.payload.user;
            const { access_token } = data.payload.access_token;
            user = { ...user, access_token };
            return user;
          })
          .catch((err) => {
            let message = err?.response?.data?.error;
            if (message == null) message = 'Sign-in Error'
            throw new Error(message);
          });
        return login;
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
