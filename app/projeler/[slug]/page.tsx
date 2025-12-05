import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Calendar, MapPin, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"

// Proje verileri
const projectsData = {
  "konut-projesi": {
    title: "Konut Projesi",
    description: "Modern ve konforlu yaşam alanları sunan konut projemiz.",
    fullDescription:
      "Abdioğlu Group A.Ş. olarak, modern mimari ve yüksek kaliteli malzemeler kullanarak inşa ettiğimiz konut projemiz, şehir merkezine yakın konumuyla dikkat çekiyor. Projemiz, 2+1, 3+1 ve 4+1 daire seçenekleriyle farklı ihtiyaçlara cevap veriyor. Geniş peyzaj alanları, sosyal tesisler ve güvenlik sistemleriyle donatılmış olan projemiz, konforlu bir yaşam sunuyor.",
    year: "2023",
    location: "İstanbul, Türkiye",
    client: "Abdioğlu Group A.Ş.",
    area: "15,000 m²",
    status: "Tamamlandı",
    mainImage: "/modern-apartment-building.png",
    features: [
      "Modern mimari tasarım",
      "Yüksek kaliteli malzemeler",
      "Sosyal tesisler",
      "Güvenlik sistemleri",
      "Peyzaj alanları",
      "Kapalı otopark",
    ],
  },
  "ticari-kompleks": {
    title: "Ticari Kompleks",
    description: "Şehir merkezinde yer alan çok amaçlı ticari kompleks.",
    fullDescription:
      "Şehrin en merkezi konumunda yer alan ticari kompleksimiz, modern iş dünyasının tüm ihtiyaçlarını karşılayacak şekilde tasarlandı. Ofis alanları, mağazalar, restoranlar ve konferans salonlarıyla donatılmış olan kompleksimiz, iş dünyasının yeni buluşma noktası olma özelliği taşıyor. Yüksek teknolojili altyapısı ve çevre dostu özellikleriyle öne çıkan projemiz, sürdürülebilir bir geleceğe katkı sağlıyor.",
    year: "2022",
    location: "Ankara, Türkiye",
    client: "ABC Holding",
    area: "25,000 m²",
    status: "Tamamlandı",
    mainImage: "/commercial-building-construction.png",
    features: [
      "Modern ofis alanları",
      "Perakende mağazaları",
      "Konferans salonları",
      "Restoranlar ve kafeler",
      "Akıllı bina teknolojisi",
      "Yeşil bina sertifikası",
    ],
  },
  "endustriyel-tesis": {
    title: "Endüstriyel Tesis",
    description: "Yüksek teknoloji ile donatılmış endüstriyel üretim tesisi.",
    fullDescription:
      "Endüstriyel üretim tesisimiz, en son teknoloji ile donatılmış olup, verimli ve sürdürülebilir üretim süreçleri için tasarlanmıştır. 20,000 m² kapalı alana sahip tesisimiz, üretim alanları, depolama üniteleri, ofis alanları ve sosyal tesislerden oluşmaktadır. Enerji verimliliği yüksek sistemler ve çevre dostu üretim teknolojileriyle donatılmış olan tesisimiz, sektöründe öncü bir konuma sahiptir.",
    year: "2021",
    location: "İzmir, Türkiye",
    client: "XYZ Sanayi A.Ş.",
    area: "20,000 m²",
    status: "Tamamlandı",
    mainImage: "/images/project3.png",
    features: [
      "Modern üretim hatları",
      "Geniş depolama alanları",
      "Ofis ve idari binalar",
      "Enerji verimli sistemler",
      "Çevre dostu teknolojiler",
      "Lojistik merkezi",
    ],
  },
}

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const project = projectsData[params.slug as keyof typeof projectsData]

  if (!project) {
    return {
      title: "Proje Bulunamadı",
      description: "Aradığınız proje mevcut değil veya kaldırılmış olabilir.",
    }
  }

  return {
    title: project.title,
    description: project.description,
    keywords: ["Abdioğlu Group", "Projeler", project.title, "İnşaat Projeleri"],
  }
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const project = projectsData[slug as keyof typeof projectsData]

  if (!project) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Proje bulunamadı</h1>
        <p className="mb-8">Aradığınız proje mevcut değil veya kaldırılmış olabilir.</p>
        <Button asChild className="btn-standard">
          <Link href="/projeler">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Projelere Dön
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src={project.mainImage || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{project.title}</h1>
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
                className="inline-flex items-center text-sm font-medium text-zinc-600 hover:text-zinc-900 mb-6 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Tüm Projelere Dön
              </Link>
              <h2 className="text-2xl font-bold mb-4">Proje Detayları</h2>
              <p className="text-muted-foreground">{project.fullDescription}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-xl font-bold mb-6">Proje Özellikleri</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-zinc-800 mr-3"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-80 lg:w-96">
            <div className="bg-muted/30 rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold mb-6">Proje Bilgileri</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 dark:text-zinc-400" />
                  <div>
                    <p className="text-sm font-medium">Tamamlanma Yılı</p>
                    <p className="text-sm text-muted-foreground">{project.year}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 dark:text-zinc-400" />
                  <div>
                    <p className="text-sm font-medium">Konum</p>
                    <p className="text-sm text-muted-foreground">{project.location}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Building2 className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 dark:text-zinc-400" />
                  <div>
                    <p className="text-sm font-medium">Müşteri</p>
                    <p className="text-sm text-muted-foreground">{project.client}</p>
                  </div>
                </div>
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
                    className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 dark:text-zinc-400"
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
                    className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 dark:text-zinc-400"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium">Durum</p>
                    <p className="text-sm text-muted-foreground">{project.status}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button className="w-full btn-standard btn-dark" asChild>
                  <Link href="/#contact">İletişime Geçin</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
