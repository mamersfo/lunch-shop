import Image from 'next/image'
import { CreditCardIcon } from '@heroicons/react/24/outline'
import visaIcon from '@/public/icons8-visa.svg'
import mastercardIcon from '@/public/icons8-mastercard.svg'
import amexIcon from '@/public/icons8-american-express.svg'

export default function PaymentMethod({ data }: any) {
    let icon: any

    switch (data.payment_method.card.brand) {
        case 'amex':
            icon = amexIcon
            break
        case 'mastercard':
            icon = mastercardIcon
            break
        case 'visa':
            icon = visaIcon
            break
        default:
            break
    }

    return (
        <table className='table'>
            <tbody>
                <tr>
                    <td>Payment method</td>
                    <td className='text-right'>
                        <CreditCardIcon className='h-6 w-6' />
                    </td>
                </tr>
                <tr>
                    <td>Card</td>
                    <td className='text-right'>
                        <Image
                            src={icon}
                            width={26}
                            height={26}
                            alt={data.payment_method.brand}
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
