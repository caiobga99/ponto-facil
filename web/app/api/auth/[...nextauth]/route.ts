import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Atualize o tipo do id para string
interface User {
  id: string; // Mude de number para string
  name: string;
  email: string;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "teste@teste.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        console.log("Tentando autenticar com:", credentials); // Para verificar os dados do login

        if (
          credentials?.email === "teste@teste.com" &&
          credentials?.password === "senha"
        ) {
          console.log("Login bem-sucedido");

          // Converta o id para string
          return { id: "1", name: "Test User", email: credentials.email };
        }

        console.log("Login falhou");

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // Redireciona para a página de login
  },
});

export { handler as GET, handler as POST }; // Exportar como métodos GET e POST
