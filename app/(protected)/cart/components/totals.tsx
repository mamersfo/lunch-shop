import { revalidatePath } from 'next/cache'
import { Amount } from '@/components'
import { LineItem, Shipping } from '@/types'
import { State } from '@/utils/cart/machine'
import { send } from '@/utils/cart'
import { redirect } from 'next/navigation'

export default async function Totals({
    state,
    lineItems,
    shipping,
}: {
    state: State
    lineItems: LineItem[]
    shipping: Shipping[]
}) {
    const checkout = async (formData: FormData) => {
        'use server'
        await send({ type: 'checkout' })
        revalidatePath('/cart')
    }

    const continueShopping = async (formData: FormData) => {
        'use server'
        await send({ type: 'continueShopping' })
        redirect('/shop')
    }

    const subTotal = lineItems.reduce(
        (m: number, n: LineItem) => (m += n.quantity * n.price),
        0
    )

    let chosenMethod: Shipping | null = null

    if (state?.context.shipping) {
        chosenMethod = shipping.filter(
            (s) => s.method === state.context.shipping
        )[0]
    }

    let defaultMethod: Shipping | null = shipping.filter((s) => s.is_default)[0]

    const shippingFee = chosenMethod?.price || defaultMethod?.price

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
                            <td>
                                <span className='capitalize'>
                                    {state.context.shipping}
                                </span>{' '}
                                delivery:
                            </td>
                            <td className='text-right'>
                                <Amount value={shippingFee} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
            <div className='flex flex-col gap-4'>
                {subTotal > 0 && (
                    <form action={checkout}>
                        <button className='btn w-full'>Checkout</button>
                    </form>
                )}
                <form action={continueShopping}>
                    <button className='btn btn-outline w-full'>
                        Continue shopping
                    </button>
                </form>
            </div>
        </div>
    )
}
