import Logout from '@/components/logout'

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-row p-4 justify-between'>
                <div className='text-xl font-semibold'>dogswag</div>
                <Logout />
            </div>
            <div className='p-4'>{children}</div>
        </div>
    )
}
