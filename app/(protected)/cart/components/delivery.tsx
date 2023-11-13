'use client'

import { ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/utils/supabase/static'
import { type Shipping } from '@/types'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Delivery({ selected }: { selected: string }) {
    const router = useRouter()

    const query = useQuery({
        queryKey: ['shipping'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('shipping')
                .select()
                .order('min_days', { ascending: false })
            if (error) throw error
            return data
        },
    })

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const response = await fetch('/api/cart', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                type: 'updateShipping',
                method: e.currentTarget.value,
            }),
        })

        if (!response.ok) {
            const json = await response.json()
            console.error('error', json)
            return
        }

        router.refresh()
    }

    return (
        <div className='flex flex-col p-4'>
            <div className='text-lg font-semibold'>Shipping method</div>
            <div className='flex flex-col w-2/3'>
                {query.isLoading && <Skeleton count={3} />}
                {query.data?.map((s: Shipping) => (
                    <div
                        key={`shipping-${s.id}`}
                        className='form-control flex flex-row place-items-center justify-between'
                    >
                        <label className='label cursor-pointer'>
                            <span className='label-text capitalize'>
                                {s.method} - delivery
                            </span>
                            <>&nbsp;</>
                            {!s.min_days && !s.max_days ? (
                                <span className='label-text'>today</span>
                            ) : (
                                <span className='label-text'>
                                    in {s.min_days}-{s.max_days} days
                                </span>
                            )}
                        </label>
                        <input
                            type='radio'
                            name='method'
                            value={s.method}
                            className='radio'
                            checked={s.method === selected}
                            onChange={handleChange}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
