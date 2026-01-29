import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Ambientes from "@/components/sections/Ambientes";
import Showroom from "@/components/sections/Showroom";
import Diferenciais from "@/components/sections/Diferenciais";
import CTA from "@/components/sections/CTA";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Manifesto />
      <Ambientes />
      <Showroom />
      <Diferenciais />
      <CTA />
      <Footer />
    </main>
  );
}
