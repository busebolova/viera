import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Building2, Home, Building, Landmark, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getServicesContent, getContactContent } from "@/lib/content"

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

export const dynamic = "force-dynamic"

// Icon mapping
const iconMap: Record<string, typeof Home> = {
  Home,
  Building,
  Landmark,
}

export default async function ServicesPage() {
  const [services, contactData] = await Promise.all([
    getServicesContent(),
    getContactContent(),
  ])

  const whatsappNumber = contactData?.whatsapp || "905334798387"

  return (
    <div className="min-h-screen pb-24 md:pb-0">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image 
          src={services.hero?.image || "/project-1.png"} 
          alt="VIERA Hizmetler" 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-poppins">
                {services.hero?.title}
              </h1>
              <p className="text-xl text-white/80">{services.hero?.subtitle}</p>
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
                <Building2 className="h-4 w-4 inline-block mr-1" /> {services.intro?.badge}
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-poppins">
                {services.intro?.title}
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed">{services.intro?.description}</p>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="grid grid-cols-1 gap-6 mb-12 md:hidden">
            {services.services?.map((service) => {
              const IconComponent = iconMap[service.icon] || Home
              return (
                <div key={service.id} className="bg-muted/30 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                  <div className="aspect-video relative">
                    <Image src={service.image} alt={service.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 flex items-center justify-center mr-3">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-bold">{service.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                    <ul className="space-y-2 text-sm">
                      {service.items?.map((item, idx) => (
                        <li key={idx} className="flex items-center text-muted-foreground">
                          <ChevronRight className="h-4 w-4 mr-2" />
                          <span>{item.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Desktop Layout */}
          <div className="mt-8 space-y-16 hidden md:block">
            {services.services?.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Home
              const isEven = index % 2 === 0
              
              return (
                <div key={service.id} className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                  <div className={isEven ? "space-y-6" : "order-2 space-y-6"}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 flex items-center justify-center">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <h3 className="text-2xl font-bold font-poppins">{service.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{service.description}</p>
                    <ul className="space-y-3">
                      {service.items?.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <ChevronRight className="h-5 w-5 mr-2 text-zinc-600 dark:text-zinc-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium">{item.title}</span>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="group bg-transparent" asChild>
                      <Link href="/projeler">
                        {service.title} İnceleyin
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className={isEven ? "mx-auto w-full max-w-[500px] lg:max-w-none" : "order-1 mx-auto w-full max-w-[500px] lg:max-w-none"}>
                    <div className="aspect-video overflow-hidden rounded-xl shadow-lg">
                      <Image
                        src={service.image}
                        width={600}
                        height={400}
                        alt={service.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-12 md:mt-20 bg-muted/30 rounded-lg p-6 md:p-8 text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-4 font-poppins">{services.cta?.title}</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">{services.cta?.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white" asChild>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=Merhaba%2C%20VIERA%20Construction%20hizmetleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp ile Teklif Al
                </a>
              </Button>
              <Button variant="outline" size="lg" className="group bg-transparent" asChild>
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
