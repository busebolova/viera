import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"

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

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pb-16 md:pb-0">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src="/commercial-building-construction.png"
          alt="VIERA Projeler"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Projelerimiz</h1>
              <p className="text-xl text-white/80">
                VIERA - Alkan Yapı & Viera Ortaklığı olarak yıllar içinde gerçekleştirdiğimiz başarılı projelerimiz.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2 max-w-[800px]">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                <ImageIcon className="h-4 w-4 inline-block mr-1" /> Tüm Projeler
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Tamamlanan ve Devam Eden Projelerimiz
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed">
                Yıllar içinde gerçekleştirdiğimiz başarılı projelerimizden bazıları.
              </p>
            </div>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
            <ProjectCard
              image="/modern-apartment-building.png"
              title="Konut Projesi"
              description="Modern ve konforlu yaşam alanları sunan konut projemiz."
              year="2023"
              detailUrl="/projeler/konut-projesi"
            />
            <ProjectCard
              image="/commercial-building-construction.png"
              title="Ticari Kompleks"
              description="Şehir merkezinde yer alan çok amaçlı ticari kompleks."
              year="2022"
              detailUrl="/projeler/ticari-kompleks"
            />
            <ProjectCard
              image="/images/project3.png"
              title="Endüstriyel Tesis"
              description="Yüksek teknoloji ile donatılmış endüstriyel üretim tesisi."
              year="2021"
              detailUrl="/projeler/endustriyel-tesis"
            />

            {/* Ek projeler */}
            <ProjectCard
              image="/modern-office-building.png"
              title="Ofis Binası"
              description="Modern tasarımlı kurumsal ofis binası projesi."
              year="2022"
              detailUrl="/projeler/ofis-binasi"
            />
            <ProjectCard
              image="/modern-apartment-exterior.png"
              title="Rezidans Projesi"
              description="Lüks rezidans ve yaşam alanları projesi."
              year="2023"
              detailUrl="/projeler/rezidans-projesi"
            />
            <ProjectCard
              image="/modern-commercial-building.png"
              title="AVM Projesi"
              description="Şehir merkezinde modern alışveriş merkezi projesi."
              year="2021"
              detailUrl="/projeler/avm-projesi"
            />
          </div>

          {/* CTA Section */}
          <div className="mt-20 bg-muted/30 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Projeleriniz İçin Bizimle İletişime Geçin</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Uzman ekibimizle projelerinizi hayata geçirmek için hazırız. Detaylı bilgi ve teklif almak için bizimle
              iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-standard btn-dark" asChild>
                <Link href="/#contact">İletişime Geçin</Link>
              </Button>
              <Button variant="outline" size="lg" className="group btn-standard bg-transparent" asChild>
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
