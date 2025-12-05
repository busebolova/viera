import { Buffer, type BufferEncoding } from "buffer"
import { defaultContent } from "@/lib/default-content"

const OWNER = process.env.GITHUB_OWNER || ""
const REPO = process.env.GITHUB_REPO || ""
const BRANCH = process.env.GITHUB_BRANCH || "main"
const TOKEN = process.env.GITHUB_TOKEN || ""

const API_BASE = `https://api.github.com/repos/${OWNER}/${REPO}/contents`

function isGitHubConfigured(): boolean {
  return !!(TOKEN && OWNER && REPO)
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!isGitHubConfigured()) {
    throw new Error("GitHub not configured")
  }

  const res = await fetch(`${API_BASE}/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "viera-admin",
      Accept: "application/vnd.github.v3+json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  })

  if (!res.ok) {
    const text = await res.text()
    console.error("GitHub API error", res.status, text)
    throw new Error(`GitHub API error: ${res.status}`)
  }

  return res.json()
}

export async function getGithubContent(slug: string) {
  const fallbackData = defaultContent[slug as keyof typeof defaultContent]

  if (!isGitHubConfigured()) {
    return fallbackData
  }

  try {
    const data = await request<{
      content: string
      encoding: string
      sha: string
    }>(`content/${slug}.json?ref=${BRANCH}`)

    const decoded = Buffer.from(data.content, data.encoding as BufferEncoding).toString("utf8")
    return JSON.parse(decoded)
  } catch (error) {
    console.log(`[v0] Error reading from GitHub for ${slug}:`, error)
    return fallbackData
  }
}

export async function readJsonContent(slug: string) {
  const fallbackData = defaultContent[slug as keyof typeof defaultContent]

  if (!isGitHubConfigured()) {
    console.log(`[v0] GitHub not configured, using default content for ${slug}`)
    return { data: fallbackData, sha: null }
  }

  try {
    const data = await request<{
      content: string
      encoding: string
      sha: string
    }>(`content/${slug}.json?ref=${BRANCH}`)

    const decoded = Buffer.from(data.content, data.encoding as BufferEncoding).toString("utf8")
    return { data: JSON.parse(decoded), sha: data.sha }
  } catch (error) {
    console.log(`[v0] Error reading from GitHub, using default content for ${slug}:`, error)
    return { data: fallbackData, sha: null }
  }
}

export async function writeJsonContent(slug: string, json: any) {
  if (!isGitHubConfigured()) {
    throw new Error(
      "GitHub not configured. Please set GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO environment variables.",
    )
  }

  // First get current sha
  let currentSha: string | null = null
  try {
    const current = await request<{ sha: string }>(`content/${slug}.json?ref=${BRANCH}`)
    currentSha = current.sha
  } catch {
    // File might not exist yet, that's okay
    console.log(`[v0] File content/${slug}.json doesn't exist yet, will create it`)
  }

  const contentString = JSON.stringify(json, null, 2)
  const base64 = Buffer.from(contentString, "utf8").toString("base64")

  return request(`content/${slug}.json`, {
    method: "PUT",
    body: JSON.stringify({
      message: `Update ${slug}.json from admin panel`,
      content: base64,
      ...(currentSha && { sha: currentSha }),
      branch: BRANCH,
    }),
  })
}
