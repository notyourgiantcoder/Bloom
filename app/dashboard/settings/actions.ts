"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server-client";

// Instagram-style username: 3–30 chars, lowercase letters, numbers, underscores, periods
const USERNAME_REGEX = /^[a-z0-9._]{3,30}$/;

type UpdateProfileResult = {
  success: boolean;
  error?: string;
};

export async function updateProfile(
  fullName: string,
  username: string
): Promise<UpdateProfileResult> {
  const supabase = await getSupabaseServerClient();

  // Authenticate on the server — no "Failed to fetch" risk
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "You must be signed in to update your profile." };
  }

  // Validate profile name
  const trimmedName = fullName.trim();
  if (!trimmedName) {
    return { success: false, error: "Profile name cannot be empty." };
  }

  // Validate username format
  const trimmedUsername = username.trim().toLowerCase();
  if (!trimmedUsername) {
    return { success: false, error: "Username cannot be empty." };
  }

  if (!USERNAME_REGEX.test(trimmedUsername)) {
    return {
      success: false,
      error: "Username must be 3–30 characters and can only contain lowercase letters, numbers, underscores, and periods.",
    };
  }

  // Fetch current profile to check 30-day limit
  const { data: currentProfile } = await supabase
    .from("profiles")
    .select("username, username_updated_at")
    .eq("id", user.id)
    .maybeSingle();

  let newUsernameUpdatedAt = undefined;

  if (currentProfile && currentProfile.username !== trimmedUsername) {
    // Only enforce the 30-day rule if they ALREADY had a username set
    if (currentProfile.username !== null && currentProfile.username_updated_at) {
      const lastUpdate = new Date(currentProfile.username_updated_at);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - lastUpdate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 30) {
        return { 
          success: false, 
          error: `You can only change your username once every 30 days. You last changed it ${diffDays} day(s) ago.` 
        };
      }
    }
    // Set to current time if the username is actually changing
    newUsernameUpdatedAt = new Date().toISOString();
  }

  // Check uniqueness (exclude current user)
  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", trimmedUsername)
    .neq("id", user.id)
    .maybeSingle();

  if (existing) {
    return { success: false, error: "This username is already taken." };
  }

  // Perform the update
  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      full_name: trimmedName,
      username: trimmedUsername,
      ...(newUsernameUpdatedAt ? { username_updated_at: newUsernameUpdatedAt } : {})
    })
    .eq("id", user.id);

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  return { success: true };
}

export async function checkUsernameAvailability(
  username: string
): Promise<{ available: boolean; error?: string }> {
  const trimmedUsername = username.trim().toLowerCase();

  if (!trimmedUsername) {
    return { available: false, error: "Username cannot be empty." };
  }

  if (!USERNAME_REGEX.test(trimmedUsername)) {
    return {
      available: false,
      error: "Invalid format. Use only lowercase letters, numbers, underscores, and periods (3–30 chars).",
    };
  }

  const supabase = await getSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", trimmedUsername)
    .maybeSingle();

  // Available if no one has it, or if the current user already owns it
  const available = !existing || (!!user && existing.id === user.id);

  return { available };
}
