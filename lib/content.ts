import fs from "fs"
import path from "path"
import {
  defaultContent,
  type ContentKey,
  type HomeContent,
  type AboutContent,
  type ContactContent,
  type ServicesContent,
  type ProjectsContent,
  type ConfigContent,
} from "./default-content"

// Re-export types for convenience
export type {
  HomeContent,
  AboutContent,
  ContactContent,
  ServicesContent,
  ProjectsContent,
  ConfigContent,
  ContentKey,
}
export type { Project, LegacyProject, Service, ServiceItem } from "./default-content"

// Content directory path
const CONTENT_DIR = path.join(process.cwd(), "content")

/**
 * Read JSON content from file with fallback to default
 */
export async function getContent<T>(slug: string): Promise<T | null> {
  try {
    const filePath = path.join(CONTENT_DIR, `${slug}.json`)
    
    if (!fs.existsSync(filePath)) {
      // Return default content if available
      const defaultValue = defaultContent[slug as ContentKey]
      if (defaultValue) {
        console.log(`[Content] Using default content for: ${slug}`)
        return defaultValue as T
      }
      console.log(`[Content] File not found: ${filePath}`)
      return null
    }

    const fileContent = fs.readFileSync(filePath, "utf-8")
    return JSON.parse(fileContent) as T
  } catch (error) {
    console.error(`[Content] Error reading ${slug}:`, error)
    // Return default content on error
    const defaultValue = defaultContent[slug as ContentKey]
    return (defaultValue as T) || null
  }
}

/**
 * Write JSON content to file
 */
export async function setContent<T>(slug: string, data: T): Promise<boolean> {
  try {
    // Ensure content directory exists
    if (!fs.existsSync(CONTENT_DIR)) {
      fs.mkdirSync(CONTENT_DIR, { recursive: true })
    }

    const filePath = path.join(CONTENT_DIR, `${slug}.json`)
    const content = JSON.stringify(data, null, 2)
    
    fs.writeFileSync(filePath, content, "utf-8")
    console.log(`[Content] Saved: ${slug}.json`)
    return true
  } catch (error) {
    console.error(`[Content] Error writing ${slug}:`, error)
    return false
  }
}

/**
 * Get all content keys (file names without .json)
 */
export function getContentKeys(): string[] {
  try {
    if (!fs.existsSync(CONTENT_DIR)) {
      return Object.keys(defaultContent)
    }
    const files = fs.readdirSync(CONTENT_DIR)
    return files
      .filter((file) => file.endsWith(".json"))
      .map((file) => file.replace(".json", ""))
  } catch (error) {
    console.error("[Content] Error listing content:", error)
    return Object.keys(defaultContent)
  }
}

/**
 * Check if content file exists
 */
export function contentExists(slug: string): boolean {
  const filePath = path.join(CONTENT_DIR, `${slug}.json`)
  return fs.existsSync(filePath)
}

// ============================================
// Typed Getters - Use these for type safety
// ============================================

export async function getHomeContent(): Promise<HomeContent> {
  const content = await getContent<HomeContent>("home")
  return content || defaultContent.home
}

export async function getAboutContent(): Promise<AboutContent> {
  const content = await getContent<AboutContent>("about")
  return content || defaultContent.about
}

export async function getContactContent(): Promise<ContactContent> {
  const content = await getContent<ContactContent>("contact")
  return content || defaultContent.contact
}

export async function getServicesContent(): Promise<ServicesContent> {
  const content = await getContent<ServicesContent>("services")
  return content || defaultContent.services
}

export async function getProjectsContent(): Promise<ProjectsContent> {
  const content = await getContent<ProjectsContent>("projects")
  return content || defaultContent.projects
}

export async function getConfigContent(): Promise<ConfigContent> {
  const content = await getContent<ConfigContent>("config")
  return content || defaultContent.config
}
