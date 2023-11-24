export default function Shipping({
    method,
    details,
}: {
    method?: string | null
    details?: any | null
}) {
    return (
        <table className='table w-full'>
            <tbody>
                {method && (
                    <tr>
                        <td>Shipping method:</td>
                        <td>{method}</td>
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
