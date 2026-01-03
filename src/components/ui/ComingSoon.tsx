"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle, Instagram } from "lucide-react";

// Launch date: Tomorrow 11am EST (December 29, 2025 at 11:00 AM EST)
// EST is UTC-5, so 11:00 EST = 16:00 UTC
const LAUNCH_DATE = new Date("2025-12-29T16:00:00.000Z");

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0 });
  const [isLaunched, setIsLaunched] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = LAUNCH_DATE.getTime() - now.getTime();

      if (difference <= 0) {
        setIsLaunched(true);
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { hours, minutes, seconds };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Subscription error:', error);
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  // If launched, return null to show the regular site
  if (isLaunched) {
    return null;
  }

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center min-h-screen px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

      {/* Subtle gold accent */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af37] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#d4af37] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-lg mx-auto text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <Image
            src="/logo.png"
            alt="Kit Raro"
            width={200}
            height={80}
            className="h-16 md:h-20 w-auto brightness-0 invert"
            priority
          />
        </motion.div>

        {/* Coming Soon Text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white text-xl md:text-2xl font-light tracking-[0.3em] uppercase mb-8"
        >
          Em Breve
        </motion.h1>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center gap-4 md:gap-8 mb-12"
        >
          {/* Hours */}
          <div className="flex flex-col items-center">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-6 min-w-[80px] md:min-w-[100px]">
              <span className="text-4xl md:text-6xl font-bold text-white tabular-nums">
                {formatNumber(timeLeft.hours)}
              </span>
            </div>
            <span className="text-white/50 text-xs md:text-sm mt-2 uppercase tracking-wider">Horas</span>
          </div>

          <span className="text-3xl md:text-5xl text-[#d4af37] font-light">:</span>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-6 min-w-[80px] md:min-w-[100px]">
              <span className="text-4xl md:text-6xl font-bold text-white tabular-nums">
                {formatNumber(timeLeft.minutes)}
              </span>
            </div>
            <span className="text-white/50 text-xs md:text-sm mt-2 uppercase tracking-wider">Minutos</span>
          </div>

          <span className="text-3xl md:text-5xl text-[#d4af37] font-light">:</span>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-6 min-w-[80px] md:min-w-[100px]">
              <motion.span
                key={timeLeft.seconds}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold text-white tabular-nums"
              >
                {formatNumber(timeLeft.seconds)}
              </motion.span>
            </div>
            <span className="text-white/50 text-xs md:text-sm mt-2 uppercase tracking-wider">Segundos</span>
          </div>
        </motion.div>

        {/* Email Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-md"
        >
          {!isSubmitted ? (
            <>
              <p className="text-white/70 text-sm md:text-base mb-4">
                Seja o primeiro a saber quando abrirmos. Ganhe 20% OFF na primeira compra.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu e-mail"
                  required
                  className="flex-1 px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#d4af37] transition-colors"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-4 bg-[#d4af37] text-black font-bold rounded-xl hover:bg-[#e5c349] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles size={20} />
                    </motion.div>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      <span className="hidden sm:inline">Notificar</span>
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3 py-4"
            >
              <div className="w-14 h-14 bg-[#d4af37]/20 rounded-full flex items-center justify-center">
                <CheckCircle size={28} className="text-[#d4af37]" />
              </div>
              <p className="text-white font-medium">Inscrito com sucesso!</p>
              <p className="text-white/60 text-sm">Seu cupom BEMVINDO20 sera enviado por e-mail.</p>
            </motion.div>
          )}
        </motion.div>

        {/* Social Link */}
        <motion.a
          href="https://instagram.com/kitraro416"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex items-center gap-2 text-white/50 hover:text-[#d4af37] transition-colors"
        >
          <Instagram size={20} />
          <span className="text-sm">@kitraro416</span>
        </motion.a>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50" />
    </div>
  );
}
