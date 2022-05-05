import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios'

export default NextAuth({
    pages: {
        signIn: '/auth/login',
        error: '/auth/login',
    },
    providers: [
        CredentialsProvider({
            name: 'Custom Provider',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const { username, password } = credentials;

                const login = await axios
                    .post(`${process.env.BACKEND_URL}/api/v1/auth/login`, {
                        username,
                        password,
                    })
                    .then(({ data }) => {
                        let user = data.user;
                        const { access_token, refresh_token } = data;
                        user = { ...user, access_token, refresh_token };
                        return user;
                    })
                    .catch((err) => {
                        let message = err?.response?.data?.error;
                        if (message == null) message = 'Something went wrong'
                        throw new Error(message);
                    });
                return login;
            },
        }),
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
