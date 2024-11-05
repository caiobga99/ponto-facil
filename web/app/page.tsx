"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Verifica a sessão do usuário e redireciona se não houver sessão
  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

  // Função que lida com o clique em qualquer card
  const handleCardClick = async (tipoPonto) => {
    try {
      const pontoData = {
        tipoPonto,
      };

      console.log("Requisição para o backend com:", pontoData);

      const response = await axios.post(
        "http://localhost:8081/usuarios/HitPoint",
        pontoData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.token}`, // Corrigido para usar template string
          },
        }
      );

      console.log("Resposta do backend:", response.data);
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
    }
  };

  if (status === "loading") return <div>Loading...</div>;

  return (
    <section className="flex flex-wrap justify-center gap-6 py-8 md:py-10">
      <div className="flex flex-col gap-4">
        {/* Card de Entrada */}
        <Card className="py-4 bg-gray-700 text-white max-w-sm flex-shrink-0 shadow-lg transition-transform duration-200 hover:scale-105 rounded-lg">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">1</p>
            <h4 className="font-bold text-lg">Bater Ponto</h4>
            <small>{new Date().toLocaleString()}</small> {/* Exibe data e hora atual */}
          </CardHeader>
          <CardBody
            className="overflow-visible py-2 cursor-pointer"
            onClick={() => handleCardClick("entrada")}
          >
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="" // Adicione a URL da imagem
              width={270}
            />
          </CardBody>
        </Card>

        {/* Card de Pausa */}
        <Card className="py-4 text-white bg-blue-400 max-w-sm flex-shrink-0 shadow-lg transition-transform duration-200 hover:scale-105 rounded-lg">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">2</p>
            <h4 className="font-bold text-lg">PAUSA</h4>
          </CardHeader>
          <CardBody
            className="overflow-visible py-2 cursor-pointer"
            onClick={() => handleCardClick("pausa")}
          >
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="" // Adicione a URL da imagem
              width={270}
            />
          </CardBody>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        {/* Card de Retorno */}
        <Card className="py-4 text-white bg-yellow-500 max-w-sm flex-shrink-0 shadow-lg transition-transform duration-200 hover:scale-105 rounded-lg">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">3</p>
            <h4 className="font-bold text-lg">RETORNO</h4>
          </CardHeader>
          <CardBody
            className="overflow-visible py-2 cursor-pointer"
            onClick={() => handleCardClick("retorno")}
          >
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="" // Adicione a URL da imagem
              width={270}
            />
          </CardBody>
        </Card>

        {/* Card de Saída */}
        <Card className="py-4 text-white bg-orange-600 max-w-sm flex-shrink-0 shadow-lg transition-transform duration-200 hover:scale-105 rounded-lg">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">4</p>
            <h4 className="font-bold text-lg">SAÍDA</h4>
          </CardHeader>
          <CardBody
            className="overflow-visible py-2 cursor-pointer"
            onClick={() => handleCardClick("saida")}
          >
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="" // Adicione a URL da imagem
              width={270}
            />
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
