import { useGTM } from "@/hooks/useGTM";
import { usePageTracking } from "@/hooks/usePageTracking";
import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";

type Pitch = "roi" | "financiamento";

const PITCH_COPY: Record<Pitch, { h1: string; sub: string; cta: string }> = {
  roi: {
    h1: "Calcule seu Retorno: Estudo de ROI e Payback da sua Energia Solar",
    sub: "Ótimo! Para calcularmos o seu retorno exato e o Payback em meses, precisamos dos dados abaixo. Sua economia começa aqui.",
    cta: "Quero Meu Estudo de Retorno Gratuito!",
  },
  financiamento: {
    h1: "Acesso ao Crédito: Simulação de Financiamento Sem Descapitalização",
    sub: "Entendido! Preencha os dados abaixo e vamos buscar as melhores Linhas de Crédito e Financiamento para que seu projeto comece a se pagar com a própria economia.",
    cta: "Quero Simular Meu Financiamento!",
  },
};

const Formulario = () => {
  const [searchParams] = useSearchParams();
  const pitchParam = searchParams.get("pitch");
  const pitch: Pitch = pitchParam === "financiamento" ? "financiamento" : "roi";
  const copy = useMemo(() => PITCH_COPY[pitch], [pitch]);

  const { trackFormSubmission, trackButtonClick } = useGTM();
  usePageTracking();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    billValue: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setIsSuccess(false);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, pitch }),
      });

      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        const textResponse = await response.text();
        throw new Error(
          `Erro do servidor (${response.status}): ${textResponse.substring(0, 100)}...`
        );
      }

      if (!response.ok) throw new Error(data.error || `Erro: ${response.status}`);
      if (!data.success) throw new Error(data.error || "Erro ao enviar formulário");

      trackFormSubmission({
        ...formData,
        form_name: `formulario_${pitch}`,
        pitch,
      });
      trackButtonClick(`formulario_submit_${pitch}`, "formulario_page");
      setIsSuccess(true);
      setFormData({ name: "", phone: "", city: "", billValue: "" });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocorreu um erro ao enviar o formulário. Por favor, tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-radial-dark via-[#1a0f2a] to-[#2a1f3a] py-12 px-4 relative">
      <Helmet>
        <title>{copy.h1} - Radial Energia</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-radial-orange/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-3xl relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {copy.h1}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            {copy.sub}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 lg:p-10 border border-white/20">
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                <svg
                  className="w-10 h-10 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Pronto! Sua solicitação foi enviada
              </h2>
              <p className="text-white/80 mb-6">
                Nossa equipe entrará em contato em breve via WhatsApp.
              </p>
              <Link
                to="/"
                className="inline-block bg-radial-orange hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-all"
              >
                Voltar para a página inicial
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-4 p-4 bg-red-500/20 border border-red-500/40 text-red-100 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-white mb-2"
                  >
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-radial-orange focus:border-radial-orange outline-none transition-all text-white placeholder:text-white/60"
                    placeholder="Digite seu nome completo"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-white mb-2"
                  >
                    WhatsApp/Telefone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-radial-orange focus:border-radial-orange outline-none transition-all text-white placeholder:text-white/60"
                    placeholder="(21) 99999-9999"
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-semibold text-white mb-2"
                  >
                    Cidade *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-radial-orange focus:border-radial-orange outline-none transition-all text-white placeholder:text-white/60"
                    placeholder="Digite sua cidade"
                  />
                </div>

                <div>
                  <label
                    htmlFor="billValue"
                    className="block text-sm font-semibold text-white mb-2"
                  >
                    Valor da sua conta de luz mensal *
                  </label>
                  <input
                    type="text"
                    id="billValue"
                    name="billValue"
                    required
                    value={formData.billValue}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-radial-orange focus:border-radial-orange outline-none transition-all text-white placeholder:text-white/60"
                    placeholder="Ex: R$ 500,00"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-radial-orange hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg text-lg md:text-xl transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-radial-orange/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? "Enviando..." : copy.cta}
                </button>

                <p className="text-xs text-white/60 text-center">
                  🔒 Seus dados estão seguros conosco. Não compartilhamos suas
                  informações.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Formulario;
