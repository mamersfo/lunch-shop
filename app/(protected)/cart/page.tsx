import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { Totals, Viewing } from './components'
import { type State } from '@/lib/cart/machine'

export default async function Page() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: cart, error: cartsError } = await supabase
        .from('carts')
        .select('state')
        .maybeSingle()

    if (cartsError) {
        throw cartsError
    }

    const state = cart?.state as State
    const lineItems = state.context.lineItems

    return (
        <div className='flex flex-row gap-4'>
            <div className='w-2/3 flex flex-col gap-4'>
                <div className='text-lg font-semibold'>Items</div>
                <Viewing {...{ lineItems }} />
            </div>
            <div className='w-1/3'>
                <div className='flex flex-col gap-4'>
                    <Totals {...{ lineItems }} />
                </div>
            </div>
        </div>
    )
}
