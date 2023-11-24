import { Header, Logout, Profile } from '@/app/components'
import { CartIcon } from './components'

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header title='dogswagshop' href='/shop'>
                <CartIcon href='/shop/cart' />
                <Profile />
            </Header>
            {children}
        </>
    )
}
