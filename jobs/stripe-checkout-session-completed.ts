import { client } from '@/trigger'
import { Stripe } from '@trigger.dev/stripe'
import { Supabase } from '@trigger.dev/supabase'
import { Database } from '@/types/supabase'
import { SendGrid } from '@trigger.dev/sendgrid'
import { retrieveCheckoutSession } from '@/utils/stripe'
import { render } from '@react-email/render'
import { OrderConfirmationEmail } from '@/app/components/email'
import { createElement } from 'react'

const sendgrid = new SendGrid({
    id: 'sendgrid',
    apiKey: process.env.SENDGRID_API_KEY!,
})

const stripe = new Stripe({
    id: 'stripe',
    apiKey: process.env.STRIPE_SECRET_KEY!,
})

const supabase = new Supabase<Database>({
    id: 'supabase',
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
})

client.defineJob({
    id: 'stripe-checkout-session-completed',
    name: 'Stripe Checkout Session Completed',
    version: '0.1.0',
    trigger: stripe.onCheckoutSessionCompleted(),
    integrations: {
        stripe,
        supabase,
        sendgrid,
    },
    run: async (payload, io, ctx) => {
        const checkoutSession = await io.runTask(
            'retrieve-checkout-session',
            async () => {
                return retrieveCheckoutSession(payload.id)
            },
            {
                name: 'Retrieve Checkout Session',
                icon: 'stripe',
            }
        )

        console.log('checkoutSession:', checkoutSession)

        const shippingCost = checkoutSession.shipping_cost as any
        // console.log('shipping_cost:', checkoutSession.shipping_cost)

        const paymentIntent = checkoutSession.payment_intent as any
        // console.log('payment_intent:', checkoutSession.payment_intent)

        const { data: order, error: orderError } = await io.supabase.runTask(
            'update-order',
            async (db) => {
                return db
                    .from('orders')
                    .update({
                        shipping_method:
                            shippingCost.shipping_rate.display_name,
                        shipping_cost: shippingCost.amount_total,
                        shipping_details: checkoutSession.shipping_details,
                        payment_status: checkoutSession.payment_status,
                        payment_method: paymentIntent.payment_method.card.brand,
                    })
                    .eq('id', checkoutSession.client_reference_id)
                    .select()
                    .maybeSingle()
            },
            {
                name: 'Update order',
                icon: 'supabase',
            }
        )

        if (order) {
            const html = await io.runTask('generate-email', async () =>
                render(createElement(OrderConfirmationEmail, { order }), {
                    pretty: true,
                })
            )

            await io.sendgrid.sendEmail(
                `Confirmation email for order ${order?.order_id}`,
                {
                    to: checkoutSession.customer_email,
                    from: 'Martin van Amersfoorth <martin.van.amersfoorth@finalist.nl>',
                    subject: `Your dogswagshop order ${order?.order_id} has been processed`,
                    html,
                }
            )
        }
    },
})
