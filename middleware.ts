import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookies) => {
          cookies.forEach(({ name, value }) => {
            res.cookies.set(name, value);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthPage = req.nextUrl.pathname.startsWith("/auth/");
  const canVisitWithoutAuth =
    req.nextUrl.pathname.startsWith("/auth/login") ||
    req.nextUrl.pathname.startsWith("/auth/sign-up") ||
    req.nextUrl.pathname.startsWith("/auth/forgot-password") ||
    req.nextUrl.pathname.startsWith("/auth/update-password") ||
    req.nextUrl.pathname.startsWith("/auth/error") ||
    req.nextUrl.pathname.startsWith("/auth/sign-up-success") ||
    req.nextUrl.pathname.startsWith("/auth/confirm");

  if (!user && !canVisitWithoutAuth) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (user && isAuthPage) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
