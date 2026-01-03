import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politica de Privacidade | Kit Raro",
  description: "Politica de privacidade da Kit Raro - Como coletamos e usamos seus dados.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-black text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Politica de Privacidade</h1>
          <p className="text-gray-400 mt-4">Ultima atualizacao: Dezembro 2024</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <h2>1. Introducao</h2>
          <p>
            A Kit Raro ("nos", "nosso" ou "empresa") esta comprometida em proteger
            sua privacidade. Esta Politica de Privacidade explica como coletamos,
            usamos, divulgamos e protegemos suas informacoes quando voce visita
            nosso site kitraro.com.
          </p>

          <h2>2. Informacoes que Coletamos</h2>
          <h3>2.1 Informacoes fornecidas por voce</h3>
          <ul>
            <li>Nome e informacoes de contato (e-mail, telefone)</li>
            <li>Endereco de entrega e cobranca</li>
            <li>Informacoes de pagamento (processadas de forma segura)</li>
            <li>Historico de pedidos</li>
            <li>Comunicacoes conosco</li>
          </ul>

          <h3>2.2 Informacoes coletadas automaticamente</h3>
          <ul>
            <li>Endereco IP e localizacao aproximada</li>
            <li>Tipo de navegador e dispositivo</li>
            <li>Paginas visitadas e tempo de permanencia</li>
            <li>Cookies e tecnologias similares</li>
          </ul>

          <h2>3. Como Usamos Suas Informacoes</h2>
          <p>Utilizamos suas informacoes para:</p>
          <ul>
            <li>Processar e entregar seus pedidos</li>
            <li>Enviar atualizacoes sobre seu pedido</li>
            <li>Responder suas duvidas e solicitacoes</li>
            <li>Melhorar nosso site e servicos</li>
            <li>Enviar ofertas e novidades (com seu consentimento)</li>
            <li>Prevenir fraudes e garantir seguranca</li>
          </ul>

          <h2>4. Compartilhamento de Informacoes</h2>
          <p>
            Nao vendemos suas informacoes pessoais. Podemos compartilhar dados com:
          </p>
          <ul>
            <li>Processadores de pagamento (para concluir transacoes)</li>
            <li>Empresas de entrega (para enviar seus pedidos)</li>
            <li>Prestadores de servicos (que nos auxiliam nas operacoes)</li>
            <li>Autoridades legais (quando exigido por lei)</li>
          </ul>

          <h2>5. Seguranca dos Dados</h2>
          <p>
            Implementamos medidas de seguranca tecnicas e organizacionais para
            proteger suas informacoes, incluindo criptografia SSL, armazenamento
            seguro e acesso restrito aos dados.
          </p>

          <h2>6. Seus Direitos (LGPD)</h2>
          <p>De acordo com a Lei Geral de Protecao de Dados (LGPD), voce tem direito a:</p>
          <ul>
            <li>Confirmar a existencia de tratamento de dados</li>
            <li>Acessar seus dados</li>
            <li>Corrigir dados incompletos ou desatualizados</li>
            <li>Solicitar a exclusao de dados</li>
            <li>Revogar consentimento</li>
            <li>Solicitar portabilidade dos dados</li>
          </ul>

          <h2>7. Cookies</h2>
          <p>
            Utilizamos cookies para melhorar sua experiencia, lembrar preferencias
            e analisar o trafego do site. Voce pode gerenciar cookies nas
            configuracoes do seu navegador.
          </p>

          <h2>8. Retencao de Dados</h2>
          <p>
            Mantemos seus dados pelo tempo necessario para cumprir as finalidades
            descritas nesta politica, ou conforme exigido por lei (por exemplo,
            registros fiscais por 5 anos).
          </p>

          <h2>9. Alteracoes nesta Politica</h2>
          <p>
            Podemos atualizar esta politica periodicamente. Alteracoes significativas
            serao comunicadas por e-mail ou aviso no site.
          </p>

          <h2>10. Contato</h2>
          <p>
            Para duvidas sobre privacidade ou exercer seus direitos, entre em contato:
          </p>
          <ul>
            <li>E-mail: privacidade@kitraro.com</li>
            <li>WhatsApp: +55 (17) 98111-4221</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
