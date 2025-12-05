"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, LogOut } from "lucide-react"
import AdminSidebar from "./admin-sidebar"
import { logout } from "@/lib/auth-utils"

export default function AdminHeader() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/admin")
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <div className="md:hidden mr-2">
          <Button variant="ghost" size="icon" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
        <div className="flex-1">
          <Link href="/admin/dashboard" className="font-bold">
            Abdioğlu Group Admin
          </Link>
        </div>
        <div className="hidden md:flex">
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Çıkış Yap
          </Button>
        </div>
      </div>
      {showMobileMenu && (
        <div className="md:hidden">
          <div className="container">
            <AdminSidebar className="w-full border-none" />
          </div>
        </div>
      )}
    </header>
  )
}
