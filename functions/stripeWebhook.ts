import Stripe from 'npm:stripe@14';
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return Response.json({ error: 'Invalid signature' }, { status: 400 });
  }

  console.log('Stripe event received:', event.type);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { customer_email, metadata, mode, amount_total } = session;
    const email = customer_email || metadata?.email;

    if (!email) {
      console.error('No email found in session');
      return Response.json({ received: true });
    }

    // Find or create user profile
    let profiles = await base44.asServiceRole.entities.UserProfile.filter({ email });
    let profile = profiles[0];

    if (metadata?.type === 'coins') {
      // Add coins to user profile
      const coins = parseInt(metadata.coins || '0');
      if (profile) {
        await base44.asServiceRole.entities.UserProfile.update(profile.id, {
          coin_balance: (profile.coin_balance || 0) + coins
        });
        console.log(`Added ${coins} coins to ${email}`);
      } else {
        await base44.asServiceRole.entities.UserProfile.create({
          email,
          coin_balance: coins
        });
        console.log(`Created profile with ${coins} coins for ${email}`);
      }
    }

    if (mode === 'subscription' && metadata?.tier) {
      // Create/update membership
      const existingMemberships = await base44.asServiceRole.entities.Membership.filter({ email });
      const tierDiscounts = { seeker: 5, initiate: 15, devotee: 25 };

      if (existingMemberships.length > 0) {
        await base44.asServiceRole.entities.Membership.update(existingMemberships[0].id, {
          tier: metadata.tier,
          is_active: true,
          start_date: new Date().toISOString().split('T')[0],
          readings_discount: tierDiscounts[metadata.tier] || 0
        });
        console.log(`Updated membership for ${email} to ${metadata.tier}`);
      } else {
        await base44.asServiceRole.entities.Membership.create({
          email,
          name: metadata.name || email,
          tier: metadata.tier,
          is_active: true,
          start_date: new Date().toISOString().split('T')[0],
          readings_discount: tierDiscounts[metadata.tier] || 0
        });
        console.log(`Created membership for ${email} as ${metadata.tier}`);
      }
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object;
    const customer = await stripe.customers.retrieve(sub.customer);
    const email = customer.email;
    if (email) {
      const memberships = await base44.asServiceRole.entities.Membership.filter({ email });
      if (memberships.length > 0) {
        await base44.asServiceRole.entities.Membership.update(memberships[0].id, { is_active: false });
        console.log(`Deactivated membership for ${email}`);
      }
    }
  }

  return Response.json({ received: true });
});