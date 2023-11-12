import { revalidatePath } from 'next/cache'
import { send } from '@/utils/cart'
import { type Address, State } from '@/utils/cart/machine'
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

        const address: Address = {
            name: formData.get('name') as string,
            'address-line1': formData.get('address-line1') as string,
            'address-line2': formData.get('address-line2') as string,
            'postal-code': formData.get('postal-code') as string,
            city: formData.get('city') as string,
        }

        await send({ type: 'updateAddress', address })

        await send({
            type: 'updateShipping',
            method: formData.get('method') as string,
        })

        revalidatePath('/cart')
    }

    return (
        <div className='w-full'>
            <form action={updateShipping}>
                <div className='flex flex-row gap-4'>
                    <div className='w-full'>
                        <div className='text-md font-semibold'>
                            Shipping address
                        </div>
                        <div className='form-control w-full'>
                            <label className='label'>
                                <span className='label-text'>Name</span>
                            </label>
                            <input
                                type='text'
                                name='name'
                                className='input input-bordered w-full max-w-lg'
                                required
                                defaultValue={state?.context.address?.name}
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
                                required
                                defaultValue={
                                    state?.context.address?.['address-line1']
                                }
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
                                defaultValue={
                                    state?.context.address?.['address-line2']
                                }
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
                                required
                                defaultValue={
                                    state?.context.address?.['postal-code']
                                }
                            />
                        </div>
                        <div className='form-control w-full'>
                            <label className='label'>
                                <span className='label-text'>City</span>
                            </label>
                            <input
                                type='text'
                                name='city'
                                className='input input-bordered w-full max-w-lg'
                                required
                                defaultValue={state?.context.address?.city}
                            />
                        </div>
                    </div>
                    {shipping?.length > 0 && (
                        <div className='w-full'>
                            <div className='text-md font-semibold'>
                                Shipping method
                            </div>
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
                            <button className='btn mt-4 w-full'>Update</button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    )
}
