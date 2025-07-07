import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("🔥 Middleware triggered on path:", pathname);

  // Skip middleware for static files, API auth routes, and other system paths
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/auth/") ||
    pathname.includes("favicon.ico") ||
    pathname.includes("public/") ||
    (pathname.includes(".") && !pathname.includes("/api/"))
  ) {
    console.log("⏭️ Skipping middleware for:", pathname);
    return NextResponse.next();
  }

  try {
    // Use cookies to check authentication status instead of Better Auth API
    const isDev = process.env.NODE_ENV === "development";

    const sessionToken = isDev
      ? request.cookies.get("better-auth.session_token")
      : request.cookies.get("__Secure-better-auth.session_token") ||
        request.cookies.get("better-auth.session_token");
    const isAuthenticated = !!sessionToken;

    console.log("🔍 Auth status:", {
      isAuthenticated: isAuthenticated,
      hasSessionToken: !!sessionToken,
      pathname,
    });

    // Route: /dashboard - check authentication via cookie
    if (pathname.startsWith("/dashboard")) {
      if (!isAuthenticated) {
        console.log("🚫 No session token, redirecting to login");
        return NextResponse.redirect(new URL("/login", request.url));
      }

      // For dashboard routes, we'll validate the session and fillDetails on the server side
      // This will be handled by the page components themselves using better-auth client
      console.log("✅ Session token found, allowing access to dashboard");
      return NextResponse.next();
    }

    // Routes: /login and /register - only accessible if NOT authenticated
    if (pathname === "/login" || pathname === "/register") {
      if (isAuthenticated) {
        console.log("🔄 Already has session token, redirecting to dashboard");
        // We'll let the dashboard page handle the redirect based on fillDetails
        // since we can't easily check fillDetails in edge runtime without Prisma
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      console.log("✅ No session token, access granted to auth pages");
      return NextResponse.next();
    }

    // Route: /register/form - check authentication
    if (pathname === "/register/form") {
      if (!isAuthenticated) {
        console.log("🚫 No session token, redirecting to login");
        return NextResponse.redirect(new URL("/login", request.url));
      }

      // Let the page component handle the fillDetails validation using better-auth client
      console.log("✅ Session token found, access granted to register/form");
      return NextResponse.next();
    }

    // For all other routes, allow access
    console.log("✅ Access granted to other routes");
    return NextResponse.next();
  } catch (error) {
    console.error("❌ Middleware error:", error);

    // If there's an error and we're trying to access protected routes, redirect to login
    if (pathname.startsWith("/dashboard") || pathname === "/register/form") {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/dashboard",
    "/login",
    "/register",
    "/register/form",
  ],
};
