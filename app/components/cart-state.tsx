import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export default async function CartState() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: cart, error: cartsError } = await supabase
        .from('carts')
        .select('state')
        .maybeSingle()

    if (cartsError) {
        throw cartsError
    }

    return <pre className='text-sm'>{JSON.stringify(cart?.state, null, 2)}</pre>
}
