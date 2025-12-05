
"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { isLoggedIn } from "@/lib/auth-utils"
import AdminHeader from "@/components/admin/admin-header"
import AdminSidebar from "@/components/admin/admin-sidebar"

export default function AdminLayout({ children }) {
  const [ready, setReady] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isLogin = pathname === "/admin"

  useEffect(() => {
    setReady(true)

    if (!isLogin && !isLoggedIn()) {
      router.push("/admin")
    }
  }, [isLogin, router])

  if (!ready) return null

  if (isLogin) {
    return <div className="min-h-screen bg-zinc-900 text-white">{children}</div>
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
