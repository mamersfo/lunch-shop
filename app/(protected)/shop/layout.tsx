import { Header, Logout } from '@/app/components'
import { CartIcon } from './components'

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header title='dogswagshop' href='/shop'>
                <CartIcon href='/cart' />
                <Logout />
            </Header>
            {children}
        </>
    )
}
