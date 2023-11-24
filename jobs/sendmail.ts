import { createElement } from 'react'
import { invokeTrigger } from '@trigger.dev/sdk'
import { client } from '@/trigger'
import { z } from 'zod'
import { SendGrid } from '@trigger.dev/sendgrid'
import { render } from '@react-email/render'
import { TestEmail } from '@/app/components/email'

const sendgrid = new SendGrid({
    id: 'sendgrid',
    apiKey: process.env.SENDGRID_API_KEY!,
})

export const sendmailJob = client.defineJob({
    id: 'sendmail-job',
    name: 'Sendmail Job',
    version: '0.0.1',
    trigger: invokeTrigger({
        schema: z.object({
            recipient: z.string(),
        }),
    }),
    integrations: {
        sendgrid,
    },
    run: async ({ recipient }, io, ctx) => {
        const html = await io.runTask('generate-email', async () =>
            render(createElement(TestEmail), {
                pretty: true,
            })
        )

        await io.sendgrid.sendEmail('Test email', {
            to: recipient,
            from: 'Martin van Amersfoorth <martin.van.amersfoorth@finalist.nl>',
            subject: 'Test',
            html,
        })
    },
})
