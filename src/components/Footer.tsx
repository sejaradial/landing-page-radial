import {
  COMPANY_NAME,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_WHATSAPP,
} from "@/constants/urls";
import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* Coluna 1: Logo e Descrição */}
          <div className="space-y-4 text-center lg:text-left">
            <img
              src="/logo-fundo-escuro.png"
              alt="Radial Energia Solar - Logo"
              className="w-24 h-auto mx-auto lg:mx-0 mb-4"
              loading="lazy"
              decoding="async"
              width={200}
              height={60}
            />

            <p className="text-gray-300 text-sm leading-relaxed max-w-xs mx-auto lg:mx-0 text-center lg:text-left">
              Transformando a energia do sol em economia para os lares e
              empresas do Rio de Janeiro.
            </p>

            <div className="text-xs text-gray-400 space-y-1">
              <p>CNPJ: 43.920.527/0001-47</p>
              <p>Empresa 100% Brasileira</p>
            </div>
          </div>

          {/* Coluna 2: Contato */}
          <div className="text-center lg:text-left">
            <h3 className="text-lg font-semibold mb-4 text-white">Contato</h3>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-400 mb-1">Endereço:</p>
                <p className="text-white">
                  Av. João Cabral de Mello Neto, 850. Bloco 3 | Sala 1009
                  <br />
                  Barra da Tijuca, Rio de Janeiro - RJ, 22775-057
                </p>
              </div>

              <div>
                <p className="text-gray-400 mb-1">Telefone:</p>
                <p className="text-white">{CONTACT_PHONE}</p>
              </div>

              <div>
                <p className="text-gray-400 mb-1">Email:</p>
                <p className="text-white">{CONTACT_EMAIL}</p>
              </div>
            </div>
          </div>

          {/* Coluna 3: Redes Sociais e Certificações */}
          <div className="text-center lg:text-left">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Redes Sociais
            </h3>

            <div className="flex space-x-4 mb-6 justify-center lg:justify-start">
              <a
                href="https://instagram.com/sejaradial"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-white hover:text-radial-orange transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://facebook.com/sejaradial"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-white hover:text-radial-orange transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={CONTACT_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-white hover:text-radial-orange transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>

            {/* Certificações/Selos */}
            <div className="space-y-3 max-w-xs mx-auto lg:mx-0">
              <div className="bg-white text-gray-900 px-3 py-2 rounded text-xs font-semibold text-center">
                🔒 SITE 100% SEGURO
              </div>
              <div className="bg-green-600 text-white px-3 py-2 rounded text-xs font-semibold text-center">
                ✓ EMPRESA 100% BRASILEIRA
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} {COMPANY_NAME}. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
