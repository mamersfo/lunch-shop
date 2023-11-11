import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { type Session } from '@/types'
import { Totals, Viewing } from './components'
import { type LineItem } from '@/types'
import { type State } from '@/utils/cart/machine'

export default async function Page() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error: sessionsError } = await supabase
        .from('sessions')
        .select('cart')
        .maybeSingle()

    if (sessionsError) {
        throw sessionsError
    }

    const session = data as Session
    const state = session?.cart as State

    let lineItems: LineItem[] = []

    if (state?.context.products.length > 0) {
        const bag = state.context.products.reduce(
            (bag: Record<string, number>, slug: string) =>
                Object.assign(bag, { [slug]: (bag[slug] || 0) + 1 }),
            {}
        )

        const { data: products, error: productsError } = await supabase
            .from('products')
            .select('id, slug, name, price')
            .in('slug', Object.keys(bag))

        if (productsError) {
            throw productsError
        }

        lineItems = products?.map(
            (p: any) => Object.assign(p, { quantity: bag[p.slug] }) as LineItem
        )
    }

    return (
        <div className='flex flex-row gap-4'>
            <div className='w-3/4 flex flex-col gap-4'>
                {state.value === 'shopping' && (
                    <Viewing {...{ state, lineItems }} />
                )}
            </div>
            <div className='w-1/4'>
                <div className='flex flex-col gap-4'>
                    <Totals {...{ state, lineItems }} />
                </div>
            </div>
        </div>
    )
}