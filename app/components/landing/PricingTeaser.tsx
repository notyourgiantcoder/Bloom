import { MdCheck } from "react-icons/md";
export default function PricingTeaser() {
  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-headline-md text-headline-md text-on-surface">Simple, transparent pricing.</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Start for free, upgrade when you need more power.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Free */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 flex flex-col">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Starter</h3>
          <div className="mt-4 mb-8">
            <span className="font-display-lg-mobile text-display-lg-mobile text-on-surface">$0</span>
            <span className="font-body-md text-body-md text-on-surface-variant">/month</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1 font-body-md text-body-md text-on-surface-variant">
            <li className="flex items-center gap-3"><MdCheck className="text-secondary text-sm" /> 1 Published Course</li>
            <li className="flex items-center gap-3"><MdCheck className="text-secondary text-sm" /> Basic Course Builder</li>
            <li className="flex items-center gap-3"><MdCheck className="text-secondary text-sm" /> Standard Community</li>
          </ul>
          <button className="w-full rounded-lg bg-surface-container text-on-surface px-4 py-3 font-label-md text-label-md hover:bg-surface-container-high transition-colors border border-outline-variant">
            Get Started
          </button>
        </div>
        {/* Creator (Highlighted) */}
        <div className="bg-primary border border-primary rounded-2xl p-8 flex flex-col relative transform md:-translate-y-4 ambient-shadow">
          <div className="absolute top-0 right-8 -translate-y-1/2 bg-secondary text-on-secondary px-3 py-1 rounded-full font-label-sm text-label-sm">Most Popular</div>
          <h3 className="font-headline-sm text-headline-sm text-on-primary">Creator</h3>
          <div className="mt-4 mb-8">
            <span className="font-display-lg-mobile text-display-lg-mobile text-on-primary">$49</span>
            <span className="font-body-md text-body-md text-on-primary/70">/month</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1 font-body-md text-body-md text-on-primary/90">
            <li className="flex items-center gap-3"><MdCheck className="text-secondary-container text-sm" /> Unlimited Courses</li>
            <li className="flex items-center gap-3"><MdCheck className="text-secondary-container text-sm" /> AI PDF to Video (10h/mo)</li>
            <li className="flex items-center gap-3"><MdCheck className="text-secondary-container text-sm" /> Advanced Analytics</li>
            <li className="flex items-center gap-3"><MdCheck className="text-secondary-container text-sm" /> Zero Transaction Fees</li>
          </ul>
          <button className="w-full rounded-lg bg-on-primary text-primary px-4 py-3 font-label-md text-label-md hover:bg-surface-container transition-colors">
            Start 14-Day Trial
          </button>
        </div>
        {/* MediLab Pro */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 flex flex-col">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">MediLab Pro</h3>
          <div className="mt-4 mb-8">
            <span className="font-display-lg-mobile text-display-lg-mobile text-on-surface">$199</span>
            <span className="font-body-md text-body-md text-on-surface-variant">/month</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1 font-body-md text-body-md text-on-surface-variant">
            <li className="flex items-center gap-3"><MdCheck className="text-tertiary-container text-sm" /> Everything in Creator</li>
            <li className="flex items-center gap-3"><MdCheck className="text-tertiary-container text-sm" /> Interactive Case Builder</li>
            <li className="flex items-center gap-3"><MdCheck className="text-tertiary-container text-sm" /> Clinical Scenario Logic</li>
            <li className="flex items-center gap-3"><MdCheck className="text-tertiary-container text-sm" /> CME Certification Tools</li>
          </ul>
          <button className="w-full rounded-lg bg-surface-container text-on-surface px-4 py-3 font-label-md text-label-md hover:bg-surface-container-high transition-colors border border-outline-variant">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
}
