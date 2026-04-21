import { Coins, Shield, TrendingUp } from "lucide-react";

const cards = [
  {
    icon: Shield,
    title: "Proteção contra aumento na conta de luz",
    text: "Você deixa de sofrer com aumentos constantes na energia e passa a ter mais controle sobre seus gastos mensais.",
  },
  {
    icon: TrendingUp,
    title: "Economia real todos os meses",
    text: "Com energia solar, sua conta pode cair até 90%, gerando economia já nos primeiros meses. Você pode consumir muito mais energia sem se preocupar com a fatura no final do mês.",
  },
  {
    icon: Coins,
    title: "Facilidade de pagamento",
    text: "Você pode financiar seu sistema e pagar com a economia gerada na conta de luz.",
  },
];

const Investimento = () => {
  return (
    <section
      id="investimento-inteligente"
      className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-12 md:py-16 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 max-w-7xl relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Invista uma vez e{" "}
            <span className="text-radial-orange">economize</span> na conta de
            luz por anos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="relative group bg-white rounded-2xl p-6 md:p-8 border border-gray-200 hover:border-radial-orange/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-radial-orange/10"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-radial-orange/20 rounded-full p-4 group-hover:bg-radial-orange/30 transition-colors">
                  <Icon className="w-10 h-10 md:w-12 md:h-12 text-radial-orange" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center">
                {title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed text-center">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Investimento;
