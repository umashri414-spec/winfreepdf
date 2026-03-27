
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Step 1: Create CloudConvert Job
    const createJob = await fetch('https://api.cloudconvert.com/v2/jobs', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.CLOUDCONVERT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tasks: {
          'import-file': {
            operation: 'import/upload',
          },
          'convert-file': {
            operation: 'convert',
            input: 'import-file',
            input_format: 'pdf',
            output_format: 'docx',
          },
          'export-file': {
            operation: 'export/url',
            input: 'convert-file',
          },
        },
      }),
    });

    const job = await createJob.json();

    if (!createJob.ok) {
      return NextResponse.json({ error: job }, { status: 422 });
    }

    // Step 2: Upload the file
    const uploadTask = job.data.tasks.find(
      (t: any) => t.name === 'import-file'
    );
    const uploadUrl = uploadTask.result.form.url;
    const uploadParams = uploadTask.result.form.parameters;

    const uploadForm = new FormData();
    Object.entries(uploadParams).forEach(([key, value]) => {
      uploadForm.append(key, value as string);
    });
    uploadForm.append('file', file);

    await fetch(uploadUrl, {
      method: 'POST',
      body: uploadForm,
    });

    // Step 3: Wait for job to finish
    let finished = false;
    let exportTask: any = null;

    while (!finished) {
      await new Promise((r) => setTimeout(r, 2000));

      const statusRes = await fetch(
        `https://api.cloudconvert.com/v2/jobs/${job.data.id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.CLOUDCONVERT_API_KEY}`,
          },
        }
      );
      const statusJob = await statusRes.json();

      const status = statusJob.data.status;

      if (status === 'finished') {
        exportTask = statusJob.data.tasks.find(
          (t: any) => t.name === 'export-file'
        );
        finished = true;
      } else if (status === 'error') {
        return NextResponse.json({ error: 'Conversion failed' }, { status: 500 });
      }
    }

    // Step 4: Return download URL
    const downloadUrl = exportTask.result.files[0].url;

    return NextResponse.json({ downloadUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
