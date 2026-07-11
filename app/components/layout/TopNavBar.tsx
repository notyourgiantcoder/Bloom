"use client";

import Link from "next/link";
import { LogoMark } from "../ui/LogoMark";

export default function TopNavBar() {
  return (
    <nav className="landing-nav">
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold no-underline"
          style={{ color: "var(--color-primary)" }}
        >
          <LogoMark className="text-[1.2em] text-[#c6efa1]" />
          Bloom
          <span className="text-[10px] bg-secondary/10 text-secondary px-1.5 py-0.5 rounded align-top ml-1 font-normal tracking-normal uppercase">
            v1.1
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          <Link href="/#features" className="landing-nav-link">
            Features
          </Link>
          <Link href="/courses/anatomy" className="landing-nav-link">
            MediLab
          </Link>
          <Link href="/pricing" className="landing-nav-link">
            Pricing
          </Link>
          <Link href="/dashboard" className="landing-nav-link">
            For Creators
          </Link>
        </div>
      </div>
      <div>
        <Link href="/sign-in" className="landing-nav-cta">
          Start for free
        </Link>
      </div>
    </nav>
  );
}
