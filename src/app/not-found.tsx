"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-4"
      >
        <h1 className="text-9xl font-bold text-gray-200 mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Pagina nao encontrada</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          A pagina que voce esta procurando pode ter sido removida, teve seu nome
          alterado ou esta temporariamente indisponivel.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
          >
            <Home size={18} />
            Voltar ao Inicio
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-black text-black font-medium rounded-full hover:bg-black hover:text-white transition-colors"
          >
            <Search size={18} />
            Buscar Produtos
          </Link>
        </div>
        <button
          onClick={() => window.history.back()}
          className="mt-6 text-gray-500 hover:text-black transition-colors inline-flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Voltar a pagina anterior
        </button>
      </motion.div>
    </div>
  );
}
