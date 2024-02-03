import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import ProviderGoogle from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log('Error: ', error);
        }
      },
    }),
    ProviderGoogle({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    jwt: {},
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/', 
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
