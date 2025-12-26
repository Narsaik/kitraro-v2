import { NextRequest, NextResponse } from 'next/server';
import { createCart, addToCart } from '@/lib/shopify/storefront';
import { getProductByHandle } from '@/lib/shopify';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Support both 'items' and 'lineItems' for backwards compatibility
    const items = body.items || body.lineItems;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No items provided' },
        { status: 400 }
      );
    }

    // Create a new cart
    const cart = await createCart();

    // Build line items with real Shopify variant IDs
    const lines: { merchandiseId: string; quantity: number }[] = [];

    for (const item of items) {
      let variantId = item.variantId;

      // If variantId is not a proper Shopify GID, look it up by product handle
      if (!variantId.startsWith('gid://shopify/')) {
        // Try to find the real product by handle
        const handle = item.handle || item.productHandle;
        if (handle) {
          const product = await getProductByHandle(handle);
          if (product && product.variants.length > 0) {
            // Find matching variant by title/size or use first available
            const variant = product.variants.find(v => v.available) || product.variants[0];
            variantId = variant.id;
          }
        }
      }

      // Only add if we have a valid Shopify GID
      if (variantId.startsWith('gid://shopify/')) {
        lines.push({
          merchandiseId: variantId,
          quantity: item.quantity || 1,
        });
      }
    }

    if (lines.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No valid products found' },
        { status: 400 }
      );
    }

    // Add items to cart
    const updatedCart = await addToCart(cart.cartId, lines);

    return NextResponse.json({
      success: true,
      checkoutUrl: updatedCart.checkoutUrl,
      cartId: updatedCart.cartId,
    });
  } catch (error) {
    console.error('Checkout Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create checkout',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
