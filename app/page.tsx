
"use client";
import { useState, useRef } from "react";

const CLOUDCONVERT_API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMjg1MWMyYmQ0Nzk2MWFlMzdhNzBlMTYxZWFlZWZhZjZhM2Q2NjIyNTgxMWYwN2Q5MjhkNjg2NzU4NDM2ZjA0YWM2NDdhNjQ4ZmM5YTRjOGMiLCJpYXQiOjE3NzQ1NTM3NjIuNjg2OTg3LCJuYmYiOjE3NzQ1NTM3NjIuNjg2OTg5LCJleHAiOjQ5MzAyMjczNjIuNjc5OTY4LCJzdWIiOiI3NDg2MDkwOSIsInNjb3BlcyI6WyJ0YXNrLndyaXRlIiwidGFzay5yZWFkIl19.DG9b2oBWoAq-6M3OpYa-L7Q3eLMFOw3j_L57AXM7JAXoQ-GESEHV3KaKKCevzNuCTZ1yMdPjPHcyymlmmazjuSzcYxT0wRW4MqGnFOHXSPBr_xLK-FbOWVBBQMbNUAStxuYKqYJe9WZn1y8SXh59YP5JIPlv21LeE19WoHCI4Vcz7NQ0koYlo0KcAC1Lp89JpCq9m-Yw4yBnz6ocS6E2fNM6mniBURMMoxtF8zuL5Si_68uyxKa0K4m0KWw0L4t3hafvrw8ZAnI4sxs0rF7bZ-1XpHWAqys6IX8V4X9R54ojqgd8_P6NlOiEeeGFHfbUVXJ3TqE_9NwWCCD3LPkfSQyaIWJ4mZmQ0Ac1DOfyKU2D9usScnoJ865MXMb467q1M-lAW2Dwj2-NVmAUd8kbU4X0ZdAMmiQ0C3j0Y5eeIYXY5Jy2JPjXpQkInEai7hdXkCSBVRCxxZXCnWjRkMKs17-vrjsClLSgHF6GU0P6Pbx8wZ_JrCaW5cbjwe3avEIKf--MP7sg4Rw1KfOT7H53qMIGmA3V6MK_XnVLalWx99h22anZryU7ahXvO1Ldja83lXGlOoL5I8niNcQHy7o_eny--ZGUq7GsLR4NgY3JtRNJl3ofIbRde_0bHZrFBoVuJIby9G0coM6qo5dxaBWjKU8NgkNE6IK0CV99y43iY8E";

const tools = [
  { id: "pdf-to-word", icon: "📄", title: "PDF to Word", inputFormat: "pdf", outputFormat: "docx", desc: "PDF ஐ Word ஆக மாற்று", color: "#e8f4fd", accent: "#2196F3" },
  { id: "word-to-pdf", icon: "📝", title: "Word to PDF", inputFormat: "docx", outputFormat: "pdf", desc: "Word ஐ PDF ஆக மாற்று", color: "#f3e8fd", accent: "#9C27B0" },
  { id: "pdf-to-excel", icon: "📊", title: "PDF to Excel", inputFormat: "pdf", outputFormat: "xlsx", desc: "PDF ஐ Excel ஆக மாற்று", color: "#e8fdf0", accent: "#4CAF50" },
  { id: "excel-to-pdf", icon: "📈", title: "Excel to PDF", inputFormat: "xlsx", outputFormat: "pdf", desc: "Excel ஐ PDF ஆக மாற்று", color: "#fdf4e8", accent: "#FF9800" },
  { id: "pdf-to-jpg", icon: "🖼️", title: "PDF to JPG", inputFormat: "pdf", outputFormat: "jpg", desc: "PDF ஐ Image ஆக மாற்று", color: "#fde8e8", accent: "#F44336" },
  { id: "jpg-to-pdf", icon: "📷", title: "JPG to PDF", inputFormat: "jpg", outputFormat: "pdf", desc: "Image ஐ PDF ஆக மாற்று", color: "#e8fdf8", accent: "#009688" },
  { id: "png-to-pdf", icon: "🖼️", title: "PNG to PDF", inputFormat: "png", outputFormat: "pdf", desc: "PNG ஐ PDF ஆக மாற்று", color: "#fde8f4", accent: "#E91E63" },
  { id: "pdf-to-ppt", icon: "📽️", title: "PDF to PPT", inputFormat: "pdf", outputFormat: "pptx", desc: "PDF ஐ PowerPoint ஆக மாற்று", color: "#fdf0e8", accent: "#FF6D00" },
  { id: "ppt-to-pdf", icon: "🎞️", title: "PPT to PDF", inputFormat: "pptx", outputFormat: "pdf", desc: "PowerPoint ஐ PDF ஆக மாற்று", color: "#e8fdfd", accent: "#00897B" },
  { id: "merge-pdf", icon: "🔗", title: "Merge PDF", inputFormat: "pdf", outputFormat: "pdf", desc: "பல PDF ஒன்னா சேர்", color: "#fdf8e8", accent: "#FFC107" },
  { id: "compress-pdf", icon: "🗜️", title: "Compress PDF", inputFormat: "pdf", outputFormat: "pdf", desc: "PDF size குறை", color: "#e8f0fd", accent: "#3F51B5" },
  { id: "split-pdf", icon: "✂️", title: "Split PDF", inputFormat: "pdf", outputFormat: "pdf", desc: "PDF ஐ பிரி", color: "#f8e8fd", accent: "#E91E63" },
  { id: "rotate-pdf", icon: "🔄", title: "Rotate PDF", inputFormat: "pdf", outputFormat: "pdf", desc: "PDF pages திரும்பு", color: "#fde8f4", accent: "#FF4081" },
  { id: "protect-pdf", icon: "🔒", title: "Protect PDF", inputFormat: "pdf", outputFormat: "pdf", desc: "Password போடு", color: "#fdeee8", accent: "#FF5722" },
  { id: "unlock-pdf", icon: "🔓", title: "Unlock PDF", inputFormat: "pdf", outputFormat: "pdf", desc: "Password நீக்கு", color: "#e8fdea", accent: "#8BC34A" },
  { id: "ocr-pdf", icon: "🔍", title: "OCR PDF", inputFormat: "pdf", outputFormat: "pdf", desc: "Scanned PDF ஐ text ஆக மாற்று", color: "#eee8fd", accent: "#673AB7" },
  { id: "watermark", icon: "💧", title: "Watermark PDF", inputFormat: "pdf", outputFormat: "pdf", desc: "PDF-ல watermark சேர்", color: "#e8fdfc", accent: "#00BCD4" },
  { id: "html-to-pdf", icon: "🌐", title: "HTML to PDF", inputFormat: "html", outputFormat: "pdf", desc: "HTML ஐ PDF ஆக மாற்று", color: "#e8f8fd", accent: "#03A9F4" },
  { id: "page-numbers", icon: "🔢", title: "Page Numbers", inputFormat: "pdf", outputFormat: "pdf", desc: "PDF-ல page numbers சேர்", color: "#f4fde8", accent: "#7CB342" },
  { id: "repair-pdf", icon: "🔧", title: "Repair PDF", inputFormat: "pdf", outputFormat: "pdf", desc: "சேதமான PDF சரி பண்ணு", color: "#fde8e8", accent: "#D32F2F" },
];

export default function Home() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [dragging, setDragging] = useState(false);
  const [converting, setConverting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const selectedTool = tools.find((t) => t.id === activeTool);

  const handleFile = (f: File) => setFile(f);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleConvert = async () => {
    if (!file || !selectedTool) return setStatus("⚠️ முதல்ல file தேர்ந்தெடு!");
    setConverting(true);
    setStatus("⏳ Step 1: File upload ஆகுது...");
    try {
      const uploadTaskRes = await fetch("https://api.cloudconvert.com/v2/import/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${CLOUDCONVERT_API_KEY}`,
          "Content-Type": "application/json",
        },
      });
      const uploadTaskData = await uploadTaskRes.json();
      if (!uploadTaskData.data) throw new Error("Upload failed");
      const formData = new FormData();
      const params = uploadTaskData.data.result.form.parameters;
      Object.entries(params).forEach(([k, v]) => formData.append(k, v as string));
      formData.append("file", file);
      await fetch(uploadTaskData.data.result.form.url, { method: "POST", body: formData });
      setStatus("⏳ Step 2: Converting...");
      const jobRes = await fetch("https://api.cloudconvert.com/v2/jobs", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${CLOUDCONVERT_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tasks: {
            "import-file": { operation: "import/uploaded", upload_task_id: uploadTaskData.data.id },
            "convert-file": { operation: "convert", input: "import-file", input_format: selectedTool.inputFormat || "pdf", output_format: selectedTool.outputFormat },
            "export-file": { operation: "export/url", input: "convert-file" },
          },
        }),
      });
      const jobData = await jobRes.json();
      if (!jobData.data) throw new Error("Job failed");
      setStatus("⏳ Step 3: காத்திருக்கோம்...");
      let attempts = 0;
      while (attempts < 30) {
        await new Promise((r) => setTimeout(r, 3000));
        const checkRes = await fetch(`https://api.cloudconvert.com/v2/jobs/${jobData.data.id}`, {
          headers: { Authorization: `Bearer ${CLOUDCONVERT_API_KEY}` },
        });
        const checkData = await checkRes.json();
        if (checkData.data.status === "finished") {
          const exportTask = checkData.data.tasks.find((t: any) => t.name === "export-file");
          const downloadUrl = exportTask.result.files[0].url;
          const filename = exportTask.result.files[0].filename;
          const a = document.createElement("a");
          a.href = downloadUrl;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setStatus("✅ முடிஞ்சது! File download ஆகுது!");
          setConverting(false);
          return;
        }
        if (checkData.data.status === "error") throw new Error("Conversion error");
        attempts++;
      }
      throw new Error("Timeout");
    } catch {
      setStatus("❌ Error! மீண்டும் try பண்ணு.");
      setConverting(false);
    }
  };

  if (activeTool && selectedTool) {
    return (
      <div style={{ minHeight: "100vh", background: "#f5f7fa", fontFamily: "'Segoe UI', sans-serif" }}>
        <header style={{ background: "#fff", borderBottom: "2px solid #eee", padding: "16px 32px", display: "flex", alignItems: "center", gap: "16px" }}>
          <button onClick={() => { setActiveTool(null); setFile(null); setStatus(""); }} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer" }}>←</button>
          <span style={{ fontSize: "28px" }}>{selectedTool.icon}</span>
          <div>
            <h1 style={{ margin: 0, fontSize: "22px", fontWeight: "700", color: selectedTool.accent }}>{selectedTool.title}</h1>
            <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>{selectedTool.desc}</p>
          </div>
        </header>
        <div style={{ maxWidth: "700px", margin: "48px auto", padding: "0 16px" }}>
          <div onDrop={handleDrop} onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onClick={() => fileRef.current?.click()}
            style={{ border: `3px dashed ${dragging ? selectedTool.accent : "#ccc"}`, borderRadius: "20px", padding: "60px 32px", textAlign: "center", cursor: "pointer", background: dragging ? selectedTool.color : "#fff", transition: "all 0.3s" }}>
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>{selectedTool.icon}</div>
            <h2 style={{ fontSize: "20px", color: "#333", margin: "0 0 8px" }}>File drag பண்ணு அல்லது click பண்ணு</h2>
            <p style={{ color: "#888", margin: 0 }}>.{selectedTool.inputFormat} file select பண்ணு</p>
            <input ref={fileRef} type="file" accept={`.${selectedTool.inputFormat}`} style={{ display: "none" }} onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
          </div>
          {file && (
            <div style={{ marginTop: "24px", background: "#fff", borderRadius: "12px", padding: "20px", border: "1px solid #eee" }}>
              <p style={{ margin: "0 0 16px", color: "#444" }}>📎 {file.name} ({(file.size / 1024).toFixed(1)} KB)</p>
              <button onClick={handleConvert} disabled={converting}
                style={{ background: converting ? "#ccc" : selectedTool.accent, color: "#fff", border: "none", borderRadius: "10px", padding: "14px 40px", fontSize: "18px", cursor: converting ? "not-allowed" : "pointer", width: "100%", fontWeight: "700" }}>
                {converting ? "⏳ Converting..." : `${selectedTool.title} மாற்று! 🚀`}
              </button>
            </div>
          )}
          {status && <div style={{ marginTop: "16px", padding: "16px", background: "#fff", borderRadius: "12px", textAlign: "center", fontSize: "16px", border: "1px solid #eee" }}>{status}</div>}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa", fontFamily: "'Segoe UI', sans-serif" }}>
      <header style={{ background: "#fff", borderBottom: "2px solid #eee", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "32px" }}>❤️</span>
          <div>
            <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "800", color: "#e53935" }}>WinFreePDF</h1>
            <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>100% Free PDF Tools</p>
          </div>
        </div>
        <span style={{ background: "#e53935", color: "#fff", padding: "6px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: "600" }}>100% FREE</span>
      </header>
      <div style={{ background: "linear-gradient(135deg, #e53935, #ff7043)", padding: "48px 32px", textAlign: "center", color: "#fff" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "900", margin: "0 0 12px" }}>உன் PDF ஐ எதுவாக வேணும்னாலும் மாற்று!</h2>
        <p style={{ fontSize: "18px", margin: 0, opacity: 0.9 }}>20+ tools • Free • Fast • Secure</p>
      </div>
      <div style={{ maxWidth: "1200px", margin: "40px auto", padding: "0 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
          {tools.map((tool) => (
            <div key={tool.id} onClick={() => setActiveTool(tool.id)}
              style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", cursor: "pointer", border: "2px solid transparent", boxShadow: "0 2px 8px rgba(0,0,0,0.07)", transition: "all 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.border = `2px solid ${tool.accent}`; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.border = "2px solid transparent"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.07)"; }}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>{tool.icon}</div>
              <h3 style={{ margin: "0 0 6px", fontSize: "16px", fontWeight: "700", color: "#222" }}>{tool.title}</h3>
              <p style={{ margin: 0, fontSize: "13px", color: "#888" }}>{tool.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <footer style={{ textAlign: "center", padding: "32px", color: "#aaa", fontSize: "14px", borderTop: "1px solid #eee", marginTop: "40px" }}>
        <p>❤️ WinFreePDF — 100% Free Forever | உங்கள் files secure ஆ இருக்கும்</p>
      </footer>
    </div>
  );
}
