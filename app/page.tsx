"use client";
import { useState, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const tools = [
  { id: "pdf-to-word", icon: "📄", title: "PDF to Word", inputFormat: "pdf", outputFormat: "docx", desc: "PDF ஐ Word ஆக மாற்று", color: "#e8f4fd", accent: "#2196F3" },
  { id: "word-to-pdf", icon: "📝", title: "Word to PDF", inputFormat: "docx", outputFormat: "pdf", desc: "Word ஐ PDF ஆக மாற்று", color: "#f3e8fd", accent: "#9C27B0" },
  { id: "pdf-to-excel", icon: "📊", title: "PDF to Excel", inputFormat: "pdf", outputFormat: "xlsx", desc: "PDF ஐ Excel ஆக மாற்று", color: "#e8fdf0", accent: "#4CAF50" },
  { id: "excel-to-pdf", icon: "📈", title: "Excel to PDF", inputFormat: "xlsx", outputFormat: "pdf", desc: "Excel ஐ PDF ஆக மாற்று", color: "#fdf4e8", accent: "#FF9800" },
  { id: "pdf-to-jpg", icon: "🖼️", title: "PDF to JPG", inputFormat: "pdf", outputFormat: "jpg", desc: "PDF ஐ Image ஆக மாற்று", color: "#fde8e8", accent: "#F44336" },
  { id: "jpg-to-pdf", icon: "📷", title: "JPG to PDF", inputFormat: "jpg", outputFormat: "pdf", desc: "Image ஐ PDF ஆக மாற்று", color: "#e8fdf8", accent: "#009688" },
  { id: "png-to-pdf", icon: "🖼️", title: "PNG to PDF", inputFormat: "png", outputFormat: "pdf", desc: "PNG ஐ PDF ஆக மாற்று", color: "#e8f0fd", accent: "#3F51B5" },
  { id: "pdf-to-ppt", icon: "📽️", title: "PDF to PPT", inputFormat: "pdf", outputFormat: "pptx", desc: "PDF ஐ PowerPoint ஆக மாற்று", color: "#fdf0e8", accent: "#FF6D00" },
  { id: "ppt-to-pdf", icon: "🎞️", title: "PPT to PDF", inputFormat: "pptx", outputFormat: "pdf", desc: "PowerPoint ஐ PDF ஆக மாற்று", color: "#e8fdfd", accent: "#00897B" },
  { id: "merge-pdf", icon: "🔗", title: "Merge PDF", inputFormat: "pdf", outputFormat: "pdf", desc: "பல PDF files ஒன்னா சேர்", color: "#fdf8e8", accent: "#FFC107" },
  { id: "compress-pdf", icon: "🗜️", title: "Compress PDF", inputFormat: "pdf", outputFormat: "pdf", desc: "PDF size குறை", color: "#e8f0fd", accent: "#3F51B5" },
  { id: "split-pdf", icon: "✂️", title: "Split PDF", inputFormat: "pdf", outputFormat: "pdf", desc: "PDF ஐ பிரி", color: "#f8e8fd", accent: "#E91E63" },
  { id: "rotate-pdf", icon: "🔄", title: "Rotate PDF", inputFormat: "pdf", outputFormat: "pdf", desc: "PDF pages திரும்பு", color: "#fde8f4", accent: "#FF4081" },
  { id: "protect-pdf", icon: "🔒", title: "Protect PDF", inputFormat: "pdf", outputFormat: "pdf", desc: "Password போடு", color: "#fdeee8", accent: "#FF5722" },
  { id: "unlock-pdf", icon: "🔓", title: "Unlock PDF", inputFormat: "pdf", outputFormat: "pdf", desc: "Password நீக்கு", color: "#e8fdea", accent: "#8BC34A" },
];

const FREE_LIMIT = 20 ;

export default function Home() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [dragging, setDragging] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [usageCount, setUsageCount] = useState(0);
  const [showPremium, setShowPremium] = useState(false);
  const [showPage, setShowPage] = useState<"privacy" | "terms" | "about" | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const selectedTool = tools.find((t) => t.id === activeTool);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchUsage(session.user.id);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchUsage(session.user.id);
    });
  }, []);

  const fetchUsage = async (userId: string) => {
    const today = new Date().toISOString().split("T")[0];
    const { data } = await supabase
      .from("user_usage")
      .select("*")
      .eq("user_id", userId)
      .single();
    if (data) {
      if (data.last_reset !== today) {
        await supabase.from("user_usage").update({ conversion_count: 0, last_reset: today }).eq("user_id", userId);
        setUsageCount(0);
      } else {
        setUsageCount(data.conversion_count);
      }
    } else {
      await supabase.from("user_usage").insert({ user_id: userId, email: user?.email, conversion_count: 0, last_reset: today });
      setUsageCount(0);
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { 
         redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
           access_type: 'offline',
           prompt: 'consent',
  },
},  
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUsageCount(0);
  };

  const handleFile = (f: File) => setFile(f);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleConvert = async () => {
    if (!file || !selectedTool) {
      setStatus("⚠️ முதல்ல file தேர்ந்தெடு!");
      return;
    }

    if (!user) {
      setStatus("⚠️ முதல்ல Google Login பண்ணுங்க!");
      return;
    }

    if (usageCount >= FREE_LIMIT) {
      setShowPremium(true);
      return;
    }

    setLoading(true);
    setStatus("⏳ Converting... Please wait (may take up to 1 minute)");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("outputFormat", selectedTool.outputFormat);

      const res = await fetch("/api/convert", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Conversion failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.[^/.]+$/, `.${selectedTool.outputFormat}`);
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      // Update usage count
      const newCount = usageCount + 1;
      setUsageCount(newCount);
      await supabase.from("user_usage").update({ conversion_count: newCount }).eq("user_id", user.id);

      setStatus(`✅ Conversion successful! (${newCount}/${FREE_LIMIT} today)`);
    } catch (err) {
      setStatus("❌ Conversion failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  // Privacy Policy Page
  if (showPage === "privacy") {
    return (
      <div style={{ minHeight: "100vh", background: "#f5f7fa", fontFamily: "'Segoe UI', sans-serif", padding: "32px" }}>
        <button onClick={() => setShowPage(null)} style={{ background: "#e53935", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", marginBottom: "24px" }}>← Back</button>
        <h1 style={{ color: "#e53935" }}>Privacy Policy</h1>
        <p><strong>Last updated:</strong> April 2026</p>
        <h2>1. Files & Data</h2>
        <p>உங்கள் upload பண்ணும் files convert ஆனதும் உடனே delete ஆகும். நாம் எந்த file-யும் store பண்றதில்லை.</p>
        <h2>2. Personal Information</h2>
        <p>Google Login மூலம் உங்கள் email மட்டும் collect பண்றோம் — conversion count track பண்ண மட்டும்.</p>
        <h2>3. Third Party</h2>
        <p>உங்கள் data எந்த third party-கிட்டயும் share பண்றதில்லை.</p>
        <h2>4. Contact</h2>
        <p>Questions? Email: umashri414@gmail.com</p>
      </div>
    );
  }

  // Terms Page
  if (showPage === "terms") {
    return (
      <div style={{ minHeight: "100vh", background: "#f5f7fa", fontFamily: "'Segoe UI', sans-serif", padding: "32px" }}>
        <button onClick={() => setShowPage(null)} style={{ background: "#e53935", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", marginBottom: "24px" }}>← Back</button>
        <h1 style={{ color: "#e53935" }}>Terms & Conditions</h1>
        <p><strong>Last updated:</strong> April 2026</p>
        <h2>1. Usage</h2>
        <p>Free users: 5 conversions per day. Premium users: Unlimited.</p>
        <h2>2. File Safety</h2>
        <p>Upload பண்ணும் files convert ஆனதும் உடனே delete ஆகும். Copyright files upload பண்ணக்கூடாது.</p>
        <h2>3. Prohibited</h2>
        <p>Illegal content, malware, virus files upload பண்ணக்கூடாது.</p>
        <h2>4. Service</h2>
        <p>WinFreePDF 100% free service. Premium features coming soon.</p>
      </div>
    );
  }

  // About Page
  if (showPage === "about") {
    return (
      <div style={{ minHeight: "100vh", background: "#f5f7fa", fontFamily: "'Segoe UI', sans-serif", padding: "32px" }}>
        <button onClick={() => setShowPage(null)} style={{ background: "#e53935", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", marginBottom: "24px" }}>← Back</button>
        <h1 style={{ color: "#e53935" }}>About WinFreePDF</h1>
        <p>WinFreePDF is a free, fast, and secure PDF converter tool.</p>
        <h2>🎯 Our Mission</h2>
        <p>Everyone should have access to free PDF tools — no hidden costs, no limits on basic features.</p>
        <h2>🔒 Security</h2>
        <p>உங்கள் files convert ஆனதும் உடனே delete ஆகும். 100% secure.</p>
        <h2>📧 Contact</h2>
        <p>Email: umashri414@gmail.com</p>
        <h2>🌟 Features</h2>
        <p>15+ PDF tools • Free • Fast • No registration needed for basic use</p>
      </div>
    );
  }

  if (activeTool && selectedTool) {
    return (
      <div style={{ minHeight: "100vh", background: "#f5f7fa", fontFamily: "'Segoe UI', sans-serif" }}>
        <header style={{ background: "#fff", borderBottom: "2px solid #eee", padding: "16px 32px", display: "flex", alignItems: "center", gap: "16px", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button onClick={() => { setActiveTool(null); setFile(null); setStatus(""); }} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer" }}>←</button>
            <span style={{ fontSize: "28px" }}>{selectedTool.icon}</span>
            <div>
              <h1 style={{ margin: 0, fontSize: "22px", fontWeight: "700", color: selectedTool.accent }}>{selectedTool.title}</h1>
              <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>{selectedTool.desc}</p>
            </div>
          </div>
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "13px", color: "#666" }}>{usageCount}/{FREE_LIMIT} today</span>
              <button onClick={handleLogout} style={{ background: "#eee", border: "none", borderRadius: "8px", padding: "8px 16px", cursor: "pointer" }}>Logout</button>
            </div>
          ) : (
            <button onClick={handleGoogleLogin} style={{ background: "#4285F4", color: "#fff", border: "none", borderRadius: "8px", padding: "8px 16px", cursor: "pointer", fontWeight: "600" }}>🔐 Google Login</button>
          )}
        </header>

        <div style={{ maxWidth: "700px", margin: "48px auto", padding: "0 16px" }}>
          {!user && (
            <div style={{ background: "#fff3cd", border: "1px solid #ffc107", borderRadius: "12px", padding: "16px", marginBottom: "16px", textAlign: "center" }}>
              ⚠️ Convert பண்ண <strong>Google Login</strong> பண்ணுங்க! Free-ஆ 5 conversions/day கிடைக்கும்!
              <br /><button onClick={handleGoogleLogin} style={{ marginTop: "8px", background: "#4285F4", color: "#fff", border: "none", borderRadius: "8px", padding: "8px 20px", cursor: "pointer" }}>🔐 Sign in with Google</button>
            </div>
          )}

          <div onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onClick={() => fileRef.current?.click()}
            style={{ border: `3px dashed ${dragging ? selectedTool.accent : "#ccc"}`, borderRadius: "20px", padding: "60px 32px", textAlign: "center", cursor: "pointer", background: dragging ? selectedTool.color : "#fff" }}>
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>{selectedTool.icon}</div>
            <h2 style={{ fontSize: "20px", color: "#333", margin: "0 0 8px" }}>File drag பண்ணு அல்லது click பண்ணு</h2>
            <p style={{ color: "#888", margin: 0 }}>.{selectedTool.inputFormat} file select பண்ணு</p>
            <input ref={fileRef} type="file" style={{ display: "none" }} accept={`.${selectedTool.inputFormat}`} onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
          </div>

          {file && (
            <div style={{ marginTop: "24px", background: "#fff", borderRadius: "12px", padding: "20px", border: "1px solid #eee" }}>
              <p style={{ margin: "0 0 16px", color: "#444" }}>📎 {file.name} ({(file.size / 1024).toFixed(1)} KB)</p>
              <button onClick={handleConvert} disabled={loading}
                style={{ background: loading ? "#ccc" : selectedTool.accent, color: "#fff", border: "none", borderRadius: "10px", padding: "14px 40px", fontSize: "18px", cursor: loading ? "not-allowed" : "pointer", width: "100%", fontWeight: "700" }}>
                {loading ? "⏳ Converting... Please wait..." : `${selectedTool.title} மாற்று! 🚀`}
              </button>
            </div>
          )}

          {status && (
            <div style={{ marginTop: "16px", padding: "16px", background: "#fff", borderRadius: "12px", textAlign: "center", fontSize: "16px", border: "1px solid #eee" }}>
              {status}
            </div>
          )}
        </div>

        {/* Premium Modal */}
        {showPremium && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
            <div style={{ background: "#fff", borderRadius: "20px", padding: "40px", maxWidth: "400px", textAlign: "center" }}>
              <div style={{ fontSize: "48px" }}>🚀</div>
              <h2 style={{ color: "#e53935" }}>Daily Limit Reached!</h2>
              <p>நீங்கள் இன்றைக்கு 5 free conversions use பண்ணிவிட்டீர்கள்!</p>
              <p style={{ color: "#666", fontSize: "14px" }}>நாளைக்கு மீண்டும் 5 free conversions கிடைக்கும்!</p>
              <div style={{ background: "#f5f5f5", borderRadius: "12px", padding: "20px", margin: "16px 0" }}>
                <h3 style={{ margin: "0 0 8px", color: "#e53935" }}>Premium Coming Soon!</h3>
                <p style={{ margin: 0, fontSize: "14px" }}>Unlimited conversions • $1/month</p>
              </div>
              <button onClick={() => setShowPremium(false)} style={{ background: "#e53935", color: "#fff", border: "none", borderRadius: "10px", padding: "12px 32px", cursor: "pointer", fontWeight: "700" }}>OK, நாளைக்கு வருகிறேன்</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa", fontFamily: "'Segoe UI', sans-serif" }}>
      <header style={{ background: "#fff", borderBottom: "2px solid #eee", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "32px" }}>❤️</span>
          <div>
            <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "900", color: "#e53935" }}>WinFreePDF</h1>
            <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>Free • Fast • Secure • No limits</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {user ? (
            <>
              <span style={{ fontSize: "13px", color: "#666" }}>👤 {user.email?.split("@")[0]} | {usageCount}/{FREE_LIMIT} today</span>
              <button onClick={handleLogout} style={{ background: "#eee", border: "none", borderRadius: "8px", padding: "8px 16px", cursor: "pointer" }}>Logout</button>
            </>
          ) : (
            <button onClick={handleGoogleLogin} style={{ background: "#4285F4", color: "#fff", border: "none", borderRadius: "8px", padding: "8px 16px", cursor: "pointer", fontWeight: "600" }}>🔐 Google Login</button>
          )}
          <span style={{ background: "#e53935", color: "#fff", padding: "6px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: "600" }}>100% FREE</span>
        </div>
      </header>

      <div style={{ background: "linear-gradient(135deg, #e53935, #ff7043)", padding: "48px 32px", textAlign: "center", color: "#fff" }}>
        <h2 style={{ fontSize: "36px", fontWeight: "900", margin: "0 0 12px" }}>உன் PDF ஐ எதுவாக வேணும்னாலும் மாற்று!</h2>
        <p style={{ fontSize: "18px", margin: "0 0 8px", opacity: 0.9 }}>15+ tools • Free • Fast • Secure</p>
        <p style={{ fontSize: "14px", margin: 0, opacity: 0.8 }}>🔒 உங்கள் files convert ஆனதும் உடனே delete ஆகும் • 100% Safe</p>
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
              <div style={{ marginTop: "12px", color: tool.accent, fontSize: "13px", fontWeight: "600" }}>இப்பவே மாற்று →</div>
            </div>
          ))}
        </div>
      </div>

      <footer style={{ textAlign: "center", padding: "32px", color: "#aaa", fontSize: "14px", borderTop: "1px solid #eee", marginTop: "40px" }}>
        <p style={{ marginBottom: "12px" }}>❤️ WinFreePDF — 100% Free Forever</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px" }}>
          <button onClick={() => setShowPage("privacy")} style={{ background: "none", border: "none", color: "#e53935", cursor: "pointer", fontSize: "14px" }}>Privacy Policy</button>
          <button onClick={() => setShowPage("terms")} style={{ background: "none", border: "none", color: "#e53935", cursor: "pointer", fontSize: "14px" }}>Terms & Conditions</button>
          <button onClick={() => setShowPage("about")} style={{ background: "none", border: "none", color: "#e53935", cursor: "pointer", fontSize: "14px" }}>About Us</button>
        </div>
      </footer>
    </div>
  );
}
