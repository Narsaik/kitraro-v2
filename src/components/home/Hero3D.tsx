"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Play, Volume2, VolumeX } from "lucide-react";

// Vales Lives Forever "Speed Bling" inspired colors
const VALES_COLORS = {
  gold: "#d4af37",
  black: "#0a0a0a",
  silver: "#C0C0C0",
  purple: "#6B21A8",
  blue: "#1e40af",
  green: "#0a2e0a",
};

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  // Track mouse for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x: x * 20, y: y * 20 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity, scale }}
      className="relative min-h-screen bg-black overflow-hidden"
    >
      {/* Animated gradient background inspired by Sean Wotherspoon colorway */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23]" />

        {/* Floating color orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[150px] opacity-30"
          style={{ background: `radial-gradient(circle, ${VALES_COLORS.gold}, transparent)` }}
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full blur-[150px] opacity-30"
          style={{ background: `radial-gradient(circle, ${VALES_COLORS.purple}, transparent)` }}
        />
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full blur-[150px] opacity-25"
          style={{ background: `radial-gradient(circle, ${VALES_COLORS.silver}, transparent)` }}
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full blur-[150px] opacity-20"
          style={{ background: `radial-gradient(circle, ${VALES_COLORS.blue}, transparent)` }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 text-sm">
            <Sparkles size={14} className="text-[#d4af37]" />
            LANCAMENTO EXCLUSIVO
          </span>
        </motion.div>

        {/* 3D Shoe Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative w-full max-w-2xl aspect-square mb-8"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Glow effect behind shoe */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-3/4 h-3/4 rounded-full blur-[80px]"
              style={{
                background: `conic-gradient(from 0deg, ${VALES_COLORS.gold}, ${VALES_COLORS.purple}, ${VALES_COLORS.blue}, ${VALES_COLORS.silver}, ${VALES_COLORS.gold})`
              }}
            />
          </div>

          {/* 3D Rotating Shoe */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              perspective: "1000px",
            }}
          >
            <motion.div
              animate={{
                rotateY: 360,
              }}
              transition={{
                duration: isHovered ? 4 : 8,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                transformStyle: "preserve-3d",
                rotateX: mousePosition.y * 0.5,
              }}
              className="relative w-[90%] h-[90%]"
            >
              {/* Main shoe image */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ backfaceVisibility: "visible" }}
              >
                <Image
                  src="https://cdn.shopify.com/s/files/1/0966/5236/2018/files/78B1C56A-8F1E-4870-96B8-CCF83C57CF1C.jpg?v=1765829459"
                  alt="Camiseta Vales Lives Forever Speed Bling"
                  fill
                  className="object-contain drop-shadow-[0_35px_60px_rgba(212,175,55,0.4)]"
                  priority
                />
              </div>

              {/* Floating particles around product */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: Object.values(VALES_COLORS)[i % 6],
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Circular progress ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <motion.circle
              cx="50%"
              cy="50%"
              r="48%"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="1"
              strokeDasharray="1000"
              animate={{ strokeDashoffset: [1000, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="opacity-30"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={VALES_COLORS.gold} />
                <stop offset="25%" stopColor={VALES_COLORS.purple} />
                <stop offset="50%" stopColor={VALES_COLORS.blue} />
                <stop offset="75%" stopColor={VALES_COLORS.silver} />
                <stop offset="100%" stopColor={VALES_COLORS.gold} />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Product info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#6B21A8] to-[#C0C0C0]">
              Vales Lives Forever
            </span>
            <span className="block text-white/90">"Speed Bling"</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-xl mx-auto mb-2">
            Camiseta exclusiva Valley Dreams. Streetwear brasileiro premium.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-white/40">
            <span>Tamanhos: P-GG</span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span>Edicao Limitada</span>
          </div>
        </motion.div>

        {/* Price and CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <div className="text-center sm:text-right mr-4">
            <p className="text-3xl font-bold text-white">R$ 1.699,90</p>
          </div>
          <Link
            href="/products/camiseta-vales-lives-forever-speed-bling"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#d4af37] to-[#6B21A8] text-white font-bold rounded-full hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all duration-300"
          >
            Comprar Agora
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Spinning Kitraro Logo at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ rotateY: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="relative"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="w-16 h-16 rounded-full bg-[#0a2e0a] border-2 border-[#d4af37] flex items-center justify-center shadow-lg">
              <span className="text-[#d4af37] font-bold text-lg">KR</span>
            </div>
          </motion.div>
          <p className="text-white/30 text-xs mt-2 text-center">KITRARO</p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 right-8"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-white/30 text-xs uppercase tracking-widest rotate-90 origin-center translate-x-8">
              Scroll
            </span>
            <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-white/40 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
