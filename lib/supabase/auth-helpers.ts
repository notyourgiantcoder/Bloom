import { getSupabaseServerClient } from "./server-client";
import { redirect } from "next/navigation";

export type UserProfile = {
  id: string;
  full_name: string | null;
  username: string | null;
  username_updated_at: string | null;
  avatar_url: string | null;
  role: "creator" | "student" | null;
  onboarding_completed: boolean;
  updated_at: string;
};

export type AuthenticatedUser = {
  user: {
    id: string;
    email: string | undefined;
    user_metadata: Record<string, unknown>;
  };
  profile: UserProfile;
};

/**
 * Get the currently authenticated user along with their profile.
 * Returns null if not authenticated.
 */
export async function getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  const supabase = await getSupabaseServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  return {
    user: {
      id: user.id,
      email: user.email,
      user_metadata: user.user_metadata,
    },
    profile: profile ?? {
      id: user.id,
      full_name: null,
      username: null,
      username_updated_at: null,
      avatar_url: null,
      role: null,
      onboarding_completed: false,
      updated_at: new Date().toISOString(),
    },
  };
}

/**
 * Require authentication — redirects to /sign-in if not authenticated.
 * Also checks onboarding status and redirects to /onboarding if needed.
 */
export async function requireAuth(): Promise<AuthenticatedUser> {
  const authUser = await getAuthenticatedUser();

  if (!authUser) {
    redirect("/sign-in");
  }

  if (!authUser.profile.onboarding_completed) {
    redirect("/onboarding");
  }

  return authUser;
}
