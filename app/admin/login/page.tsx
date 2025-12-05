"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || "Giriş başarısız")
        setLoading(false)
        return
      }

      router.push("/admin/icerik")
      router.refresh()
    } catch {
      setError("Sunucu hatası, tekrar deneyin.")
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#09090b",
        color: "#fafafa",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "24rem",
          backgroundColor: "#18181b",
          border: "1px solid #27272a",
          borderRadius: "0.75rem",
          padding: "1.5rem",
        }}
      >
        <h1 style={{ fontSize: "1.25rem", fontWeight: 600, textAlign: "center", marginBottom: "1.5rem" }}>
          VIERA Admin Giriş
        </h1>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <label htmlFor="password" style={{ fontSize: "0.875rem", color: "#a1a1aa" }}>
              Şifre
            </label>
            <input
              id="password"
              type="password"
              style={{
                width: "100%",
                borderRadius: "0.375rem",
                backgroundColor: "#09090b",
                border: "1px solid #3f3f46",
                padding: "0.5rem 0.75rem",
                fontSize: "0.875rem",
                color: "#fafafa",
                outline: "none",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p style={{ fontSize: "0.75rem", color: "#f87171" }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              borderRadius: "0.375rem",
              backgroundColor: "#fafafa",
              color: "#09090b",
              fontSize: "0.875rem",
              fontWeight: 500,
              padding: "0.5rem",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
        <p style={{ fontSize: "0.6875rem", color: "#71717a", textAlign: "center", marginTop: "1rem" }}>
          Şifre env:{" "}
          <code style={{ backgroundColor: "#27272a", padding: "0 0.25rem", borderRadius: "0.125rem" }}>
            ADMIN_PASSWORD
          </code>
        </p>
      </div>
    </div>
  )
}
