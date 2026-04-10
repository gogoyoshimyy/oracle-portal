import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Stripe APIキーが設定されていない場合は準備中メッセージを返す
const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey ? new Stripe(stripeKey, { apiVersion: '2025-09-30.clover' as any }) : null;

const PRICE_MONTHLY = process.env.STRIPE_PRICE_MONTHLY; // Stripeダッシュボードで作成した価格ID
const PRICE_YEARLY = process.env.STRIPE_PRICE_YEARLY;

export async function POST(request: NextRequest) {
  try {
    // Stripeが未設定の場合
    if (!stripe || !PRICE_MONTHLY || !PRICE_YEARLY) {
      return NextResponse.json(
        {
          error: '申し訳ございません、プレミアム機能は現在準備中です。\n近日公開予定です。',
        },
        { status: 503 }
      );
    }

    const { plan } = await request.json();
    const priceId = plan === 'yearly' ? PRICE_YEARLY : PRICE_MONTHLY;

    const baseUrl = request.headers.get('origin') || 'https://oracle-portal.vercel.app';

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/premium/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/premium`,
      locale: 'ja',
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
