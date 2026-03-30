
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    
    const response = await fetch(
      'https://pdf-backend-dvzt.onrender.com/api/convert',
      {
        method: 'POST',
        body: formData,
      }
    )

    if (!response.ok) {
      return NextResponse.json({ error: 'Conversion failed' }, { status: 500 })
    }

    const blob = await response.blob()
    const buffer = Buffer.from(await blob.arrayBuffer())
    
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream',
        'Content-Disposition': response.headers.get('Content-Disposition') || 'attachment',
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Conversion failed' }, { status: 500 })
  }
}
