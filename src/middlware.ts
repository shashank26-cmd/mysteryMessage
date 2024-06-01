import { NextRequest, NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { URL } from "url";
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  const path = request.nextUrl.pathname;
  if (
    token &&
    (url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/verify") ||
      url.pathname.startsWith("/"))
  ) {
    return NextResponse.redirect(new URL("/dashboard ", request.url));
  }
  if(!token && url.pathname.startsWith('/dashboard')){
    return NextResponse.redirect(new URL('sign-in',
        request.url
    ));
    return NextResponse.next()
  }

  //   const isPublicPath =
  //     path === "/login" || path === "/signup" || path === "/verifyemail";

  //   const token = request.cookies.get("token")?.value || "";

  //   if (isPublicPath && token) {
  //     return NextResponse.redirect(new URL("/", request.nextUrl));
  //   }

  //   if (!isPublicPath && !token) {
  //     return NextResponse.redirect(new URL("/login", request.nextUrl));
  //   }
  return NextResponse.redirect(new URL("/home ", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/sign-in", "/profile", "/login", "/sign-up", "/verifyemail"],
};
