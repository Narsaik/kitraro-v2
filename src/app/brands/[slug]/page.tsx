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
      <div className="py-12 border-b border-card-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 flex items-center justify-center">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold mt-4 text-foreground">{brand.name}</h1>
            <p className="text-foreground-secondary mt-2">
              {brandProducts.length} produto{brandProducts.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {brandProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-foreground-secondary mb-4">
              Nenhum produto encontrado para esta marca.
            </p>
            <Link
              href="/"
              className="px-6 py-2 bg-brand-green text-white rounded-full hover:bg-brand-green-light transition-colors"
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
