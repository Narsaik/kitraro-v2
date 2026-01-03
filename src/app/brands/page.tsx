"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { brands, products } from "@/data/products";

export default function BrandsPage() {
  const getBrandProductCount = (brandName: string) => {
    return products.filter((p) => p.brand === brandName).length;
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold">Nossas Marcas</h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Trabalhamos apenas com marcas autenticas e originais.
            Streetwear de luxo direto para voce.
          </p>
        </div>
      </div>

      {/* Brands Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/brands/${brand.slug}`}
                className="group block bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-colors"
              >
                <div className="aspect-square relative flex items-center justify-center mb-4 p-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-full max-w-[80px] max-h-[80px] object-contain group-hover:scale-110 transition-transform"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-lg">{brand.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {getBrandProductCount(brand.name)} produtos
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
