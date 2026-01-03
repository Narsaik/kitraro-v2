"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Sparkles, CheckCircle } from "lucide-react";

export function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem("kitraro-popup-seen");

    if (!hasSeenPopup) {
      // Show popup after 3 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("kitraro-popup-seen", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    try {
      // Send email to API for storage
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      setIsSubmitted(true);
      localStorage.setItem("kitraro-popup-seen", "true");

      // Close popup after showing success
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    } catch (error) {
      console.error('Subscription error:', error);
      // Still show success to user (email was attempted)
      setIsSubmitted(true);
      localStorage.setItem("kitraro-popup-seen", "true");
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[95%] max-w-lg"
          >
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full transition-colors shadow-lg"
              >
                <X size={20} />
              </button>

              {/* Image section */}
              <div className="relative h-48 md:h-56 bg-black overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800"
                  alt="Kit Raro Streetwear"
                  fill
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Floating discount badge */}
                <motion.div
                  initial={{ rotate: -12, scale: 0 }}
                  animate={{ rotate: -12, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="absolute top-4 left-4 bg-[#d4af37] text-black px-4 py-2 rounded-full font-bold shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <Gift size={18} />
                    <span>OFERTA EXCLUSIVA</span>
                  </div>
                </motion.div>

                {/* Main discount text */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-1">
                      20% <span className="text-[#d4af37]">OFF</span>
                    </h2>
                    <p className="text-gray-300">na sua primeira compra</p>
                  </motion.div>
                </div>
              </div>

              {/* Content section */}
              <div className="p-6 md:p-8">
                {!isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold mb-2">
                        Bem-vindo a Kit Raro!
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Inscreva-se e ganhe 20% de desconto + acesso antecipado a lancamentos exclusivos.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Digite seu melhor e-mail"
                          required
                          className="w-full px-4 py-4 bg-gray-100 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                            <Sparkles size={20} />
                            QUERO MEU DESCONTO
                          </>
                        )}
                      </button>
                    </form>

                    <p className="text-xs text-gray-400 text-center mt-4">
                      Ao se inscrever, voce concorda em receber emails promocionais.
                      Cancele quando quiser.
                    </p>

                    <button
                      onClick={handleClose}
                      className="w-full mt-4 py-2 text-sm text-gray-500 hover:text-black transition-colors"
                    >
                      Nao, obrigado. Prefiro pagar preco cheio.
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 10 }}
                      className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle size={40} className="text-green-600" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">Parabens!</h3>
                    <p className="text-gray-600 mb-4">
                      Seu cupom de 20% OFF foi enviado para:
                    </p>
                    <p className="font-medium text-[#d4af37] mb-4">{email}</p>
                    <div className="inline-block px-6 py-3 bg-gray-100 rounded-xl">
                      <p className="text-xs text-gray-500 mb-1">Seu codigo:</p>
                      <p className="text-2xl font-bold tracking-wider">BEMVINDO20</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
