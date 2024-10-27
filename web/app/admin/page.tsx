// app/admin/page.tsx
"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Espera a sessão carregar
    console.log("Session:", session);
    console.log("Status:", status);
    if (!session || !session.user || !session.user.isAdmin) {
      router.push("/"); // Redireciona se não for admin
    }
  }, [session, status]);

  if (status === "loading") {
    return <p>Loading...</p>; // Exibir um loading enquanto a sessão está sendo carregada
  }

  if (!session || !session.user || !session.user.isAdmin) {
    return <p>Você não tem permissão para acessar esta página.</p>; // Mensagem para usuários não autorizados
  }

  return <div>Página de Admin</div>;
};

export default AdminPage;
