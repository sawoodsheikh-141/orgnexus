import { NextResponse, type NextRequest } from "next/server";

/**
 * Lightweight edge-safe gate: just checks the session cookie EXISTS.
 * Full verification (signature, revocation, user status) happens in
 * getCurrentUser() via the Admin SDK, which can't run on the edge
 * runtime — so every protected page/layout must also call
 * requireUser()/requirePermission() itself. This middleware only
 * stops unauthenticated users from ever reaching a page and prevents
 * a flash of protected UI before that server-side check runs.
 */
const PUBLIC_PATHS = ["/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const hasSession = request.cookies.has("__session");
  if (!hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static, _next/image (Next internals)
     * - favicon.ico, public assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp)$).*)",
  ],
};
