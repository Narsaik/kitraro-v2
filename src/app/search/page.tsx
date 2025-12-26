"use client";

import { Suspense, useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const newQuery = searchParams.get("q") || "";
    if (newQuery !== query) {
      setQuery(newQuery);
    }
  }, [searchParams]);

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerms = query.toLowerCase().split(" ");

    return products.filter((product) => {
      const searchText = `${product.title} ${product.brand} ${product.description} ${product.tags.join(" ")}`.toLowerCase();
      return searchTerms.every((term) => searchText.includes(term));
    });
  }, [query]);

  return (
    <div className="min-h-screen">
      {/* Search Header */}
      <div className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-6">Buscar</h1>
          <div className="relative max-w-xl">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="O que voce esta procurando?"
              className="w-full px-6 py-4 pl-14 bg-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              autoFocus
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {query.trim() === "" ? (
          <div className="text-center py-16">
            <p className="text-gray-500">
              Digite algo para buscar produtos.
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">
              Nenhum produto encontrado para "{query}".
            </p>
            <p className="text-sm text-gray-400">
              Tente buscar por marca, categoria ou nome do produto.
            </p>
          </div>
        ) : (
          <>
            <p className="text-gray-500 mb-8">
              {results.length} resultado{results.length !== 1 ? "s" : ""} para "{query}"
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {results.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function SearchFallback() {
  return (
    <div className="min-h-screen">
      <div className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-6">Buscar</h1>
          <div className="relative max-w-xl">
            <div className="w-full px-6 py-4 pl-14 bg-white/10 rounded-full h-14 animate-pulse" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center py-24">
        <Loader2 className="animate-spin text-gray-400" size={32} />
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchContent />
    </Suspense>
  );
}
