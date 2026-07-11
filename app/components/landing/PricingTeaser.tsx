import { MdCheck } from "react-icons/md";

export default function PricingTeaser() {
  return (
    <section
      className="landing-container"
      style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
    >
      <div className="landing-section-header">
        <h2>Simple, transparent pricing.</h2>
        <p className="text-on-surface-variant">
          Start for free, upgrade when you need more power.
        </p>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start"
      >
        {/* Starter */}
        <div className="landing-pricing-card">
          <h3>Starter</h3>
          <div className="mt-4 mb-6">
            <span style={{ fontSize: "clamp(2rem, 3vw, 2.5rem)", fontWeight: 700 }}>
              $0
            </span>
            <span className="text-on-surface-variant text-sm ml-1">/month</span>
          </div>
          <ul
            className="flex flex-col gap-3 mb-6 flex-1 text-on-surface-variant text-sm"
            style={{ listStyle: "none", padding: 0 }}
          >
            <li className="flex items-center gap-3">
              <MdCheck className="text-secondary flex-shrink-0" /> 1 Published
              Course
            </li>
            <li className="flex items-center gap-3">
              <MdCheck className="text-secondary flex-shrink-0" /> Basic Course
              Builder
            </li>
            <li className="flex items-center gap-3">
              <MdCheck className="text-secondary flex-shrink-0" /> Standard
              Community
            </li>
          </ul>
          <button className="landing-btn w-full">Get Started</button>
        </div>

        {/* Creator (Featured) */}
        <div className="landing-pricing-card landing-pricing-card--featured relative">
          <div className="absolute top-0 right-6 -translate-y-1/2 bg-secondary text-on-secondary px-3 py-1 rounded-full text-xs font-semibold">
            Most Popular
          </div>
          <h3>Creator</h3>
          <div className="mt-4 mb-6">
            <span style={{ fontSize: "clamp(2rem, 3vw, 2.5rem)", fontWeight: 700 }}>
              $49
            </span>
            <span className="opacity-70 text-sm ml-1">/month</span>
          </div>
          <ul
            className="flex flex-col gap-3 mb-6 flex-1 opacity-90 text-sm"
            style={{ listStyle: "none", padding: 0 }}
          >
            <li className="flex items-center gap-3">
              <MdCheck className="text-secondary-container flex-shrink-0" />{" "}
              Unlimited Courses
            </li>
            <li className="flex items-center gap-3">
              <MdCheck className="text-secondary-container flex-shrink-0" /> AI
              PDF to Video (10h/mo)
            </li>
            <li className="flex items-center gap-3">
              <MdCheck className="text-secondary-container flex-shrink-0" />{" "}
              Advanced Analytics
            </li>
            <li className="flex items-center gap-3">
              <MdCheck className="text-secondary-container flex-shrink-0" /> Zero
              Transaction Fees
            </li>
          </ul>
          <button className="landing-btn landing-btn--inverted w-full">
            Start 14-Day Trial
          </button>
        </div>

        {/* MediLab Pro */}
        <div className="landing-pricing-card">
          <h3>MediLab Pro</h3>
          <div className="mt-4 mb-6">
            <span style={{ fontSize: "clamp(2rem, 3vw, 2.5rem)", fontWeight: 700 }}>
              $199
            </span>
            <span className="text-on-surface-variant text-sm ml-1">/month</span>
          </div>
          <ul
            className="flex flex-col gap-3 mb-6 flex-1 text-on-surface-variant text-sm"
            style={{ listStyle: "none", padding: 0 }}
          >
            <li className="flex items-center gap-3">
              <MdCheck className="text-tertiary-container flex-shrink-0" />{" "}
              Everything in Creator
            </li>
            <li className="flex items-center gap-3">
              <MdCheck className="text-tertiary-container flex-shrink-0" />{" "}
              Interactive Case Builder
            </li>
            <li className="flex items-center gap-3">
              <MdCheck className="text-tertiary-container flex-shrink-0" />{" "}
              Clinical Scenario Logic
            </li>
            <li className="flex items-center gap-3">
              <MdCheck className="text-tertiary-container flex-shrink-0" /> CME
              Certification Tools
            </li>
          </ul>
          <button className="landing-btn w-full">Contact Sales</button>
        </div>
      </div>
    </section>
  );
}
