import Bottombar from "@/components/shared/Bottombar"
import LeftSidebar from "@/components/shared/LeftSidebar"
import RightSidebar from "@/components/shared/RightSidebar"
import Topbar from "@/components/shared/Topbar"
import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import { dark } from '@clerk/themes'
import '../globals.css'
import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Postly",
  description: "By Kaushalendra (marcus-coder)",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Postly",
  },
  themeColor: "#877EFF",
}

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-title" content="Postly" />
          <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
          <meta name="theme-color" content="#877EFF" />
        </head>
        <body className={`${inter.className}`}>
          <Topbar />
          <main className="flex">
            <LeftSidebar />
            <section className="main-container">
              <div className="w-full max-w-4xl">
                {children}
              </div>
            </section>
            <RightSidebar />
          </main>
          <Bottombar />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}