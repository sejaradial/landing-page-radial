import { useGTM } from "@/hooks/useGTM";
import { usePageTracking } from "@/hooks/usePageTracking";
import { Coins, TrendingUp } from "lucide-react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const Inscricao = () => {
  const navigate = useNavigate();
  const { trackButtonClick, trackFunnelStart, trackPitchSelected } = useGTM();
  usePageTracking();

  useEffect(() => {
    trackFunnelStart("inscricao");
  }, [trackFunnelStart]);

  const handlePick = (pitch: "roi" | "financiamento") => {
    trackButtonClick(`inscricao_${pitch}`, "inscricao_page");
    trackPitchSelected(pitch);
    navigate(`/formulario?pitch=${pitch}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-radial-dark via-[#1a0f2a] to-[#2a1f3a] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <Helmet>
        <title>Estudo de Viabilidade - Radial Energia Solar</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-radial-orange/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-6 leading-tight">
            Último Passo para o Estudo de Viabilidade Gratuito
          </h1>
          <p className="text-white/90 text-lg md:text-xl lg:text-2xl mb-12 max-w-2xl mx-auto">
            Antes de preencher seus dados, nos ajude a direcionar a proposta
            ideal para sua casa.
          </p>

          <div className="mb-12">
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-8">
              Qual a sua prioridade neste investimento?
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8 max-w-3xl mx-auto mb-8">
            <button
              onClick={() => handlePick("roi")}
              className="flex-1 group relative bg-radial-orange hover:bg-orange-600 text-white font-bold py-6 px-8 rounded-2xl text-lg md:text-xl transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-radial-orange/50 overflow-hidden"
            >
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="bg-white/20 rounded-full p-4 group-hover:bg-white/30 transition-colors">
                  <TrendingUp className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <span className="text-center leading-tight">
                  Ter o Dinheiro de Volta Rápido
                  <br />
                  <span className="text-sm md:text-base opacity-90">
                    (Alto Retorno)
                  </span>
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>

            <button
              onClick={() => handlePick("financiamento")}
              className="flex-1 group relative bg-radial-orange hover:bg-orange-600 text-white font-bold py-6 px-8 rounded-2xl text-lg md:text-xl transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-radial-orange/50 overflow-hidden"
            >
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="bg-white/20 rounded-full p-4 group-hover:bg-white/30 transition-colors">
                  <Coins className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <span className="text-center leading-tight">
                  Usar Financiamento para Pagar com a Economia
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </div>

          <p className="text-white/70 text-sm md:text-base">
            Ao clicar em uma das opções, você será direcionado ao formulário
            seguro.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Inscricao;
