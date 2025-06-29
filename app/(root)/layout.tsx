import Bottombar from "@/components/shared/Bottombar"
import LeftSidebar from "@/components/shared/LeftSidebar"
import RightSidebar from "@/components/shared/RightSidebar"
import Topbar from "@/components/shared/Topbar"
import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import { dark } from '@clerk/themes'
import '../globals.css'
import { Analytics } from "@vercel/analytics/next"
export const metadata = {
  title: "Postly",
  description: "By Kaushalendra (marcus-coder)"
}
const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark,
    }}>
      <html lang="en">
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