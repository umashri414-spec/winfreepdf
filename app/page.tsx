
"use client";
import { useState, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
 
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
 
const translations: Record<string, any> = {
  en: {
    title: "WinFreePDF", tagline: "Free - Fast - Secure",
    hero: "Convert PDF to Any Format Free!",
    heroSub: "15+ tools - Free - Fast - Secure - No watermark",
    heroSafe: "Your files are deleted immediately after conversion - 100% Safe",
    login: "Google Login", logout: "Logout", free: "100% FREE",
    convertNow: "Convert Now", dragText: "Drag file here or click to select",
    converting: "Converting... Please wait...", advertisement: "Advertisement",
    privacy: "Privacy Policy", terms: "Terms & Conditions", about: "About Us",
    footer: "WinFreePDF - 100% Free Forever",
    guestMsg: "You have used 3 free conversions! Login to get 15/day free!",
    loginBtn: "Sign in with Google - Free!", cancel: "Cancel",
    limitMsg: "You have used all 15 free conversions today!",
    tomorrow: "Come back tomorrow for 15 more free conversions!",
    premium: "Premium Coming Soon!", premiumSub: "Unlimited conversions - $1/month",
    ok: "OK, Come back tomorrow", selectFile: "Select file",
    howTitle: "How It Works",
    how1Title: "1. Choose Your Tool", how1Desc: "Select from 15+ PDF tools. All tools are completely free to use.",
    how2Title: "2. Upload Your File", how2Desc: "Drag and drop your file or click to browse. We support PDF, Word, Excel, PowerPoint, JPG, and PNG formats.",
    how3Title: "3. Download Instantly", how3Desc: "Your file is converted in seconds. Download immediately. Your file is deleted right away.",
    whyTitle: "Why Choose WinFreePDF?",
    why1Title: "100% Free Forever", why1Desc: "Completely free. No hidden charges. Convert up to 15 files per day free after login.",
    why2Title: "Fast & Secure", why2Desc: "Files are processed instantly and deleted immediately after conversion.",
    why3Title: "No Registration Required", why3Desc: "Start converting files immediately. Login only needed for more than 3 conversions per day.",
    why4Title: "15+ Powerful Tools", why4Desc: "PDF to Word, Excel, JPG, PPT and more. Merge, split, compress, protect and unlock PDF files.",
    why5Title: "Works on All Devices", why5Desc: "Works on desktop, laptop, tablet and mobile. No software installation needed.",
    why6Title: "Supports Indian Languages", why6Desc: "Supports Tamil, Hindi, Telugu, Malayalam, Kannada, Bengali, Marathi, Gujarati and Punjabi.",
    faqTitle: "Frequently Asked Questions",
    faq1Q: "Is WinFreePDF really free?", faq1A: "Yes! 100% free. Guest users get 3 free conversions. After Google login, you get 15 free conversions every day.",
    faq2Q: "Are my files safe?", faq2A: "Your files are deleted immediately after conversion. We never store your files.",
    faq3Q: "What file formats are supported?", faq3A: "PDF, Word (DOCX), Excel (XLSX), PowerPoint (PPTX), JPG, and PNG formats.",
    faq4Q: "Do I need to install any software?", faq4A: "No installation needed! WinFreePDF works directly in your browser.",
    faq5Q: "How many files can I convert per day?", faq5A: "Guest users: 3 free. After Google login: 15 free conversions every day.",
    faq6Q: "Which languages does WinFreePDF support?", faq6A: "English, Tamil, Hindi, Telugu, Malayalam, Kannada, Bengali, Marathi, Gujarati and Punjabi.",
  },
  ta: {
    title: "WinFreePDF", tagline: "இலவசம் - வேகமான - பாதுகாப்பான",
    hero: "PDF ஐ எதுவாக வேணும்னாலும் மாற்று!",
    heroSub: "15+ கருவிகள் - இலவசம் - வேகமான - பாதுகாப்பான",
    heroSafe: "உங்கள் files convert ஆனதும் உடனே delete ஆகும் - 100% பாதுகாப்பு",
    login: "Google உள்நுழைவு", logout: "வெளியேறு", free: "100% இலவசம்",
    convertNow: "இப்பவே மாற்று", dragText: "File drag பண்ணு அல்லது click பண்ணு",
    converting: "மாற்றுகிறது... காத்திருங்கள்...", advertisement: "விளம்பரம்",
    privacy: "தனியுரிமை கொள்கை", terms: "விதிமுறைகள்", about: "எங்களைப் பற்றி",
    footer: "WinFreePDF - என்றும் 100% இலவசம்",
    guestMsg: "நீங்கள் 3 இலவச conversions பயன்படுத்திவிட்டீர்கள்! Login பண்ணா 15/நாள் இலவசம்!",
    loginBtn: "Google-ல் உள்நுழையுங்கள் - இலவசம்!", cancel: "ரத்து செய்",
    limitMsg: "இன்று 15 இலவச conversions முடிந்துவிட்டது!",
    tomorrow: "நாளைக்கு மீண்டும் 15 இலவச conversions கிடைக்கும்!",
    premium: "Premium விரைவில் வருகிறது!", premiumSub: "வரம்பற்ற conversions - மாதம் ₹80",
    ok: "சரி, நாளைக்கு வருகிறேன்", selectFile: "கோப்பு தேர்ந்தெடு",
    howTitle: "எப்படி பயன்படுத்துவது?",
    how1Title: "1. கருவி தேர்வு", how1Desc: "15+ PDF கருவிகளில் இருந்து தேர்வு செய்யுங்கள். எல்லாம் இலவசம்.",
    how2Title: "2. File Upload", how2Desc: "உங்கள் file-ஐ drag & drop பண்ணுங்கள். PDF, Word, Excel, PPT, JPG, PNG support.",
    how3Title: "3. உடனே Download", how3Desc: "சில நொடிகளில் convert ஆகும். உடனே download பண்ணுங்கள்.",
    whyTitle: "ஏன் WinFreePDF தேர்வு செய்யணும்?",
    why1Title: "என்றும் 100% இலவசம்", why1Desc: "முற்றிலும் இலவசம். Login-க்கு பிறகு தினமும் 15 conversions இலவசம்.",
    why2Title: "வேகமான & பாதுகாப்பான", why2Desc: "Files உடனே process ஆகும், convert ஆனதும் உடனே delete ஆகும்.",
    why3Title: "Registration தேவையில்லை", why3Desc: "Account இல்லாமலேயே convert பண்ணலாம்.",
    why4Title: "15+ சக்திவாய்ந்த கருவிகள்", why4Desc: "PDF to Word, Excel, JPG, PPT. Merge, split, compress, protect — எல்லாம் ஒரே இடத்தில்.",
    why5Title: "எல்லா devices-லும் வேலை செய்யும்", why5Desc: "Desktop, laptop, tablet, mobile. Software தேவையில்லை.",
    why6Title: "இந்திய மொழிகள் support", why6Desc: "தமிழ், Hindi, Telugu, Malayalam, Kannada, Bengali, Marathi, Gujarati, Punjabi support.",
    faqTitle: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    faq1Q: "WinFreePDF உண்மையிலேயே இலவசமா?", faq1A: "ஆமா! 100% இலவசம். Guest: 3 conversions. Google login பிறகு தினமும் 15.",
    faq2Q: "என் files பாதுகாப்பாக இருக்குமா?", faq2A: "Convert ஆனதும் உடனே delete ஆகும். நாம் files சேமிக்கமாட்டோம்.",
    faq3Q: "எந்த file formats support பண்றோம்?", faq3A: "PDF, Word, Excel, PowerPoint, JPG, PNG support.",
    faq4Q: "Software install வேண்டுமா?", faq4A: "தேவையில்லை! Browser-லேயே வேலை செய்யும்.",
    faq5Q: "தினமும் எத்தனை files convert பண்ணலாம்?", faq5A: "Guest: 3 files. Google login பிறகு: தினமும் 15 conversions.",
    faq6Q: "எந்த மொழிகளை support பண்றோம்?", faq6A: "English, தமிழ், Hindi, Telugu, Malayalam, Kannada, Bengali, Marathi, Gujarati, Punjabi.",
  },
  hi: {
    title: "WinFreePDF", tagline: "मुफ्त - तेज़ - सुरक्षित",
    hero: "PDF को किसी भी Format में बदलें!",
    heroSub: "15+ टूल्स - मुफ्त - तेज़ - सुरक्षित",
    heroSafe: "आपकी files convert होने के बाद तुरंत delete हो जाती हैं",
    login: "Google Login", logout: "लॉग आउट", free: "100% मुफ्त",
    convertNow: "अभी बदलें", dragText: "File drag करें या click करें",
    converting: "बदल रहे हैं... कृपया प्रतीक्षा करें...", advertisement: "विज्ञापन",
    privacy: "गोपनीयता नीति", terms: "नियम और शर्तें", about: "हमारे बारे में",
    footer: "WinFreePDF - हमेशा 100% मुफ्त",
    guestMsg: "आपने 3 मुफ्त conversions उपयोग कर लिए! Login करें और 15/दिन मुफ्त पाएं!",
    loginBtn: "Google से Sign in करें - मुफ्त!", cancel: "रद्द करें",
    limitMsg: "आज के 15 मुफ्त conversions समाप्त हो गए!",
    tomorrow: "कल फिर 15 मुफ्त conversions मिलेंगे!",
    premium: "Premium जल्द आ रहा है!", premiumSub: "असीमित conversions - ₹80/महीना",
    ok: "ठीक है, कल आऊंगा", selectFile: "फ़ाइल चुनें",
    howTitle: "यह कैसे काम करता है?",
    how1Title: "1. टूल चुनें", how1Desc: "15+ PDF टूल्स में से चुनें। सभी टूल्स बिल्कुल मुफ्त हैं।",
    how2Title: "2. File Upload करें", how2Desc: "अपनी file drag & drop करें। PDF, Word, Excel, PPT, JPG, PNG supported हैं।",
    how3Title: "3. तुरंत Download करें", how3Desc: "कुछ सेकंड में convert हो जाएगी। तुरंत download करें।",
    whyTitle: "WinFreePDF क्यों चुनें?",
    why1Title: "हमेशा 100% मुफ्त", why1Desc: "पूरी तरह मुफ्त। Login के बाद रोज 15 conversions मुफ्त।",
    why2Title: "तेज़ और सुरक्षित", why2Desc: "Files तुरंत process होती हैं और convert होने के बाद delete हो जाती हैं।",
    why3Title: "Registration जरूरी नहीं", why3Desc: "बिना account बनाए convert करें।",
    why4Title: "15+ शक्तिशाली टूल्स", why4Desc: "PDF to Word, Excel, JPG, PPT। Merge, split, compress सब एक जगह।",
    why5Title: "सभी devices पर काम करता है", why5Desc: "Desktop, laptop, tablet, mobile सभी पर। कोई software नहीं चाहिए।",
    why6Title: "भारतीय भाषाओं का support", why6Desc: "हिंदी, Tamil, Telugu, Malayalam, Kannada, Bengali, Marathi, Gujarati, Punjabi।",
    faqTitle: "अक्सर पूछे जाने वाले सवाल",
    faq1Q: "क्या WinFreePDF सच में मुफ्त है?", faq1A: "हाँ! 100% मुफ्त। Guest को 3, Login के बाद रोज 15 मुफ्त conversions।",
    faq2Q: "क्या मेरी files सुरक्षित हैं?", faq2A: "Convert होने के बाद तुरंत delete हो जाती हैं।",
    faq3Q: "कौन से file formats supported हैं?", faq3A: "PDF, Word, Excel, PowerPoint, JPG, PNG supported हैं।",
    faq4Q: "क्या software install करना होगा?", faq4A: "नहीं! सीधे browser में काम करता है।",
    faq5Q: "रोज कितनी files convert कर सकते हैं?", faq5A: "Guest: 3 files। Google login के बाद रोज 15 conversions।",
    faq6Q: "कौन सी भाषाएं supported हैं?", faq6A: "English, हिंदी, Tamil, Telugu, Malayalam, Kannada, Bengali, Marathi, Gujarati, Punjabi।",
  },
};
 
const languageNames: Record<string, string> = {
  en: "English", ta: "தமிழ்", hi: "हिंदी", te: "తెలుగు",
  ml: "മലയാളം", kn: "ಕನ್ನಡ", bn: "বাংলা", mr: "मराठी", gu: "ગુજરાતી", pa: "ਪੰਜਾਬੀ",
};
 
const toolTranslations: Record<string, Record<string, string>> = {
  "pdf-to-word": { en: "Convert PDF to editable Word documents instantly.", ta: "PDF ஐ உடனடியாக Word ஆக மாற்று.", hi: "PDF को तुरंत Word में बदलें।" },
  "word-to-pdf": { en: "Convert Word documents to PDF format easily.", ta: "Word ஐ எளிதாக PDF ஆக மாற்று.", hi: "Word को PDF में बदलें।" },
  "pdf-to-excel": { en: "Extract tables from PDF to Excel automatically.", ta: "PDF இலிருந்து Excel-க்கு tables.", hi: "PDF से Excel में tables।" },
  "excel-to-pdf": { en: "Convert Excel spreadsheets to PDF in seconds.", ta: "Excel ஐ PDF ஆக மாற்று.", hi: "Excel को PDF में बदलें।" },
  "pdf-to-jpg": { en: "Convert PDF pages to high quality JPG images.", ta: "PDF pages ஐ JPG images ஆக மாற்று.", hi: "PDF को JPG में बदलें।" },
  "jpg-to-pdf": { en: "Convert JPG images to PDF documents instantly.", ta: "JPG images ஐ PDF ஆக மாற்று.", hi: "JPG को PDF में बदलें।" },
  "png-to-pdf": { en: "Convert PNG images to PDF format free.", ta: "PNG images ஐ PDF ஆக மாற்று.", hi: "PNG को PDF में बदलें।" },
  "pdf-to-ppt": { en: "Convert PDF to PowerPoint presentations easily.", ta: "PDF ஐ PowerPoint ஆக மாற்று.", hi: "PDF को PowerPoint में बदलें।" },
  "ppt-to-pdf": { en: "Convert PowerPoint presentations to PDF online.", ta: "PowerPoint ஐ PDF ஆக மாற்று.", hi: "PowerPoint को PDF में बदलें।" },
  "merge-pdf": { en: "Combine multiple PDF files into one document.", ta: "பல PDF files ஐ ஒரு document-ஆக இணை.", hi: "कई PDF files को एक में जोड़ें।" },
  "compress-pdf": { en: "Reduce PDF file size without losing quality.", ta: "தரம் இழக்காமல் PDF size குறை.", hi: "PDF size कम करें।" },
  "split-pdf": { en: "Split PDF into multiple separate files.", ta: "PDF ஐ பல files ஆக பிரி.", hi: "PDF को अलग files में बाँटें।" },
  "rotate-pdf": { en: "Rotate PDF pages to any angle easily.", ta: "PDF pages ஐ திரும்பு.", hi: "PDF pages घुमाएं।" },
  "protect-pdf": { en: "Add password protection to secure your PDF.", ta: "PDF-க்கு password பாதுகாப்பு சேர்.", hi: "PDF को password से सुरक्षित करें।" },
  "unlock-pdf": { en: "Remove password from protected PDF files.", ta: "PDF-ல் இருந்து password நீக்கு.", hi: "PDF से password हटाएं।" },
};
 
const tools = [
  { id: "pdf-to-word", icon: "📄", title: "PDF to Word", inputFormat: "pdf", outputFormat: "docx", color: "#e8f4fd", accent: "#2196F3" },
  { id: "word-to-pdf", icon: "📝", title: "Word to PDF", inputFormat: "docx", outputFormat: "pdf", color: "#f3e8fd", accent: "#9C27B0" },
  { id: "pdf-to-excel", icon: "📊", title: "PDF to Excel", inputFormat: "pdf", outputFormat: "xlsx", color: "#e8fdf0", accent: "#4CAF50" },
  { id: "excel-to-pdf", icon: "📈", title: "Excel to PDF", inputFormat: "xlsx", outputFormat: "pdf", color: "#fdf4e8", accent: "#FF9800" },
  { id: "pdf-to-jpg", icon: "🖼️", title: "PDF to JPG", inputFormat: "pdf", outputFormat: "jpg", color: "#fde8e8", accent: "#F44336" },
  { id: "jpg-to-pdf", icon: "📷", title: "JPG to PDF", inputFormat: "jpg", outputFormat: "pdf", color: "#e8fdf8", accent: "#009688" },
  { id: "png-to-pdf", icon: "🖼️", title: "PNG to PDF", inputFormat: "png", outputFormat: "pdf", color: "#e8f0fd", accent: "#3F51B5" },
  { id: "pdf-to-ppt", icon: "📽️", title: "PDF to PPT", inputFormat: "pdf", outputFormat: "pptx", color: "#fdf0e8", accent: "#FF6D00" },
  { id: "ppt-to-pdf", icon: "🎞️", title: "PPT to PDF", inputFormat: "pptx", outputFormat: "pdf", color: "#e8fdfd", accent: "#00897B" },
  { id: "merge-pdf", icon: "🔗", title: "Merge PDF", inputFormat: "pdf", outputFormat: "pdf", color: "#fdf8e8", accent: "#FFC107" },
  { id: "compress-pdf", icon: "🗜️", title: "Compress PDF", inputFormat: "pdf", outputFormat: "pdf", color: "#e8f0fd", accent: "#3F51B5" },
  { id: "split-pdf", icon: "✂️", title: "Split PDF", inputFormat: "pdf", outputFormat: "pdf", color: "#f8e8fd", accent: "#E91E63" },
  { id: "rotate-pdf", icon: "🔄", title: "Rotate PDF", inputFormat: "pdf", outputFormat: "pdf", color: "#fde8f4", accent: "#FF4081" },
  { id: "protect-pdf", icon: "🔒", title: "Protect PDF", inputFormat: "pdf", outputFormat: "pdf", color: "#fdeee8", accent: "#FF5722" },
  { id: "unlock-pdf", icon: "🔓", title: "Unlock PDF", inputFormat: "pdf", outputFormat: "pdf", color: "#e8fdea", accent: "#8BC34A" },
];
 
const GUEST_LIMIT = 3;
const FREE_LIMIT = 15;
 
declare global { interface Window { adsbygoogle: any[]; } }
 
function AdBanner({ t }: { t: any }) {
  useEffect(() => { try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {} }, []);
  return (
    <div style={{ margin: "16px 0", textAlign: "center" }}>
      <p style={{ fontSize: "11px", color: "#aaa", margin: "0 0 4px" }}>{t.advertisement}</p>
      <ins className="adsbygoogle" style={{ display: "block" }}
        data-ad-client="ca-pub-9157505466817734" data-ad-slot="4259655308"
        data-ad-format="auto" data-full-width-responsive="true" />
    </div>
  );
}
 
function WinFreeLogo() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#C39BD3"/><stop offset="100%" stopColor="#6C3483"/>
      </linearGradient></defs>
      <path d="M22 38C22 38 5 27 5 16C5 10.5 9.5 7 14 7C17.5 7 20.5 9 22 12C23.5 9 26.5 7 30 7C34.5 7 39 10.5 39 16C39 27 22 38 22 38Z" fill="url(#hg)"/>
      <text x="22" y="21" fontFamily="Arial" fontWeight="bold" fontSize="7" fill="white" textAnchor="middle">Win</text>
      <text x="22" y="29" fontFamily="Arial" fontWeight="bold" fontSize="6" fill="white" textAnchor="middle">FreePDF</text>
    </svg>
  );
}
 
function HowItWorks({ t }: { t: any }) {
  return (
    <div style={{ background: "#fff", padding: "48px 32px", marginTop: "32px" }}>
      <h2 style={{ textAlign: "center", fontSize: "28px", fontWeight: "800", color: "#7B2FBE", marginBottom: "32px" }}>{t.howTitle}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px", maxWidth: "1000px", margin: "0 auto" }}>
        {[{ title: t.how1Title, desc: t.how1Desc, icon: "🛠️" },
          { title: t.how2Title, desc: t.how2Desc, icon: "📤" },
          { title: t.how3Title, desc: t.how3Desc, icon: "⬇️" }].map((item, i) => (
          <div key={i} style={{ textAlign: "center", padding: "24px", background: "#f8f0ff", borderRadius: "16px" }}>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>{item.icon}</div>
            <h3 style={{ color: "#7B2FBE", fontSize: "18px", marginBottom: "8px" }}>{item.title}</h3>
            <p style={{ color: "#666", fontSize: "14px", lineHeight: "1.6" }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
 
function WhyChooseUs({ t }: { t: any }) {
  return (
    <div style={{ background: "linear-gradient(135deg, #f8f0ff, #fff)", padding: "48px 32px", marginTop: "8px" }}>
      <h2 style={{ textAlign: "center", fontSize: "28px", fontWeight: "800", color: "#7B2FBE", marginBottom: "32px" }}>{t.whyTitle}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px", maxWidth: "1100px", margin: "0 auto" }}>
        {[{ title: t.why1Title, desc: t.why1Desc, icon: "🆓" },
          { title: t.why2Title, desc: t.why2Desc, icon: "🔒" },
          { title: t.why3Title, desc: t.why3Desc, icon: "⚡" },
          { title: t.why4Title, desc: t.why4Desc, icon: "🛠️" },
          { title: t.why5Title, desc: t.why5Desc, icon: "📱" },
          { title: t.why6Title, desc: t.why6Desc, icon: "🌏" }].map((item, i) => (
          <div key={i} style={{ padding: "20px", background: "#fff", borderRadius: "12px", boxShadow: "0 2px 8px rgba(123,47,190,0.08)", borderLeft: "4px solid #7B2FBE" }}>
            <div style={{ fontSize: "32px", marginBottom: "8px" }}>{item.icon}</div>
            <h3 style={{ color: "#7B2FBE", fontSize: "16px", marginBottom: "6px", fontWeight: "700" }}>{item.title}</h3>
            <p style={{ color: "#666", fontSize: "13px", lineHeight: "1.6", margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
 
function FAQ({ t }: { t: any }) {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: t.faq1Q, a: t.faq1A }, { q: t.faq2Q, a: t.faq2A },
    { q: t.faq3Q, a: t.faq3A }, { q: t.faq4Q, a: t.faq4A },
    { q: t.faq5Q, a: t.faq5A }, { q: t.faq6Q, a: t.faq6A },
  ];
  return (
    <div style={{ background: "#fff", padding: "48px 32px", marginTop: "8px" }}>
      <h2 style={{ textAlign: "center", fontSize: "28px", fontWeight: "800", color: "#7B2FBE", marginBottom: "32px" }}>{t.faqTitle}</h2>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{ marginBottom: "12px", border: "1px solid #e8d5ff", borderRadius: "12px", overflow: "hidden" }}>
            <button onClick={() => setOpen(open === i ? null : i)}
              style={{ width: "100%", padding: "16px 20px", background: open === i ? "#f8f0ff" : "#fff", border: "none", textAlign: "left", cursor: "pointer", fontSize: "15px", fontWeight: "600", color: "#333", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {faq.q}<span style={{ color: "#7B2FBE", fontSize: "20px" }}>{open === i ? "−" : "+"}</span>
            </button>
            {open === i && (
              <div style={{ padding: "16px 20px", background: "#f8f0ff", fontSize: "14px", color: "#555", lineHeight: "1.7", borderTop: "1px solid #e8d5ff" }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
 
export default function Home() {
  const [lang, setLang] = useState("en");
  const t = translations[lang] || translations.en;
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
  const selectedTool = tools.find((tool) => tool.id === activeTool);
 
  useEffect(() => {
    const savedGuest = parseInt(localStorage.getItem("guestCount") || "0");
    setGuestCount(savedGuest);
    const browserLang = navigator.language.slice(0, 2);
    const supportedLangs = ["en","ta","hi","te","ml","kn","bn","mr","gu","pa"];
    const savedLang = localStorage.getItem("lang") || (supportedLangs.includes(browserLang) ? browserLang : "en");
    setLang(savedLang);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchUsage(session.user.id);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchUsage(session.user.id);
    });
  }, []);
 
  const changeLang = (l: string) => { setLang(l); localStorage.setItem("lang", l); };
 
  const fetchUsage = async (userId: string) => {
    const today = new Date().toISOString().split("T")[0];
    const { data } = await supabase.from("user_usage").select("*").eq("user_id", userId).single();
    if (data) {
      if (data.last_reset !== today) {
        await supabase.from("user_usage").update({ conversion_count: 0, last_reset: today }).eq("user_id", userId);
        setUsageCount(0);
      } else { setUsageCount(data.conversion_count); }
    } else {
      await supabase.from("user_usage").insert({ user_id: userId, conversion_count: 0, last_reset: today });
      setUsageCount(0);
    }
  };
 
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback`, queryParams: { access_type: "offline", prompt: "consent" } },
    });
  };
 
  const handleLogout = async () => { await supabase.auth.signOut(); setUser(null); setUsageCount(0); };
  const handleFile = (f: File) => setFile(f);
  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); setDragging(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); };
 
  const handleConvert = async () => {
    if (!file || !selectedTool) { setStatus(t.selectFile); return; }
    if (!user) {
      const newGuestCount = guestCount + 1;
      if (newGuestCount > GUEST_LIMIT) { setShowLoginPopup(true); return; }
      setGuestCount(newGuestCount);
      localStorage.setItem("guestCount", newGuestCount.toString());
    }
    if (user && usageCount >= FREE_LIMIT) { setShowPremium(true); return; }
    setLoading(true); setShowAd(false); setStatus(t.converting);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("outputFormat", selectedTool.outputFormat);
      formData.append("toolId", selectedTool.id);
      const res = await fetch("/api/convert", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Conversion failed");
      const data = await res.json();
      if (!data.url) throw new Error("No download URL");
      const link = document.createElement("a");
      link.href = data.url;
      link.download = file.name.replace(/\.[^/.]+$/, `.${selectedTool.outputFormat}`);
      document.body.appendChild(link); link.click(); link.remove();
      if (user) {
        const newCount = usageCount + 1;
        setUsageCount(newCount);
        await supabase.from("user_usage").update({ conversion_count: newCount }).eq("user_id", user.id);
        setStatus(`✅ Success! (${newCount}/${FREE_LIMIT} today)`);
      } else { setStatus(`✅ Success! (${guestCount}/${GUEST_LIMIT} free)`); }
      setShowAd(true);
    } catch (err) { setStatus("❌ Conversion failed. Please try again!"); }
    finally { setLoading(false); }
  };
 
  if (showPage === "privacy") return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa", padding: "32px", fontFamily: "'Segoe UI', sans-serif" }}>
      <button onClick={() => setShowPage(null)} style={{ background: "#7B2FBE", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", marginBottom: "24px" }}>← Back</button>
      <h1 style={{ color: "#7B2FBE" }}>{t.privacy}</h1>
      <h2>1. Files & Data</h2><p>Your uploaded files are processed securely and deleted immediately after conversion. We never store your files.</p>
      <h2>2. Personal Information</h2><p>We collect only your email address via Google Login to track your daily conversion count.</p>
      <h2>3. Cookies</h2><p>We use cookies to save your language preference. Google AdSense may use cookies to show personalized advertisements.</p>
      <h2>4. Google AdSense</h2><p>This website uses Google AdSense to display advertisements.</p>
      <h2>5. Contact</h2><p>Email: umashri414@gmail.com</p>
    </div>
  );
 
  if (showPage === "terms") return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa", padding: "32px", fontFamily: "'Segoe UI', sans-serif" }}>
      <button onClick={() => setShowPage(null)} style={{ background: "#7B2FBE", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", marginBottom: "24px" }}>← Back</button>
      <h1 style={{ color: "#7B2FBE" }}>{t.terms}</h1>
      <h2>1. Usage</h2><p>Guest users get 3 free conversions. Registered users get 15 free conversions per day.</p>
      <h2>2. File Safety</h2><p>Uploaded files are deleted immediately after conversion.</p>
      <h2>3. Advertisements</h2><p>This site displays Google AdSense advertisements to support free service.</p>
      <h2>4. Contact</h2><p>Email: umashri414@gmail.com</p>
    </div>
  );
 
  if (showPage === "about") return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa", padding: "32px", fontFamily: "'Segoe UI', sans-serif" }}>
      <button onClick={() => setShowPage(null)} style={{ background: "#7B2FBE", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", marginBottom: "24px" }}>← Back</button>
      <h1 style={{ color: "#7B2FBE" }}>{t.about}</h1>
      <p>WinFreePDF is a free, fast, and secure online PDF converter tool supporting 15+ conversion tools and 10 Indian languages.</p>
      <h2>Our Mission</h2><p>To provide free, high-quality PDF conversion tools accessible to everyone across India in their native languages.</p>
      <h2>Contact Us</h2><p>Email: umashri414@gmail.com | Website: https://winfreepdf.vercel.app</p>
    </div>
  );
 
  if (activeTool && selectedTool) {
    const toolDesc = toolTranslations[activeTool]?.[lang] || toolTranslations[activeTool]?.en || "";
    return (
      <div style={{ minHeight: "100vh", background: "#f5f7fa", fontFamily: "'Segoe UI', sans-serif" }}>
        <header style={{ background: "#fff", borderBottom: "2px solid #eee", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button onClick={() => { setActiveTool(null); setFile(null); setStatus(""); setShowAd(false); }} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer" }}>←</button>
            <WinFreeLogo />
            <div>
              <h1 style={{ margin: 0, fontSize: "22px", fontWeight: "700", color: selectedTool.accent }}>{selectedTool.title}</h1>
              <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>{toolDesc}</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <select value={lang} onChange={(e) => changeLang(e.target.value)} style={{ padding: "6px 10px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "13px", cursor: "pointer" }}>
              {Object.entries(languageNames).map(([code, name]) => <option key={code} value={code}>{name}</option>)}
            </select>
            {user ? (
              <><span style={{ fontSize: "13px", color: "#666" }}>{usageCount}/{FREE_LIMIT}</span>
              <button onClick={handleLogout} style={{ background: "#eee", border: "none", borderRadius: "8px", padding: "8px 16px", cursor: "pointer" }}>{t.logout}</button></>
            ) : (
              <button onClick={handleGoogleLogin} style={{ background: "#7B2FBE", color: "#fff", border: "none", borderRadius: "8px", padding: "8px 16px", cursor: "pointer", fontWeight: "600" }}>{t.login}</button>
            )}
          </div>
        </header>
        <div style={{ maxWidth: "700px", margin: "48px auto", padding: "0 16px" }}>
          <AdBanner t={t} />
          <div onDrop={handleDrop} onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onClick={() => fileRef.current?.click()}
            style={{ border: `3px dashed ${dragging ? selectedTool.accent : "#ccc"}`, borderRadius: "20px", padding: "60px 32px", textAlign: "center", cursor: "pointer", background: dragging ? selectedTool.color : "#fff" }}>
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>{selectedTool.icon}</div>
            <h2 style={{ fontSize: "20px", color: "#333", margin: "0 0 8px" }}>{t.dragText}</h2>
            <p style={{ color: "#888", margin: 0 }}>.{selectedTool.inputFormat}</p>
            <input ref={fileRef} type="file" style={{ display: "none" }} accept={`.${selectedTool.inputFormat}`} onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
          </div>
          {file && (
            <div style={{ marginTop: "24px", background: "#fff", borderRadius: "12px", padding: "20px", border: "1px solid #eee" }}>
              <p style={{ margin: "0 0 16px", color: "#444" }}>📎 {file.name} ({(file.size / 1024).toFixed(1)} KB)</p>
              <button onClick={handleConvert} disabled={loading}
                style={{ background: loading ? "#ccc" : selectedTool.accent, color: "#fff", border: "none", borderRadius: "10px", padding: "14px 40px", fontSize: "18px", cursor: loading ? "not-allowed" : "pointer", width: "100%", fontWeight: "700" }}>
                {loading ? t.converting : `${t.convertNow} 🚀`}
              </button>
            </div>
          )}
          {status && <div style={{ marginTop: "16px", padding: "16px", background: "#fff", borderRadius: "12px", textAlign: "center", fontSize: "16px", border: "1px solid #eee" }}>{status}</div>}
          {showAd && <AdBanner t={t} />}
        </div>
        {showLoginPopup && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
            <div style={{ background: "#fff", borderRadius: "20px", padding: "40px", maxWidth: "400px", textAlign: "center" }}>
              <div style={{ fontSize: "48px" }}>💜</div>
              <h2 style={{ color: "#7B2FBE" }}>Free Limit Reached!</h2>
              <p>{t.guestMsg}</p>
              <button onClick={() => { setShowLoginPopup(false); handleGoogleLogin(); }} style={{ background: "#7B2FBE", color: "#fff", border: "none", borderRadius: "10px", padding: "12px 32px", cursor: "pointer", fontWeight: "700", width: "100%", marginBottom: "12px" }}>{t.loginBtn}</button>
              <button onClick={() => setShowLoginPopup(false)} style={{ background: "#eee", border: "none", borderRadius: "10px", padding: "10px 32px", cursor: "pointer", width: "100%" }}>{t.cancel}</button>
            </div>
          </div>
        )}
        {showPremium && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
            <div style={{ background: "#fff", borderRadius: "20px", padding: "40px", maxWidth: "400px", textAlign: "center" }}>
              <div style={{ fontSize: "48px" }}>🚀</div>
              <h2 style={{ color: "#7B2FBE" }}>Daily Limit Reached!</h2>
              <p>{t.limitMsg}</p>
              <p style={{ color: "#666", fontSize: "14px" }}>{t.tomorrow}</p>
              <div style={{ background: "#f5f5f5", borderRadius: "12px", padding: "20px", margin: "16px 0" }}>
                <h3 style={{ margin: "0 0 8px", color: "#7B2FBE" }}>{t.premium}</h3>
                <p style={{ margin: 0, fontSize: "14px" }}>{t.premiumSub}</p>
              </div>
              <button onClick={() => setShowPremium(false)} style={{ background: "#7B2FBE", color: "#fff", border: "none", borderRadius: "10px", padding: "12px 32px", cursor: "pointer", fontWeight: "700" }}>{t.ok}</button>
            </div>
          </div>
        )}
      </div>
    );
  }
 
  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa", fontFamily: "'Segoe UI', sans-serif" }}>
      <header style={{ background: "#fff", borderBottom: "2px solid #eee", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <WinFreeLogo />
          <div>
            <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "900", color: "#7B2FBE" }}>{t.title}</h1>
            <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>{t.tagline}</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <select value={lang} onChange={(e) => changeLang(e.target.value)} style={{ padding: "6px 10px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "13px", cursor: "pointer" }}>
            {Object.entries(languageNames).map(([code, name]) => <option key={code} value={code}>{name}</option>)}
          </select>
          {user ? (
            <><span style={{ fontSize: "13px", color: "#666" }}>👤 {user.email?.split("@")[0]} | {usageCount}/{FREE_LIMIT}</span>
            <button onClick={handleLogout} style={{ background: "#eee", border: "none", borderRadius: "8px", padding: "8px 16px", cursor: "pointer" }}>{t.logout}</button></>
          ) : (
            <button onClick={handleGoogleLogin} style={{ background: "#7B2FBE", color: "#fff", border: "none", borderRadius: "8px", padding: "8px 16px", cursor: "pointer", fontWeight: "600" }}>{t.login}</button>
          )}
          <span style={{ background: "#7B2FBE", color: "#fff", padding: "6px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: "600" }}>{t.free}</span>
        </div>
      </header>
 
      <div style={{ background: "linear-gradient(135deg, #6C3483, #C39BD3)", padding: "48px 32px", textAlign: "center", color: "#fff" }}>
        <h2 style={{ fontSize: "36px", fontWeight: "900", margin: "0 0 12px" }}>{t.hero}</h2>
        <p style={{ fontSize: "18px", margin: "0 0 8px", opacity: 0.9 }}>{t.heroSub}</p>
        <p style={{ fontSize: "14px", margin: 0, opacity: 0.8 }}>🔒 {t.heroSafe}</p>
      </div>
 
      <div style={{ maxWidth: "1200px", margin: "20px auto", padding: "0 16px" }}>
        <AdBanner t={t} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px", marginTop: "20px" }}>
          {tools.map((tool) => (
            <div key={tool.id} onClick={() => setActiveTool(tool.id)}
              style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", cursor: "pointer", border: "2px solid transparent", boxShadow: "0 2px 8px rgba(0,0,0,0.07)", transition: "all 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.border = `2px solid ${tool.accent}`; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.border = "2px solid transparent"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>{tool.icon}</div>
              <h3 style={{ margin: "0 0 6px", fontSize: "16px", fontWeight: "700", color: "#222" }}>{tool.title}</h3>
              <p style={{ margin: 0, fontSize: "13px", color: "#666" }}>{toolTranslations[tool.id]?.[lang] || toolTranslations[tool.id]?.en}</p>
              <div style={{ marginTop: "12px", color: tool.accent, fontSize: "13px", fontWeight: "600" }}>{t.convertNow} →</div>
            </div>
          ))}
        </div>
      </div>
 
      <HowItWorks t={t} />
      <AdBanner t={t} />
      <WhyChooseUs t={t} />
      <AdBanner t={t} />
      <FAQ t={t} />
 
      <footer style={{ textAlign: "center", padding: "32px", color: "#aaa", fontSize: "14px", borderTop: "1px solid #eee", marginTop: "40px" }}>
        <p style={{ marginBottom: "12px" }}>💜 {t.footer}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap" }}>
          <button onClick={() => setShowPage("privacy")} style={{ background: "none", border: "none", color: "#7B2FBE", cursor: "pointer", fontSize: "14px" }}>{t.privacy}</button>
          <button onClick={() => setShowPage("terms")} style={{ background: "none", border: "none", color: "#7B2FBE", cursor: "pointer", fontSize: "14px" }}>{t.terms}</button>
          <button onClick={() => setShowPage("about")} style={{ background: "none", border: "none", color: "#7B2FBE", cursor: "pointer", fontSize: "14px" }}>{t.about}</button>
        </div>
      </footer>
    </div>
  );
}
