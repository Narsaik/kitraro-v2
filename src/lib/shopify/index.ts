// Shopify Admin API Client
import { GraphQLClient } from 'graphql-request';
import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_HANDLE,
  GET_COLLECTIONS,
  GET_COLLECTION_BY_HANDLE,
  SEARCH_PRODUCTS,
} from './queries';
import type { Product, ProductVariant, ProductOption, Collection } from './types';

// Environment variables
const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_ADMIN_API_TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN;
const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION || '2024-10';

if (!SHOPIFY_STORE_DOMAIN) {
  console.warn('Missing SHOPIFY_STORE_DOMAIN environment variable');
}

if (!SHOPIFY_ADMIN_API_TOKEN) {
  console.warn('Missing SHOPIFY_ADMIN_API_TOKEN environment variable');
}

// Create GraphQL client for Admin API
const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`;

const client = new GraphQLClient(endpoint, {
  headers: {
    'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_TOKEN || '',
    'Content-Type': 'application/json',
  },
});

// Transform Shopify product to our frontend format
function transformProduct(shopifyProduct: any): Product {
  const minPrice = parseFloat(shopifyProduct.priceRangeV2?.minVariantPrice?.amount || '0');
  const currency = shopifyProduct.priceRangeV2?.minVariantPrice?.currencyCode || 'BRL';

  // Get compareAtPrice from the first variant that has one
  const firstVariantWithCompare = shopifyProduct.variants?.edges?.find(
    (edge: any) => edge.node.compareAtPrice && parseFloat(edge.node.compareAtPrice) > 0
  );
  const compareAtPrice = firstVariantWithCompare
    ? parseFloat(firstVariantWithCompare.node.compareAtPrice)
    : 0;

  const variants: ProductVariant[] = (shopifyProduct.variants?.edges || []).map((edge: any) => {
    const variant = edge.node;
    const options: Record<string, string> = {};
    (variant.selectedOptions || []).forEach((opt: any) => {
      options[opt.name] = opt.value;
    });

    return {
      id: variant.id,
      title: variant.title,
      available: variant.availableForSale,
      quantity: variant.inventoryQuantity || 0,
      price: parseFloat(variant.price || '0'),
      compareAtPrice: variant.compareAtPrice ? parseFloat(variant.compareAtPrice) : null,
      options,
      image: variant.image?.url || null,
    };
  });

  const options: ProductOption[] = (shopifyProduct.options || []).map((opt: any) => ({
    id: opt.id,
    name: opt.name,
    values: opt.values,
  }));

  const images = (shopifyProduct.images?.edges || []).map((edge: any) => edge.node.url);

  return {
    id: shopifyProduct.id,
    handle: shopifyProduct.handle,
    title: shopifyProduct.title,
    description: shopifyProduct.description || '',
    descriptionHtml: shopifyProduct.descriptionHtml || '',
    brand: shopifyProduct.vendor || '',
    category: shopifyProduct.productType || '',
    price: minPrice,
    compareAtPrice: compareAtPrice > minPrice ? compareAtPrice : null,
    currency,
    images,
    variants,
    options,
    tags: shopifyProduct.tags || [],
    available: shopifyProduct.totalInventory > 0 || variants.some(v => v.available),
  };
}

// API Functions
export async function getAllProducts(first: number = 50): Promise<Product[]> {
  try {
    const allProducts: Product[] = [];
    let hasNextPage = true;
    let afterCursor: string | null = null;

    while (hasNextPage) {
      const data: any = await client.request(GET_ALL_PRODUCTS, {
        first: Math.min(first, 250),
        after: afterCursor,
      });

      const products = data.products.edges.map((edge: any) => transformProduct(edge.node));
      allProducts.push(...products);

      hasNextPage = data.products.pageInfo.hasNextPage;
      afterCursor = data.products.pageInfo.endCursor;

      // Safety limit
      if (allProducts.length >= first) {
        break;
      }
    }

    return allProducts.slice(0, first);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  try {
    const data: any = await client.request(GET_PRODUCT_BY_HANDLE, { handle });

    if (!data.productByHandle) {
      return null;
    }

    return transformProduct(data.productByHandle);
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

export async function getCollections(first: number = 20): Promise<Collection[]> {
  try {
    const data: any = await client.request(GET_COLLECTIONS, { first });

    return data.collections.edges.map((edge: any) => ({
      id: edge.node.id,
      handle: edge.node.handle,
      title: edge.node.title,
      description: edge.node.description || '',
      image: edge.node.image?.url || null,
      products: [],
    }));
  } catch (error) {
    console.error('Error fetching collections:', error);
    throw error;
  }
}

export async function getCollectionByHandle(handle: string, productCount: number = 50): Promise<Collection | null> {
  try {
    const data: any = await client.request(GET_COLLECTION_BY_HANDLE, {
      handle,
      first: productCount
    });

    if (!data.collectionByHandle) {
      return null;
    }

    const collection = data.collectionByHandle;
    return {
      id: collection.id,
      handle: collection.handle,
      title: collection.title,
      description: collection.description || '',
      image: collection.image?.url || null,
      products: collection.products.edges.map((edge: any) => transformProduct(edge.node)),
    };
  } catch (error) {
    console.error('Error fetching collection:', error);
    throw error;
  }
}

export async function searchProducts(query: string, first: number = 20): Promise<Product[]> {
  try {
    // Build search query - search in title, description, vendor
    const searchQuery = `title:*${query}* OR description:*${query}* OR vendor:*${query}* status:active`;

    const data: any = await client.request(SEARCH_PRODUCTS, {
      query: searchQuery,
      first
    });

    return data.products.edges.map((edge: any) => transformProduct(edge.node));
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
}

export async function getProductsByVendor(vendor: string, first: number = 50): Promise<Product[]> {
  try {
    const searchQuery = `vendor:"${vendor}" status:active`;

    const data: any = await client.request(SEARCH_PRODUCTS, {
      query: searchQuery,
      first
    });

    return data.products.edges.map((edge: any) => transformProduct(edge.node));
  } catch (error) {
    console.error('Error fetching products by vendor:', error);
    throw error;
  }
}

export async function getProductsByType(productType: string, first: number = 50): Promise<Product[]> {
  try {
    const searchQuery = `product_type:"${productType}" status:active`;

    const data: any = await client.request(SEARCH_PRODUCTS, {
      query: searchQuery,
      first
    });

    return data.products.edges.map((edge: any) => transformProduct(edge.node));
  } catch (error) {
    console.error('Error fetching products by type:', error);
    throw error;
  }
}

// Re-export types
export type { Product, ProductVariant, ProductOption, Collection } from './types';
