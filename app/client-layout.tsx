import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

export const metadata: Metadata = {
  title: "Alkan Yapı & Viera",
  description: "Alkan Yapı ve Viera ortaklığıyla modern projeler",
}

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
