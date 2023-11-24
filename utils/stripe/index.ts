import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2023-10-16',
    appInfo: {
        name: 'lunch-app',
        url: 'http://localhost:3000',
    },
})

export const retrieveCheckoutSession = async (id: string) => {
    const result = await stripe.checkout.sessions.retrieve(id, {
        expand: [
            'payment_intent',
            'payment_intent.payment_method',
            'shipping_cost.shipping_rate',
        ],
    })

    return JSON.parse(JSON.stringify(result))
}
