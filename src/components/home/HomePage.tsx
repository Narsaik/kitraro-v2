"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, Truck, Shield, RefreshCw, ChevronRight, Star, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { Hero3D } from "@/components/home/Hero3D";
import type { Product } from "@/lib/shopify/types";

interface HomePageProps {
  featuredProducts: Product[];
  newArrivals: Product[];
  brands: { name: string; slug: string; logo: string }[];
  categories: { name: string; slug: string; image: string; description: string; count: number }[];
}

const features = [
  {
    icon: Truck,
    title: "Frete Gratis",
    description: "Em compras acima de R$ 500",
  },
  {
    icon: Shield,
    title: "100% Autentico",
    description: "Garantia de originalidade",
  },
  {
    icon: RefreshCw,
    title: "Troca Facil",
    description: "30 dias para trocar",
  },
];

// Removed old hero slides - using Hero3D component now

const marqueeItems = [
  "FRETE GRATIS ACIMA DE R$500",
  "100% AUTENTICO",
  "ATE 12X SEM JUROS",
  "5% OFF NO PIX",
  "TROCA GRATIS EM 30 DIAS",
];

// Animated section component
function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HomePage({ featuredProducts, newArrivals, brands, categories }: HomePageProps) {

  return (
    <div className="overflow-hidden">
      {/* 3D Hero with Sean Wotherspoon Air Max */}
      <Hero3D />

      {/* Marquee Banner */}
      <div className="bg-black text-white py-3 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="mx-8 text-sm font-medium flex items-center gap-2">
              <Sparkles size={14} className="text-[#d4af37]" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Features - Compact bar */}
      <section className="py-4 border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-8 md:gap-16 flex-wrap">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center gap-2 text-sm">
                <feature.icon size={18} className="text-[#d4af37]" />
                <span className="font-medium">{feature.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals - FIRST! */}
      {newArrivals.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="flex justify-between items-end mb-8">
                <div>
                  <span className="text-[#d4af37] font-medium text-sm tracking-wider uppercase">Fresh Drops</span>
                  <h2 className="text-3xl md:text-4xl font-bold mt-2">Novidades</h2>
                </div>
                <Link
                  href="/products"
                  className="hidden md:flex items-center gap-2 text-sm font-medium group"
                >
                  Ver Tudo
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {newArrivals.slice(0, 8).map((product, index) => (
                <AnimatedSection key={product.id} delay={index * 0.1}>
                  <ProductCard product={product} index={index} />
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection>
              <div className="mt-10 text-center md:hidden">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-medium rounded-full"
                >
                  Ver Todos os Produtos
                  <ArrowRight size={18} />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Brands Bar - Compact */}
      {brands.length > 0 && (
        <section className="py-8 bg-gray-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-6 overflow-x-auto hide-scrollbar">
              {brands.map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/brands/${brand.slug}`}
                  className="flex-shrink-0 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all"
                >
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories with Image Backgrounds - Mosaic Grid */}
      {categories.length > 0 && (
        <section className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center mb-12">
                <span className="text-[#d4af37] font-medium text-sm tracking-wider uppercase">Explore</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-2 text-white">Categorias</h2>
                <p className="text-gray-400 mt-4">Encontre o que voce procura</p>
              </div>
            </AnimatedSection>

            {/* Mosaic Grid Layout */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
              {categories.slice(0, 5).map((category, index) => (
                <AnimatedSection
                  key={category.slug}
                  delay={index * 0.1}
                  className={index === 0 ? "col-span-2 row-span-2" : ""}
                >
                  <Link
                    href={`/collections/${category.slug}`}
                    className="group block h-full relative rounded-3xl overflow-hidden"
                  >
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 bg-[#d4af37]/0 group-hover:bg-[#d4af37]/20 transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      {index === 0 && (
                        <span className="inline-block px-3 py-1 bg-[#d4af37] text-black text-xs font-bold rounded-full mb-3">
                          {category.count} produtos
                        </span>
                      )}
                      <h3 className={`font-bold text-white group-hover:translate-x-2 transition-transform ${index === 0 ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
                        {category.name}
                      </h3>
                      <p className="text-gray-300 mt-2 group-hover:text-white transition-colors text-sm">
                        {category.description}
                      </p>
                      {index === 0 && (
                        <div className="flex items-center gap-2 mt-4 text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-sm font-medium">Ver Colecao</span>
                          <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                        </div>
                      )}
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>

            {/* View All Button */}
            <AnimatedSection delay={0.6}>
              <div className="text-center mt-10">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#d4af37] text-black font-bold rounded-full hover:bg-[#f0d77c] transition-colors"
                >
                  Ver Todas as Categorias
                  <ArrowRight size={20} />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Collection Banner 1 - BAPE */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src="https://cdn.shopify.com/s/files/1/0966/5236/2018/files/AD489DD0-D708-42D9-A2B2-CFD737519886.jpg?v=1759206388"
          alt="BAPE Streetwear Collection"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <AnimatedSection>
              <span className="inline-block px-4 py-2 bg-[#1ed760] text-black text-sm font-bold rounded-full mb-4">
                BAPE EXCLUSIVO
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                A Bathing Ape
              </h2>
              <p className="text-gray-300 text-lg max-w-lg mb-6">
                BE@RBRICK x BAPE Shark Hoodie em ABC CAMO. O camo mais icônico do streetwear.
              </p>
              <Link
                href="/brands/bape"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#1ed760] text-black font-bold rounded-full hover:bg-[#1db954] transition-colors"
              >
                Explorar BAPE
                <ArrowRight size={20} />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="flex justify-between items-end mb-8">
                <div>
                  <span className="text-[#d4af37] font-medium text-sm tracking-wider uppercase">Rare Finds</span>
                  <h2 className="text-3xl md:text-4xl font-bold mt-2">Mais Exclusivos</h2>
                </div>
                <Link
                  href="/products"
                  className="hidden md:flex items-center gap-2 text-sm font-medium group"
                >
                  Ver Tudo
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 8).map((product, index) => (
                <AnimatedSection key={product.id} delay={index * 0.1}>
                  <ProductCard product={product} index={index} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Split Collection Banners */}
      <section className="py-4 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Supreme Banner */}
            <AnimatedSection>
              <Link href="/brands/supreme" className="group block relative h-[250px] md:h-[300px] rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80"
                  alt="Supreme Streetwear Collection"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full mb-3">
                    SUPREME
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Supreme</h3>
                  <p className="text-gray-300 text-sm mb-4">Box logos, collabs e pecas raras</p>
                  <span className="inline-flex items-center gap-2 text-white font-medium group-hover:text-red-500 transition-colors">
                    Ver Colecao
                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </span>
                </div>
              </Link>
            </AnimatedSection>

            {/* Valley Dreams Banner */}
            <AnimatedSection delay={0.1}>
              <Link href="/brands/valley-dreams" className="group block relative h-[250px] md:h-[300px] rounded-3xl overflow-hidden">
                <Image
                  src="https://cdn.shopify.com/s/files/1/0966/5236/2018/files/78B1C56A-8F1E-4870-96B8-CCF83C57CF1C.jpg?v=1765829459"
                  alt="Valley Dreams Vales Lives Forever Speed Bling"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <span className="inline-block px-3 py-1 bg-purple-500 text-white text-xs font-bold rounded-full mb-3">
                    EXCLUSIVO
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Valley Dreams</h3>
                  <p className="text-gray-300 text-sm mb-4">Vales Lives Forever - Streetwear brasileiro</p>
                  <span className="inline-flex items-center gap-2 text-white font-medium group-hover:text-purple-400 transition-colors">
                    Ver Colecao
                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </span>
                </div>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-8">
              <span className="text-[#d4af37] font-medium text-sm tracking-wider uppercase">Depoimentos</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">O Que Dizem</h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Lucas M.", text: "Produto original, entrega super rapida. Melhor loja de streetwear do Brasil!", rating: 5 },
              { name: "Ana C.", text: "Atendimento excepcional e produtos de altissima qualidade. Recomendo!", rating: 5 },
              { name: "Pedro S.", text: "Ja comprei varias vezes, nunca me decepcionou. Confio 100%!", rating: 5 },
            ].map((testimonial, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="p-8 bg-gray-50 rounded-3xl hover:shadow-xl transition-shadow">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 text-lg">"{testimonial.text}"</p>
                  <p className="font-bold">{testimonial.name}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <InstagramFeed />
    </div>
  );
}
