import { Database } from './supabase'

export type Tables<T extends keyof Database['public']['Tables']> =
    Database['public']['Tables'][T]['Row']

export type Product = Tables<'products'>
export type Session = Tables<'sessions'>
