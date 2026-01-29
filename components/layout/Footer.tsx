import Image from "next/image";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Image
              src="/logo-white.svg"
              alt="Domus Italínea - Seu projeto de felicidade"
              width={180}
              height={38}
              className="mb-4 h-10 w-auto object-contain"
            />
            <p className="text-gray-400 mb-4">
              Seu projeto de felicidade
            </p>
            <p className="text-gray-400 text-sm">
              Mais do que móveis, criamos espaços para viver.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#ambientes" className="hover:text-white transition-colors">
                  Ambientes
                </a>
              </li>
              <li>
                <a href="#showroom" className="hover:text-white transition-colors">
                  Showroom
                </a>
              </li>
              <li>
                <a href="#diferenciais" className="hover:text-white transition-colors">
                  Diferenciais
                </a>
              </li>
              <li>
                <a href="https://wa.me/5511914645322" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <Phone size={18} />
                <span>(11) 5011-1524</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} />
                <a href="https://wa.me/5511914645322" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  (11) 91464-5322
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} />
                <span>contato@domusitalinea.com.br</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-1" />
                <span>Av. Eng. George Corbisier, 802 - Jabaquara - São Paulo</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/domusitalinea/"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Domus Italínea. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
