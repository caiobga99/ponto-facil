"use client";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "loading") return; // Não redireciona enquanto está carregando

    if (!session) {
      router.push("/login"); // Redireciona para a página de login se não estiver autenticado
    }
  }, [session, status, router]);

  if (status === "loading") return <div>Loading...</div>; // Pode mostrar um loader aqui

  return (
    <section className="flex flex-wrap justify-center gap-6 py-8 md:py-10">
      <div className="flex flex-col gap-4">
        <Card className="py-4 bg-gray-700 text-white max-w-sm flex-shrink-0 shadow-lg transition-transform duration-200 hover:scale-105 rounded-lg">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">1</p>
            <h4 className="font-bold text-lg">Entrada efetuada</h4>
            <small>15/10/2024 08:24:25</small>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src=""
              width={270}
            />
          </CardBody>
        </Card>
        <Card className="py-4 text-white bg-blue-400 max-w-sm flex-shrink-0 shadow-lg transition-transform duration-200 hover:scale-105 rounded-lg">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">2</p>
            <h4 className="font-bold text-lg">PAUSA</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src=""
              width={270}
            />
          </CardBody>
        </Card>
      </div>
      <div className="flex flex-col gap-4">
        <Card className="py-4 text-white bg-yellow-500 max-w-sm flex-shrink-0 shadow-lg transition-transform duration-200 hover:scale-105 rounded-lg">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">3</p>
            <h4 className="font-bold text-lg">RETORNO</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src=""
              width={270}
            />
          </CardBody>
        </Card>
        <Card className="py-4 text-white bg-orange-600 max-w-sm flex-shrink-0 shadow-lg transition-transform duration-200 hover:scale-105 rounded-lg">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">4</p>
            <h4 className="font-bold text-lg">SAIDA</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src=""
              width={270}
            />
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
