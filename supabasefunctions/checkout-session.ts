// supabase/functions/create-checkout-session/index.ts
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@14.18.0?target=deno';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

serve(async (req) => {
  // 1. Only allow POST
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  // 2. Verify the user is authenticated (Supabase Auth JWT)
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response('Missing or invalid Authorization header', { status: 401 });
  }
  const token = authHeader.split(' ')[1];
  // We won't verify the JWT here for brevity, but in production you should.
  // Instead, we rely on the caller (your React app) to send the user ID and email.

  // 3. Parse the request body
  const { priceId, userId, userEmail, successUrl, cancelUrl } = await req.json();
  if (!priceId || !userId || !userEmail) {
    return new Response('Missing priceId, userId, or userEmail', { status: 400 });
  }

  // 4. Create Stripe Checkout session
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl || `${req.headers.get('origin')}/settings?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${req.headers.get('origin')}/settings`,
      customer_email: userEmail,
      metadata: { userId },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});