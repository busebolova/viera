import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Home, Info, Wrench, Phone, FolderOpen } from "lucide-react"

export default async function AdminPage() {
  const cookieStore = await cookies()
  const isLoggedIn = cookieStore.get("viera_admin")?.value === "1"

  if (!isLoggedIn) {
    redirect("/admin/login")
  }

  const sections = [
    {
      href: "/admin/icerik?section=home",
      icon: Home,
      title: "Anasayfa",
      description: "Hero, hakkımızda bölümü ve istatistikleri düzenleyin",
      color: "#3b82f6",
    },
    {
      href: "/admin/icerik?section=about",
      icon: Info,
      title: "Hakkımızda",
      description: "Firma bilgileri ve geçmişi düzenleyin",
      color: "#10b981",
    },
    {
      href: "/admin/icerik?section=services",
      icon: Wrench,
      title: "Hizmetlerimiz",
      description: "Sunulan hizmetleri düzenleyin",
      color: "#f59e0b",
    },
    {
      href: "/admin/icerik?section=projects",
      icon: FolderOpen,
      title: "Projeler",
      description: "Biten, devam eden ve başlayacak projeleri düzenleyin",
      color: "#8b5cf6",
    },
    {
      href: "/admin/icerik?section=contact",
      icon: Phone,
      title: "İletişim",
      description: "İletişim bilgilerini düzenleyin",
      color: "#ef4444",
    },
  ]

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.5rem" }}>Hoş Geldiniz</h1>
        <p style={{ color: "#a1a1aa" }}>
          Alkan Yapı & VIERA yönetim paneline hoş geldiniz. Aşağıdan düzenlemek istediğiniz bölümü seçin.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <Link
              key={section.href}
              href={section.href}
              style={{
                padding: "1.5rem",
                backgroundColor: "#18181b",
                borderRadius: "0.75rem",
                border: "1px solid #27272a",
                textDecoration: "none",
                color: "inherit",
                transition: "all 0.2s",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "0.5rem",
                  backgroundColor: `${section.color}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon style={{ width: "20px", height: "20px", color: section.color }} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.25rem", color: "#fafafa" }}>
                  {section.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#a1a1aa", margin: 0 }}>{section.description}</p>
              </div>
            </Link>
          )
        })}
      </div>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <Link
          href="/"
          target="_blank"
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#27272a",
            borderRadius: "0.5rem",
            border: "1px solid #3f3f46",
            textDecoration: "none",
            color: "#fafafa",
            fontSize: "0.875rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          Siteyi Görüntüle →
        </Link>
      </div>

      <div
        style={{
          marginTop: "0.5rem",
          padding: "1rem",
          backgroundColor: "#18181b",
          borderRadius: "0.5rem",
          border: "1px solid #27272a",
        }}
      >
        <h4 style={{ fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem", color: "#fafafa" }}>
          Nasıl Çalışır?
        </h4>
        <ul
          style={{
            fontSize: "0.8rem",
            color: "#a1a1aa",
            paddingLeft: "1rem",
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
        >
          <li>Yukarıdan düzenlemek istediğiniz bölümü seçin</li>
          <li>JSON formatında içeriği düzenleyin</li>
          <li>Kaydet butonuna tıklayın - değişiklikler GitHub&apos;a kaydedilir</li>
          <li>Site otomatik olarak güncellenir</li>
        </ul>
      </div>
    </div>
  )
}
