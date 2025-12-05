"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"

interface HeroSliderProps {
  content?: {
    url?: string
    title?: string
    subtitle?: string
  }
}

const typewriterTexts = [
  "Alkan Yapı & Viera İş Birliği",
  "60+ Yıllık Tecrübe",
  "Güven ve Kalite",
  "Modern Yaşam Alanları",
]

const VIDEO_URL = "https://cdn.pixabay.com/video/2020/06/23/42926-434300944_large.mp4"

export function HeroSlider({ content }: HeroSliderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [typedText, setTypedText] = useState("")
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isLoading) return

    const currentFullText = typewriterTexts[textIndex]
    const typingSpeed = isDeleting ? 50 : 100
    const pauseTime = isDeleting ? 500 : 2000

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (typedText.length < currentFullText.length) {
          setTypedText(currentFullText.substring(0, typedText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime)
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(currentFullText.substring(0, typedText.length - 1))
        } else {
          setIsDeleting(false)
          setTextIndex((prev) => (prev + 1) % typewriterTexts.length)
        }
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [isLoading, typedText, textIndex, isDeleting])

  // Handle video load
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.addEventListener("loadeddata", () => setIsLoading(false))
      video.addEventListener("canplay", () => setIsLoading(false))
    }
    // Fallback timer in case video events don't fire
    const timer = setTimeout(() => setIsLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section style={{ position: "relative", width: "100%", height: "80vh", overflow: "hidden" }}>
      {/* Loading Spinner */}
      {isLoading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#18181b",
          }}
        >
          <div
            style={{
              width: "3rem",
              height: "3rem",
              borderRadius: "50%",
              border: "4px solid #d4d4d8",
              borderTopColor: "#52525b",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>
      )}

      {/* Dark Overlay */}
      <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 10 }} />

      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            padding: "0 1rem",
            textAlign: "center",
            color: "white",
          }}
        >
          <div style={{ marginBottom: "1.5rem" }}>
            <h1
              className="font-poppins"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: "700",
                letterSpacing: "-0.02em",
                textShadow: "0 4px 20px rgba(0,0,0,0.5)",
                lineHeight: 1.1,
              }}
            >
              <span style={{ display: "block" }}>ALKAN YAPI</span>
              <span
                style={{ display: "block", fontSize: "0.5em", fontWeight: "400", margin: "0.5rem 0", opacity: 0.8 }}
              >
                &
              </span>
              <span style={{ display: "block", letterSpacing: "0.1em" }}>VIERA</span>
            </h1>
          </div>

          <div
            style={{
              height: "3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.5rem",
            }}
          >
            <p
              className="font-poppins"
              style={{
                fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
                fontWeight: "500",
                textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                borderBottom: "2px solid rgba(255,255,255,0.3)",
                paddingBottom: "0.5rem",
              }}
            >
              {typedText}
              <span
                style={{
                  animation: "blink 1s step-end infinite",
                  marginLeft: "2px",
                }}
              >
                |
              </span>
            </p>
          </div>

          <p
            className="font-poppins"
            style={{
              maxWidth: "700px",
              margin: "0 auto 2.5rem",
              color: "rgba(255,255,255,0.9)",
              textShadow: "0 1px 5px rgba(0,0,0,0.3)",
              fontSize: "1.125rem",
              lineHeight: 1.6,
            }}
          >
            Köklü tecrübemiz ve yenilikçi vizyonumuzla İstanbul'un prestijli lokasyonlarında modern yaşam alanları inşa
            ediyoruz.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/projeler"
              className="font-poppins"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.875rem 2rem",
                backgroundColor: "white",
                color: "#18181b",
                borderRadius: "0.375rem",
                fontWeight: "600",
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease",
              }}
            >
              Projelerimiz
            </Link>
            <Link
              href="/#contact"
              className="font-poppins"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.875rem 2rem",
                backgroundColor: "transparent",
                color: "white",
                border: "2px solid white",
                borderRadius: "0.375rem",
                fontWeight: "600",
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
              }}
            >
              İletişime Geçin
            </Link>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 5,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.3), transparent 30%, transparent 70%, rgba(0,0,0,0.4))",
          pointerEvents: "none",
        }}
      />
    </section>
  )
}
