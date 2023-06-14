import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }), // ...add more providers here
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {},
      async authorize(credentials, req) {
        console.log('credentials', credentials);
        return { ...credentials }
      },
      
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async jwt({ token, user, trigger, session }) {
      return {
        ...token,
        ...user
      }
    },
    async session({ session, user, token }) {
      session.user = {
        ...token, 
        userInfo: JSON.parse(token.userInfo), 
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
  },
    pages: {
      signIn: '/auth/login',
      error: '/auth/error',
    },
};
export default NextAuth(authOptions);
