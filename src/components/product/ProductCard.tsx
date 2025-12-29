"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, Eye, Check } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/shopify/types";
import { formatPrice, calculateDiscount, cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useToastStore } from "@/components/ui/Toast";

interface ProductCardProps {
  product: Product;
  index?: number;
}

// Extract actual size from product title or variant
function getProductSize(product: Product): string {
  // Size patterns to look for in title
  // Clothing sizes: XS, S, M, L, XL, XXL, XXXL (with optional numbers)
  // Hat sizes: 7 1/8, 7 1/4, 7 3/8, 7 1/2, 7 5/8, 7 3/4, 7 7/8, etc.
  // Shoe sizes: 38, 39, 40, 41, 42, 43, 44, 45, etc.
  // Generic: tamanho followed by size

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
  const clothingSizeMatch = title.match(/[\s\-\–](XXS|XS|XXXL|XXL|XL|[SML])\s*$/i);
  if (clothingSizeMatch) {
    return clothingSizeMatch[1].toUpperCase();
  }

  // Check for sizes with numbers (2XL, 3XL, etc.)
  const numberedSizeMatch = title.match(/[\s\-\–]([2-5]?XL|[2-5]?XS)\s*$/i);
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

  // Check variant title if not default
  const variant = product.variants.find(v => v.available) || product.variants[0];
  if (variant?.title && variant.title !== "Default Title") {
    return variant.title.split("/")[0].trim();
  }

  // Check variant options
  if (variant?.options) {
    const sizeOption = variant.options["Tamanho"] || variant.options["Size"] || variant.options["size"];
    if (sizeOption && sizeOption !== "Default Title") return sizeOption;
  }

  return "Unico";
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const discount = calculateDiscount(product.price, product.compareAtPrice);
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { addToast } = useToastStore();
  const isLiked = isInWishlist(product.id);

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const availableVariant = product.variants.find(v => v.available);
    if (availableVariant && !isAdding) {
      setIsAdding(true);
      addItem(product, availableVariant);
      addToast("success", `${product.title} adicionado ao carrinho!`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsAdding(false);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
    if (!isLiked) {
      addToast("info", "Adicionado aos favoritos!");
    } else {
      addToast("info", "Removido dos favoritos");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => {
        setIsHovered(true);
        if (product.images.length > 1) setImageIndex(1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setImageIndex(0);
      }}
      className="group product-card"
    >
      <Link href={`/products/${product.handle}`}>
        <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden mb-4 ring-2 ring-transparent group-hover:ring-brand-green/30 dark:group-hover:ring-gold/30 transition-all">
          {/* Primary Image */}
          <motion.div
            animate={{ opacity: imageIndex === 0 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover product-image"
            />
          </motion.div>

          {/* Secondary Image (on hover) */}
          {product.images.length > 1 && (
            <motion.div
              animate={{ opacity: imageIndex === 1 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={product.images[1]}
                alt={product.title}
                fill
                className="object-cover"
              />
            </motion.div>
          )}

          {/* Gradient overlay on hover */}
          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {discount && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-1.5 bg-gold text-black text-xs font-bold rounded-full shadow-lg"
              >
                -{discount}%
              </motion.span>
            )}
            {!product.available && (
              <span className="px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-full">
                Esgotado
              </span>
            )}
          </div>

          {/* Wishlist button - Always visible on mobile */}
          <motion.button
            initial={false}
            animate={{
              opacity: isHovered || isLiked ? 1 : 0.9,
              scale: isHovered || isLiked ? 1 : 0.95
            }}
            whileTap={{ scale: 0.85 }}
            onClick={handleLike}
            className={cn(
              "absolute top-3 right-3 p-3 rounded-full shadow-lg transition-colors z-10 touch-manipulation",
              isLiked ? "bg-gold text-black" : "bg-white/95 text-gray-700 hover:text-gold",
              "opacity-100 md:opacity-0 md:group-hover:opacity-100" // Always visible on mobile
            )}
          >
            <motion.div
              animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart size={20} className={isLiked ? "fill-current" : ""} />
            </motion.div>
          </motion.button>

          {/* Quick actions - Always visible on mobile, hover on desktop */}
          <div
            className={cn(
              "absolute bottom-3 left-3 right-3 flex gap-2 z-10 transition-all duration-300",
              "opacity-100 translate-y-0", // Always visible on mobile
              "md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0"
            )}
          >
            <button
              onClick={handleQuickAdd}
              disabled={!product.available || isAdding}
              className={cn(
                "flex-1 py-3.5 text-sm font-bold rounded-full flex items-center justify-center gap-2 transition-all btn-premium touch-manipulation active:scale-95",
                isAdding
                  ? "bg-green-500 text-white"
                  : product.available
                    ? "bg-white text-black hover:bg-black hover:text-white shadow-lg"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
              )}
            >
              <AnimatePresence mode="wait">
                {isAdding ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Check size={18} />
                    <span>Adicionado!</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="add"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-2"
                  >
                    <ShoppingBag size={18} />
                    <span className="hidden xs:inline">{product.available ? "Adicionar" : "Esgotado"}</span>
                    <span className="xs:hidden">{product.available ? "+" : "X"}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            <Link
              href={`/products/${product.handle}`}
              onClick={(e) => e.stopPropagation()}
              className="p-3.5 bg-white/95 backdrop-blur rounded-full hover:bg-white transition-colors shadow-lg touch-manipulation active:scale-95"
            >
              <Eye size={18} />
            </Link>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <h3 className="font-bold text-sm line-clamp-2 group-hover:text-brand-green dark:group-hover:text-gold transition-colors">
            {product.title}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className={cn(
              "font-bold text-lg",
              product.compareAtPrice && "text-brand-green"
            )}>
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Installments */}
          <p className="text-xs text-gray-500 dark:text-gray-400">
            ou 12x de {formatPrice(product.price / 12)}
          </p>

          {/* Size badge - unique item with single size */}
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-md bg-brand-green/10 dark:bg-gold/10 text-brand-green dark:text-gold border border-brand-green/20 dark:border-gold/20 font-medium">
              Tam: {getProductSize(product)}
            </span>
            <span className="text-xs text-gold font-medium">Peca Unica</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
