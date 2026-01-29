"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle } from "lucide-react";

const whatsappLink = "https://wa.me/5511914645322";

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contato" ref={ref} className="py-20 md:py-32 bg-gradient-to-br from-italinea-blue to-blue-900 relative overflow-hidden">
      {/* Círculos decorativos */}
      <div className="absolute top-0 right-0 w-96 h-96 border-2 border-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 border-2 border-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Vamos criar seu projeto juntos
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12">
              Entre em contato pelo WhatsApp e descubra como podemos transformar seus sonhos em realidade
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white px-10 py-5 rounded-full text-xl font-medium hover:bg-[#20BA5A] transition-all shadow-2xl hover:shadow-3xl hover:scale-105"
            >
              <MessageCircle size={28} />
              <span>Fale conosco no WhatsApp</span>
            </a>
            <p className="text-white/80 mt-6 text-sm">
              Atendimento rápido e personalizado
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
