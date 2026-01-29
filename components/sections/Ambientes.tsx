"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ChefHat, Bed, Sofa, Briefcase } from "lucide-react";

const ambientes = [
  {
    id: "cozinha",
    nome: "Cozinha",
    descricao: "O coração da casa, onde cada refeição vira memória",
    icon: ChefHat,
    bgColor: "bg-italinea-nude/10",
    iconColor: "text-italinea-nude",
  },
  {
    id: "dormitorio",
    nome: "Dormitório",
    descricao: "Seu refúgio de descanso e renovação",
    icon: Bed,
    bgColor: "bg-italinea-blue/10",
    iconColor: "text-italinea-blue",
  },
  {
    id: "living",
    nome: "Living",
    descricao: "O espaço onde a família se reúne e celebra",
    icon: Sofa,
    bgColor: "bg-italinea-nude-light/10",
    iconColor: "text-italinea-nude-light",
  },
  {
    id: "home-office",
    nome: "Home Office",
    descricao: "Produtividade e conforto em harmonia",
    icon: Briefcase,
    bgColor: "bg-italinea-blue/10",
    iconColor: "text-italinea-blue",
  },
];

export default function Ambientes() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="ambientes" ref={ref} className="py-20 md:py-32 bg-gray-50 relative overflow-hidden">
      {/* Círculos decorativos */}
      <div className="absolute top-20 left-10 w-32 h-32 border-2 border-italinea-blue/20 rounded-full" />
      <div className="absolute bottom-20 right-10 w-40 h-40 border-2 border-italinea-nude/20 rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-italinea-blue mb-4">
            Ambientes que Transformam
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Criamos soluções personalizadas para cada espaço da sua casa
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {ambientes.map((ambiente, index) => {
            const Icon = ambiente.icon;
            return (
              <motion.div
                key={ambiente.id}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className={`w-16 h-16 rounded-full ${ambiente.bgColor} flex items-center justify-center mb-6`}>
                  <Icon className={ambiente.iconColor} size={32} />
                </div>
                <h3 className="text-2xl font-bold text-italinea-blue mb-3">
                  {ambiente.nome}
                </h3>
                <p className="text-gray-600 text-lg">
                  {ambiente.descricao}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
