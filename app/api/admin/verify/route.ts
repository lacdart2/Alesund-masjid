import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json()

        const adminEmail = process.env.ADMIN_EMAIL
        const adminPassword = process.env.ADMIN_PASSWORD

        if (email === adminEmail && password === adminPassword) {
            return NextResponse.json({ success: true })
        }
        console.log('ENV EMAIL:', process.env.ADMIN_EMAIL)
        console.log('ENV PASSWORD:', process.env.ADMIN_PASSWORD)
        console.log('INPUT EMAIL:', email)
        console.log('INPUT PASSWORD:', password)
        return NextResponse.json({ success: false }, { status: 401 })
    } catch {
        return NextResponse.json({ success: false }, { status: 500 })
    }
}