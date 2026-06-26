import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Routes that don't require authentication
const PUBLIC_ROUTES = [
  "/",
  "/pricing",
  "/sign-in",
  "/auth/callback",
  "/api",
];

// Routes that start with these prefixes are public
const PUBLIC_PREFIXES = ["/courses", "/api", "/creator"];

// Routes that authenticated users should NOT see
const AUTH_ONLY_ROUTES = ["/sign-in"];

function isPublicRoute(pathname: string): boolean {
  if (PUBLIC_ROUTES.includes(pathname)) return true;
  return PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Do NOT use getSession() — use getUser() for security
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // If user is authenticated
  if (user) {
    // Fetch profile once using maybeSingle() to handle missing rows gracefully
    const { data: profile } = await supabase
      .from("profiles")
      .select("onboarding_completed")
      .eq("id", user.id)
      .maybeSingle();

    const onboardingDone = profile?.onboarding_completed === true;

    // Redirect away from sign-in page
    if (AUTH_ONLY_ROUTES.includes(pathname)) {
      const url = request.nextUrl.clone();
      // If onboarding not done, go to onboarding instead of dashboard
      url.pathname = onboardingDone ? "/dashboard" : "/onboarding";
      return NextResponse.redirect(url);
    }

    // Check onboarding status for protected routes (not onboarding itself)
    if (
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/course-builder")
    ) {
      if (!onboardingDone) {
        const url = request.nextUrl.clone();
        url.pathname = "/onboarding";
        return NextResponse.redirect(url);
      }
    }

    // If user is on onboarding but already completed it, redirect to dashboard
    if (pathname === "/onboarding") {
      if (onboardingDone) {
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
      }
    }
  } else {
    // User is NOT authenticated — onboarding requires auth too
    if (!isPublicRoute(pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = "/sign-in";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
