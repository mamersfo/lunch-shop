import { GeistSans } from 'geist/font'
import './globals.css'

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: 'dogswagshop',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en' className={GeistSans.className}>
            <body>
                <main className='p-4'>{children}</main>
            </body>
        </html>
    )
}
