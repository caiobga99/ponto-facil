"use client";

import { useSession } from "next-auth/react";
import { Card, CardHeader, CardBody, Avatar, Divider } from "@nextui-org/react";

const Profile = () => {
  const { data: session } = useSession();

  if (!session) return <div>Carregando...</div>;

  return (
    <div className="flex justify-center items-center min-h-full ">
      <Card className="w-full max-w-xl md:max-w-lg lg:max-w-2xl shadow-xl border-[1px] border-purple-500 rounded-3xl p-8  bg-slate-900 text-white">
        <CardHeader className="flex flex-col items-center text-center space-y-2">
          <Avatar
            isBordered
            color="secondary"
            size="xl"
            src={session.user.image || "https://th.bing.com/th/id/OIP.dC6CwT2I2vj7goUpkPFvVgHaEK?rs=1&pid=ImgDetMain"}
            alt="User Avatar"
            className="w-32 h-32 sm:w-36 sm:h-36 mb-4 rounded-full border-4 border-white"
          />
          <h1 className="font-bold text-2xl sm:text-3xl mb-1">
            {session.user.username || "Usuário"}
          </h1>
          <p className="text-sm sm:text-lg text-gray-200">{session.user.email}</p>
        </CardHeader>
        
        <Divider className="my-6 bg-white" />

        <CardBody className="text-center space-y-4 text-sm sm:text-lg">
          <p>
            <strong>Cargo:</strong> {session.user.cargo || "Cargo não informado"}
          </p>
          <p>
            <strong>Carga Horária:</strong> {session.user.cargaHoraria || "Não especificada"}
          </p>
          <p>
            <strong>Papel:</strong> {session.user.roles?.[0] || "Não especificado"}
          </p>
          <p>
            <strong>Token:</strong> {session.user.token ? "Ativo" : "Inativo"}
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default Profile;
