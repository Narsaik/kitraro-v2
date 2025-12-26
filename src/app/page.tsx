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
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/af407252-b94c-4c46-9357-4e82f4d98776/AIR+JORDAN+1+RETRO+HIGH+OG.png",
    description: "Air Jordan, Nike Dunk e mais",
    count: 0,
  },
  {
    name: "Bones",
    slug: "bones",
    image: "https://cdn.shopify.com/s/files/1/0966/5236/2018/files/PHOTO-2025-10-04-12-01-11_1.jpg?v=1763667524",
    description: "New Era, Snapback, Fitted",
    count: 0,
  },
  {
    name: "Jaquetas",
    slug: "jaquetas",
    image: "https://cdn.shopify.com/s/files/1/0966/5236/2018/files/9FB083E7-B901-4B93-A3CE-FAC32962047C.jpg?v=1759206150",
    description: "BAPE, Nike, Vintage",
    count: 0,
  },
  {
    name: "Moletons",
    slug: "moletons",
    image: "https://cdn.shopify.com/s/files/1/0966/5236/2018/files/0CA6885F-2005-44AE-93A2-DB0C8B40AF73.jpg?v=1765829170",
    description: "Jordan, Nike Hoodies",
    count: 0,
  },
  {
    name: "Calcas",
    slug: "calcas",
    image: "https://cdn.shopify.com/s/files/1/0966/5236/2018/files/4897AAE7-0969-4DE8-AF8A-83DA62FC0E35.jpg?v=1760711363",
    description: "Jordan, Nike, Cargo",
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
