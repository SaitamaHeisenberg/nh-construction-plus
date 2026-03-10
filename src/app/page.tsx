import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Apropos from "@/components/sections/Apropos";
import Portfolio from "@/components/sections/Portfolio";
import TrustBanner from "@/components/sections/TrustBanner";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <TrustBanner />
        <Apropos />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
