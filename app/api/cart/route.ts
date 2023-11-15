import { NextRequest, NextResponse } from 'next/server'
import { send } from '@/lib/cart'

export async function POST(req: NextRequest) {
    try {
        const json = await req.json()
        const value = await send(json)
        return NextResponse.json({ value })
    } catch (err) {
        return NextResponse.json(
            { error: (err as Error).message },
            { status: 500 }
        )
    }
}
