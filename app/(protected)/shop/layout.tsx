import { Header, Logout } from '@/components'
import { CartIcon } from './components'

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header title='dogswagshop'>
                <CartIcon href='/cart' />
                <Logout />
            </Header>
            {children}
        </>
    )
}
