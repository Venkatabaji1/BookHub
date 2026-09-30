import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("bookhub_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/Home/:path*",
    "/books/:path*",
    "/bookshelves/:path*",
    "/shelves/:path*",
    "/categories/:path*",
    "/about/:path*",
  ],
};