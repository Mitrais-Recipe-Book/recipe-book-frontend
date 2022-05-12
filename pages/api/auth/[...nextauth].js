import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios'

export default NextAuth({
    pages: {
        signIn: '/sign-in',
        error: '/sign-in',
    },
    providers: [
        CredentialsProvider({
            name: 'Custom Provider',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const username = credentials.username;
                const password = credentials.password;
                const login = await axios
                    .post(`https://recipyb-dev.herokuapp.com/auth/sign-in`, {
                        username,
                        password,
                    })
                    .then(({ data }) => {
                        let user = {};
                        var token = data.data.access_token;
                        var decoded = jwt_decode(JSON.stringify(token));
                        let roles = decoded.roles;
                        let name = decoded.sub;
                        user = { ...user, token, roles, name };
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
        async signIn({ credentials }) {
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
