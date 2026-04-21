// api/send-email.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  console.log("=== API CHAMADA ===");
  console.log("Método:", req.method);
  console.log("Body:", req.body);
  console.log("RESEND_API_KEY existe:", !!process.env.RESEND_API_KEY);

  // Configurar CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Método não permitido",
    });
  }

  try {
    // Verificar se RESEND_API_KEY existe
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY não configurada");
      return res.status(500).json({
        success: false,
        error: "Configuração do servidor incompleta",
      });
    }

    const { name, phone, city, billValue, propertyType, pitch } = req.body;

    // Validação básica
    if (!name || !phone || !city) {
      return res.status(400).json({
        success: false,
        error: "Nome, telefone e cidade são obrigatórios",
      });
    }

    const pitchLabel =
      pitch === "roi"
        ? "Retorno rápido / ROI"
        : pitch === "financiamento"
        ? "Financiamento com economia"
        : null;

    // Enviar email usando Resend
    const { data, error } = await resend.emails.send({
      from: "contato@sejaradial.com.br",
      to: ["contato@sejaradial.com.br"], // Seus emails
      subject: "Nova solicitação de análise - Site Radial",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ff5d26; margin-bottom: 10px;">🌟 Nova Solicitação de Análise</h1>
            <p style="color: #666; font-size: 16px;">Site da Radial Energia Solar</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #ff5d26 0%, #ff7c40 100%); padding: 20px; border-radius: 12px; margin: 20px 0; color: white;">
            <h2 style="margin: 0 0 15px 0; color: white;">📋 Informações do Cliente</h2>
            
            <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; margin: 10px 0;">
              <p style="margin: 8px 0; font-size: 16px;"><strong>👤 Nome:</strong> ${name}</p>
              <p style="margin: 8px 0; font-size: 16px;"><strong>📱 WhatsApp:</strong> ${phone}</p>
              <p style="margin: 8px 0; font-size: 16px;"><strong>📍 Cidade:</strong> ${city}</p>
              ${
                propertyType
                  ? `<p style="margin: 8px 0; font-size: 16px;"><strong>🏠 Tipo de imóvel:</strong> ${propertyType}</p>`
                  : ''
              }
              ${
                pitchLabel
                  ? `<p style="margin: 8px 0; font-size: 16px;"><strong>🎯 Interesse:</strong> ${pitchLabel}</p>`
                  : ''
              }
              ${
                billValue
                  ? `<p style="margin: 8px 0; font-size: 16px;"><strong>💡 Valor da conta:</strong> ${billValue}</p>`
                  : '<p style="margin: 8px 0; font-size: 14px; opacity: 0.9;"><em>Valor da conta não informado</em></p>'
              }
            </div>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ff5d26;">
            <h3 style="color: #333; margin-top: 0;">🚀 Próximos Passos</h3>
            <ul style="color: #666; line-height: 1.6;">
              <li>Entrar em contato via WhatsApp em até 2 horas</li>
              <li>Fazer análise de viabilidade técnica</li>
              <li>Apresentar proposta personalizada</li>
              <li>Agendar visita técnica se necessário</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://wa.me/55${phone.replace(
              /\D/g,
              ""
            )}?text=Olá%20${encodeURIComponent(
        name
      )}!%20Recebemos%20sua%20solicitação%20de%20análise%20de%20energia%20solar.%20Vamos%20conversar?" 
               style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 10px;">
              📱 Responder via WhatsApp
            </a>
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          
          <div style="color: #999; font-size: 12px; text-align: center;">
            <p><strong>📅 Enviado em:</strong> ${new Date().toLocaleString(
              "pt-BR",
              {
                timeZone: "America/Sao_Paulo",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }
            )}</p>
            <p>Este email foi enviado automaticamente através do site da Radial Energia Solar.</p>
            <p>🌐 <strong>Radial Energia</strong> - Transformando energia solar em economia real!</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Erro do Resend:", error);
      return res.status(500).json({
        success: false,
        error: "Erro ao enviar email: " + JSON.stringify(error),
      });
    }

    console.log("Email enviado com sucesso:", data);

    // Resposta de sucesso
    res.status(200).json({
      success: true,
      message: "Solicitação enviada com sucesso!",
      data: {
        emailId: data.id,
        name,
        phone,
        city,
        propertyType,
        billValue,
        pitch: pitch || null,
        timestamp: new Date().toISOString(),
        recipients: ["contato@sejaradial.com.br"],
      },
    });
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({
      success: false,
      error: "Erro interno: " + error.message,
    });
  }
}
