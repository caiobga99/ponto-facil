import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const signInUrl = new URL("/login", req.url);

  // Ignora a verificação nas rotas de login, registro e qualquer chamada que envolva o processo de autenticação
  if (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register" || req.nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Obtém o token de sessão do NextAuth
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("Token obtido pelo getToken:", token);

  // Verifica diretamente o valor do cookie para debug
  const directCookieToken = req.cookies.get("next-auth.session-token")?.value;
  console.log("Token acessado diretamente do cookie:", directCookieToken);

  // Redireciona para a página de login se o token não estiver presente
  if (!token) {
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|login|register|favicon.ico|public).*)",
  ], // Protege todas as rotas, exceto login, registro, arquivos estáticos e API de autenticação
};
