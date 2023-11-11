import { send } from '@/utils/cart'
import { AuthApiError } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

export const AddToCartButton = ({ product }: { product: string }) => {
    const addToCart = async () => {
        'use server'
        await send({ type: 'addToCart', product })
        // try {
        //     await send({ type: 'addToCart', product })
        // } catch (e) {
        //     if (e instanceof AuthApiError) {
        //         console.log('got AuthApiError:', e)
        //         redirect('/login')
        //     } else {
        //         throw e
        //     }
        // }
    }

    return (
        <form action={addToCart}>
            <button className='mt-8 btn uppercase w-full'>
                in winkelwagen
            </button>
        </form>
    )
}
