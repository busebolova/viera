/**
 * Default Content - Single Source of Truth
 * All content types and default values are defined here
 * Main content is stored in /content/*.json files
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface HomeContent {
  video: {
    url: string
    title: string
    subtitle: string
  }
  experience: {
    title: string
    description: string
  }
  about: {
    badge: string
    title: string
    description: string
    certification: {
      title: string
      description: string
    }
    projects: {
      title: string
      description: string
    }
    image: string
  }
}

export interface AboutContent {
  title: string
  description: string
  heroImage: string
  founder: {
    name: string
    role: string
    bio: string
  }
  mission: string
  vision: string
}

export interface ContactContent {
  pageTitle: string
  pageDescription: string
  heroImage: string
  address: string
  phone: string
  mobile: string
  email: string
  fax: string
  authorized: string
  hours: string
  whatsapp: string
}

export interface ServiceItem {
  title: string
  description: string
}

export interface Service {
  id: string
  icon: string
  title: string
  description: string
  image: string
  items: ServiceItem[]
}

export interface ServicesContent {
  hero: {
    title: string
    subtitle: string
    image: string
  }
  intro: {
    badge: string
    title: string
    description: string
  }
  services: Service[]
  cta: {
    title: string
    description: string
  }
}

export interface Project {
  id: string
  title: string
  description: string
  fullDescription?: string
  details: string
  year: string
  status?: string
  image: string
  images?: string[] // Gallery images
  location?: string
  area?: string
  features?: string[]
}

export interface LegacyProject {
  title: string
  location: string
  details: string
}

export interface ProjectsContent {
  completed: Project[]
  ongoing: Project[]
  upcoming: Project[]
  legacy?: LegacyProject[]
  stats?: {
    totalProjects: string
    since: string
    note: string
  }
}

export interface ConfigContent {
  password: string
}

export interface SiteSettings {
  siteName: string
  siteDescription: string
  logo: string
  darkLogo: string
  favicon: string
}

// ============================================
// DEFAULT CONTENT VALUES
// ============================================

export const defaultContent = {
  home: {
    video: {
      url: "https://cdn.pixabay.com/video/2020/06/23/42926-434300944_large.mp4",
      title: "ALKAN YAPI",
      subtitle: "& VIERA",
    },
    experience: {
      title: "60+ Yıllık Tecrübe",
      description:
        "Kurucumuz Servet Alkan'ın temellerini attığı firmamız, köklü geçmişinden aldığı güçle hizmet vermektedir.",
    },
    about: {
      badge: "Hakkımızda",
      title: "Firma Geçmişimiz",
      description:
        "Kurucumuz Servet Alkan'ın temellerini attığı firmamız, 60 yılı aşkın deneyimi ve köklü geçmişinden aldığı güçle konut ve iş yeri üretimine aralıksız devam etmektedir.",
      certification: {
        title: "Müteahhitlik Belgemiz",
        description: "Firmamız D sınıfı Müteahhitlik Belgesine sahiptir.",
      },
      projects: {
        title: "Projelerimiz",
        description: "60 yılı aşkın sürede sayısız proje başarıyla tamamlanmıştır.",
      },
      image: "/project-1.png",
    },
  } as HomeContent,

  about: {
    title: "Hakkımızda",
    description:
      "Kurucumuz Servet Alkan'ın temellerini attığı firmamız, 60 yılı aşkın deneyimi ve köklü geçmişinden aldığı güçle konut ve iş yeri üretimine aralıksız devam etmektedir.",
    heroImage: "/project-1.png",
    founder: {
      name: "Servet Alkan",
      role: "Kurucu",
      bio: "60 yılı aşkın tecrübesiyle inşaat sektörünün güvenilir isimlerinden biri.",
    },
    mission: "Çağın gereksinimlerine uygun, estetik ve fonksiyonel yapılar inşa etmek",
    vision: "Türkiye'nin en güvenilir inşaat firmalarından biri olmak",
  } as AboutContent,

  contact: {
    pageTitle: "İletişim",
    pageDescription: "Projeleriniz için bizimle iletişime geçin.",
    heroImage: "/project-1.png",
    address: "Altunizade Mah. Ord. Prof Fahrettin Kerim Gökay Cad. No7/8 Üsküdar - İstanbul",
    phone: "0216 391 49 40",
    mobile: "0533 479 83 87",
    email: "info@alkanyapi.com.tr",
    fax: "0216 310 90 74",
    authorized: "Erdem Alkan",
    hours: "Pazartesi - Cuma: 09:00 - 18:00",
    whatsapp: "905334798387",
  } as ContactContent,

  projects: {
    completed: [],
    ongoing: [],
    upcoming: [],
    legacy: [],
    stats: {
      totalProjects: "100+",
      since: "1965",
      note: "1965'ten bu yana 100'den fazla bitirilmiş proje",
    },
  } as ProjectsContent,

  services: {
    hero: {
      title: "Hizmetlerimiz",
      subtitle: "60+ yıllık tecrübemizle modern yaşam alanları inşa ediyoruz.",
      image: "/project-1.png",
    },
    intro: {
      badge: "Uzmanlık Alanlarımız",
      title: "Sunduğumuz Hizmetler",
      description: "60 yılı aşkın süredir inşaat sektöründe edindiğimiz tecrübeyle modern ve kaliteli projeler üretiyoruz.",
    },
    services: [
      {
        id: "konut",
        icon: "Home",
        title: "Konut Projeleri",
        description: "Modern yaşam standartlarına uygun konut projeleri geliştiriyoruz.",
        image: "/project-1.png",
        items: [
          { title: "Lüks Apartman Kompleksleri", description: "Modern mimarisi ve sosyal olanaklarıyla" },
          { title: "Rezidans Projeleri", description: "Premium hizmet anlayışıyla donatılmış" },
          { title: "Villa ve Müstakil Konutlar", description: "Özel yaşam alanları için özel tasarımlar" },
        ],
      },
      {
        id: "ticari",
        icon: "Building",
        title: "Ticari Projeler",
        description: "Fonksiyonel ve prestijli ticari binalar inşa ediyoruz.",
        image: "/project-2.png",
        items: [
          { title: "İş Merkezleri ve Plazalar", description: "Kurumsal kimliğe uygun prestijli ofis alanları" },
          { title: "Alışveriş Kompleksleri", description: "Modern perakende ve eğlence merkezleri" },
          { title: "Otel ve Turizm Tesisleri", description: "Konuk memnuniyeti odaklı konaklama projeleri" },
        ],
      },
      {
        id: "karma",
        icon: "Landmark",
        title: "Karma Kullanımlı Projeler",
        description: "Yaşam, iş ve alışveriş alanlarını bir araya getiren entegre yaşam merkezleri tasarlıyoruz.",
        image: "/project-3.png",
        items: [
          { title: "Rezidans-Ofis Kompleksleri", description: "Yaşam ve iş alanlarını entegre eden projeler" },
          { title: "Karma Kullanım Alışveriş Merkezleri", description: "Ticaret, eğlence ve konut konseptleri" },
          { title: "Yerleşke Projeleri", description: "Bütünleşik şehir içinde şehir konseptleri" },
        ],
      },
    ],
    cta: {
      title: "Hayalinizdeki Projeyi Birlikte Gerçekleştirelim",
      description: "60+ yıllık tecrübemiz ve uzman ekibimizle projelerinizi hayata geçirmek için hazırız.",
    },
  } as ServicesContent,

  config: {
    password: "admin123",
  } as ConfigContent,

  settings: {
    siteName: "VIERA - Alkan Yapı & Viera Ortaklığı",
    siteDescription: "60+ yıllık tecrübe ile İstanbul'da güvenilir inşaat firması",
    logo: "/logo.png",
    darkLogo: "/darklogo.png",
    favicon: "/favicon.ico",
  } as SiteSettings,
}

export type ContentKey = keyof typeof defaultContent
export type ContentType<K extends ContentKey> = typeof defaultContent[K]
