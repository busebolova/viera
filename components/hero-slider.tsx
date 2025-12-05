"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface HeroSliderProps {
  content?: {
    url?: string
    title?: string
    subtitle?: string
  }
}

export function HeroSlider({ content }: HeroSliderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [typedText, setTypedText] = useState("")
  const fullText = content?.subtitle || "Alkan Yapı & Viera Ortaklığı"

  useEffect(() => {
    if (isLoading) return

    let i = 0
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [isLoading, fullText])

  return (
    <section className="relative w-full h-[70vh] overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-zinc-900">
          <div className="w-12 h-12 rounded-full border-4 border-zinc-300 border-t-zinc-600 animate-spin"></div>
        </div>
      )}

      <div className="absolute inset-0 bg-black/40 z-10" />
      <video
        ref={videoRef}
        src={content?.url || "https://cdn.pixabay.com/video/2020/06/23/42926-434300944_large.mp4"}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        onLoadedData={() => setIsLoading(false)}
        preload="auto"
      />

      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="container px-4 md:px-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 drop-shadow-lg">
            {content?.title || "VIERA"}
          </h1>
          <p className="text-xl md:text-2xl font-medium mb-6 drop-shadow-lg h-8">
            {typedText}
            <span className="animate-pulse">|</span>
          </p>
          <p className="max-w-[600px] mx-auto text-white/90 mb-8 drop-shadow">
            60+ yıllık tecrübemizle İstanbul'un prestijli projelerinde fark yaratıyoruz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="btn-standard shadow-lg bg-white text-black hover:bg-white/90 dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-600"
              asChild
            >
              <Link href="/hizmetlerimiz">Hizmetlerimiz</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="btn-standard shadow-lg text-white bg-transparent border-white hover:bg-white/10 dark:border-white dark:text-white dark:hover:bg-zinc-700"
              asChild
            >
              <Link href="/#contact">İletişime Geçin</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-5 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none"></div>
    </section>
  )
}
