
import NextAuth from 'next-auth';
import ZitadelProvider from 'next-auth/providers/zitadel';
import type { NextAuthOptions } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            given_name?: string;
            family_name?: string;
            profile_picture?: string
        };
        accessToken?: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        given_name?: string;
        family_name?: string;
        accessToken?: string;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        ZitadelProvider({
            issuer: process.env.ZITADEL_ISSUER,
            clientId: process.env.ZITADEL_CLIENT_ID ?? '',
            clientSecret: process.env.ZITADEL_CLIENT_SECRET ?? '',
            authorization: { params: { scope: 'openid email profile' } },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            session.user = {
                ...session.user,
                id: token.sub || '',
                name: token.name || null,
                email: token.email || null,
                given_name: token.given_name,
                family_name: token.family_name,
                profile_picture: token.picture ?? ""
            };
            session.accessToken = token.accessToken;
            return session;
        },
        async jwt({ token, account }) {
            if (account?.access_token) {
                token.accessToken = account.access_token;

                if (!token.given_name) {
                    try {
                        const userinfo = await fetch(`${process.env.ZITADEL_ISSUER}/oidc/v1/userinfo`, {
                            headers: { Authorization: `Bearer ${account.access_token}` },
                        }).then(res => res.json());

                        token.given_name = userinfo.given_name;
                        token.family_name = userinfo.family_name;
                        token.email = userinfo.email
                        token.name = userinfo.name
                        token.picture = userinfo.profile_picture

                    } catch (error) {
                        console.error('Failed to fetch userinfo:', error);
                    }
                }
            }
            return token;
        },

    },
    secret: process.env.AUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };