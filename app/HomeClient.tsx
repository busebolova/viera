"use client"
export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

"use client"

import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Building2, ChevronRight, ImageIcon, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { HeroSlider } from "@/components/hero-slider"
import { ContactForm } from "@/components/contact-form"
import { useEffect, useState } from "react"

const DEFAULT_CONTENT = {
  video: {
    url: "https://cdn.pixabay.com/video/2020/06/23/42926-434300944_large.mp4",
    title: "VIERA",
    subtitle: "Alkan Yapı & Viera Ortaklığı",
  },
  experience: {
    title: "60 Yılı Aşkın Tecrübe",
    description: "1965'ten bu yana konut ve iş yeri üretiminde aralıksız hizmet vermekteyiz.",
  },
  about: {
    badge: "Hakkımızda",
    title: "Firma Geçmişimiz",
    description:
      "Kurucumuz Servet Alkan'ın temellerini attığı firmamız, 60 yılı aşkın deneyimi ve köklü geçmişinden aldığı güçle konut ve iş yeri üretimine aralıksız devam etmektedir.",
    certification: {
      title: "Müteahhitlik Belgemiz",
      description: "Firmamız D sınıfı Müteahhitlik Belgesine sahiptir.",
    },
    projects: {
      title: "Projelerimiz",
      description: "1965'ten bu yana 100'den fazla proje başarıyla tamamlanmıştır.",
    },
    image: "/modern-office-building.png",
  },
}

const DEFAULT_PROJECTS = {
  completed: [
    {
      id: "validebag-27-28",
      title: "Validebağ 27-28 Blok",
      description: "Altunizade Mah. Kalfa Çeşme Sok.",
      details: "56 Daire",
      year: "2024",
      image: "/modern-apartment-building.png",
    },
  ],
  ongoing: [
    {
      id: "validebag-29",
      title: "Validebağ 29 Kentsel Dönüşüm",
      description: "38 Daire - Kaba inşaat tamamlandı",
      details: "2. Etap 2025 3. Çeyrek tamamlanacak",
      year: "2025",
      image: "/modern-construction-site.png",
    },
  ],
}

const DEFAULT_CONTACT = {
  address: "Altunizade Mah. Ord. Prof Fahrettin Kerim Gökay Cad. No7/8 Üsküdar/ İstanbul",
  phone: "0216 391 49 40",
  mobile: "0533 479 83 87",
  email: "info@alkanyapi.com.tr",
  fax: "0216 310 90 74",
  authorized: "Erdem Alkan",
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
    <main className="flex-1">
      {/* Hero Section */}
      <HeroSlider content={content.video} />

      <section className="w-full py-10 bg-zinc-800 text-white">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">{content.experience?.title}</h2>
          <p className="mt-2 text-white/80 max-w-2xl mx-auto">{content.experience?.description}</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full py-16 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                <Building2 className="h-4 w-4 inline-block mr-1" /> {content.about?.badge}
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{content.about?.title}</h2>
              <p className="text-muted-foreground md:text-xl/relaxed">{content.about?.description}</p>
              <div className="space-y-4">
                <div className="border-l-4 border-zinc-800 pl-4 py-2">
                  <h3 className="text-xl font-bold">{content.about?.certification?.title}</h3>
                  <p className="text-muted-foreground">{content.about?.certification?.description}</p>
                </div>
                <div className="border-l-4 border-zinc-800 pl-4 py-2">
                  <h3 className="text-xl font-bold">{content.about?.projects?.title}</h3>
                  <p className="text-muted-foreground">{content.about?.projects?.description}</p>
                </div>
              </div>
              <div className="pt-4">
                <Button variant="outline" className="group bg-transparent" asChild>
                  <Link href="/hakkimizda">
                    Daha Fazla Bilgi
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[500px] lg:max-w-none">
              <div className="aspect-square overflow-hidden rounded-xl shadow-lg">
                <Image
                  src={content.about?.image || "/modern-office-building.png"}
                  width={600}
                  height={600}
                  alt="Alkan Yapı Ofisi"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="w-full py-16 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-[800px]">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                <ImageIcon className="h-4 w-4 inline-block mr-1" /> Projeler / Galeri
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Projelerimiz</h2>
              <p className="text-muted-foreground md:text-xl/relaxed">Tamamlanan ve devam eden projelerimiz.</p>
            </div>
          </div>

          <div className="mx-auto max-w-6xl mt-16">
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-2">Tamamlanan Projeler</h3>
              <p className="text-muted-foreground mb-8">1965'ten bu yana 100'den fazla tamamlanan proje.</p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.completed?.map((project: any) => (
                  <ProjectCard key={project.id} {...project} detailUrl={`/projeler/${project.id}`} />
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-2">Devam Eden Projeler</h3>
              <p className="text-muted-foreground mb-8">Şu anda üzerinde çalıştığımız projelerimiz.</p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.ongoing?.map((project: any) => (
                  <ProjectCard key={project.id} {...project} detailUrl={`/projeler/${project.id}`} />
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <Button variant="outline" asChild>
              <Link href="/projeler">
                Tüm Projeleri Görüntüle
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-16 md:py-24 lg:py-32 bg-muted/30 mb-16 md:mb-0">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-[800px]">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                <Phone className="h-4 w-4 inline-block mr-1" /> İletişim
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Bizimle İletişime Geçin</h2>
              <p className="text-muted-foreground md:text-xl/relaxed">
                Sorularınız veya projeleriniz için bizimle iletişime geçebilirsiniz.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 mt-16">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">İletişim Formu</h3>
                <p className="text-muted-foreground">Aşağıdaki formu doldurarak bize mesaj gönderebilirsiniz.</p>
              </div>
              <ContactForm />
            </div>
            <div className="space-y-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">İletişim Bilgileri</h3>
                <p className="text-muted-foreground">Aşağıdaki iletişim bilgilerinden bize ulaşabilirsiniz.</p>
              </div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 mr-4">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Telefon</h4>
                    <p className="text-muted-foreground">{contact.phone}</p>
                    <p className="text-muted-foreground">{contact.mobile}</p>
                  </div>
                </div>
                {contact.fax && (
                  <div className="flex items-start">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 mr-4">
                      <Printer className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Fax</h4>
                      <p className="text-muted-foreground">{contact.fax}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 mr-4">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Yetkili</h4>
                    <p className="text-muted-foreground">{contact.authorized}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 mr-4">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Adres</h4>
                    <p className="text-muted-foreground">{contact.address}</p>
                  </div>
                </div>
              </div>
              <div className="aspect-video overflow-hidden rounded-xl border shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.3967396573864!2d29.023861!3d41.022885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7d4c9d0c9d1%3A0x0!2zQWx0dW5pemFkZSwgw5xza8O8ZGFyL8Swc3RhbmJ1bA!5e0!3m2!1str!2str!4v1620000000000!5m2!1str!2str"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
