import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // ── decode JWT payload without a library ──────────────────
  // Next.js middleware runs on the Edge — no Node crypto available.
  // We only need the payload claims (role), not signature verification.
  // Real verification still happens in Express on every API call.
  let user = null;
  if (token) {
    try {
      const payloadBase64 = token.split(".")[1];
      // atob is available in the Edge runtime
      const json = atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/"));
      user = JSON.parse(json); // { userId, name, email, roleName, roleId, exp, iat }
    } catch {
      user = null;
    }
  }

  const isLoggedIn = !!user;
  const isAdmin = isLoggedIn && (user.roleName === "Admin" || user.roleId === 1);
  const isCustomer = isLoggedIn && !isAdmin;

  // ── route groups ──────────────────────────────────────────
  const isAdminRoute = pathname.startsWith("/admin");
  const isCustomerRoute = pathname.startsWith("/customer");
  const isAuthRoute =
    pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup");

  // ── 1. /admin/** → must be logged in AND be Admin ─────────
  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    if (!isAdmin) {
      // Logged in as Customer — send them to their own dashboard
      return NextResponse.redirect(new URL("/customer/dashboard", request.url));
    }
  }

  // ── 2. /customer/** → must be logged in ───────────────────
  if (isCustomerRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    if (isAdmin) {
      // Admin trying to access customer pages → send to admin panel
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  // ── 3. /auth/** → already logged in, skip login/signup ────
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(
      new URL(isAdmin ? "/admin" : "/customer/dashboard", request.url)
    );
  }

  return NextResponse.next();
}

// ── which routes this middleware applies to ───────────────
export const config = {
  matcher: [
    "/admin/:path*",
    "/customer/:path*",
    "/auth/login",
    "/auth/signup",
  ],
};