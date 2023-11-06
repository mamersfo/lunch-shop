import Logout from '@/components/logout'

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-row p-4 justify-between'>
                <div>lunch shop</div>
                <Logout />
            </div>
            <div>{children}</div>
        </div>
    )
}
