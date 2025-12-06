import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Building2, Phone, MapPin, User, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAboutContent, getContactContent } from "@/lib/content"

export const metadata = {
  title: "Hakkımızda - 60+ Yıllık Tecrübe | VIERA Construction - Alkan Yapı",
  description:
    "Kurucumuz Servet Alkan'ın temellerini attığı firmamız, 60 yılı aşkın deneyimi ve köklü geçmişinden aldığı güçle konut ve iş yeri üretimine aralıksız devam etmektedir.",
  keywords: [
    "VIERA Construction hakkında",
    "Alkan Yapı",
    "Servet Alkan",
    "inşaat firması",
    "müteahhitlik",
    "Üsküdar inşaat",
    "60 yıllık tecrübe",
    "D sınıfı Müteahhitlik",
  ],
  openGraph: {
    title: "Hakkımızda | VIERA Construction - 60+ Yıllık Tecrübe",
    description: "60 yılı aşkın deneyimle İstanbul'da kaliteli konut ve iş yeri üretimi.",
    type: "website",
  },
}

export const dynamic = "force-dynamic"

export default async function AboutPage() {
  const [about, contact] = await Promise.all([
    getAboutContent(),
    getContactContent(),
  ])

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src="/modern-construction-building-with-crane-and-steel-.jpg"
          alt="VIERA Construction - İnşaat Projesi"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{about.title}</h1>
              <p className="text-lg md:text-xl text-white/90">
                60 yılı aşkın deneyim ve köklü geçmişimizle konut ve iş yeri üretiminde güvenin adresi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container px-4 md:px-6 max-w-6xl mx-auto py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Column - Main Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1 bg-muted rounded-lg px-3 py-1 text-sm">
              <Building2 className="h-4 w-4" /> Firma Geçmişimiz
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">VIERA Construction - Alkan Yapı</h2>

            <p className="text-foreground/80 text-lg leading-relaxed">
              {about.description}
            </p>

            {/* Certification Badge */}
            <div className="bg-zinc-900 text-white rounded-xl p-6 mt-4">
              <h3 className="text-xl font-bold mb-2 text-white">D Sınıfı Müteahhitlik Belgesi</h3>
              <p className="text-white/80">Firmamız D sınıfı Müteahhitlik Belgesine sahiptir.</p>
            </div>

            {/* Vision & Mission */}
            <div className="space-y-4 mt-6">
              <div className="border-l-4 border-zinc-800 dark:border-zinc-200 pl-4 py-2">
                <h3 className="text-xl font-bold text-foreground">Vizyonumuz</h3>
                <p className="text-foreground/70">{about.vision}</p>
              </div>
              <div className="border-l-4 border-zinc-800 dark:border-zinc-200 pl-4 py-2">
                <h3 className="text-xl font-bold text-foreground">Misyonumuz</h3>
                <p className="text-foreground/70">{about.mission}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Images & Contact Info */}
          <div className="space-y-8">
            {/* Company Image */}
            <div className="aspect-[16/10] overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/elegant-modern-residential-apartment-building-exte.jpg"
                width={800}
                height={500}
                alt="VIERA Construction - Konut Projesi"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Contact Information Card */}
            <div className="bg-muted rounded-xl p-6">
              <h3 className="text-xl font-bold mb-5 text-foreground">Firma Bilgileri</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center h-9 w-9 rounded-full bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-800 shrink-0">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground/60">Yetkili</p>
                    <p className="font-medium text-foreground">{contact.authorized}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center h-9 w-9 rounded-full bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-800 shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground/60">Adres</p>
                    <p className="font-medium text-foreground">{contact.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center h-9 w-9 rounded-full bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-800 shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground/60">İletişim</p>
                    <p className="font-medium text-foreground">Tel: {contact.phone}</p>
                    <p className="font-medium text-foreground">Cep: {contact.mobile}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center h-9 w-9 rounded-full bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-800 shrink-0">
                    <Printer className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground/60">Fax</p>
                    <p className="font-medium text-foreground">{contact.fax}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Badge */}
            <div className="bg-zinc-900 text-white rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3 text-white">60+ Yıllık Tecrübe</h3>
              <p className="text-white/90 mb-4">
                {about.founder?.bio || "Servet Alkan'ın temellerini attığı firmamız, köklü geçmişinden aldığı güçle hizmet vermektedir."}
              </p>
              <Button
                variant="outline"
                className="w-full border-white text-white hover:bg-white hover:text-zinc-900 bg-transparent"
                asChild
              >
                <Link href="/iletisim">İletişime Geçin</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center text-foreground">Hizmet Alanlarımız</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-muted rounded-xl overflow-hidden">
              <div className="aspect-[16/10] relative">
                <Image
                  src="/residential-apartment-building-construction.jpg"
                  fill
                  alt="Konut Projeleri"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold mb-2 text-foreground">Konut Projeleri</h3>
                <p className="text-foreground/70 text-sm">
                  Modern ve konforlu konut projeleri ile ailelere yaşam alanları sunuyoruz.
                </p>
              </div>
            </div>

            <div className="bg-muted rounded-xl overflow-hidden">
              <div className="aspect-[16/10] relative">
                <Image
                  src="/commercial-office-building-modern-glass-facade.jpg"
                  fill
                  alt="İş Yeri Projeleri"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold mb-2 text-foreground">İş Yeri Projeleri</h3>
                <p className="text-foreground/70 text-sm">
                  Fonksiyonel ve estetik iş yeri projeleri ile işletmelere modern çalışma ortamları sağlıyoruz.
                </p>
              </div>
            </div>

            <div className="bg-muted rounded-xl overflow-hidden">
              <div className="aspect-[16/10] relative">
                <Image
                  src="/urban-renewal-construction-site-with-new-buildings.jpg"
                  fill
                  alt="Kentsel Dönüşüm"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold mb-2 text-foreground">Kentsel Dönüşüm</h3>
                <p className="text-foreground/70 text-sm">
                  Güvenli ve modern yaşam alanları oluşturmak için kentsel dönüşüm projelerinde yer alıyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-muted rounded-xl p-8 md:p-10 text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-foreground">
            Projeleriniz İçin Bizimle İletişime Geçin
          </h2>
          <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
            60 yılı aşkın tecrübemizle projelerinizi hayata geçirmek için hazırız. Detaylı bilgi ve teklif almak için
            bizimle iletişime geçin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild>
              <Link href="/iletisim">İletişime Geçin</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/hizmetlerimiz" className="flex items-center gap-2">
                Hizmetlerimizi İnceleyin
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
