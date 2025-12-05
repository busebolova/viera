import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import ClientLayout from "./client-layout"

// Next.js metadata
export const metadata: Metadata = {
  title: "Alkan Yapı & Viera",
  description: "Alkan Yapı ve Viera ortaklığıyla modern projeler ve inşaat çözümleri",
}

// ✅ Build’in çökmesini engelleyen kritik ayarlar
export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
