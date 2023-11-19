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

    const { data: order_id, error: orderError } = await supabase.rpc(
        'new_order_id'
    )

    if (orderError) {
        throw orderError
    }

    const origin = headers().get('origin')

    const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create({
            client_reference_id: user!.id,
            customer_email: user!.email,
            metadata: {
                order_id,
            },
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
