import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "teste@teste.com" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "name" },
      },
      async authorize(credentials) {
        if (
          credentials?.email === "teste@teste.com" &&
          credentials?.password === "senha"
        ) {
          if (credentials?.name === "Caio") {
            return {
              id: "1",
              name: credentials.name,
              email: credentials.email,
              isAdmin: true,
            };
          } else {
            return {
              id: "2",
              name: credentials.name,
              email: credentials.email,
              isAdmin: false,
            };
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.isAdmin = token.isAdmin;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = user.isAdmin;
      }

      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
