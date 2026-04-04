
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; 
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WinFreePDF - Free PDF Converter Online",
  description: "Free PDF to Word, PDF to JPG, PDF to Excel converter. Fast, secure, no registration needed. Convert PDF files online for free!",
  keywords: "pdf to word, pdf converter, free pdf, pdf to jpg, pdf to excel, pdf converter tamil, free pdf converter india",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  verification:{
    google: "89jeiXxg3hrgOzyNteLBDOupQy6xUUKf2qy9yvUgvlE",
  },
  openGraph: {
    title: "WinFreePDF - Free PDF Converter",
    description: "Convert PDF files free online. 15+ tools available!",
    url: "https://winfreepdf.vercel.app",
    siteName: "WinFreePDF",
    images: [{ url: "https://winfreepdf.vercel.app/icon.svg" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>  
        <meta name="google-site-verification" content="89jeiXxg3hrgOzyNteLBDOupQy6xUUKf2qy9yvUgvlE" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9157505466817734" crossOrigin="anonymous"></script>
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#7B2FBE" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}

