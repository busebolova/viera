"use client"

import { Suspense, useEffect, useState, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import {
  Home,
  Info,
  Wrench,
  Phone,
  FolderOpen,
  Save,
  LogOut,
  RefreshCw,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

type Slug = "home" | "about" | "contact" | "services" | "projects"

interface Project {
  id: string
  title: string
  description: string
  fullDescription?: string
  details: string
  year: string
  status?: string
  location?: string
  area?: string
  image: string
  features?: string[]
}

interface ProjectsData {
  completed: Project[]
  ongoing: Project[]
  upcoming: Project[]
}

interface FieldConfig {
  key: string
  label: string
  type: "text" | "textarea" | "number" | "image"
  placeholder?: string
}

interface SectionConfig {
  slug: Slug
  label: string
  icon: typeof Home
  color: string
  fields: FieldConfig[]
}

const SECTIONS: SectionConfig[] = [
  {
    slug: "home",
    label: "Anasayfa",
    icon: Home,
    color: "#3b82f6",
    fields: [
      { key: "video.url", label: "Video URL", type: "text", placeholder: "https://cdn.pixabay.com/video/..." },
      { key: "video.title", label: "Video Başlık", type: "text", placeholder: "ALKAN YAPI" },
      { key: "video.subtitle", label: "Video Alt Başlık", type: "text", placeholder: "& VIERA" },
      { key: "experience.title", label: "Tecrübe Başlık", type: "text", placeholder: "60+ Yıllık Tecrübe" },
      { key: "experience.description", label: "Tecrübe Açıklama", type: "textarea", placeholder: "Tecrübe açıklaması" },
      { key: "about.badge", label: "Hakkımızda Badge", type: "text", placeholder: "Hakkımızda" },
      { key: "about.title", label: "Hakkımızda Başlık", type: "text", placeholder: "Firma Geçmişimiz" },
      { key: "about.description", label: "Hakkımızda Açıklama", type: "textarea", placeholder: "Firma açıklaması" },
      { key: "about.image", label: "Hakkımızda Görsel", type: "image", placeholder: "/project-1.png" },
    ],
  },
  {
    slug: "about",
    label: "Hakkımızda",
    icon: Info,
    color: "#10b981",
    fields: [
      { key: "title", label: "Sayfa Başlığı", type: "text", placeholder: "Hakkımızda" },
      { key: "description", label: "Ana Açıklama", type: "textarea", placeholder: "Firma hakkında açıklama" },
      { key: "heroImage", label: "Hero Görseli", type: "image", placeholder: "/project-1.png" },
      { key: "founder.name", label: "Kurucu Adı", type: "text", placeholder: "Servet Alkan" },
      { key: "founder.role", label: "Kurucu Ünvanı", type: "text", placeholder: "Kurucu" },
      { key: "founder.bio", label: "Kurucu Biyografi", type: "textarea", placeholder: "Kurucu hakkında" },
      { key: "mission", label: "Misyon", type: "textarea", placeholder: "Misyonumuz" },
      { key: "vision", label: "Vizyon", type: "textarea", placeholder: "Vizyonumuz" },
    ],
  },
  {
    slug: "services",
    label: "Hizmetlerimiz",
    icon: Wrench,
    color: "#f59e0b",
    fields: [
      { key: "pageTitle", label: "Sayfa Başlığı", type: "text", placeholder: "Hizmetlerimiz" },
      { key: "pageDescription", label: "Sayfa Açıklaması", type: "textarea", placeholder: "Hizmetler hakkında" },
      { key: "heroImage", label: "Hero Görseli", type: "image", placeholder: "/project-1.png" },
      { key: "service1.title", label: "Hizmet 1 - Başlık", type: "text", placeholder: "Konut Projeleri" },
      {
        key: "service1.description",
        label: "Hizmet 1 - Açıklama",
        type: "textarea",
        placeholder: "Konut projeleri açıklaması",
      },
      { key: "service1.image", label: "Hizmet 1 - Görsel", type: "image", placeholder: "/project-1.png" },
      { key: "service2.title", label: "Hizmet 2 - Başlık", type: "text", placeholder: "Ticari Projeler" },
      {
        key: "service2.description",
        label: "Hizmet 2 - Açıklama",
        type: "textarea",
        placeholder: "Ticari projeler açıklaması",
      },
      { key: "service2.image", label: "Hizmet 2 - Görsel", type: "image", placeholder: "/project-2.png" },
      { key: "service3.title", label: "Hizmet 3 - Başlık", type: "text", placeholder: "Karma Projeler" },
      {
        key: "service3.description",
        label: "Hizmet 3 - Açıklama",
        type: "textarea",
        placeholder: "Karma projeler açıklaması",
      },
      { key: "service3.image", label: "Hizmet 3 - Görsel", type: "image", placeholder: "/project-3.png" },
    ],
  },
  {
    slug: "projects",
    label: "Projeler",
    icon: FolderOpen,
    color: "#8b5cf6",
    fields: [],
  },
  {
    slug: "contact",
    label: "İletişim",
    icon: Phone,
    color: "#ef4444",
    fields: [
      { key: "pageTitle", label: "Sayfa Başlığı", type: "text", placeholder: "İletişim" },
      { key: "pageDescription", label: "Sayfa Açıklaması", type: "textarea", placeholder: "Bize ulaşın" },
      { key: "heroImage", label: "Sayfa Görseli", type: "image", placeholder: "/project-1.png" },
      { key: "phone", label: "Telefon", type: "text", placeholder: "0216 391 49 40" },
      { key: "mobile", label: "Cep Telefonu", type: "text", placeholder: "0533 479 83 87" },
      { key: "fax", label: "Fax", type: "text", placeholder: "0216 310 90 74" },
      { key: "email", label: "E-posta", type: "text", placeholder: "info@viera.com.tr" },
      { key: "address", label: "Adres", type: "textarea", placeholder: "Firma adresi" },
      { key: "authorized", label: "Yetkili Kişi", type: "text", placeholder: "Erdem Alkan" },
      { key: "whatsapp", label: "WhatsApp Numarası", type: "text", placeholder: "905334798387" },
    ],
  },
]

// Nested değerleri almak için yardımcı fonksiyon
function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split(".")
  let value: unknown = obj
  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = (value as Record<string, unknown>)[key]
    } else {
      return ""
    }
  }
  return typeof value === "string" ? value : ""
}

// Nested değerleri set etmek için yardımcı fonksiyon
function setNestedValue(obj: Record<string, unknown>, path: string, value: string): Record<string, unknown> {
  const keys = path.split(".")
  const result = { ...obj }
  let current: Record<string, unknown> = result

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (!(key in current) || typeof current[key] !== "object") {
      current[key] = {}
    } else {
      current[key] = { ...(current[key] as Record<string, unknown>) }
    }
    current = current[key] as Record<string, unknown>
  }

  current[keys[keys.length - 1]] = value
  return result
}

function AdminContentInner() {
  const searchParams = useSearchParams()
  const initialSection = (searchParams.get("section") as Slug) || "home"

  const [slug, setSlug] = useState<Slug>(initialSection)
  const [formData, setFormData] = useState<Record<string, unknown>>({})
  const [projectsData, setProjectsData] = useState<ProjectsData>({ completed: [], ongoing: [], upcoming: [] })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set())
  const router = useRouter()

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    setMessage(null)
    try {
      const res = await fetch(`/api/admin/content/${slug}`)
      if (res.status === 401) {
        router.push("/admin/login")
        return
      }
      if (!res.ok) {
        throw new Error("Yüklenemedi")
      }
      const json = await res.json()
      if (slug === "projects") {
        setProjectsData(json.data || { completed: [], ongoing: [], upcoming: [] })
      } else {
        setFormData(json.data || {})
      }
    } catch {
      setError("İçerik yüklenemedi.")
      if (slug === "projects") {
        setProjectsData({ completed: [], ongoing: [], upcoming: [] })
      } else {
        setFormData({})
      }
    } finally {
      setLoading(false)
    }
  }, [slug, router])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleFieldChange = (key: string, value: string) => {
    setFormData((prev) => setNestedValue(prev as Record<string, unknown>, key, value))
  }

  const handleProjectChange = (category: keyof ProjectsData, index: number, field: string, value: string) => {
    setProjectsData((prev) => {
      const newData = { ...prev }
      const projects = [...newData[category]]
      projects[index] = { ...projects[index], [field]: value }
      newData[category] = projects
      return newData
    })
  }

  const handleAddProject = (category: keyof ProjectsData) => {
    const newProject: Project = {
      id: `new-project-${Date.now()}`,
      title: "Yeni Proje",
      description: "Proje açıklaması",
      details: "Detaylar",
      year: new Date().getFullYear().toString(),
      image: "/project-1.png",
      features: [],
    }
    setProjectsData((prev) => ({
      ...prev,
      [category]: [...prev[category], newProject],
    }))
  }

  const handleDeleteProject = (category: keyof ProjectsData, index: number) => {
    if (confirm("Bu projeyi silmek istediğinize emin misiniz?")) {
      setProjectsData((prev) => ({
        ...prev,
        [category]: prev[category].filter((_, i) => i !== index),
      }))
    }
  }

  const toggleProjectExpand = (projectId: string) => {
    setExpandedProjects((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(projectId)) {
        newSet.delete(projectId)
      } else {
        newSet.add(projectId)
      }
      return newSet
    })
  }

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    setMessage(null)
    try {
      const dataToSave = slug === "projects" ? projectsData : formData
      const res = await fetch(`/api/admin/content/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSave),
      })

      if (res.status === 401) {
        router.push("/admin/login")
        return
      }

      if (!res.ok) throw new Error()

      setMessage("Kaydedildi! GitHub'a yüklendi.")
    } catch {
      setError("Kaydederken hata oluştu.")
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  const currentSection = SECTIONS.find((s) => s.slug === slug)

  const renderProjectEditor = () => {
    const categories: { key: keyof ProjectsData; label: string; color: string }[] = [
      { key: "completed", label: "Tamamlanan Projeler", color: "#10b981" },
      { key: "ongoing", label: "Devam Eden Projeler", color: "#3b82f6" },
      { key: "upcoming", label: "Yeni Başlayacak Projeler", color: "#f59e0b" },
    ]

    return (
      <div className="space-y-8">
        {categories.map(({ key, label, color }) => {
          const projects = projectsData?.[key] || []

          return (
            <div key={key} className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold" style={{ color }}>
                  {label}
                </h3>
                <button
                  onClick={() => handleAddProject(key)}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 text-sm border border-zinc-700 hover:bg-zinc-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Proje Ekle
                </button>
              </div>

              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={project.id} className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
                    <div
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-800/50"
                      onClick={() => toggleProjectExpand(project.id)}
                    >
                      <div className="flex items-center gap-4">
                        {project.image && (
                          <div className="w-16 h-12 rounded overflow-hidden bg-zinc-800 flex-shrink-0">
                            <Image
                              src={project.image || "/placeholder.svg"}
                              alt={project.title}
                              width={64}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <h4 className="font-medium">{project.title}</h4>
                          <p className="text-sm text-zinc-400">
                            {project.year} • {project.details}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteProject(key, index)
                          }}
                          className="p-2 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        {expandedProjects.has(project.id) ? (
                          <ChevronUp className="w-5 h-5 text-zinc-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-zinc-400" />
                        )}
                      </div>
                    </div>

                    {expandedProjects.has(project.id) && (
                      <div className="p-4 pt-0 border-t border-zinc-800 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-zinc-400 mb-1">Proje ID (URL için)</label>
                            <input
                              type="text"
                              value={project.id}
                              onChange={(e) => handleProjectChange(key, index, "id", e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-zinc-400 mb-1">Proje Adı</label>
                            <input
                              type="text"
                              value={project.title}
                              onChange={(e) => handleProjectChange(key, index, "title", e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-zinc-400 mb-1">Yıl</label>
                            <input
                              type="text"
                              value={project.year}
                              onChange={(e) => handleProjectChange(key, index, "year", e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-zinc-400 mb-1">Detaylar (ör: 56 Daire)</label>
                            <input
                              type="text"
                              value={project.details}
                              onChange={(e) => handleProjectChange(key, index, "details", e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-zinc-400 mb-1">Konum</label>
                            <input
                              type="text"
                              value={project.location || ""}
                              onChange={(e) => handleProjectChange(key, index, "location", e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm"
                              placeholder="Üsküdar, İstanbul"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-zinc-400 mb-1">Alan (m²)</label>
                            <input
                              type="text"
                              value={project.area || ""}
                              onChange={(e) => handleProjectChange(key, index, "area", e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm"
                              placeholder="5,000 m²"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm text-zinc-400 mb-1">Durum</label>
                            <input
                              type="text"
                              value={project.status || ""}
                              onChange={(e) => handleProjectChange(key, index, "status", e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm"
                              placeholder="Eylül 2024 teslim edilmiştir"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm text-zinc-400 mb-1">Kısa Açıklama</label>
                            <textarea
                              value={project.description}
                              onChange={(e) => handleProjectChange(key, index, "description", e.target.value)}
                              rows={2}
                              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm resize-none"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm text-zinc-400 mb-1">Detaylı Açıklama</label>
                            <textarea
                              value={project.fullDescription || ""}
                              onChange={(e) => handleProjectChange(key, index, "fullDescription", e.target.value)}
                              rows={3}
                              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm resize-none"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm text-zinc-400 mb-1">Görsel URL</label>
                            <div className="flex gap-3">
                              <input
                                type="text"
                                value={project.image}
                                onChange={(e) => handleProjectChange(key, index, "image", e.target.value)}
                                className="flex-1 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm"
                                placeholder="/project-1.png"
                              />
                              {project.image && (
                                <div className="w-20 h-12 rounded overflow-hidden bg-zinc-800 flex-shrink-0">
                                  <Image
                                    src={project.image || "/placeholder.svg"}
                                    alt="Preview"
                                    width={80}
                                    height={48}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {projects.length === 0 && (
                  <p className="text-zinc-500 text-sm text-center py-4">Bu kategoride proje bulunmuyor.</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3">
              {currentSection && (
                <span
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${currentSection.color}20` }}
                >
                  <currentSection.icon className="w-5 h-5" style={{ color: currentSection.color }} />
                </span>
              )}
              {currentSection?.label || "İçerik"} Yönetimi
            </h1>
            <p className="text-zinc-400 text-sm mt-1">Alanları düzenleyin ve GitHub&apos;a kaydedin.</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={loadData}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 text-sm border border-zinc-700 hover:bg-zinc-700 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Yenile
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 text-sm border border-zinc-700 hover:bg-zinc-700 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Çıkış
            </button>
          </div>
        </div>

        {/* Section tabs */}
        <div className="flex gap-2 flex-wrap border-b border-zinc-800 pb-4 mb-8">
          {SECTIONS.map((section) => {
            const Icon = section.icon
            const isActive = slug === section.slug
            return (
              <button
                key={section.slug}
                onClick={() => setSlug(section.slug)}
                className="px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-all"
                style={{
                  backgroundColor: isActive ? section.color : "#18181b",
                  color: isActive ? "#fff" : "#a1a1aa",
                  border: isActive ? "none" : "1px solid #27272a",
                }}
              >
                <Icon className="w-4 h-4" />
                {section.label}
              </button>
            )
          })}
        </div>

        {/* Form Fields */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-8 h-8 animate-spin text-zinc-500" />
          </div>
        ) : slug === "projects" ? (
          renderProjectEditor()
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {currentSection?.fields.map((field) => (
              <div
                key={field.key}
                className={field.type === "textarea" || field.type === "image" ? "md:col-span-2" : ""}
              >
                <label className="block text-sm font-medium text-zinc-300 mb-2">{field.label}</label>
                {field.type === "textarea" ? (
                  <textarea
                    value={getNestedValue(formData as Record<string, unknown>, field.key)}
                    onChange={(e) => handleFieldChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                ) : field.type === "image" ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={getNestedValue(formData as Record<string, unknown>, field.key)}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {getNestedValue(formData as Record<string, unknown>, field.key) && (
                      <div className="relative w-full max-w-md h-48 rounded-lg overflow-hidden bg-zinc-800">
                        <Image
                          src={getNestedValue(formData as Record<string, unknown>, field.key) || "/placeholder.svg"}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <p className="text-xs text-zinc-500">
                      Görsel yolu girin (ör: /project-1.png) veya tam URL kullanın
                    </p>
                  </div>
                ) : (
                  <input
                    type={field.type}
                    value={getNestedValue(formData as Record<string, unknown>, field.key)}
                    onChange={(e) => handleFieldChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-800">
          <div>
            {error && <span className="text-red-400 text-sm">{error}</span>}
            {message && <span className="text-green-400 text-sm">{message}</span>}
          </div>
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="px-6 py-3 rounded-lg font-semibold text-white flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: currentSection?.color || "#3b82f6" }}
          >
            <Save className="w-4 h-4" />
            {saving ? "Kaydediliyor..." : "GitHub'a Kaydet"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminContentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
          <RefreshCw className="w-8 h-8 animate-spin text-zinc-500" />
        </div>
      }
    >
      <AdminContentInner />
    </Suspense>
  )
}
