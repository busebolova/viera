import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Calendar, MapPin, Building2, CheckCircle, Clock, Hourglass } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getGithubContent } from "@/lib/github"

// Varsayılan proje verileri
const defaultProjectsData = {
  completed: [
    {
      id: "validebag-27-28",
      title: "Validebağ 27-28 Blok Apartmanı",
      description: "Altunizade Mahallesi Kalfa Çeşme Sokak Kentsel Dönüşüm Yenileme Projesi",
      fullDescription:
        "Altunizade Mahallesi Kalfa Çeşme Sokak'ta gerçekleştirdiğimiz kentsel dönüşüm yenileme projesi kapsamında 56 daireli modern bir apartman inşa edilmiştir. Proje, deprem yönetmeliğine uygun olarak tasarlanmış ve yüksek kaliteli malzemelerle inşa edilmiştir.",
      details: "56 Daire",
      year: "2024",
      status: "Eylül 2024 teslim edilmiştir",
      location: "Altunizade, Üsküdar, İstanbul",
      area: "8,500 m²",
      image: "/project-1.png",
      features: [
        "56 Daire",
        "Depreme Dayanıklı Yapı",
        "Modern Mimari",
        "Otopark",
        "Sosyal Alanlar",
        "Peyzaj Düzenlemesi",
      ],
    },
    {
      id: "azade-86",
      title: "AZADE Evleri 86 Parsel",
      description: "Barbaros Mahallesi Mütevelliçeşme Caddesi Kat Karşılığı Kentsel Dönüşüm Yenileme Projesi",
      fullDescription:
        "Barbaros Mahallesi Mütevelliçeşme Caddesi'nde eski Anadolu Sitesi B Blok Apartmanı yerine inşa edilen AZADE Evleri 86 Parsel projesi, 36 daireden oluşmaktadır.",
      details: "36 Daire",
      year: "2021",
      location: "Barbaros, Üsküdar, İstanbul",
      area: "5,400 m²",
      image: "/project-2.png",
      features: ["36 Daire", "Kentsel Dönüşüm", "Modern Tasarım", "Kapalı Otopark"],
    },
    {
      id: "azade-85",
      title: "AZADE Evleri 85 Parsel",
      description: "Barbaros Mah, Mütevelliçeşme Cad No: 13-3, Üsküdar - Eski Anadolu Sitesi A Blok",
      fullDescription:
        "AZADE Evleri 85 Parsel, Üsküdar Barbaros Mahallesi'nde eski Anadolu Sitesi A Blok yerine inşa edilmiş 36 daireli modern bir konut projesidir.",
      details: "36 Daire",
      year: "2019",
      location: "Barbaros, Üsküdar, İstanbul",
      area: "5,400 m²",
      image: "/project-3.png",
      features: ["36 Daire", "Modern Mimari", "Güvenlik Sistemi", "Otopark"],
    },
  ],
  ongoing: [
    {
      id: "validebag-29",
      title: "Validebağ 29 Kentsel Dönüşüm",
      description: "Kaba inşaat bitmiştir. İnce işler devam etmektedir.",
      fullDescription:
        "Validebağ 29 projesi, 2. Etap kapsamında 38 daireli bir konut projesidir. Kaba inşaat tamamlanmış olup ince işler devam etmektedir.",
      details: "38 Daire",
      year: "2025",
      status: "2025 3. Çeyrek tamamlanacaktır",
      location: "Altunizade, Üsküdar, İstanbul",
      area: "5,700 m²",
      image: "/project-1.png",
      features: ["38 Daire", "İnce İşler Aşamasında", "2025 Teslim"],
    },
  ],
  upcoming: [
    {
      id: "dilman-konaklari",
      title: "Dilman Konakları",
      description: "Üsküdar Barbaros Mahallesi - 3 Blok",
      fullDescription:
        "Dilman Konakları projesi, Üsküdar Barbaros Mahallesi'nde 3 blok halinde toplam 58 daireden oluşacaktır.",
      details: "44+14 toplam 58 Daire",
      year: "2025",
      status: "Hazırlık aşamasındadır",
      location: "Barbaros, Üsküdar, İstanbul",
      area: "8,700 m²",
      image: "/project-3.png",
      features: ["3 Blok", "58 Daire", "Hazırlık Aşamasında"],
    },
  ],
}

async function getProjectsData() {
  try {
    const data = await getGithubContent("projects")
    return data || defaultProjectsData
  } catch {
    return defaultProjectsData
  }
}

function findProject(data: typeof defaultProjectsData, slug: string) {
  const allProjects = [
    ...data.completed.map((p) => ({ ...p, category: "completed" })),
    ...data.ongoing.map((p) => ({ ...p, category: "ongoing" })),
    ...data.upcoming.map((p) => ({ ...p, category: "upcoming" })),
  ]
  return allProjects.find((p) => p.id === slug)
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const data = await getProjectsData()
  const project = findProject(data, params.slug)

  if (!project) {
    return {
      title: "Proje Bulunamadı | VIERA Construction",
      description: "Aradığınız proje mevcut değil veya kaldırılmış olabilir.",
    }
  }

  return {
    title: `${project.title} | VIERA Construction`,
    description: project.description,
    keywords: ["VIERA Construction", "Projeler", project.title, "İnşaat Projeleri", "Kentsel Dönüşüm"],
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  }
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const data = await getProjectsData()
  const project = findProject(data, slug)

  if (!project) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Proje bulunamadı</h1>
        <p className="mb-8 text-muted-foreground">Aradığınız proje mevcut değil veya kaldırılmış olabilir.</p>
        <Button asChild>
          <Link href="/projeler">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Projelere Dön
          </Link>
        </Button>
      </div>
    )
  }

  const statusIcon = project.category === "completed" ? CheckCircle : project.category === "ongoing" ? Clock : Hourglass
  const StatusIcon = statusIcon
  const statusColor =
    project.category === "completed"
      ? "text-green-500"
      : project.category === "ongoing"
        ? "text-blue-500"
        : "text-amber-500"
  const statusBg =
    project.category === "completed"
      ? "bg-green-500/10"
      : project.category === "ongoing"
        ? "bg-blue-500/10"
        : "bg-amber-500/10"
  const statusText =
    project.category === "completed" ? "Tamamlandı" : project.category === "ongoing" ? "Devam Ediyor" : "Başlayacak"

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" priority />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${statusBg} ${statusColor} text-sm font-medium mb-4`}
              >
                <StatusIcon className="h-4 w-4" />
                {statusText}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-poppins">
                {project.title}
              </h1>
              <p className="text-xl text-white/80">{project.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container px-4 md:px-6 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <Link
                href="/projeler"
                className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Tüm Projelere Dön
              </Link>
              <h2 className="text-2xl font-bold mb-4">Proje Detayları</h2>
              <p className="text-muted-foreground leading-relaxed">{project.fullDescription || project.description}</p>
            </div>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-6">Proje Özellikleri</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-primary mr-3"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-80 lg:w-96">
            <div className="bg-muted/30 rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold mb-6">Proje Bilgileri</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Yıl</p>
                    <p className="text-sm text-muted-foreground">{project.year}</p>
                  </div>
                </div>
                {project.location && (
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Konum</p>
                      <p className="text-sm text-muted-foreground">{project.location}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start">
                  <Building2 className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Detaylar</p>
                    <p className="text-sm text-muted-foreground">{project.details}</p>
                  </div>
                </div>
                {project.area && (
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-muted-foreground mr-3 mt-0.5"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M3 9h18" />
                      <path d="M9 21V9" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium">Alan</p>
                      <p className="text-sm text-muted-foreground">{project.area}</p>
                    </div>
                  </div>
                )}
                {project.status && (
                  <div className="flex items-start">
                    <StatusIcon className={`h-5 w-5 mr-3 mt-0.5 ${statusColor}`} />
                    <div>
                      <p className="text-sm font-medium">Durum</p>
                      <p className="text-sm text-muted-foreground">{project.status}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <Button className="w-full" asChild>
                  <Link href="/iletisim">İletişime Geçin</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
