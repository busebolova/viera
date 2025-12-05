import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, CheckCircle, Clock, Calendar, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Projelerimiz - Tamamlanan ve Devam Eden Projeler | VIERA",
  description:
    "VIERA - Alkan Yapı & Viera Ortaklığı tamamlanan, devam eden ve yakında başlayacak inşaat projeleri. Validebağ, AZADE Evleri, Homeland Otel, Dilman Konakları ve daha fazlası. 100+ başarılı proje portföyü.",
  keywords: [
    "VIERA projeleri",
    "Alkan Yapı projeleri",
    "Validebağ projesi",
    "AZADE Evleri",
    "Homeland Otel",
    "Dilman Konakları",
    "Üsküdar konut projeleri",
    "İstanbul inşaat projeleri",
    "kentsel dönüşüm projeleri",
    "tamamlanan projeler",
    "devam eden projeler",
  ],
  openGraph: {
    title: "Projelerimiz | VIERA - Alkan Yapı & Viera Ortaklığı",
    description:
      "100+ tamamlanmış proje ile İstanbul'un güvenilir inşaat firması. Konut, ticari ve karma kullanımlı projeler.",
    type: "website",
  },
}

const completedProjects = [
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
    description: "Barbaros Mah, Mütevelliçeşme Cad No: 13-3, Üsküdar - Eski Anadolu Sitesi A Blok",
    details: "36 Daire",
    year: "2019",
    image: "/project-3.png",
  },
  {
    id: "azade-84",
    title: "AZADE Evleri 84 Parsel",
    description: "Barbaros Mah, Mütevelliçeşme Cad No: 15, Üsküdar - Doğuş Apartmanı",
    details: "18 Daire, 2 Dükkan",
    year: "2018",
    image: "/project-1.png",
  },
  {
    id: "caglar-apartmani",
    title: "Fıstıkağacı Çağlar Apartmanı",
    description: "Selamiali Mah Güney Sok No 2 Üsküdar - Kentsel Dönüşüm Yenileme Projesi",
    details: "16 Daire, 3 Dükkan",
    year: "2017",
    image: "/project-2.png",
  },
  {
    id: "doga-apartmani",
    title: "Fıstıkağacı Doğa Apartmanı",
    description: "Selamiali Mah, Şehit Asteğmen Halil Öğel Sok No: 28 Üsküdar",
    details: "5 Daire",
    year: "2014",
    image: "/project-3.png",
  },
]

const ongoingProjects = [
  {
    id: "validebag-29",
    title: "Validebağ 29 Kentsel Dönüşüm",
    description: "Kaba inşaat bitmiştir. İnce işler devam etmektedir.",
    details: "38 Daire",
    year: "2025",
    status: "2. Etap projemiz 2025 3. Çeyrek tamamlanacaktır",
    image: "/project-1.png",
  },
  {
    id: "homeland-butik-otel",
    title: "Homeland Butik Otel Projesi",
    description: "Firmamıza ait Üsküdar merkezde butik otel konsept projemizdir.",
    details: "Butik Otel",
    year: "2024",
    status: "İnce işler devam etmektedir",
    image: "/project-2.png",
  },
]

const upcomingProjects = [
  {
    id: "dilman-konaklari",
    title: "Dilman Konakları",
    description: "Üsküdar Barbaros Mahallesi - 3 Blok",
    details: "44+14 toplam 58 Daire",
    year: "2025",
    status: "Hazırlık aşamasındadır",
    image: "/project-3.png",
  },
  {
    id: "ugur-huzur",
    title: "Uğur-Huzur Apartmanları",
    description: "Üsküdar Sultantepe Mahallesi Kentsel Dönüşüm Yenileme Projesi",
    details: "40 Daire",
    year: "2025",
    status: "Hazırlık aşamasındadır",
    image: "/project-1.png",
  },
]

const legacyProjects = [
  {
    title: "Doğa Apartmanı",
    location: "Üsküdar Selamiali Mah, Şehit Asteğmen Halil Öğel Sokak No: 28",
    details: "5 Daire",
  },
  { title: "Vakıf Apartmanı", location: "Üsküdar Selami Ali Mah Karabağ Sokak", details: "5 Daire" },
  {
    title: "Doğa Apartmanı",
    location: "Şişli Halide Edip Adıvar Caddesi 59 Parsel No:91",
    details: "4 Daire, 1 Dükkan",
  },
  { title: "Selamiali Projesi", location: "Selamiali Mahallesi 2619 Ada 270 Parsel", details: "3 Daire, 1 Dükkan" },
  { title: "Alkan Han İş Merkezi", location: "Üsküdar 425-14 Parsel", details: "İş Merkezi" },
  { title: "Altunizade İş Merkezi", location: "Altunizade", details: "İş Merkezi" },
  { title: "Keystone Okulları", location: "Çamlıca", details: "Eğitim Yapısı" },
]

function ProjectCard({
  project,
  statusIcon,
  statusColor,
}: { project: (typeof completedProjects)[0]; statusIcon: React.ReactNode; statusColor: string }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-lg">
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
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium bg-primary/10 px-2 py-1 rounded">{project.details}</span>
          {project.status && <span className="text-xs text-muted-foreground">{project.status}</span>}
        </div>
      </div>
    </div>
  )
}

export default function ProjectsPage() {
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
                1965&apos;ten bu yana 100&apos;den fazla başarılı proje. Alkan Yapı & VIERA ortaklığı ile güvenilir
                inşaat.
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
              <div className="text-3xl font-bold">100+</div>
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
            {completedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                statusIcon={<CheckCircle className="w-3 h-3" />}
                statusColor="bg-green-500 text-white"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Ongoing Projects */}
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
            {ongoingProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                statusIcon={<Clock className="w-3 h-3" />}
                statusColor="bg-blue-500 text-white"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Projects */}
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
            {upcomingProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                statusIcon={<Calendar className="w-3 h-3" />}
                statusColor="bg-amber-500 text-white"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Legacy Projects */}
      <section className="w-full py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-zinc-500/20 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-zinc-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Geçmiş Projelerimizden</h2>
              <p className="text-muted-foreground">1965&apos;ten bu yana tamamladığımız diğer projeler</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {legacyProjects.map((project, index) => (
              <div key={index} className="p-4 rounded-lg border bg-card">
                <h3 className="font-medium mb-1">{project.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">{project.location}</p>
                <span className="text-xs bg-primary/10 px-2 py-1 rounded">{project.details}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-8">
            ...ve 1965&apos;ten bu yana tamamladığımız 100&apos;den fazla proje.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="bg-primary/5 border rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Projeleriniz İçin Bizimle İletişime Geçin</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              60 yılı aşkın tecrübemizle projelerinizi hayata geçirmek için hazırız. Detaylı bilgi ve teklif almak için
              bizimle iletişime geçin.
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
