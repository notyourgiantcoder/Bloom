"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

export default function SignInPage() {
  const pulseRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("error") === "auth_callback_error") {
        return "Google sign-in failed. Please try again.";
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (pulseRef.current) {
        const x = (e.clientX / window.innerWidth) * 20;
        const y = (e.clientY / window.innerHeight) * 20;
        pulseRef.current.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1.0)`;
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleEmailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = getSupabaseBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setGoogleLoading(true);

    try {
      const supabase = getSupabaseBrowserClient();
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (oauthError) {
        setError(oauthError.message);
        setGoogleLoading(false);
      }
      // On success, Supabase redirects the browser — no need to push router
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <main className="flex w-full min-h-screen">
      {/* Left Section (55%) */}
      <section className="w-full lg:w-[55%] flex flex-col justify-center px-margin-mobile lg:px-margin-desktop py-stack-lg relative overflow-hidden bg-surface-container-lowest">
        {/* Bloom Pulse Background */}
        <div
          ref={pulseRef}
          className="absolute w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(123,160,91,0.4)_0%,rgba(45,95,93,0)_70%)] blur-[40px] rounded-full z-0 pointer-events-none top-0 left-0"
          style={{ animation: "pulse-anim 4s linear infinite alternate" }}
        ></div>
        <div className="w-full max-w-[440px] mx-auto z-10 relative">
          {/* Mobile Logo (visible only on mobile) */}
          <div className="lg:hidden mb-stack-lg text-center">
            <span className="font-headline-sm text-headline-sm font-bold text-primary">Bloom</span>
          </div>
          <div className="text-center mb-stack-lg">
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-stack-sm">
              Welcome back.
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Sign in to your Bloom workspace.
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-stack-md bg-error-container text-on-error-container rounded-lg px-4 py-3 font-body-sm text-body-sm border border-error/20">
              {error}
            </div>
          )}

          {/* Google Auth Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading || loading}
            className="w-full flex items-center justify-center gap-3 bg-surface-container-lowest border border-[#E8E0D5] rounded-lg py-3 px-4 mb-stack-lg hover:bg-surface-container-low transition-colors shadow-[0_1px_4px_rgba(26,46,46,0.06)] group disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {googleLoading ? (
              <svg className="w-5 h-5 animate-spin text-primary" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            )}
            <span className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">
              {googleLoading ? "Redirecting…" : "Continue with Google"}
            </span>
          </button>

          <div className="relative flex py-5 items-center mb-stack-lg">
            <div className="flex-grow border-t border-[#E8E0D5]"></div>
            <span className="flex-shrink-0 mx-4 font-label-sm text-label-sm text-outline-variant">or</span>
            <div className="flex-grow border-t border-[#E8E0D5]"></div>
          </div>

          {/* Email / Password Form */}
          <form className="flex flex-col gap-stack-md" onSubmit={handleEmailSignIn}>
            <div className="flex flex-col gap-2">
              <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="email">
                Email
              </label>
              <input
                className="bg-surface-container-lowest border border-[#E8E0D5] rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-outline-variant"
                id="email"
                name="email"
                placeholder="name@example.com"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading || googleLoading}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="password">
                  Password
                </label>
                <Link
                  className="font-label-sm text-label-sm text-primary hover:text-surface-tint transition-colors"
                  href="/auth/forgot-password"
                >
                  Forgot?
                </Link>
              </div>
              <input
                className="bg-surface-container-lowest border border-[#E8E0D5] rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-outline-variant"
                id="password"
                name="password"
                placeholder="••••••••"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading || googleLoading}
              />
            </div>
            <button
              className="mt-stack-sm w-full bg-primary text-on-primary rounded-lg py-3 px-4 font-label-md text-label-md hover:bg-surface-tint focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              type="submit"
              disabled={loading || googleLoading}
            >
              {loading && (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              )}
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="mt-stack-lg text-center font-body-md text-body-md text-on-surface-variant">
            Don&apos;t have an account?{" "}
            <Link className="text-primary hover:text-surface-tint font-medium transition-colors" href="/onboarding">
              Sign up
            </Link>
          </p>
        </div>
      </section>

      {/* Right Section (45%) */}
      <section className="hidden lg:flex w-[45%] bg-primary-container relative flex-col justify-between p-margin-desktop overflow-hidden bg-[url('data:image/svg+xml,%3Csvg%20width=%2240%22%20height=%2240%22%20viewBox=%220%200%2040%2040%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d=%22M20%200c0%2011.046-8.954%2020-20%2020%2011.046%200%2020%208.954%2020%2020%200-11.046%208.954-20%2020-20-11.046%200-20-8.954-20-20z%22%20fill=%22%23ffffff%22%20fill-opacity=%220.03%22%20fill-rule=%22evenodd%22/%3E%3C/svg%3E')]">
        {/* Branding */}
        <div className="z-10 relative">
          <span className="font-headline-md text-headline-md font-bold text-on-primary">Bloom</span>
        </div>
        {/* Quote */}
        <div className="z-10 relative max-w-md">
          <blockquote className="font-display-lg text-display-lg text-on-primary-container mb-stack-md leading-tight">
            &quot;Your knowledge is the product.&quot;
          </blockquote>
        </div>
        {/* Bottom Spacer for layout balance */}
        <div></div>
      </section>
    </main>
  );
}
