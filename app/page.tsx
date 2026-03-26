
"use client";
import { useState, useRef } from "react";

const tools = [
  { id: "jpg-to-pdf", icon: "📷", title: "JPG to PDF", desc: "Image ஐ PDF ஆக மாற்று", color: "#e8fdf8", accent: "#009688" },
  { id: "png-to-pdf", icon: "🖼️", title: "PNG to PDF", desc: "PNG ஐ PDF ஆக மாற்று", color: "#fde8f4", accent: "#E91E63" },
  { id: "merge-pdf", icon: "🔗", title: "Merge PDF", desc: "பல PDF ஒன்னா சேர்", color: "#fdf8e8", accent: "#FFC107" },
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
    setStatus("⏳ Converting...");

    try {
      const { PDFDocument } = await import("pdf-lib");

      if (activeTool === "jpg-to-pdf" || activeTool === "png-to-pdf") {
        const imageBytes = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.create();
        const image = activeTool === "jpg-to-pdf"
          ? await pdfDoc.embedJpg(imageBytes)
          : await pdfDoc.embedPng(imageBytes);
        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name.replace(/\.[^/.]+$/, "") + ".pdf";
        a.click();
        setStatus("✅ முடிஞ்சது! PDF download ஆகுது!");
      } else {
        setStatus("⚠️ இந்த tool வரும்!");
      }
    } catch {
      setStatus("❌ Error! மீண்டும் try பண்ணு.");
    }
    setConverting(false);
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
            <input ref={fileRef} type="file" style={{ display: "none" }} onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
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
        <p style={{ fontSize: "18px", margin: 0, opacity: 0.9 }}>Free • Fast • Secure</p>
      </div>
      <div style={{ maxWidth: "1200px", margin: "40px auto", padding: "0 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
          {tools.map((tool) => (
            <div key={tool.id} onClick={() => setActiveTool(tool.id)}
              style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", cursor: "pointer", border: "2px solid transparent", boxShadow: "0 2px 8px rgba(0,0,0,0.07)", transition: "all 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.border = `2px solid ${tool.accent}`; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.border = "2px solid transparent"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>{tool.icon}</div>
              <h3 style={{ margin: "0 0 6px", fontSize: "16px", fontWeight: "700", color: "#222" }}>{tool.title}</h3>
              <p style={{ margin: 0, fontSize: "13px", color: "#888" }}>{tool.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <footer style={{ textAlign: "center", padding: "32px", color: "#aaa", fontSize: "14px", borderTop: "1px solid #eee", marginTop: "40px" }}>
        <p>❤️ WinFreePDF — 100% Free Forever</p>
      </footer>
    </div>
  );
}
