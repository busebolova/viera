"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle2, AlertCircle, LogOut, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ContentData {
  [key: string]: any
}

interface ContentState {
  data: ContentData
  sha: string
  loading: boolean
  saving: boolean
  error: string
  success: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("home")
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const [homeContent, setHomeContent] = useState<any>({})
  const [aboutContent, setAboutContent] = useState<any>({})
  const [contactContent, setContactContent] = useState<any>({})
  const [projects, setProjects] = useState<any>({ completed: [], ongoing: [] })
  const [passwordForm, setPasswordForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" })
  const [servicesContent, setServicesContent] = useState<any>({
    hero: {},
    intro: {},
    services: [],
    cta: {},
  })

  useEffect(() => {
    loadAllContent()
  }, [])

  const loadAllContent = async () => {
    try {
      const [homeRes, aboutRes, contactRes, projectsRes, servicesRes] = await Promise.all([
        fetch("/api/content/home"),
        fetch("/api/content/about"),
        fetch("/api/content/contact"),
        fetch("/api/content/projects"),
        fetch("/api/content/services"),
      ])

      const homeData = await homeRes.json()
      const aboutData = await aboutRes.json()
      const contactData = await contactRes.json()
      const projectsData = await projectsRes.json()
      const servicesData = await servicesRes.json()

      setHomeContent(homeData.data || {})
      setAboutContent(aboutData.data || {})
      setContactContent(contactData.data || {})
      setProjects(projectsData.data || { completed: [], ongoing: [] })
      setServicesContent(
        servicesData || {
          hero: {},
          intro: {},
          services: [],
          cta: {},
        },
      )
    } catch (error) {
      console.error("Error loading content:", error)
    }
  }

  const saveContent = async (type: string, data: any) => {
    setSaving(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch(`/api/content/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      })

      if (!response.ok) throw new Error("Kaydetme başarısız")

      setSuccess("İçerik başarıyla kaydedildi!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordChange = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("Yeni şifreler eşleşmiyor")
      return
    }

    setSaving(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("/api/content/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldPassword: passwordForm.oldPassword,
          newPassword: passwordForm.newPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error)

      setSuccess("Şifre başarıyla güncellendi!")
      setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" })
      setTimeout(() => setSuccess(""), 3000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <header className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Image src="/logo.png" alt="VIERA Logo" width={120} height={30} className="h-8 w-auto dark:hidden" />
              <Image
                src="/darklogo.png"
                alt="VIERA Logo"
                width={120}
                height={30}
                className="h-8 w-auto hidden dark:block"
              />
              <span className="text-sm text-muted-foreground">İçerik Yönetimi</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Çıkış Yap
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert className="mb-4">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="home">Ana Sayfa</TabsTrigger>
            <TabsTrigger value="about">Hakkımızda</TabsTrigger>
            <TabsTrigger value="services">Hizmetler</TabsTrigger>
            <TabsTrigger value="projects">Projeler</TabsTrigger>
            <TabsTrigger value="contact">İletişim</TabsTrigger>
            <TabsTrigger value="settings">Ayarlar</TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Video Bölümü</CardTitle>
                  <CardDescription>Ana sayfa hero video ayarları</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Video URL</Label>
                    <Input
                      value={homeContent.video?.url || ""}
                      onChange={(e) =>
                        setHomeContent({ ...homeContent, video: { ...homeContent.video, url: e.target.value } })
                      }
                      placeholder="https://cdn.pixabay.com/video/..."
                    />
                  </div>
                  <div>
                    <Label>Video Üstündeki Başlık</Label>
                    <Input
                      value={homeContent.video?.title || ""}
                      onChange={(e) =>
                        setHomeContent({ ...homeContent, video: { ...homeContent.video, title: e.target.value } })
                      }
                      placeholder="VIERA"
                    />
                  </div>
                  <div>
                    <Label>Video Üstündeki Alt Başlık (Yazı Efekti)</Label>
                    <Input
                      value={homeContent.video?.subtitle || ""}
                      onChange={(e) =>
                        setHomeContent({ ...homeContent, video: { ...homeContent.video, subtitle: e.target.value } })
                      }
                      placeholder="Alkan Yapı & Viera Ortaklığı"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>60 Yıllık Tecrübe Bölümü</CardTitle>
                  <CardDescription>Video altındaki tecrübe banner'ı</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Başlık</Label>
                    <Input
                      value={homeContent.experience?.title || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          experience: { ...homeContent.experience, title: e.target.value },
                        })
                      }
                      placeholder="60 Yılı Aşkın Tecrübe"
                    />
                  </div>
                  <div>
                    <Label>Açıklama</Label>
                    <Textarea
                      value={homeContent.experience?.description || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          experience: { ...homeContent.experience, description: e.target.value },
                        })
                      }
                      placeholder="1965'ten bu yana..."
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hakkımızda Bölümü</CardTitle>
                  <CardDescription>Ana sayfadaki hakkımızda içeriği</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Badge Metni</Label>
                    <Input
                      value={homeContent.about?.badge || ""}
                      onChange={(e) =>
                        setHomeContent({ ...homeContent, about: { ...homeContent.about, badge: e.target.value } })
                      }
                      placeholder="Hakkımızda"
                    />
                  </div>
                  <div>
                    <Label>Başlık</Label>
                    <Input
                      value={homeContent.about?.title || ""}
                      onChange={(e) =>
                        setHomeContent({ ...homeContent, about: { ...homeContent.about, title: e.target.value } })
                      }
                      placeholder="Firma Geçmişimiz"
                    />
                  </div>
                  <div>
                    <Label>Açıklama</Label>
                    <Textarea
                      rows={4}
                      value={homeContent.about?.description || ""}
                      onChange={(e) =>
                        setHomeContent({ ...homeContent, about: { ...homeContent.about, description: e.target.value } })
                      }
                    />
                  </div>
                  <div>
                    <Label>Müteahhitlik Belgesi Başlık</Label>
                    <Input
                      value={homeContent.about?.certification?.title || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          about: {
                            ...homeContent.about,
                            certification: { ...homeContent.about?.certification, title: e.target.value },
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Müteahhitlik Belgesi Açıklama</Label>
                    <Input
                      value={homeContent.about?.certification?.description || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          about: {
                            ...homeContent.about,
                            certification: { ...homeContent.about?.certification, description: e.target.value },
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Projeler Başlık</Label>
                    <Input
                      value={homeContent.about?.projects?.title || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          about: {
                            ...homeContent.about,
                            projects: { ...homeContent.about?.projects, title: e.target.value },
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Projeler Açıklama</Label>
                    <Input
                      value={homeContent.about?.projects?.description || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          about: {
                            ...homeContent.about,
                            projects: { ...homeContent.about?.projects, description: e.target.value },
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Görsel URL</Label>
                    <Input
                      value={homeContent.about?.image || ""}
                      onChange={(e) =>
                        setHomeContent({ ...homeContent, about: { ...homeContent.about, image: e.target.value } })
                      }
                      placeholder="/modern-office-building.png"
                    />
                  </div>
                </CardContent>
              </Card>

              <Button onClick={() => saveContent("home", homeContent)} disabled={saving}>
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Kaydet
              </Button>
            </div>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>Hakkımızda İçeriği</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Başlık</Label>
                  <Input
                    value={aboutContent.title || ""}
                    onChange={(e) => setAboutContent({ ...aboutContent, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Açıklama</Label>
                  <Textarea
                    rows={4}
                    value={aboutContent.description || ""}
                    onChange={(e) => setAboutContent({ ...aboutContent, description: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Misyon</Label>
                  <Textarea
                    value={aboutContent.mission || ""}
                    onChange={(e) => setAboutContent({ ...aboutContent, mission: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Vizyon</Label>
                  <Textarea
                    value={aboutContent.vision || ""}
                    onChange={(e) => setAboutContent({ ...aboutContent, vision: e.target.value })}
                  />
                </div>

                <Button onClick={() => saveContent("about", aboutContent)} disabled={saving}>
                  {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Kaydet
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hero Bölümü</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Başlık</Label>
                    <Input
                      value={servicesContent.hero?.title || ""}
                      onChange={(e) =>
                        setServicesContent({
                          ...servicesContent,
                          hero: { ...servicesContent.hero, title: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Alt Başlık</Label>
                    <Textarea
                      value={servicesContent.hero?.subtitle || ""}
                      onChange={(e) =>
                        setServicesContent({
                          ...servicesContent,
                          hero: { ...servicesContent.hero, subtitle: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Görsel URL</Label>
                    <Input
                      value={servicesContent.hero?.image || ""}
                      onChange={(e) =>
                        setServicesContent({
                          ...servicesContent,
                          hero: { ...servicesContent.hero, image: e.target.value },
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Giriş Bölümü</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Badge</Label>
                    <Input
                      value={servicesContent.intro?.badge || ""}
                      onChange={(e) =>
                        setServicesContent({
                          ...servicesContent,
                          intro: { ...servicesContent.intro, badge: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Başlık</Label>
                    <Input
                      value={servicesContent.intro?.title || ""}
                      onChange={(e) =>
                        setServicesContent({
                          ...servicesContent,
                          intro: { ...servicesContent.intro, title: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Açıklama</Label>
                    <Textarea
                      value={servicesContent.intro?.description || ""}
                      onChange={(e) =>
                        setServicesContent({
                          ...servicesContent,
                          intro: { ...servicesContent.intro, description: e.target.value },
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {servicesContent.services?.map((service: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      Hizmet {index + 1}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          const newServices = { ...servicesContent }
                          newServices.services = newServices.services.filter((_: any, i: number) => i !== index)
                          setServicesContent(newServices)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Başlık</Label>
                      <Input
                        value={service.title || ""}
                        onChange={(e) => {
                          const newServices = { ...servicesContent }
                          newServices.services[index].title = e.target.value
                          setServicesContent(newServices)
                        }}
                      />
                    </div>
                    <div>
                      <Label>Açıklama</Label>
                      <Textarea
                        rows={3}
                        value={service.description || ""}
                        onChange={(e) => {
                          const newServices = { ...servicesContent }
                          newServices.services[index].description = e.target.value
                          setServicesContent(newServices)
                        }}
                      />
                    </div>
                    <div>
                      <Label>Görsel URL</Label>
                      <Input
                        value={service.image || ""}
                        onChange={(e) => {
                          const newServices = { ...servicesContent }
                          newServices.services[index].image = e.target.value
                          setServicesContent(newServices)
                        }}
                      />
                    </div>
                    <div>
                      <Label>Alt Hizmetler</Label>
                      {service.items?.map((item: any, itemIndex: number) => (
                        <div key={itemIndex} className="border p-3 rounded mt-2 space-y-2">
                          <Input
                            placeholder="Başlık"
                            value={item.title || ""}
                            onChange={(e) => {
                              const newServices = { ...servicesContent }
                              newServices.services[index].items[itemIndex].title = e.target.value
                              setServicesContent(newServices)
                            }}
                          />
                          <Input
                            placeholder="Açıklama"
                            value={item.description || ""}
                            onChange={(e) => {
                              const newServices = { ...servicesContent }
                              newServices.services[index].items[itemIndex].description = e.target.value
                              setServicesContent(newServices)
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card>
                <CardHeader>
                  <CardTitle>CTA Bölümü</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Başlık</Label>
                    <Input
                      value={servicesContent.cta?.title || ""}
                      onChange={(e) =>
                        setServicesContent({
                          ...servicesContent,
                          cta: { ...servicesContent.cta, title: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Açıklama</Label>
                    <Textarea
                      value={servicesContent.cta?.description || ""}
                      onChange={(e) =>
                        setServicesContent({
                          ...servicesContent,
                          cta: { ...servicesContent.cta, description: e.target.value },
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Button onClick={() => saveContent("services", servicesContent)} disabled={saving}>
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Kaydet
              </Button>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tamamlanan Projeler</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {projects.completed?.map((project: any, index: number) => (
                    <div key={index} className="border p-4 rounded-lg space-y-2">
                      <div className="flex justify-between items-start">
                        <Input
                          placeholder="Proje Adı"
                          value={project.title || ""}
                          onChange={(e) => {
                            const newProjects = { ...projects }
                            newProjects.completed[index].title = e.target.value
                            setProjects(newProjects)
                          }}
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            const newProjects = { ...projects }
                            newProjects.completed = newProjects.completed.filter((_: any, i: number) => i !== index)
                            setProjects(newProjects)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <Input
                        placeholder="Açıklama"
                        value={project.description || ""}
                        onChange={(e) => {
                          const newProjects = { ...projects }
                          newProjects.completed[index].description = e.target.value
                          setProjects(newProjects)
                        }}
                      />
                      <Input
                        placeholder="Detaylar"
                        value={project.details || ""}
                        onChange={(e) => {
                          const newProjects = { ...projects }
                          newProjects.completed[index].details = e.target.value
                          setProjects(newProjects)
                        }}
                      />
                      <Input
                        placeholder="Yıl"
                        value={project.year || ""}
                        onChange={(e) => {
                          const newProjects = { ...projects }
                          newProjects.completed[index].year = e.target.value
                          setProjects(newProjects)
                        }}
                      />
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => {
                      const newProjects = { ...projects }
                      newProjects.completed.push({
                        id: `project-${Date.now()}`,
                        title: "",
                        description: "",
                        details: "",
                        year: "",
                        image: "/modern-apartment-building.png",
                      })
                      setProjects(newProjects)
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Yeni Proje Ekle
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Devam Eden Projeler</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {projects.ongoing?.map((project: any, index: number) => (
                    <div key={index} className="border p-4 rounded-lg space-y-2">
                      <div className="flex justify-between items-start">
                        <Input
                          placeholder="Proje Adı"
                          value={project.title || ""}
                          onChange={(e) => {
                            const newProjects = { ...projects }
                            newProjects.ongoing[index].title = e.target.value
                            setProjects(newProjects)
                          }}
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            const newProjects = { ...projects }
                            newProjects.ongoing = newProjects.ongoing.filter((_: any, i: number) => i !== index)
                            setProjects(newProjects)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <Input
                        placeholder="Açıklama"
                        value={project.description || ""}
                        onChange={(e) => {
                          const newProjects = { ...projects }
                          newProjects.ongoing[index].description = e.target.value
                          setProjects(newProjects)
                        }}
                      />
                      <Input
                        placeholder="Detaylar"
                        value={project.details || ""}
                        onChange={(e) => {
                          const newProjects = { ...projects }
                          newProjects.ongoing[index].details = e.target.value
                          setProjects(newProjects)
                        }}
                      />
                      <Input
                        placeholder="Yıl"
                        value={project.year || ""}
                        onChange={(e) => {
                          const newProjects = { ...projects }
                          newProjects.ongoing[index].year = e.target.value
                          setProjects(newProjects)
                        }}
                      />
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => {
                      const newProjects = { ...projects }
                      newProjects.ongoing.push({
                        id: `project-${Date.now()}`,
                        title: "",
                        description: "",
                        details: "",
                        year: "",
                        image: "/modern-construction-site.png",
                      })
                      setProjects(newProjects)
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Yeni Proje Ekle
                  </Button>
                </CardContent>
              </Card>

              <Button onClick={() => saveContent("projects", projects)} disabled={saving}>
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Tüm Projeleri Kaydet
              </Button>
            </div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>İletişim Bilgileri</CardTitle>
                <CardDescription>Header, footer ve iletişim sayfasında kullanılır</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Adres</Label>
                  <Textarea
                    rows={3}
                    value={contactContent.address || ""}
                    onChange={(e) => setContactContent({ ...contactContent, address: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Telefon</Label>
                    <Input
                      value={contactContent.phone || ""}
                      onChange={(e) => setContactContent({ ...contactContent, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Mobil</Label>
                    <Input
                      value={contactContent.mobile || ""}
                      onChange={(e) => setContactContent({ ...contactContent, mobile: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Fax</Label>
                    <Input
                      value={contactContent.fax || ""}
                      onChange={(e) => setContactContent({ ...contactContent, fax: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>E-posta</Label>
                    <Input
                      type="email"
                      value={contactContent.email || ""}
                      onChange={(e) => setContactContent({ ...contactContent, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Yetkili Kişi</Label>
                    <Input
                      value={contactContent.authorized || ""}
                      onChange={(e) => setContactContent({ ...contactContent, authorized: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Çalışma Saatleri</Label>
                    <Input
                      value={contactContent.hours || ""}
                      onChange={(e) => setContactContent({ ...contactContent, hours: e.target.value })}
                    />
                  </div>
                </div>

                <Button onClick={() => saveContent("contact", contactContent)} disabled={saving}>
                  {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Kaydet
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Şifre Değiştir</CardTitle>
                <CardDescription>Yönetim paneli şifrenizi değiştirin</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Mevcut Şifre</Label>
                  <Input
                    type="password"
                    value={passwordForm.oldPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Yeni Şifre</Label>
                  <Input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Yeni Şifre (Tekrar)</Label>
                  <Input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  />
                </div>

                <Button onClick={handlePasswordChange} disabled={saving}>
                  {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Şifreyi Güncelle
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
