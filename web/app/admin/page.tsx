// app/admin/page.tsx
"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    console.log("Session:", session);
    console.log("Status:", status);
    if (!session || !session.user) {
      router.push("/login");
    } else if (!session.user.isAdmin) {
      router.push("/");
    }
  }, [session, status]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session || !session.user) {
    return <p>Voce nao esta logado.</p>;
  } else if (!session.user.isAdmin) {
    return <p>Você não tem permissão para acessar esta página.</p>;
  }

  return <div>Página de Admin</div>;
};

export default AdminPage;
