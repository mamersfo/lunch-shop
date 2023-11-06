import Protected from '@/components/protected'

export default async function Shop() {
    return (
        <Protected redirectTo='/shop'>
            <div className='flex items-center justify-center p-72'>
                <div className='text-2xl font-semibold text-center'>
                    protected
                </div>
            </div>
        </Protected>
    )
}
