
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')

    const response = await fetch(
      `https://v2.convertapi.com/convert/pdf/to/docx?Secret=${process.env.CONVERTAPI_SECRET}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Parameters: [
            {
              Name: 'File',
              FileValue: {
                Name: file.name,
                Data: base64
              }
            }
          ]
        })
      }
    )

    const result = await response.json()
    
    if (!result.Files?.[0]?.FileData) {
      return NextResponse.json({ error: 'Conversion failed' }, { status: 500 })
    }

    const docxBuffer = Buffer.from(result.Files[0].FileData, 'base64')
    
    return new NextResponse(docxBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="converted.docx"`
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Conversion failed' }, { status: 500 })
  }
}