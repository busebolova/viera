"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Building2, ChevronRight, ImageIcon, Printer, User, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroSlider } from "@/components/hero-slider"
import { ContactForm } from "@/components/contact-form"
import { useEffect, useState } from "react"

const DEFAULT_CONTENT = {
  video: {
    url: "https://cdn.pixabay.com/video/2020/06/23/42926-434300944_large.mp4",
    title: "ALKAN YAPI",
    subtitle: "& VIERA",
  },
  experience: {
    title: "60+ Yıllık Tecrübe",
    description:
      "Kurucumuz Servet Alkan'ın temellerini attığı firmamız, köklü geçmişinden aldığı güçle konut ve iş yeri üretimine aralıksız devam etmektedir.",
  },
  about: {
    badge: "Hakkımızda",
    title: "Firma Geçmişimiz",
    description:
      "Kurucumuz Servet Alkan'ın temellerini attığı firmamız, 60 yılı aşkın deneyimi ve köklü geçmişinden aldığı güçle konut ve iş yeri üretimine aralıksız devam etmektedir. Çağın gereksinimlerine uygun, estetik ve fonksiyonel yapılar inşa etme anlayışımızla, her projede titizlikle çalışıyor, güven ve kaliteyi ön planda tutuyoruz.",
    certification: {
      title: "Müteahhitlik Belgemiz",
      description: "Firmamız D sınıfı Müteahhitlik Belgesine sahiptir.",
    },
    projects: {
      title: "Projelerimiz",
      description: "1965'ten bu yana 100'den fazla proje başarıyla tamamlanmıştır.",
    },
    image: "/project-1.png",
  },
}

const DEFAULT_PROJECTS = {
  completed: [
    {
      id: "validebag-27-28",
      title: "Validebağ 27-28 Blok Apartmanı",
      description: "Altunizade Mahallesi Kalfa Çeşme Sokak Kentsel Dönüşüm Yenileme Projesi",
      details: "56 Daire",
      year: "2024",
      status: "Eylül 2024 teslim edilmiştir",
      image: "/project-1.png",
    },
    {
      id: "azade-86",
      title: "AZADE Evleri 86 Parsel",
      description: "Barbaros Mahallesi Mütevelliçeşme Caddesi - Eski Anadolu Sitesi B Blok",
      details: "36 Daire",
      year: "2021",
      image: "/project-2.png",
    },
    {
      id: "azade-85",
      title: "AZADE Evleri 85 Parsel",
      description: "Barbaros Mah, Mütevelliçeşme Cad - Eski Anadolu Sitesi A Blok",
      details: "36 Daire",
      year: "2019",
      image: "/project-3.png",
    },
  ],
  ongoing: [
    {
      id: "validebag-29",
      title: "Validebağ 29 Kentsel Dönüşüm",
      description: "Kaba inşaat bitmiştir. İnce işler devam etmektedir.",
      details: "38 Daire",
      year: "2025",
      status: "2025 3. Çeyrek tamamlanacak",
      image: "/project-1.png",
    },
    {
      id: "homeland-butik-otel",
      title: "Homeland Butik Otel",
      description: "Üsküdar merkezde butik otel konsept projemiz",
      details: "Butik Otel",
      year: "2024",
      status: "İnce işler devam etmektedir",
      image: "/project-2.png",
    },
  ],
}

const DEFAULT_CONTACT = {
  address: "Altunizade Mah. Ord. Prof Fahrettin Kerim Gökay Cad. No7/8 Üsküdar- İstanbul",
  phone: "0216 391 49 40",
  mobile: "0533 479 83 87",
  fax: "0216 310 90 74",
  authorized: "Erdem Alkan",
}

function ProjectCard({
  project,
  statusIcon,
  statusColor,
}: {
  project: (typeof DEFAULT_PROJECTS.completed)[0]
  statusIcon: React.ReactNode
  statusColor: string
}) {
  return (
    <Link href={`/projeler`} className="group block">
      <div className="relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-lg">
        <div className="aspect-video overflow-hidden relative">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={600}
            height={400}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div
            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusColor}`}
          >
            {statusIcon}
            {project.year}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-base font-semibold mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{project.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium bg-primary/10 px-2 py-1 rounded">{project.details}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function HomeClient() {
  const [content, setContent] = useState<any>(DEFAULT_CONTENT)
  const [projects, setProjects] = useState<any>(DEFAULT_PROJECTS)
  const [contact, setContact] = useState<any>(DEFAULT_CONTACT)

  useEffect(() => {
    Promise.all([
      fetch("/data/home.json").catch(() => ({ json: () => DEFAULT_CONTENT })),
      fetch("/data/projects.json").catch(() => ({ json: () => DEFAULT_PROJECTS })),
      fetch("/data/contact.json").catch(() => ({ json: () => DEFAULT_CONTACT })),
    ])
      .then(([home, proj, cont]) => Promise.all([home.json(), proj.json(), cont.json()]))
      .then(([homeData, projectsData, contactData]) => {
        setContent(homeData)
        setProjects(projectsData)
        setContact(contactData)
      })
      .catch(() => {})
  }, [])

  return (
    <main style={{ flex: "1 1 0%" }}>
      {/* Hero Section */}
      <HeroSlider content={content.video} />

      {/* Experience Section */}
      <section
        style={{
          width: "100%",
          padding: "2.5rem 0",
          backgroundColor: "#27272a",
          color: "white",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700" }}>{content.experience?.title}</h2>
          <p
            style={{ marginTop: "0.5rem", color: "rgba(255,255,255,0.8)", maxWidth: "48rem", margin: "0.5rem auto 0" }}
          >
            {content.experience?.description}
          </p>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        style={{
          width: "100%",
          padding: "4rem 0",
          backgroundColor: "hsl(240 4.8% 95.9% / 0.3)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
          <div
            style={{
              display: "grid",
              gap: "2.5rem",
              alignItems: "center",
            }}
            className="lg:grid-cols-2 lg:gap-16"
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  backgroundColor: "hsl(240 4.8% 95.9%)",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  width: "fit-content",
                }}
              >
                <Building2 style={{ height: "1rem", width: "1rem" }} /> {content.about?.badge}
              </div>
              <h2 style={{ fontSize: "1.875rem", fontWeight: "700", letterSpacing: "-0.05em" }}>
                {content.about?.title}
              </h2>
              <p style={{ color: "hsl(240 3.8% 46.1%)", fontSize: "1.125rem" }}>{content.about?.description}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div
                  style={{
                    borderLeft: "4px solid #27272a",
                    paddingLeft: "1rem",
                    paddingTop: "0.5rem",
                    paddingBottom: "0.5rem",
                  }}
                >
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>{content.about?.certification?.title}</h3>
                  <p style={{ color: "hsl(240 3.8% 46.1%)" }}>{content.about?.certification?.description}</p>
                </div>
                <div
                  style={{
                    borderLeft: "4px solid #27272a",
                    paddingLeft: "1rem",
                    paddingTop: "0.5rem",
                    paddingBottom: "0.5rem",
                  }}
                >
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>{content.about?.projects?.title}</h3>
                  <p style={{ color: "hsl(240 3.8% 46.1%)" }}>{content.about?.projects?.description}</p>
                </div>
              </div>
              <div style={{ paddingTop: "1rem" }}>
                <Button variant="outline" asChild>
                  <Link href="/hakkimizda" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                    Daha Fazla Bilgi
                    <ChevronRight style={{ height: "1rem", width: "1rem" }} />
                  </Link>
                </Button>
              </div>
            </div>
            <div style={{ maxWidth: "500px", margin: "0 auto", width: "100%" }} className="lg:max-w-none">
              <div
                style={{
                  aspectRatio: "1 / 1",
                  overflow: "hidden",
                  borderRadius: "0.75rem",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                }}
              >
                <Image
                  src={content.about?.image || "/project-1.png"}
                  width={600}
                  height={600}
                  alt="Alkan Yapı & VIERA - Konut Projesi"
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" style={{ width: "100%", padding: "4rem 0", backgroundColor: "hsl(var(--background))" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
          <div
            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1rem" }}
          >
            <div style={{ maxWidth: "800px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  backgroundColor: "hsl(240 4.8% 95.9%)",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                }}
              >
                <ImageIcon style={{ height: "1rem", width: "1rem" }} /> Biten, Devam Eden ve Başlayacak Projelerimiz
              </div>
              <h2 style={{ fontSize: "1.875rem", fontWeight: "700", letterSpacing: "-0.05em", marginTop: "0.5rem" }}>
                Projelerimizden Örnekler
              </h2>
              <p style={{ color: "hsl(240 3.8% 46.1%)", fontSize: "1.125rem", marginTop: "0.5rem" }}>
                1965&apos;ten bu yana 100&apos;den fazla başarılı proje
              </p>
            </div>
          </div>

          <div style={{ maxWidth: "72rem", margin: "3rem auto 0" }}>
            {/* Completed Projects */}
            <div style={{ marginBottom: "3rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "50%",
                    backgroundColor: "rgba(34, 197, 94, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CheckCircle style={{ width: "1.25rem", height: "1.25rem", color: "#22c55e" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>Tamamlanan Projeler</h3>
                  <p style={{ color: "hsl(240 3.8% 46.1%)", fontSize: "0.875rem" }}>
                    Başarıyla teslim ettiğimiz projelerimiz
                  </p>
                </div>
              </div>
              <div style={{ display: "grid", gap: "1.5rem" }} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {projects.completed?.slice(0, 3).map((project: any) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    statusIcon={<CheckCircle style={{ width: "0.75rem", height: "0.75rem" }} />}
                    statusColor="bg-green-500 text-white"
                  />
                ))}
              </div>
            </div>

            {/* Ongoing Projects */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "50%",
                    backgroundColor: "rgba(59, 130, 246, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Clock style={{ width: "1.25rem", height: "1.25rem", color: "#3b82f6" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>Devam Eden Projeler</h3>
                  <p style={{ color: "hsl(240 3.8% 46.1%)", fontSize: "0.875rem" }}>
                    Şu anda üzerinde çalıştığımız projelerimiz
                  </p>
                </div>
              </div>
              <div style={{ display: "grid", gap: "1.5rem" }} className="grid-cols-1 md:grid-cols-2">
                {projects.ongoing?.slice(0, 2).map((project: any) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    statusIcon={<Clock style={{ width: "0.75rem", height: "0.75rem" }} />}
                    statusColor="bg-blue-500 text-white"
                  />
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
            <Button variant="outline" asChild>
              <Link href="/projeler" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                Tüm Projeleri Görüntüle
                <ChevronRight style={{ height: "1rem", width: "1rem" }} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        style={{
          width: "100%",
          padding: "4rem 0",
          backgroundColor: "hsl(240 4.8% 95.9% / 0.3)",
          marginBottom: "4rem",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
          <div
            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1rem" }}
          >
            <div style={{ maxWidth: "800px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  backgroundColor: "hsl(240 4.8% 95.9%)",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                }}
              >
                <Phone style={{ height: "1rem", width: "1rem" }} /> İletişim
              </div>
              <h2 style={{ fontSize: "1.875rem", fontWeight: "700", letterSpacing: "-0.05em", marginTop: "0.5rem" }}>
                Bizimle İletişime Geçin
              </h2>
              <p style={{ color: "hsl(240 3.8% 46.1%)", fontSize: "1.125rem", marginTop: "0.5rem" }}>
                Sorularınız veya projeleriniz için bizimle iletişime geçebilirsiniz.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gap: "3rem",
              marginTop: "4rem",
              maxWidth: "72rem",
              margin: "4rem auto 0",
            }}
            className="lg:grid-cols-2"
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "700" }}>İletişim Formu</h3>
                <p style={{ color: "hsl(240 3.8% 46.1%)" }}>Aşağıdaki formu doldurarak bize mesaj gönderebilirsiniz.</p>
              </div>
              <ContactForm />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "700" }}>İletişim Bilgileri</h3>
                <p style={{ color: "hsl(240 3.8% 46.1%)" }}>Aşağıdaki iletişim bilgilerinden bize ulaşabilirsiniz.</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "2.5rem",
                      width: "2.5rem",
                      borderRadius: "50%",
                      backgroundColor: "#e4e4e7",
                      color: "#27272a",
                      marginRight: "1rem",
                    }}
                  >
                    <User style={{ height: "1.25rem", width: "1.25rem" }} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: "500" }}>Yetkili</h4>
                    <p style={{ color: "hsl(240 3.8% 46.1%)" }}>{contact.authorized}</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "2.5rem",
                      width: "2.5rem",
                      borderRadius: "50%",
                      backgroundColor: "#e4e4e7",
                      color: "#27272a",
                      marginRight: "1rem",
                    }}
                  >
                    <Phone style={{ height: "1.25rem", width: "1.25rem" }} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: "500" }}>Telefon</h4>
                    <p style={{ color: "hsl(240 3.8% 46.1%)" }}>Tel: {contact.phone}</p>
                    <p style={{ color: "hsl(240 3.8% 46.1%)" }}>Cep: {contact.mobile}</p>
                  </div>
                </div>
                {contact.fax && (
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "2.5rem",
                        width: "2.5rem",
                        borderRadius: "50%",
                        backgroundColor: "#e4e4e7",
                        color: "#27272a",
                        marginRight: "1rem",
                      }}
                    >
                      <Printer style={{ height: "1.25rem", width: "1.25rem" }} />
                    </div>
                    <div>
                      <h4 style={{ fontWeight: "500" }}>Fax</h4>
                      <p style={{ color: "hsl(240 3.8% 46.1%)" }}>{contact.fax}</p>
                    </div>
                  </div>
                )}
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "2.5rem",
                      width: "2.5rem",
                      borderRadius: "50%",
                      backgroundColor: "#e4e4e7",
                      color: "#27272a",
                      marginRight: "1rem",
                    }}
                  >
                    <MapPin style={{ height: "1.25rem", width: "1.25rem" }} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: "500" }}>Adres</h4>
                    <p style={{ color: "hsl(240 3.8% 46.1%)" }}>{contact.address}</p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  aspectRatio: "16 / 9",
                  overflow: "hidden",
                  borderRadius: "0.75rem",
                  border: "1px solid hsl(var(--border))",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.3967396573864!2d29.023861!3d41.022885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7d4c9d0c9d1%3A0x0!2zQWx0dW5pemFkZSwgw5xza8O8ZGFyL8Swc3RhbmJ1bA!5e0!3m2!1str!2str!4v1620000000000!5m2!1str!2str"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
