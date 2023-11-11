import Logout from '@/components/logout'
import { CartIcon } from '@/components'

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-row p-4 justify-between'>
                <div className='text-xl font-semibold'>dogswag</div>
                <div className='flex flex-row gap-4 h-10'>
                    <CartIcon />
                    <Logout />
                </div>
            </div>
            <div className='p-4'>{children}</div>
        </div>
    )
}
