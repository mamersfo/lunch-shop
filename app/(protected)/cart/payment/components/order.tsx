import { Amount } from '@/app/components'
import { formatRelative, fromUnixTime } from 'date-fns'
import { enUS } from 'date-fns/locale'

export default function Order({ data }: any) {
    return (
        <table className='table'>
            <tbody>
                <tr>
                    <td>Order number:</td>
                    <td className='font-semibold'>{data.metadata.order_id}</td>
                </tr>
                <tr>
                    <td>Order date:</td>
                    <td>
                        {formatRelative(
                            fromUnixTime(data.created),
                            new Date(),
                            {
                                locale: enUS,
                            }
                        )}
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
