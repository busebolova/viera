"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, Menu, X, Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"

const DEFAULT_CONTACT = {
  phone: "0216 391 49 40",
  mobile: "0533 479 83 87",
  fax: "0216 310 90 74",
  authorized: "Erdem Alkan",
  address: "Altunizade Mah. Ord. Prof Fahrettin Kerim Gökay Cad. No7/8 Üsküdar- İstanbul",
  email: "info@alkanyapi.com.tr",
  whatsapp: "905334798387",
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const [contactInfo, setContactInfo] = useState(DEFAULT_CONTACT)

  useEffect(() => {
    setMounted(true)

    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768)
    }
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    fetch("/api/content/contact")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.phone) {
          setContactInfo({
            phone: data.phone || DEFAULT_CONTACT.phone,
            mobile: data.mobile || DEFAULT_CONTACT.mobile,
            fax: data.fax || DEFAULT_CONTACT.fax,
            authorized: data.authorized || DEFAULT_CONTACT.authorized,
            address: data.address || DEFAULT_CONTACT.address,
            email: data.email || DEFAULT_CONTACT.email,
            whatsapp: data.whatsapp || DEFAULT_CONTACT.whatsapp,
          })
        }
      })
      .catch(() => {})

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
    window.scrollTo(0, 0)
  }, [pathname])

  const isDark = resolvedTheme === "dark"

  const isActive = (path: string) => {
    if (!mounted) return false
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const navLinks = [
    { href: "/", label: "Anasayfa" },
    { href: "/hizmetlerimiz", label: "Hizmetlerimiz" },
    { href: "/hakkimizda", label: "Hakkımızda" },
    { href: "/projeler", label: "Projeler" },
    { href: "/iletisim", label: "İletişim" },
  ]

  const colors = {
    headerBg: isDark ? "#18181b" : "#ffffff",
    headerBorder: isDark ? "#27272a" : "#e5e7eb",
    textPrimary: isDark ? "#fafafa" : "#18181b",
    textSecondary: isDark ? "#a1a1aa" : "#52525b",
    buttonBg: isDark ? "#fafafa" : "#18181b",
    buttonText: isDark ? "#18181b" : "#ffffff",
    mobileBg: isDark ? "#18181b" : "#ffffff",
    activeItemBg: isDark ? "#27272a" : "#f4f4f5",
  }

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${contactInfo.whatsapp}?text=Merhaba, bilgi almak istiyorum.`, "_blank")
  }

  if (!mounted) {
    return (
      <>
        <div style={{ height: "80px" }} />
        <main style={{ minHeight: "100vh" }}>{children}</main>
      </>
    )
  }

  return (
    <>
      {/* Header */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          width: "100%",
          backgroundColor: colors.headerBg,
          borderBottom: `1px solid ${colors.headerBorder}`,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 1rem",
            height: "80px",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <Image
              src={isDark ? "/darklogo.png" : "/logo.png"}
              alt="VIERA Construction Logo"
              width={180}
              height={72}
              style={{ height: "56px", width: "auto" }}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          {isDesktop && (
            <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    fontSize: "14px",
                    fontWeight: isActive(item.href) ? 600 : 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: isActive(item.href) ? colors.textPrimary : colors.textSecondary,
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Desktop Actions - Removed WhatsApp button from desktop header */}
          {isDesktop && (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border: `1px solid ${colors.headerBorder}`,
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: colors.textPrimary,
                }}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  height: "40px",
                  padding: "0 16px",
                  backgroundColor: colors.buttonBg,
                  color: colors.buttonText,
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                <Phone size={16} /> {contactInfo.phone}
              </a>
            </div>
          )}

          {/* Mobile Actions */}
          {!isDesktop && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border: `1px solid ${colors.headerBorder}`,
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: colors.textPrimary,
                }}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border: `1px solid ${colors.headerBorder}`,
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: colors.textPrimary,
                }}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {!isDesktop && mobileMenuOpen && (
          <div
            style={{
              position: "absolute",
              top: "80px",
              left: 0,
              right: 0,
              backgroundColor: colors.mobileBg,
              borderBottom: `1px solid ${colors.headerBorder}`,
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              padding: "1rem",
            }}
          >
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    padding: "12px 16px",
                    fontSize: "16px",
                    fontWeight: isActive(item.href) ? 600 : 400,
                    color: isActive(item.href) ? colors.textPrimary : colors.textSecondary,
                    textDecoration: "none",
                    borderRadius: "6px",
                    backgroundColor: isActive(item.href) ? colors.activeItemBg : "transparent",
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  handleWhatsApp()
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  marginTop: "8px",
                  padding: "12px 16px",
                  backgroundColor: "#25D366",
                  color: "#ffffff",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "16px",
                }}
              >
                <svg viewBox="0 0 24 24" style={{ height: "20px", width: "20px", fill: "currentColor" }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp ile İletişim
              </button>
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  marginTop: "8px",
                  padding: "12px 16px",
                  backgroundColor: colors.buttonBg,
                  color: colors.buttonText,
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                <Phone size={18} /> {contactInfo.phone}
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Header Spacer */}
      <div style={{ height: "80px" }} aria-hidden="true" />

      {/* Main Content */}
      <main style={{ minHeight: "100vh" }}>{children}</main>

      {/* WhatsApp Floating Button - only on desktop */}
      <div className="hidden md:block">
        <WhatsAppButton />
      </div>

      {/* Mobile Bottom Navigation - Only visible on mobile */}
      <MobileBottomNav />

      {/* Footer */}
      <footer
        className="pb-20 md:pb-0"
        style={{
          width: "100%",
          borderTop: "1px solid #27272a",
          padding: "2rem 0 3rem",
          backgroundColor: "#18181b",
          color: "white",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isDesktop ? "repeat(3, 1fr)" : "1fr",
              gap: "2.5rem",
              marginBottom: "2.5rem",
            }}
          >
            {/* Logo & Description */}
            <div>
              <div style={{ marginBottom: "1.5rem" }}>
                <Image
                  src="/darklogo.png"
                  alt="VIERA Construction"
                  width={200}
                  height={80}
                  style={{ height: "auto", width: "180px" }}
                />
              </div>
              <p style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: 1.6 }}>
                Kurucumuz Servet Alkan'ın temellerini attığı firmamız, 60 yılı aşkın deneyimi ve köklü geçmişinden
                aldığı güçle konut ve iş yeri üretimine aralıksız devam etmektedir.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "1rem" }}>Hızlı Bağlantılar</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {navLinks.slice(1).map((item) => (
                  <li key={item.href} style={{ marginBottom: "8px" }}>
                    <Link href={item.href} style={{ color: "#a1a1aa", textDecoration: "none", fontSize: "14px" }}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info - Dinamik iletişim bilgileri */}
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "1rem" }}>İletişim</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#a1a1aa", fontSize: "14px" }}>
                <li style={{ marginBottom: "8px" }}>Yetkili: {contactInfo.authorized}</li>
                <li style={{ marginBottom: "8px" }}>Tel: {contactInfo.phone}</li>
                <li style={{ marginBottom: "8px" }}>Fax: {contactInfo.fax}</li>
                <li style={{ marginBottom: "8px" }}>Cep: {contactInfo.mobile}</li>
                <li>{contactInfo.address}</li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div
            style={{
              borderTop: "1px solid #27272a",
              paddingTop: "1.5rem",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <p style={{ color: "#a1a1aa", fontSize: "14px", margin: 0 }}>
              © 2025 VIERA - Alkan Yapı & Viera Ortaklığı. Tüm hakları saklıdır.
            </p>
            <p style={{ color: "#a1a1aa", fontSize: "14px", margin: 0 }}>
              Tasarım & Yazılım:{" "}
              <a
                href="https://rettocreative.net"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#d4d4d8", textDecoration: "none" }}
              >
                rettocreative.net
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
