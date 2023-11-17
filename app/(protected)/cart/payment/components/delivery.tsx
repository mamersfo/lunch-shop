export default function Delivery({ cost, details }: any) {
    return (
        <table className='table w-full'>
            <tbody>
                <tr>
                    <td>Shipping method:</td>
                    <td>{cost.shipping_rate.display_name}</td>
                </tr>
                <tr>
                    <td>Carrier:</td>
                    <td>{cost.shipping_rate.metadata.carrier}</td>
                </tr>
                <tr>
                    <td className='align-top'>Ship to:</td>
                    <td>
                        <div>{details.name}</div>
                        <div>{details.address.line1}</div>
                        {details.address.line2 && (
                            <div>{details.address.line1}</div>
                        )}
                        <div>
                            {details.address.postal_code} {details.address.city}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
