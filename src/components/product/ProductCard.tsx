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
        <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4">
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
                className="px-3 py-1.5 bg-[#d4af37] text-black text-xs font-bold rounded-full shadow-lg"
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

          {/* Wishlist button */}
          <motion.button
            initial={false}
            animate={{ opacity: isHovered || isLiked ? 1 : 0, scale: isHovered || isLiked ? 1 : 0.8 }}
            whileTap={{ scale: 0.85 }}
            onClick={handleLike}
            className={cn(
              "absolute top-3 right-3 p-2.5 rounded-full shadow-lg transition-colors z-10",
              isLiked ? "bg-[#d4af37] text-black" : "bg-white text-gray-700 hover:text-[#d4af37]"
            )}
          >
            <motion.div
              animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart size={18} className={isLiked ? "fill-current" : ""} />
            </motion.div>
          </motion.button>

          {/* Quick actions */}
          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-4 right-4 flex gap-2 z-10"
          >
            <motion.button
              onClick={handleQuickAdd}
              disabled={!product.available || isAdding}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "flex-1 py-3 text-sm font-bold rounded-full flex items-center justify-center gap-2 transition-all btn-premium",
                isAdding
                  ? "bg-green-500 text-white"
                  : product.available
                    ? "bg-white text-black hover:bg-black hover:text-white"
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
                    <Check size={16} />
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
                    <ShoppingBag size={16} />
                    <span>{product.available ? "Adicionar" : "Esgotado"}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
            <motion.button
              onClick={(e) => e.preventDefault()}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white/90 backdrop-blur rounded-full hover:bg-white transition-colors"
            >
              <Eye size={16} />
            </motion.button>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
            {product.brand}
          </p>
          <h3 className="font-bold text-sm line-clamp-2 group-hover:text-[#0a2e0a] transition-colors">
            {product.title}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className={cn(
              "font-bold text-lg",
              product.compareAtPrice && "text-[#0a2e0a]"
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
          <p className="text-xs text-gray-500">
            ou 12x de {formatPrice(product.price / 12)}
          </p>

          {/* Available sizes */}
          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0.7, height: isHovered ? "auto" : "24px" }}
            className="flex gap-1.5 flex-wrap overflow-hidden"
          >
            {product.variants.slice(0, 6).map((variant) => (
              <span
                key={variant.id}
                className={cn(
                  "text-xs px-2 py-1 rounded-md border transition-all",
                  variant.available
                    ? "border-gray-300 text-gray-700 hover:border-black"
                    : "border-gray-100 text-gray-300 line-through"
                )}
              >
                {variant.title}
              </span>
            ))}
            {product.variants.length > 6 && (
              <span className="text-xs text-gray-400 px-2 py-1">
                +{product.variants.length - 6}
              </span>
            )}
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
