import { Database } from './supabase'

export type Tables<T extends keyof Database['public']['Tables']> =
    Database['public']['Tables'][T]['Row']

export type Product = Tables<'products'>
export type Cart = Tables<'carts'>
export type Order = Tables<'orders'>

export type LineItem = {
    id: number
    slug: string
    name: string
    price: number
    quantity: number
}
