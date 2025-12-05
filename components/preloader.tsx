"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"

export function Preloader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()
  const [firstLoad, setFirstLoad] = useState(true)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const [mounted, setMounted] = useState(false)

  // Sayfa ilk yüklendiğinde preloader'ı göster
  useEffect(() => {
    setMounted(true)

    // Tarayıcı depolamasını kontrol et
    const hasVisited = sessionStorage.getItem("hasVisited")

    // Eğer daha önce ziyaret edilmişse preloader'ı gösterme
    if (hasVisited) {
      setLoading(false)
      setFirstLoad(false)
      return
    }

    // İlk ziyareti kaydet
    sessionStorage.setItem("hasVisited", "true")

    // Preloader'ı göster ve belirli bir süre sonra kaldır
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, []) // Sadece ilk yüklemede çalışsın

  // Yükleme çubuğu animasyonu
  useEffect(() => {
    if (loading && firstLoad) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 1
          return newProgress >= 100 ? 100 : newProgress
        })
      }, 20)

      return () => clearInterval(interval)
    }
  }, [loading, firstLoad])

  // Sayfa değişikliklerinde preloader'ı gösterme
  useEffect(() => {
    setLoading(false)
  }, [pathname])

  if (!loading || !firstLoad || !mounted) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-950 transition-opacity duration-500"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div className="relative w-64 h-64 mb-8 bg-transparent p-4 rounded">
        {!isDark ? (
          <Image
            src="/logo.png"
            alt="VIERA - Alkan Yapı & Viera Ortaklığı Preloader"
            fill
            className="object-contain"
            priority
          />
        ) : (
          <Image
            src="/darklogo.png"
            alt="VIERA - Alkan Yapı & Viera Ortaklığı Preloader"
            fill
            className="object-contain"
            priority
          />
        )}
      </div>
      <div className="w-64 h-1 bg-zinc-800 rounded-full overflow-hidden">
        <div className="h-full bg-white transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="mt-2 text-white/70 text-xs">{progress}%</div>
    </div>
  )
}
