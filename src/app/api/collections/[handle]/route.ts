import { NextRequest, NextResponse } from 'next/server';
import { getCollectionByHandle } from '@/lib/shopify';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ handle: string }> }
) {
  try {
    const { handle } = await params;
    const searchParams = request.nextUrl.searchParams;
    const productLimit = parseInt(searchParams.get('products') || '50');

    const collection = await getCollectionByHandle(handle, productLimit);

    if (!collection) {
      return NextResponse.json(
        {
          success: false,
          error: 'Collection not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      collection,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch collection',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
