"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { EditIcon, DeleteIcon, EyeIcon } from "@/components/icons";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

// Definindo as colunas da tabela
const columns = [
  { name: "ID", uid: "userId" },
  { name: "Email", uid: "email" },
  { name: "Cargo", uid: "cargo" },
  { name: "Carga Horária", uid: "cargaHoraria" },
  { name: "Nome", uid: "userName" },
];

const AdminPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Estado para armazenar os usuários e o estado de carregamento
  const [users, setUsers] = useState<any[]>([]); // Defina o tipo de dados conforme a estrutura
  const [loading, setLoading] = useState(true); // Controla o estado de carregamento
  const [error, setError] = useState<string | null>(null); // Para lidar com erros da API
  const [isSessionLoaded, setIsSessionLoaded] = useState(false); // Flag para controlar o carregamento da sessão

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "userId":
        return cellValue; // Exibe o ID do usuário
      case "email":
        return cellValue; // Exibe o email
      case "cargo":
        return cellValue; // Exibe o cargo do usuário
      case "cargaHoraria":
        return cellValue; // Exibe a carga horária
      case "userName":
        return cellValue; // Exibe o nome do usuário
      default:
        return cellValue;
    }
  }, []);

  // Carregar os usuários da API com o token Bearer no cabeçalho
  useEffect(() => {
    const fetchUsers = async () => {
      if (!session || !session.user) {
        setLoading(false);
        setError("Você não está logado.");

        return;
      }

      const token = session.user.token;

      if (!token) {
        setLoading(false);
        setError("Token de autenticação não encontrado.");

        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        };

        const response = await axios.get(
          "http://localhost:8081/usuarios/allUsers", // Substitua pela URL real da sua API
          config
        );

        // Atualiza o estado com os dados dos usuários
        setUsers(response.data); // Usa a resposta real da API
      } catch (err) {
        setError("Erro ao carregar os dados. Tente novamente mais tarde.");
      } finally {
        setLoading(false); // Desabilita o carregamento
      }
    };

    if (status === "loading") {
      return; // Não faz nada enquanto a sessão está sendo carregada
    }

    if (session && session.user) {
      if (!session.user.isAdmin) {
        router.push("/"); // Se o usuário não for admin, redireciona
      } else {
        fetchUsers(); // Se for admin, busca os usuários
      }
    } else {
      router.push("/login"); // Se não estiver logado, redireciona
    }

    setIsSessionLoaded(true); // Marca que a sessão foi carregada
  }, [session, status, router]); // Reexecuta quando a sessão ou status mudam

  if (!isSessionLoaded || status === "loading" || loading) {
    return <p>Carregando...</p>; // Aguarda a sessão ser carregada
  }

  if (error) {
    return <p>{error}</p>; // Exibe erro caso aconteça
  }

  return (
    <div>
      <h1>Página de Admin</h1>

      {/* Tabela de usuários */}
      <Table aria-label="Tabela de usuários">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(item) => (
            <TableRow key={item.userId}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminPage;
