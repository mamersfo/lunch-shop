import { createMachine } from 'xstate'

export type Context = {
    userId: string
}

export const orderMachine = createMachine(
    {
        id: 'order',
        types: {} as {
            context: Context
            events: { type: 'create'; userId: string }
        },
        context: ({ input }: { input: Context }) => ({
            userId: input.userId,
        }),
        initial: 'initial',
        states: {
            initial: {
                on: {
                    create: {
                        target: 'created',
                    },
                },
            },
            created: {},
        },
    },
    {}
)
