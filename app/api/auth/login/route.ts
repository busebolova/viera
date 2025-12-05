import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  try {
    const { password } = await req.json()

    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "ADMIN_PASSWORD tanımlı değil" }, { status: 500 })
    }

    if (password !== process.env.ADMIN_PASSWORD) {
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
