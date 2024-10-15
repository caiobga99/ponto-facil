import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "teste@teste.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Simular chamada de API para autenticação
        if (
          credentials?.email === "teste@teste.com" &&
          credentials?.password === "senha"
        ) {
          console.log("login");
          return { id: 1, name: "Test User", email: credentials.email };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // Redireciona para a página de login
  },
});

export { handler as GET, handler as POST }; // Exportar como métodos GET e POST
