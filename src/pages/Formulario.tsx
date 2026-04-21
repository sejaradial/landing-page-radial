import { useGTM } from "@/hooks/useGTM";
import { usePageTracking } from "@/hooks/usePageTracking";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";

type Pitch = "roi" | "financiamento";

type PropertyType = "casa" | "apartamento" | "empresa";
type PriorKnowledge = "sim" | "nao";
type BillRange =
  | "100-299"
  | "300-499"
  | "500-799"
  | "800-1499"
  | "1500-3000"
  | "acima-3000";

const PROPERTY_OPTIONS: { value: PropertyType; label: string }[] = [
  { value: "casa", label: "Casa" },
  { value: "apartamento", label: "Apartamento" },
  { value: "empresa", label: "Empresa" },
];

const KNOWLEDGE_OPTIONS: { value: PriorKnowledge; label: string }[] = [
  { value: "sim", label: "Sim" },
  { value: "nao", label: "Não" },
];

const BILL_RANGES: { value: BillRange; label: string }[] = [
  { value: "100-299", label: "R$100 – R$299" },
  { value: "300-499", label: "R$300 – R$499" },
  { value: "500-799", label: "R$500 – R$799" },
  { value: "800-1499", label: "R$800 – R$1.499" },
  { value: "1500-3000", label: "R$1.500 – R$3.000" },
  { value: "acima-3000", label: "Acima de R$3.000" },
];

const BILL_RANGE_ESTIMATE: Record<BillRange, number> = {
  "100-299": 200,
  "300-499": 400,
  "500-799": 650,
  "800-1499": 1150,
  "1500-3000": 2250,
  "acima-3000": 3500,
};

const Formulario = () => {
  const [searchParams] = useSearchParams();
  const pitchParam = searchParams.get("pitch");
  const pitch: Pitch = pitchParam === "financiamento" ? "financiamento" : "roi";

  const { trackFormSubmission, trackButtonClick } = useGTM();
  usePageTracking();

  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    city: string;
    propertyType: PropertyType | "";
    priorKnowledge: PriorKnowledge | "";
    billRange: BillRange | "";
  }>({
    name: "",
    phone: "",
    city: "",
    propertyType: "",
    priorKnowledge: "",
    billRange: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValid =
    formData.name &&
    formData.phone &&
    formData.city &&
    formData.propertyType &&
    formData.priorKnowledge &&
    formData.billRange;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setIsLoading(true);
    setError("");
    setIsSuccess(false);

    const estimate = formData.billRange
      ? BILL_RANGE_ESTIMATE[formData.billRange]
      : 0;

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          billValue: `R$ ${estimate.toLocaleString("pt-BR")} (faixa: ${formData.billRange})`,
          pitch,
        }),
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

      if (!response.ok)
        throw new Error(data.error || `Erro: ${response.status}`);
      if (!data.success)
        throw new Error(data.error || "Erro ao enviar formulário");

      trackFormSubmission({
        ...formData,
        billValue: `${estimate}`,
        form_name: `formulario_${pitch}`,
        pitch,
      });
      trackButtonClick(`formulario_submit_${pitch}`, "formulario_page");
      setIsSuccess(true);
      setFormData({
        name: "",
        phone: "",
        city: "",
        propertyType: "",
        priorKnowledge: "",
        billRange: "",
      });
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
        <title>
          Simule quanto você pode economizar na sua conta de luz - Radial
          Energia
        </title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-radial-orange/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-3xl relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Simule quanto você pode economizar na sua conta de luz
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Responda algumas perguntas rápidas e veja quanto você pode
            economizar com energia solar
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
                Pronto! Sua simulação foi enviada
              </h2>
              <p className="text-white/80 mb-6">
                Agora vamos calcular sua economia e em breve entraremos em
                contato com você
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
                    placeholder="(DDD) 9 9999-9999"
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

                <fieldset>
                  <legend className="block text-sm font-semibold text-white mb-3">
                    Para onde é o projeto? *
                  </legend>
                  <div className="grid grid-cols-3 gap-2 md:gap-3">
                    {PROPERTY_OPTIONS.map((opt) => {
                      const active = formData.propertyType === opt.value;
                      return (
                        <button
                          type="button"
                          key={opt.value}
                          onClick={() =>
                            setFormData((p) => ({
                              ...p,
                              propertyType: opt.value,
                            }))
                          }
                          disabled={isLoading}
                          className={`px-3 py-3 rounded-lg border text-sm md:text-base font-semibold transition-all ${
                            active
                              ? "bg-radial-orange border-radial-orange text-white shadow-lg shadow-radial-orange/30"
                              : "bg-white/20 border-white/30 text-white/90 hover:bg-white/30"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="block text-sm font-semibold text-white mb-3">
                    Você já conhece energia solar? *
                  </legend>
                  <div className="grid grid-cols-2 gap-3">
                    {KNOWLEDGE_OPTIONS.map((opt) => {
                      const active = formData.priorKnowledge === opt.value;
                      return (
                        <button
                          type="button"
                          key={opt.value}
                          onClick={() =>
                            setFormData((p) => ({
                              ...p,
                              priorKnowledge: opt.value,
                            }))
                          }
                          disabled={isLoading}
                          className={`px-4 py-3 rounded-lg border text-sm md:text-base font-semibold transition-all ${
                            active
                              ? "bg-radial-orange border-radial-orange text-white shadow-lg shadow-radial-orange/30"
                              : "bg-white/20 border-white/30 text-white/90 hover:bg-white/30"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="block text-sm font-semibold text-white mb-3">
                    Quanto você paga na conta de luz por mês? *
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                    {BILL_RANGES.map((opt) => {
                      const active = formData.billRange === opt.value;
                      return (
                        <button
                          type="button"
                          key={opt.value}
                          onClick={() =>
                            setFormData((p) => ({
                              ...p,
                              billRange: opt.value,
                            }))
                          }
                          disabled={isLoading}
                          className={`px-4 py-3 rounded-lg border text-sm md:text-base font-semibold transition-all ${
                            active
                              ? "bg-radial-orange border-radial-orange text-white shadow-lg shadow-radial-orange/30"
                              : "bg-white/20 border-white/30 text-white/90 hover:bg-white/30"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <button
                  type="submit"
                  disabled={isLoading || !isValid}
                  className="w-full bg-radial-orange hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg text-lg md:text-xl transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-radial-orange/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? "Enviando..." : "Simular minha economia"}
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
