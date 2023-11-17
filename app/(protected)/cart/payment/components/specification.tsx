import { Amount } from '@/app/components'

export default function Specification({
    amount_total,
    line_items,
    shipping_cost,
}: any) {
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
                {line_items?.map((line_item: any, idx: number) => (
                    <tr key={line_item.id}>
                        <td className='w-1/4'>{line_item.description}</td>
                        <td className='w-1/4 text-right'>
                            <Amount value={line_item.price.unit_amount} />
                        </td>
                        <td className='w-1/4 text-right'>
                            {line_item.quantity}
                        </td>
                        <td className='w-1/4 text-right'>
                            <Amount value={line_item.amount_total} />
                        </td>
                    </tr>
                ))}
                <tr key={'shipping-cost'}>
                    <td className='w-1/4'>
                        {shipping_cost.shipping_rate.display_name} delivery
                    </td>
                    <td colSpan={2}></td>
                    <td className='w-1/4 text-right'>
                        <Amount value={shipping_cost.amount_total} />
                    </td>
                </tr>
                <tr key={'shipping-cost'}>
                    <td className='w-1/4'>Total</td>
                    <td colSpan={2}></td>
                    <td className='w-1/4 text-right font-semibold'>
                        <Amount value={amount_total} />
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
