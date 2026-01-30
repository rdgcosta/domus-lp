import type { Metadata } from "next";
import "./globals.css";
import StructuredData from "@/components/SEO/StructuredData";
import GoogleTagManager from "@/components/analytics/GoogleTagManager";

// Usando fonte do sistema como fallback
// A fonte Poppins será carregada via CSS quando houver conexão
const fontVariable = "--font-filson";

export const metadata: Metadata = {
  title: "Domus Italínea - Seu projeto de felicidade | Móveis Planejados",
  description: "Mais do que móveis, criamos espaços para viver. Móveis planejados que fazem parte dos grandes e pequenos momentos da sua vida.",
  keywords: "móveis planejados, cozinha planejada, quarto planejado, living planejado, home office, Domus Italínea",
  authors: [{ name: "Domus Italínea" }],
  openGraph: {
    title: "Domus Italínea - Seu projeto de felicidade",
    description: "Mais do que móveis, criamos espaços para viver.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Domus Italínea - Seu projeto de felicidade",
    description: "Mais do que móveis, criamos espaços para viver.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-filson antialiased">
        <GoogleTagManager />
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
