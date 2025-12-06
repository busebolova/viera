"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Wrench, Building2, Phone, Info } from "lucide-react"

const NAV_ITEMS = [
  { href: "/", icon: Home, label: "Ana Sayfa" },
  { href: "/hizmetlerimiz", icon: Wrench, label: "Hizmetler" },
  { href: "/projeler", icon: Building2, label: "Projeler" },
  { href: "/hakkimizda", icon: Info, label: "Hakkımızda" },
  { href: "/iletisim", icon: Phone, label: "İletişim" },
]

export function MobileBottomNav() {
  const pathname = usePathname()

  // Admin sayfalarında gösterme
  if (pathname.startsWith("/admin")) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] md:hidden">
      {/* Background with blur */}
      <div className="absolute inset-0 bg-background border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.1)]" />
      
      {/* Navigation */}
      <nav className="relative flex items-center justify-around h-16 px-1 safe-area-bottom">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-all ${
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground active:scale-95"
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-colors ${isActive ? "bg-primary/10" : ""}`}>
                <item.icon className={`h-5 w-5 ${isActive ? "stroke-[2.5]" : ""}`} />
              </div>
              <span className={`text-[10px] ${isActive ? "font-semibold" : "font-medium"}`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
