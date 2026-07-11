"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import { MdCheck, MdClose } from "react-icons/md";

const FadeUp = ({ children, delay = 0, className }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const SpotlightBorder = ({
  children,
  className,
  radius = "2xl",
  size = 520,
  intensity = 0.5,
}: {
  children: React.ReactNode;
  className?: string;
  radius?: string;
  size?: number;
  intensity?: number;
}) => {
  const [position, setPosition] = React.useState({ x: -9999, y: -9999 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn("relative overflow-hidden group rounded-2xl", className)}
      style={{
        "--spot-x": `${position.x}px`,
        "--spot-y": `${position.y}px`,
        "--size": `${size}px`,
        "--intensity": intensity,
      } as React.CSSProperties}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl border border-outline-variant"
        style={{
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
          background: `radial-gradient(circle var(--size) at var(--spot-x) var(--spot-y), rgba(17, 71, 70, var(--intensity)), transparent 60%)`,
        }}
      />
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
           style={{
             background: `radial-gradient(circle var(--size) at var(--spot-x) var(--spot-y), rgba(17, 71, 70, 0.05), transparent 60%)`,
           }} />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

const PrimaryButton = ({ children, href, size = "sm", className }: any) => {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-inter leading-none group",
        "bg-primary hover:bg-primary/90 text-on-primary transition-colors",
        size === "sm" && "h-8 px-4 text-sm",
        className
      )}
    >
      <span className="relative overflow-hidden block">
        <span className="block transition-transform duration-300 group-hover:-translate-y-full">{children}</span>
        <span className="absolute inset-0 block transition-transform duration-300 translate-y-full group-hover:translate-y-0">{children}</span>
      </span>
    </a>
  );
};

const SecondaryButton = ({ children, href, size = "sm", className }: any) => {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-inter leading-none group",
        "bg-surface-container hover:bg-surface-container-high border border-outline-variant text-on-surface backdrop-blur-[2.5px] font-medium transition-colors",
        size === "sm" && "h-8 px-4 text-sm",
        className
      )}
    >
      <span className="relative overflow-hidden block">
        <span className="block transition-transform duration-300 group-hover:-translate-y-full">{children}</span>
        <span className="absolute inset-0 block transition-transform duration-300 translate-y-full group-hover:translate-y-0">{children}</span>
      </span>
    </a>
  );
};

type Feature = { text: string; included: boolean };
type Plan = {
  name: string; price: string; originalPrice?: string; description: string;
  features: Feature[]; featured?: boolean; badge?: string; bg: string;
};

const plans: Plan[] = [
  {
    name: "Course",
    price: "12,999", originalPrice: "39,999",
    description: "Once. Lifetime. 68% off.",
    bg: "var(--color-surface-container-low)",
    features: [
      { text: "All courses and videos", included: true },
      { text: "All modules. Lifetime access.", included: true },
      { text: "AI Builder", included: true },
      { text: "Unlimited Templates", included: false },
      { text: "Unlimited Motion Videos", included: false },
      { text: "1-on-1 Mentorship", included: false },
    ],
  },
  {
    name: "Course + Lovable Templates",
    price: "19,999", originalPrice: "55,999",
    description: "Once. Lifetime. Best deal.",
    bg: "var(--color-surface-container)",
    features: [
      { text: "All courses and videos", included: true },
      { text: "All modules. Lifetime access.", included: true },
      { text: "AI Builder", included: true },
      { text: "Unlimited Templates", included: true },
      { text: "Unlimited Motion Videos", included: true },
      { text: "1-on-1 Mentorship", included: false },
    ],
    featured: true,
    badge: "Best Value",
  },
  {
    name: "Course + Templates + Mentorship",
    price: "29,999", originalPrice: "79,999",
    description: "Once. Lifetime. The ultimate package.",
    bg: "var(--color-surface-container-high)",
    features: [
      { text: "All courses and videos", included: true },
      { text: "All modules. Lifetime access.", included: true },
      { text: "AI Builder", included: true },
      { text: "Unlimited Templates", included: true },
      { text: "Unlimited Motion Videos", included: true },
      { text: "1-on-1 Mentorship", included: true },
    ],
  },
];

const PricingCard = ({ plan }: { plan: Plan }) => (
  <SpotlightBorder radius="2xl" size={460} intensity={0.5} className="relative h-full p-2 sm:p-3">
    <div
      className="relative flex h-full flex-col rounded-2xl border border-outline-variant p-7 sm:p-8"
      style={{ backgroundColor: plan.bg }}
    >
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-primary/20 bg-primary px-3 py-1 text-xs font-medium text-on-primary">
          {plan.badge}
        </div>
      )}

      <FadeUp delay={0}>
        <div className="text-[11px] uppercase tracking-[0.2em] text-on-surface/60">
          {plan.name}
        </div>
      </FadeUp>
      <div className="mt-3 border-t border-outline-variant" />

      <FadeUp delay={0.1}>
        <div className="mt-10 flex items-baseline gap-2">
          <span className="text-[2.75rem] leading-none font-normal tracking-tight text-on-surface">₹{plan.price}</span>
          {plan.originalPrice && (
            <span className="text-lg text-on-surface/40 line-through">₹{plan.originalPrice}</span>
          )}
        </div>
      </FadeUp>

      <FadeUp delay={0.2}>
        <p className="mt-4 text-sm leading-relaxed text-on-surface/60">{plan.description}</p>
      </FadeUp>

      <FadeUp delay={0.3}>
        <div className="mt-7">
          {plan.featured
            ? <PrimaryButton href="/auth?mode=signup" size="sm">Get Started</PrimaryButton>
            : <SecondaryButton href="/auth?mode=signup" size="sm">Get Started</SecondaryButton>}
        </div>
      </FadeUp>

      <FadeUp delay={0.4} className="flex-1">
        <ul className="mt-7 flex flex-1 flex-col gap-2">
          {plan.features.map((f, i) => (
            <li key={f.text}
              className={cn(
                "flex items-center gap-3 py-4 text-sm",
                i !== 0 && "border-t border-outline-variant",
                f.included ? "text-on-surface/85" : "text-on-surface/40"
              )}>
              <span className={cn(
                "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border",
                f.included ? "border-primary bg-primary/10" : "border-outline-variant bg-transparent"
              )}>
                {f.included
                  ? <MdCheck size={14} className="text-primary" />
                  : <MdClose size={14} className="text-on-surface/50" />}
              </span>
              {f.text}
            </li>
          ))}
        </ul>
      </FadeUp>
    </div>
  </SpotlightBorder>
);

export default function PricingSection() {
  return (
    <section id="pricing" className="relative w-full bg-surface-container-lowest py-12 sm:py-16">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-6">
        {/* HEADER */}
        <div className="mb-14 flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <FadeUp>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-surface-container border border-outline-variant px-3 py-1 text-xs text-on-surface/80 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                Pricing
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-normal tracking-[-0.02em] leading-[1.05] text-on-surface">
                Clear pricing plans
                <br className="hidden sm:block" /> that scale with you.
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.2}>
            <p className="max-w-sm text-sm sm:text-base text-on-surface/60">
              One-time payment. Lifetime access. Pick the plan that fits how far
              you want to go.
            </p>
          </FadeUp>
        </div>

        {/* CARDS */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map(p => <PricingCard key={p.name} plan={p} />)}
        </div>
      </div>
    </section>
  );
}
