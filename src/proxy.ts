import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const authRoutes = ["/login", "/sign-up"];
const protectedRoutes = ["/dashboard"];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("better-auth.session_token");

  // Logged-in users hitting auth pages → redirect to dashboard
  if (authRoutes.some((r) => pathname.startsWith(r)) && sessionCookie) {
    return NextResponse.redirect(new URL("/dashboard/workflows", request.url));
  }

  // Unauthenticated users hitting protected pages → redirect to login
  if (protectedRoutes.some((r) => pathname.startsWith(r)) && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/sign-up"],
};
