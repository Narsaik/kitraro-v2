import { HomePage } from "@/components/home/HomePage";
import { getProducts, getFeaturedProducts, getNewArrivals } from "@/lib/shopify/data";
import { brands as dataBrands, categories as dataCategories } from "@/data/products";
import type { Product } from "@/lib/shopify/types";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  // Fetch products from Shopify
  let featuredProducts: Product[] = [];
  let newArrivals: Product[] = [];
  let heroProducts: Product[] = [];
  const brands = dataBrands;
  const categories = dataCategories;

  try {
    const [featured, arrivals, allProducts] = await Promise.all([
      getFeaturedProducts(),
      getNewArrivals(),
      getProducts(100),
    ]);

    // Helper to detect hats
    const isHat = (p: Product) =>
      p.category?.toLowerCase().includes('bone') ||
      p.title?.toLowerCase().includes('new era') ||
      p.title?.toLowerCase().includes('59fifty') ||
      p.title?.toLowerCase().includes('fitted') ||
      p.title?.toLowerCase().includes('snapback');

    // Mais Exclusivos: Top 4 most expensive non-hat products
    const premiumProducts = allProducts
      .filter(p => p.available && !isHat(p))
      .sort((a, b) => b.price - a.price); // Sort by price, highest first

    featuredProducts = premiumProducts.slice(0, 4);

    // Novidades: 16 products with max 1 hat, sorted by price (most expensive first)
    const featuredIds = new Set(featuredProducts.map(p => p.id));

    // Get non-hat products for novidades (excluding featured), sorted by price
    const nonHatProducts = allProducts
      .filter(p => p.available && !featuredIds.has(p.id) && !isHat(p))
      .sort((a, b) => b.price - a.price)
      .slice(0, 15);

    // Get 1 hat (most expensive one)
    const oneHat = allProducts
      .filter(p => p.available && isHat(p))
      .sort((a, b) => b.price - a.price)
      .slice(0, 1);

    // Combine and sort by price: 15 non-hats + 1 hat = 16 products
    newArrivals = [...nonHatProducts, ...oneHat]
      .sort((a, b) => b.price - a.price)
      .slice(0, 16);

    // Get New Era hats for hero slideshow (filter by brand or category)
    heroProducts = allProducts
      .filter(p =>
        p.brand?.toLowerCase().includes('new era') ||
        p.title?.toLowerCase().includes('new era') ||
        p.title?.toLowerCase().includes('59fifty') ||
        p.category?.toLowerCase().includes('bone')
      )
      .slice(0, 5); // Get up to 5 products for slideshow

    // Brands and categories are imported from data/products.ts
  } catch (error) {
    console.error('Failed to fetch products for homepage:', error);
    // Continue with empty arrays - the page will still render
  }

  return (
    <HomePage
      featuredProducts={featuredProducts}
      newArrivals={newArrivals}
      heroProducts={heroProducts}
      brands={brands}
      categories={categories}
    />
  );
}
