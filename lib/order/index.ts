import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { orderMachine } from './machine'
import { createActor } from 'xstate'

export const send = async (orderId: string, payload: any) => {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error: fetchError } = await supabase
        .from('orders')
        .select('state')
        .eq('order_id', orderId)
        .maybeSingle()

    if (fetchError) {
        throw fetchError
    }

    let actor: any

    if (data?.state) {
        try {
            actor = createActor(orderMachine, {
                state: data.state,
            })
        } catch (e) {
            throw new Error(
                `Error creating actor from state, message: ${
                    (e as Error).message
                }`
            )
        }
    } else {
        actor = createActor(orderMachine)
    }

    let actorError = null
    let value = null

    actor.subscribe({
        async next(snapshot: any) {
            value = snapshot.value
        },
        async error(error: any) {
            actorError = error
        },
        async complete() {
            const persistedState = actor.getPersistedState()

            const { data, error: upsertError } = await supabase
                .from('orders')
                .upsert({ state: persistedState })

            if (upsertError) {
                actorError = upsertError
            }
        },
    })

    actor.start()
    actor.send(payload)
    actor.stop()

    if (actorError) {
        throw new Error(
            `@lib/order.send() - error: ${(actorError as Error).message}`
        )
    }

    return value
}
