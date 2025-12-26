"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";

const blogPosts = [
  {
    id: "1",
    slug: "historia-air-jordan-1",
    title: "A Historia do Air Jordan 1: O Tenis que Mudou Tudo",
    excerpt: "Descubra como um tenis proibido pela NBA se tornou o icone mais influente do streetwear mundial.",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800",
    category: "Historia",
    date: "2024-01-15",
    readTime: "5 min",
  },
  {
    id: "2",
    slug: "bape-cultura-japonesa",
    title: "BAPE: Como a Cultura Japonesa Conquistou o Streetwear",
    excerpt: "A jornada da marca japonesa que definiu o hype e influenciou geracoes de entusiastas.",
    image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=800",
    category: "Marcas",
    date: "2024-01-10",
    readTime: "7 min",
  },
  {
    id: "3",
    slug: "como-identificar-tenis-original",
    title: "Como Identificar um Tenis Original: Guia Completo",
    excerpt: "Aprenda os principais sinais para identificar produtos autenticos e evitar falsificacoes.",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800",
    category: "Dicas",
    date: "2024-01-05",
    readTime: "8 min",
  },
  {
    id: "4",
    slug: "tendencias-streetwear-2024",
    title: "Tendencias de Streetwear para 2024",
    excerpt: "As principais tendencias que vao dominar o streetwear neste ano. Prepare seu guarda-roupa!",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800",
    category: "Tendencias",
    date: "2024-01-02",
    readTime: "6 min",
  },
  {
    id: "5",
    slug: "colaboracoes-mais-icoras",
    title: "As Colaboracoes Mais Iconicas do Streetwear",
    excerpt: "De Travis Scott a Virgil Abloh: as parcerias que definiram a cultura sneaker.",
    image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800",
    category: "Historia",
    date: "2023-12-28",
    readTime: "10 min",
  },
  {
    id: "6",
    slug: "cuidar-tenis-premium",
    title: "Como Cuidar dos Seus Tenis Premium",
    excerpt: "Dicas essenciais para manter seus sneakers sempre impecaveis e aumentar sua durabilidade.",
    image: "https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=800",
    category: "Dicas",
    date: "2023-12-20",
    readTime: "4 min",
  },
];

const categories = ["Todos", "Historia", "Marcas", "Dicas", "Tendencias"];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog Kit Raro</h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Historias, tendencias e dicas do universo streetwear
            </p>
          </motion.div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="border-b border-gray-100 sticky top-0 bg-white z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  index === 0
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          <Link href={`/blog/${blogPosts[0].slug}`} className="block group">
            <div className="aspect-[16/10] rounded-3xl overflow-hidden relative">
              <Image
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-[#d4af37] text-black text-xs font-bold rounded-full">
                  Destaque
                </span>
              </div>
            </div>
          </Link>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="px-3 py-1 bg-gray-100 rounded-full font-medium">
                {blogPosts[0].category}
              </span>
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{new Date(blogPosts[0].date).toLocaleDateString("pt-BR")}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{blogPosts[0].readTime}</span>
              </div>
            </div>
            <Link href={`/blog/${blogPosts[0].slug}`} className="group">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-[#d4af37] transition-colors">
                {blogPosts[0].title}
              </h2>
            </Link>
            <p className="text-gray-600 text-lg mb-6">{blogPosts[0].excerpt}</p>
            <Link
              href={`/blog/${blogPosts[0].slug}`}
              className="inline-flex items-center gap-2 text-black font-medium hover:text-[#d4af37] transition-colors"
            >
              Ler Artigo
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.article>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="aspect-[16/10] rounded-2xl overflow-hidden relative mb-4">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium">
                  {post.category}
                </span>
                <span>{blogPosts[0].readTime}</span>
              </div>
              <Link href={`/blog/${post.slug}`}>
                <h3 className="font-bold text-xl mb-2 group-hover:text-[#d4af37] transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </Link>
              <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
            </motion.article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-colors">
            Carregar Mais Artigos
          </button>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Receba Conteudo Exclusivo</h3>
          <p className="text-gray-600 mb-6">
            Inscreva-se para receber artigos, dicas e novidades do mundo streetwear.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Seu e-mail"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-colors"
            >
              Inscrever
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
