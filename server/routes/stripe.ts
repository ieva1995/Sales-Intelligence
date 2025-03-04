import express from 'express';
import Stripe from 'stripe';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-02-24',
  typescript: true,
});

router.post('/api/create-checkout-session', async (req, res) => {
  const { priceId } = req.body;

  if (!priceId) {
    return res.status(400).json({ error: 'Price ID is required' });
  }

  try {
    console.log('Creating checkout session for price:', priceId);

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/payment/cancelled`,
    });

    console.log('Checkout session created:', session.id);
    res.json({ url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error.message);
    res.status(500).json({ 
      error: 'Failed to create checkout session',
      details: error.message 
    });
  }
});

router.post('/api/create-portal-session', async (req, res) => {
  try {
    const { customer_id } = req.body;

    if (!customer_id) {
      return res.status(400).json({ error: 'Customer ID is required' });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customer_id,
      return_url: `${req.headers.origin}/account`,
    });

    res.json({ url: session.url });
  } catch (error: any) {
    console.error('Error creating portal session:', error.message);
    res.status(500).json({ 
      error: 'Failed to create portal session',
      details: error.message 
    });
  }
});

export default router;