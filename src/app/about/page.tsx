"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Truck, Award, Users, Heart, Target, Quote } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Autenticidade Garantida",
    description: "Cada peca passa por verificacao rigorosa. Trabalhamos apenas com fornecedores certificados.",
  },
  {
    icon: Award,
    title: "Qualidade Premium",
    description: "Selecionamos apenas as melhores pecas de streetwear de marcas renomadas mundialmente.",
  },
  {
    icon: Truck,
    title: "Entrega Segura",
    description: "Embalagens especiais e rastreamento completo para sua tranquilidade.",
  },
  {
    icon: Users,
    title: "Comunidade",
    description: "Mais que uma loja, somos uma comunidade apaixonada por streetwear.",
  },
];

const timeline = [
  { year: "2018", title: "O Inicio", description: "Miguel comeca a vender tenis importados para amigos em Osasco" },
  { year: "2019", title: "Primeira Loja Online", description: "Lancamento do primeiro site e expansao para todo o Brasil" },
  { year: "2020", title: "Boom na Pandemia", description: "Crescimento exponencial com foco em e-commerce" },
  { year: "2022", title: "Parcerias Oficiais", description: "Acordo com fornecedores certificados nos EUA e Japao" },
  { year: "2024", title: "Referencia Nacional", description: "Kit Raro se torna a maior curadoria de streetwear do Brasil" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] bg-black text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1920"
            alt="Kit Raro Streetwear"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center px-4"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Sobre a <span className="text-[#d4af37]">Kit Raro</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              De Osasco para o Brasil: a maior curadoria de streetwear de luxo do pais
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gray-100">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
                    alt="Miguel Menezes - Fundador Kit Raro"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-black text-white p-6 rounded-2xl">
                  <p className="text-3xl font-bold">6+</p>
                  <p className="text-gray-400 text-sm">Anos de experiencia</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[#d4af37] font-medium text-sm tracking-wider uppercase">Fundador</span>
              <h2 className="text-4xl font-bold mt-2 mb-6">Miguel Menezes</h2>

              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Nascido e criado em <strong className="text-black">Osasco, Sao Paulo</strong>, Miguel sempre foi apaixonado
                  por streetwear e cultura urbana. Desde adolescente, sonhava em usar pecas das
                  marcas que via nos clipes de hip-hop americano.
                </p>
                <p>
                  O problema? Encontrar produtos originais no Brasil era praticamente impossivel.
                  A maioria das lojas vendia replicas, e importar custava uma fortuna.
                </p>
                <p>
                  Em 2018, Miguel decidiu resolver esse problema. Comecou importando tenis para
                  amigos e familia, garantindo autenticidade atraves de conexoes diretas com
                  fornecedores nos Estados Unidos.
                </p>
                <p>
                  O que comecou no quarto da casa dos pais em Osasco rapidamente virou um
                  fenomeno. Hoje, a <strong className="text-black">Kit Raro</strong> e referencia nacional em streetwear
                  autentico, atendendo milhares de clientes em todo o Brasil.
                </p>
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
                <Quote size={32} className="text-gray-300 mb-4" />
                <p className="text-xl font-medium italic text-gray-800">
                  "Meu objetivo sempre foi simples: trazer para o Brasil o mesmo streetwear
                  que eu via la fora, com garantia de originalidade e preco justo."
                </p>
                <p className="mt-4 font-bold">Miguel Menezes</p>
                <p className="text-gray-500 text-sm">CEO & Fundador</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#d4af37] font-medium text-sm tracking-wider uppercase">Trajetoria</span>
            <h2 className="text-4xl font-bold mt-2">Nossa Historia</h2>
          </motion.div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="w-20 flex-shrink-0 text-right">
                  <span className="text-2xl font-bold text-[#d4af37]">{item.year}</span>
                </div>
                <div className="w-4 h-4 bg-black rounded-full flex-shrink-0 mt-2" />
                <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#d4af37] font-medium text-sm tracking-wider uppercase">Principios</span>
            <h2 className="text-4xl font-bold mt-2">Nossos Valores</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon size={28} className="text-white" />
                </div>
                <h3 className="font-bold text-lg mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-[#d4af37] rounded-full flex items-center justify-center mb-6">
                <Target size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Nossa Missao</h3>
              <p className="text-gray-400 leading-relaxed">
                Democratizar o acesso ao streetwear autentico no Brasil, oferecendo
                produtos originais de marcas renomadas com precos justos e atendimento excepcional.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-12 h-12 bg-[#d4af37] rounded-full flex items-center justify-center mb-6">
                <Heart size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Nossa Visao</h3>
              <p className="text-gray-400 leading-relaxed">
                Ser reconhecida como a principal referencia em streetwear de luxo na
                America Latina, conectando fas brasileiros as maiores marcas do mundo.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "15k+", label: "Clientes Satisfeitos" },
              { number: "30+", label: "Marcas Premium" },
              { number: "99%", label: "Avaliacao Positiva" },
              { number: "48h", label: "Tempo Medio de Envio" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-4xl md:text-5xl font-bold text-black">{stat.number}</p>
                <p className="text-gray-500 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para encontrar sua proxima peca?
            </h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Explore nossa colecao e encontre streetwear autentico com garantia de originalidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-block px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-colors"
              >
                Ver Produtos
              </Link>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-black font-bold rounded-full border-2 border-black hover:bg-gray-100 transition-colors"
              >
                Fale Conosco
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
