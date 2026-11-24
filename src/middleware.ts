import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("grandeur_admin_session")?.value;

  // 1. Allow login page and login API without session check
  if (pathname === "/admin/login" || pathname === "/api/admin/auth/login") {
    if (token && pathname === "/admin/login") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // 2. Protect all Admin UI routes: /admin, /admin/dashboard, /admin/projects, etc.
  if (pathname.startsWith("/admin")) {
    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // 3. Protect all Admin API routes: /api/admin/*
  if (pathname.startsWith("/api/admin")) {
    const authHeader = request.headers.get("Authorization");
    const hasBearer = authHeader?.startsWith("Bearer ");

    if (!token && !hasBearer) {
      return NextResponse.json(
        { error: "Unauthorized access: Admin session required" },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
