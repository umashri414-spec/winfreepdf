
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const outputFormat = formData.get('outputFormat') as string

    if (!file || !outputFormat) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const backendForm = new FormData()
    backendForm.append('file', file)
    backendForm.append('output_format', outputFormat)

    const response = await fetch('https://pdf-backend-dvzt.onrender.com/convert', {
      method: 'POST',
      body: backendForm,
    })

    if (!response.ok) {
      throw new Error('Backend conversion failed')
    }

    const blob = await response.blob()
    const contentType = response.headers.get('Content-Type') || 'application/octet-stream'
    
    return new NextResponse(blob, {
      headers: { 'Content-Type': contentType }
    })

  } catch (error: any) {
    console.error('Conversion error:', error?.message || error)
    return NextResponse.json({ error: 'Conversion failed' }, { status: 500 })
  }
}
