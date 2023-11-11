import Link from 'next/link'
import { Amount } from '@/components'
import { LineItem } from '@/types'
import { State } from '@/utils/cart/machine'

export default function Totals({
    state,
    lineItems,
}: {
    state: State
    lineItems: LineItem[]
}) {
    const shippingFee = 395

    const subTotal = lineItems.reduce(
        (m: number, n: LineItem) => (m += n.quantity * n.price),
        0
    )

    return (
        <div className='flex flex-col gap-4'>
            <div className='text-center'>
                <div className='text-lg'>Cart Total</div>
                <div className='text-2xl font-semibold'>
                    <Amount value={subTotal ? +subTotal + shippingFee : 0} />
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
                            <td>Shipping:</td>
                            <td className='text-right'>
                                <Amount value={shippingFee} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
            <div className='flex flex-col gap-4'>
                {subTotal > 0 && (
                    <Link href='/cart' className='btn w-full'>
                        Checkout
                    </Link>
                )}
                <Link href='/shop' className='btn btn-outline w-full'>
                    Back to shop
                </Link>
            </div>
        </div>
    )
}
