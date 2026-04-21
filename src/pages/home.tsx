import ContactForm from "@/components/ContactForm";
import Diferenciais from "@/components/Diferenciais";
import Footer from "@/components/Footer";
import Hero from "@/components/hero";
import HowItWorks from "@/components/HowItWorks";
import Investimento from "@/components/Investimento";
import Resultados from "@/components/Resultados";
import { CONTACT_WHATSAPP } from "@/constants/urls";
import { useGTM } from "@/hooks/useGTM";
import { usePageTracking } from "@/hooks/usePageTracking";
import { MessageCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";

const HomePage = () => {
  const { trackWhatsAppClick } = useGTM();

  // Hook para tracking geral da página
  usePageTracking();

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Helmet>
        <title>Radial Energia Solar - Reduza sua conta de luz em até 95%</title>
        <meta
          name="description"
          content="Energia solar residencial no Rio de Janeiro. Reduza sua conta de luz em até 95% com projeto personalizado, instalação profissional e garantia estendida. Solicite estudo gratuito."
        />
        <link rel="canonical" href="https://sejaradial.com.br/" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <main className="flex-grow">
        <Hero />
        <Investimento />
        <Resultados />
        <HowItWorks />
        <Diferenciais />
        <ContactForm />
      </main>
      <Footer />

      {/* Botão de WhatsApp flutuante */}
      <a
        href={CONTACT_WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
        aria-label="Fale pelo WhatsApp"
        onClick={() => trackWhatsAppClick("floating_button")}
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </div>
  );
};

export default HomePage;
