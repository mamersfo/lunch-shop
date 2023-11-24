import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import type { Stripe } from 'stripe'
import { retrieveCheckoutSession, stripe } from '@/utils/stripe'
import { send } from '@/lib/cart'
import { Debug } from '@/app/components'
import { PaymentMethod, Shipping, Specification } from './components'

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
                        <Heading title='order confirmation' />
                        <div className='flex flex-row gap-16 w-full'>
                            <div className='flex flex-col gap-4 w-2/3'>
                                <Specification order={order!} />
                                <Debug
                                    data={JSON.parse(
                                        JSON.stringify(checkoutSession)
                                    )}
                                />
                            </div>
                            <div className='flex flex-col gap-4 w-1/3'>
                                <>
                                    <Heading title='order' />
                                    <table className='table'>
                                        <tbody>
                                            <tr>
                                                <td>Order number:</td>
                                                <td className='font-semibold'>
                                                    {order.order_id}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </>
                                <div className='divider' />
                                <>
                                    <Heading title='shipping' />
                                    <Shipping
                                        rate={shippingRate}
                                        details={
                                            checkoutSession.shipping_details
                                        }
                                    />
                                </>
                                <div className='divider' />
                                <>
                                    <Heading title='payment' />
                                    <PaymentMethod {...paymentMethod} />
                                </>
                            </div>
                        </div>
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
