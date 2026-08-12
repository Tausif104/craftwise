import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const ADMIN_PATH_PREFIXES = ["/dashboard/blog/edit-blog"];
const AUTH_COOKIE_NAMES = [
  "authjs.session-token",
  "__Secure-authjs.session-token",
  "authjs.callback-url",
  "__Secure-authjs.callback-url",
  "authjs.csrf-token",
  "__Host-authjs.csrf-token",
];

export default async function proxy(req) {
  const { pathname } = req.nextUrl;
  const localizedPrefix = routing.locales.find(
    (locale) =>
      pathname === `/${locale}/dashboard` ||
      pathname.startsWith(`/${locale}/dashboard/`) ||
      pathname === `/${locale}/api` ||
      pathname.startsWith(`/${locale}/api/`) ||
      pathname === `/${locale}/login` ||
      pathname === `/${locale}/register`
  );

  if (localizedPrefix) {
    const redirectedPath = pathname.replace(`/${localizedPrefix}`, "") || "/";
    const targetPath =
      redirectedPath === "/" ? "/dashboard" : redirectedPath;
    const url = new URL(targetPath, req.url);
    url.search = req.nextUrl.search;
    return NextResponse.redirect(url);
  }

  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/api")
  ) {
    const isAuthPage =
      pathname === "/login" ||
      pathname.startsWith("/login/") ||
      pathname === "/register" ||
      pathname.startsWith("/register/");

    if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
      const token = await getToken({
        req,
        secret: process.env.AUTH_SECRET,
      });

      const hasAuthCookies = AUTH_COOKIE_NAMES.some((name) =>
        req.cookies.has(name)
      );

      if (!token && hasAuthCookies) {
        const response = NextResponse.next();

        for (const cookieName of AUTH_COOKIE_NAMES) {
          response.cookies.set(cookieName, "", {
            path: "/",
            expires: new Date(0),
          });
        }

        return response;
      }

      if (!token) {
        return NextResponse.next();
      }

      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (pathname.startsWith("/api")) {
      return NextResponse.next();
    }

    const token = await getToken({
      req,
      secret: process.env.AUTH_SECRET,
    });

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (
      !isAuthPage &&
      ADMIN_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix)) &&
      token.role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/dashboard/blog", req.url));
    }

    return NextResponse.next();
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!_next|_vercel|favicon.ico|images|fonts|icons|.*\\..*).*)",
  ],
};
