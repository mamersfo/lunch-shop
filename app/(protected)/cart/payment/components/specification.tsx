import { Amount } from '@/app/components'
import { Order } from '@/types'
import { LineItem } from '@/lib/cart/machine'

export default function Specification({ order }: { order: Order }) {
    const totalAmount = (order.order_amount || 0) + (order.shipping_cost || 0)

    return (
        <table className='table w-full'>
            <thead>
                <tr>
                    <th className='w-1/4'>Item</th>
                    <th className='w-1/4 text-right'>Price</th>
                    <th className='w-1/4 text-right'>Quantity</th>
                    <th className='w-1/4 text-right'>Amount</th>
                </tr>
            </thead>
            <tbody>
                {(order.line_items as LineItem[])?.map(
                    (li: LineItem, idx: number) => (
                        <tr key={`line-item-${idx}`}>
                            <td className='w-1/4'>{li.name}</td>
                            <td className='w-1/4 text-right'>
                                <Amount value={li.price} />
                            </td>
                            <td className='w-1/4 text-right'>{li.quantity}</td>
                            <td className='w-1/4 text-right'>
                                <Amount value={li.price * li.quantity} />
                            </td>
                        </tr>
                    )
                )}
                <tr key={'shipping-cost'}>
                    <td className='w-1/4'>{order.shipping_method} delivery</td>
                    <td colSpan={2}></td>
                    <td className='w-1/4 text-right'>
                        <Amount value={order.shipping_cost} />
                    </td>
                </tr>
                <tr key={'shipping-cost'}>
                    <td className='w-1/4'>Total</td>
                    <td colSpan={2}></td>
                    <td className='w-1/4 text-right font-semibold'>
                        <Amount value={totalAmount} />
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
