import Link from 'next/link'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { Amount } from '@/app/components'
import { formatRelative, parseISO } from 'date-fns'

export default async function Page() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
        .from('orders')
        .select()
        .order('created_at', { ascending: false })

    if (error) {
        throw error
    }

    const now = new Date()

    return (
        <>
            <div className='text-lg font-semibold'>Orders</div>
            <table className='table w-1/2'>
                <tbody>
                    {data?.map((d: any, idx: number) => (
                        <tr key={`order-${idx}`}>
                            <td>
                                {formatRelative(parseISO(d.created_at), now)}
                            </td>
                            <td>
                                <Link
                                    href={`/shop/orders/${d.id}`}
                                    className='hover:underline'
                                >
                                    {d.order_id}
                                </Link>
                            </td>
                            <td className='text-right'>
                                <Amount value={d.order_amount} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
