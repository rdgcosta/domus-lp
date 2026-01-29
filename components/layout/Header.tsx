"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-visible ${
        isScrolled
          ? "bg-white shadow-md"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
        <div className="flex items-center justify-between min-h-[110px] md:min-h-[120px] py-4 overflow-visible">
          {/* Logo */}
          <div className="flex-shrink-0 overflow-visible" style={{ minHeight: '100px', display: 'flex', alignItems: 'center' }}>
            <a href="/" className="block overflow-visible" style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
              <div style={{ height: '100px', width: '220px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <Image
                  src={isScrolled ? "/logo.svg" : "/logo-white.svg"}
                  alt="Domus Italínea - Seu projeto de felicidade"
                  width={220}
                  height={100}
                  priority
                  unoptimized
                  style={{ 
                    height: 'auto',
                    width: 'auto',
                    maxHeight: '100px',
                    maxWidth: '220px',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                  className="object-contain"
                />
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a
              href="#sobre"
              className={`transition-colors ${
                isScrolled
                  ? "text-gray-700 hover:text-italinea-blue"
                  : "text-white hover:text-italinea-nude-light"
              }`}
            >
              Sobre
            </a>
            <a
              href="#ambientes"
              className={`transition-colors ${
                isScrolled
                  ? "text-gray-700 hover:text-italinea-blue"
                  : "text-white hover:text-italinea-nude-light"
              }`}
            >
              Ambientes
            </a>
            <a
              href="#showroom"
              className={`transition-colors ${
                isScrolled
                  ? "text-gray-700 hover:text-italinea-blue"
                  : "text-white hover:text-italinea-nude-light"
              }`}
            >
              Showroom
            </a>
            <a
              href="#diferenciais"
              className={`transition-colors ${
                isScrolled
                  ? "text-gray-700 hover:text-italinea-blue"
                  : "text-white hover:text-italinea-nude-light"
              }`}
            >
              Diferenciais
            </a>
            <a
              href="https://wa.me/5511914645322"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-6 py-2 rounded-full transition-all ${
                isScrolled
                  ? "bg-[#25D366] text-white hover:bg-[#20BA5A]"
                  : "bg-[#25D366] text-white hover:bg-[#20BA5A]"
              }`}
            >
              WhatsApp
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className={`md:hidden p-2 transition-colors ${
              isScrolled ? "text-gray-700" : "text-white"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className={`md:hidden pb-4 space-y-4 ${
            isScrolled ? "bg-white" : "bg-italinea-blue/95 backdrop-blur-sm"
          }`}>
            <a
              href="#sobre"
              className={`block transition-colors ${
                isScrolled
                  ? "text-gray-700 hover:text-italinea-blue"
                  : "text-white hover:text-italinea-nude-light"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sobre
            </a>
            <a
              href="#ambientes"
              className={`block transition-colors ${
                isScrolled
                  ? "text-gray-700 hover:text-italinea-blue"
                  : "text-white hover:text-italinea-nude-light"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Ambientes
            </a>
            <a
              href="#showroom"
              className={`block transition-colors ${
                isScrolled
                  ? "text-gray-700 hover:text-italinea-blue"
                  : "text-white hover:text-italinea-nude-light"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Showroom
            </a>
            <a
              href="#diferenciais"
              className={`block transition-colors ${
                isScrolled
                  ? "text-gray-700 hover:text-italinea-blue"
                  : "text-white hover:text-italinea-nude-light"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Diferenciais
            </a>
            <a
              href="https://wa.me/5511914645322"
              target="_blank"
              rel="noopener noreferrer"
              className={`block px-6 py-2 rounded-full text-center transition-all bg-[#25D366] text-white hover:bg-[#20BA5A]`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              WhatsApp
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
