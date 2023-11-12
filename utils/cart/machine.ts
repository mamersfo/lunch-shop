import { assign, createMachine } from 'xstate'

export type Address = {
    name: string
    'address-line1': string
    'address-line2': string
    'postal-code': string
    city: string
}

export type Context = {
    products: string[]
    shipping?: string
    address?: Address
    error?: string
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
                | { type: 'addToCart'; product: string }
                | { type: 'removeFromCart'; product: string }
                | { type: 'checkout' }
                | { type: 'continueShopping' }
                | {
                      type: 'updateAddress'
                      address: Address
                  }
                | {
                      type: 'updateShipping'
                      method: string
                  }
        },
        context: {
            products: [],
        },
        initial: 'shopping',
        states: {
            shopping: {
                on: {
                    addToCart: {
                        target: 'shopping',
                        actions: [
                            assign({
                                products: ({ context, event }) => [
                                    ...context.products,
                                    event.product,
                                ],
                            }),
                        ],
                    },
                    removeFromCart: {
                        target: 'shopping',
                        actions: [
                            assign({
                                products: ({ context, event }) => {
                                    return context.products.filter(
                                        (p) => p !== event.product
                                    )
                                },
                            }),
                        ],
                    },
                    checkout: {
                        target: 'checkout',
                    },
                },
            },
            checkout: {
                on: {
                    continueShopping: {
                        target: 'shopping',
                    },
                    updateAddress: {
                        target: 'checkout',
                        actions: [
                            assign({
                                address: ({ event }) => {
                                    return event.address
                                },
                            }),
                            'persist',
                        ],
                    },
                    updateShipping: {
                        target: 'checkout',
                        actions: [
                            assign({
                                shipping: ({ event }) => event.method,
                            }),
                        ],
                    },
                },
            },
        },
    },
    {}
)
