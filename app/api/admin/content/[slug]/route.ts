import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { readJsonContent, writeJsonContent } from "@/lib/github"

async function isAuthed() {
  const cookieStore = await cookies()
  return cookieStore.get("viera_admin")?.value === "1"
}

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { slug } = await params
    const result = await readJsonContent(slug)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error reading content:", error)
    return NextResponse.json({ error: "İçerik okunamadı" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { slug } = await params
    const body = await req.json()
    await writeJsonContent(slug, body)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Error writing content:", error)
    return NextResponse.json({ error: "İçerik kaydedilemedi" }, { status: 500 })
  }
}
