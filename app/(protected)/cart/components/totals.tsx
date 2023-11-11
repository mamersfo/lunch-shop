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
        <div>
            <div className='text-center'>
                <div className='text-lg'>Cart Total</div>
                <div className='text-2xl font-semibold'>
                    <Amount value={subTotal + shippingFee} />
                </div>
            </div>
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
            <Link href='/shop' className='btn btn-outline w-full mt-8'>
                Back to shop
            </Link>
            {/* <div className='text-center'>
                {!state.matches('viewing') && <ViewCartButton />}
            </div> */}
        </div>
    )
}
