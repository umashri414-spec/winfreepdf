page.tsx - WinFreePDF Complete Code
Instructions: Copy this code and paste into GitHub app/page.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const tools = [
  { id: "pdf-to-word", icon: "📄", title: "PDF to Word", inputFormat: "pdf", outputFormat: "docx", desc: "Convert PDF to editable Word documents instantly. No quality loss.", color: "#e8f4fd", accent: "#2196F3" },
  { id: "word-to-pdf", icon: "📝", title: "Word to PDF", inputFormat: "docx", outputFormat: "pdf", desc: "Convert Word documents to PDF format easily and quickly.", color: "#f3e8fd", accent: "#9C27B0" },
  { id: "pdf-to-excel", icon: "📊", title: "PDF to Excel", inputFormat: "pdf", outputFormat: "xlsx", desc: "Extract tables from PDF to Excel spreadsheets automatically.", color: "#e8fdf0", accent: "#4CAF50" },
  { id: "excel-to-pdf", icon: "📈", title: "Excel to PDF", inputFormat: "xlsx", outputFormat: "pdf", desc: "Convert Excel spreadsheets to PDF format in seconds.", color: "#fdf4e8", accent: "#FF9800" },
  { id: "pdf-to-jpg", icon: "🖼️", title: "PDF to JPG", inputFormat: "pdf", outputFormat: "jpg", desc: "Convert PDF pages to high quality JPG images for free.", color: "#fde8e8", accent: "#F44336" },
  { id: "jpg-to-pdf", icon: "📷", title: "JPG to PDF", inputFormat: "jpg", outputFormat: "pdf", desc: "Convert JPG images to PDF documents instantly online.", color: "#e8fdf8", accent: "#009688" },
  { id: "png-to-pdf", icon: "🖼️", title: "PNG to PDF", inputFormat: "png", outputFormat: "pdf", desc: "Convert PNG images to PDF format free and fast.", color: "#e8f0fd", accent: "#3F51B5" },
  { id: "pdf-to-ppt", icon: "📽️", title: "PDF to PPT", inputFormat: "pdf", outputFormat: "pptx", desc: "Convert PDF files to PowerPoint presentations easily.", color: "#fdf0e8", accent: "#FF6D00" },
  { id: "ppt-to-pdf", icon: "🎞️", title: "PPT to PDF", inputFormat: "pptx", outputFormat: "pdf", desc: "Convert PowerPoint presentations to PDF format online.", color: "#e8fdfd", accent: "#00897B" },
  { id: "merge-pdf", icon: "🔗", title: "Merge PDF", inputFormat: "pdf", outputFormat: "pdf", desc: "Combine multiple PDF files into one document for free.", color: "#fdf8e8", accent: "#FFC107" },
  { id: "compress-pdf", icon: "🗜️", title: "Compress PDF", inputFormat: "pdf", outputFormat: "pdf", desc: "Reduce PDF file size without losing quality online.", color: "#e8f0fd", accent: "#3F51B5" },
  { id: "split-pdf", icon: "✂️", title: "Split PDF", inputFormat: "pdf", outputFormat: "pdf", desc: "Split PDF into multiple separate files instantly.", color: "#f8e8fd", accent: "#E91E63" },
  { id: "rotate-pdf", icon: "🔄", title: "Rotate PDF", inputFormat: "pdf", outputFormat: "pdf", desc: "Rotate PDF pages to any angle quickly and easily.", color: "#fde8f4", accent: "#FF4081" },
  { id: "protect-pdf", icon: "🔒", title: "Protect PDF", inputFormat: "pdf", outputFormat: "pdf", desc: "Add password protection to secure your PDF files.", color: "#fdeee8", accent: "#FF5722" },
  { id: "unlock-pdf", icon: "🔓", title: "Unlock PDF", inputFormat: "pdf", outputFormat: "pdf", desc: "Remove password from protected PDF files online free.", color: "#e8fdea", accent: "#8BC34A" },
];

const GUEST_LIMIT = 3;
const FREE_LIMIT = 15;

declare global {
  interface Window { adsbygoogle: any[]; }
}

function AdBanner() {
  useEffect(() => {
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
  }, []);
  return (
    <div style={{ margin: "16px 0", textAlign: "center" }}>
      <p style={{ fontSize: "11px", color: "#aaa", margin: "0 0 4px" }}>Advertisement</p>
      <ins className="adsbygoogle" style={{ display: "block" }}
        data-ad-client="ca-pub-9157505466817734"
        data-ad-slot="4259655308"
        data-ad-format="auto"
        data-full-width-responsive="true" />
    </div>
  );
}

function WinFreeLogo() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C39BD3"/>
          <stop offset="100%" stopColor="#6C3483"/>
        </linearGradient>
      </defs>
      <path d="M22 38C22 38 5 27 5 16C5 10.5 9.5 7 14 7C17.5 7 20.5 9 22 12C23.5 9 26.5 7 30 7C34.5 7 39 10.5 39 16C39 27 22 38 22 38Z" fill="url(#hg)"/>
      <text x="22" y="21" fontFamily="Arial" fontWeight="bold" fontSize="7" fill="white" textAnchor="middle">Win</text>
      <text x="22" y="29" fontFamily="Arial" fontWeight="bold" fontSize="6" fill="white" textAnchor="middle">FreePDF</text>
    </svg>
  );
}

export default function Home() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [dragging, setDragging] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [usageCount, setUsageCount] = useState(0);
  const [guestCount, setGuestCount] = useState(0);
  const [showPremium, setShowPremium] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showPage, setShowPage] = useState<"privacy" | "terms" | "about" | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const selectedTool = tools.find((t) => t.id === activeTool);

  useEffect(() => {
    const savedGuest = parseInt(localStorage.getItem("guestCount") || "0");
    setGuestCount(savedGuest);
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
    const { data } = await supabase.from("user_usage").select("*").eq("user_id", userId).single();
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
        queryParams: { access_type: "offline", prompt: "consent" },
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
    if (!file || !selectedTool) { setStatus("File select pannu!"); return; }

    if (!user) {
      const newGuestCount = guestCount + 1;
      if (newGuestCount > GUEST_LIMIT) {
        setShowLoginPopup(true);
        return;
      }
      setGuestCount(newGuestCount);
      localStorage.setItem("guestCount", newGuestCount.toString());
    }

    if (user && usageCount >= FREE_LIMIT) {
      setShowPremium(true);
      return;
    }

    setLoading(true);
    setShowAd(false);
    setStatus("Converting... Please wait (may take up to 1 minute)");

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

      if (user) {
        const newCount = usageCount + 1;
        setUsageCount(newCount);
        await supabase.from("user_usage").update({ conversion_count: newCount }).eq("user_id", user.id);
        setStatus(`Conversion successful! (${newCount}/${FREE_LIMIT} today)`);
      } else {
        setStatus(`Conversion successful! (${guestCount}/${GUEST_LIMIT} free)`);
      }
      setShowAd(true);
    } catch (err) {
      setStatus("Conversion failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  if (showPage === "privacy") {
    return (
      <div style={{ minHeight: "100vh", background: "#f5f7fa", fontFamily: "'Segoe UI', sans-serif", padding: "32px" }}>
        <button onClick={() => setShowPage(null)} style={{ background: "#7B2FBE", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", marginBottom: "24px" }}>Back</button>
        <h1 style={{ color: "#7B2FBE" }}>Privacy Policy</h1>
        <p><strong>Last updated:</strong> April 2026</p>
        <h2>1. Files and Data</h2>
        <p>Your uploaded files are deleted immediately after conversion. We never store any files.</p>
        <h2>2. Personal Information</h2>
        <p>We collect only your email via Google Login to track conversion count.</p>
        <h2>3. Advertising</h2>
        <p>We use Google AdSense. Google may use cookies to show personalized ads.</p>
        <h2>4. Contact</h2>
        <p>Email: umashri414@gmail.com</p>
      </div>
    );
  }

  if (showPage === "terms") {
    return (
      <div style={{ minHeight: "100vh", background: "#f5f7fa", fontFamily: "'Segoe UI', sans-serif", padding: "32px" }}>
        <button onClick={() => setShowPage(null)} style={{ background: "#7B2FBE", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", marginBottom: "24px" }}>Back</button>
        <h1 style={{ color: "#7B2FBE" }}>Terms and Conditions</h1>
        <p><strong>Last updated:</strong> April 2026</p>
        <h2>1. Usage</h2>
        <p>Free users: 15 conversions per day. Guest users: 3 conversions free.</p>
        <h2>2. File Safety</h2>
        <p>Uploaded files are deleted immediately after conversion.</p>
        <h2>3. Ads</h2>
        <p>This site shows Google AdSense ads to help maintain the service.</p>
      </div>
    );
  }

  if (showPage === "about") {
    return (
      <div style={{ minHeight: "100vh", background: "#f5f7fa", fontFamily: "'Segoe UI', sans-serif", padding: "32px" }}>
        <button onClick={() => setShowPage(null)} style={{ background: "#7B2FBE", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", marginBottom: "24px" }}>Back</button>
        <h1 style={{ color: "#7B2FBE" }}>About WinFreePDF</h1>
        <p>WinFreePDF is a free, fast, and secure PDF converter tool.</p>
        <h2>Contact</h2>
        <p>Email: umashri414@gmail.com</p>
        <h2>Features</h2>
        <p>15+ PDF tools - Free - Fast - Secure - 15 conversions/day free</p>
      </div>
    );
  }

  if (activeTool && selectedTool) {
    return (
      <div style={{ minHeight: "100vh", background: "#f5f7fa", fontFamily: "'Segoe UI', sans-serif" }}>
        <header style={{ background: "#fff", borderBottom: "2px solid #eee", padding: "16px 32px", display: "flex", alignItems: "center", gap: "16px", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button onClick={() => { setActiveTool(null); setFile(null); setStatus(""); setShowAd(false); }} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer" }}>Back</button>
            <WinFreeLogo />
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
            <button onClick={handleGoogleLogin} style={{ background: "#7B2FBE", color: "#fff", border: "none", borderRadius: "8px", padding: "8px 16px", cursor: "pointer", fontWeight: "600" }}>Google Login</button>
          )}
        </header>

        <div style={{ maxWidth: "700px", margin: "48px auto", padding: "0 16px" }}>
          <AdBanner />
          <div onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onClick={() => fileRef.current?.click()}
            style={{ border: `3px dashed ${dragging ? selectedTool.accent : "#ccc"}`, borderRadius: "20px", padding: "60px 32px", textAlign: "center", cursor: "pointer", background: dragging ? selectedTool.color : "#fff" }}>
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>{selectedTool.icon}</div>
            <h2 style={{ fontSize: "20px", color: "#333", margin: "0 0 8px" }}>Drag file here or click to select</h2>
            <p style={{ color: "#888", margin: 0 }}>Select .{selectedTool.inputFormat} file</p>
            <input ref={fileRef} type="file" style={{ display: "none" }} accept={`.${selectedTool.inputFormat}`} onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
          </div>

          {file && (
            <div style={{ marginTop: "24px", background: "#fff", borderRadius: "12px", padding: "20px", border: "1px solid #eee" }}>
              <p style={{ margin: "0 0 16px", color: "#444" }}>{file.name} ({(file.size / 1024).toFixed(1)} KB)</p>
              <button onClick={handleConvert} disabled={loading}
                style={{ background: loading ? "#ccc" : selectedTool.accent, color: "#fff", border: "none", borderRadius: "10px", padding: "14px 40px", fontSize: "18px", cursor: loading ? "not-allowed" : "pointer", width: "100%", fontWeight: "700" }}>
                {loading ? "Converting... Please wait..." : `Convert Now`}
              </button>
            </div>
          )}

          {status && (
            <div style={{ marginTop: "16px", padding: "16px", background: "#fff", borderRadius: "12px", textAlign: "center", fontSize: "16px", border: "1px solid #eee" }}>
              {status}
            </div>
          )}
          {showAd && <AdBanner />}
        </div>

        {showLoginPopup && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
            <div style={{ background: "#fff", borderRadius: "20px", padding: "40px", maxWidth: "400px", textAlign: "center" }}>
              <div style={{ fontSize: "48px" }}>💜</div>
              <h2 style={{ color: "#7B2FBE" }}>Free Limit Reached!</h2>
              <p>You have used 3 free conversions!</p>
              <p style={{ color: "#666", fontSize: "14px" }}>Login to get <strong>15 conversions/day</strong> free!</p>
              <button onClick={() => { setShowLoginPopup(false); handleGoogleLogin(); }}
                style={{ background: "#7B2FBE", color: "#fff", border: "none", borderRadius: "10px", padding: "12px 32px", cursor: "pointer", fontWeight: "700", width: "100%", marginBottom: "12px" }}>
                Sign in with Google - Free!
              </button>
              <button onClick={() => setShowLoginPopup(false)}
                style={{ background: "#eee", border: "none", borderRadius: "10px", padding: "10px 32px", cursor: "pointer", width: "100%" }}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {showPremium && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
            <div style={{ background: "#fff", borderRadius: "20px", padding: "40px", maxWidth: "400px", textAlign: "center" }}>
              <div style={{ fontSize: "48px" }}>🚀</div>
              <h2 style={{ color: "#7B2FBE" }}>Daily Limit Reached!</h2>
              <p>You have used all 15 free conversions today!</p>
              <p style={{ color: "#666", fontSize: "14px" }}>Come back tomorrow for 15 more free conversions!</p>
              <div style={{ background: "#f5f5f5", borderRadius: "12px", padding: "20px", margin: "16px 0" }}>
                <h3 style={{ margin: "0 0 8px", color: "#7B2FBE" }}>Premium Coming Soon!</h3>
                <p style={{ margin: 0, fontSize: "14px" }}>Unlimited conversions - $1/month</p>
              </div>
              <button onClick={() => setShowPremium(false)} style={{ background: "#7B2FBE", color: "#fff", border: "none", borderRadius: "10px", padding: "12px 32px", cursor: "pointer", fontWeight: "700" }}>OK, Come back tomorrow</button>
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
          <WinFreeLogo />
          <div>
            <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "900", color: "#7B2FBE" }}>WinFreePDF</h1>
            <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>Free - Fast - Secure</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {user ? (
            <>
              <span style={{ fontSize: "13px", color: "#666" }}>{user.email?.split("@")[0]} | {usageCount}/{FREE_LIMIT} today</span>
              <button onClick={handleLogout} style={{ background: "#eee", border: "none", borderRadius: "8px", padding: "8px 16px", cursor: "pointer" }}>Logout</button>
            </>
          ) : (
            <button onClick={handleGoogleLogin} style={{ background: "#7B2FBE", color: "#fff", border: "none", borderRadius: "8px", padding: "8px 16px", cursor: "pointer", fontWeight: "600" }}>Google Login</button>
          )}
          <span style={{ background: "#7B2FBE", color: "#fff", padding: "6px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: "600" }}>100% FREE</span>
        </div>
      </header>

      <div style={{ background: "linear-gradient(135deg, #6C3483, #C39BD3)", padding: "48px 32px", textAlign: "center", color: "#fff" }}>
        <h2 style={{ fontSize: "36px", fontWeight: "900", margin: "0 0 12px" }}>Convert PDF to Any Format Free!</h2>
        <p style={{ fontSize: "18px", margin: "0 0 8px", opacity: 0.9 }}>15+ tools - Free - Fast - Secure - No watermark</p>
        <p style={{ fontSize: "14px", margin: 0, opacity: 0.8 }}>Your files are deleted immediately after conversion - 100% Safe</p>
      </div>

      <div style={{ maxWidth: "1200px", margin: "20px auto", padding: "0 16px" }}>
        <AdBanner />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px", marginTop: "20px" }}>
          {tools.map((tool) => (
            <div key={tool.id} onClick={() => setActiveTool(tool.id)}
              style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", cursor: "pointer", border: "2px solid transparent", boxShadow: "0 2px 8px rgba(0,0,0,0.07)", transition: "all 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.border = `2px solid ${tool.accent}`; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.border = "2px solid transparent"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>{tool.icon}</div>
              <h3 style={{ margin: "0 0 6px", fontSize: "16px", fontWeight: "700", color: "#222" }}>{tool.title}</h3>
              <p style={{ margin: 0, fontSize: "13px", color: "#666" }}>{tool.desc}</p>
              <div style={{ marginTop: "12px", color: tool.accent, fontSize: "13px", fontWeight: "600" }}>Convert Now</div>
            </div>
          ))}
        </div>
      </div>

      <footer style={{ textAlign: "center", padding: "32px", color: "#aaa", fontSize: "14px", borderTop: "1px solid #eee", marginTop: "40px" }}>
        <p style={{ marginBottom: "12px" }}>WinFreePDF - 100% Free Forever</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px" }}>
          <button onClick={() => setShowPage("privacy")} style={{ background: "none", border: "none", color: "#7B2FBE", cursor: "pointer", fontSize: "14px" }}>Privacy Policy</button>
          <button onClick={() => setShowPage("terms")} style={{ background: "none", border: "none", color: "#7B2FBE", cursor: "pointer", fontSize: "14px" }}>Terms and Conditions</button>
          <button onClick={() => setShowPage("about")} style={{ background: "none", border: "none", color: "#7B2FBE", cursor: "pointer", fontSize: "14px" }}>About Us</button>
        </div>
      </footer>
    </div>
  );
}
