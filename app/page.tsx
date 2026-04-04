
"use client";
import { useState, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
 
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
 
const translations: Record<string, any> = {
  en: {
    title: "WinFreePDF",
    tagline: "Free - Fast - Secure",
    hero: "Convert PDF to Any Format Free!",
    heroSub: "15+ tools - Free - Fast - Secure - No watermark",
    heroSafe: "Your files are deleted immediately after conversion - 100% Safe",
    login: "Google Login",
    logout: "Logout",
    free: "100% FREE",
    convertNow: "Convert Now",
    dragText: "Drag file here or click to select",
    converting: "Converting... Please wait...",
    advertisement: "Advertisement",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
    about: "About Us",
    footer: "WinFreePDF - 100% Free Forever",
    guestMsg: "You have used 3 free conversions! Login to get 15/day free!",
    loginBtn: "Sign in with Google - Free!",
    cancel: "Cancel",
    limitMsg: "You have used all 15 free conversions today!",
    tomorrow: "Come back tomorrow for 15 more free conversions!",
    premium: "Premium Coming Soon!",
    premiumSub: "Unlimited conversions - $1/month",
    ok: "OK, Come back tomorrow",
    selectFile: "Select file",
  },
  ta: {
    title: "WinFreePDF",
    tagline: "இலவசம் - வேகமான - பாதுகாப்பான",
    hero: "PDF ஐ எதுவாக வேணும்னாலும் மாற்று!",
    heroSub: "15+ கருவிகள் - இலவசம் - வேகமான - பாதுகாப்பான - வாட்டர்மார்க் இல்லை",
    heroSafe: "உங்கள் files convert ஆனதும் உடனே delete ஆகும் - 100% பாதுகாப்பு",
    login: "Google உள்நுழைவு",
    logout: "வெளியேறு",
    free: "100% இலவசம்",
    convertNow: "இப்பவே மாற்று",
    dragText: "File drag பண்ணு அல்லது click பண்ணு",
    converting: "மாற்றுகிறது... காத்திருங்கள்...",
    advertisement: "விளம்பரம்",
    privacy: "தனியுரிமை கொள்கை",
    terms: "விதிமுறைகள்",
    about: "எங்களைப் பற்றி",
    footer: "WinFreePDF - என்றும் 100% இலவசம்",
    guestMsg: "நீங்கள் 3 இலவச conversions பயன்படுத்திவிட்டீர்கள்! Login பண்ணா 15/நாள் இலவசம்!",
    loginBtn: "Google-ல் உள்நுழையுங்கள் - இலவசம்!",
    cancel: "ரத்து செய்",
    limitMsg: "இன்று 15 இலவச conversions முடிந்துவிட்டது!",
    tomorrow: "நாளைக்கு மீண்டும் 15 இலவச conversions கிடைக்கும்!",
    premium: "Premium விரைவில் வருகிறது!",
    premiumSub: "வரம்பற்ற conversions - மாதம் $1",
    ok: "சரி, நாளைக்கு வருகிறேன்",
    selectFile: "கோப்பு தேர்ந்தெடு",
  },
  hi: {
    title: "WinFreePDF",
    tagline: "मुफ्त - तेज़ - सुरक्षित",
    hero: "PDF को किसी भी Format में बदलें!",
    heroSub: "15+ टूल्स - मुफ्त - तेज़ - सुरक्षित - कोई वॉटरमार्क नहीं",
    heroSafe: "आपकी files convert होने के बाद तुरंत delete हो जाती हैं - 100% सुरक्षित",
    login: "Google Login",
    logout: "लॉग आउट",
    free: "100% मुफ्त",
    convertNow: "अभी बदलें",
    dragText: "File drag करें या click करें",
    converting: "बदल रहे हैं... कृपया प्रतीक्षा करें...",
    advertisement: "विज्ञापन",
    privacy: "गोपनीयता नीति",
    terms: "नियम और शर्तें",
    about: "हमारे बारे में",
    footer: "WinFreePDF - हमेशा 100% मुफ्त",
    guestMsg: "आपने 3 मुफ्त conversions उपयोग कर लिए! Login करें और 15/दिन मुफ्त पाएं!",
    loginBtn: "Google से Sign in करें - मुफ्त!",
    cancel: "रद्द करें",
    limitMsg: "आज के 15 मुफ्त conversions समाप्त हो गए!",
    tomorrow: "कल फिर 15 मुफ्त conversions मिलेंगे!",
    premium: "Premium जल्द आ रहा है!",
    premiumSub: "असीमित conversions - $1/महीना",
    ok: "ठीक है, कल आऊंगा",
    selectFile: "फ़ाइल चुनें",
  },
  te: {
    title: "WinFreePDF",
    tagline: "ఉచిత - వేగవంతమైన - సురక్షితమైన",
    hero: "PDF ని ఏ format లోకైనా మార్చండి!",
    heroSub: "15+ సాధనాలు - ఉచిత - వేగవంతమైన - సురక్షితమైన",
    heroSafe: "మీ files convert అయిన వెంటనే తొలగించబడతాయి - 100% సురక్షితం",
    login: "Google Login",
    logout: "లాగ్ అవుట్",
    free: "100% ఉచిత",
    convertNow: "ఇప్పుడే మార్చండి",
    dragText: "File drag చేయండి లేదా click చేయండి",
    converting: "మారుస్తున్నాము... దయచేసి వేచి ఉండండి...",
    advertisement: "ప్రకటన",
    privacy: "గోప్యతా విధానం",
    terms: "నిబంధనలు",
    about: "మా గురించి",
    footer: "WinFreePDF - ఎల్లప్పుడూ 100% ఉచిత",
    guestMsg: "మీరు 3 ఉచిత conversions వాడారు! Login చేసి 15/రోజు ఉచితంగా పొందండి!",
    loginBtn: "Google తో Sign in చేయండి - ఉచిత!",
    cancel: "రద్దు చేయి",
    limitMsg: "ఈరోజు 15 ఉచిత conversions అయిపోయాయి!",
    tomorrow: "రేపు మళ్ళీ 15 ఉచిత conversions పొందండి!",
    premium: "Premium త్వరలో వస్తోంది!",
    premiumSub: "అపరిమిత conversions - నెలకు $1",
    ok: "సరే, రేపు వస్తాను",
    selectFile: "ఫైల్ ఎంచుకోండి",
  },
  ml: {
    title: "WinFreePDF",
    tagline: "സൗജന്യം - വേഗതയുള്ള - സുരക്ഷിതം",
    hero: "PDF ഏത് Format-ലേക്കും മാറ്റൂ!",
    heroSub: "15+ ഉപകരണങ്ങൾ - സൗജന്യം - വേഗതയുള്ള - സുരക്ഷിതം",
    heroSafe: "നിങ്ങളുടെ files convert ആയ ഉടൻ delete ആകും - 100% സുരക്ഷിതം",
    login: "Google Login",
    logout: "ലോഗ് ഔട്ട്",
    free: "100% സൗജന്യം",
    convertNow: "ഇപ്പോൾ മാറ്റൂ",
    dragText: "File drag ചെയ്യൂ അല്ലെങ്കിൽ click ചെയ്യൂ",
    converting: "മാറ്റുന്നു... കാത്തിരിക്കൂ...",
    advertisement: "പരസ്യം",
    privacy: "സ്വകാര്യതാ നയം",
    terms: "നിബന്ധനകൾ",
    about: "ഞങ്ങളെക്കുറിച്ച്",
    footer: "WinFreePDF - എന്നും 100% സൗജന്യം",
    guestMsg: "നിങ്ങൾ 3 സൗജന്യ conversions ഉപയോഗിച്ചു! Login ചെയ്ത് 15/ദിവസം സൗജന്യം നേടൂ!",
    loginBtn: "Google-ൽ Sign in ചെയ്യൂ - സൗജന്യം!",
    cancel: "റദ്ദാക്കൂ",
    limitMsg: "ഇന്നത്തെ 15 സൗജന്യ conversions തീർന്നു!",
    tomorrow: "നാളെ വീണ്ടും 15 സൗജന്യ conversions ലഭിക്കും!",
    premium: "Premium ഉടൻ വരുന്നു!",
    premiumSub: "പരിധിയില്ലാത്ത conversions - മാസം $1",
    ok: "ശരി, നാളെ വരാം",
    selectFile: "ഫയൽ തിരഞ്ഞെടുക്കൂ",
  },
  kn: {
    title: "WinFreePDF",
    tagline: "ಉಚಿತ - ವೇಗ - ಸುರಕ್ಷಿತ",
    hero: "PDF ಅನ್ನು ಯಾವ Format ಗೂ ಬದಲಾಯಿಸಿ!",
    heroSub: "15+ ಉಪಕರಣಗಳು - ಉಚಿತ - ವೇಗ - ಸುರಕ್ಷಿತ",
    heroSafe: "ನಿಮ್ಮ files convert ಆದ ತಕ್ಷಣ delete ಆಗುತ್ತವೆ - 100% ಸುರಕ್ಷಿತ",
    login: "Google Login",
    logout: "ಲಾಗ್ ಔಟ್",
    free: "100% ಉಚಿತ",
    convertNow: "ಈಗಲೇ ಬದಲಾಯಿಸಿ",
    dragText: "File drag ಮಾಡಿ ಅಥವಾ click ಮಾಡಿ",
    converting: "ಬದಲಾಯಿಸುತ್ತಿದ್ದೇವೆ... ದಯವಿಟ್ಟು ನಿರೀಕ್ಷಿಸಿ...",
    advertisement: "ಜಾಹೀರಾತು",
    privacy: "ಗೌಪ್ಯತಾ ನೀತಿ",
    terms: "ನಿಯಮಗಳು",
    about: "ನಮ್ಮ ಬಗ್ಗೆ",
    footer: "WinFreePDF - ಯಾವಾಗಲೂ 100% ಉಚಿತ",
    guestMsg: "ನೀವು 3 ಉಚಿತ conversions ಬಳಸಿದ್ದೀರಿ! Login ಮಾಡಿ 15/ದಿನ ಉಚಿತ ಪಡೆಯಿರಿ!",
    loginBtn: "Google ನಲ್ಲಿ Sign in ಮಾಡಿ - ಉಚಿತ!",
    cancel: "ರದ್ದುಮಾಡಿ",
    limitMsg: "ಇಂದಿನ 15 ಉಚಿತ conversions ಮುಗಿದಿವೆ!",
    tomorrow: "ನಾಳೆ ಮತ್ತೆ 15 ಉಚಿತ conversions ಸಿಗುತ್ತವೆ!",
    premium: "Premium ಶೀಘ್ರದಲ್ಲೇ ಬರುತ್ತಿದೆ!",
    premiumSub: "ಅಪರಿಮಿತ conversions - ತಿಂಗಳಿಗೆ $1",
    ok: "ಸರಿ, ನಾಳೆ ಬರುತ್ತೇನೆ",
    selectFile: "ಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ",
  },
  bn: {
    title: "WinFreePDF",
    tagline: "বিনামূল্যে - দ্রুত - নিরাপদ",
    hero: "PDF যেকোনো Format-এ রূপান্তর করুন!",
    heroSub: "15+ টুলস - বিনামূল্যে - দ্রুত - নিরাপদ",
    heroSafe: "আপনার files convert হওয়ার সাথে সাথে delete হয়ে যায় - 100% নিরাপদ",
    login: "Google Login",
    logout: "লগ আউট",
    free: "100% বিনামূল্যে",
    convertNow: "এখনই রূপান্তর করুন",
    dragText: "File drag করুন বা click করুন",
    converting: "রূপান্তরিত হচ্ছে... অনুগ্রহ করে অপেক্ষা করুন...",
    advertisement: "বিজ্ঞাপন",
    privacy: "গোপনীয়তা নীতি",
    terms: "শর্তাবলী",
    about: "আমাদের সম্পর্কে",
    footer: "WinFreePDF - সবসময় 100% বিনামূল্যে",
    guestMsg: "আপনি 3টি বিনামূল্যে conversion ব্যবহার করেছেন! Login করুন এবং 15/দিন বিনামূল্যে পান!",
    loginBtn: "Google দিয়ে Sign in করুন - বিনামূল্যে!",
    cancel: "বাতিল করুন",
    limitMsg: "আজকের 15টি বিনামূল্যে conversion শেষ!",
    tomorrow: "আগামীকাল আবার 15টি বিনামূল্যে conversion পাবেন!",
    premium: "Premium শীঘ্রই আসছে!",
    premiumSub: "সীমাহীন conversion - মাসে $1",
    ok: "ঠিক আছে, আগামীকাল আসব",
    selectFile: "ফাইল নির্বাচন করুন",
  },
  mr: {
    title: "WinFreePDF",
    tagline: "मोफत - जलद - सुरक्षित",
    hero: "PDF कोणत्याही Format मध्ये बदला!",
    heroSub: "15+ साधने - मोफत - जलद - सुरक्षित",
    heroSafe: "तुमच्या files convert झाल्यावर लगेच delete होतात - 100% सुरक्षित",
    login: "Google Login",
    logout: "लॉग आउट",
    free: "100% मोफत",
    convertNow: "आत्ता बदला",
    dragText: "File drag करा किंवा click करा",
    converting: "बदलत आहे... कृपया थांबा...",
    advertisement: "जाहिरात",
    privacy: "गोपनीयता धोरण",
    terms: "अटी व शर्ती",
    about: "आमच्याबद्दल",
    footer: "WinFreePDF - नेहमी 100% मोफत",
    guestMsg: "तुम्ही 3 मोफत conversions वापरले! Login करा आणि 15/दिवस मोफत मिळवा!",
    loginBtn: "Google ने Sign in करा - मोफत!",
    cancel: "रद्द करा",
    limitMsg: "आजचे 15 मोफत conversions संपले!",
    tomorrow: "उद्या पुन्हा 15 मोफत conversions मिळतील!",
    premium: "Premium लवकरच येत आहे!",
    premiumSub: "अमर्यादित conversions - महिन्याला $1",
    ok: "ठीक आहे, उद्या येतो",
    selectFile: "फाइल निवडा",
  },
  gu: {
    title: "WinFreePDF",
    tagline: "મફત - ઝડપી - સુરક્ષિત",
    hero: "PDF ને કોઈ પણ Format માં બદલો!",
    heroSub: "15+ સાધનો - મફત - ઝડપી - સુરક્ષિત",
    heroSafe: "તમારી files convert થયા પછી તરત delete થઈ જાય છે - 100% સુરક્ષિત",
    login: "Google Login",
    logout: "લૉગ આઉટ",
    free: "100% મફત",
    convertNow: "હમણાં જ બદલો",
    dragText: "File drag કરો અથવા click કરો",
    converting: "બદલી રહ્યા છીએ... કૃપા કરીને રાહ જુઓ...",
    advertisement: "જાહેરાત",
    privacy: "ગોપનીયતા નીતિ",
    terms: "નિયમો અને શરતો",
    about: "અમારા વિશે",
    footer: "WinFreePDF - હંમેશા 100% મફત",
    guestMsg: "તમે 3 મફત conversions વાપર્યા! Login કરો અને 15/દિવસ મફત મેળવો!",
    loginBtn: "Google સાથે Sign in કરો - મફત!",
    cancel: "રદ કરો",
    limitMsg: "આજના 15 મફત conversions પૂરા થઈ ગયા!",
    tomorrow: "કાલે ફરીથી 15 મફત conversions મળશે!",
    premium: "Premium ટૂંક સમયમાં આવે છે!",
    premiumSub: "અમર્યાદિત conversions - મહિને $1",
    ok: "ઠીક છે, કાલે આવીશ",
    selectFile: "ફાઇલ પસંદ કરો",
  },
  pa: {
    title: "WinFreePDF",
    tagline: "ਮੁਫ਼ਤ - ਤੇਜ਼ - ਸੁਰੱਖਿਅਤ",
    hero: "PDF ਨੂੰ ਕਿਸੇ ਵੀ Format ਵਿੱਚ ਬਦਲੋ!",
    heroSub: "15+ ਸਾਧਨ - ਮੁਫ਼ਤ - ਤੇਜ਼ - ਸੁਰੱਖਿਅਤ",
    heroSafe: "ਤੁਹਾਡੀਆਂ files convert ਹੋਣ ਤੋਂ ਬਾਅਦ ਤੁਰੰਤ delete ਹੋ ਜਾਂਦੀਆਂ ਹਨ",
    login: "Google Login",
    logout: "ਲੌਗ ਆਊਟ",
    free: "100% ਮੁਫ਼ਤ",
    convertNow: "ਹੁਣੇ ਬਦਲੋ",
    dragText: "File drag ਕਰੋ ਜਾਂ click ਕਰੋ",
    converting: "ਬਦਲ ਰਿਹਾ ਹੈ... ਕਿਰਪਾ ਕਰਕੇ ਉਡੀਕ ਕਰੋ...",
    advertisement: "ਇਸ਼ਤਿਹਾਰ",
    privacy: "ਗੋਪਨੀਯਤਾ ਨੀਤੀ",
    terms: "ਨਿਯਮ ਅਤੇ ਸ਼ਰਤਾਂ",
    about: "ਸਾਡੇ ਬਾਰੇ",
    footer: "WinFreePDF - ਹਮੇਸ਼ਾ 100% ਮੁਫ਼ਤ",
    guestMsg: "ਤੁਸੀਂ 3 ਮੁਫ਼ਤ conversions ਵਰਤੇ! Login ਕਰੋ ਅਤੇ 15/ਦਿਨ ਮੁਫ਼ਤ ਪਾਓ!",
    loginBtn: "Google ਨਾਲ Sign in ਕਰੋ - ਮੁਫ਼ਤ!",
    cancel: "ਰੱਦ ਕਰੋ",
    limitMsg: "ਅੱਜ ਦੇ 15 ਮੁਫ਼ਤ conversions ਖਤਮ ਹੋ ਗਏ!",
    tomorrow: "ਕੱਲ੍ਹ ਫਿਰ 15 ਮੁਫ਼ਤ conversions ਮਿਲਣਗੇ!",
    premium: "Premium ਜਲਦੀ ਆ ਰਿਹਾ ਹੈ!",
    premiumSub: "ਅਸੀਮਤ conversions - ਮਹੀਨੇ $1",
    ok: "ਠੀਕ ਹੈ, ਕੱਲ੍ਹ ਆਵਾਂਗਾ",
    selectFile: "ਫ਼ਾਈਲ ਚੁਣੋ",
  },
};
 
const languageNames: Record<string, string> = {
  en: "English",
  ta: "தமிழ்",
  hi: "हिंदी",
  te: "తెలుగు",
  ml: "മലയാളം",
  kn: "ಕನ್ನಡ",
  bn: "বাংলা",
  mr: "मराठी",
  gu: "ગુજરાતી",
  pa: "ਪੰਜਾਬੀ",
};
 
const toolTranslations: Record<string, Record<string, string>> = {
  "pdf-to-word": { en: "Convert PDF to editable Word documents instantly.", ta: "PDF ஐ உடனடியாக திருத்தக்கூடிய Word ஆக மாற்று.", hi: "PDF को तुरंत editable Word में बदलें।", te: "PDF ని వెంటనే editable Word గా మార్చండి.", ml: "PDF ഉടൻ editable Word ആക്കൂ.", kn: "PDF ಅನ್ನು ತಕ್ಷಣ editable Word ಗೆ ಬದಲಾಯಿಸಿ.", bn: "PDF কে তাৎক্ষণিক editable Word এ রূপান্তর করুন।", mr: "PDF ला लगेच editable Word मध्ये बदला.", gu: "PDF ને તરત editable Word માં બદલો.", pa: "PDF ਨੂੰ ਤੁਰੰਤ editable Word ਵਿੱਚ ਬਦਲੋ।" },
  "word-to-pdf": { en: "Convert Word documents to PDF format easily.", ta: "Word ஐ எளிதாக PDF ஆக மாற்று.", hi: "Word को आसानी से PDF में बदलें।", te: "Word ని సులభంగా PDF గా మార్చండి.", ml: "Word എളുപ്പത്തിൽ PDF ആക്കൂ.", kn: "Word ಅನ್ನು ಸುಲಭವಾಗಿ PDF ಗೆ ಬದಲಾಯಿಸಿ.", bn: "Word কে সহজে PDF এ রূপান্তর করুন।", mr: "Word ला सहजपणे PDF मध्ये बदला.", gu: "Word ને સરળતાથી PDF માં બદલો.", pa: "Word ਨੂੰ ਆਸਾਨੀ ਨਾਲ PDF ਵਿੱਚ ਬਦਲੋ।" },
  "pdf-to-excel": { en: "Extract tables from PDF to Excel automatically.", ta: "PDF இலிருந்து Excel-க்கு tables தானாக extract பண்ணு.", hi: "PDF से Excel में tables automatically extract करें।", te: "PDF నుండి Excel కి tables automatically extract చేయండి.", ml: "PDF ൽ നിന്ന് Excel-ലേക്ക് tables extract ചെയ്യൂ.", kn: "PDF ನಿಂದ Excel ಗೆ tables ತಾನಾಗಿ extract ಮಾಡಿ.", bn: "PDF থেকে Excel এ tables স্বয়ংক্রিয়ভাবে extract করুন।", mr: "PDF मधून Excel मध्ये tables आपोआप काढा.", gu: "PDF માંથી Excel માં tables આપોઆપ extract કરો.", pa: "PDF ਤੋਂ Excel ਵਿੱਚ tables ਆਪਣੇ ਆਪ extract ਕਰੋ।" },
  "excel-to-pdf": { en: "Convert Excel spreadsheets to PDF in seconds.", ta: "Excel ஐ சில நொடிகளில் PDF ஆக மாற்று.", hi: "Excel को कुछ सेकंड में PDF में बदलें।", te: "Excel ని సెకన్లలో PDF గా మార్చండి.", ml: "Excel സെക്കൻഡുകളിൽ PDF ആക്കൂ.", kn: "Excel ಅನ್ನು ಕ್ಷಣಗಳಲ್ಲಿ PDF ಗೆ ಬದಲಾಯಿಸಿ.", bn: "Excel কে মুহূর্তের মধ্যে PDF এ রূপান্তর করুন।", mr: "Excel ला काही सेकंदात PDF मध्ये बदला.", gu: "Excel ને સેકન્ડોમાં PDF માં બદલો.", pa: "Excel ਨੂੰ ਸਕਿੰਟਾਂ ਵਿੱਚ PDF ਵਿੱਚ ਬਦਲੋ।" },
  "pdf-to-jpg": { en: "Convert PDF pages to high quality JPG images.", ta: "PDF pages ஐ உயர்தர JPG images ஆக மாற்று.", hi: "PDF pages को high quality JPG images में बदलें।", te: "PDF pages ని high quality JPG గా మార్చండి.", ml: "PDF pages ഉയർന്ന നിലവാരമുള്ള JPG ആക്കൂ.", kn: "PDF pages ಅನ್ನು high quality JPG ಗೆ ಬದಲಾಯಿಸಿ.", bn: "PDF pages কে high quality JPG এ রূপান্তর করুন।", mr: "PDF pages ला high quality JPG मध्ये बदला.", gu: "PDF pages ને high quality JPG માં બદલો.", pa: "PDF pages ਨੂੰ high quality JPG ਵਿੱਚ ਬਦਲੋ।" },
  "jpg-to-pdf": { en: "Convert JPG images to PDF documents instantly.", ta: "JPG images ஐ உடனடியாக PDF ஆக மாற்று.", hi: "JPG images को तुरंत PDF में बदलें।", te: "JPG images ని వెంటనే PDF గా మార్చండి.", ml: "JPG images ഉടൻ PDF ആക്കൂ.", kn: "JPG images ಅನ್ನು ತಕ್ಷಣ PDF ಗೆ ಬದಲಾಯಿಸಿ.", bn: "JPG images কে তাৎক্ষণিক PDF এ রূপান্তর করুন।", mr: "JPG images ला लगेच PDF मध्ये बदला.", gu: "JPG images ને તરત PDF માં બદલો.", pa: "JPG images ਨੂੰ ਤੁਰੰਤ PDF ਵਿੱਚ ਬਦਲੋ।" },
  "png-to-pdf": { en: "Convert PNG images to PDF format free.", ta: "PNG images ஐ இலவசமாக PDF ஆக மாற்று.", hi: "PNG images को मुफ्त में PDF में बदलें।", te: "PNG images ని ఉచితంగా PDF గా మార్చండి.", ml: "PNG images സൗജന്യമായി PDF ആക്കൂ.", kn: "PNG images ಅನ್ನು ಉಚಿತವಾಗಿ PDF ಗೆ ಬದಲಾಯಿಸಿ.", bn: "PNG images কে বিনামূল্যে PDF এ রূপান্তর করুন।", mr: "PNG images ला मोफत PDF मध्ये बदला.", gu: "PNG images ને મફત PDF માં બદલો.", pa: "PNG images ਨੂੰ ਮੁਫ਼ਤ PDF ਵਿੱਚ ਬਦਲੋ।" },
  "pdf-to-ppt": { en: "Convert PDF to PowerPoint presentations easily.", ta: "PDF ஐ எளிதாக PowerPoint ஆக மாற்று.", hi: "PDF को आसानी से PowerPoint में बदलें।", te: "PDF ని సులభంగా PowerPoint గా మార్చండి.", ml: "PDF എളുപ்பത്തിൽ PowerPoint ആക്കൂ.", kn: "PDF ಅನ್ನು ಸುಲಭವಾಗಿ PowerPoint ಗೆ ಬದಲಾಯಿಸಿ.", bn: "PDF কে সহজে PowerPoint এ রূপান্তর করুন।", mr: "PDF ला सहजपणे PowerPoint मध्ये बदला.", gu: "PDF ને સરળતાથી PowerPoint માં બદલો.", pa: "PDF ਨੂੰ ਆਸਾਨੀ ਨਾਲ PowerPoint ਵਿੱਚ ਬਦਲੋ।" },
  "ppt-to-pdf": { en: "Convert PowerPoint presentations to PDF online.", ta: "PowerPoint ஐ online-ல் PDF ஆக மாற்று.", hi: "PowerPoint को online PDF में बदलें।", te: "PowerPoint ని online PDF గా మార్చండి.", ml: "PowerPoint online PDF ആക്കൂ.", kn: "PowerPoint ಅನ್ನು online PDF ಗೆ ಬದಲಾಯಿಸಿ.", bn: "PowerPoint কে online PDF এ রূপান্তর করুন।", mr: "PowerPoint ला online PDF मध्ये बदला.", gu: "PowerPoint ને online PDF માં બદલો.", pa: "PowerPoint ਨੂੰ online PDF ਵਿੱਚ ਬਦਲੋ।" },
  "merge-pdf": { en: "Combine multiple PDF files into one document.", ta: "பல PDF files ஐ ஒரு document-ஆக இணை.", hi: "कई PDF files को एक document में जोड़ें।", te: "అనేక PDF files ని ఒక document గా కలపండి.", ml: "പല PDF files ഒന്നിൽ ചേർക്കൂ.", kn: "ಅನೇಕ PDF files ಅನ್ನು ಒಂದು document ಆಗಿ ಸೇರಿಸಿ.", bn: "একাধিক PDF files কে একটি document এ মিলান।", mr: "अनेक PDF files एका document मध्ये जोडा.", gu: "ઘણી PDF files ને એક document માં ભેગી કરો.", pa: "ਕਈ PDF files ਨੂੰ ਇੱਕ document ਵਿੱਚ ਜੋੜੋ।" },
  "compress-pdf": { en: "Reduce PDF file size without losing quality.", ta: "தரம் இழக்காமல் PDF size குறை.", hi: "बिना quality खोए PDF size कम करें।", te: "నాణ్యత కోల్పోకుండా PDF size తగ్గించండి.", ml: "ഗുണനിലവാരം നഷ്ടപ്പെടാതെ PDF size കുറക്കൂ.", kn: "ಗುಣಮಟ್ಟ ಕಳೆದುಕೊಳ್ಳದೆ PDF size ಕಡಿಮೆ ಮಾಡಿ.", bn: "মান না হারিয়ে PDF size কমান।", mr: "दर्जा न गमावता PDF size कमी करा.", gu: "ગુણવત્તા ગુમાવ્યા વિના PDF size ઘટાડો.", pa: "ਗੁਣਵੱਤਾ ਗੁਆਏ ਬਿਨਾਂ PDF size ਘਟਾਓ।" },
  "split-pdf": { en: "Split PDF into multiple separate files.", ta: "PDF ஐ பல தனி files ஆக பிரி.", hi: "PDF को कई अलग files में विभाजित करें।", te: "PDF ని అనేక వేర్వేరు files గా విభజించండి.", ml: "PDF പല ഫയലുകളായി വിഭജിക്കൂ.", kn: "PDF ಅನ್ನು ಅನೇಕ ಪ್ರತ್ಯೇಕ files ಆಗಿ ವಿಭಜಿಸಿ.", bn: "PDF কে একাধিক আলাদা files এ ভাগ করুন।", mr: "PDF ला अनेक वेगळ्या files मध्ये विभाजित करा.", gu: "PDF ને ઘણી અલગ files માં વિભાજित કરો.", pa: "PDF ਨੂੰ ਕਈ ਵੱਖਰੀਆਂ files ਵਿੱਚ ਵੰਡੋ।" },
  "rotate-pdf": { en: "Rotate PDF pages to any angle easily.", ta: "PDF pages ஐ எந்த angle-லும் திரும்பு.", hi: "PDF pages को किसी भी angle में घुमाएं।", te: "PDF pages ని ఏ కోణంలోనైనా తిప్పండి.", ml: "PDF pages ഏത് കോണിലും തിരിക്കൂ.", kn: "PDF pages ಅನ್ನು ಯಾವ ಕೋನಕ್ಕೂ ತಿರುಗಿಸಿ.", bn: "PDF pages কে যেকোনো angle এ ঘোরান।", mr: "PDF pages कोणत्याही angle मध्ये फिरवा.", gu: "PDF pages ને કોઈ પણ angle પર ફેરવો.", pa: "PDF pages ਨੂੰ ਕਿਸੇ ਵੀ angle ਵਿੱਚ ਘੁਮਾਓ।" },
  "protect-pdf": { en: "Add password protection to secure your PDF.", ta: "உங்கள் PDF-க்கு password பாதுகாப்பு சேர்.", hi: "अपने PDF को password से सुरक्षित करें।", te: "మీ PDF కి password రక్షణ జోడించండి.", ml: "നിങ്ങളുടെ PDF-ന് password സംരക്ഷണം ചേർക്കൂ.", kn: "ನಿಮ್ಮ PDF ಗೆ password ರಕ್ಷಣೆ ಸೇರಿಸಿ.", bn: "আপনার PDF কে password দিয়ে সুরক্ষিত করুন।", mr: "तुमच्या PDF ला password संरक्षण द्या.", gu: "તમારા PDF ને password સુરક્ષા આપો.", pa: "ਆਪਣੇ PDF ਨੂੰ password ਨਾਲ ਸੁਰੱਖਿਅਤ ਕਰੋ।" },
  "unlock-pdf": { en: "Remove password from protected PDF files.", ta: "பாதுகாக்கப்பட்ட PDF-ல் இருந்து password நீக்கு.", hi: "Protected PDF से password हटाएं।", te: "Protected PDF నుండి password తొలగించండి.", ml: "Protected PDF-ൽ നിന്ന് password നീക്കൂ.", kn: "Protected PDF ನಿಂದ password ತೆಗೆಯಿರಿ.", bn: "Protected PDF থেকে password সরান।", mr: "Protected PDF मधून password काढा.", gu: "Protected PDF માંથી password દૂર કરો.", pa: "Protected PDF ਤੋਂ password ਹਟਾਓ।" },
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
 
declare global {
  interface Window { adsbygoogle: any[]; }
}
 
function AdBanner({ t }: { t: any }) {
  useEffect(() => {
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
  }, []);
  return (
    <div style={{ margin: "16px 0", textAlign: "center" }}>
      <p style={{ fontSize: "11px", color: "#aaa", margin: "0 0 4px" }}>{t.advertisement}</p>
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
    const savedLang = localStorage.getItem("lang") || "en";
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
 
  const changeLang = (l: string) => {
    setLang(l);
    localStorage.setItem("lang", l);
  };
 
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
      await supabase.from("user_usage").insert({ user_id: userId, conversion_count: 0, last_reset: today });
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
    if (!file || !selectedTool) { setStatus(t.selectFile); return; }
 
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
    setStatus(t.converting);
 
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
        setStatus(`✅ (${newCount}/${FREE_LIMIT})`);
      } else {
        setStatus(`✅ (${guestCount}/${GUEST_LIMIT})`);
      }
      setShowAd(true);
    } catch (err) {
      setStatus("❌ Failed. Try again!");
    } finally {
      setLoading(false);
    }
  };
 
  if (showPage === "privacy") {
    return (
      <div style={{ minHeight: "100vh", background: "#f5f7fa", padding: "32px", fontFamily: "'Segoe UI', sans-serif" }}>
        <button onClick={() => setShowPage(null)} style={{ background: "#7B2FBE", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", marginBottom: "24px" }}>← Back</button>
        <h1 style={{ color: "#7B2FBE" }}>{t.privacy}</h1>
        <p>Your uploaded files are deleted immediately after conversion. We never store any files.</p>
        <p>We collect only your email via Google Login to track conversion count.</p>
        <p>Email: umashri414@gmail.com</p>
      </div>
    );
  }
 
  if (showPage === "terms") {
    return (
      <div style={{ minHeight: "100vh", background: "#f5f7fa", padding: "32px", fontFamily: "'Segoe UI', sans-serif" }}>
        <button onClick={() => setShowPage(null)} style={{ background: "#7B2FBE", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", marginBottom: "24px" }}>← Back</button>
        <h1 style={{ color: "#7B2FBE" }}>{t.terms}</h1>
        <p>Free users: 15 conversions per day. Guest users: 3 conversions free.</p>
        <p>Uploaded files are deleted immediately after conversion.</p>
      </div>
    );
  }
 
  if (showPage === "about") {
    return (
      <div style={{ minHeight: "100vh", background: "#f5f7fa", padding: "32px", fontFamily: "'Segoe UI', sans-serif" }}>
        <button onClick={() => setShowPage(null)} style={{ background: "#7B2FBE", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", marginBottom: "24px" }}>← Back</button>
        <h1 style={{ color: "#7B2FBE" }}>{t.about}</h1>
        <p>WinFreePDF is a free, fast, and secure PDF converter tool supporting all Indian languages.</p>
        <p>Email: umashri414@gmail.com</p>
      </div>
    );
  }
 
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
            <select value={lang} onChange={(e) => changeLang(e.target.value)}
              style={{ padding: "6px 10px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "13px", cursor: "pointer" }}>
              {Object.entries(languageNames).map(([code, name]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
            {user ? (
              <>
                <span style={{ fontSize: "13px", color: "#666" }}>{usageCount}/{FREE_LIMIT}</span>
                <button onClick={handleLogout} style={{ background: "#eee", border: "none", borderRadius: "8px", padding: "8px 16px", cursor: "pointer" }}>{t.logout}</button>
              </>
            ) : (
              <button onClick={handleGoogleLogin} style={{ background: "#7B2FBE", color: "#fff", border: "none", borderRadius: "8px", padding: "8px 16px", cursor: "pointer", fontWeight: "600" }}>{t.login}</button>
            )}
          </div>
        </header>
 
        <div style={{ maxWidth: "700px", margin: "48px auto", padding: "0 16px" }}>
          <AdBanner t={t} />
          <div onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onClick={() => fileRef.current?.click()}
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
 
          {status && (
            <div style={{ marginTop: "16px", padding: "16px", background: "#fff", borderRadius: "12px", textAlign: "center", fontSize: "16px", border: "1px solid #eee" }}>
              {status}
            </div>
          )}
          {showAd && <AdBanner t={t} />}
        </div>
 
        {showLoginPopup && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
            <div style={{ background: "#fff", borderRadius: "20px", padding: "40px", maxWidth: "400px", textAlign: "center" }}>
              <div style={{ fontSize: "48px" }}>💜</div>
              <h2 style={{ color: "#7B2FBE" }}>Free Limit Reached!</h2>
              <p>{t.guestMsg}</p>
              <button onClick={() => { setShowLoginPopup(false); handleGoogleLogin(); }}
                style={{ background: "#7B2FBE", color: "#fff", border: "none", borderRadius: "10px", padding: "12px 32px", cursor: "pointer", fontWeight: "700", width: "100%", marginBottom: "12px" }}>
                {t.loginBtn}
              </button>
              <button onClick={() => setShowLoginPopup(false)}
                style={{ background: "#eee", border: "none", borderRadius: "10px", padding: "10px 32px", cursor: "pointer", width: "100%" }}>
                {t.cancel}
              </button>
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
          <select value={lang} onChange={(e) => changeLang(e.target.value)}
            style={{ padding: "6px 10px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "13px", cursor: "pointer" }}>
            {Object.entries(languageNames).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
          {user ? (
            <>
              <span style={{ fontSize: "13px", color: "#666" }}>👤 {user.email?.split("@")[0]} | {usageCount}/{FREE_LIMIT}</span>
              <button onClick={handleLogout} style={{ background: "#eee", border: "none", borderRadius: "8px", padding: "8px 16px", cursor: "pointer" }}>{t.logout}</button>
            </>
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
