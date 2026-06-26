"use client";
import { MdPhotoCamera, MdCheckCircle, MdDownload, MdCheck, MdClose } from "react-icons/md";
import { useCallback, useEffect, useRef, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { updateProfile, checkUsernameAvailability } from "./actions";

// Instagram-style: lowercase letters, numbers, underscores, periods
const USERNAME_REGEX = /^[a-z0-9._]{3,30}$/;
const USERNAME_CHAR_REGEX = /^[a-z0-9._]*$/;

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [usernameStatus, setUsernameStatus] = useState<{
    checking: boolean;
    available: boolean | null;
    error: string | null;
  }>({ checking: false, available: null, error: null });
  const [message, setMessage] = useState<{type: "success" | "error", text: string} | null>(null);
  const usernameTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const supabase = getSupabaseBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
        setProfile(data);
        setFullName(data?.full_name || "");
        setUsername(data?.username || "");
      }
      setLoading(false);
    };
    loadProfile();
  }, []);

  // Debounced username availability check
  const checkAvailability = useCallback((value: string) => {
    if (usernameTimerRef.current) {
      clearTimeout(usernameTimerRef.current);
    }

    // Don't check if it's the user's current username
    if (value === profile?.username) {
      setUsernameStatus({ checking: false, available: true, error: null });
      return;
    }

    if (!value || value.length < 3) {
      setUsernameStatus({ checking: false, available: null, error: value.length > 0 ? "Username must be at least 3 characters." : null });
      return;
    }

    if (!USERNAME_REGEX.test(value)) {
      setUsernameStatus({ checking: false, available: null, error: "Only lowercase letters, numbers, underscores, and periods allowed." });
      return;
    }

    setUsernameStatus({ checking: true, available: null, error: null });

    usernameTimerRef.current = setTimeout(async () => {
      const result = await checkUsernameAvailability(value);
      setUsernameStatus({
        checking: false,
        available: result.available,
        error: result.error || (!result.available ? "This username is already taken." : null),
      });
    }, 500);
  }, [profile?.username]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.toLowerCase();
    // Only allow valid characters to be typed
    if (raw && !USERNAME_CHAR_REGEX.test(raw)) return;
    if (raw.length > 30) return;
    setUsername(raw);
    checkAvailability(raw);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    // Client-side validation before calling server
    if (!fullName.trim()) {
      setMessage({ type: "error", text: "Profile name cannot be empty." });
      setSaving(false);
      return;
    }

    if (!username.trim()) {
      setMessage({ type: "error", text: "Username cannot be empty." });
      setSaving(false);
      return;
    }

    if (!USERNAME_REGEX.test(username)) {
      setMessage({ type: "error", text: "Username must be 3–30 characters: lowercase letters, numbers, underscores, and periods only." });
      setSaving(false);
      return;
    }

    // Call server action (no more "Failed to fetch" error!)
    const result = await updateProfile(fullName, username);

    if (result.success) {
      setMessage({ type: "success", text: "Profile updated successfully!" });
      // Update local profile state so availability check knows the new username
      setProfile((prev: any) => ({ ...prev, full_name: fullName.trim(), username: username.trim().toLowerCase() }));
    } else {
      setMessage({ type: "error", text: result.error || "Failed to update profile." });
    }

    setSaving(false);
  };

  const getInitial = (name: string) => name ? name.charAt(0).toUpperCase() : "U";

  // Check 30-day limit for username
  const diffDays = profile?.username_updated_at 
    ? Math.ceil(Math.abs(new Date().getTime() - new Date(profile.username_updated_at).getTime()) / (1000 * 60 * 60 * 24))
    : null;
  // ONLY lock if they ALREADY have a username set
  const isUsernameLocked = !!profile?.username && diffDays !== null && diffDays <= 30;
  const daysUntilUnlock = diffDays !== null ? 30 - diffDays : 0;

  // Compute whether the save button should be disabled
  const hasChanges = fullName.trim() !== (profile?.full_name || "") || username.trim() !== (profile?.username || "");
  const isUsernameValid = USERNAME_REGEX.test(username) && usernameStatus.available !== false && !usernameStatus.checking;
  const canSave = hasChanges && fullName.trim() && isUsernameValid && !saving && (!isUsernameLocked || username.trim() === profile?.username);

  if (loading) return <div className="p-8 text-center text-outline">Loading settings...</div>;

  return (
    <div className="max-w-[800px] mx-auto">
      {!profile?.username && (
        <div className="mb-6 bg-secondary/10 border border-secondary/20 p-4 rounded-xl flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-headline-sm text-primary">Complete your profile</span>
            <span className="font-body-sm text-on-surface-variant">Please choose a username to complete your profile setup.</span>
          </div>
        </div>
      )}
      
      <div className="mb-stack-lg">
        <h1 className="font-display-lg text-display-lg text-primary mb-2">Settings</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Manage your account preferences, billing, and integrations.</p>
      </div>

      {/* Inner Navigation (Tabs) */}
      <div className="mb-stack-lg overflow-x-auto pb-2 -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0">
        <nav className="flex gap-6 border-b border-outline-variant/20 min-w-max">
          <button className="pb-3 border-b-2 border-secondary text-primary font-label-md text-label-md px-1 transition-colors">Profile</button>
          <button className="pb-3 border-b-2 border-transparent text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md px-1">Notifications</button>
          <button className="pb-3 border-b-2 border-transparent text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md px-1">Payment Gateway</button>
          <button className="pb-3 border-b-2 border-transparent text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md px-1">Billing</button>
        </nav>
      </div>

      {message && (
          <div className={`mb-6 p-4 rounded-lg font-body-sm text-sm border ${message.type === 'success' ? 'bg-[#e1f8f7] text-[#2d5f5d] border-[#2d5f5d]/20' : 'bg-error-container text-on-error-container border-error/20'}`}>
              {message.text}
          </div>
      )}

      <div className="space-y-stack-lg">
        {/* Profile Section */}
        <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 card-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-surface-container/50 rounded-bl-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          <h2 className="font-headline-sm text-headline-sm text-primary mb-6">Profile Settings</h2>
          <div className="flex flex-col sm:flex-row gap-8 items-start mb-8">
            <div className="shrink-0 relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border border-outline-variant/30 bg-surface-container flex items-center justify-center">
                {profile?.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-headline-md text-headline-md">{getInitial(fullName)}</div>
                )}
              </div>
              <button aria-label="Upload new photo" className="absolute bottom-0 right-0 bg-primary text-on-primary w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-tint transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                <MdPhotoCamera className="text-[18px]" />
              </button>
            </div>
            <div className="flex-1 space-y-4 w-full">
              {/* Profile Name (display name) */}
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="fullName">Profile Name</label>
                <input 
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-2 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-outline-variant" 
                    id="fullName" 
                    type="text" 
                    placeholder="Your display name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)} 
                />
                <p className="mt-1 text-[11px] text-on-surface-variant/60 font-body-sm">This is the name shown publicly on your profile.</p>
              </div>

              {/* Username */}
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="username">Username</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 font-body-md select-none">@</span>
                  <input 
                      className={`w-full bg-surface-container border rounded-lg pl-8 pr-10 py-2 font-body-md text-on-surface focus:outline-none focus:ring-2 transition-all placeholder:text-outline-variant ${
                        isUsernameLocked 
                          ? 'opacity-50 cursor-not-allowed border-outline-variant/20'
                          : usernameStatus.error 
                            ? 'border-error/50 focus:ring-error focus:border-error' 
                            : usernameStatus.available === true 
                              ? 'border-[#2d5f5d]/50 focus:ring-[#2d5f5d] focus:border-[#2d5f5d]' 
                              : 'border-outline-variant/20 focus:ring-primary focus:border-primary'
                      }`}
                      id="username" 
                      type="text" 
                      placeholder="your_username"
                      value={username}
                      onChange={handleUsernameChange}
                      autoComplete="off"
                      disabled={isUsernameLocked}
                  />
                  {/* Status indicator */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {usernameStatus.checking && !isUsernameLocked && (
                      <svg className="w-4 h-4 animate-spin text-on-surface-variant/50" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                    )}
                    {!usernameStatus.checking && usernameStatus.available === true && !isUsernameLocked && (
                      <MdCheck className="text-[18px] text-[#2d5f5d]" />
                    )}
                    {!usernameStatus.checking && usernameStatus.available === false && !isUsernameLocked && (
                      <MdClose className="text-[18px] text-error" />
                    )}
                  </div>
                </div>
                {isUsernameLocked ? (
                  <p className="mt-1 text-[11px] text-error font-body-sm">
                    You can change your username again in {daysUntilUnlock} day(s).
                  </p>
                ) : (
                  <>
                    {usernameStatus.error && (
                      <p className="mt-1 text-[11px] text-error font-body-sm">{usernameStatus.error}</p>
                    )}
                    {!usernameStatus.error && usernameStatus.available === true && username !== (profile?.username || "") && (
                      <p className="mt-1 text-[11px] text-[#2d5f5d] font-body-sm">Username is available!</p>
                    )}
                    {!usernameStatus.error && !usernameStatus.checking && usernameStatus.available === null && !username && (
                      <p className="mt-1 text-[11px] text-on-surface-variant/60 font-body-sm">Lowercase letters, numbers, underscores, and periods. 3–30 characters.</p>
                    )}
                    {!usernameStatus.error && !usernameStatus.checking && usernameStatus.available === null && username && username.length < 3 && (
                      <p className="mt-1 text-[11px] text-on-surface-variant/60 font-body-sm">Username must be at least 3 characters.</p>
                    )}
                  </>
                )}
              </div>

              <div className="pt-2">
                <button 
                    onClick={handleSave}
                    disabled={!canSave}
                    className="bg-primary hover:opacity-90 text-on-primary font-label-md text-label-md px-6 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Billing Section: Bento Layout */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Current Plan Card */}
          <div className="col-span-1 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 card-shadow flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Current Plan</h3>
                <span className="bg-secondary text-on-secondary font-label-sm text-[10px] px-2.5 py-0.5 rounded-full font-bold">Active</span>
              </div>
              <div className="font-headline-md text-headline-md text-primary mb-1">Free Tier</div>
              <div className="font-body-md text-on-surface-variant mb-6">₹0 / month</div>
              <ul className="space-y-2 mb-6 opacity-60">
                <li className="flex items-center gap-2 font-body-md text-sm text-on-surface-variant">
                  <MdCheckCircle className="text-[16px] text-secondary" /> Unlimited Courses
                </li>
                <li className="flex items-center gap-2 font-body-md text-sm text-on-surface-variant">
                  <MdCheckCircle className="text-[16px] text-secondary" /> Custom Domain
                </li>
              </ul>
            </div>
            <button className="w-full bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              Upgrade Plan
            </button>
          </div>

          {/* Invoice Table Card */}
          <div className="col-span-1 md:col-span-2 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 card-shadow">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-sm text-headline-sm text-primary">Billing History</h3>
            </div>
            <div className="overflow-x-auto min-h-[150px] flex items-center justify-center">
              <p className="text-outline font-body-sm text-sm">No billing history yet.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
