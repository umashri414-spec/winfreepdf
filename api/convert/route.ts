ssss
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const inputFormat = formData.get('inputFormat') as string;
  const outputFormat = formData.get('outputFormat') as string;

  const API_KEY = process.env.CLOUDCONVERT_API_KEY;

  try {
    const uploadRes = await fetch('https://api.cloudconvert.com/v2/import/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    const uploadData = await uploadRes.json();

    const fd = new FormData();
    Object.entries(uploadData.data.result.form.parameters).forEach(([k, v]) => fd.append(k, v as string));
    fd.append('file', file);
    await fetch(uploadData.data.result.form.url, { method: 'POST', body: fd });

    const jobRes = await fetch('https://api.cloudconvert.com/v2/jobs', {
      method: 'POST',
      headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tasks: {
          convert: { operation: 'convert', input: uploadData.data.id, input_format: inputFormat, output_format: outputFormat },
          export: { operation: 'export/url', input: 'convert' }
        }
      }),
    });
    const jobData = await jobRes.json();

    let job;
    while (true) {
      const check = await fetch(`https://api.cloudconvert.com/v2/jobs/${jobData.data.id}`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
      job = await check.json();
      if (job.data.status === 'finished') break;
      if (job.data.status === 'error') return NextResponse.json({ error: 'Failed' }, { status: 500 });
      await new Promise(r => setTimeout(r, 2000));
    }

    const exportTask = job.data.tasks.find((t: any) => t.name === 'export');
    const fileUrl = exportTask.result.files[0].url;
    const fileName = exportTask.result.files[0].filename;

    return NextResponse.json({ url: fileUrl, filename: fileName });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
