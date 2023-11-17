import { PropsWithChildren } from 'react'
import { QueryProvider } from '@/app/components'

export default async function Layout({ children }: PropsWithChildren<{}>) {
    return <QueryProvider>{children}</QueryProvider>
}
