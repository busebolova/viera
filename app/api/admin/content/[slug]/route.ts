import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getContent, setContent } from "@/lib/content"

// GitHub API configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER
const GITHUB_REPO = process.env.GITHUB_REPO
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main"

// Check if GitHub is configured
function isGitHubConfigured(): boolean {
  return !!(GITHUB_TOKEN && GITHUB_OWNER && GITHUB_REPO)
}

// Check authentication
async function isAuthed(): Promise<boolean> {
  const cookieStore = await cookies()
  return cookieStore.get("viera_admin")?.value === "1"
}

// GET - Read content
export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { slug } = await params
    
    // Try GitHub first if configured
    if (isGitHubConfigured()) {
      try {
        const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/content/${slug}.json?ref=${GITHUB_BRANCH}`
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
          },
          cache: "no-store",
        })

        if (response.ok) {
          const githubData = await response.json()
          const content = Buffer.from(githubData.content, "base64").toString("utf-8")
          return NextResponse.json({
            data: JSON.parse(content),
            sha: githubData.sha,
            source: "github",
          })
        }
      } catch (githubError) {
        console.log("[Admin] GitHub read failed, falling back to local:", githubError)
      }
    }

    // Fallback to local files
    const data = await getContent(slug)
    
    if (!data) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 })
    }

    return NextResponse.json({ data, source: "local" })
  } catch (error) {
    console.error("[Admin] Error reading content:", error)
    return NextResponse.json({ error: "İçerik okunamadı" }, { status: 500 })
  }
}

// PUT - Write content
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { slug } = await params
    const body = await req.json()
    const data = body.data || body

    // Try GitHub first if configured
    if (isGitHubConfigured()) {
      try {
        // Get current SHA
        let currentSha: string | null = null
        const getUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/content/${slug}.json?ref=${GITHUB_BRANCH}`
        
        try {
          const getResponse = await fetch(getUrl, {
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

        // Write to GitHub
        const content = Buffer.from(JSON.stringify(data, null, 2)).toString("base64")
        const putUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/content/${slug}.json`
        
        const putResponse = await fetch(putUrl, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `Update ${slug}.json from admin panel`,
            content,
            ...(currentSha && { sha: currentSha }),
            branch: GITHUB_BRANCH,
          }),
        })

        if (putResponse.ok) {
          const putData = await putResponse.json()
          return NextResponse.json({
            success: true,
            message: "GitHub'a kaydedildi",
            sha: putData.content?.sha,
            source: "github",
          })
        }
      } catch (githubError) {
        console.log("[Admin] GitHub write failed, falling back to local:", githubError)
      }
    }

    // Fallback to local files
    const success = await setContent(slug, data)
    
    if (!success) {
      return NextResponse.json({ error: "Kaydetme başarısız" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Lokal dosyaya kaydedildi",
      source: "local",
    })
  } catch (error) {
    console.error("[Admin] Error writing content:", error)
    return NextResponse.json({ error: "İçerik kaydedilemedi" }, { status: 500 })
  }
}

