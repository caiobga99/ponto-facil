import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

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
        try {
          const response = await axios.post("http://localhost:8081/Login", {
            email: credentials?.email,
            password: credentials?.password,
          });

          console.log("RESPONSE DATA: ", response.data);

          if (response.data) {
            if (
              credentials?.email === "admin@gmail.com" &&
              credentials?.password === "123"
            ) {
              return {
                id: response.data.id,
                username: "TEST NAME",
                token: response.data.acessToken,
                isAdmin: true,
              };
            }

            return {
              id: response.data.id,
              username: "TEST NAME",
              token: response.data.acessToken,
              isAdmin: false,
            };
          } else {
            console.error("sem token na resposta ");

            return null;
          }
        } catch (error) {
          console.error("Erro na autenticação", error);

          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token?.acessToken) {
        session.user.token = token.acessToken;
      }
      if (token?.isAdmin !== undefined) {
        session.user.isAdmin = token.isAdmin;
      }
      if (token?.username) {
        session.user.username = token.username;
      }

      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.acessToken = user.token;
        token.username = user.username;
        token.id = user.id;
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
