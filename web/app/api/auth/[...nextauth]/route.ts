import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Envia email e senha para a rota de login
          const loginResponse = await axios.post("http://localhost:8081/auth/Login", {
            email: credentials.email,
            password: credentials.password,
          });

          const { acessToken, response } = loginResponse.data;

          if (acessToken) {
            // Retorna o token de acesso para uso nos callbacks
            return {
              token: acessToken,
            };
          } else {
            throw new Error(response || "Erro de autenticação");
          }
        } catch (error) {
          throw new Error("Erro durante autenticação");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.token) {
        // Armazena o accessToken no token JWT do NextAuth
        token.accessToken = user.token;

        try {
          // Faz uma requisição para /auth/profile usando o token de acesso
          const profileResponse = await axios.get("http://localhost:8081/auth/profile", {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });

          const profileData = profileResponse.data;

          // Adiciona os dados do perfil ao token
          token.username = profileData.username;
          token.email = profileData.email;
          token.roles = profileData.roles;
          token.cargaHoraria = profileData.cargaHoraria;
          token.cargo = profileData.cargo;
        } catch (error) {
          console.error("Erro ao obter o perfil do usuário:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Passa os dados do token para a sessão
      session.user = {
        username: token.username,
        email: token.email,
        token: token.accessToken,
        roles: token.roles,
        cargaHoraria: token.cargaHoraria,
        cargo: token.cargo,
      };
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
