import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const cookieStore = await cookies()
    const authCookie = cookieStore.get("admin-auth")

    if (!authCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { oldPassword, newPassword } = body

    if (!newPassword || newPassword.length < 4) {
      return NextResponse.json({ error: "Yeni şifre en az 4 karakter olmalıdır" }, { status: 400 })
    }

    const configPath = path.join(process.cwd(), "content", "config.json")
    const configData = JSON.parse(fs.readFileSync(configPath, "utf-8"))

    // Verify old password
    if (configData.password !== oldPassword) {
      return NextResponse.json({ error: "Mevcut şifre yanlış" }, { status: 401 })
    }

    // Update password
    configData.password = newPassword
    fs.writeFileSync(configPath, JSON.stringify(configData, null, 2))

    return NextResponse.json({
      success: true,
      message: "Şifre başarıyla güncellendi",
    })
  } catch (error) {
    console.error("Password update error:", error)
    return NextResponse.json({ error: "Şifre güncellenemedi" }, { status: 500 })
  }
}
