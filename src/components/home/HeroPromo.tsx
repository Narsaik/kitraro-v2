"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Tag } from "lucide-react";

export function HeroPromo() {
  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] bg-black overflow-hidden">
      {/* Background Image - New Era Caps */}
      <div className="absolute inset-0">
        <Image
          src="https://cdn.shopify.com/s/files/1/0966/5236/2018/files/PHOTO-2025-10-04-12-01-11_1.jpg?v=1763667524"
          alt="New Era Caps Collection"
          fill
          className="object-cover object-center opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      </div>

      {/* Animated accent elements */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full blur-[120px] opacity-30 bg-[#d4af37]"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/3 left-1/4 w-48 h-48 rounded-full blur-[100px] opacity-20 bg-red-600"
      />

      {/* Content */}
      <div className="relative z-10 min-h-[70vh] md:min-h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Promo Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-full">
                <Tag size={16} />
                PROMOCAO ESPECIAL
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
            >
              <span className="block">New Era</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f0d77c]">
                59FIFTY Fitted
              </span>
            </motion.h1>

            {/* Price Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6"
            >
              <div className="inline-flex items-baseline gap-3 bg-white/10 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/20">
                <span className="text-white/60 text-lg line-through">R$ 199,90</span>
                <span className="text-5xl md:text-6xl font-black text-[#d4af37]">R$ 99</span>
                <span className="text-white/80 text-lg">,90</span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl text-white/70 mb-8 max-w-lg"
            >
              Bones oficiais MLB, NBA e NFL. Modelos fitted premium com ate{" "}
              <span className="text-[#d4af37] font-bold">50% OFF</span>.
              Estoque limitado!
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              {["100% Original", "MLB | NBA | NFL", "Tamanhos 7 - 8"].map((feature, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/80 text-sm"
                >
                  <Sparkles size={14} className="text-[#d4af37]" />
                  {feature}
                </span>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Link
                href="/collections/bones"
                className="group inline-flex items-center gap-3 px-8 py-5 bg-[#d4af37] text-black font-bold text-lg rounded-full hover:bg-[#f0d77c] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all duration-300"
              >
                Ver Colecao
                <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />

      {/* Kitraro Logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 right-8 hidden md:block"
      >
        <div className="w-14 h-14 rounded-full bg-[#0a2e0a] border-2 border-[#d4af37] flex items-center justify-center shadow-lg">
          <span className="text-[#d4af37] font-bold">KR</span>
        </div>
      </motion.div>
    </section>
  );
}
