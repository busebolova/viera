import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Hourglass, 
  Ruler, 
  Phone,
  ArrowRight,
  Building2,
  ArrowUpRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { getProjectsContent, getContactContent } from "@/lib/content"

export const dynamic = "force-dynamic"

function findProject(projects: Awaited<ReturnType<typeof getProjectsContent>>, slug: string) {
  const allProjects = [
    ...projects.completed.map((p) => ({ ...p, category: "completed" as const })),
    ...projects.ongoing.map((p) => ({ ...p, category: "ongoing" as const })),
    ...projects.upcoming.map((p) => ({ ...p, category: "upcoming" as const })),
  ]
  return allProjects.find((p) => p.id === slug)
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const projects = await getProjectsContent()
  const project = findProject(projects, slug)

  if (!project) {
    return { title: "Proje Bulunamadı | VIERA Construction" }
  }

  return {
    title: `${project.title} | VIERA Construction`,
    description: project.description,
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [projects, contact] = await Promise.all([
    getProjectsContent(),
    getContactContent(),
  ])
  
  const project = findProject(projects, slug)

  if (!project) {
    notFound()
  }

  const statusConfig = {
    completed: { icon: CheckCircle2, color: "text-green-600 dark:text-green-400", bg: "bg-green-600", lightBg: "bg-green-100 dark:bg-green-900/30", label: "Tamamlandı" },
    ongoing: { icon: Clock, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500", lightBg: "bg-amber-100 dark:bg-amber-900/30", label: "Devam Ediyor" },
    upcoming: { icon: Hourglass, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-500", lightBg: "bg-blue-100 dark:bg-blue-900/30", label: "Başlayacak" },
  }

  const status = statusConfig[project.category]
  const StatusIcon = status.icon
  const allImages = project.images?.length ? project.images : [project.image]

  const relatedProjects = [...projects.completed, ...projects.ongoing, ...projects.upcoming]
    .filter((p) => p.id !== slug)
    .slice(0, 3)

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] md:h-[80vh]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src={project.image || "/placeholder.svg"} 
            alt={project.title} 
            fill 
            className="object-cover" 
            priority 
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end">
          <div className="container px-4 md:px-6 pb-12 md:pb-16">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-6">
              <Link href="/" className="text-white/70 hover:text-white transition-colors">
                Ana Sayfa
              </Link>
              <span className="text-white/50">/</span>
              <Link href="/projeler" className="text-white/70 hover:text-white transition-colors">
                Projeler
              </Link>
              <span className="text-white/50">/</span>
              <span className="text-white">{project.title}</span>
            </nav>

            {/* Status Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${status.bg} mb-4`}>
              <StatusIcon className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-semibold">{status.label}</span>
            </div>
            
            {/* Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-3xl">
              {project.title}
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8">
              {project.description}
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-4 md:gap-8">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                <Calendar className="h-5 w-5 text-white/80" />
                <div>
                  <p className="text-white/60 text-xs">Yıl</p>
                  <p className="text-white font-semibold">{project.year}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                <Building2 className="h-5 w-5 text-white/80" />
                <div>
                  <p className="text-white/60 text-xs">Kapsam</p>
                  <p className="text-white font-semibold">{project.details}</p>
                </div>
              </div>

              {project.location && (
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                  <MapPin className="h-5 w-5 text-white/80" />
                  <div>
                    <p className="text-white/60 text-xs">Konum</p>
                    <p className="text-white font-semibold">{project.location}</p>
                  </div>
                </div>
              )}

              {project.area && (
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                  <Ruler className="h-5 w-5 text-white/80" />
                  <div>
                    <p className="text-white/60 text-xs">Alan</p>
                    <p className="text-white font-semibold">{project.area}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="flex-1 space-y-10">
              {/* About */}
              <div className="bg-card rounded-2xl p-6 md:p-8 border shadow-sm">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Proje Hakkında
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {project.fullDescription || project.description}
                </p>
              </div>

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <div className="bg-card rounded-2xl p-6 md:p-8 border shadow-sm">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">
                    Proje Özellikleri
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {project.features.map((feature, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center gap-3 p-4 rounded-xl ${status.lightBg} border`}
                      >
                        <CheckCircle2 className={`h-5 w-5 ${status.color} flex-shrink-0`} />
                        <span className="text-foreground font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery */}
              <div className="bg-card rounded-2xl p-6 md:p-8 border shadow-sm">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">
                  Proje Görselleri
                </h3>
                <div className="space-y-4">
                  {/* Main Image */}
                  <div className="aspect-video relative rounded-xl overflow-hidden">
                    <Image
                      src={allImages[0]}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Thumbnails */}
                  {allImages.length > 1 && (
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {allImages.slice(1, 5).map((img, index) => (
                        <div 
                          key={index} 
                          className="aspect-video relative rounded-lg overflow-hidden cursor-pointer group"
                        >
                          <Image
                            src={img}
                            alt={`${project.title} - ${index + 2}`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-80 xl:w-96 flex-shrink-0">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Contact Card - Premium Design */}
                <div className="relative overflow-hidden rounded-3xl">
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900" />
                  <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
                  
                  <div className="relative p-6 md:p-8">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Bilgi Alın</h3>
                        <p className="text-zinc-400 text-sm">Bu proje hakkında</p>
                      </div>
                    </div>
                    
                    {/* Phone Numbers */}
                    <div className="space-y-3 mb-8">
                      <a 
                        href={`tel:${contact.phone.replace(/\s/g, "")}`}
                        className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
                      >
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
                          <Phone className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-0.5">Sabit Hat</p>
                          <p className="text-white font-bold text-lg">{contact.phone}</p>
                        </div>
                        <ArrowUpRight className="h-5 w-5 text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </a>
                      
                      <a 
                        href={`tel:${contact.mobile.replace(/\s/g, "")}`}
                        className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
                      >
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                          <Phone className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-0.5">Mobil</p>
                          <p className="text-white font-bold text-lg">{contact.mobile}</p>
                        </div>
                        <ArrowUpRight className="h-5 w-5 text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </a>
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-3">
                      <Link 
                        href="/iletisim"
                        className="group relative flex items-center justify-center gap-2 w-full h-14 rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-white font-bold text-base overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/25"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          İletişime Geçin
                          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      </Link>
                      
                      <a 
                        href={`https://wa.me/${contact.whatsapp}?text=Merhaba, ${project.title} hakkında bilgi almak istiyorum.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center gap-2 w-full h-14 rounded-2xl bg-gradient-to-r from-green-600 to-green-500 text-white font-bold text-base hover:shadow-lg hover:shadow-green-500/25 transition-all"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        WhatsApp ile Yazın
                      </a>
                    </div>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card rounded-2xl p-5 text-center border shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <span className="text-primary font-bold text-xl">60+</span>
                    </div>
                    <p className="text-foreground font-semibold">Yıllık Tecrübe</p>
                    <p className="text-muted-foreground text-xs mt-1">Sektörde Lider</p>
                  </div>
                  <div className="bg-card rounded-2xl p-5 text-center border shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <span className="text-primary font-bold text-xl">D</span>
                    </div>
                    <p className="text-foreground font-semibold">Sınıfı Belge</p>
                    <p className="text-muted-foreground text-xs mt-1">Müteahhitlik</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-12 md:py-20 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Diğer Projeler
              </h2>
              <Button 
                variant="outline" 
                className="self-start md:self-auto rounded-xl"
                asChild
              >
                <Link href="/projeler">
                  Tüm Projeleri Gör
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((relatedProject) => {
                const relatedStatus = projects.completed.find(p => p.id === relatedProject.id) 
                  ? statusConfig.completed 
                  : projects.ongoing.find(p => p.id === relatedProject.id)
                    ? statusConfig.ongoing
                    : statusConfig.upcoming

                return (
                  <Link 
                    key={relatedProject.id} 
                    href={`/projeler/${relatedProject.id}`}
                    className="group"
                  >
                    <div className="bg-card rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition-shadow">
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <Image
                          src={relatedProject.image || "/placeholder.svg"}
                          alt={relatedProject.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className={`absolute bottom-3 left-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${relatedStatus.bg}`}>
                          <relatedStatus.icon className="h-3.5 w-3.5 text-white" />
                          <span className="text-white text-xs font-semibold">{relatedStatus.label}</span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                          {relatedProject.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {relatedProject.year} • {relatedProject.details}
                        </p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-zinc-900 dark:bg-zinc-950">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Projenizi Birlikte Hayata Geçirelim
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            60 yılı aşkın tecrübemiz ve uzman ekibimizle hayalinizdeki yapıyı inşa edelim.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/iletisim"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold h-14 px-8 rounded-xl transition-colors"
            >
              Ücretsiz Danışmanlık
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a 
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center justify-center gap-2 border-2 border-zinc-600 text-white hover:bg-zinc-800 font-semibold h-14 px-8 rounded-xl transition-colors"
            >
              <Phone className="h-5 w-5" />
              Hemen Arayın
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
