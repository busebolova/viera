import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    const configPath = path.join(process.cwd(), "content", "config.json")
    const configData = JSON.parse(fs.readFileSync(configPath, "utf-8"))
    const adminPassword = configData.password

    // Simple authentication check
    if (password === adminPassword) {
      const response = NextResponse.json({
        success: true,
        message: "Giriş başarılı",
      })

      // Set auth cookie
      response.cookies.set("admin-auth", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      })

      return response
    }

    return NextResponse.json({ error: "Geçersiz şifre" }, { status: 401 })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Giriş başarısız" }, { status: 500 })
  }
}
