import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { type Session } from '@/types'
import { type Context } from '@/utils/cart/machine'

export default async function CartIcon() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
        .from('sessions')
        .select()
        .maybeSingle()

    if (error) {
        throw new Error(error.message)
    }

    const session = data as Session
    const cart = session.cart as {
        context: Context
    }

    return (
        <a
            href='/shop/cart'
            className='btn btn-ghost btn-circle cursor-pointer'
        >
            <div className='indicator'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                    />
                </svg>
                <span className='badge badge-sm indicator-item bg-red-500 text-white'>
                    {cart.context.products?.length || 0}
                </span>
            </div>
        </a>
    )
}
