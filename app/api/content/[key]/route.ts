import { type NextRequest, NextResponse } from "next/server"
import { defaultContent } from "@/lib/default-content"

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER || ""
const GITHUB_REPO = process.env.GITHUB_REPO || ""
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main"

interface GitHubFileResponse {
  content: string
  sha: string
  name: string
  path: string
}

export async function GET(request: NextRequest, { params }: { params: { key: string } }) {
  try {
    const { key } = params
    const defaultData = defaultContent[key as keyof typeof defaultContent]

    // If no GitHub token, return default content
    if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
      console.log(`[v0] No GitHub config, using default content for ${key}`)
      return NextResponse.json({
        data: defaultData,
        success: true,
      })
    }

    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/content/${key}.json?ref=${GITHUB_BRANCH}`

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
      success: true,
    })
  } catch (error) {
    console.error("[v0] Error fetching content:", error)
    const { key } = params
    const defaultData = defaultContent[key as keyof typeof defaultContent]

    if (defaultData) {
      return NextResponse.json({
        data: defaultData,
        success: true,
      })
    }

    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { key: string } }) {
  try {
    const { key } = params
    const body = await request.json()
    const { data, sha } = body

    if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
      return NextResponse.json({ error: "GitHub not configured" }, { status: 500 })
    }

    const content = Buffer.from(JSON.stringify(data, null, 2)).toString("base64")
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/content/${key}.json`

    // First get current sha if not provided
    let currentSha = sha
    if (!currentSha) {
      try {
        const getResponse = await fetch(`${url}?ref=${GITHUB_BRANCH}`, {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
          },
        })
        if (getResponse.ok) {
          const getData = await getResponse.json()
          currentSha = getData.sha
        }
      } catch {
        // File might not exist yet
      }
    }

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
        ...(currentSha && { sha: currentSha }),
        branch: GITHUB_BRANCH,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("GitHub API error:", errorData)
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const responseData = await response.json()

    return NextResponse.json({
      success: true,
      message: "Content updated successfully",
      sha: responseData.content.sha,
    })
  } catch (error) {
    console.error("[v0] Error updating content:", error)
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 })
  }
}
