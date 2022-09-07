import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.accessToken = token.accessToken
            return session
        },
        async signIn({ account, profile }) {
            if (account.provider === "google") {
                // return profile.email_verified
                const zettlorService = new ZettlorService();
                let tokenResponse = await zettlorService.exchangeToken(token);
                if (!tokenResponse) {
                    return null;
                }
                const zettlorUser = {
                    id: tokenResponse.user?.uuid,
                    name: tokenResponse.user?.firstName + ' ' + tokenResponse.user?.lastName,
                    email: tokenResponse.user?.email,
                    data: tokenResponse.user,
                    apiToken: tokenResponse.access,
                };
                token.user = zettlorUser;
                token.isExchanged = true;
                delete token.account;
                delete token.profile;
            }
            return true // Do different verification for other providers that don't have `email_verified`
        },
    }
})