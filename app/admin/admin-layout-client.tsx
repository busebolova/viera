"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, Home, LogOut, ExternalLink } from "lucide-react"

interface AdminLayoutClientProps {
  children: ReactNode
  isLoggedIn: boolean
}

export default function AdminLayoutClient({ children, isLoggedIn }: AdminLayoutClientProps) {
  const pathname = usePathname()

  const isLoginPage = pathname === "/admin/login"
  const showSidebar = isLoggedIn && !isLoginPage

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    window.location.href = "/admin/login"
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        backgroundColor: "#09090b",
        color: "#fafafa",
      }}
    >
      {showSidebar && (
        <aside
          style={{
            width: "16rem",
            borderRight: "1px solid #27272a",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#18181b",
          }}
        >
          <div style={{ padding: "1.5rem", borderBottom: "1px solid #27272a" }}>
            <Link
              href="/admin"
              style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fafafa", textDecoration: "none" }}
            >
              VIERA Admin
            </Link>
          </div>

          <nav style={{ flex: 1, padding: "1rem" }}>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <li>
                <Link
                  href="/admin"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem 1rem",
                    borderRadius: "0.5rem",
                    backgroundColor: pathname === "/admin" ? "#27272a" : "transparent",
                    color: pathname === "/admin" ? "#fafafa" : "#a1a1aa",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                  }}
                >
                  <Home style={{ width: "1.25rem", height: "1.25rem" }} />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/icerik"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem 1rem",
                    borderRadius: "0.5rem",
                    backgroundColor: pathname === "/admin/icerik" ? "#27272a" : "transparent",
                    color: pathname === "/admin/icerik" ? "#fafafa" : "#a1a1aa",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                  }}
                >
                  <FileText style={{ width: "1.25rem", height: "1.25rem" }} />
                  İçerik Yönetimi
                </Link>
              </li>
            </ul>
          </nav>

          <div style={{ padding: "1rem", borderTop: "1px solid #27272a" }}>
            <button
              onClick={handleLogout}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                backgroundColor: "transparent",
                color: "#a1a1aa",
                border: "none",
                cursor: "pointer",
                fontSize: "0.875rem",
              }}
            >
              <LogOut style={{ width: "1.25rem", height: "1.25rem" }} />
              Çıkış Yap
            </button>
            <Link
              href="/"
              target="_blank"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginTop: "0.5rem",
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                color: "#a1a1aa",
                textDecoration: "none",
                fontSize: "0.875rem",
              }}
            >
              <ExternalLink style={{ width: "1.25rem", height: "1.25rem" }} />
              Siteyi Görüntüle
            </Link>
          </div>
        </aside>
      )}
      <main style={{ flex: 1, padding: showSidebar ? "2rem" : 0 }}>{children}</main>
    </div>
  )
}
