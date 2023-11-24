import Link from 'next/link'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import type { Stripe } from 'stripe'
import { stripe } from '@/utils/stripe'
import { send } from '@/lib/cart'
import { Debug } from '@/app/components'

export default async function Page({
    searchParams,
}: {
    searchParams: { session_id: string }
}) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.retrieve(searchParams.session_id, {
            expand: [
                'payment_intent',
                'payment_intent.payment_method',
                'shipping_cost.shipping_rate',
            ],
        })

    const paymentIntent = checkoutSession.payment_intent as Stripe.PaymentIntent

    if (checkoutSession && paymentIntent.status === 'succeeded') {
        const shippingCost =
            checkoutSession.shipping_cost as Stripe.Checkout.Session.ShippingCost

        const shippingRate = shippingCost.shipping_rate as Stripe.ShippingRate

        const paymentMethod =
            paymentIntent.payment_method as Stripe.PaymentMethod

        if (checkoutSession.client_reference_id) {
            const { data: order, error: orderError } = await supabase
                .from('orders')
                .select()
                .eq('id', checkoutSession.client_reference_id)
                .select()
                .maybeSingle()

            if (orderError) {
                throw orderError
            }

            if (order) {
                send({ type: 'resetCart' })

                return (
                    <div className='flex flex-col gap-4 mt-8'>
                        <Heading title={`order ${order.order_id} confirmed!`} />
                        <div>
                            We have received your order. It will be shipped as
                            soon as possible. Please monitor your e-mail in
                            order to follow your package.
                        </div>
                        <Link href='/shop' className='mt-4 text-sm underline'>
                            Back to shop
                        </Link>
                    </div>
                )
            }
        }
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className='text-lg font-semibold text-center'>
                Payment failed
            </div>
            <Debug data={JSON.parse(JSON.stringify(checkoutSession))} />
        </div>
    )
}

const Heading = ({ title }: { title: string }) => {
    return <div className='uppercase text-lg font-semibold'>{title}</div>
}
