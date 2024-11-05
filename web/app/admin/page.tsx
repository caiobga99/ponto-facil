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
  Button,
  Text,
} from "@nextui-org/react";

const columns = [
  { name: "ID", uid: "userId" },
  { name: "Email", uid: "email" },
  { name: "Cargo", uid: "cargo" },
  { name: "Carga Horária", uid: "cargaHoraria" },
  { name: "Nome", uid: "userName" },
  { name: "Ações", uid: "actions" },
];

const AdminPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSessionLoaded, setIsSessionLoaded] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const renderCell = useCallback((user, columnKey) => {
    switch (columnKey) {
      case "userId":
      case "email":
      case "cargo":
      case "cargaHoraria":
      case "userName":
        return user[columnKey];
      case "actions":
        return (
          <Button auto onClick={() => handleOpenModal(user)}>
            Ver Pontos
          </Button>
        );
      default:
        return null;
    }
  }, []);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    setIsAnimating(true);
  };

  const handleCloseModal = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedUser(null);
    }, 300); // Tempo da animação em ms
  };

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
          "http://localhost:8081/usuarios/allUsers",
          config
        );

        setUsers(response.data);
      } catch (err) {
        setError("Erro ao carregar os dados. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    if (status === "loading") {
      return;
    }

    if (session && session.user) {
      if (!session.user.isAdmin) {
        router.push("/");
      } else {
        fetchUsers();
      }
    } else {
      router.push("/login");
    }

    setIsSessionLoaded(true);
  }, [session, status, router]);

  if (!isSessionLoaded || status === "loading" || loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Página de Admin</h1>

      <Table aria-label="Tabela de usuários">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>
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

      {/* Modal para exibir os pontos */}
      {isModalOpen && (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${isAnimating ? "opacity-100" : "opacity-0"}`}>
          <div className={`bg-white rounded-lg p-6 max-w-sm w-full transform transition-transform duration-300 ${isAnimating ? "scale-100" : "scale-90"}`}>
            <h2 className="text-lg text-black font-bold mb-4">{selectedUser ? selectedUser.userName : ''} - Pontos Batidos</h2>
            <div className="mb-4 text-black">
              {selectedUser && selectedUser.pontos && selectedUser.pontos.length > 0 ? (
                selectedUser.pontos.map((point: any) => (
                  <div key={point.pointId}>
                    {point.tipoPonto} - {point.hora} (Dia: {point.dia}/{point.mes})
                  </div>
                ))
              ) : (
                <p>Nenhum ponto registrado.</p>
              )}
            </div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleCloseModal}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
