export default function Amount({ value }: { value: number }) {
    if (value) {
        return (
            <span className='w-full text-right'>
                &euro; {(value / 100.0).toFixed(2)}
            </span>
        )
    }
    return <></>
}
