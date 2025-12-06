"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Building2, ChevronRight, ImageIcon, Printer, User, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroSlider } from "@/components/hero-slider"
import { ContactForm } from "@/components/contact-form"
import type { HomeContent, ProjectsContent, ContactContent, Project } from "@/lib/content"

interface HomePageProps {
  content: HomeContent
  projects: ProjectsContent
  contact: ContactContent
}

function ProjectCard({
  project,
  statusIcon,
  statusColor,
}: {
  project: Project
  statusIcon: React.ReactNode
  statusColor: string
}) {
  return (
    <Link href="/projeler" className="group block">
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

export function HomePage({ content, projects, contact }: HomePageProps) {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <HeroSlider content={content.video} />

      {/* Experience Section */}
      <section className="w-full py-10 bg-zinc-800 text-white text-center">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold">{content.experience?.title}</h2>
          <p className="mt-2 text-white/80 max-w-3xl mx-auto">
            {content.experience?.description}
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-1 bg-muted px-3 py-1 rounded-lg text-sm w-fit">
                <Building2 className="h-4 w-4" /> {content.about?.badge}
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                {content.about?.title}
              </h2>
              <p className="text-lg text-muted-foreground">{content.about?.description}</p>
              
              <div className="flex flex-col gap-4">
                <div className="border-l-4 border-zinc-800 dark:border-zinc-300 pl-4 py-2">
                  <h3 className="text-xl font-bold text-foreground">{content.about?.certification?.title}</h3>
                  <p className="text-muted-foreground">{content.about?.certification?.description}</p>
                </div>
                <div className="border-l-4 border-zinc-800 dark:border-zinc-300 pl-4 py-2">
                  <h3 className="text-xl font-bold text-foreground">{content.about?.projects?.title}</h3>
                  <p className="text-muted-foreground">{content.about?.projects?.description}</p>
                </div>
              </div>
              
              <div className="pt-4">
                <Button variant="outline" asChild>
                  <Link href="/hakkimizda" className="inline-flex items-center gap-2">
                    Daha Fazla Bilgi
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="max-w-[500px] mx-auto w-full lg:max-w-none">
              <div className="aspect-square overflow-hidden rounded-xl shadow-lg">
                <Image
                  src={content.about?.image || "/project-1.png"}
                  width={600}
                  height={600}
                  alt="Alkan Yapı & VIERA - Konut Projesi"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="w-full py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-1 bg-muted px-3 py-1 rounded-lg text-sm">
                <ImageIcon className="h-4 w-4" /> Biten, Devam Eden ve Başlayacak Projelerimiz
              </div>
              <h2 className="text-3xl font-bold tracking-tight mt-2 text-foreground">
                Projelerimizden Örnekler
              </h2>
              <p className="text-muted-foreground text-lg mt-2">
                1965&apos;ten bu yana 100&apos;den fazla başarılı proje
              </p>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mt-12">
            {/* Completed Projects */}
            {projects.completed && projects.completed.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Tamamlanan Projeler</h3>
                    <p className="text-muted-foreground text-sm">Başarıyla teslim ettiğimiz projelerimiz</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.completed.slice(0, 3).map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      statusIcon={<CheckCircle className="w-3 h-3" />}
                      statusColor="bg-green-500 text-white"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Ongoing Projects */}
            {projects.ongoing && projects.ongoing.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Devam Eden Projeler</h3>
                    <p className="text-muted-foreground text-sm">Şu anda üzerinde çalıştığımız projelerimiz</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.ongoing.slice(0, 2).map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      statusIcon={<Clock className="w-3 h-3" />}
                      statusColor="bg-blue-500 text-white"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/projeler" className="flex items-center gap-2">
                Tüm Projeleri Görüntüle
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-16 bg-muted/30 mb-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-1 bg-muted px-3 py-1 rounded-lg text-sm">
                <Phone className="h-4 w-4" /> İletişim
              </div>
              <h2 className="text-3xl font-bold tracking-tight mt-2 text-foreground">
                Bizimle İletişime Geçin
              </h2>
              <p className="text-muted-foreground text-lg mt-2">
                Sorularınız veya projeleriniz için bizimle iletişime geçebilirsiniz.
              </p>
            </div>
          </div>

          <div className="grid gap-12 mt-16 max-w-5xl mx-auto lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground">İletişim Formu</h3>
                <p className="text-muted-foreground">Aşağıdaki formu doldurarak bize mesaj gönderebilirsiniz.</p>
              </div>
              <ContactForm />
            </div>
            
            <div className="flex flex-col gap-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground">İletişim Bilgileri</h3>
                <p className="text-muted-foreground">Aşağıdaki iletişim bilgilerinden bize ulaşabilirsiniz.</p>
              </div>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-start">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 mr-4 flex-shrink-0">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Yetkili</h4>
                    <p className="text-muted-foreground">{contact.authorized}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 mr-4 flex-shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Telefon</h4>
                    <p className="text-muted-foreground">Tel: {contact.phone}</p>
                    <p className="text-muted-foreground">Cep: {contact.mobile}</p>
                  </div>
                </div>
                
                {contact.fax && (
                  <div className="flex items-start">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 mr-4 flex-shrink-0">
                      <Printer className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Fax</h4>
                      <p className="text-muted-foreground">{contact.fax}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 mr-4 flex-shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Adres</h4>
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
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
