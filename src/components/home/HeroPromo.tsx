"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/shopify/types";

interface HeroPromoProps {
  products: Product[];
}

export function HeroPromo({ products }: HeroPromoProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance slideshow
  useEffect(() => {
    if (!isAutoPlaying || products.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, products.length]);

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  // Fallback if no products
  if (!products || products.length === 0) {
    return (
      <section className="relative min-h-[70vh] md:min-h-[80vh] bg-black overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
            New Era <span className="text-gold">59FIFTY</span>
          </h1>
          <p className="text-white/70 mb-6">Bones oficiais a partir de R$ 99,90</p>
          <Link
            href="/collections/bones"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-black font-bold rounded-full"
          >
            Ver Colecao
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    );
  }

  const currentProduct = products[currentIndex];
  const currentImage = currentProduct.images?.[0] || "";
  const discount = currentProduct.compareAtPrice
    ? Math.round((1 - currentProduct.price / currentProduct.compareAtPrice) * 100)
    : 0;

  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] bg-black overflow-hidden">
      {/* Background Image - Current Product */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProduct.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {currentImage && (
            <Image
              src={currentImage}
              alt={currentProduct.title}
              fill
              className="object-cover object-center opacity-40 scale-110"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        </motion.div>
      </AnimatePresence>

      {/* Animated accent elements */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full blur-[120px] opacity-30 bg-gold"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/3 left-1/4 w-48 h-48 rounded-full blur-[100px] opacity-20 bg-brand-green"
      />

      {/* Content */}
      <div className="relative z-10 min-h-[70vh] md:min-h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left - Simplified Text Content */}
            <div>
              {/* Main Headline - Simplified */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-4 md:mb-6"
              >
                <span className="block">New Era</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
                  59FIFTY
                </span>
              </motion.h1>

              {/* Price - Simplified */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6 md:mb-8"
              >
                <div className="flex items-baseline gap-3">
                  {currentProduct.compareAtPrice && (
                    <span className="text-white/50 text-lg line-through">
                      R$ {currentProduct.compareAtPrice.toFixed(0)}
                    </span>
                  )}
                  <span className="text-4xl md:text-5xl font-black text-gold">
                    R$ {currentProduct.price.toFixed(0)}
                  </span>
                  {discount > 0 && (
                    <span className="px-3 py-1 bg-gold text-black text-sm font-bold rounded-full">
                      -{discount}%
                    </span>
                  )}
                </div>
              </motion.div>

              {/* CTA Button - Clean */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/collections/bones"
                  className="group inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-gold text-black font-bold text-base md:text-lg rounded-full hover:bg-gold-light transition-all duration-300 touch-manipulation active:scale-95"
                >
                  Ver Colecao
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
            </div>

            {/* Right - Product Image with Navigation */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProduct.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <Link href={`/products/${currentProduct.handle}`} className="block group">
                    <div className="relative aspect-square max-w-md mx-auto rounded-3xl overflow-hidden bg-white/5 border border-white/10">
                      {currentImage && (
                        <Image
                          src={currentImage}
                          alt={currentProduct.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      )}
                      {discount > 0 && (
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-2 bg-gold text-black text-sm font-bold rounded-full">
                            -{discount}%
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                          {currentProduct.title}
                        </h3>
                        <span className="inline-flex items-center gap-2 text-gold font-medium group-hover:gap-3 transition-all">
                          Ver Produto
                          <ArrowRight size={18} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows - Larger touch targets */}
              {products.length > 1 && (
                <>
                  <button
                    onClick={goToPrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/20 md:bg-white/10 border border-white/30 flex items-center justify-center text-white hover:bg-gold hover:text-black transition-all touch-manipulation active:scale-90"
                    aria-label="Previous product"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/20 md:bg-white/10 border border-white/30 flex items-center justify-center text-white hover:bg-gold hover:text-black transition-all touch-manipulation active:scale-90"
                    aria-label="Next product"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}

              {/* Dots Navigation - Larger touch targets */}
              {products.length > 1 && (
                <div className="flex justify-center gap-3 mt-4 md:mt-6">
                  {products.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-3 rounded-full transition-all touch-manipulation ${
                        index === currentIndex
                          ? "bg-gold w-8"
                          : "bg-white/30 hover:bg-white/50 w-3"
                      }`}
                      style={{ minWidth: '44px', minHeight: '44px', padding: '18px 0' }}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />

    </section>
  );
}
