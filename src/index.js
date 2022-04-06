import { Router } from 'itty-router';
const router = Router();

import Stripe from 'stripe';
const stripe = Stripe(STRIPE_API_KEY, {
  httpClient: Stripe.createFetchHttpClient()
});

router.post('/create-payment', async (request) => {
  const { amount, currency } = await request.json()

  const paymentIntent = await stripe.paymentIntents.create({
    amount, 
    currency,
    automatic_payment_methods: {
      enabled: true,
    },
    capture_method: 'manual'
  }); 

  return new Response(JSON.stringify(paymentIntent), { 'Content-type': 'application/json'});
});

router.all('*', () => new Response('Not Found.', { status: 404 })); 

addEventListener('fetch', event =>
  event.respondWith(router.handle(event.request))
)

