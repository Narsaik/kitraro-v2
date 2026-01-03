// Server-side data fetching - uses static data with Shopify fallback
import {
  getAllProducts,
  getProductByHandle,
  getCollections,
  getCollectionByHandle,
  searchProducts,
  getProductsByVendor,
  getProductsByType,
} from './index';
import type { Product, Collection } from './types';
import { products as staticProducts } from '@/data/products';

// Cache for server-side rendering
let productsCache: Product[] | null = null;
let productsCacheTime = 0;
const CACHE_DURATION = 60 * 1000; // 1 minute cache

export async function getProducts(limit: number = 100): Promise<Product[]> {
  const now = Date.now();

  // Return cached products if still valid
  if (productsCache && now - productsCacheTime < CACHE_DURATION) {
    return productsCache.slice(0, limit);
  }

  try {
    const products = await getAllProducts(limit);
    productsCache = products;
    productsCacheTime = now;
    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    // Return cached data if available, even if stale
    if (productsCache) return productsCache.slice(0, limit);
    return [];
  }
}

export async function getProduct(handle: string): Promise<Product | null> {
  // First check static data (this is the source of truth for descriptions)
  const staticProduct = staticProducts.find(p => p.handle === handle);

  if (staticProduct) {
    // Return static product data (includes updated descriptions)
    return {
      id: staticProduct.id,
      handle: staticProduct.handle,
      title: staticProduct.title,
      description: staticProduct.description,
      descriptionHtml: staticProduct.description,
      brand: staticProduct.brand,
      category: staticProduct.category,
      price: staticProduct.price,
      compareAtPrice: staticProduct.compareAtPrice || null,
      currency: staticProduct.currency,
      images: staticProduct.images,
      variants: staticProduct.variants.map(v => ({
        id: v.id,
        title: v.title,
        available: v.available,
        quantity: 1,
        price: v.price,
        compareAtPrice: null,
        options: { Size: v.size || v.title },
        image: null,
      })),
      options: [{
        id: 'size',
        name: 'Tamanho',
        values: staticProduct.variants.map(v => v.size || v.title),
      }],
      tags: staticProduct.tags,
      available: staticProduct.available,
    };
  }

  // Fallback to Shopify API if not in static data
  try {
    return await getProductByHandle(handle);
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts(100);
  // Featured = most expensive products, sorted from highest to lowest price
  return products
    .filter(p => p.available)
    .sort((a, b) => b.price - a.price)
    .slice(0, 8);
}

export async function getNewArrivals(): Promise<Product[]> {
  const products = await getProducts(100);
  // New arrivals = first 16 available products
  return products.filter(p => p.available).slice(0, 16);
}

export async function getSaleProducts(): Promise<Product[]> {
  const products = await getProducts(50);
  return products.filter(p => p.compareAtPrice && p.compareAtPrice > p.price);
}

export async function getProductsByBrand(brand: string): Promise<Product[]> {
  try {
    return await getProductsByVendor(brand);
  } catch (error) {
    console.error('Failed to fetch products by brand:', error);
    return [];
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    return await getProductsByType(category);
  } catch (error) {
    console.error('Failed to fetch products by category:', error);
    return [];
  }
}

export async function getBrands(): Promise<{ name: string; slug: string; count: number }[]> {
  const products = await getProducts(100);
  const brandCounts = new Map<string, number>();

  products.forEach(p => {
    if (p.brand) {
      brandCounts.set(p.brand, (brandCounts.get(p.brand) || 0) + 1);
    }
  });

  return Array.from(brandCounts.entries())
    .map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

export async function getCategories(): Promise<{ name: string; slug: string; count: number }[]> {
  const products = await getProducts(100);
  const categoryCounts = new Map<string, number>();

  products.forEach(p => {
    if (p.category) {
      categoryCounts.set(p.category, (categoryCounts.get(p.category) || 0) + 1);
    }
  });

  return Array.from(categoryCounts.entries())
    .map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

export async function search(query: string): Promise<Product[]> {
  try {
    return await searchProducts(query);
  } catch (error) {
    console.error('Failed to search products:', error);
    return [];
  }
}

// Re-export for convenience
export { getCollections, getCollectionByHandle };
export type { Product, Collection };
