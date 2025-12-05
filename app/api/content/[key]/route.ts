import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { defaultContent } from "@/lib/default-content"

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER || "your-username"
const GITHUB_REPO = process.env.GITHUB_REPO || "your-repo"
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main"

interface GitHubFileResponse {
  content: string
  sha: string
  name: string
  path: string
}

// GET - Read content from GitHub or local file system
export async function GET(request: NextRequest, { params }: { params: { key: string } }) {
  try {
    const { key } = params

    const defaultData = defaultContent[key as keyof typeof defaultContent]

    const filePath = path.join(process.cwd(), "content", `${key}.json`)

    // Check if local file exists
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8")
      const parsedContent = JSON.parse(content)

      return NextResponse.json({
        data: parsedContent,
        success: true,
      })
    }

    if (!GITHUB_TOKEN) {
      console.log(`[v0] Using default content for ${key}`)
      return NextResponse.json({
        data: defaultData,
        success: true,
      })
    }

    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/content/${key}.json`

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      if (response.status === 404) {
        console.log(`[v0] File not found on GitHub, using default content for ${key}`)
        return NextResponse.json({
          data: defaultData,
          success: true,
        })
      }
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const data: GitHubFileResponse = await response.json()

    const content = Buffer.from(data.content, "base64").toString("utf-8")
    const parsedContent = JSON.parse(content)

    return NextResponse.json({
      data: parsedContent,
      sha: data.sha,
    })
  } catch (error) {
    console.error("[v0] Error fetching content:", error)
    const { key } = params
    const defaultData = defaultContent[key as keyof typeof defaultContent]

    if (defaultData) {
      console.log(`[v0] Error occurred, using default content for ${key}`)
      return NextResponse.json({
        data: defaultData,
        success: true,
      })
    }

    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
  }
}

// POST - Write content to GitHub or local file system
export async function POST(request: NextRequest, { params }: { params: { key: string } }) {
  try {
    const { key } = params
    const body = await request.json()
    const { data, sha } = body

    const filePath = path.join(process.cwd(), "content", `${key}.json`)

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8")

    if (GITHUB_TOKEN) {
      const content = Buffer.from(JSON.stringify(data, null, 2)).toString("base64")

      const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/content/${key}.json`

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Update ${key}.json from admin panel`,
          content,
          sha,
          branch: GITHUB_BRANCH,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("GitHub API error:", errorData)
        throw new Error(`GitHub API error: ${response.status}`)
      }
    }

    return NextResponse.json({
      success: true,
      message: "Content updated successfully",
    })
  } catch (error) {
    console.error("[v0] Error updating content:", error)
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 })
  }
}
