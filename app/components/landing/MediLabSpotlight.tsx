"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdMonitorHeart, MdArrowForward } from "react-icons/md";

const cases = [
  {
    id: "#402",
    patient: "M. Chen, 45",
    complaint: "\"I feel like an elephant is sitting on my chest, and it's radiating to my jaw.\" Began 45 mins ago.",
    actions: ["Administer Aspirin 325mg", "Order stat ECG", "Discharge with antacids"],
    gradient: "linear-gradient(137deg, #114746 0%, #9dd0cd 45%, #c6efa1 100%)",
  },
  {
    id: "#403",
    patient: "L. Davis, 28",
    complaint: "\"I suddenly can't catch my breath and my chest hurts when I breathe in.\" No prior history.",
    actions: ["Order D-dimer", "Start 100% O2", "Give Albuterol nebulizer"],
    gradient: "linear-gradient(137deg, #466729 0%, #c6efa1 45%, #fddeb5 100%)",
  },
  {
    id: "#404",
    patient: "J. Smith, 62",
    complaint: "\"My husband's face is drooping and he can't lift his right arm.\" Started 20 mins ago.",
    actions: ["Activate Stroke Team", "Stat Non-con Head CT", "Give 81mg Aspirin"],
    gradient: "linear-gradient(137deg, #6a5434 0%, #e7c9a1 45%, #c6efa1 100%)",
  }
];

export default function MediLabSpotlight() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const currentCase = cases[currentIndex];

  return (
    <section className="landing-container">
      <div className="landing-pill-section landing-pill-section--dark overflow-visible">
        <div className="landing-two-col landing-two-col--reverse">
          {/* Text Column */}
          <div style={{ maxWidth: "28rem" }}>
            <h5 style={{ color: "var(--color-secondary-container)" }}>
              MediLab — Beta
            </h5>
            <h2 className="mt-3 text-white">
              Medical education
              <br />
              that feels real.
            </h2>
            <p className="mt-4 opacity-80 text-white" style={{ fontSize: "1.1rem" }}>
              Go beyond multiple choice. Build branching, interactive clinical
              scenarios that test diagnostic reasoning under pressure. Perfect
              for medical schools and continuing education.
            </p>
            <div className="mt-6">
              <button className="landing-btn-secondary">
                Request Beta Access
              </button>
            </div>
          </div>

          {/* Animated Patient Card Column */}
          <div className="relative w-full max-w-[26rem] mx-auto group">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="relative w-full"
              >
                {/* Glow Background */}
                <div
                  className="absolute inset-0 w-full h-full opacity-60 rounded-[2rem] pointer-events-none group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: currentCase.gradient,
                    filter: "blur(45px)",
                  }}
                />

                {/* Foreground Card */}
                <div
                  className="relative landing-mockup-card w-full overflow-hidden"
                  style={{
                    border: "8px solid transparent",
                    background: `linear-gradient(#ffffff, #ffffff) padding-box, ${currentCase.gradient} border-box`,
                    borderRadius: "1.5rem"
                  }}
                >
                  <div className="flex justify-between items-start mb-5">
                    <div>
                      <span className="text-tertiary-container uppercase tracking-wider text-xs font-semibold">
                        Case {currentCase.id}
                      </span>
                      <h3 className="text-on-surface mt-1">Patient: {currentCase.patient}</h3>
                    </div>
                    <MdMonitorHeart className="text-error text-xl" />
                  </div>
                  <div className="bg-surface px-4 py-3 rounded-lg border border-surface-variant mb-5 text-sm text-on-surface-variant">
                    <strong>Chief Complaint:</strong> {currentCase.complaint}
                  </div>
                  <p className="text-on-surface text-xs font-semibold mb-3">
                    Initial Action Required:
                  </p>
                  <div className="flex flex-col gap-2">
                    {currentCase.actions.map((action, i) => (
                      <button key={i} className="w-full text-left px-4 py-3 rounded-xl border border-outline-variant hover:border-primary hover:bg-surface-container-low transition-all text-sm text-on-surface flex justify-between items-center">
                        {action}
                        <MdArrowForward className="text-outline text-sm" />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
