import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Amount, CartState } from '@/app/components'
import { LineItem, Shipping } from '@/types'
import { State } from '@/lib/cart/machine'
import { send } from '@/lib/cart'
import { createCheckoutSession } from '@/app/actions/stripe'
import Delivery from './delivery'

export default async function Totals({
    state,
    lineItems,
    shipping,
}: {
    state: State
    lineItems: LineItem[]
    shipping: Shipping | null
}) {
    const continueShopping = async (formData: FormData) => {
        'use server'
        await send({ type: 'continueShopping' })
        redirect('/shop')
    }

    const subTotal = lineItems.reduce(
        (m: number, n: LineItem) => (m += n.quantity * n.price),
        0
    )

    return (
        <div className='flex flex-col gap-4'>
            <div className='text-center'>
                <div className='text-lg'>Cart Total</div>
                <div className='text-2xl font-semibold'>
                    <Amount
                        value={
                            subTotal ? +subTotal + (shipping?.price || 0) : 0
                        }
                    />
                </div>
            </div>
            {subTotal > 0 && (
                <table className='table'>
                    <tbody>
                        <tr>
                            <td>Amount:</td>
                            <td className='text-right'>
                                <Amount value={subTotal} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className='capitalize'>
                                    {state.context.shipping}
                                </span>{' '}
                                delivery:
                            </td>
                            <td className='text-right'>
                                <Amount value={shipping?.price || 0} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
            <Delivery selected={state?.context.shipping} />
            <div className='flex flex-col gap-4'>
                {state?.value === 'shopping' && subTotal > 0 && (
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
