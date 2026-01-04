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

  // Get size display - extract from product title or variant
  const getSizeDisplay = (variant: typeof selectedVariant) => {
    const title = product.title;

    // Check for hat sizes (e.g., "7 1/4", "7 3/8", "7 7/8", "8")
    // Matches: 6 7/8, 7 1/4, 7 1/2, 7 3/4, 7 7/8, 8, etc.
    const hatSizeMatch = title.match(/\b([67]\s*[0-9]?\/[0-9]|[67]\s+[0-9]\/[0-9])\s*$/i) ||
                         title.match(/\s(8)\s*$/) ||
                         title.match(/\b([67]\s*[0-9]\/[0-9])\b/i);
    if (hatSizeMatch) {
      return hatSizeMatch[1].replace(/\s+/g, ' ').trim();
    }

    // Check for clothing sizes at end of title or after hyphen/space
    // Includes Brazilian sizes: P (Pequeno), G (Grande), GG (Extra Grande)
    const clothingSizeMatch = title.match(/[\s\-\–](XXS|XS|XXXL|XXL|XL|GG|[SMLPG])\s*$/i);
    if (clothingSizeMatch) {
      return clothingSizeMatch[1].toUpperCase();
    }

    // Check for sizes with numbers (2XL, 3XL, etc.)
    const numberedSizeMatch = title.match(/[\s\-\–]([2-5]?XL|[2-5]?XS|[2-5]?G)\s*$/i);
    if (numberedSizeMatch) {
      return numberedSizeMatch[1].toUpperCase();
    }

    // Check for shoe sizes (36-48)
    const shoeSizeMatch = title.match(/[\s\-\–](3[6-9]|4[0-8])\s*$/);
    if (shoeSizeMatch) {
      return shoeSizeMatch[1];
    }

    // Check for "Tamanho X" or "Tam X" pattern
    const tamanhoMatch = title.match(/(?:tamanho|tam\.?)\s*[:.]?\s*([A-Z0-9\/\s]+)/i);
    if (tamanhoMatch) {
      return tamanhoMatch[1].trim().toUpperCase();
    }

    // Check variant size property directly (from static data)
    if (variant?.size && variant.size !== "Unico" && variant.size !== "Default Title") {
      return variant.size;
    }

    // Check variant title if not default
    if (variant?.title && variant.title !== "Default Title" && variant.title !== "Unico") {
      return variant.title.split("/")[0].trim();
    }

    // Check variant options
    if (variant?.options) {
      const sizeOption = variant.options["Tamanho"] || variant.options["Size"] || variant.options["size"];
      if (sizeOption && sizeOption !== "Default Title" && sizeOption !== "Unico") return sizeOption;
    }

    // Return empty if no valid size found
    return "";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-background-secondary py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-foreground-secondary hover:text-foreground">
              Home
            </Link>
            <span className="text-foreground-secondary">/</span>
            <Link
              href={`/brands/${product.brand.toLowerCase().replace(/ /g, "-")}`}
              className="text-foreground-secondary hover:text-foreground"
            >
              {product.brand}
            </Link>
            <span className="text-foreground-secondary">/</span>
            <span className="text-foreground font-medium truncate">{product.title}</span>
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
              className="aspect-square bg-background-secondary rounded-2xl overflow-hidden relative"
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
                        ? "border-foreground"
                        : "border-transparent hover:border-card-border"
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
                className="text-sm text-foreground-secondary uppercase tracking-wider hover:text-foreground"
              >
                {product.brand}
              </Link>
              <h1 className="text-3xl font-bold mt-2 text-foreground">{product.title}</h1>

              {/* Reviews */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-foreground-secondary">(47 avaliacoes)</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-background-secondary p-4 rounded-xl">
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    "text-4xl font-bold",
                    product.compareAtPrice ? "text-brand-green" : "text-foreground"
                  )}
                >
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                  <div className="flex flex-col">
                    <span className="text-lg text-foreground-secondary line-through">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                    <span className="text-sm text-green-600 font-medium">
                      Economize {formatPrice(product.compareAtPrice - product.price)}
                    </span>
                  </div>
                )}
              </div>

              {/* Payment options */}
              <p className="text-sm text-foreground-secondary mt-2">
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
                className="text-foreground-secondary leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            ) : (
              <p className="text-foreground-secondary leading-relaxed">{product.description}</p>
            )}

            {/* Size Display - Each item is unique with its own size */}
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-medium text-foreground">Tamanho:</h3>
                <span className="px-4 py-2 bg-brand-green text-white rounded-xl font-bold text-lg">
                  {getSizeDisplay(selectedVariant)}
                </span>
              </div>
              <p className="text-sm text-foreground-secondary mt-2">
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
                    ? "bg-background-secondary text-foreground-secondary cursor-not-allowed"
                    : isInCart
                    ? "bg-green-600 text-white cursor-not-allowed"
                    : isAdding
                    ? "bg-green-600 text-white scale-[0.98]"
                    : "bg-brand-green text-white hover:bg-brand-green-light hover:scale-[1.02] active:scale-[0.98]"
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
                <button className="flex-1 py-3 border-2 border-card-border rounded-xl font-medium hover:bg-background-secondary transition-colors flex items-center justify-center gap-2 text-foreground">
                  <Heart size={20} />
                  Favoritar
                </button>
                <button className="flex-1 py-3 border-2 border-card-border rounded-xl font-medium hover:bg-background-secondary transition-colors flex items-center justify-center gap-2 text-foreground">
                  <Share2 size={20} />
                  Compartilhar
                </button>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="border-t border-b border-card-border py-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <Shield size={20} className="text-green-600" />
                </div>
                <div>
                  <span className="font-medium text-foreground">100% Autentico</span>
                  <p className="text-sm text-foreground-secondary">Garantia de originalidade em todos os produtos</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Truck size={20} className="text-blue-600" />
                </div>
                <div>
                  <span className="font-medium text-foreground">Frete Gratis</span>
                  <p className="text-sm text-foreground-secondary">Em compras acima de R$ 500</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <RotateCcw size={20} className="text-purple-600" />
                </div>
                <div>
                  <span className="font-medium text-foreground">Troca Gratis</span>
                  <p className="text-sm text-foreground-secondary">30 dias para trocar ou devolver</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-background-secondary rounded-full flex items-center justify-center">
                  <Lock size={20} className="text-foreground-secondary" />
                </div>
                <div>
                  <span className="font-medium text-foreground">Compra Segura</span>
                  <p className="text-sm text-foreground-secondary">Pagamento criptografado e protegido</p>
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
        <section className="py-16 bg-background-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8 text-foreground">Voce tambem pode gostar</h2>
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
