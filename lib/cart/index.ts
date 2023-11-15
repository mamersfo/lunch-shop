import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { cartMachine } from '@/lib/cart/machine'
import { createActor } from 'xstate'

export const send = async (payload: any) => {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error: fetchError } = await supabase
        .from('sessions')
        .select('cart')
        .maybeSingle()

    if (fetchError) {
        throw fetchError
    }

    let actor: any

    if (data?.cart) {
        try {
            actor = createActor(cartMachine, {
                state: data.cart,
            })
        } catch (e) {
            throw new Error(
                `Error creating actor from state: ${(e as Error).message}`
            )
        }
    } else {
        actor = createActor(cartMachine)
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
            const cart = actor.getPersistedState()
            console.log('saving:', cart)

            const { data, error: upsertError } = await supabase
                .from('sessions')
                .upsert({ cart })

            if (upsertError) {
                actorError = upsertError
            }
        },
    })

    actor.start()
    actor.send(payload)
    actor.stop()

    if (actorError) {
        throw new Error(`send() - error: ${(actorError as Error).message}`)
    }

    return value
}
