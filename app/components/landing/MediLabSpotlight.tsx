export default function MediLabSpotlight() {
  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-tertiary-fixed my-12 rounded-[2rem] max-w-container-max mx-auto border border-tertiary-fixed-dim relative overflow-hidden">
      {/* Background Texture/Gradient for MediLab */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-tertiary-fixed-dim rounded-full blur-[120px] opacity-50 pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
          {/* Patient Card Mockup */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl w-full max-w-md p-6 ambient-shadow">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="font-label-sm text-label-sm text-tertiary-container uppercase tracking-wider">Case #402</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1">Patient: M. Chen, 45</h3>
              </div>
              <span className="material-symbols-outlined text-error">monitor_heart</span>
            </div>
            <div className="bg-surface px-4 py-3 rounded-lg border border-surface-variant mb-6 text-sm text-on-surface-variant">
              <strong>Chief Complaint:</strong> &quot;I feel like an elephant is sitting on my chest, and it&apos;s radiating to my jaw.&quot; Began 45 mins ago.
            </div>
            <p className="font-label-sm text-label-sm text-on-surface mb-3">Initial Action Required:</p>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 rounded-lg border border-outline-variant hover:border-primary hover:bg-surface-container-low transition-colors font-body-md text-body-md text-on-surface flex justify-between items-center">
                Administer Aspirin 325mg
                <span className="material-symbols-outlined text-outline text-sm">arrow_forward</span>
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg border border-outline-variant hover:border-primary hover:bg-surface-container-low transition-colors font-body-md text-body-md text-on-surface flex justify-between items-center">
                Order stat ECG
                <span className="material-symbols-outlined text-outline text-sm">arrow_forward</span>
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg border border-outline-variant hover:border-error hover:bg-error-container transition-colors font-body-md text-body-md text-on-surface flex justify-between items-center">
                Discharge with antacids
                <span className="material-symbols-outlined text-outline text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-4 pl-0 lg:pl-12">
          <span className="font-label-md text-label-md text-tertiary tracking-widest uppercase">MediLab — Beta</span>
          <h2 className="font-display-lg text-display-lg text-on-tertiary-fixed leading-tight">
            Medical education<br />that feels real.
          </h2>
          <p className="font-body-lg text-body-lg text-on-tertiary-fixed-variant mt-4 max-w-lg">
            Go beyond multiple choice. Build branching, interactive clinical scenarios that test diagnostic reasoning under pressure. Perfect for medical schools and continuing education.
          </p>
          <div className="mt-4">
            <button className="rounded-lg bg-tertiary text-on-tertiary px-6 py-3 font-label-md text-label-md hover:bg-tertiary-container transition-colors">
              Request Beta Access
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
