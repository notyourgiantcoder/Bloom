export default function FeaturesStrip() {
  return (
    <section id="features" className="py-24 px-margin-mobile md:px-margin-desktop bg-surface max-w-container-max mx-auto rounded-[2rem] my-12 border border-outline-variant/30">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <span className="font-label-md text-label-md text-primary tracking-widest uppercase mb-4 block">The Toolkit</span>
        <h2 className="font-headline-md text-headline-md text-on-surface">Everything you need to distill complex knowledge.</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 ambient-shadow hover:-translate-y-1 transition-transform duration-300">
          <span className="material-symbols-outlined text-primary mb-6 text-3xl">view_quilt</span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">Course Builder</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">A tactile, drag-and-drop canvas. Construct lessons that feel like high-end editorial articles.</p>
        </div>
        {/* Card 2 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 ambient-shadow hover:-translate-y-1 transition-transform duration-300">
          <span className="material-symbols-outlined text-secondary mb-6 text-3xl">auto_awesome</span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">AI Studio</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">Transform raw PDFs and notes into structured modules, complete with quizzes and video scripts.</p>
        </div>
        {/* Card 3 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 ambient-shadow hover:-translate-y-1 transition-transform duration-300">
          <span className="material-symbols-outlined text-tertiary-container mb-6 text-3xl">vaccines</span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">MediLab</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">Interactive clinical scenarios. Build branching patient cases to test diagnostic reasoning.</p>
        </div>
        {/* Card 4 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 ambient-shadow hover:-translate-y-1 transition-transform duration-300">
          <span className="material-symbols-outlined text-primary mb-6 text-3xl">forum</span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">Community</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">Foster quiet, focused discussions. A space for intellectual exchange, free from algorithmic noise.</p>
        </div>
        {/* Card 5 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 ambient-shadow hover:-translate-y-1 transition-transform duration-300">
          <span className="material-symbols-outlined text-primary mb-6 text-3xl">payments</span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">Monetization</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">Simple, elegant paywalls. Sell courses, memberships, or digital goods with zero friction.</p>
        </div>
        {/* Card 6 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 ambient-shadow hover:-translate-y-1 transition-transform duration-300">
          <span className="material-symbols-outlined text-primary mb-6 text-3xl">monitoring</span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">Analytics</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">Clear, actionable insights. Understand student progress and content engagement at a glance.</p>
        </div>
      </div>
    </section>
  );
}
