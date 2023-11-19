import type { Stripe } from 'stripe'
import { stripe } from '@/utils/stripe'
import { send } from '@/lib/cart'
import { Debug } from '@/app/components'
import {
    Delivery,
    Heading,
    Order,
    PaymentMethod,
    Specification,
} from './components'

export default async function Page({
    searchParams,
}: {
    searchParams: { session_id: string }
}) {
    const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.retrieve(searchParams.session_id, {
            expand: [
                'line_items',
                'payment_intent',
                'payment_intent.payment_method',
                'shipping_cost.shipping_rate',
            ],
        })

    if (
        (checkoutSession?.payment_intent as Stripe.PaymentIntent)?.status ===
        'succeeded'
    ) {
        send({ type: 'resetCart' })

        return (
            <div className='flex flex-col gap-4 mt-8'>
                <Heading title='order confirmation' />
                <div className='flex flex-row gap-4 w-full'>
                    <div className='flex flex-col gap-4 w-2/3'>
                        <div className='w-3/4'>
                            <Specification
                                amount_total={checkoutSession.amount_total}
                                line_items={checkoutSession.line_items?.data}
                                shipping_cost={checkoutSession.shipping_cost}
                            />
                        </div>
                        <Debug
                            data={JSON.parse(JSON.stringify(checkoutSession))}
                        />
                    </div>
                    <div className='flex flex-col gap-4 w-1/3'>
                        <>
                            <Heading title='order' />
                            <Order data={checkoutSession} />
                        </>
                        <div className='divider' />
                        <>
                            <Heading title='delivery' />
                            <Delivery
                                cost={checkoutSession.shipping_cost}
                                details={checkoutSession.shipping_details}
                            />
                        </>
                        <div className='divider' />
                        <>
                            <Heading title='payment' />
                            <PaymentMethod
                                data={checkoutSession.payment_intent}
                            />
                        </>
                    </div>
                </div>
            </div>
        )
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
