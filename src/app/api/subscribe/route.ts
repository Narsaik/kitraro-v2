import { NextResponse } from 'next/server';

// n8n webhook URL for email collection
const N8N_WEBHOOK_URL = 'https://growthbosss.app.n8n.cloud/webhook/kitraro-subscribe';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Send to n8n webhook which saves to Google Sheets
    try {
      await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch (webhookError) {
      console.error('n8n webhook error:', webhookError);
      // Continue even if webhook fails - don't block user experience
    }

    // Log for backup
    console.log('New subscriber:', { email, subscribedAt: new Date().toISOString() });

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed',
      couponCode: 'BEMVINDO20'
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
