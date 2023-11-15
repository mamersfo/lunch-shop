import { client } from '@/trigger'
import { Stripe } from '@trigger.dev/stripe'

const stripe = new Stripe({
    id: 'stripe',
    apiKey: process.env.STRIPE_SECRET_KEY!,
})

client.defineJob({
    id: 'stripe-payment-intent',
    name: 'Stripe Payment Intent',
    version: '0.1.0',
    trigger: stripe.onPaymentIntentSucceeded(),
    integrations: {
        stripe,
    },
    run: async (payload, io, ctx) => {
        console.log(JSON.stringify(ctx.event))
    },
})
