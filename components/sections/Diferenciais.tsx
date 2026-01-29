"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, CreditCard, Award } from "lucide-react";

const diferenciais = [
  {
    icon: Shield,
    title: "5 Anos de Garantia",
    description: "A Italínea fornece 5 anos de garantia completa, garantindo tranquilidade e confiança no seu investimento.",
    bgColor: "bg-italinea-blue/10",
    iconColor: "text-italinea-blue",
  },
  {
    icon: CreditCard,
    title: "Financiamento Próprio",
    description: "Comprando na Italínea, o financiamento é direto com a fábrica. Até 24x e entrada para 90 dias. Condições especiais para você realizar seu sonho.",
    bgColor: "bg-italinea-nude/10",
    iconColor: "text-italinea-nude",
  },
  {
    icon: Award,
    title: "A Maior da América Latina",
    description: "Somos a maior fábrica de móveis planejados da América Latina, com experiência, tecnologia e qualidade incomparáveis.",
    bgColor: "bg-italinea-blue/10",
    iconColor: "text-italinea-blue",
  },
];

export default function Diferenciais() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="diferenciais" ref={ref} className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Círculos decorativos */}
      <div className="absolute top-0 left-1/4 w-56 h-56 border-2 border-italinea-nude-light/30 rounded-full -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 border-2 border-italinea-blue/20 rounded-full translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-italinea-blue mb-4">
            Por que escolher a Domus Italínea?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Diferenciais que fazem toda a diferença no seu projeto
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {diferenciais.map((diferencial, index) => {
            const Icon = diferencial.icon;
            return (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className={`w-20 h-20 rounded-full ${diferencial.bgColor} flex items-center justify-center mx-auto mb-6`}>
                  <Icon className={diferencial.iconColor} size={40} />
                </div>
                <h3 className="text-2xl font-bold text-italinea-blue mb-4">
                  {diferencial.title}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {diferencial.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
