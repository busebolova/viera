import Image from "next/image"
import { MapPin, Phone, Mail } from "lucide-react"
import { ContactForm } from "@/components/contact-form"

export const metadata = {
  title: "İletişim - Bize Ulaşın | VIERA - Alkan Yapı & Viera Ortaklığı",
  description:
    "VIERA - Alkan Yapı & Viera Ortaklığı iletişim bilgileri. Adres: Altunizade Mah. Ord. Prof Fahrettin Kerim Gökay Cad. No7/8 Üsküdar/İstanbul. Tel: 0216 391 4940, Cep: 0536 436 4242. Proje danışmanlığı ve teklif için bize ulaşın.",
  keywords: [
    "VIERA iletişim",
    "Alkan Yapı telefon",
    "Üsküdar inşaat firması adres",
    "Altunizade inşaat",
    "inşaat firması iletişim",
    "proje teklifi",
    "müteahhit iletişim",
    "inşaat danışmanlık",
  ],
  openGraph: {
    title: "İletişim | VIERA - Alkan Yapı & Viera Ortaklığı",
    description: "Üsküdar Altunizade'de hizmetinizdeyiz. Proje danışmanlığı ve teklif için iletişime geçin.",
    type: "website",
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen pb-16 md:pb-0">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src="/modern-office-building.png"
          alt="VIERA İletişim"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">İletişim</h1>
              <p className="text-xl text-white/80">
                Sorularınız veya projeleriniz için bizimle iletişime geçebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">İletişim Formu</h2>
                <p className="text-muted-foreground">
                  Aşağıdaki formu doldurarak bize WhatsApp üzerinden mesaj gönderebilirsiniz.
                </p>
              </div>
              <ContactForm />
            </div>
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">İletişim Bilgileri</h2>
                <p className="text-muted-foreground">Aşağıdaki iletişim bilgilerinden bize ulaşabilirsiniz.</p>
              </div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 mr-4">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Telefon</h3>
                    <p className="text-muted-foreground">0216 391 4940</p>
                    <p className="text-muted-foreground">0536 436 4242</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 mr-4">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">E-posta</h3>
                    <p className="text-muted-foreground">info@viera.com.tr</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 mr-4">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Adres</h3>
                    <p className="text-muted-foreground">
                      Altunizade Mah. Ord. Prof Fahrettin Kerim Gökay Cad. No7/8 Üsküdar/ İstanbul
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 mr-4">
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
                      className="h-5 w-5"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Yetkili Kişi</h3>
                    <p className="text-muted-foreground">Hasan ALKAN</p>
                  </div>
                </div>
              </div>
              <div className="aspect-video overflow-hidden rounded-xl border shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.4725!2d29.0238!3d41.0228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAxJzIyLjQiTiAyOcKwMDEnMjUuNyJF!5e0!3m2!1str!2str!4v1620000000000!5m2!1str!2str"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
