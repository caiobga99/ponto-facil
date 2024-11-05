// app/admin/page.tsx
"use client";
import { useSession } from "next-auth/react";
import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from "@nextui-org/react";

import { EditIcon, DeleteIcon, EyeIcon } from "@/components/icons";

// Simulação de dados para a tabela (você pode substituir por dados dinâmicos)
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    role: "Developer",
    team: "Engineering",
    status: "active",
    avatar: "/avatar.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@example.com",
    role: "Designer",
    team: "Creative",
    status: "paused",
    avatar: "/avatar.jpg",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bobjohnson@example.com",
    role: "Manager",
    team: "HR",
    status: "vacation",
    avatar: "/avatar.jpg",
  },
  // Adicione mais usuários conforme necessário
];

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const columns = [
  { name: "Name", uid: "name" },
  { name: "Role", uid: "role" },
  { name: "Status", uid: "status" },
  { name: "Actions", uid: "actions" },
];

const AdminPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // A função renderCell deve ser chamada na ordem correta com todos os hooks
  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []); // O useCallback foi movido para garantir que não mude a ordem

  useEffect(() => {
    if (status === "loading") return;

    if (!session || !session.user) {
      router.push("/login");
    } else if (!session.user.isAdmin) {
      router.push("/");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session || !session.user) {
    return <p>Você não está logado.</p>;
  } else if (!session.user.isAdmin) {
    return <p>Você não tem permissão para acessar esta página.</p>;
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
            <TableRow key={item.id}>
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
