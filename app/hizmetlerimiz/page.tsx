import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Building2, Home, Building, Landmark } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Hizmetlerimiz - Konut, Ticari ve Karma Projeler | VIERA",
  description:
    "VIERA - Alkan Yapı & Viera Ortaklığı inşaat hizmetleri: Konut projeleri, lüks rezidanslar, ticari binalar, iş merkezleri, alışveriş kompleksleri, otel tesisleri ve karma kullanımlı projeler. 60+ yıllık tecrübe, D sınıfı müteahhitlik.",
  keywords: [
    "konut inşaatı",
    "lüks apartman",
    "rezidans projesi",
    "ticari bina inşaatı",
    "iş merkezi",
    "plaza inşaatı",
    "AVM inşaatı",
    "otel inşaatı",
    "karma kullanım projesi",
    "müteahhitlik hizmetleri",
    "inşaat firması İstanbul",
    "anahtar teslim proje",
  ],
  openGraph: {
    title: "Hizmetlerimiz | VIERA - Alkan Yapı & Viera Ortaklığı",
    description: "Konut, ticari ve karma kullanımlı projeler. 60+ yıllık tecrübe ile modern yaşam alanları.",
    type: "website",
  },
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen pb-16 md:pb-0">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image src="/modern-construction-site.png" alt="VIERA Hizmetler" fill className="object-cover" priority />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Hizmetlerimiz</h1>
              <p className="text-xl text-white/80">
                VIERA - Alkan Yapı & Viera Ortaklığı olarak 60 yılı aşkın tecrübemizle modern yaşam alanları inşa
                ediyoruz.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2 max-w-[800px]">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                <Building2 className="h-4 w-4 inline-block mr-1" /> Uzmanlık Alanlarımız
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Sunduğumuz Hizmetler</h2>
              <p className="text-muted-foreground md:text-xl/relaxed">
                1961 yılından bu yana inşaat sektöründe edindiğimiz tecrübeyle modern ve kaliteli projeler üretiyoruz.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-12 md:hidden">
            <div className="bg-muted/30 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 flex items-center justify-center mr-3">
                  <Home className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold">Konut Projeleri</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Modern yaşam standartlarına uygun, konforu ve estetiği bir araya getiren konut projeleri geliştiriyoruz.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center text-muted-foreground">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  <span>Lüks Apartman Kompleksleri</span>
                </li>
                <li className="flex items-center text-muted-foreground">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  <span>Rezidans Projeleri</span>
                </li>
                <li className="flex items-center text-muted-foreground">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  <span>Villa ve Müstakil Konutlar</span>
                </li>
              </ul>
            </div>

            <div className="bg-muted/30 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 flex items-center justify-center mr-3">
                  <Building className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold">Ticari Projeler</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                İş dünyasının ihtiyaçlarına yönelik fonksiyonel ve prestijli ticari binalar inşa ediyoruz.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center text-muted-foreground">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  <span>İş Merkezleri ve Plazalar</span>
                </li>
                <li className="flex items-center text-muted-foreground">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  <span>Alışveriş Kompleksleri</span>
                </li>
                <li className="flex items-center text-muted-foreground">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  <span>Otel ve Turizm Tesisleri</span>
                </li>
              </ul>
            </div>

            <div className="bg-muted/30 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 flex items-center justify-center mr-3">
                  <Landmark className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold">Karma Kullanımlı Projeler</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Konut, ofis ve ticari alanları bir araya getiren entegre yaşam merkezleri tasarlıyoruz.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center text-muted-foreground">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  <span>Rezidans-Ofis Kompleksleri</span>
                </li>
                <li className="flex items-center text-muted-foreground">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  <span>Karma Kullanım Alışveriş Merkezleri</span>
                </li>
                <li className="flex items-center text-muted-foreground">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  <span>Yerleşke Projeleri</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 space-y-16 hidden md:block">
            {/* Konut Projeleri */}
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 flex items-center justify-center">
                    <Home className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Konut Projeleri</h3>
                </div>
                <p className="text-muted-foreground">
                  VIERA - Alkan Yapı & Viera Ortaklığı olarak, modern yaşam standartlarına uygun, konforu ve estetiği
                  bir araya getiren konut projeleri geliştiriyoruz. 60 yılı aşkın tecrübemizle, her detayın özenle
                  planlandığı yaşam alanları inşa ediyoruz.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 mr-2 text-zinc-600 dark:text-zinc-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Lüks Apartman Kompleksleri</span>
                      <p className="text-sm text-muted-foreground">Modern mimarisi ve sosyal olanaklarıyla</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 mr-2 text-zinc-600 dark:text-zinc-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Rezidans Projeleri</span>
                      <p className="text-sm text-muted-foreground">Premium hizmet anlayışıyla donatılmış</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 mr-2 text-zinc-600 dark:text-zinc-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Villa ve Müstakil Konutlar</span>
                      <p className="text-sm text-muted-foreground">Özel yaşam alanları için özel tasarımlar</p>
                    </div>
                  </li>
                </ul>
                <Button variant="outline" className="group btn-standard bg-transparent" asChild>
                  <Link href="/projeler">
                    Konut Projelerimizi İnceleyin
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="mx-auto w-full max-w-[500px] lg:max-w-none">
                <div className="aspect-video overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src="/modern-apartment-building.png"
                    width={600}
                    height={400}
                    alt="Konut Projeleri"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* Ticari Projeler */}
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="order-2 lg:order-1 mx-auto w-full max-w-[500px] lg:max-w-none">
                <div className="aspect-video overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src="/modern-office-building.png"
                    width={600}
                    height={400}
                    alt="Ticari Projeler"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 flex items-center justify-center">
                    <Building className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Ticari Projeler</h3>
                </div>
                <p className="text-muted-foreground">
                  İş dünyasının dinamik ihtiyaçlarına yönelik, fonksiyonel ve prestijli ticari binalar inşa ediyoruz.
                  Modern iş merkezlerinden alışveriş komplekslerine, turizm tesislerinden karma kullanımlı projelere
                  kadar geniş bir yelpazede hizmet sunuyoruz.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 mr-2 text-zinc-600 dark:text-zinc-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">İş Merkezleri ve Plazalar</span>
                      <p className="text-sm text-muted-foreground">Kurumsal kimliğe uygun prestijli ofis alanları</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 mr-2 text-zinc-600 dark:text-zinc-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Alışveriş Kompleksleri</span>
                      <p className="text-sm text-muted-foreground">Modern perakende ve eğlence merkezleri</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 mr-2 text-zinc-600 dark:text-zinc-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Otel ve Turizm Tesisleri</span>
                      <p className="text-sm text-muted-foreground">Konuk memnuniyeti odaklı konaklama projeleri</p>
                    </div>
                  </li>
                </ul>
                <Button variant="outline" className="group btn-standard bg-transparent" asChild>
                  <Link href="/projeler">
                    Ticari Projelerimizi İnceleyin
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Karma Kullanımlı Projeler */}
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 flex items-center justify-center">
                    <Landmark className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Karma Kullanımlı Projeler</h3>
                </div>
                <p className="text-muted-foreground">
                  Yaşam, iş ve alışveriş alanlarını bir araya getiren entegre yaşam merkezleri tasarlıyoruz. Modern
                  şehir yaşamının tüm ihtiyaçlarını tek bir noktada karşılayan, sürdürülebilir ve akıllı bina
                  teknolojileriyle donatılmış projeler geliştiriyoruz.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 mr-2 text-zinc-600 dark:text-zinc-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Rezidans-Ofis Kompleksleri</span>
                      <p className="text-sm text-muted-foreground">Yaşam ve iş alanlarını entegre eden projeler</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 mr-2 text-zinc-600 dark:text-zinc-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Karma Kullanım Alışveriş Merkezleri</span>
                      <p className="text-sm text-muted-foreground">Ticaret, eğlence ve konut konseptleri</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 mr-2 text-zinc-600 dark:text-zinc-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Yerleşke Projeleri</span>
                      <p className="text-sm text-muted-foreground">Bütünleşik şehir içinde şehir konseptleri</p>
                    </div>
                  </li>
                </ul>
                <Button variant="outline" className="group btn-standard bg-transparent" asChild>
                  <Link href="/projeler">
                    Karma Projelerimizi İnceleyin
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="mx-auto w-full max-w-[500px] lg:max-w-none">
                <div className="aspect-video overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src="/commercial-building-construction.png"
                    width={600}
                    height={400}
                    alt="Karma Kullanımlı Projeler"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 md:mt-20 bg-muted/30 rounded-lg p-6 md:p-8 text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Hayalinizdeki Projeyi Birlikte Gerçekleştirelim</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              60 yılı aşkın tecrübemiz ve uzman ekibimizle projelerinizi hayata geçirmek için hazırız. Detaylı bilgi ve
              teklif almak için bizimle iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-standard btn-dark" asChild>
                <Link href="/iletisim">İletişime Geçin</Link>
              </Button>
              <Button variant="outline" size="lg" className="group btn-standard bg-transparent" asChild>
                <Link href="/projeler">
                  Tamamlanmış Projelerimiz
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
