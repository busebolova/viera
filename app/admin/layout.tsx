import type { ReactNode } from "react"
import { cookies } from "next/headers"
import AdminLayoutClient from "./admin-layout-client"

export const metadata = {
  title: "Yönetim Paneli | VIERA",
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies()
  const isLoggedIn = cookieStore.get("viera_admin")?.value === "1"

  return <AdminLayoutClient isLoggedIn={isLoggedIn}>{children}</AdminLayoutClient>
}
