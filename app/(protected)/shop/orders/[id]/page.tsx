import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { formatRelative, parseISO } from 'date-fns'
import { Order } from '@/types'
import { Shipping, PaymentMethod, Specification } from '@/app/components/order'

export default async function Page({
    params: { id },
}: {
    params: { id: string }
}) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
        .from('orders')
        .select()
        .eq('id', id)
        .maybeSingle()

    if (error) {
        throw error
    }

    const order = data as Order

    if (order) {
        return (
            <div className='flex flex-col gap-4 mt-8'>
                <div className='flex flex-row gap-16 w-full'>
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
                                    <tr>
                                        <td>Order date:</td>
                                        <td className=''>
                                            {formatRelative(
                                                parseISO(order.created_at),
                                                new Date()
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                        <div className='divider' />
                        <>
                            <Heading title='shipping' />
                            <Shipping
                                method={order.shipping_method}
                                details={order.shipping_details}
                            />
                        </>
                        <div className='divider' />
                        <>
                            <Heading title='payment' />
                            <PaymentMethod
                                paymentMethod={order.payment_method}
                            />
                        </>
                    </div>{' '}
                    <div className='flex flex-col gap-4 w-2/3'>
                        <Heading title='items' />
                        <Specification order={order!} />
                    </div>
                </div>
            </div>
        )
    }

    return <></>
}

const Heading = ({ title }: { title: string }) => {
    return <div className='uppercase text-lg font-semibold'>{title}</div>
}
