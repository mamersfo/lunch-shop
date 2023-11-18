import { eventTrigger } from '@trigger.dev/sdk'
import { client } from '@/trigger'
import { Supabase } from '@trigger.dev/supabase'
import { Database } from '@/types/supabase'

const supabase = new Supabase<Database>({
    id: 'supabase',
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
})

client.defineJob({
    id: 'supabase-job',
    name: 'Supabase Job: perform a query',
    version: '0.0.1',
    integrations: {
        supabase,
    },
    trigger: eventTrigger({
        name: 'supabase.event',
    }),
    run: async (payload, io, ctx) => {
        const { data, error } = await io.supabase.runTask(
            'find-orders',
            async (db) => {
                return db.from('orders').select('*')
            }
        )

        await io.logger.info(`Orders: ${JSON.stringify(data)}`)
    },
})
