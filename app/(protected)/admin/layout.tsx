import { Header, Logout } from '@/components'

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header title='dogswagshop admin'>
                <Logout />
            </Header>
            {children}
        </>
    )
}
