import { useGTM } from "@/hooks/useGTM";
import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    billValue: "",
    propertyType: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  
  const { trackFormSubmission, trackButtonClick } = useGTM();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setIsSuccess(false);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Verificar se a resposta é JSON válido
      const contentType = response.headers.get("content-type");
      let data;
      
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        // Se não for JSON, pegar o texto da resposta para debug
        const textResponse = await response.text();
        console.error("Resposta não-JSON da API:", textResponse);
        throw new Error(`Erro do servidor (${response.status}): ${textResponse.substring(0, 100)}...`);
      }

      if (!response.ok) {
        throw new Error(data.error || `Erro na requisição: ${response.status}`);
      }

      if (!data.success) {
        throw new Error(data.error || "Erro ao enviar formulário");
      }

      // Reset do formulário após envio
      setFormData({
        name: "",
        phone: "",
        city: "",
        billValue: "",
        propertyType: "",
      });

      // Trackear envio do formulário no GTM
      trackFormSubmission(formData);

      setIsSuccess(true);

      // Opcional: Scroll para o topo da seção
      document.getElementById('contato')?.scrollIntoView({ 
        behavior: 'smooth' 
      });

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocorreu um erro ao enviar o formulário. Por favor, tente novamente."
      );
      console.error("Erro ao enviar formulário:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Mensagem de sucesso
  if (isSuccess) {
    return (
      <section id="contato" className="bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="relative p-0.5">
            <div className="absolute top-0.5 left-0.5 w-full h-full bg-radial-dark rounded-2xl"></div>
            <div className="relative bg-white rounded-2xl border-t-4 border-green-500 px-5 py-8 md:px-7 md:py-10 z-10 text-center">
              {/* Ícone de sucesso */}
              <div className="text-green-600 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Pronto! Sua simulação foi enviada
              </h2>

              <p className="text-gray-600 mb-6 text-lg">
                Agora vamos calcular sua economia e em breve entraremos em contato com você
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-700 text-sm">
                  <strong>Próximos passos:</strong><br/>
                  • Nossa equipe analisará suas informações<br/>
                  • Você receberá um contato via WhatsApp em breve<br/>
                  • Faremos uma simulação personalizada gratuita
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setIsSuccess(false)}
                  className="bg-radial-orange text-white px-6 py-2 rounded-md hover:brightness-110 transition-all"
                >
                  Refazer simulação
                </button>

                <a
                  href="https://wa.me/5521968940005?text=Olá!%20Acabei%20de%20enviar%20uma%20solicitação%20pelo%20site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-all text-center"
                  onClick={() => trackButtonClick('whatsapp_direct', 'success_page')}
                >
                  Falar com especialista agora
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contato" className="bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="relative p-0.5">
          {/* Sombra/borda inferior e direita */}
          <div className="absolute top-0.5 left-0.5 w-full h-full bg-radial-dark rounded-2xl"></div>
          {/* Fundo branco com borda laranja no topo */}
          <div className="relative bg-white rounded-2xl border-t-4 border-radial-orange px-5 py-8 md:px-7 md:py-10 z-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-radial-dark">
                <span className="text-radial-orange">Solicite</span> sua simulação
                gratuita e veja quanto pode economizar
              </h2>
              <p className="text-gray-700 mt-2">
                Preencha os dados abaixo e descubra quanto você pode
                economizar na sua conta de luz
              </p>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nome completo*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-radial-orange focus:border-transparent transition-colors"
                  placeholder="Digite seu nome completo"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  WhatsApp*
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-radial-orange focus:border-transparent transition-colors"
                  placeholder="(DDD) 9 9999-9999"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Cidade*
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-radial-orange focus:border-transparent transition-colors"
                  placeholder="Digite sua cidade"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label
                  htmlFor="propertyType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tipo de imóvel*
                </label>
                <select
                  id="propertyType"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-radial-orange focus:border-transparent transition-colors"
                  required
                  disabled={isLoading}
                >
                  <option value="">Selecione o tipo de imóvel</option>
                  <option value="casa">Casa</option>
                  <option value="apartamento">Apartamento</option>
                  <option value="empresa">Empresa</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="billValue"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Quanto você paga na conta de luz por mês? (opcional)
                </label>
                <input
                  type="text"
                  id="billValue"
                  name="billValue"
                  value={formData.billValue}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-radial-orange focus:border-transparent transition-colors"
                  placeholder="Ex: R$ 300,00"
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-radial-orange text-white py-3 rounded-md font-medium hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  "Quero simular minha economia"
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-2">
                🔒 Seus dados estão seguros conosco. Não compartilhamos suas
                informações.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;