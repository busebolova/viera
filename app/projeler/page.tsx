import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, CheckCircle, Clock, Calendar, Building2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getProjectsContent, type Project, type LegacyProject } from "@/lib/content"

export const metadata = {
  title: "Projelerimiz - Tamamlanan ve Devam Eden Projeler | VIERA",
  description:
    "VIERA - Alkan Yapı & Viera Ortaklığı tamamlanan, devam eden ve yakında başlayacak inşaat projeleri. 100+ başarılı proje portföyü.",
  keywords: [
    "VIERA projeleri",
    "Alkan Yapı projeleri",
    "Üsküdar konut projeleri",
    "İstanbul inşaat projeleri",
    "kentsel dönüşüm projeleri",
  ],
  openGraph: {
    title: "Projelerimiz | VIERA - Alkan Yapı & Viera Ortaklığı",
    description: "100+ tamamlanmış proje ile İstanbul'un güvenilir inşaat firması.",
    type: "website",
  },
}

export const dynamic = "force-dynamic"

function ProjectCard({
  project,
  statusIcon,
  statusColor,
  href,
}: { 
  project: Project
  statusIcon: React.ReactNode
  statusColor: string
  href: string
}) {
  return (
    <Link href={href} className="group block">
      <div className="relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-lg hover:border-primary/50">
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
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white font-medium flex items-center gap-2">
              Detayları Gör <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium bg-primary/10 px-2 py-1 rounded">{project.details}</span>
            {project.status && <span className="text-xs text-muted-foreground">{project.status}</span>}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default async function ProjectsPage() {
  const projects = await getProjectsContent()

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image src="/project-1.png" alt="VIERA Projeler" fill className="object-cover" priority />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Projelerimiz</h1>
              <p className="text-xl text-white/80">
                {projects.stats?.since || "1965"}&apos;ten bu yana {projects.stats?.totalProjects || "100+"}den fazla başarılı proje.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="bg-primary text-primary-foreground py-6">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold">60+</div>
              <div className="text-sm opacity-80">Yıllık Tecrübe</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{projects.stats?.totalProjects || "100+"}</div>
              <div className="text-sm opacity-80">Tamamlanan Proje</div>
            </div>
            <div>
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm opacity-80">Mutlu Aile</div>
            </div>
            <div>
              <div className="text-3xl font-bold">D</div>
              <div className="text-sm opacity-80">Sınıfı Müteahhitlik</div>
            </div>
          </div>
        </div>
      </div>

      {/* Completed Projects */}
      {projects.completed && projects.completed.length > 0 && (
        <section className="w-full py-16 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Tamamlanan Projeler</h2>
                <p className="text-muted-foreground">Başarıyla teslim ettiğimiz projelerimiz</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.completed.map((project: Project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  href={`/projeler/${project.id}`}
                  statusIcon={<CheckCircle className="w-3 h-3" />}
                  statusColor="bg-green-500 text-white"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ongoing Projects */}
      {projects.ongoing && projects.ongoing.length > 0 && (
        <section className="w-full py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Devam Eden Projeler</h2>
                <p className="text-muted-foreground">Şu anda üzerinde çalıştığımız projelerimiz</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.ongoing.map((project: Project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  href={`/projeler/${project.id}`}
                  statusIcon={<Clock className="w-3 h-3" />}
                  statusColor="bg-blue-500 text-white"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Projects */}
      {projects.upcoming && projects.upcoming.length > 0 && (
        <section className="w-full py-16 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Yeni Başlayacak Projeler</h2>
                <p className="text-muted-foreground">Hazırlık aşamasındaki projelerimiz</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.upcoming.map((project: Project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  href={`/projeler/${project.id}`}
                  statusIcon={<Calendar className="w-3 h-3" />}
                  statusColor="bg-amber-500 text-white"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Legacy Projects */}
      {projects.legacy && projects.legacy.length > 0 && (
        <section className="w-full py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-zinc-500/20 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-zinc-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Geçmiş Projelerimizden</h2>
                <p className="text-muted-foreground">{projects.stats?.since || "1965"}&apos;ten bu yana tamamladığımız diğer projeler</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {projects.legacy.map((project: LegacyProject, index: number) => (
                <div key={index} className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
                  <h3 className="font-medium mb-1">{project.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{project.location}</p>
                  <span className="text-xs bg-primary/10 px-2 py-1 rounded">{project.details}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-8">
              {projects.stats?.note}
            </p>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="w-full py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="bg-primary/5 border rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Projeleriniz İçin Bizimle İletişime Geçin</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              60 yılı aşkın tecrübemizle projelerinizi hayata geçirmek için hazırız.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/iletisim">İletişime Geçin</Link>
              </Button>
              <Button variant="outline" size="lg" className="group bg-transparent" asChild>
                <Link href="/hizmetlerimiz">
                  Hizmetlerimizi İnceleyin
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
