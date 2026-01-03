"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RefreshCw, Package, CheckCircle, Clock, AlertCircle, ArrowRight, ChevronDown } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Solicite a Troca",
    description: "Entre em contato pelo WhatsApp ou e-mail informando o numero do pedido e o motivo da troca.",
  },
  {
    number: "2",
    title: "Aguarde Aprovacao",
    description: "Nossa equipe ira analisar sua solicitacao e responder em ate 24 horas uteis.",
  },
  {
    number: "3",
    title: "Envie o Produto",
    description: "Apos aprovacao, envie o produto para nosso endereco. Voce recebera as instrucoes por e-mail.",
  },
  {
    number: "4",
    title: "Receba o Novo",
    description: "Apos recebermos e analisarmos o produto, enviaremos o novo ou processaremos o reembolso.",
  },
];

const policies = [
  {
    icon: Clock,
    title: "30 Dias para Trocar",
    description: "Voce tem ate 30 dias apos o recebimento para solicitar a troca ou devolucao.",
  },
  {
    icon: Package,
    title: "Produto Sem Uso",
    description: "O produto deve estar em perfeitas condicoes, com etiquetas e embalagem original.",
  },
  {
    icon: CheckCircle,
    title: "Frete Gratis em Defeitos",
    description: "Em caso de defeito ou erro no envio, o frete de troca e por nossa conta.",
  },
];

const faqItems = [
  {
    question: "Posso trocar por outro tamanho?",
    answer: "Sim! Voce pode trocar por outro tamanho, cor ou ate mesmo por outro produto de igual ou maior valor (pagando a diferenca).",
  },
  {
    question: "Quanto tempo demora o reembolso?",
    answer: "Apos recebermos e analisarmos o produto, o reembolso e processado em ate 7 dias uteis. O prazo para aparecer na fatura depende da operadora do cartao.",
  },
  {
    question: "Posso devolver um produto em promocao?",
    answer: "Sim, produtos em promocao podem ser devolvidos normalmente dentro do prazo de 30 dias.",
  },
  {
    question: "Quem paga o frete de devolucao?",
    answer: "Em caso de defeito ou erro no envio, pagamos o frete. Para trocas por preferencia (tamanho, cor), o frete de envio e por conta do cliente.",
  },
  {
    question: "Posso trocar um produto usado?",
    answer: "Infelizmente nao. O produto deve estar sem uso, com todas as etiquetas e na embalagem original para ser aceito para troca ou devolucao.",
  },
];

export default function ReturnsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
              <RefreshCw size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Trocas e Devolucoes</h1>
            <p className="text-gray-400">
              Sua satisfacao e nossa prioridade
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Policy Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {policies.map((policy, index) => (
            <div
              key={policy.title}
              className="bg-gray-50 p-6 rounded-2xl text-center"
            >
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <policy.icon size={24} className="text-white" />
              </div>
              <h3 className="font-bold mb-2">{policy.title}</h3>
              <p className="text-gray-600 text-sm">{policy.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8 text-center">Como Funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight size={20} className="text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Important Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-16"
        >
          <div className="flex items-start gap-4">
            <AlertCircle className="text-red-500 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-red-900 mb-2">Importante</h3>
              <ul className="text-red-800 text-sm space-y-2">
                <li>Produtos com sinais de uso, lavagem ou sem etiquetas nao serao aceitos.</li>
                <li>Bones e acessorios devem estar na embalagem original.</li>
                <li>Tenis devem estar limpos, sem marcas de uso e com todos os acessorios originais.</li>
                <li>Guarde a nota fiscal - ela sera necessaria para processar a troca.</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8 text-center">Perguntas Frequentes</h2>
          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-black">{item.question}</span>
                  <ChevronDown
                    size={20}
                    className={`text-gray-500 flex-shrink-0 transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 text-gray-600">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Refund Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-50 rounded-2xl p-8 mb-16"
        >
          <h2 className="text-2xl font-bold mb-6">Politica de Reembolso</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              <strong className="text-black">Cartao de Credito:</strong> O reembolso sera realizado na mesma forma de pagamento.
              O estorno pode levar de 1 a 2 faturas para aparecer, dependendo da data de fechamento.
            </p>
            <p>
              <strong className="text-black">PIX:</strong> O reembolso sera realizado na chave PIX cadastrada em ate 7 dias uteis
              apos a aprovacao da devolucao.
            </p>
            <p>
              <strong className="text-black">Boleto:</strong> O reembolso sera feito via transferencia bancaria. Envie seus
              dados bancarios junto com a solicitacao de devolucao.
            </p>
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-black text-white rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Precisa de Ajuda?</h3>
          <p className="text-gray-400 mb-6">
            Entre em contato com nossa equipe para iniciar sua troca ou devolucao.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/5517981114221"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-colors"
            >
              WhatsApp
            </a>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-colors"
            >
              Enviar E-mail
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
