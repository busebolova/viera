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
  GripVertical,
  Settings,
  Link as LinkIcon,
  Upload,
  X,
} from "lucide-react"
import { ImageUploader, MultiImageUploader } from "@/components/image-uploader"

type Slug = "home" | "about" | "contact" | "services" | "projects" | "settings"

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
  images?: string[]
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
  type: "text" | "textarea" | "number" | "image" | "url"
  placeholder?: string
  description?: string
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
      { key: "video.url", label: "Video URL", type: "url", placeholder: "https://cdn.pixabay.com/video/..." },
      { key: "video.title", label: "Video Başlık", type: "text", placeholder: "ALKAN YAPI" },
      { key: "video.subtitle", label: "Video Alt Başlık", type: "text", placeholder: "& VIERA" },
      { key: "experience.title", label: "Tecrübe Başlık", type: "text", placeholder: "60+ Yıllık Tecrübe" },
      { key: "experience.description", label: "Tecrübe Açıklama", type: "textarea", placeholder: "Tecrübe açıklaması" },
      { key: "about.badge", label: "Hakkımızda Badge", type: "text", placeholder: "Hakkımızda" },
      { key: "about.title", label: "Hakkımızda Başlık", type: "text", placeholder: "Firma Geçmişimiz" },
      { key: "about.description", label: "Hakkımızda Açıklama", type: "textarea", placeholder: "Firma açıklaması" },
      { key: "about.certification.title", label: "Sertifika Başlık", type: "text", placeholder: "Müteahhitlik Belgemiz" },
      { key: "about.certification.description", label: "Sertifika Açıklama", type: "text", placeholder: "D sınıfı..." },
      { key: "about.projects.title", label: "Projeler Başlık", type: "text", placeholder: "Projelerimiz" },
      { key: "about.projects.description", label: "Projeler Açıklama", type: "text", placeholder: "100'den fazla proje..." },
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
    slug: "contact",
    label: "İletişim",
    icon: Phone,
    color: "#ef4444",
    fields: [
      { key: "pageTitle", label: "Sayfa Başlığı", type: "text", placeholder: "İletişim" },
      { key: "pageDescription", label: "Sayfa Açıklaması", type: "textarea", placeholder: "Bize ulaşın" },
      { key: "heroImage", label: "Sayfa Görseli", type: "image", placeholder: "/project-1.png" },
      { key: "authorized", label: "Yetkili Kişi", type: "text", placeholder: "Erdem Alkan", description: "Header, footer ve tüm sayfalarda görünür" },
      { key: "phone", label: "Telefon", type: "text", placeholder: "0216 391 49 40", description: "Tüm site genelinde kullanılır" },
      { key: "mobile", label: "Cep Telefonu", type: "text", placeholder: "0533 479 83 87" },
      { key: "fax", label: "Fax", type: "text", placeholder: "0216 310 90 74" },
      { key: "email", label: "E-posta", type: "text", placeholder: "info@viera.com.tr" },
      { key: "address", label: "Adres", type: "textarea", placeholder: "Firma adresi", description: "Footer ve iletişim sayfasında görünür" },
      { key: "hours", label: "Çalışma Saatleri", type: "text", placeholder: "Pazartesi - Cuma: 09:00 - 18:00" },
      { key: "whatsapp", label: "WhatsApp Numarası", type: "text", placeholder: "905334798387", description: "Başında 90 olmalı, boşluk olmadan" },
    ],
  },
  {
    slug: "services",
    label: "Hizmetlerimiz",
    icon: Wrench,
    color: "#f59e0b",
    fields: [
      { key: "hero.title", label: "Hero Başlık", type: "text", placeholder: "Hizmetlerimiz" },
      { key: "hero.subtitle", label: "Hero Alt Başlık", type: "textarea", placeholder: "60+ yıllık tecrübemizle..." },
      { key: "hero.image", label: "Hero Görseli", type: "image", placeholder: "/project-1.png" },
      { key: "intro.badge", label: "Intro Badge", type: "text", placeholder: "Uzmanlık Alanlarımız" },
      { key: "intro.title", label: "Intro Başlık", type: "text", placeholder: "Sunduğumuz Hizmetler" },
      { key: "intro.description", label: "Intro Açıklama", type: "textarea", placeholder: "Hizmetler hakkında" },
      { key: "cta.title", label: "CTA Başlık", type: "text", placeholder: "Hayalinizdeki Projeyi..." },
      { key: "cta.description", label: "CTA Açıklama", type: "textarea", placeholder: "60+ yıllık tecrübemiz..." },
    ],
  },
  {
    slug: "projects",
    label: "Projeler",
    icon: FolderOpen,
    color: "#8b5cf6",
    fields: [],
  },
]

// Helper functions
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

// Project Editor Component
function ProjectEditor({
  project,
  category,
  index,
  isExpanded,
  onToggle,
  onChange,
  onDelete,
}: {
  project: Project
  category: keyof ProjectsData
  index: number
  isExpanded: boolean
  onToggle: () => void
  onChange: (field: string, value: string | string[]) => void
  onDelete: () => void
}) {
  const [features, setFeatures] = useState<string[]>(project.features || [])
  const [newFeature, setNewFeature] = useState("")

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      const updated = [...features, newFeature.trim()]
      setFeatures(updated)
      onChange("features", updated)
      setNewFeature("")
    }
  }

  const handleRemoveFeature = (idx: number) => {
    const updated = features.filter((_, i) => i !== idx)
    setFeatures(updated)
    onChange("features", updated)
  }

  const categoryColors = {
    completed: "#10b981",
    ongoing: "#3b82f6",
    upcoming: "#f59e0b",
  }

  return (
    <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-800/50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center gap-4">
          <GripVertical className="w-5 h-5 text-zinc-600" />
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
            <h4 className="font-medium text-white">{project.title || "Yeni Proje"}</h4>
            <p className="text-sm text-zinc-400">
              {project.year} • {project.details || "Detay yok"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="px-2 py-1 rounded text-xs font-medium"
            style={{ backgroundColor: `${categoryColors[category]}20`, color: categoryColors[category] }}
          >
            {category === "completed" ? "Tamamlandı" : category === "ongoing" ? "Devam Ediyor" : "Başlayacak"}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            className="p-2 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-zinc-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-zinc-400" />
          )}
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-4 pt-0 border-t border-zinc-800 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Proje ID (URL için)</label>
              <input
                type="text"
                value={project.id}
                onChange={(e) => onChange("id", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="proje-adi"
              />
              <p className="text-xs text-zinc-500 mt-1">URL: /projeler/{project.id || "proje-adi"}</p>
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Proje Adı</label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => onChange("title", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Yıl</label>
              <input
                type="text"
                value={project.year}
                onChange={(e) => onChange("year", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="2024"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Detaylar (ör: 56 Daire)</label>
              <input
                type="text"
                value={project.details}
                onChange={(e) => onChange("details", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Konum</label>
              <input
                type="text"
                value={project.location || ""}
                onChange={(e) => onChange("location", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Üsküdar, İstanbul"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Alan (m²)</label>
              <input
                type="text"
                value={project.area || ""}
                onChange={(e) => onChange("area", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="5,000 m²"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Durum Açıklaması</label>
            <input
              type="text"
              value={project.status || ""}
              onChange={(e) => onChange("status", e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Eylül 2024 teslim edilmiştir"
            />
          </div>

          {/* Descriptions */}
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Kısa Açıklama</label>
            <textarea
              value={project.description}
              onChange={(e) => onChange("description", e.target.value)}
              rows={2}
              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Proje kısa açıklaması..."
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Detaylı Açıklama</label>
            <textarea
              value={project.fullDescription || ""}
              onChange={(e) => onChange("fullDescription", e.target.value)}
              rows={4}
              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Proje hakkında detaylı bilgi..."
            />
          </div>

          {/* Main Image */}
          <div>
            <ImageUploader
              label="Ana Görsel"
              value={project.image}
              onChange={(url) => onChange("image", url)}
              placeholder="/project-1.png veya https://..."
            />
          </div>

          {/* Gallery Images */}
          <div>
            <MultiImageUploader
              label="Galeri Görselleri"
              values={project.images || []}
              onChange={(urls) => onChange("images", urls)}
              maxImages={10}
            />
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Proje Özellikleri</label>
            <div className="space-y-2">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => {
                      const updated = [...features]
                      updated[idx] = e.target.value
                      setFeatures(updated)
                      onChange("features", updated)
                    }}
                    className="flex-1 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm"
                  />
                  <button
                    onClick={() => handleRemoveFeature(idx)}
                    className="p-2 rounded-lg text-red-400 hover:bg-red-500/20"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Yeni özellik ekle..."
                  className="flex-1 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm"
                  onKeyDown={(e) => e.key === "Enter" && handleAddFeature()}
                />
                <button
                  onClick={handleAddFeature}
                  className="px-4 py-2 rounded-lg bg-zinc-700 text-white text-sm hover:bg-zinc-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
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

  const handleProjectChange = (category: keyof ProjectsData, index: number, field: string, value: string | string[]) => {
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
      id: `yeni-proje-${Date.now()}`,
      title: "Yeni Proje",
      description: "Proje açıklaması",
      details: "Detaylar",
      year: new Date().getFullYear().toString(),
      image: "/project-1.png",
      images: [],
      features: [],
    }
    setProjectsData((prev) => ({
      ...prev,
      [category]: [...prev[category], newProject],
    }))
    // Auto-expand new project
    setExpandedProjects((prev) => new Set(prev).add(newProject.id))
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

      setMessage("✓ Kaydedildi!")
      setTimeout(() => setMessage(null), 3000)
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

  // Projects Editor
  const renderProjectsEditor = () => {
    const categories: { key: keyof ProjectsData; label: string; color: string; description: string }[] = [
      { key: "completed", label: "Tamamlanan Projeler", color: "#10b981", description: "Başarıyla teslim edilen projeler" },
      { key: "ongoing", label: "Devam Eden Projeler", color: "#3b82f6", description: "Şu anda üzerinde çalışılan projeler" },
      { key: "upcoming", label: "Yeni Başlayacak Projeler", color: "#f59e0b", description: "Hazırlık aşamasındaki projeler" },
    ]

    return (
      <div className="space-y-8">
        {categories.map(({ key, label, color, description }) => {
          const projects = projectsData?.[key] || []

          return (
            <div key={key} className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                    {label}
                    <span className="text-sm font-normal text-zinc-500">({projects.length})</span>
                  </h3>
                  <p className="text-sm text-zinc-500">{description}</p>
                </div>
                <button
                  onClick={() => handleAddProject(key)}
                  className="px-4 py-2 rounded-lg text-white text-sm font-medium flex items-center gap-2 transition-colors"
                  style={{ backgroundColor: color }}
                >
                  <Plus className="w-4 h-4" />
                  Proje Ekle
                </button>
              </div>

              <div className="space-y-3">
                {projects.map((project, index) => (
                  <ProjectEditor
                    key={project.id}
                    project={project}
                    category={key}
                    index={index}
                    isExpanded={expandedProjects.has(project.id)}
                    onToggle={() => toggleProjectExpand(project.id)}
                    onChange={(field, value) => handleProjectChange(key, index, field, value)}
                    onDelete={() => handleDeleteProject(key, index)}
                  />
                ))}

                {projects.length === 0 && (
                  <div className="text-center py-8 text-zinc-500">
                    <FolderOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Bu kategoride proje bulunmuyor</p>
                    <button
                      onClick={() => handleAddProject(key)}
                      className="mt-2 text-sm underline hover:no-underline"
                      style={{ color }}
                    >
                      İlk projeyi ekle
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // Form Fields Renderer
  const renderFormFields = () => {
    if (!currentSection) return null

    return (
      <div className="space-y-6">
        {currentSection.fields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              {field.label}
              {field.description && (
                <span className="text-xs text-zinc-500 font-normal ml-2">({field.description})</span>
              )}
            </label>
            
            {field.type === "image" ? (
              <ImageUploader
                value={getNestedValue(formData as Record<string, unknown>, field.key)}
                onChange={(url) => handleFieldChange(field.key, url)}
                placeholder={field.placeholder}
              />
            ) : field.type === "textarea" ? (
              <textarea
                value={getNestedValue(formData as Record<string, unknown>, field.key)}
                onChange={(e) => handleFieldChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            ) : (
              <input
                type={field.type === "url" ? "url" : "text"}
                value={getNestedValue(formData as Record<string, unknown>, field.key)}
                onChange={(e) => handleFieldChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            )}
          </div>
        ))}
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
            <p className="text-zinc-400 text-sm mt-1">
              {slug === "contact" 
                ? "Bu bilgiler site genelinde header, footer ve tüm sayfalarda kullanılır"
                : "Alanları düzenleyin ve kaydedin"
              }
            </p>
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

        {/* Section Tabs */}
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

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-8 h-8 animate-spin text-zinc-500" />
          </div>
        ) : slug === "projects" ? (
          renderProjectsEditor()
        ) : (
          renderFormFields()
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
            {saving ? "Kaydediliyor..." : "Kaydet"}
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
