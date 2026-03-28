import { NextResponse } from 'next/server'
import CloudConvert from 'cloudconvert'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const file = formData.get('file') as File | null
    const outputFormat = formData.get("outputFormat") as string

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const apiKey = process.env.CLOUDCONVERT_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'API key missing' }, { status: 500 })
    }

    const cloudConvert = new CloudConvert(apiKey)

    const job = await cloudConvert.jobs.create({
      tasks: {
        'import-file': { operation: 'import/upload' },
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

    const uploadTask = job.tasks.find((t: any) => t.name === 'import-file')
    if (!uploadTask) {
      return NextResponse.json({error: 'Upload task not found'},{ status: 500})
    }
    await cloudConvert.tasks.upload(uploadTask, file)

    const completedJob = await cloudConvert.jobs.wait(job.id)

    const exportTask = completedJob.tasks.find((t: any) => t.name === 'export-file')
    const fileResult = exportTask?.result?.files?.[0]

    if (!fileResult?.url) {
      return NextResponse.json({ error: 'File not ready' }, { status: 500 })
    }

    return NextResponse.json({
      url: fileResult.url + "?download=1"
    })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}