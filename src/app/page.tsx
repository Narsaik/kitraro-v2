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

    // Filter for premium products: no hats, only items R$180+
    const isHat = (p: Product) =>
      p.category?.toLowerCase().includes('bone') ||
      p.title?.toLowerCase().includes('new era') ||
      p.title?.toLowerCase().includes('59fifty') ||
      p.title?.toLowerCase().includes('fitted') ||
      p.title?.toLowerCase().includes('snapback');

    const premiumProducts = allProducts
      .filter(p =>
        p.available &&
        p.price >= 180 &&
        !isHat(p)
      );

    // Mais Exclusivos: Only 4 premium products
    featuredProducts = premiumProducts.slice(0, 4);

    // Novidades: 8 products - take the next premium products + other available products
    const featuredIds = new Set(featuredProducts.map(p => p.id));
    const remainingPremium = premiumProducts.slice(4, 8); // Next 4 premium products

    // Fill the rest with other available products (not in featured, not already selected)
    const usedIds = new Set([...featuredIds, ...remainingPremium.map(p => p.id)]);
    const otherProducts = allProducts
      .filter(p => p.available && !usedIds.has(p.id))
      .slice(0, 8 - remainingPremium.length);

    newArrivals = [...remainingPremium, ...otherProducts].slice(0, 8);

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
