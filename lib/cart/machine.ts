import { assign, createMachine } from 'xstate'

export type LineItem = {
    slug: string
    name: string
    price: number
    quantity: number
}

export type Context = {
    lineItems: LineItem[]
}

export type State = {
    value: string
    context: Context
}

export const cartMachine = createMachine(
    {
        /** @xstate-layout N4IgpgJg5mDOIC5QGMCGAnALgOlgCwHsAHIgSwDsoBiVCCAbQAYBdRUIg2UzUg8tkAA9EARhGNsAdgBsAZgCcAVkXzJikQA5G8jQBoQAT0SKATPOzjJIydo0mALCcaSAvi-1osuQiQrV0YAC2BABuYEysSCAcXDx8AsIIIo7YJhr20oyMihq5ydL6RgiSsiapzpKS8g4iqoqybh4YOPjEZJRUIaRgAO4RAjHcvPxRibKSGtgZGiXZJrUmaYqFiNLJFiaVi-WyyqWNIJ44R1TIeGDIANYEAK6Y-VGDcSOgiSplYor2u1+5MwWGVaMWRTOwyRjSEw5H4HI7YM4Xa53U58HjkG7hFgDThDeKjIGSbAKCHieyKRhQjTLQEIUofezpUpk+QkxSw5rw85XW6YKjkMCCe5Yx4454JRC5exTWQMjRiUpqWQrBAqaQbEyyESyCHKUwidlefCkXwdfmCh7sUXDcUIKlS+SOaR2ypUxj2ZVyomLeRa+w6dTfewGnBEVAGQJgci82A3ZDIOCwC3RK1416iSRS+pQsn2aalWRKmmOQkarWasmZN0y4PYUPhyO8gBmqFIABsbgEk09rfikhnsFmvl88xrC0UnCIpLtpJIzBN5-IGgdyAQIHABEdsbEe2mEABaAFFPeKbDyM9nmUaGciaTktnuQ4c1omqBb3EvISIaoDmcFn3jB1dj0Gk1hBKpFGkH00lybV7yaLxNxFbdU0-BB7EqCxsmSHJ5hmJRqSKUCpCUSCRGgjRtVcB84QRbk7jfMVe1ncxanUPYtXJBxlUyEERHJZjZDlMQzBrI0XwYndUPERhJ0yHQJnmVQNB0ZUVBPKoKTlOxGDseRpBrOsIyjCSUMSRxlXsG8BxMSC3XSGYKPkNw3CAA */
        id: 'cart',
        types: {} as {
            context: Context
            events:
                | {
                      type: 'addToCart'
                      slug: string
                      name: string
                      price: number
                  }
                | { type: 'removeFromCart'; slug: string }
        },
        context: {
            lineItems: [],
        },
        initial: 'shopping',
        states: {
            shopping: {
                on: {
                    addToCart: {
                        target: 'shopping',
                        actions: [
                            assign({
                                lineItems: ({ context, event }) =>
                                    updateLineItems(
                                        context.lineItems,
                                        {
                                            slug: event.slug,
                                            name: event.name,
                                            price: event.price,
                                        },
                                        +1
                                    ),
                            }),
                        ],
                    },
                    removeFromCart: {
                        target: 'shopping',
                        actions: [
                            assign({
                                lineItems: ({ context, event }) =>
                                    updateLineItems(
                                        context.lineItems,
                                        {
                                            slug: event.slug,
                                        },
                                        -1
                                    ),
                            }),
                        ],
                    },
                },
            },
        },
    },
    {}
)

const updateLineItems = (
    lineItems: LineItem[],
    product: {
        slug: string
        name?: string
        price?: number
    },
    quantity: number
) => {
    const found = lineItems.filter((li) => li.slug === product.slug)

    if (found.length > 0) {
        if (found[0].quantity + quantity <= 0) {
            return lineItems.filter((li) => li.slug !== product.slug)
        }

        return lineItems.map((li) => {
            if (li.slug === product.slug) {
                li.quantity += quantity
            }
            return li
        })
    } else if (product.name && product.price) {
        return [
            ...lineItems,
            {
                slug: product.slug,
                name: product.name,
                price: product.price,
                quantity,
            },
        ]
    }

    return lineItems
}
