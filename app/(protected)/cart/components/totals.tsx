import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Amount, CartState } from '@/app/components'
import { LineItem } from '@/types'
import { State } from '@/lib/cart/machine'
import { createCheckoutSession } from '@/app/actions/stripe'

export default async function Totals({
    state,
    lineItems,
}: {
    state: State
    lineItems: LineItem[]
}) {
    const total = lineItems.reduce(
        (m: number, n: LineItem) => (m += n.quantity * n.price),
        0
    )

    return (
        <div className='flex flex-col gap-4'>
            <div className='text-center'>
                <div className='text-lg'>Cart Total</div>
                <div className='text-2xl font-semibold'>
                    <Amount value={total} />
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                {state?.value === 'shopping' && total > 0 && (
                    <form action={createCheckoutSession}>
                        <button className='btn w-full'>Checkout</button>
                    </form>
                )}
                <Link href='/shop' className='btn btn-outline w-full'>
                    Continue shopping
                </Link>
                <CartState />
            </div>
        </div>
    )
}
