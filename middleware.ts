import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define which paths are protected (require authentication)
  const isProtectedPath =
    path.includes("/dashboard") ||
    path.includes("/projects") ||
    path.includes("/categories") ||
    path.includes("/builders") ||
    path.includes("/tags") ||
    path.includes("/sections") ||
    path.includes("/blogs") ||
    path.includes("/banners") ||
    path.includes("/enquiries") ||
    path.includes("/admins") ||
    path.includes("/settings")
 
  // Define paths that should redirect logged-in users
  const isAuthPath = path === "/login"

  // Check for /path/edit without ID
  const isEditPathWithoutId = path.endsWith("/edit") && !path.match(/\/edit\/[^/]+$/)

  // Get the token from cookies
  const token = request.cookies.get("auth-token")?.value
  // console.warn("token from middleware", token)
  // If trying to access protected route without token, redirect to login
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If trying to access login while logged in, redirect to dashboard
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // If trying to access /path/edit without ID, redirect to parent path
  if (isEditPathWithoutId) {
    const parentPath = path.replace("/edit", "")
    return NextResponse.redirect(new URL(parentPath, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/projects/:path*",
    "/categories/:path*",
    "/casting-calls/:path*",
    "/builders/:path*",
    "/tags/:path*",
    "/sections/:path*",
    "/blogs/:path*",
    "/banners/:path*",
    "/enquiries/:path*",
    "/admins/:path*",
    "/settings/:path*",
    "/login",
  ],
}

