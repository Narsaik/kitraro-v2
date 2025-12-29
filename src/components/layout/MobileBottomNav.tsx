"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Search, Grid3X3, Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { name: "Inicio", href: "/", icon: Home },
  { name: "Buscar", href: "/search", icon: Search },
  { name: "Explorar", href: "/products", icon: Grid3X3 },
  { name: "Favoritos", href: "/wishlist", icon: Heart },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { toggleCart, totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const cartCount = totalItems();
  const wishlistCount = wishlistItems.length;
  const [isPressed, setIsPressed] = useState<string | null>(null);

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href === "/products" && pathname.startsWith("/products")) ||
            (item.href === "/products" && pathname.startsWith("/collections")) ||
            (item.href === "/products" && pathname.startsWith("/brands"));
          const Icon = item.icon;
          const showBadge = item.href === "/wishlist" && wishlistCount > 0;

          return (
            <Link
              key={item.name}
              href={item.href}
              onTouchStart={() => setIsPressed(item.name)}
              onTouchEnd={() => setIsPressed(null)}
              className={cn(
                "relative flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-all active:scale-95",
                isActive
                  ? "text-brand-green dark:text-gold"
                  : "text-gray-500 dark:text-gray-400",
                isPressed === item.name && "bg-gray-100 dark:bg-gray-800"
              )}
            >
              <div className="relative">
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={cn(
                    "transition-transform",
                    isActive && "scale-110"
                  )}
                />
                {showBadge && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </motion.span>
                )}
              </div>
              <span className={cn(
                "text-[10px] mt-1 font-medium",
                isActive && "font-semibold"
              )}>
                {item.name}
              </span>
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute -top-0.5 w-8 h-1 bg-brand-green dark:bg-gold rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          );
        })}

        {/* Cart button */}
        <button
          onClick={toggleCart}
          onTouchStart={() => setIsPressed("cart")}
          onTouchEnd={() => setIsPressed(null)}
          className={cn(
            "relative flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-all active:scale-95 text-gray-500 dark:text-gray-400",
            isPressed === "cart" && "bg-gray-100 dark:bg-gray-800"
          )}
        >
          <div className="relative">
            <ShoppingBag size={22} strokeWidth={2} />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gold text-black text-[10px] font-bold rounded-full flex items-center justify-center"
              >
                {cartCount > 9 ? "9+" : cartCount}
              </motion.span>
            )}
          </div>
          <span className="text-[10px] mt-1 font-medium">Carrinho</span>
        </button>
      </div>
    </nav>
  );
}
