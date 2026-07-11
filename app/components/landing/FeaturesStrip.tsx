"use client";

import { motion } from "framer-motion";
import {
  MdViewQuilt,
  MdAutoAwesome,
  MdVaccines,
  MdForum,
  MdPayments,
  MdQueryStats,
} from "react-icons/md";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  delay: number;
}

function FeatureCard({ title, description, icon: Icon, gradient, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className="relative flex flex-col justify-start items-start w-full max-w-[260px] md:max-w-[300px] group mx-auto"
    >
      {/* Glow Background */}
      <div
        className="absolute w-full h-[260px] md:h-[300px] opacity-60 rounded-[40px] pointer-events-none group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: gradient,
          filter: "blur(45px)",
        }}
      />

      {/* Foreground Card */}
      <div
        className="relative self-stretch h-[260px] md:h-[300px] rounded-[40px] z-10 overflow-hidden"
        style={{
          border: "8px solid transparent",
          background: `linear-gradient(#ffffff, #ffffff) padding-box, ${gradient} border-box`,
        }}
      >
        <div className="w-full h-full p-7 flex flex-col justify-start gap-5">
          <div className="text-primary opacity-90">
             <Icon size={32} />
          </div>
          
          <div>
            <h3 className="text-on-surface font-semibold text-xl mb-3 tracking-tight">
              {title}
            </h3>
            <p className="text-on-surface-variant text-[14px] leading-[1.6] font-normal selection:bg-primary/20">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturesStrip() {
  const cards = [
    {
      title: "Course Builder",
      description: "A tactile, drag-and-drop canvas. Construct lessons that feel like high-end editorial articles.",
      icon: MdViewQuilt,
      gradient: "linear-gradient(137deg, #114746 0%, #9dd0cd 45%, #c6efa1 100%)",
      delay: 0.1,
    },
    {
      title: "AI Studio",
      description: "Transform raw PDFs and notes into structured modules, complete with quizzes and video scripts.",
      icon: MdAutoAwesome,
      gradient: "linear-gradient(137deg, #466729 0%, #c6efa1 45%, #fddeb5 100%)",
      delay: 0.2,
    },
    {
      title: "MediLab",
      description: "Interactive clinical scenarios. Build branching patient cases to test diagnostic reasoning.",
      icon: MdVaccines,
      gradient: "linear-gradient(137deg, #6a5434 0%, #e7c9a1 45%, #c6efa1 100%)",
      delay: 0.3,
    },
    {
      title: "Community",
      description: "Foster quiet, focused discussions. A space for intellectual exchange, free from algorithmic noise.",
      icon: MdForum,
      gradient: "linear-gradient(137deg, #2d5f5d 0%, #114746 45%, #9dd0cd 100%)",
      delay: 0.4,
    },
    {
      title: "Monetization",
      description: "Simple, elegant paywalls. Sell courses, memberships, or digital goods with zero friction.",
      icon: MdPayments,
      gradient: "linear-gradient(137deg, #503d1f 0%, #fddeb5 45%, #ffffff 100%)",
      delay: 0.5,
    },
    {
      title: "Analytics",
      description: "Clear, actionable insights. Understand student progress and content engagement at a glance.",
      icon: MdQueryStats,
      gradient: "linear-gradient(137deg, #9dd0cd 0%, #c6efa1 45%, #e7c9a1 100%)",
      delay: 0.6,
    },
  ];

  return (
    <section className="landing-container">
      {/* Stats Row */}
      <div className="landing-three-col-wrapper" style={{ marginBottom: "4rem" }}>
        <div className="landing-pill-card">
          <h2 style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 800 }}>
            50k+
          </h2>
          <p className="text-on-surface-variant mt-2" style={{ fontSize: "1rem" }}>
            Active Educators
          </p>
        </div>
        <div className="landing-pill-card">
          <h2 style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 800 }}>
            1M+
          </h2>
          <p className="text-on-surface-variant mt-2" style={{ fontSize: "1rem" }}>
            Lessons Created
          </p>
        </div>
        <div className="landing-pill-card">
          <h2 style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 800 }}>
            98%
          </h2>
          <p className="text-on-surface-variant mt-2" style={{ fontSize: "1rem" }}>
            Satisfaction Rate
          </p>
        </div>
      </div>

      {/* Features Section — Dark background for glowing cards */}
      <div className="landing-pill-section landing-pill-section--dark overflow-visible">
        <div className="landing-section-header">
          <h5 className="text-secondary-container">The Toolkit</h5>
          <h2 className="text-white">Everything you need to distill complex knowledge.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8 lg:gap-8 w-full max-w-6xl mx-auto mt-12">
          {cards.map((card, index) => (
            <FeatureCard key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
