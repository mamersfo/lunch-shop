import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { cartMachine } from './machine'
import { createActor } from 'xstate'

export const send = async (payload: any) => {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const {
        data: { session },
        error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError) {
        throw sessionError
    }

    if (!session) {
        throw new Error(
            'cannot send payload to machine without a supabase session'
        )
    }

    const { data, error: fetchError } = await supabase
        .from('sessions')
        .select('cart')
        .eq('id', session?.user.id)
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

    actor.subscribe({
        async next(snapshot: any) {},
        async error(error: any) {
            actorError = error
        },
        async complete() {
            const cart = actor.getPersistedState()

            const { data, error: upsertError } = await supabase
                .from('sessions')
                .upsert({ id: session.user.id, cart })

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
}
