"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Settings, FileText, Briefcase, Users, LogOut, ImageIcon, Info } from "lucide-react"
import { logout } from "@/lib/auth-utils"

export default function AdminSidebar({ className }: { className?: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/admin")
  }

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/admin/dashboard",
    },
    {
      title: "Hizmetler",
      icon: <Briefcase className="h-5 w-5" />,
      href: "/admin/services",
    },
    {
      title: "Projeler",
      icon: <FileText className="h-5 w-5" />,
      href: "/admin/projects",
    },
    {
      title: "Hakkımızda",
      icon: <Info className="h-5 w-5" />,
      href: "/admin/about",
    },
    {
      title: "Medya",
      icon: <ImageIcon className="h-5 w-5" />,
      href: "/admin/media",
    },
    {
      title: "Kullanıcılar",
      icon: <Users className="h-5 w-5" />,
      href: "/admin/users",
    },
    {
      title: "Ayarlar",
      icon: <Settings className="h-5 w-5" />,
      href: "/admin/settings",
    },
  ]

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <div className={cn("pb-12 w-64 border-r", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Yönetim Paneli</h2>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.href}
                variant={isActive(item.href) ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link href={item.href}>
                  {item.icon}
                  <span className="ml-2">{item.title}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Hesap</h2>
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Çıkış Yap
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
