"use client";

import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

interface GoogleLoginButtonProps {
  /** Label shown on the button. Defaults to "Continue with Google" */
  label?: string;
  /** URL to redirect to after successful sign-in (defaults to /dashboard) */
  redirectTo?: string;
  disabled?: boolean;
}

export default function GoogleLoginButton({
  label = "Continue with Google",
  redirectTo,
  disabled = false,
}: GoogleLoginButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);

    try {
      const supabase = getSupabaseBrowserClient();
      const callbackUrl = `${window.location.origin}/auth/callback${
        redirectTo ? `?next=${encodeURIComponent(redirectTo)}` : ""
      }`;

      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: callbackUrl,
        },
      });

      if (oauthError) {
        setError(oauthError.message);
        setLoading(false);
      }
      // On success, Supabase redirects the browser
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {error && (
        <p className="mb-2 text-sm text-red-600">{error}</p>
      )}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading || disabled}
        className="w-full flex items-center justify-center gap-3 bg-surface-container-lowest border border-[#E8E0D5] rounded-lg py-3 px-4 hover:bg-surface-container-low transition-colors shadow-[0_1px_4px_rgba(26,46,46,0.06)] group disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
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
          {loading ? "Redirecting…" : label}
        </span>
      </button>
    </div>
  );
}