"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Delay showing banner for better UX
      const timer = setTimeout(() => setShowBanner(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "all");
    setShowBanner(false);
  };

  const acceptEssential = () => {
    localStorage.setItem("cookie-consent", "essential");
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#0a2e0a] rounded-full flex items-center justify-center flex-shrink-0">
                <Cookie size={24} className="text-[#d4af37]" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">Usamos cookies</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Utilizamos cookies para melhorar sua experiencia de navegacao,
                  personalizar conteudo e analisar nosso trafego. Ao clicar em "Aceitar todos",
                  voce consente com o uso de todos os cookies.{" "}
                  <Link href="/politica-privacidade" className="text-[#0a2e0a] underline hover:no-underline">
                    Saiba mais
                  </Link>
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={acceptAll}
                    className="px-6 py-2.5 bg-[#0a2e0a] text-white font-medium rounded-full hover:bg-[#0d3d0d] transition-colors"
                  >
                    Aceitar todos
                  </button>
                  <button
                    onClick={acceptEssential}
                    className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 font-medium rounded-full hover:border-gray-400 transition-colors"
                  >
                    Apenas essenciais
                  </button>
                </div>
              </div>
              <button
                onClick={acceptEssential}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Fechar"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
