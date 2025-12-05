import HomeClient from "./HomeClient"

export const metadata = {
  title: "Ana Sayfa",
  description: "Viera & Alkan Yapı ortaklığı",
}

export default function Page() {
  return (
    <main>
      <HomeClient />
    </main>
  )
}
