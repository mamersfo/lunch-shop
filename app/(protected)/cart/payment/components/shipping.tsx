import type { Stripe } from 'stripe'

export default function Shipping({
    rate,
    details,
}: {
    rate?: Stripe.ShippingRate
    details?: Stripe.Checkout.Session.ShippingDetails | null
}) {
    return (
        <table className='table w-full'>
            <tbody>
                {rate?.display_name && (
                    <tr>
                        <td>Shipping method:</td>
                        <td>{rate.display_name}</td>
                    </tr>
                )}
                {rate?.metadata.carrier && (
                    <tr>
                        <td>Carrier:</td>
                        <td>{rate.metadata.carrier}</td>
                    </tr>
                )}
                {details && (
                    <tr>
                        <td className='align-top'>Ship to:</td>
                        <td>
                            <div>{details.name}</div>
                            {details.address && (
                                <>
                                    <div>{details.address.line1}</div>
                                    {details.address.line2 && (
                                        <div>{details.address.line1}</div>
                                    )}
                                    <div>
                                        {details.address.postal_code}{' '}
                                        {details.address.city}
                                    </div>
                                </>
                            )}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}
