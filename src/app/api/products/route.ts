import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts, getProductsByVendor, getProductsByType } from '@/lib/shopify';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '50');
    const vendor = searchParams.get('vendor');
    const productType = searchParams.get('type');

    let products;

    if (vendor) {
      products = await getProductsByVendor(vendor, limit);
    } else if (productType) {
      products = await getProductsByType(productType, limit);
    } else {
      products = await getAllProducts(limit);
    }

    return NextResponse.json({
      success: true,
      products,
      count: products.length,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch products',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
