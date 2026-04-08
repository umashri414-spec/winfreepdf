
import { NextRequest, NextResponse } from 'next/server'
import CloudConvert from 'cloudconvert'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const outputFormat = formData.get('outputFormat') as string
    const toolId = formData.get('toolId') as string

    if (!file || !outputFormat) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const cloudConvert = new CloudConvert(process.env.CLOUDCONVERT_API_KEY!)

    const convertOptions: any = {
      operation: 'convert',
      input: 'import-file',
      output_format: outputFormat,
    }

    if (['docx', 'xlsx', 'pptx'].includes(file.name.split('.').pop()?.toLowerCase() || '')) {
      convertOptions.engine = 'libreoffice'
    }

    if (toolId === 'protect-pdf') {
      convertOptions.user_password = '1234'
      convertOptions.owner_password = '1234'
    }

    if (toolId === 'compress-pdf') {
      convertOptions.pdf_compression = 'screen'
    }

    const job = await cloudConvert.jobs.create({
      tasks: {
        'import-file': { operation: 'import/upload' },
        'convert-file': convertOptions,
        'export-file': { operation: 'export/url', input: 'convert-file' }
      }
    })

    const uploadTask = job.tasks.find(t => t.name === 'import-file')
    await cloudConvert.tasks.upload(uploadTask!, file)

    const completedJob = await cloudConvert.jobs.wait(job.id)
    const exportTask = completedJob.tasks.find(t => t.name === 'export-file')
    const result = exportTask?.result?.files?.[0]

    return NextResponse.json({ url: result?.url })

  } catch (error) {
    console.error('Conversion error:', error)
    return NextResponse.json({ error: 'Conversion failed' }, { status: 500 })
  }
}
