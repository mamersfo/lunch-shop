'use server'

import { cookies, headers } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { type Stripe } from 'stripe'
import { stripe } from '@/utils/stripe'
import { redirect } from 'next/navigation'
import { type State, LineItem } from '@/lib/cart/machine'

export async function createCheckoutSession(data: FormData): Promise<void> {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser()

    if (userError) {
        throw userError
    }

    const { data: cart, error: cartsError } = await supabase
        .from('carts')
        .select('state')
        .maybeSingle()

    if (cartsError) {
        throw cartsError
    }

    const state = cart?.state as State

    if (!(state?.context.itemCount > 0)) {
        throw new Error('nothing in cart')
    }

    const cart_id = state.context.cartId as string
    const order_id = `DSS-${cart_id
        .substring(0, cart_id.indexOf('-'))
        .toUpperCase()}`

    const { data: order, error: orderError } = await supabase
        .from('orders')
        .upsert({
            id: cart_id,
            user_id: user!.id,
            order_id,
            order_amount: state.context.itemSum,
            line_items: state.context.lineItems,
        })
        .select()
        .maybeSingle()

    if (orderError) {
        throw orderError
    }

    let line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
        state.context.lineItems?.map((li: LineItem) => {
            return {
                quantity: li.quantity,
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: li.name,
                    },
                    unit_amount: li.price,
                },
            }
        })

    const origin = headers().get('origin')

    const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create({
            client_reference_id: cart_id,
            customer_email: user!.email,
            line_items,
            mode: 'payment',
            shipping_options: [
                { shipping_rate: 'shr_1ODYTIH4m2ID9f1WdOJOauNA' },
                { shipping_rate: 'shr_1ODYUXH4m2ID9f1WdQXyJxqf' },
            ],
            shipping_address_collection: {
                allowed_countries: ['NL'],
            },
            success_url: `${origin}/cart/payment?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/cart?session_id={CHECKOUT_SESSION_ID}`,
        })

    redirect(checkoutSession.url as string)
}
