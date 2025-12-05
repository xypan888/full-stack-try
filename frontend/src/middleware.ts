import { auth } from "@/auth-credential";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const session= await auth();
  const url = req.nextUrl.clone();
  const { pathname } = url;

  function isProtectedRoute(pathname: string) {
    return(
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/profile")
    );
  }
  function isPublicRoute(pathname: string) {
    return pathname.startsWith("/_next") ||
      pathname.startsWith("/favicon.ico") ||
      pathname.startsWith("/robots.txt") ||
      pathname.startsWith("/manifest.json") ||
      pathname.startsWith("/sitemap.xml") ||
      pathname.startsWith("/images") ||
      pathname.startsWith("/videos")
  }

  function isAuthExpired(){
    const now = Math.floor(Date.now() / 1000);
    return session?.expiry && session.expiry < now;
  }
  function redirectToSignIn(){
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  if (url.pathname === "/signin"){
    return NextResponse.next();
  }
  if (url.pathname === "/"){
    return redirectToSignIn();
  }
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  if (isProtectedRoute(pathname)) {
    if (!session) {
      return redirectToSignIn();
    }
  }

  if (isAuthExpired()) {
    return redirectToSignIn();
  }

  return NextResponse.next();


}