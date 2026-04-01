
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
  keywords: "pdf to word, pdf converter, free pdf, pdf to jpg, pdf to excel",
  openGraph: {
    title: "WinFreePDF - Free PDF Converter",
    description: "Convert PDF files free online. 15+ tools available!",
    url: "https://winfreepdf.vercel.app",
    siteName: "WinFreePDF",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ta">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#e53935" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
