"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Heart, Share2, Truck, Shield,
  CheckCircle, Clock, RotateCcw, Lock, Star
} from "lucide-react";
import { getProductByHandle, products } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { formatPrice, calculateDiscount, cn } from "@/lib/utils";
import { ProductCard } from "@/components/product/ProductCard";
import { PaymentIcons } from "@/components/ui/PaymentIcons";

// Simple hash function to generate consistent number from string
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

export default function ProductPage() {
  const params = useParams();
  const handle = params.handle as string;
  const product = getProductByHandle(handle);

  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants.find((v) => v.available) || product?.variants[0]
  );
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem, items } = useCart();

  // Generate stable "people watching" count based on product ID (doesn't change on re-renders)
  const viewersNow = useMemo(() => {
    if (!product) return 0;
    return (hashCode(product.id) % 10) + 3; // 3-12 viewers
  }, [product?.id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Produto nao encontrado</h1>
          <Link href="/" className="text-[#0a2e0a] hover:underline">
            Voltar para a loja
          </Link>
        </div>
      </div>
    );
  }

  const discount = calculateDiscount(product.price, product.compareAtPrice);
  const relatedProducts = products
    .filter((p) => p.brand === product.brand && p.id !== product.id)
    .slice(0, 4);

  // Check if this item is already in cart (for 1of1 items)
  const isInCart = items.some(
    (item) => item.product.id === product.id && item.variant.id === selectedVariant?.id
  );

  const handleAddToCart = async () => {
    if (selectedVariant && selectedVariant.available && !isInCart) {
      setIsAdding(true);
      addItem(product, selectedVariant);
      // Brief delay for feedback
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-black">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link
              href={`/brands/${product.brand.toLowerCase().replace(/ /g, "-")}`}
              className="text-gray-500 hover:text-black"
            >
              {product.brand}
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-black font-medium truncate">{product.title}</span>
          </div>
        </div>
      </div>

      {/* Product */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square bg-gray-50 rounded-2xl overflow-hidden relative"
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
              {discount && (
                <span className="absolute top-4 left-4 px-4 py-2 bg-[#d4af37] text-black text-sm font-bold rounded-lg">
                  -{discount}% OFF
                </span>
              )}
              {/* Authenticity badge */}
              <div className="absolute bottom-4 right-4 px-3 py-2 bg-white/95 backdrop-blur rounded-lg flex items-center gap-2 shadow-lg">
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-xs font-medium">100% Autentico</span>
              </div>
            </motion.div>

            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "w-20 h-20 rounded-lg overflow-hidden relative border-2 transition-colors",
                      selectedImage === index
                        ? "border-black"
                        : "border-transparent hover:border-gray-300"
                    )}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            {/* Brand & Title */}
            <div>
              <Link
                href={`/brands/${product.brand.toLowerCase().replace(/ /g, "-")}`}
                className="text-sm text-gray-500 uppercase tracking-wider hover:text-black"
              >
                {product.brand}
              </Link>
              <h1 className="text-3xl font-bold mt-2">{product.title}</h1>

              {/* Fake reviews for social proof */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-500">(47 avaliacoes)</span>
              </div>
            </div>

            {/* Price - More prominent */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    "text-4xl font-bold",
                    product.compareAtPrice ? "text-[#0a2e0a]" : "text-black"
                  )}
                >
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                  <div className="flex flex-col">
                    <span className="text-lg text-gray-400 line-through">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                    <span className="text-sm text-green-600 font-medium">
                      Economize {formatPrice(product.compareAtPrice - product.price)}
                    </span>
                  </div>
                )}
              </div>

              {/* Payment options */}
              <p className="text-sm text-gray-600 mt-2">
                ou 12x de <strong>{formatPrice(product.price / 12)}</strong> sem juros
              </p>
              <p className="text-sm text-green-600 font-medium mt-1">
                5% OFF no PIX: <strong>{formatPrice(product.price * 0.95)}</strong>
              </p>
            </div>

            {/* Urgency indicators */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-orange-50 text-orange-700 rounded-lg text-sm urgency-pulse">
                <Clock size={16} />
                <span><strong>Peca Unica</strong> - 1 of 1</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm">
                <span>{viewersNow} pessoas vendo agora</span>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Variants */}
            <div>
              <h3 className="font-medium mb-3">
                Tamanho: <span className="text-gray-500">{selectedVariant?.title}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => variant.available && setSelectedVariant(variant)}
                    disabled={!variant.available}
                    className={cn(
                      "px-5 py-3 rounded-xl border-2 font-medium transition-all",
                      selectedVariant?.id === variant.id
                        ? "border-black bg-black text-white"
                        : variant.available
                        ? "border-gray-200 hover:border-black bg-white"
                        : "border-gray-100 text-gray-300 cursor-not-allowed line-through bg-gray-50"
                    )}
                  >
                    {variant.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Main CTA - Highly visible */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant?.available || isAdding || isInCart}
                className={cn(
                  "w-full py-5 rounded-xl font-bold text-lg transition-all transform",
                  !selectedVariant?.available
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : isInCart
                    ? "bg-green-600 text-white cursor-not-allowed"
                    : isAdding
                    ? "bg-green-600 text-white scale-[0.98]"
                    : "bg-black text-white hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98]"
                )}
              >
                {!selectedVariant?.available
                  ? "Esgotado"
                  : isInCart
                  ? "✓ No Carrinho"
                  : isAdding
                  ? "Adicionado!"
                  : "Adicionar ao Carrinho"}
              </button>

              {/* Secondary actions */}
              <div className="flex gap-3">
                <button className="flex-1 py-3 border-2 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <Heart size={20} />
                  Favoritar
                </button>
                <button className="flex-1 py-3 border-2 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <Share2 size={20} />
                  Compartilhar
                </button>
              </div>
            </div>

            {/* Trust Signals - Critical for conversion */}
            <div className="border-t border-b py-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield size={20} className="text-green-600" />
                </div>
                <div>
                  <span className="font-medium">100% Autentico</span>
                  <p className="text-sm text-gray-500">Garantia de originalidade em todos os produtos</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Truck size={20} className="text-blue-600" />
                </div>
                <div>
                  <span className="font-medium">Frete Gratis</span>
                  <p className="text-sm text-gray-500">Em compras acima de R$ 500</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <RotateCcw size={20} className="text-purple-600" />
                </div>
                <div>
                  <span className="font-medium">Troca Gratis</span>
                  <p className="text-sm text-gray-500">30 dias para trocar ou devolver</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Lock size={20} className="text-gray-600" />
                </div>
                <div>
                  <span className="font-medium">Compra Segura</span>
                  <p className="text-sm text-gray-500">Pagamento criptografado e protegido</p>
                </div>
              </div>
            </div>

            {/* Payment methods */}
            <div className="pt-2">
              <PaymentIcons size="md" showLabel />
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Voce tambem pode gostar</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
