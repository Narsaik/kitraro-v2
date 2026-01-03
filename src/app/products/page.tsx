"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Filter, ChevronDown, X, Grid3X3, LayoutList } from "lucide-react";
import { products, brands, categories } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";

// Map main categories to product sub-categories
const categoryMapping: Record<string, string[]> = {
  "Vestuario": ["Jaquetas", "Moletons", "Calcas", "Camisetas"],
  "Acessorios": ["Bones"],
  "Sneakers": ["Tenis"],
};

const sortOptions = [
  { label: "Mais Recentes", value: "newest" },
  { label: "Menor Preco", value: "price-asc" },
  { label: "Maior Preco", value: "price-desc" },
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
  hats: allSizes.filter(s => s.includes("/")), // 7 1/8, 7 1/4, etc.
  clothing: allSizes.filter(s => ["P", "M", "G", "GG", "XG", "S", "L", "XL", "XXL"].includes(s.toUpperCase())),
};

export default function ProductsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [gridCols, setGridCols] = useState(4);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by brands
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    // Filter by categories (using mapping)
    if (selectedCategories.length > 0) {
      const mappedProductCategories = selectedCategories.flatMap(
        (cat) => categoryMapping[cat] || [cat]
      );
      result = result.filter((p) => mappedProductCategories.includes(p.category));
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
        result.reverse();
        break;
      default:
        break;
    }

    return result;
  }, [selectedBrands, selectedCategories, selectedSizes, priceRange, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedSizes([]);
    setPriceRange([0, 5000]);
  };

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedCategories.length > 0 ||
    selectedSizes.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 5000;

  // Get available sizes based on current category filter
  const availableSizes = useMemo(() => {
    if (selectedCategories.length === 0) return allSizes;

    const sizesInCategory = new Set<string>();
    products
      .filter((p) => selectedCategories.includes(p.category))
      .forEach((p) => {
        p.variants.forEach((v) => {
          if (v.title) sizesInCategory.add(v.title);
        });
      });
    return Array.from(sizesInCategory);
  }, [selectedCategories]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold"
          >
            Todos os Produtos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mt-2"
          >
            {filteredProducts.length} produto{filteredProducts.length !== 1 ? "s" : ""}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 border-2 rounded-full hover:border-black transition-colors font-medium"
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
            {selectedCategories.map((category) => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className="flex items-center gap-1 px-3 py-1 bg-black text-white text-sm rounded-full hover:bg-gray-800"
              >
                {category}
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

              {/* Categories */}
              <div>
                <h3 className="font-bold text-lg mb-4 text-gray-900">Categorias</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <label
                      key={category.slug}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.name)}
                        onChange={() => toggleCategory(category.name)}
                        className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black accent-black"
                      />
                      <span className="text-gray-700 group-hover:text-black transition-colors">
                        {category.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="font-bold text-lg mb-4 text-gray-900">Tamanhos</h3>

                {/* Sneaker Sizes */}
                {sizeGroups.sneakers.length > 0 && (
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
                {sizeGroups.hats.length > 0 && (
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
                {sizeGroups.clothing.length > 0 && (
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
                <h3 className="font-bold text-lg mb-4 text-gray-900">Preco</h3>
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
    </div>
  );
}
