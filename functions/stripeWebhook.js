const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { updateUserSettings } = require('./db-service'); // Your DB helper

exports.handler = async (event) => {
    const sig = event.headers['stripe-signature'];
    let stripeEvent;

    try {
        stripeEvent = stripe.webhooks.constructEvent(event.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return { statusCode: 400, body: 'Webhook Error' };
    }

    if (stripeEvent.type === 'checkout.session.completed') {
        const session = stripeEvent.data.object;
        const userId = session.client_reference_id;
        const creditAmount = session.metadata.credits || 10; // Default to 10 if not set

        // Lyra Logic: Add credits to the user's "Luna" balance
        await updateUserSettings(userId, { 
            luna_credits: admin.firestore.FieldValue.increment(creditAmount) 
        });
    }

    return { statusCode: 200, body: JSON.stringify({ received: true }) };
};