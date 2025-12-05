/**
 * Check if the user is logged in
 * @returns boolean indicating if the user is logged in
 */
export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("adminLoggedIn") === "true"
}

/**
 * Log in the user
 * @param email User's email
 * @param password User's password
 * @returns boolean indicating if login was successful
 */
export function login(email: string, password: string): boolean {
  // This is a simplified authentication
  // In a real application, you would validate credentials against a database
  if (email === "admin@example.com" && password === "password") {
    localStorage.setItem("adminLoggedIn", "true")
    return true
  }
  return false
}

/**
 * Log out the user
 */
export function logout(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("adminLoggedIn")
  // Redirect to login page after logout
  window.location.href = "/admin/login"
}

/**
 * Get the current user
 * @returns Object containing user information or null if not logged in
 */
export function getCurrentUser() {
  if (!isLoggedIn()) return null

  // In a real application, you would fetch user data from a database or JWT
  return {
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  }
}
