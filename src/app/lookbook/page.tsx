"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";

const lookbookItems = [
  {
    id: "1",
    title: "Street Vibes",
    image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1200",
    products: [
      { name: "BAPE Shark Hoodie", link: "/products/bape-shark-hoodie" },
      { name: "Nike Air Force 1", link: "/products/nike-air-force-1" },
    ],
  },
  {
    id: "2",
    title: "Urban Classic",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200",
    products: [
      { name: "Jordan 1 High", link: "/products/air-jordan-1" },
      { name: "New Era Cap", link: "/products/new-era-cap" },
    ],
  },
  {
    id: "3",
    title: "Hype Culture",
    image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=1200",
    products: [
      { name: "Vale Dreams Tee", link: "/products/vale-dreams-tee" },
      { name: "Corteiz Cargos", link: "/products/corteiz-cargos" },
    ],
  },
  {
    id: "4",
    title: "Minimal Heat",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1200",
    products: [
      { name: "Stussy Basic Tee", link: "/products/stussy-tee" },
      { name: "Nike Dunk Low", link: "/products/nike-dunk" },
    ],
  },
  {
    id: "5",
    title: "Cold Season",
    image: "https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=1200",
    products: [
      { name: "North Face Nuptse", link: "/products/north-face-nuptse" },
      { name: "Carhartt Beanie", link: "/products/carhartt-beanie" },
    ],
  },
  {
    id: "6",
    title: "Retro Future",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200",
    products: [
      { name: "Jordan 4 Retro", link: "/products/jordan-4" },
      { name: "Supreme Hoodie", link: "/products/supreme-hoodie" },
    ],
  },
];

const seasons = [
  { name: "Todos", value: "all" },
  { name: "Primavera/Verao", value: "ss" },
  { name: "Outono/Inverno", value: "fw" },
  { name: "2024", value: "2024" },
];

export default function LookbookPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-[#d4af37] font-medium text-sm tracking-wider uppercase">
              Colecao 2024
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mt-4 mb-6">Lookbook</h1>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">
              Inspiracao e estilo para elevar seu visual. Explore looks completos
              com as melhores pecas de streetwear.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Season Filter */}
      <div className="border-b border-gray-100 sticky top-0 bg-white z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 justify-center">
            {seasons.map((season, index) => (
              <button
                key={season.value}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {season.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lookbook Grid - Pinterest-style masonry */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {lookbookItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="break-inside-avoid group relative"
            >
              <div className="rounded-3xl overflow-hidden bg-gray-100 relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={index % 3 === 0 ? 800 : index % 2 === 0 ? 600 : 700}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-2xl font-bold mb-4">{item.title}</h3>
                    <div className="space-y-2">
                      {item.products.map((product) => (
                        <Link
                          key={product.name}
                          href={product.link}
                          className="flex items-center justify-between text-white/80 hover:text-[#d4af37] transition-colors"
                        >
                          <span className="text-sm">{product.name}</span>
                          <Plus size={16} />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Title badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur text-black text-sm font-bold rounded-full">
                    {item.title}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-16">
          <button className="px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-colors">
            Ver Mais Looks
          </button>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#0a2e0a] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para montar seu look?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Explore nossa colecao completa e encontre pecas unicas para expressar
              seu estilo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-colors"
              >
                Explorar Produtos
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/collections/new-arrivals"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors"
              >
                Novidades
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
