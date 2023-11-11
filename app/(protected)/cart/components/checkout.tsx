import { revalidatePath } from 'next/cache'
import { send } from '@/utils/cart'
import { type State } from '@/utils/cart/machine'
import { type Shipping } from '@/types'

export default async function Checkout({
    state,
    shipping,
}: {
    state: State
    shipping: Shipping[]
}) {
    const updateShipping = async (formData: FormData) => {
        'use server'
        const method = formData.get('method')
        await send({ type: 'updateShipping', method })
        revalidatePath('/cart')
    }

    return (
        <div className='w-full'>
            <div className='flex flex-row gap-4'>
                <div className='w-full'>
                    <div className='text-md font-semibold'>Address</div>
                    <form>
                        <div className='form-control w-full'>
                            <label className='label'>
                                <span className='label-text'>Name</span>
                            </label>
                            <input
                                type='text'
                                name='name'
                                className='input input-bordered w-full max-w-lg'
                            />
                        </div>
                        <div className='form-control w-full'>
                            <label className='label'>
                                <span className='label-text'>
                                    Addres line 1
                                </span>
                            </label>
                            <input
                                type='text'
                                name='address-line1'
                                className='input input-bordered w-full max-w-lg'
                            />
                        </div>
                        <div className='form-control w-full'>
                            <label className='label'>
                                <span className='label-text'>
                                    Address line 2
                                </span>
                            </label>
                            <input
                                type='text'
                                name='address-line2'
                                className='input input-bordered w-full max-w-lg'
                            />
                        </div>
                        <div className='form-control w-full'>
                            <label className='label'>
                                <span className='label-text'>Postal code</span>
                            </label>
                            <input
                                type='text'
                                name='postal-code'
                                className='input input-bordered w-full max-w-lg'
                            />
                        </div>
                        <div className='form-control w-full'>
                            <label className='label'>
                                <span className='label-text'>City</span>
                            </label>
                            <input
                                type='text'
                                name='address-level-2'
                                className='input input-bordered w-full max-w-lg'
                            />
                        </div>
                    </form>
                </div>
                {shipping?.length > 0 && (
                    <div className='w-full'>
                        <div className='text-md font-semibold'>Shipping</div>
                        <form action={updateShipping}>
                            {shipping.map((s: Shipping) => (
                                <div
                                    key={`shipping-${s.id}`}
                                    className='form-control flex flex-row gap-4 place-items-center justify-between w-2/3'
                                >
                                    <label className='label cursor-pointer'>
                                        <span className='label-text capitalize'>
                                            {s.method} - delivery in{' '}
                                            {s.min_days}-{s.max_days} days
                                        </span>
                                    </label>
                                    <input
                                        type='radio'
                                        name='method'
                                        value={s.method}
                                        className='radio'
                                        defaultChecked={
                                            state.context.shipping ===
                                                s.method || s.is_default
                                        }
                                    />
                                </div>
                            ))}
                            <button className='btn mt-4'>Apply</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}
