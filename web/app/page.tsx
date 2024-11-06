"use client";
import { useEffect, useState } from "react"; // Importando useState
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // Estado para armazenar os dados dos pontos
  const [pontoData, setPontoData] = useState({
    entrada: null,
    pausa: null,
    retorno: null,
    saida: null,
  });

  // Verifica a sessão do usuário e redireciona se não houver sessão
  useEffect(() => {
    if (status === "loading") return;
  }, [session, status, router]);

  // Função que lida com o clique em qualquer card
  const handleCardClick = async (tipoPonto) => {
    try {
      const pontoRequestData = { tipoPonto };

      console.log("Requisição para o backend com:", pontoRequestData);

      const response = await axios.post(
        "http://localhost:8081/usuarios/HitPoint",
        pontoRequestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.token}`,
          },
        }
      );

      console.log("Resposta do backend:", response.data);
      
      // Atualiza o estado com os dados do ponto correspondente
      setPontoData((prevData) => ({
        ...prevData,
        [tipoPonto]: response.data.ponto,
      }));
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
    }
  };

  if (status === "loading") return <div>Loading...</div>;


  console.log(session?.user)

  return (
    <section className="flex flex-wrap justify-center gap-6 py-8 md:py-10">
      <div className="flex flex-col gap-4">
        {/* Card de Entrada */}
        <Card className="py-4 bg-gray-700 text-white max-w-sm flex-shrink-0 shadow-lg transition-transform duration-200 hover:scale-105 rounded-lg">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">1</p>
            <h4 className="font-bold text-lg">Bater Ponto</h4>
            {pontoData.entrada && (
              <>
                <p>Tipo de ponto: {pontoData.entrada.tipoPonto}</p>
                <p>Hora: {pontoData.entrada.hora}</p>
                <p>Data: {pontoData.entrada.dia}/{pontoData.entrada.mes}</p>
              </>
            )}
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
            {pontoData.pausa && (
              <>
                <p>Tipo de ponto: {pontoData.pausa.tipoPonto}</p>
                <p>Hora: {pontoData.pausa.hora}</p>
                <p>Data: {pontoData.pausa.dia}/{pontoData.pausa.mes}</p>
              </>
            )}
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
            {pontoData.retorno && (
              <>
                <p>Tipo de ponto: {pontoData.retorno.tipoPonto}</p>
                <p>Hora: {pontoData.retorno.hora}</p>
                <p>Data: {pontoData.retorno.dia}/{pontoData.retorno.mes}</p>
              </>
            )}
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
            {pontoData.saida && (
              <>
                <p>Tipo de ponto: {pontoData.saida.tipoPonto}</p>
                <p>Hora: {pontoData.saida.hora}</p>
                <p>Data: {pontoData.saida.dia}/{pontoData.saida.mes}</p>
              </>
            )}
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
