"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronDown, X, Grid3X3, LayoutList } from "lucide-react";
import { products, brands, categories } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";

// Map collection slugs to product categories
const categoryMapping: Record<string, string[]> = {
  "roupas": ["Jaquetas", "Moletons", "Calcas", "Camisetas"], // Vestuario
  "acessorios": ["Bones"], // Acessorios
  "tenis": ["Tenis"], // Sneakers
};

// Helper to check if a product is a sneaker
const isSneaker = (product: any): boolean => {
  const title = product.title?.toLowerCase() || '';
  const category = product.category?.toLowerCase() || '';

  // FIRST: If product is already categorized as clothing, it's NOT a sneaker
  const clothingCategories = ['calcas', 'moletons', 'camisetas', 'jaquetas', 'bones'];
  if (clothingCategories.includes(category)) return false;

  // Check if category is explicitly sneakers
  if (category === 'tenis' || category === 'sneakers' || category === 'shoes') return true;

  // Check for clothing keywords in title - these are NOT sneakers
  const clothingKeywords = ['calça', 'calca', 'moletom', 'camiseta', 'jaqueta', 'boné', 'bone', 'hoodie', 'pants', 'jacket'];
  if (clothingKeywords.some(kw => title.includes(kw))) return false;

  return false;
};

// Helper to check if a product is clothing (not sneaker, not accessory)
const isClothing = (product: any): boolean => {
  const category = product.category?.toLowerCase() || '';
  const clothingCategories = ['jaquetas', 'moletons', 'calcas', 'camisetas', 'jacket', 'hoodie', 'pants', 'shirt'];

  // If it's a sneaker, it's not clothing
  if (isSneaker(product)) return false;

  // If it's a hat/accessory, it's not clothing
  if (category === 'bones' || category === 'hats' || category === 'accessories') return false;

  // Check if category matches clothing
  return clothingCategories.some(c => category.includes(c)) ||
         ['jaquetas', 'moletons', 'calcas', 'camisetas'].includes(product.category);
};

const sortOptions = [
  { label: "Mais Recentes", value: "newest" },
  { label: "Menor Preço", value: "price-asc" },
  { label: "Maior Preço", value: "price-desc" },
  { label: "Mais Vendidos", value: "best-selling" },
];

// Extract all unique sizes from products
const getAllSizes = () => {
  const sizeSet = new Set<string>();
  products.forEach((product) => {
    product.variants.forEach((variant) => {
      if (variant.title) {
        sizeSet.add(variant.title);
      }
    });
  });

  // Sort sizes - numeric first, then alpha
  return Array.from(sizeSet).sort((a, b) => {
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    if (!isNaN(aNum) && !isNaN(bNum)) {
      return aNum - bNum;
    }
    // For hat sizes like "7 1/8", "7 1/4", etc.
    if (a.includes("/") && b.includes("/")) {
      const [aWhole, aFrac] = a.split(" ");
      const [bWhole, bFrac] = b.split(" ");
      if (aWhole !== bWhole) {
        return parseFloat(aWhole) - parseFloat(bWhole);
      }
      const fracOrder: Record<string, number> = { "1/8": 1, "1/4": 2, "3/8": 3, "1/2": 4, "5/8": 5, "3/4": 6, "7/8": 7 };
      return (fracOrder[aFrac] || 0) - (fracOrder[bFrac] || 0);
    }
    return a.localeCompare(b);
  });
};

const allSizes = getAllSizes();

// Group sizes by type
const sizeGroups = {
  sneakers: allSizes.filter(s => /^\d{2}(\.\d)?$/.test(s)), // 38, 39, 40, 41, etc.
  hats: allSizes.filter(s => s.includes("/") || s === "Único" || s === "Unico"), // 7 1/8, 7 1/4, etc.
  clothing: allSizes.filter(s => ["P", "M", "G", "GG", "XG", "XS", "S", "L", "XL", "XXL"].includes(s.toUpperCase())),
};

export default function CollectionPage() {
  const params = useParams();
  const handle = params.handle as string;

  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [gridCols, setGridCols] = useState(4);

  // Lock body scroll when mobile filter is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileFilterOpen]);

  // Get collection info
  const collectionTitle = useMemo(() => {
    const category = categories.find((c) => c.slug === handle);
    if (category) return category.name;

    const brand = brands.find((b) => b.slug === handle);
    if (brand) return brand.name;

    if (handle === "new-arrivals") return "Novidades";
    if (handle === "sale" || handle === "promocao") return "Promoções";
    if (handle === "best-sellers") return "Mais Vendidos";

    return "Todos os Produtos";
  }, [handle]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by collection
    if (handle === "sale" || handle === "promocao") {
      result = result.filter((p) => p.compareAtPrice);
    } else if (handle !== "new-arrivals" && handle !== "best-sellers") {
      // Check if we have a category mapping for this handle
      const mappedCategories = categoryMapping[handle];
      const brand = brands.find((b) => b.slug === handle);

      if (handle === 'tenis') {
        // Use smart sneaker detection
        result = result.filter((p) => isSneaker(p));
      } else if (handle === 'roupas') {
        // Use smart clothing detection (excludes sneakers)
        result = result.filter((p) => isClothing(p));
      } else if (mappedCategories) {
        // Filter products that belong to any of the mapped categories
        result = result.filter((p) => mappedCategories.includes(p.category));
      } else if (brand) {
        result = result.filter((p) => p.brand === brand.name);
      }
    }

    // Filter by selected brands
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    // Filter by sizes
    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.variants.some((v) => selectedSizes.includes(v.title) && v.available)
      );
    }

    // Filter by price
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "best-selling":
        // Mock: just reverse for demo
        result.reverse();
        break;
      default:
        // newest - keep original order
        break;
    }

    return result;
  }, [handle, selectedBrands, selectedSizes, priceRange, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedSizes([]);
    setPriceRange([0, 5000]);
  };

  const hasActiveFilters = selectedBrands.length > 0 || selectedSizes.length > 0 || priceRange[0] > 0 || priceRange[1] < 5000;

  // Get available sizes based on current collection
  const availableSizes = useMemo(() => {
    let collectionProducts = [...products];

    if (handle === "sale" || handle === "promocao") {
      collectionProducts = collectionProducts.filter((p) => p.compareAtPrice);
    } else if (handle !== "new-arrivals" && handle !== "best-sellers") {
      const mappedCategories = categoryMapping[handle];
      const brand = brands.find((b) => b.slug === handle);

      if (mappedCategories) {
        collectionProducts = collectionProducts.filter((p) => mappedCategories.includes(p.category));
      } else if (brand) {
        collectionProducts = collectionProducts.filter((p) => p.brand === brand.name);
      }
    }

    const sizesInCollection = new Set<string>();
    collectionProducts.forEach((p) => {
      p.variants.forEach((v) => {
        if (v.title) sizesInCollection.add(v.title);
      });
    });
    return Array.from(sizesInCollection);
  }, [handle]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      {(() => {
        const currentCategory = categories.find((c) => c.slug === handle);
        if (currentCategory) {
          return (
            <div className="bg-white py-8 md:py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center">
                  {/* Category Image - Title is in the image */}
                  <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0">
                    <Image
                      src={currentCategory.image}
                      alt={currentCategory.name}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  {/* Product count only */}
                  <p className="text-brand-green font-medium mt-4">
                    {filteredProducts.length} produto{filteredProducts.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="bg-black text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl font-bold">{collectionTitle}</h1>
              <p className="text-gray-400 mt-2">
                {filteredProducts.length} produto{filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        );
      })()}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            {/* Desktop filter toggle */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="hidden lg:flex items-center gap-2 px-4 py-2 border-2 rounded-full hover:border-black transition-colors font-medium"
            >
              <Filter size={18} />
              Filtros
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-[#d4af37] rounded-full" />
              )}
            </button>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border-2 rounded-full hover:border-black transition-colors font-medium"
            >
              <Filter size={18} />
              Filtros
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-[#d4af37] rounded-full" />
              )}
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-black flex items-center gap-1"
              >
                <X size={14} />
                Limpar filtros
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Grid toggle */}
            <div className="hidden md:flex items-center gap-1 border-2 rounded-full p-1">
              <button
                onClick={() => setGridCols(3)}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  gridCols === 3 ? "bg-black text-white" : "hover:bg-gray-100"
                )}
              >
                <LayoutList size={16} />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  gridCols === 4 ? "bg-black text-white" : "hover:bg-gray-100"
                )}
              >
                <Grid3X3 size={16} />
              </button>
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none px-4 py-2 pr-10 border-2 rounded-full bg-white cursor-pointer hover:border-black transition-colors font-medium"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Active Filters Tags */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedBrands.map((brand) => (
              <button
                key={brand}
                onClick={() => toggleBrand(brand)}
                className="flex items-center gap-1 px-3 py-1 bg-black text-white text-sm rounded-full hover:bg-gray-800"
              >
                {brand}
                <X size={14} />
              </button>
            ))}
            {selectedSizes.map((size) => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className="flex items-center gap-1 px-3 py-1 bg-[#d4af37] text-black text-sm rounded-full hover:bg-[#b8960c]"
              >
                Tam: {size}
                <X size={14} />
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <motion.aside
            initial={false}
            animate={{
              width: isFilterOpen ? 280 : 0,
              opacity: isFilterOpen ? 1 : 0,
            }}
            className="hidden lg:block overflow-hidden flex-shrink-0"
          >
            <div className="w-[280px] space-y-8">
              {/* Brands */}
              <div>
                <h3 className="font-bold text-lg mb-4 text-gray-900">Marcas</h3>
                <div className="space-y-3">
                  {brands.map((brand) => (
                    <label
                      key={brand.slug}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand.name)}
                        onChange={() => toggleBrand(brand.name)}
                        className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black accent-black"
                      />
                      <span className="text-gray-700 group-hover:text-black transition-colors">
                        {brand.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="font-bold text-lg mb-4 text-gray-900">Tamanhos</h3>

                {/* Sneaker Sizes */}
                {sizeGroups.sneakers.length > 0 && sizeGroups.sneakers.some(s => availableSizes.includes(s)) && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">Tênis</p>
                    <div className="flex flex-wrap gap-2">
                      {sizeGroups.sneakers.map((size) => (
                        <button
                          key={size}
                          onClick={() => toggleSize(size)}
                          disabled={!availableSizes.includes(size)}
                          className={cn(
                            "px-3 py-2 text-sm font-medium rounded-lg border-2 transition-all",
                            selectedSizes.includes(size)
                              ? "bg-black text-white border-black"
                              : availableSizes.includes(size)
                              ? "border-gray-200 hover:border-black text-gray-700"
                              : "border-gray-100 text-gray-300 cursor-not-allowed"
                          )}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hat Sizes */}
                {sizeGroups.hats.length > 0 && sizeGroups.hats.some(s => availableSizes.includes(s)) && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">Bonés</p>
                    <div className="flex flex-wrap gap-2">
                      {sizeGroups.hats.map((size) => (
                        <button
                          key={size}
                          onClick={() => toggleSize(size)}
                          disabled={!availableSizes.includes(size)}
                          className={cn(
                            "px-3 py-2 text-sm font-medium rounded-lg border-2 transition-all",
                            selectedSizes.includes(size)
                              ? "bg-black text-white border-black"
                              : availableSizes.includes(size)
                              ? "border-gray-200 hover:border-black text-gray-700"
                              : "border-gray-100 text-gray-300 cursor-not-allowed"
                          )}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Clothing Sizes */}
                {sizeGroups.clothing.length > 0 && sizeGroups.clothing.some(s => availableSizes.includes(s)) && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Roupas</p>
                    <div className="flex flex-wrap gap-2">
                      {sizeGroups.clothing.map((size) => (
                        <button
                          key={size}
                          onClick={() => toggleSize(size)}
                          disabled={!availableSizes.includes(size)}
                          className={cn(
                            "px-3 py-2 text-sm font-medium rounded-lg border-2 transition-all",
                            selectedSizes.includes(size)
                              ? "bg-black text-white border-black"
                              : availableSizes.includes(size)
                              ? "border-gray-200 hover:border-black text-gray-700"
                              : "border-gray-100 text-gray-300 cursor-not-allowed"
                          )}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-bold text-lg mb-4 text-gray-900">Preço</h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full accent-black h-2"
                  />
                  <div className="flex justify-between text-sm">
                    <span className="px-3 py-1 bg-gray-100 rounded-full">R$ {priceRange[0]}</span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full">R$ {priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-bold text-lg mb-4 text-gray-900">Categorias</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/collections/${category.slug}`}
                      className={cn(
                        "block py-2 hover:text-black transition-colors",
                        handle === category.slug
                          ? "text-black font-medium"
                          : "text-gray-500"
                      )}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 mb-4">
                  Nenhum produto encontrado com os filtros selecionados.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors font-medium"
                >
                  Limpar Filtros
                </button>
              </div>
            ) : (
              <div
                className={cn(
                  "grid gap-6",
                  gridCols === 3
                    ? "grid-cols-2 md:grid-cols-3"
                    : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                )}
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-50"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-[85%] max-w-[350px] bg-white z-50 shadow-2xl overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-black text-white sticky top-0 z-10">
                <h2 className="text-lg font-bold">Filtros</h2>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Filter content */}
              <div className="p-4 space-y-6">
                {/* Brands */}
                <div>
                  <h3 className="font-bold text-lg mb-4 text-black">Marcas</h3>
                  <div className="space-y-3">
                    {brands.map((brand) => (
                      <label
                        key={brand.slug}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand.name)}
                          onChange={() => toggleBrand(brand.name)}
                          className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black accent-black"
                        />
                        <span className="text-gray-700 group-hover:text-black transition-colors">
                          {brand.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <h3 className="font-bold text-lg mb-4 text-black">Tamanhos</h3>

                  {/* Sneaker Sizes */}
                  {sizeGroups.sneakers.length > 0 && sizeGroups.sneakers.some(s => availableSizes.includes(s)) && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">Tenis</p>
                      <div className="flex flex-wrap gap-2">
                        {sizeGroups.sneakers.map((size) => (
                          <button
                            key={size}
                            onClick={() => toggleSize(size)}
                            disabled={!availableSizes.includes(size)}
                            className={cn(
                              "px-3 py-2 text-sm font-medium rounded-lg border-2 transition-all",
                              selectedSizes.includes(size)
                                ? "bg-black text-white border-black"
                                : availableSizes.includes(size)
                                ? "border-gray-200 hover:border-black text-gray-700"
                                : "border-gray-100 text-gray-300 cursor-not-allowed"
                            )}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Hat Sizes */}
                  {sizeGroups.hats.length > 0 && sizeGroups.hats.some(s => availableSizes.includes(s)) && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">Bones</p>
                      <div className="flex flex-wrap gap-2">
                        {sizeGroups.hats.map((size) => (
                          <button
                            key={size}
                            onClick={() => toggleSize(size)}
                            disabled={!availableSizes.includes(size)}
                            className={cn(
                              "px-3 py-2 text-sm font-medium rounded-lg border-2 transition-all",
                              selectedSizes.includes(size)
                                ? "bg-black text-white border-black"
                                : availableSizes.includes(size)
                                ? "border-gray-200 hover:border-black text-gray-700"
                                : "border-gray-100 text-gray-300 cursor-not-allowed"
                            )}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Clothing Sizes */}
                  {sizeGroups.clothing.length > 0 && sizeGroups.clothing.some(s => availableSizes.includes(s)) && (
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Roupas</p>
                      <div className="flex flex-wrap gap-2">
                        {sizeGroups.clothing.map((size) => (
                          <button
                            key={size}
                            onClick={() => toggleSize(size)}
                            disabled={!availableSizes.includes(size)}
                            className={cn(
                              "px-3 py-2 text-sm font-medium rounded-lg border-2 transition-all",
                              selectedSizes.includes(size)
                                ? "bg-black text-white border-black"
                                : availableSizes.includes(size)
                                ? "border-gray-200 hover:border-black text-gray-700"
                                : "border-gray-100 text-gray-300 cursor-not-allowed"
                            )}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-bold text-lg mb-4 text-black">Preco</h3>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="w-full accent-black h-2"
                    />
                    <div className="flex justify-between text-sm">
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-700">R$ {priceRange[0]}</span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-700">R$ {priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="font-bold text-lg mb-4 text-black">Categorias</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/collections/${category.slug}`}
                        onClick={() => setIsMobileFilterOpen(false)}
                        className={cn(
                          "block py-2 transition-colors",
                          handle === category.slug
                            ? "text-black font-medium"
                            : "text-gray-500 hover:text-black"
                        )}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Apply button */}
              <div className="sticky bottom-0 p-4 bg-white border-t border-gray-100">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-colors"
                >
                  Ver {filteredProducts.length} Produtos
                </button>
                {hasActiveFilters && (
                  <button
                    onClick={() => {
                      clearFilters();
                      setIsMobileFilterOpen(false);
                    }}
                    className="w-full py-3 mt-2 text-gray-500 font-medium hover:text-black transition-colors"
                  >
                    Limpar Filtros
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
