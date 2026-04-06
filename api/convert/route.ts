
import { NextResponse } from 'next/server'
import CloudConvert from 'cloudconvert'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const outputFormat = formData.get('outputFormat') as string

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    if (!outputFormat) {
      return NextResponse.json({ error: 'No output format specified' }, { status: 400 })
    }

    const cloudConvert = new CloudConvert(process.env.CLOUDCONVERT_API_KEY!)

    const job = await cloudConvert.jobs.create({
      tasks: {
        'import-file': {
          operation: 'import/upload'
        },
        'convert-file': {
          operation: 'convert',
          input: 'import-file',
          output_format: outputFormat
        },
        'export-file': {
          operation: 'export/url',
          input: 'convert-file'
        }
      }
    })

    const uploadTask = job.tasks.find(t => t.name === 'import-file')
    await cloudConvert.tasks.upload(uploadTask!, file)

    const completedJob = await cloudConvert.jobs.wait(job.id)

    const exportTask = completedJob.tasks.find(t => t.name === 'export-file')
    const result = exportTask?.result?.files?.[0]

    return NextResponse.json({
      url: result?.url
    })

  } catch (error) {
    console.error('Conversion error:', error)
    return NextResponse.json({ error: 'Conversion failed' }, { status: 500 })
  }
}    
