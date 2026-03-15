import Stripe from 'npm:stripe@14';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

Deno.serve(async (req) => {
  const { priceId, email, name, type, tier, coins, successType } = await req.json();

  const origin = req.headers.get('origin') || 'https://app.base44.com';
  const successUrl = `${origin}/BookingConfirmation?type=${successType || type}`;
  const cancelUrl = `${origin}/Sanctuary`;

  const sessionConfig = {
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: type === 'subscription' ? 'subscription' : 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_email: email || undefined,
    metadata: {
      base44_app_id: Deno.env.get('BASE44_APP_ID'),
      type,
      tier: tier || '',
      coins: coins ? String(coins) : '0',
      name: name || '',
      email: email || ''
    }
  };

  try {
    const session = await stripe.checkout.sessions.create(sessionConfig);
    console.log('Created checkout session:', session.id, 'for', email, 'type:', type);
    return Response.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
});