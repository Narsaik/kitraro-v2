import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso | Kit Raro",
  description: "Termos e condicoes de uso da loja Kit Raro.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-black text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Termos de Uso</h1>
          <p className="text-gray-400 mt-4">Ultima atualizacao: Dezembro 2024</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <h2>1. Aceitacao dos Termos</h2>
          <p>
            Ao acessar e usar o site kitraro.com, voce concorda em cumprir estes
            Termos de Uso. Se voce nao concordar com algum aspecto destes termos,
            nao utilize nosso site.
          </p>

          <h2>2. Sobre a Kit Raro</h2>
          <p>
            A Kit Raro e uma loja online especializada em streetwear de luxo,
            oferecendo produtos autenticos de marcas renomadas como Nike, BAPE,
            Jordan, New Era e The North Face.
          </p>

          <h2>3. Produtos e Precos</h2>
          <ul>
            <li>Todos os produtos sao 100% autenticos e originais</li>
            <li>Precos sao exibidos em Reais (BRL) e podem ser alterados sem aviso previo</li>
            <li>Disponibilidade esta sujeita ao estoque</li>
            <li>Imagens sao ilustrativas e podem variar ligeiramente do produto real</li>
          </ul>

          <h2>4. Pedidos e Pagamento</h2>
          <h3>4.1 Realizacao do Pedido</h3>
          <p>
            Ao realizar um pedido, voce declara que as informacoes fornecidas sao
            verdadeiras e que esta autorizado a usar o meio de pagamento escolhido.
          </p>

          <h3>4.2 Confirmacao</h3>
          <p>
            O pedido so e confirmado apos a aprovacao do pagamento. Reservamo-nos
            o direito de cancelar pedidos em caso de suspeita de fraude ou erro
            no preco.
          </p>

          <h3>4.3 Formas de Pagamento</h3>
          <ul>
            <li>Cartao de credito (ate 12x)</li>
            <li>Cartao de debito</li>
            <li>PIX (5% de desconto)</li>
            <li>Boleto bancario (5% de desconto)</li>
          </ul>

          <h2>5. Entrega</h2>
          <ul>
            <li>Prazos de entrega sao estimados e podem variar</li>
            <li>Frete gratis para compras acima de R$ 500</li>
            <li>O rastreamento sera enviado por e-mail apos o envio</li>
            <li>O cliente e responsavel por fornecer endereco correto</li>
          </ul>

          <h2>6. Trocas e Devolucoes</h2>
          <h3>6.1 Prazo</h3>
          <p>
            Voce tem ate 30 dias apos o recebimento para solicitar troca ou
            devolucao, conforme o Codigo de Defesa do Consumidor.
          </p>

          <h3>6.2 Condicoes</h3>
          <ul>
            <li>Produto em perfeitas condicoes, sem uso</li>
            <li>Etiquetas e embalagem original intactas</li>
            <li>Nota fiscal do pedido</li>
          </ul>

          <h3>6.3 Reembolso</h3>
          <p>
            O reembolso sera processado na mesma forma de pagamento original
            em ate 10 dias uteis apos o recebimento do produto devolvido.
          </p>

          <h2>7. Propriedade Intelectual</h2>
          <p>
            Todo o conteudo do site (textos, imagens, logos, design) e protegido
            por direitos autorais. E proibida a reproducao sem autorizacao.
          </p>

          <h2>8. Uso do Site</h2>
          <p>E proibido:</p>
          <ul>
            <li>Usar o site para fins ilegais</li>
            <li>Tentar acessar areas restritas</li>
            <li>Interferir no funcionamento do site</li>
            <li>Coletar dados de outros usuarios</li>
          </ul>

          <h2>9. Limitacao de Responsabilidade</h2>
          <p>
            A Kit Raro nao se responsabiliza por danos indiretos, incidentais ou
            consequenciais decorrentes do uso do site ou produtos, exceto quando
            exigido por lei.
          </p>

          <h2>10. Lei Aplicavel</h2>
          <p>
            Estes termos sao regidos pelas leis brasileiras. Qualquer disputa sera
            resolvida no foro da comarca de Sao Paulo, SP.
          </p>

          <h2>11. Alteracoes</h2>
          <p>
            Podemos alterar estes termos a qualquer momento. Alteracoes entram em
            vigor imediatamente apos a publicacao no site.
          </p>

          <h2>12. Contato</h2>
          <p>
            Para duvidas sobre estes termos:
          </p>
          <ul>
            <li>E-mail: contato@kitraro.com</li>
            <li>WhatsApp: +55 (17) 98111-4221</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
