import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "content", "projects.json")
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const data = JSON.parse(fileContent)

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Error reading projects:", error)
    return NextResponse.json({ error: "Failed to load projects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const cookieStore = await cookies()
    const authCookie = cookieStore.get("admin-auth")

    if (!authCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { data } = body

    const filePath = path.join(process.cwd(), "content", "projects.json")
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

    return NextResponse.json({
      success: true,
      message: "Projeler başarıyla güncellendi",
    })
  } catch (error) {
    console.error("Error saving projects:", error)
    return NextResponse.json({ error: "Failed to save projects" }, { status: 500 })
  }
}
