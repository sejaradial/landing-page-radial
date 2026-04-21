import { useGTM } from "@/hooks/useGTM";
import { Award, CheckCircle, Home, PiggyBank, Shield, Sun } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Diferenciais = () => {
  const { trackSectionView, trackButtonClick } = useGTM();
  const sectionRef = useRef<HTMLElement>(null);

  // Track quando a seção "Diferenciais" fica visível
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackSectionView("diferenciais");
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [trackSectionView]);

  return (
    <section
      ref={sectionRef}
      id="diferenciais"
      className="bg-gradient-to-br from-radial-dark via-[#2a1f3a] to-[#1a0f2a] py-12 md:py-20"
    >
      <div className="container mx-auto px-4">
        {/* Header da seção */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Por que escolher a <span className="text-radial-orange">Radial</span>?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            <span className="md:hidden">Combinamos experiência comprovada com as melhores possibilidades do mercado solar</span>
            <span className="hidden md:inline">Combinamos experiência comprovada com as<br />melhores possibilidades do mercado solar</span>
          </p>
        </div>

        {/* Grid de diferenciais - 6 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-7xl mb-16">
          
          {/* Credibilidade & Experiência */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-radial-orange to-yellow-400 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform"></div>
            <div className="relative bg-white rounded-2xl p-6 text-center h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-center mb-4">
                  <CheckCircle className="w-12 h-12 text-radial-orange" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-radial-dark">
                  Mais de 300 instalações
                </h3>
                <p className="text-gray-700 text-sm">
                  Experiência comprovada em todo o Rio de Janeiro
                </p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-radial-orange to-yellow-400 rounded-2xl transform -rotate-1 group-hover:-rotate-2 transition-transform"></div>
            <div className="relative bg-white rounded-2xl p-6 text-center h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-center mb-4">
                  <Shield className="w-12 h-12 text-radial-orange" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-radial-dark">
                  Garantia de 30 anos
                </h3>
                <p className="text-gray-700 text-sm">
                  Equipamentos com garantia estendida e suporte contínuo
                </p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-radial-orange to-yellow-400 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform"></div>
            <div className="relative bg-white rounded-2xl p-6 text-center h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-center mb-4">
                  <Award className="w-12 h-12 text-radial-orange" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-radial-dark">
                  100% regularizada
                </h3>
                <p className="text-gray-700 text-sm">
                  Empresa certificada com engenheiros credenciados
                </p>
              </div>
            </div>
          </div>

          {/* Possibilidades & Benefícios */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-radial-orange to-yellow-400 rounded-2xl transform -rotate-1 group-hover:-rotate-2 transition-transform"></div>
            <div className="relative bg-white rounded-2xl p-6 text-center h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-center mb-4">
                  <Home className="w-12 h-12 text-radial-orange" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-radial-dark">
                  Compartilhamento de energia
                </h3>
                <p className="text-gray-700 text-sm">
                  Divida energia com outro endereço sem custo adicional
                </p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-radial-orange to-yellow-400 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform"></div>
            <div className="relative bg-white rounded-2xl p-6 text-center h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-center mb-4">
                  <Sun className="w-12 h-12 text-radial-orange" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-radial-dark">
                  Créditos acumulativos
                </h3>
                <p className="text-gray-700 text-sm">
                  Energia excedente válida por até 5 anos
                </p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-radial-orange to-yellow-400 rounded-2xl transform -rotate-1 group-hover:-rotate-2 transition-transform"></div>
            <div className="relative bg-white rounded-2xl p-6 text-center h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-center mb-4">
                  <PiggyBank className="w-12 h-12 text-radial-orange" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-radial-dark">
                  Sistema a custo zero
                </h3>
                <p className="text-gray-700 text-sm">
                  Troque parcela da conta pela parcela do financiamento
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Citação dos diretores */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <p className="text-white text-xl md:text-2xl font-bold mb-4 leading-relaxed">
              "Todo mês a conta de luz sobe e pesa no bolso. Com energia solar, você reduz esse custo e passa a economizar de verdade, com mais tranquilidade para sua casa."
            </p>
            <p className="text-gray-300 text-lg">
              Pedro Nascimento e Remisson Ventura, diretores da Radial.
            </p>
          </div>
        </div>

        {/* CTA final */}
        <div className="text-center">
          <Link
            to="/inscricao"
            className="inline-block bg-radial-orange text-white py-4 px-8 rounded-full text-lg font-bold hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 relative overflow-hidden"
            onClick={() =>
              trackButtonClick("diferenciais_cta", "diferenciais_section")
            }
          >
            <span className="relative z-10">Simular minha economia agora</span>
            <div
              className="absolute inset-0 opacity-25 animate-shimmer"
              style={{
                background: "linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.6) 50%, transparent 70%)",
                transform: "translateX(-100%)"
              }}
            ></div>
          </Link>
          <p className="text-white mt-4 text-lg">
            ⚡ Empresa certificada • Equipe especializada • Resultados comprovados
          </p>
        </div>
      </div>
    </section>
  );
};

export default Diferenciais;