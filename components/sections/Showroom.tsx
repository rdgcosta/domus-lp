"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";

const showroomImages = [
  {
    src: "/images/showroom-1.png",
    alt: "Showroom Domus Italínea - Espaço integrado com sala, quarto e cozinha",
    title: "Espaços Integrados",
    description: "Veja como criamos ambientes harmoniosos que se conectam perfeitamente",
  },
  {
    src: "/images/showroom-2.png",
    alt: "Showroom Domus Italínea - Cozinha moderna com área de escritório",
    title: "Cozinha e Home Office",
    description: "Soluções completas para seu dia a dia",
  },
];

export default function Showroom() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="showroom" ref={ref} className="py-20 md:py-32 bg-gray-50 relative overflow-hidden">
      {/* Círculos decorativos */}
      <div className="absolute top-20 right-10 w-40 h-40 border-2 border-italinea-blue/20 rounded-full" />
      <div className="absolute bottom-20 left-10 w-32 h-32 border-2 border-italinea-nude/20 rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-italinea-blue mb-4">
            Conheça Nosso Showroom
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Visite nosso espaço e veja de perto a qualidade e o cuidado em cada detalhe
          </p>
          <div className="inline-flex items-center gap-2 text-italinea-blue">
            <MapPin size={20} />
            <span className="font-medium">Venha nos visitar e inspire-se</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {showroomImages.map((image, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-2">{image.title}</h3>
                <p className="text-white/90">{image.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href="https://wa.me/5511914645322"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#25D366] text-white px-8 py-3 rounded-full font-medium hover:bg-[#20BA5A] transition-all"
          >
            Agendar visita ao showroom
          </a>
        </motion.div>
      </div>
    </section>
  );
}
