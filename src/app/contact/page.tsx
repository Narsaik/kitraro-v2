"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Instagram, MessageCircle, Clock, CheckCircle } from "lucide-react";

const contactMethods = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+55 (11) 99999-9999",
    href: "https://wa.me/5511999999999",
    description: "Atendimento rapido",
    color: "bg-green-500",
  },
  {
    icon: Mail,
    title: "E-mail",
    value: "contato@kitraro.com",
    href: "mailto:contato@kitraro.com",
    description: "Resposta em ate 24h",
    color: "bg-blue-500",
  },
  {
    icon: Instagram,
    title: "Instagram",
    value: "@kitraro",
    href: "https://instagram.com/kitraro",
    description: "Siga-nos",
    color: "bg-pink-500",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

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
              <Mail size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Fale Conosco</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Tem alguma duvida ou precisa de ajuda? Nossa equipe esta pronta para atender voce.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-green-900 mb-2">Mensagem Enviada!</h2>
                <p className="text-green-700 mb-6">
                  Obrigado pelo contato. Nossa equipe ira responder em breve.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="px-6 py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition-colors"
                >
                  Enviar Nova Mensagem
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-6">Envie uma mensagem</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                        Nome *
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                        E-mail *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-black mb-2">
                      Assunto *
                    </label>
                    <select
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white text-black"
                    >
                      <option value="">Selecione um assunto</option>
                      <option value="duvida">Duvida sobre produto</option>
                      <option value="pedido">Meu pedido</option>
                      <option value="troca">Troca ou devolucao</option>
                      <option value="parceria">Parceria comercial</option>
                      <option value="outro">Outro assunto</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-black mb-2">
                      Mensagem *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                      placeholder="Como podemos ajudar?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={18} />
                        Enviar Mensagem
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-bold mb-6">Outras formas de contato</h2>
            <div className="space-y-4 mb-12">
              {contactMethods.map((method) => (
                <a
                  key={method.title}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                >
                  <div className={`w-12 h-12 ${method.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <method.icon size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black">{method.title}</h3>
                    <p className="text-gray-600">{method.value}</p>
                    <p className="text-sm text-gray-400">{method.description}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Clock size={20} className="text-black" />
                <h3 className="font-bold text-black">Horario de Atendimento</h3>
              </div>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Segunda a Sexta:</span>
                  <span className="font-medium text-black">9h as 18h</span>
                </div>
                <div className="flex justify-between">
                  <span>Sabado:</span>
                  <span className="font-medium text-black">10h as 14h</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingo e Feriados:</span>
                  <span className="text-gray-400">Fechado</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin size={20} className="text-black" />
                <h3 className="font-bold text-black">Endereco</h3>
              </div>
              <p className="text-gray-600">
                Osasco, Sao Paulo - SP<br />
                Brasil
              </p>
              <p className="text-sm text-gray-400 mt-2">
                * Atendemos apenas online. Nao possuimos loja fisica para visitas.
              </p>
            </div>

            {/* Quick Links */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <Link
                href="/faq"
                className="p-4 bg-black text-white rounded-xl text-center font-medium hover:bg-gray-800 transition-colors"
              >
                Ver FAQ
              </Link>
              <Link
                href="/track"
                className="p-4 bg-gray-100 text-black rounded-xl text-center font-medium hover:bg-gray-200 transition-colors"
              >
                Rastrear Pedido
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
