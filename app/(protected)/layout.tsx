import { PropsWithChildren } from 'react'
import { QueryProvider } from '@/components'

export default async function Layout({ children }: PropsWithChildren<{}>) {
    return <QueryProvider>{children}</QueryProvider>
}
