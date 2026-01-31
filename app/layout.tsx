import React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
// #region agent log
// Analytics disabled for static export - incompatible with output: 'export'
// #endregion
// import { Analytics } from "@vercel/analytics/next"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: "Quippi - Anonymous Employee Feedback",
  description:
    "Your voice matters. Share your feedback anonymously and help improve your workplace.",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} h-full`}>
      <body className="h-full font-sans antialiased bg-background text-foreground">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        {/* #region agent log */}
        {/* Analytics disabled - incompatible with static export (output: 'export') */}
        {/* #endregion */}
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
