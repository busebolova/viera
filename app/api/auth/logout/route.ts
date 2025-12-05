import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  cookieStore.delete("viera_admin")

  return NextResponse.json({
    success: true,
    message: "Logged out successfully",
  })
}
