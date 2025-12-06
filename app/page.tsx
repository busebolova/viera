import { getHomeContent, getProjectsContent, getContactContent } from "@/lib/content"
import { HomePage } from "./home-page"

export const metadata = {
  title: "VIERA - Alkan Yapı & Viera Ortaklığı | Üsküdar İnşaat Firması - 60+ Yıllık Tecrübe",
  description:
    "VIERA - Alkan Yapı & Viera Ortaklığı, Üsküdar merkezli 60 yılı aşkın deneyimle konut projeleri, ticari binalar ve karma kullanımlı yapı projeleri. İstanbul'un güvenilir inşaat ve müteahhitlik firması.",
}

// Force dynamic rendering to always get fresh content
export const dynamic = "force-dynamic"

export default async function Page() {
  // Server-side data fetching - no database needed
  const [homeContent, projectsContent, contactContent] = await Promise.all([
    getHomeContent(),
    getProjectsContent(),
    getContactContent(),
  ])

  return (
    <HomePage
      content={homeContent}
      projects={projectsContent}
      contact={contactContent}
    />
  )
}
