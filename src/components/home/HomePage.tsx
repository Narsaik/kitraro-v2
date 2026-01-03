"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import type { Product } from "@/lib/shopify/types";

interface HomePageProps {
  featuredProducts: Product[];
  newArrivals: Product[];
  heroProducts?: Product[]; // Optional, no longer used
  brands: { name: string; slug: string; logo: string }[];
  categories: { name: string; slug: string; image: string; description: string }[];
}

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
      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center mb-10 md:mb-16">
                <span className="text-gold font-medium text-xs md:text-sm tracking-wider uppercase">Explore</span>
                <h2 className="text-3xl md:text-5xl font-heading font-bold mt-2 md:mt-3 text-gray-900">Categorias</h2>
              </div>
            </AnimatedSection>

            {/* 3 Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {categories.map((category, index) => (
                <AnimatedSection key={category.slug} delay={index * 0.15}>
                  <Link
                    href={`/collections/${category.slug}`}
                    className="group block text-center"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden transition-all duration-300">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Brands Section */}
      {brands.length > 0 && (
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center mb-8 md:mb-16">
                <span className="text-gold font-medium text-xs md:text-sm tracking-wider uppercase">Curadoria Premium</span>
                <h2 className="text-3xl md:text-6xl font-heading font-bold mt-2 md:mt-4 text-gray-900">Nossas Marcas</h2>
                <p className="text-gray-500 mt-2 md:mt-4 max-w-2xl mx-auto text-sm md:text-base">As marcas mais desejadas do streetwear mundial</p>
              </div>
            </AnimatedSection>

            {/* 4 columns on mobile, 3 on tablet, 6 on desktop */}
            <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-8">
              {brands.slice(0, 12).map((brand, index) => (
                <AnimatedSection key={brand.slug} delay={index * 0.1}>
                  <Link
                    href={`/brands/${brand.slug}`}
                    className="group flex flex-col items-center touch-manipulation active:scale-95 transition-transform"
                  >
                    <div className="w-full aspect-square md:w-28 md:h-28 rounded-xl md:rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:border-gold group-hover:scale-110 group-hover:shadow-lg overflow-hidden">
                      <div className="w-[60%] h-[60%] relative">
                        <Image
                          src={brand.logo}
                          alt={brand.name}
                          fill
                          sizes="(max-width: 768px) 50px, 70px"
                          className="object-contain opacity-90 group-hover:opacity-100 transition-all duration-300"
                        />
                      </div>
                    </div>
                    <span className="mt-2 md:mt-4 text-gray-700 text-xs md:text-sm font-medium group-hover:text-gold transition-colors text-center">
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
                  className="inline-flex items-center gap-2 px-6 md:px-8 py-3.5 md:py-4 border-2 border-gray-300 text-gray-900 font-bold rounded-full hover:border-gold hover:text-gold transition-colors touch-manipulation active:scale-95"
                >
                  Ver Todas as Marcas
                  <ArrowRight size={18} />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="py-10 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="flex justify-between items-end mb-6 md:mb-8">
                <div>
                  <span className="text-gold font-medium text-xs md:text-sm tracking-wider uppercase">Fresh Drops</span>
                  <h2 className="text-2xl md:text-4xl font-bold mt-1 md:mt-2 text-gray-900">Novidades</h2>
                </div>
                <Link
                  href="/products"
                  className="hidden md:flex items-center gap-2 text-sm font-medium group text-gray-900 hover:text-gold"
                >
                  Ver Tudo
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {newArrivals.slice(0, 16).map((product, index) => (
                <AnimatedSection key={product.id} delay={index * 0.1}>
                  <ProductCard product={product} index={index} />
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection>
              <div className="mt-8 md:mt-10 text-center md:hidden">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-green text-white font-medium rounded-full hover:bg-brand-green-light touch-manipulation active:scale-95"
                >
                  Ver Todos os Produtos
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

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-10 md:py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="flex justify-between items-end mb-6 md:mb-8">
                <div>
                  <span className="text-gold font-medium text-xs md:text-sm tracking-wider uppercase">Rare Finds</span>
                  <h2 className="text-2xl md:text-4xl font-bold mt-1 md:mt-2 text-gray-900">Mais Exclusivos</h2>
                </div>
                <Link
                  href="/products"
                  className="hidden md:flex items-center gap-2 text-sm font-medium group text-gray-900 hover:text-gold"
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
      <section className="py-3 md:py-4 bg-white">
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
