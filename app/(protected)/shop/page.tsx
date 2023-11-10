import { ProductCard, Protected } from '@/components'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Shop() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase.from('products').select()

    if (error) {
        throw new Error(error.message)
    }

    return (
        <Protected redirectTo='/shop'>
            <div className='flex flex-row flex-wrap gap-4'>
                {data.map((product, idx) => (
                    <ProductCard key={`product-card-${idx}`} {...product} />
                ))}
            </div>
        </Protected>
    )
}
