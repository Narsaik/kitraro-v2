"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, HelpCircle, Package, Shield, RefreshCw, User } from "lucide-react";

const faqCategories = [
  {
    title: "Pedidos e Entregas",
    icon: Package,
    questions: [
      {
        q: "Qual o prazo de entrega?",
        a: "O prazo de entrega varia de acordo com sua regiao. Em geral, entregas para capitais levam de 3 a 7 dias uteis. Para outras regioes, o prazo pode ser de 7 a 15 dias uteis.",
      },
      {
        q: "Como rastrear meu pedido?",
        a: "Apos o envio, voce recebera um e-mail com o codigo de rastreamento. Voce pode acompanhar seu pedido diretamente na nossa pagina de rastreamento ou no site dos Correios.",
      },
      {
        q: "Quais formas de pagamento sao aceitas?",
        a: "Aceitamos cartao de credito (ate 12x sem juros), cartao de debito, PIX e boleto bancario. Para PIX e boleto, oferecemos 5% de desconto.",
      },
      {
        q: "O frete e gratis?",
        a: "Sim! Oferecemos frete gratis para compras acima de R$ 500. Para valores menores, o frete e calculado automaticamente no checkout de acordo com seu CEP.",
      },
    ],
  },
  {
    title: "Produtos e Autenticidade",
    icon: Shield,
    questions: [
      {
        q: "Os produtos sao originais?",
        a: "Sim, todos os nossos produtos sao 100% originais e autenticos. Trabalhamos diretamente com fornecedores certificados e cada peca passa por verificacao rigorosa de nossa equipe especializada.",
      },
      {
        q: "Como garantem a autenticidade?",
        a: "Nossa equipe e treinada para identificar produtos autenticos. Trabalhamos apenas com fornecedores certificados nos EUA, Japao e Europa. Cada produto vem com certificado de autenticidade.",
      },
      {
        q: "Os produtos sao novos ou usados?",
        a: "Trabalhamos principalmente com produtos novos (dead stock). Quando houver pecas vintage ou pre-owned, isso sera claramente indicado na descricao do produto.",
      },
      {
        q: "Como escolher o tamanho certo?",
        a: "Consulte nosso Guia de Tamanhos para encontrar a medida ideal. Se ainda tiver duvidas, entre em contato pelo WhatsApp que nossa equipe ira ajudar.",
      },
    ],
  },
  {
    title: "Trocas e Devolucoes",
    icon: RefreshCw,
    questions: [
      {
        q: "Posso trocar um produto?",
        a: "Sim! Voce tem ate 30 dias apos o recebimento para solicitar a troca. O produto deve estar em perfeitas condicoes, com etiquetas e embalagem original.",
      },
      {
        q: "Como solicitar uma troca?",
        a: "Entre em contato pelo WhatsApp ou e-mail informando o numero do pedido e o motivo da troca. Nossa equipe ira orientar sobre os proximos passos e fornecer as instrucoes de envio.",
      },
      {
        q: "Quem paga o frete da troca?",
        a: "Em caso de defeito ou erro no envio, o frete de troca e por nossa conta. Para trocas por outros motivos (tamanho, cor, preferencia), o cliente arca com o frete de envio.",
      },
      {
        q: "Quanto tempo demora o reembolso?",
        a: "Apos recebermos e analisarmos o produto, o reembolso e processado em ate 7 dias uteis. O prazo para aparecer na fatura depende da operadora do cartao.",
      },
    ],
  },
  {
    title: "Minha Conta",
    icon: User,
    questions: [
      {
        q: "Como criar uma conta?",
        a: "Clique em 'Entrar' no topo da pagina e depois em 'Criar conta'. Preencha seus dados e pronto! Voce tambem pode criar uma conta durante o processo de checkout.",
      },
      {
        q: "Esqueci minha senha, o que fazer?",
        a: "Na pagina de login, clique em 'Esqueceu a senha?'. Digite seu e-mail cadastrado e enviaremos um link para redefinir sua senha. O link e valido por 24 horas.",
      },
      {
        q: "Como alterar meus dados?",
        a: "Acesse sua conta, clique em 'Meus Dados' e faca as alteracoes necessarias. Lembre-se de salvar as mudancas antes de sair.",
      },
    ],
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.a.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0)
    .filter((category) => !activeCategory || category.title === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <HelpCircle size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Perguntas Frequentes</h1>
            <p className="text-gray-400 mb-8">
              Encontre respostas para as duvidas mais comuns
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar pergunta..."
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                !activeCategory
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Todas
            </button>
            {faqCategories.map((category) => (
              <button
                key={category.title}
                onClick={() => setActiveCategory(category.title)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
                  activeCategory === category.title
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <category.icon size={16} />
                {category.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredCategories.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-600 mb-4">
              Nenhuma pergunta encontrada para "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory(null);
              }}
              className="text-black font-medium hover:underline"
            >
              Limpar busca
            </button>
          </motion.div>
        ) : (
          <div className="space-y-12">
            {filteredCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                    <category.icon size={20} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-black">{category.title}</h2>
                </div>
                <div className="space-y-3">
                  {category.questions.map((item, index) => {
                    const id = `${category.title}-${index}`;
                    const isOpen = openItems.includes(id);

                    return (
                      <div
                        key={id}
                        className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors"
                      >
                        <button
                          onClick={() => toggleItem(id)}
                          className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium text-black pr-4">{item.q}</span>
                          <ChevronDown
                            size={20}
                            className={`flex-shrink-0 text-gray-500 transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                                {item.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Link
            href="/size-guide"
            className="p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group"
          >
            <h3 className="font-bold mb-2 group-hover:text-[#d4af37] transition-colors">Guia de Tamanhos</h3>
            <p className="text-gray-600 text-sm">Encontre o tamanho ideal para voce</p>
          </Link>
          <Link
            href="/returns"
            className="p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group"
          >
            <h3 className="font-bold mb-2 group-hover:text-[#d4af37] transition-colors">Trocas e Devolucoes</h3>
            <p className="text-gray-600 text-sm">Saiba como trocar ou devolver</p>
          </Link>
          <Link
            href="/track"
            className="p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group"
          >
            <h3 className="font-bold mb-2 group-hover:text-[#d4af37] transition-colors">Rastrear Pedido</h3>
            <p className="text-gray-600 text-sm">Acompanhe sua encomenda</p>
          </Link>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-black text-white rounded-2xl p-8 text-center"
        >
          <h3 className="text-xl font-bold mb-2">Nao encontrou sua resposta?</h3>
          <p className="text-gray-400 mb-6">
            Nossa equipe esta pronta para ajudar voce.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-colors"
          >
            Fale Conosco
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
