import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey ? new Stripe(stripeKey, { apiVersion: '2025-09-30.clover' as any }) : null;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  if (!stripe || !webhookSecret) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 });
  }

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // イベント処理
  switch (event.type) {
    case 'checkout.session.completed':
      // TODO: Supabaseでユーザーのpremium statusを更新
      console.log('Checkout completed:', event.data.object);
      break;
    case 'customer.subscription.deleted':
      // TODO: ユーザーのpremium statusを解除
      console.log('Subscription deleted:', event.data.object);
      break;
    case 'invoice.payment_succeeded':
      // TODO: 次回更新日を更新
      console.log('Payment succeeded:', event.data.object);
      break;
  }

  return NextResponse.json({ received: true });
}
