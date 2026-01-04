"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/shopify/types";
import { formatPrice, calculateDiscount, cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
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

  // Check variant title if not default
  const variant = product.variants.find(v => v.available) || product.variants[0];

  // Check variant size property directly (from static data)
  if (variant?.size && variant.size !== "Unico" && variant.size !== "Default Title") {
    return variant.size;
  }

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
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const discount = calculateDiscount(product.price, product.compareAtPrice);
  const { addItem } = useCart();
  const { addToast } = useToastStore();

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
        <div className="relative aspect-square bg-background-secondary rounded-2xl overflow-hidden mb-4 ring-2 ring-transparent group-hover:ring-brand-green/30 transition-all">
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

          {/* Badges - Only discount badge */}
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
          </div>

          {/* SOLD OUT badge - Top right corner */}
          {!product.available && (
            <div className="absolute top-3 right-3 z-10">
              <span className="px-2.5 py-1 bg-red-600 text-white text-xs font-bold uppercase tracking-wide rounded-md shadow-md">
                ESGOTADO
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-2 flex flex-col">
          <h3 className="font-bold text-sm line-clamp-2 min-h-[2.5rem] text-foreground group-hover:text-brand-green transition-colors">
            {product.title}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2 h-7">
            <span className={cn(
              "font-bold text-lg",
              product.compareAtPrice ? "text-brand-green" : "text-foreground"
            )}>
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-foreground-secondary line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Installments */}
          <p className="text-xs text-foreground-secondary">
            ou 12x de {formatPrice(product.price / 12)}
          </p>

          {/* Size badge - unique item with single size */}
          <div className="flex items-center gap-2 h-6">
            <span className="text-xs px-2.5 py-1 rounded-md bg-brand-green/10 text-brand-green border border-brand-green/20 font-medium">
              Tam: {getProductSize(product)}
            </span>
            <span className="text-xs text-gold font-medium">Peca Unica</span>
          </div>

          {/* Small Add to Cart button */}
          <button
            onClick={handleQuickAdd}
            disabled={!product.available || isAdding}
            className={cn(
              "w-full py-2 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-all touch-manipulation active:scale-[0.98] mt-2",
              isAdding
                ? "bg-green-500 text-white"
                : product.available
                  ? "bg-brand-green text-white hover:bg-brand-green-light"
                  : "bg-background-secondary text-foreground-secondary cursor-not-allowed"
            )}
          >
            <AnimatePresence mode="wait">
              {isAdding ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-1.5"
                >
                  <Check size={14} />
                  <span>Adicionado!</span>
                </motion.div>
              ) : (
                <motion.div
                  key="add"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-1.5"
                >
                  <ShoppingBag size={14} />
                  <span>{product.available ? "Adicionar ao Carrinho" : "Esgotado"}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </Link>
    </motion.div>
  );
}
