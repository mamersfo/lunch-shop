import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Tailwind,
    Text,
} from '@react-email/components'
import { type Order } from '@/types'

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : ''

export function OrderConfirmationEmail({ order }: { order: Order }) {
    return (
        <Tailwind
            config={{
                theme: {
                    fontFamily: {
                        sans: ['Roboto', 'sans-serif'],
                    },
                },
            }}
        >
            <Html>
                <Head />
                <Preview>Log in with this magic link</Preview>
                <Body className='bg-white'>
                    <Container className='pl-12 pr-12 margin-auto'>
                        <Heading className='font-sans text-2xl font-semibold'>
                            Order Confirmation
                        </Heading>
                        <Text className='font-sans text-gray-400 text-md'>
                            Thanks for buying at dogswagshop.
                        </Text>
                        <Link
                            href={`http://localhost:3000/shop/orders/${order.id}`}
                            target='_blank'
                            className='font-sans text-gray-500 text-sm underline'
                        >
                            View your order
                        </Link>
                        {/* <Img
                            src={`${baseUrl}/static/paw.svg`}
                            width='32'
                            height='32'
                            alt='dogswagshop logo'
                        /> */}
                        <Text className='font-sans text-gray-500 text-sm'>
                            <Link
                                href='https://dogswagshop.com'
                                target='_blank'
                                className='font-sans text-gray-500 text-sm underline'
                            >
                                dogswagshop
                            </Link>
                            , for all that wags your dog
                        </Text>
                    </Container>
                </Body>
            </Html>
        </Tailwind>
    )
}
