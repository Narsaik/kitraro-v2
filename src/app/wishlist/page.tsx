"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/data/products";

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlist();

  // Get some recommended products that aren't in wishlist
  const recommendedProducts = products
    .filter((p) => !items.find((item) => item.id === p.id))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={32} className="text-red-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Meus Favoritos</h1>
            <p className="text-gray-400">
              {items.length === 0
                ? "Sua lista de favoritos esta vazia"
                : `${items.length} ${items.length === 1 ? "item" : "itens"} salvos`}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={40} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Nenhum favorito ainda</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Explore nossos produtos e adicione seus favoritos clicando no icone de coracao.
            </p>
            <Link
              href="/collections/all"
              className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-colors"
            >
              <ShoppingBag size={20} />
              Explorar Produtos
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Actions */}
            <div className="flex justify-between items-center mb-8">
              <p className="text-gray-600">
                Mostrando {items.length} {items.length === 1 ? "produto" : "produtos"}
              </p>
              <button
                onClick={clearWishlist}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors text-sm font-medium"
              >
                <Trash2 size={16} />
                Limpar Lista
              </button>
            </div>

            {/* Wishlist Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-12 text-center">
              <Link
                href="/collections/all"
                className="inline-flex items-center gap-2 text-black font-medium hover:text-[#d4af37] transition-colors"
              >
                Continuar Comprando
                <ArrowRight size={20} />
              </Link>
            </div>
          </>
        )}

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <section className="mt-16 pt-16 border-t">
            <h2 className="text-2xl font-bold mb-8">Voce pode gostar</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {recommendedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
