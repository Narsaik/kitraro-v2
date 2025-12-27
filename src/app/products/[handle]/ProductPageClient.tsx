"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart, Share2, Truck, Shield,
  CheckCircle, Clock, RotateCcw, Lock, Star
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatPrice, calculateDiscount, cn } from "@/lib/utils";
import { ProductCard } from "@/components/product/ProductCard";
import { PaymentIcons } from "@/components/ui/PaymentIcons";
import type { Product } from "@/lib/shopify/types";

// Simple hash function to generate consistent number from string
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

interface ProductPageClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductPageClient({ product, relatedProducts }: ProductPageClientProps) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants.find((v) => v.available) || product.variants[0]
  );
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem, items } = useCart();

  // Generate stable "people watching" count based on product ID
  const viewersNow = useMemo(() => {
    return (hashCode(product.id) % 10) + 3; // 3-12 viewers
  }, [product.id]);

  const discount = calculateDiscount(product.price, product.compareAtPrice);

  // Check if this item is already in cart (for 1of1 items)
  const isInCart = items.some(
    (item) => item.product.id === product.id && item.variant.id === selectedVariant?.id
  );

  const handleAddToCart = async () => {
    if (selectedVariant && selectedVariant.available && !isInCart) {
      setIsAdding(true);
      addItem(product, selectedVariant);
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsAdding(false);
    }
  };

  // Get size display - extract actual size from variant
  const getSizeDisplay = (variant: typeof selectedVariant) => {
    if (!variant) return "Unico";

    // Check selectedOptions for size (common Shopify pattern)
    if (variant.options) {
      const sizeOption = variant.options["Tamanho"] || variant.options["Size"] || variant.options["size"];
      if (sizeOption && sizeOption !== "Default Title") return sizeOption;
    }

    // Use variant title if it's an actual size (not "Default Title")
    if (variant.title && variant.title !== "Default Title") {
      // Clean up common patterns like "M / Black" to just "M"
      const sizePart = variant.title.split("/")[0].trim();
      return sizePart;
    }

    // Check product options for size values
    if (product.options) {
      const sizeOption = product.options.find(
        opt => opt.name.toLowerCase() === "tamanho" || opt.name.toLowerCase() === "size"
      );
      if (sizeOption && sizeOption.values.length === 1) {
        return sizeOption.values[0];
      }
    }

    return "Unico";
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
                src={product.images[selectedImage] || "https://via.placeholder.com/600"}
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

              {/* Reviews */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-500">(47 avaliacoes)</span>
              </div>
            </div>

            {/* Price */}
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

            {/* Description */}
            {product.descriptionHtml ? (
              <div
                className="text-gray-600 leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            ) : (
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            )}

            {/* Size Display - Each item is unique with its own size */}
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-medium">Tamanho:</h3>
                <span className="px-4 py-2 bg-black text-white rounded-xl font-bold text-lg">
                  {getSizeDisplay(selectedVariant)}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Peca unica - Este item vem neste tamanho especifico
              </p>
            </div>

            {/* Main CTA */}
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

            {/* Trust Signals */}
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
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
