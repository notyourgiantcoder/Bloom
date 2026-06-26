"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdDashboard, MdSchool, MdAutoAwesome, MdGroups, MdAnalytics, MdSettings, MdAdd, MdMenu, MdLogout } from "react-icons/md";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

type UserInfo = {
  name: string;
  email: string;
  avatarUrl: string | null;
  role: string | null;
};

export default function SideNavBar() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [signingOut, setSigningOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = getSupabaseBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, avatar_url, role")
          .eq("id", user.id)
          .maybeSingle();

        setUserInfo({
          name: profile?.full_name || user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
          email: user.email || "",
          avatarUrl: profile?.avatar_url || user.user_metadata?.avatar_url || null,
          role: profile?.role || null,
        });
      }
    };
    fetchUser();
  }, []);

  const handleSignOut = async () => {
    setSigningOut(true);
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/sign-in");
    router.refresh();
  };

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const getRoleLabel = (role: string | null) => {
    if (role === "creator") return "Creator";
    if (role === "student") return "Student";
    return "Member";
  };

  const navLinks = [
    { href: "/dashboard", icon: MdDashboard, label: "Dashboard" },
    { href: "/course-builder", icon: MdSchool, label: "Courses" },
    { href: "/dashboard/ai-studio", icon: MdAutoAwesome, label: "AI Studio" },
    { href: "/dashboard/community", icon: MdGroups, label: "Community" },
    { href: "/dashboard/analytics", icon: MdAnalytics, label: "Analytics" },
    { href: "/dashboard/settings", icon: MdSettings, label: "Settings" },
  ];

  return (
    <>
      {/* SideNavBar (Desktop) */}
      <nav aria-label="Sidebar Navigation" className="bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container docked left-0 h-full w-64 fixed top-0 flex flex-col py-stack-lg z-40 hidden md:flex border-r border-transparent">
        {/* Header / Brand */}
        <div className="px-6 mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-container-lowest overflow-hidden flex items-center justify-center flex-shrink-0">
            {userInfo?.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={userInfo.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-primary font-headline-sm text-headline-sm">
                {userInfo ? getInitial(userInfo.name) : "·"}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <h2 className="text-headline-sm font-headline-sm text-on-primary leading-none truncate">
              {userInfo?.name || "Loading..."}
            </h2>
            <p className="font-label-sm text-label-sm text-on-primary/70 mt-1">
              {userInfo ? getRoleLabel(userInfo.role) : ""}
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-1 flex-1 px-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 text-on-primary/70 dark:text-on-primary-container/70 px-4 py-3 font-label-md text-label-md rounded-r-lg border-l-4 border-transparent hover:bg-on-primary-fixed-variant/20 hover:text-on-primary transition-all"
            >
              <link.icon />
              {link.label}
            </Link>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="px-6 mt-auto flex flex-col gap-3">
          <Link
            href="/course-builder"
            className="w-full bg-surface-container-lowest text-primary font-label-md text-label-md py-2 rounded-lg hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2 border border-surface-container-low"
          >
            <MdAdd className="text-[18px]" />
            New Project
          </Link>

          {/* User email */}
          {userInfo && (
            <p className="text-on-primary/50 font-label-sm text-label-sm truncate px-1">
              {userInfo.email}
            </p>
          )}

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="w-full flex items-center justify-center gap-2 text-on-primary/70 hover:text-on-primary hover:bg-on-primary-fixed-variant/20 py-2 px-4 rounded-lg font-label-md text-label-md transition-colors disabled:opacity-50"
          >
            <MdLogout className="text-[18px]" />
            {signingOut ? "Signing out..." : "Sign Out"}
          </button>
        </div>
      </nav>

      {/* Mobile Top App Bar */}
      <header className="md:hidden bg-primary text-on-primary w-full h-16 fixed top-0 flex items-center justify-between px-4 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          {userInfo?.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={userInfo.avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center">
              <span className="text-primary font-label-md text-label-md">
                {userInfo ? getInitial(userInfo.name) : "·"}
              </span>
            </div>
          )}
          <h1 className="font-headline-sm text-headline-sm">{userInfo?.name || "Bloom"}</h1>
        </div>
        <button className="text-on-primary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <MdMenu />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[60] bg-black/50" onClick={() => setMobileMenuOpen(false)}>
          <div className="w-64 h-full bg-primary flex flex-col py-6" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 mb-6">
              <h2 className="text-headline-sm font-headline-sm text-on-primary">{userInfo?.name || "Bloom"}</h2>
              <p className="font-label-sm text-label-sm text-on-primary/70 mt-1">{userInfo ? getRoleLabel(userInfo.role) : ""}</p>
            </div>
            <div className="flex flex-col gap-1 flex-1 px-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-on-primary/70 px-4 py-3 font-label-md text-label-md rounded-lg hover:bg-on-primary-fixed-variant/20 hover:text-on-primary transition-all"
                >
                  <link.icon />
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="px-6 mt-auto">
              <button
                onClick={handleSignOut}
                disabled={signingOut}
                className="w-full flex items-center justify-center gap-2 text-on-primary/70 hover:text-on-primary py-2 px-4 rounded-lg font-label-md text-label-md transition-colors"
              >
                <MdLogout className="text-[18px]" />
                {signingOut ? "Signing out..." : "Sign Out"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
