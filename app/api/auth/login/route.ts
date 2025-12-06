import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getConfigContent } from "@/lib/content"

export async function POST(req: Request) {
  try {
    const { password } = await req.json()

    // Get password from environment variable or config.json
    let adminPassword = process.env.ADMIN_PASSWORD

    // If no env variable, try config.json
    if (!adminPassword) {
      const config = await getConfigContent()
      adminPassword = config?.password
    }

    // Default fallback password
    if (!adminPassword) {
      adminPassword = "admin123"
    }

    if (password !== adminPassword) {
      return NextResponse.json({ error: "Şifre hatalı" }, { status: 401 })
    }

    const cookieStore = await cookies()
    cookieStore.set("viera_admin", "1", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 saat
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Giriş başarısız" }, { status: 500 })
  }
}
