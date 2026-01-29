"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Manifesto() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" ref={ref} className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Círculos decorativos */}
      <div className="absolute top-0 right-0 w-64 h-64 border-2 border-italinea-nude-light/30 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 border-2 border-italinea-blue/20 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-italinea-blue mb-8">
            Nossa Filosofia
          </h2>

          <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed">
            <p>
              A <strong className="text-italinea-blue">Italínea</strong> não vende apenas móveis planejados. 
              Criamos <strong className="text-italinea-nude">projetos de felicidade</strong>.
            </p>

            <p>
              Entendemos o lar como extensão da vida e das relações. Os ambientes que planejamos fazem parte 
              dos grandes e pequenos momentos: a casa nova, o jantar em família, a rotina diária que se torna especial.
            </p>

            <p className="text-2xl md:text-3xl font-medium text-italinea-blue mt-12">
              Cada projeto nasce para fazer parte da sua história.
            </p>
          </div>

          <motion.div
            className="mt-12 flex flex-wrap justify-center gap-8 md:gap-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-italinea-blue mb-2">#1</div>
              <div className="text-gray-600 font-medium">Maior da América Latina</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-italinea-blue mb-2">+800</div>
              <div className="text-gray-600 font-medium">Lojas em todo o Brasil</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-italinea-blue mb-2">+125 mil m²</div>
              <div className="text-gray-600 font-medium">Parque fabril</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
