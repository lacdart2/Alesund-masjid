import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { to, subject, html } = body

        console.log('Sending email to:', to)
        console.log('API Key starts with:', process.env.RESEND_API_KEY?.slice(0, 8))

        if (!to || !subject || !html) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
        }

        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to,
            subject,
            html,
        })

        console.log('Resend response:', JSON.stringify({ data, error }))

        if (error) return NextResponse.json({ error }, { status: 500 })
        return NextResponse.json({ success: true, data })
    } catch (err: any) {
        console.error('Route error:', err.message)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}