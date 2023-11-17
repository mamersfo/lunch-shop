import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { type Session } from '@/types'
import { type State } from '@/lib/cart/machine'

export default async function CartState() {
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

    return <pre className='text-sm'>{JSON.stringify(state, null, 2)}</pre>
}
