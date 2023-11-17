'use server'

import { cookies, headers } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { type Stripe } from 'stripe'
import { stripe } from '@/utils/stripe'
import { redirect } from 'next/navigation'
import { type Session, Shipping } from '@/types'
import { type State } from '@/lib/cart/machine'

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

    const { data: sessionData, error: sessionError } = await supabase
        .from('sessions')
        .select('id, cart')
        .maybeSingle()

    if (sessionError) {
        throw sessionError
    }

    const session = sessionData as Session
    const state = session?.cart as State

    if (!(state?.context.products.length > 0)) {
        throw new Error('nothing in cart')
    }

    const bag = state.context.products.reduce(
        (bag: Record<string, number>, slug: string) =>
            Object.assign(bag, { [slug]: (bag[slug] || 0) + 1 }),
        {}
    )

    const { data: products, error: productsError } = await supabase
        .from('products')
        .select('slug, name, price')
        .in('slug', Object.keys(bag))

    if (productsError) {
        throw productsError
    }

    let line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
        products?.map((p: any) => {
            return {
                quantity: bag[p.slug],
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: p.name,
                    },
                    unit_amount: p.price,
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
            client_reference_id: session.id,
            customer_email: user?.email,
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

    // revalidatePath('/cart')
    redirect(checkoutSession.url as string)
}
