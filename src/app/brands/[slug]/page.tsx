"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { products, brands } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export default function BrandPage() {
  const params = useParams();
  const slug = params.slug as string;

  const brand = useMemo(() => {
    return brands.find((b) => b.slug === slug);
  }, [slug]);

  const brandProducts = useMemo(() => {
    if (!brand) return [];
    return products.filter(
      (p) => p.brand.toLowerCase().replace(/ /g, "-") === slug ||
             p.brand.toLowerCase() === brand.name.toLowerCase()
    );
  }, [slug, brand]);

  if (!brand) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Marca nao encontrada</h1>
          <Link href="/" className="text-red-500 hover:underline">
            Voltar para a loja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center p-3">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold">{brand.name}</h1>
              <p className="text-gray-400 mt-2">
                {brandProducts.length} produto{brandProducts.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {brandProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">
              Nenhum produto encontrado para esta marca.
            </p>
            <Link
              href="/"
              className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              Ver todos os produtos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {brandProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
