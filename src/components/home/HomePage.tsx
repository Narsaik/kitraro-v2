"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, ChevronRight, Sparkles, Star, Shield, Truck, RotateCcw, Lock } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { HeroPromo } from "@/components/home/HeroPromo";
import type { Product } from "@/lib/shopify/types";

interface HomePageProps {
  featuredProducts: Product[];
  newArrivals: Product[];
  heroProducts: Product[];
  brands: { name: string; slug: string; logo: string }[];
  categories: { name: string; slug: string; image: string; description: string; count: number }[];
}

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

export function HomePage({ featuredProducts, newArrivals, heroProducts, brands, categories }: HomePageProps) {

  return (
    <div className="overflow-hidden">
      {/* New Era Promo Banner */}
      <HeroPromo products={heroProducts} />

      {/* Marquee Banner */}
      <div className="bg-brand-green text-white py-3 overflow-hidden border-y border-gold/20">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="mx-8 text-sm font-medium flex items-center gap-2">
              <Sparkles size={14} className="text-gold" />
              {item}
            </span>
          ))}
        </div>
      </div>


      {/* New Arrivals - FIRST! */}
      {newArrivals.length > 0 && (
        <section className="py-10 md:py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="flex justify-between items-end mb-6 md:mb-8">
                <div>
                  <span className="text-gold font-medium text-xs md:text-sm tracking-wider uppercase">Fresh Drops</span>
                  <h2 className="text-2xl md:text-4xl font-bold mt-1 md:mt-2">Novidades</h2>
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

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {newArrivals.slice(0, 8).map((product, index) => (
                <AnimatedSection key={product.id} delay={index * 0.1}>
                  <ProductCard product={product} index={index} />
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection>
              <div className="mt-8 md:mt-10 text-center md:hidden">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-black dark:bg-white text-white dark:text-black font-medium rounded-full touch-manipulation active:scale-95"
                >
                  Ver Todos os Produtos
                  <ArrowRight size={18} />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Categories with Image Backgrounds - Mosaic Grid */}
      {categories.length > 0 && (
        <section className="py-10 md:py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center mb-8 md:mb-12">
                <span className="text-gold font-medium text-xs md:text-sm tracking-wider uppercase">Explore</span>
                <h2 className="text-3xl md:text-5xl font-bold mt-1 md:mt-2 text-white">Categorias</h2>
                <p className="text-gray-400 mt-2 md:mt-4 text-sm md:text-base">Encontre o que voce procura</p>
              </div>
            </AnimatedSection>

            {/* Mosaic Grid Layout - Better mobile sizing */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[160px] md:auto-rows-[250px]">
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
                    <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/20 transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      {index === 0 && (
                        <span className="inline-block px-3 py-1 bg-gold text-black text-xs font-bold rounded-full mb-3">
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
                        <div className="flex items-center gap-2 mt-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity">
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
              <div className="text-center mt-8 md:mt-10">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 md:px-8 py-3.5 md:py-4 bg-gold text-black font-bold rounded-full hover:bg-gold-light transition-colors touch-manipulation active:scale-95"
                >
                  Ver Todas as Categorias
                  <ArrowRight size={18} />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Brands Section with Green Blur Effect */}
      {brands.length > 0 && (
        <section className="py-12 md:py-20 bg-black relative overflow-hidden">
          {/* Green blur background effects */}
          <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full blur-[150px] opacity-30 bg-brand-green" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[120px] opacity-25 bg-brand-green-light" />
          <div className="absolute top-1/4 right-1/3 w-64 h-64 rounded-full blur-[100px] opacity-20 bg-gold/30" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <AnimatedSection>
              <div className="text-center mb-8 md:mb-16">
                <span className="text-gold font-medium text-xs md:text-sm tracking-wider uppercase">Curadoria Premium</span>
                <h2 className="text-3xl md:text-6xl font-heading font-bold mt-2 md:mt-4 text-white">Nossas Marcas</h2>
                <p className="text-gray-400 mt-2 md:mt-4 max-w-2xl mx-auto text-sm md:text-base">As marcas mais desejadas do streetwear mundial</p>
              </div>
            </AnimatedSection>

            {/* Horizontal scroll on mobile, grid on desktop */}
            <div className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8 overflow-x-auto pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar">
              {brands.map((brand, index) => (
                <AnimatedSection key={brand.slug} delay={index * 0.1} className="flex-shrink-0">
                  <Link
                    href={`/brands/${brand.slug}`}
                    className="group flex flex-col items-center touch-manipulation active:scale-95 transition-transform"
                  >
                    <div className="relative w-20 h-20 md:w-32 md:h-32 rounded-xl md:rounded-2xl bg-white backdrop-blur-sm border border-gray-200 flex items-center justify-center p-3 md:p-4 transition-all duration-500 group-hover:bg-gray-50 group-hover:border-gold group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="w-12 h-12 md:w-20 md:h-20 object-contain relative z-10 opacity-80 group-hover:opacity-100 transition-all duration-300"
                      />
                    </div>
                    <span className="mt-2 md:mt-4 text-white/80 text-xs md:text-sm font-medium group-hover:text-gold transition-colors text-center">
                      {brand.name}
                    </span>
                  </Link>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={0.8}>
              <div className="text-center mt-8 md:mt-16">
                <Link
                  href="/brands"
                  className="inline-flex items-center gap-2 px-6 md:px-8 py-3.5 md:py-4 border-2 border-white/20 text-white font-bold rounded-full hover:border-gold hover:text-gold transition-colors touch-manipulation active:scale-95"
                >
                  Ver Todas as Marcas
                  <ArrowRight size={18} />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Collection Banner 1 - BAPE - Better mobile sizing */}
      <section className="relative h-[40vh] md:h-[50vh] min-h-[320px] md:min-h-[400px] overflow-hidden">
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
              <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-gold text-black text-xs md:text-sm font-bold rounded-full mb-3 md:mb-4">
                BAPE EXCLUSIVO
              </span>
              <h2 className="text-3xl md:text-6xl font-bold text-white mb-3 md:mb-4">
                A Bathing Ape
              </h2>
              <p className="text-gray-300 text-sm md:text-lg max-w-lg mb-4 md:mb-6 line-clamp-2 md:line-clamp-none">
                BAPE Shark Hoodie em ABC CAMO. O camo mais iconico do streetwear.
              </p>
              <Link
                href="/brands/bape"
                className="inline-flex items-center gap-2 px-6 md:px-8 py-3.5 md:py-4 bg-gold text-black font-bold rounded-full hover:bg-gold-light transition-colors touch-manipulation active:scale-95"
              >
                Explorar BAPE
                <ArrowRight size={18} />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Featured Products - with subtle green tint */}
      {featuredProducts.length > 0 && (
        <section className="py-10 md:py-12 bg-brand-green/5 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="flex justify-between items-end mb-6 md:mb-8">
                <div>
                  <span className="text-gold font-medium text-xs md:text-sm tracking-wider uppercase">Rare Finds</span>
                  <h2 className="text-2xl md:text-4xl font-bold mt-1 md:mt-2">Mais Exclusivos</h2>
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {featuredProducts.slice(0, 4).map((product, index) => (
                <AnimatedSection key={product.id} delay={index * 0.1}>
                  <ProductCard product={product} index={index} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Valley Dreams Banner - Full Width - Better mobile sizing */}
      <section className="py-3 md:py-4 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <Link href="/products/camiseta-vales-lives-forever-speed-bling" className="group block relative h-[250px] md:h-[400px] rounded-2xl md:rounded-3xl overflow-hidden touch-manipulation active:scale-[0.99]">
              <Image
                src="https://cdn.shopify.com/s/files/1/0966/5236/2018/files/78B1C56A-8F1E-4870-96B8-CCF83C57CF1C.jpg?v=1765829459"
                alt="Valley Dreams Vales Lives Forever Speed Bling"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="p-5 md:p-12 max-w-xl">
                  <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-gold text-black text-xs md:text-sm font-bold rounded-full mb-3 md:mb-4">
                    EXCLUSIVO
                  </span>
                  <h3 className="text-2xl md:text-5xl font-bold text-white mb-2 md:mb-3">Valley Dreams</h3>
                  <p className="text-gray-300 text-sm md:text-lg mb-4 md:mb-6 line-clamp-2 md:line-clamp-none">Vales Lives Forever "Speed Bling" - Streetwear brasileiro</p>
                  <span className="inline-flex items-center gap-2 md:gap-3 px-5 md:px-6 py-2.5 md:py-3 bg-gold text-black font-bold rounded-full group-hover:bg-gold-light transition-colors text-sm md:text-base">
                    Ver Produto
                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Instagram Feed */}
      <InstagramFeed />
    </div>
  );
}
