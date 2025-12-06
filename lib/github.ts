/**
 * GitHub API Integration for CMS
 * Reads and writes JSON files to GitHub repository
 * Falls back to default content when GitHub is not configured
 */

import { defaultContent, type ContentKey } from "./default-content"

// Environment variables
const OWNER = process.env.GITHUB_OWNER || ""
const REPO = process.env.GITHUB_REPO || ""
const BRANCH = process.env.GITHUB_BRANCH || "main"
const TOKEN = process.env.GITHUB_TOKEN || ""

const API_BASE = `https://api.github.com/repos/${OWNER}/${REPO}/contents`

/**
 * Check if GitHub is properly configured
 */
export function isGitHubConfigured(): boolean {
  return !!(TOKEN && OWNER && REPO)
}

/**
 * Make authenticated request to GitHub API
 */
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

/**
 * Get content from GitHub (with fallback to defaults)
 */
export async function getGithubContent<T>(slug: string): Promise<T> {
  const fallbackData = defaultContent[slug as ContentKey] as T

  if (!isGitHubConfigured()) {
    console.log(`[GitHub] Not configured, using default content for ${slug}`)
    return fallbackData
  }

  try {
    const data = await request<{
      content: string
      encoding: string
      sha: string
    }>(`content/${slug}.json?ref=${BRANCH}`)

    const decoded = Buffer.from(data.content, "base64").toString("utf8")
    return JSON.parse(decoded) as T
  } catch (error) {
    console.log(`[GitHub] Error reading ${slug}, using default:`, error)
    return fallbackData
  }
}

/**
 * Read JSON content with SHA (for updates)
 */
export async function readJsonContent<T>(slug: string): Promise<{ data: T; sha: string | null }> {
  const fallbackData = defaultContent[slug as ContentKey] as T

  if (!isGitHubConfigured()) {
    console.log(`[GitHub] Not configured, using default content for ${slug}`)
    return { data: fallbackData, sha: null }
  }

  try {
    const response = await request<{
      content: string
      encoding: string
      sha: string
    }>(`content/${slug}.json?ref=${BRANCH}`)

    const decoded = Buffer.from(response.content, "base64").toString("utf8")
    return { data: JSON.parse(decoded) as T, sha: response.sha }
  } catch (error) {
    console.log(`[GitHub] Error reading ${slug}, using default:`, error)
    return { data: fallbackData, sha: null }
  }
}

/**
 * Write JSON content to GitHub
 */
export async function writeJsonContent<T>(slug: string, json: T): Promise<{ success: boolean; sha?: string }> {
  if (!isGitHubConfigured()) {
    throw new Error(
      "GitHub not configured. Set GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO environment variables."
    )
  }

  // Get current SHA if file exists
  let currentSha: string | null = null
  try {
    const current = await request<{ sha: string }>(`content/${slug}.json?ref=${BRANCH}`)
    currentSha = current.sha
  } catch {
    // File doesn't exist yet, that's okay
    console.log(`[GitHub] File content/${slug}.json doesn't exist yet, will create it`)
  }

  const contentString = JSON.stringify(json, null, 2)
  const base64Content = Buffer.from(contentString, "utf8").toString("base64")

  const response = await request<{ content: { sha: string } }>(`content/${slug}.json`, {
    method: "PUT",
    body: JSON.stringify({
      message: `Update ${slug}.json from admin panel`,
      content: base64Content,
      ...(currentSha && { sha: currentSha }),
      branch: BRANCH,
    }),
  })

  return { success: true, sha: response.content?.sha }
}
