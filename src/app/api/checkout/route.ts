import { NextRequest, NextResponse } from 'next/server';
import { getProductByHandle } from '@/lib/shopify';

// Shopify myshopify.com domain - always use this for checkout
const SHOPIFY_MYSHOPIFY_DOMAIN = 'wzapw1-ic.myshopify.com';

// Extract numeric ID from Shopify GID
function extractNumericId(gid: string): string | null {
  const match = gid.match(/\/(\d+)$/);
  return match ? match[1] : null;
}

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

    // Build cart items with numeric variant IDs
    const cartItems: string[] = [];

    for (const item of items) {
      let variantId = item.variantId;

      // If variantId is not a proper Shopify GID, look it up by product handle
      if (!variantId.startsWith('gid://shopify/')) {
        const handle = item.handle || item.productHandle;
        if (handle) {
          const product = await getProductByHandle(handle);
          if (product && product.variants.length > 0) {
            const variant = product.variants.find(v => v.available) || product.variants[0];
            variantId = variant.id;
          }
        }
      }

      // Extract numeric ID from GID
      if (variantId.startsWith('gid://shopify/')) {
        const numericId = extractNumericId(variantId);
        if (numericId) {
          const quantity = item.quantity || 1;
          cartItems.push(`${numericId}:${quantity}`);
        }
      }
    }

    if (cartItems.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No valid products found' },
        { status: 400 }
      );
    }

    // Build direct Shopify cart URL
    // Format: https://store.myshopify.com/cart/variant_id:quantity,variant_id:quantity
    const checkoutUrl = `https://${SHOPIFY_MYSHOPIFY_DOMAIN}/cart/${cartItems.join(',')}`;

    return NextResponse.json({
      success: true,
      checkoutUrl: checkoutUrl,
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
