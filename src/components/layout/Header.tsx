"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Menu, X, User, ChevronRight, ChevronDown, Heart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";
import { brands } from "@/data/products";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navigation: { name: string; href: string; image?: string; megaMenu?: boolean }[] = [
  { name: "Vestuario", href: "/collections/roupas", image: "/categories/clothing.png" },
  { name: "Acessorios", href: "/collections/acessorios", image: "/categories/accessories.png" },
  { name: "Sneakers", href: "/collections/tenis", image: "/categories/sneakers.png" },
  { name: "Marcas", href: "/brands", megaMenu: true },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  const [isMobileBrandsOpen, setIsMobileBrandsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toggleCart, totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const itemCount = totalItems();
  const wishlistCount = wishlistItems.length;
  const router = useRouter();
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsMobileBrandsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white text-gray-900 shadow-sm transition-colors">
      {/* Top banner - Luxury Dark Green */}
      <div className="bg-brand-green text-white text-center py-1.5 md:py-2 text-xs md:text-sm font-medium tracking-wider">
        <span className="text-gold-light">STREETWEAR DE LUXO</span> NO BRASIL
      </div>

      <nav className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-24">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 -ml-2 text-gray-900"
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo - Smaller on mobile */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Kit Raro"
                width={220}
                height={70}
                className="h-10 md:h-14 lg:h-16 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.megaMenu && setIsBrandsOpen(true)}
                  onMouseLeave={() => item.megaMenu && setIsBrandsOpen(false)}
                >
                  <Link
                    href={item.href}
                    className="flex flex-col items-center gap-1 group"
                  >
                    {item.image ? (
                      <div className="w-16 h-16 rounded-xl overflow-hidden group-hover:ring-2 group-hover:ring-brand-green transition-all">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <span className="text-sm font-medium text-gray-900 group-hover:text-brand-green transition-colors">
                        {item.name}
                      </span>
                    )}
                  </Link>

                  {/* Mega menu for brands */}
                  {item.megaMenu && (
                    <AnimatePresence>
                      {isBrandsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[400px]"
                        >
                          <div className="bg-white text-gray-900 rounded-lg shadow-xl p-6 grid grid-cols-2 gap-4 border border-gray-100">
                            {brands.map((brand) => (
                              <Link
                                key={brand.slug}
                                href={`/brands/${brand.slug}`}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center p-1">
                                  <Image
                                    src={brand.logo}
                                    alt={brand.name}
                                    width={32}
                                    height={32}
                                    className="object-contain"
                                  />
                                </div>
                                <span className="font-medium text-gray-900">{brand.name}</span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* Right icons - Hidden on mobile (moved to bottom nav) */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search - hidden on mobile, in bottom nav */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hidden lg:block p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-900"
                aria-label="Buscar"
              >
                <Search size={20} />
              </button>

              {/* Wishlist - hidden on mobile, in bottom nav */}
              <Link
                href="/wishlist"
                className="hidden lg:block p-2 hover:bg-gray-100 rounded-full transition-colors relative text-gray-900"
                aria-label="Favoritos"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </Link>

              {/* Theme toggle - always visible */}
              <ThemeToggle />

              {/* Account - hidden on mobile */}
              <Link
                href="/account"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden lg:block text-gray-900"
                aria-label="Conta"
              >
                <User size={20} />
              </Link>

              {/* Cart - hidden on mobile, in bottom nav */}
              <button
                onClick={toggleCart}
                className="hidden lg:block p-2 hover:bg-gray-100 rounded-full transition-colors relative text-gray-900"
                aria-label="Carrinho"
              >
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-white text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-gray-100 overflow-hidden bg-gray-50"
            >
              <form onSubmit={handleSearch} className="max-w-7xl mx-auto px-4 py-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar produtos..."
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold"
                    autoFocus
                  />
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile menu - Full screen overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
            />

            {/* Slide-in menu */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-white z-50 shadow-2xl overflow-y-auto"
            >
              {/* Menu header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-brand-green">
                <Image
                  src="/logo.png"
                  alt="Kit Raro"
                  width={140}
                  height={45}
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Fechar menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Search in mobile menu */}
              <div className="p-4 border-b border-gray-100">
                <form onSubmit={(e) => { handleSearch(e); setIsMenuOpen(false); }}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar produtos..."
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold text-sm"
                    />
                  </div>
                </form>
              </div>

              {/* Navigation links */}
              <nav className="p-4 space-y-1">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.megaMenu ? (
                      // Brands with expandable submenu
                      <div>
                        <button
                          onClick={() => setIsMobileBrandsOpen(!isMobileBrandsOpen)}
                          className="w-full flex items-center justify-between py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors text-gray-900 font-medium"
                        >
                          <span>{item.name}</span>
                          <motion.div
                            animate={{ rotate: isMobileBrandsOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown size={20} className="text-gray-400" />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {isMobileBrandsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 py-2 space-y-1">
                                {brands.map((brand) => (
                                  <Link
                                    key={brand.slug}
                                    href={`/brands/${brand.slug}`}
                                    className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center p-1">
                                      <Image
                                        src={brand.logo}
                                        alt={brand.name}
                                        width={24}
                                        height={24}
                                        className="object-contain"
                                      />
                                    </div>
                                    <span className="text-sm text-gray-700">{brand.name}</span>
                                    <ChevronRight size={16} className="ml-auto text-gray-400" />
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors text-gray-900 font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span>{item.name}</span>
                        <ChevronRight size={20} className="text-gray-400" />
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Bottom actions */}
              <div className="p-4 mt-auto border-t border-gray-100">
                <Link
                  href="/account"
                  className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={20} />
                  <span className="font-medium">Minha Conta</span>
                </Link>
              </div>

              {/* Footer info */}
              <div className="p-4 bg-gray-50 text-center">
                <p className="text-xs text-gray-500">
                  Frete gratis acima de R$ 500
                </p>
                <p className="text-xs text-gold font-medium mt-1">
                  100% Produtos Autenticos
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
