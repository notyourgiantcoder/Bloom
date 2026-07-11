import Link from "next/link";
import HeroGraphic from "./HeroGraphic";

export default function HeroSection() {
  return (
    <section className="landing-container">
      <div className="landing-hero-header landing-fade-in">
        <h5>The Educator&apos;s Platform</h5>
        <h1 className="landing-fade-in text-on-surface">
          Teach anything.
          <br />
          <span className="text-[#c6efa1]">Reach everyone.</span>
        </h1>
        <p className="text-on-surface-variant max-w-[36rem]">
          The quiet, powerful workspace for professional educators. Build
          courses, harness AI, and host interactive medical simulations — all
          in one beautifully simple platform.
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link href="/sign-in" className="landing-btn-filled">
            Start for free
          </Link>
          <button className="landing-btn">Explore platform</button>
        </div>
      </div>

      {/* Dynamic animated hero graphic */}
      <HeroGraphic />
    </section>
  );
}
