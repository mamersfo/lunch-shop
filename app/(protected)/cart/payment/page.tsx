import Link from 'next/link'
import type { Stripe } from 'stripe'
import { stripe } from '@/utils/stripe'
import { send } from '@/utils/cart'
import { CartState } from '@/app/components'

export default async function Page({
    searchParams,
}: {
    searchParams: { session_id: string }
}) {
    const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.retrieve(searchParams.session_id, {
            expand: ['line_items', 'payment_intent'],
        })

    if (
        (checkoutSession?.payment_intent as Stripe.PaymentIntent)?.status ===
        'succeeded'
    ) {
        send({ type: 'paymentSucceeded' })

        return (
            <div className='flex flex-col gap-4'>
                <div className='text-lg font-semibold text-center'>
                    Order confirmed!
                </div>
                <CartState />
                <Link href='/shop' className='btn btn-outline w-full'>
                    Continue shopping
                </Link>

                <Debug {...checkoutSession} />
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className='text-lg font-semibold text-center'>
                Payment failed
            </div>
            <CartState />
            <Debug {...checkoutSession} />
        </div>
    )
}

const Debug = (checkoutSession: Stripe.Checkout.Session) => {
    const paymentIntent = checkoutSession.payment_intent as Stripe.PaymentIntent
    return (
        <div className='prose mt-8'>
            <pre className='text-sm'>
                {JSON.stringify(checkoutSession, null, 2)}
            </pre>
        </div>
    )
}
