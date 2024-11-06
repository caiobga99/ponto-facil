// next-auth.d.ts
import NextAuth from "next-auth";

// Extende o tipo padrão da sessão
declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      email: string;
      token: string;
      roles: string[];
      cargaHoraria: string;
      cargo: string;
    };
  }

  interface User {
    token: string;
  }

  interface JWT {
    accessToken: string;
    username: string;
    email: string;
    roles: string[];
    cargaHoraria: string;
    cargo: string;
  }
}
