import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projeler | Abdioğlu Group A.Ş.",
  description: "Abdioğlu Group A.Ş. tarafından tamamlanan ve devam eden projeler.",
}

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
