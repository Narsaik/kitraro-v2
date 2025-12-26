import { HomePage } from "@/components/home/HomePage";
import { getProducts, getFeaturedProducts, getNewArrivals } from "@/lib/shopify/data";
import type { Product } from "@/lib/shopify/types";

// Default brand/category data (fallback if products don't have this info)
const defaultBrands = [
  { name: "Nike", slug: "nike", logo: "https://cdn.shopify.com/s/files/1/0796/5236/2018/files/nike-logo.png?v=1697654321" },
  { name: "BAPE", slug: "bape", logo: "https://cdn.shopify.com/s/files/1/0796/5236/2018/files/bape-logo.png?v=1697654321" },
  { name: "Air Jordan", slug: "air-jordan", logo: "https://cdn.shopify.com/s/files/1/0796/5236/2018/files/jordan-logo.png?v=1697654321" },
  { name: "New Era", slug: "new-era", logo: "https://cdn.shopify.com/s/files/1/0796/5236/2018/files/newera-logo.png?v=1697654321" },
];

const defaultCategories = [
  {
    name: "Tenis",
    slug: "tenis",
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800",
    description: "Nike, Jordan, Dunk e mais",
    count: 0,
  },
  {
    name: "Bones",
    slug: "bones",
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800",
    description: "New Era, Snapback, Fitted",
    count: 0,
  },
  {
    name: "Jaquetas",
    slug: "jaquetas",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800",
    description: "BAPE, Nike, Vintage",
    count: 0,
  },
  {
    name: "Moletons",
    slug: "moletons",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800",
    description: "Hoodies e Crewnecks",
    count: 0,
  },
  {
    name: "Calcas",
    slug: "calcas",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800",
    description: "Joggers, Cargo, Jeans",
    count: 0,
  },
];

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  // Fetch products from Shopify
  let featuredProducts: Product[] = [];
  let newArrivals: Product[] = [];
  let brands = defaultBrands;
  let categories = defaultCategories;

  try {
    const [featured, arrivals, allProducts] = await Promise.all([
      getFeaturedProducts(),
      getNewArrivals(),
      getProducts(100),
    ]);

    featuredProducts = featured;
    newArrivals = arrivals;

    // Build brands from products
    const brandCounts = new Map<string, number>();
    allProducts.forEach(p => {
      if (p.brand) {
        brandCounts.set(p.brand, (brandCounts.get(p.brand) || 0) + 1);
      }
    });

    if (brandCounts.size > 0) {
      brands = Array.from(brandCounts.entries())
        .map(([name, count]) => ({
          name,
          slug: name.toLowerCase().replace(/\s+/g, '-'),
          logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=000&color=fff&size=60`,
        }))
        .slice(0, 6);
    }

    // Build categories from products
    const categoryCounts = new Map<string, number>();
    allProducts.forEach(p => {
      if (p.category) {
        categoryCounts.set(p.category, (categoryCounts.get(p.category) || 0) + 1);
      }
    });

    if (categoryCounts.size > 0) {
      categories = defaultCategories.map(cat => ({
        ...cat,
        count: categoryCounts.get(cat.name) || 0,
      }));
    }
  } catch (error) {
    console.error('Failed to fetch products for homepage:', error);
    // Continue with empty arrays - the page will still render
  }

  return (
    <HomePage
      featuredProducts={featuredProducts}
      newArrivals={newArrivals}
      brands={brands}
      categories={categories}
    />
  );
}
