"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import GoogleLoginButton from "@/app/google-password/Googlelogin";

export default function EmailPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-container-lowest px-4">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-stack-lg">
          <span className="font-headline-sm text-headline-sm font-bold text-primary">Bloom</span>
          <h1 className="mt-stack-sm font-display-lg-mobile text-display-lg-mobile text-on-surface">
            Sign in
          </h1>
          <p className="mt-stack-xs font-body-md text-body-md text-on-surface-variant">
            Enter your email and password to continue.
          </p>
        </div>

        {error && (
          <div className="mb-stack-md bg-error-container text-on-error-container rounded-lg px-4 py-3 font-body-sm text-body-sm border border-error/20">
            {error}
          </div>
        )}

        <GoogleLoginButton disabled={loading} />

        <div className="relative flex py-5 items-center my-stack-md">
          <div className="flex-grow border-t border-[#E8E0D5]"></div>
          <span className="flex-shrink-0 mx-4 font-label-sm text-label-sm text-outline-variant">or</span>
          <div className="flex-grow border-t border-[#E8E0D5]"></div>
        </div>

        <form className="flex flex-col gap-stack-md" onSubmit={handleSubmit}>
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
              disabled={loading}
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
              disabled={loading}
            />
          </div>
          <button
            className="mt-stack-sm w-full bg-primary text-on-primary rounded-lg py-3 px-4 font-label-md text-label-md hover:bg-surface-tint focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
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
    </main>
  );
}