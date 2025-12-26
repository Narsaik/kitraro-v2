import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/shopify/data";
import { ProductPageClient } from "./ProductPageClient";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    return {
      title: "Produto nao encontrado | Kitraro",
    };
  }

  return {
    title: `${product.title} | Kitraro`,
    description: product.description || `Compre ${product.title} na Kitraro - Streetwear autentico`,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images.length > 0 ? [product.images[0]] : [],
    },
  };
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    notFound();
  }

  // Get related products (same brand)
  const allProducts = await getProducts(50);
  const relatedProducts = allProducts
    .filter((p) => p.brand === product.brand && p.id !== product.id && p.available)
    .slice(0, 4);

  return <ProductPageClient product={product} relatedProducts={relatedProducts} />;
}
