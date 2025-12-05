import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  })

  // Clear auth cookie
  response.cookies.delete("admin-auth")

  return response
}
