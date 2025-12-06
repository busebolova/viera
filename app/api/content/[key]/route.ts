import { type NextRequest, NextResponse } from "next/server"
import { getContent, setContent } from "@/lib/content"

// GET - Read content from JSON file
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params
    const data = await getContent(key)

    if (!data) {
      return NextResponse.json(
        { error: "Content not found", key },
        { status: 404 }
      )
    }

    return NextResponse.json({ data, success: true })
  } catch (error) {
    console.error("[API] Error reading content:", error)
    return NextResponse.json(
      { error: "Failed to read content" },
      { status: 500 }
    )
  }
}

// POST - Write content to JSON file (for local development)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params
    const body = await request.json()

    const success = await setContent(key, body.data || body)

    if (!success) {
      return NextResponse.json(
        { error: "Failed to write content" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, message: "Content saved" })
  } catch (error) {
    console.error("[API] Error writing content:", error)
    return NextResponse.json(
      { error: "Failed to write content" },
      { status: 500 }
    )
  }
}
