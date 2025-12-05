import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Hakkımızda - Firma Geçmişimiz | VIERA - Alkan Yapı & Viera Ortaklığı",
  description:
    "VIERA - Alkan Yapı & Viera Ortaklığı'nın 60 yılı aşkın deneyimi. Kurucumuz Servet Alkan'dan bugüne köklü inşaat firması hikayemiz, vizyonumuz ve değerlerimiz. D sınıfı müteahhitlik belgeli, 100+ başarılı proje.",
  keywords: [
    "Alkan Yapı hakkında",
    "VIERA hakkında",
    "Servet Alkan",
    "inşaat firması geçmişi",
    "müteahhitlik belgesi",
    "Üsküdar inşaat",
    "firma vizyonu",
    "firma misyonu",
    "60 yıllık tecrübe",
  ],
  openGraph: {
    title: "Hakkımızda | VIERA - Alkan Yapı & Viera Ortaklığı",
    description: "60 yılı aşkın deneyimle İstanbul'da kaliteli yapı üretimi. Vizyonumuz, misyonumuz ve değerlerimiz.",
    type: "website",
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-16 md:pb-0">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src="/modern-office-building.png"
          alt="VIERA - Alkan Yapı & Viera Ortaklığı Ofisi"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Hakkımızda</h1>
              <p className="text-xl text-white/80">
                VIERA - Alkan Yapı & Viera Ortaklığı, uzun yıllara dayanan tecrübesi ile inşaat, petrol, hafriyat ve
                orman ürünleri alanlarında faaliyet gösteren köklü bir firmadır.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container px-4 md:px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
          <div className="space-y-6">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              <Building2 className="h-4 w-4 inline-block mr-1" /> Firma Geçmişimiz
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">VIERA - Alkan Yapı & Viera Ortaklığı</h2>
            <p className="text-muted-foreground">
              VIERA - Alkan Yapı & Viera Ortaklığı, 2015 yılında kurulmuş olup, inşaat, petrol, hafriyat ve orman
              ürünleri alanlarında faaliyet gösteren köklü bir firmadır. Kurulduğu günden bu yana, kaliteli hizmet
              anlayışı ve müşteri memnuniyeti odaklı çalışma prensibiyle sektörde öncü bir konuma gelmiştir.
            </p>
            <p className="text-muted-foreground">
              Firmamız, deneyimli kadrosu ve modern ekipmanlarıyla, müşterilerimizin ihtiyaçlarına en uygun çözümleri
              sunmaktadır. Yenilikçi yaklaşımımız ve sürdürülebilir iş modelimizle, sektörde fark yaratmaya devam
              ediyoruz.
            </p>

            <div className="space-y-4 mt-8">
              <div className="border-l-4 border-zinc-800 pl-4 py-2">
                <h3 className="text-xl font-bold">Vizyonumuz</h3>
                <p className="text-muted-foreground">
                  Sektörde öncü ve yenilikçi çözümlerle müşteri memnuniyetini en üst seviyede tutarak, sürdürülebilir
                  büyüme sağlamak.
                </p>
              </div>
              <div className="border-l-4 border-zinc-800 pl-4 py-2">
                <h3 className="text-xl font-bold">Misyonumuz</h3>
                <p className="text-muted-foreground">
                  Kaliteden ödün vermeden, çevreye duyarlı ve yenilikçi projelerle topluma değer katmak.
                </p>
              </div>
              <div className="border-l-4 border-zinc-800 pl-4 py-2">
                <h3 className="text-xl font-bold">Değerlerimiz</h3>
                <p className="text-muted-foreground">
                  Dürüstlük, şeffaflık, müşteri odaklılık, çevreye saygı ve sürekli gelişim ilkelerine bağlı kalarak
                  çalışmalarımızı sürdürüyoruz.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="aspect-video overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/modern-office-building.png"
                width={800}
                height={450}
                alt="VIERA Ofisi"
                className="object-cover w-full h-full"
              />
            </div>

            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Firma Bilgileri</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Kuruluş Yılı:</span>
                  <span>2015</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Çalışan Sayısı:</span>
                  <span>150+</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Tamamlanan Proje:</span>
                  <span>50+</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Faaliyet Alanları:</span>
                  <span>İnşaat, Petrol, Hafriyat, Orman Ürünleri</span>
                </div>
              </div>
            </div>

            <div className="bg-zinc-800 text-white dark:text-white rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4 text-white dark:text-white">10 Yıllık Tecrübe</h3>
              <p className="text-white dark:text-white mb-4">
                Sektörde 10 yıllık tecrübemizle müşterilerimize en kaliteli hizmeti sunuyoruz.
              </p>
              <Button
                variant="outline"
                className="w-full border-white hover:bg-white/10 btn-standard btn-outline-dark text-black dark:text-white bg-transparent"
                asChild
              >
                <Link href="/#contact">İletişime Geçin</Link>
              </Button>
            </div>
          </div>
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
    </div>
  )
}
