"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Package, Search, Truck, ExternalLink } from "lucide-react";

export default function TrackPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;

    setIsLoading(true);

    // Open 17TRACK which supports Jadlog and auto-detects carrier
    const trackingUrl = `https://www.17track.net/en/track?nums=${encodeURIComponent(trackingNumber.trim())}`;
    window.open(trackingUrl, "_blank");

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-brand-green text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Truck size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Rastrear Pedido</h1>
            <p className="text-white/80">
              Acompanhe sua encomenda em tempo real
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleTrack}
          className="mb-12"
        >
          <label htmlFor="trackingNumber" className="block text-sm font-medium mb-2 text-gray-900">
            Codigo de Rastreio
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="trackingNumber"
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Ex: 1824470011613518244700116135"
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green text-lg"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !trackingNumber.trim()}
              className="px-8 py-4 bg-brand-green text-white font-bold rounded-xl hover:bg-brand-green-light transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Search size={20} />
                  Rastrear
                  <ExternalLink size={16} />
                </>
              )}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            O codigo de rastreio foi enviado por e-mail apos o envio do pedido.
          </p>
        </motion.form>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-50 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Truck size={24} className="text-brand-green" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Rastreamento Global</h3>
              <p className="text-gray-600 text-sm">
                Ao clicar em &quot;Rastrear&quot;, voce sera redirecionado para o 17TRACK,
                que detecta automaticamente a transportadora e mostra o status em tempo real.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Direct Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <p className="text-gray-500 text-sm mb-3">Ou acesse diretamente:</p>
          <a
            href="https://www.17track.net/en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-green hover:underline font-medium"
          >
            www.17track.net
            <ExternalLink size={16} />
          </a>
        </motion.div>

        {/* Help Section */}
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <h3 className="font-bold text-lg mb-2 text-gray-900">Precisa de ajuda?</h3>
          <p className="text-gray-600 mb-6">
            Se tiver problemas com seu pedido, entre em contato conosco.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 bg-brand-green text-white font-bold rounded-full hover:bg-brand-green-light transition-colors"
            >
              Fale Conosco
            </Link>
            <Link
              href="/faq"
              className="px-6 py-3 bg-white text-gray-900 font-bold rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              Ver FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
