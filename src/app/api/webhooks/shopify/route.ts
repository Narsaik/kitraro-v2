import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const SHOPIFY_WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET || '';

// Verify Shopify webhook signature
function verifyWebhook(body: string, signature: string): boolean {
  if (!SHOPIFY_WEBHOOK_SECRET) {
    console.warn('SHOPIFY_WEBHOOK_SECRET not set, skipping verification');
    return true; // Allow in development
  }

  const hmac = crypto
    .createHmac('sha256', SHOPIFY_WEBHOOK_SECRET)
    .update(body, 'utf8')
    .digest('base64');

  return hmac === signature;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-shopify-hmac-sha256') || '';
    const topic = request.headers.get('x-shopify-topic') || '';
    const shopDomain = request.headers.get('x-shopify-shop-domain') || '';

    // Verify webhook authenticity
    if (!verifyWebhook(body, signature)) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const data = JSON.parse(body);

    console.log(`Received Shopify webhook: ${topic} from ${shopDomain}`);

    // Handle different webhook topics
    switch (topic) {
      case 'orders/create':
        await handleOrderCreated(data);
        break;

      case 'orders/paid':
        await handleOrderPaid(data);
        break;

      case 'orders/fulfilled':
        await handleOrderFulfilled(data);
        break;

      case 'orders/cancelled':
        await handleOrderCancelled(data);
        break;

      case 'products/create':
        await handleProductCreated(data);
        break;

      case 'products/update':
        await handleProductUpdated(data);
        break;

      case 'products/delete':
        await handleProductDeleted(data);
        break;

      case 'inventory_levels/update':
        await handleInventoryUpdated(data);
        break;

      case 'customers/create':
        await handleCustomerCreated(data);
        break;

      default:
        console.log(`Unhandled webhook topic: ${topic}`);
    }

    return NextResponse.json({ success: true, topic });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// Webhook handlers
async function handleOrderCreated(data: any) {
  console.log('New order created:', {
    id: data.id,
    orderNumber: data.order_number,
    email: data.email,
    totalPrice: data.total_price,
    currency: data.currency,
    itemCount: data.line_items?.length,
  });

  // TODO: Send order confirmation email
  // TODO: Update analytics
  // TODO: Notify admin
}

async function handleOrderPaid(data: any) {
  console.log('Order paid:', {
    id: data.id,
    orderNumber: data.order_number,
    totalPrice: data.total_price,
  });

  // TODO: Trigger fulfillment process
}

async function handleOrderFulfilled(data: any) {
  console.log('Order fulfilled:', {
    id: data.id,
    orderNumber: data.order_number,
    trackingNumber: data.fulfillments?.[0]?.tracking_number,
  });

  // TODO: Send shipping notification email
}

async function handleOrderCancelled(data: any) {
  console.log('Order cancelled:', {
    id: data.id,
    orderNumber: data.order_number,
    cancelReason: data.cancel_reason,
  });

  // TODO: Process refund notification
  // TODO: Update inventory
}

async function handleProductCreated(data: any) {
  console.log('Product created:', {
    id: data.id,
    title: data.title,
    handle: data.handle,
  });

  // TODO: Invalidate product cache
  // TODO: Update search index
}

async function handleProductUpdated(data: any) {
  console.log('Product updated:', {
    id: data.id,
    title: data.title,
    handle: data.handle,
  });

  // TODO: Invalidate product cache
  // TODO: Update search index
}

async function handleProductDeleted(data: any) {
  console.log('Product deleted:', {
    id: data.id,
  });

  // TODO: Remove from cache
  // TODO: Remove from search index
}

async function handleInventoryUpdated(data: any) {
  console.log('Inventory updated:', {
    inventoryItemId: data.inventory_item_id,
    locationId: data.location_id,
    available: data.available,
  });

  // TODO: Update local inventory cache
  // TODO: Trigger low stock alerts
}

async function handleCustomerCreated(data: any) {
  console.log('Customer created:', {
    id: data.id,
    email: data.email,
    firstName: data.first_name,
    lastName: data.last_name,
  });

  // TODO: Add to email list
  // TODO: Send welcome email
}
