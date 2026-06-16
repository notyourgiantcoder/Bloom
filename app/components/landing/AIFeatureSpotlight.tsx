export default function AIFeatureSpotlight() {
  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 flex flex-col gap-4">
          <span className="font-label-md text-label-md text-secondary tracking-widest uppercase">AI PDF → Video</span>
          <h2 className="font-display-lg text-display-lg text-on-surface leading-tight">
            Upload a PDF.<br />Get a full video course.
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-4">
            Stop recording slides. Bloom&apos;s AI ingests your dense academic papers and generates professional, synthesized video lessons instantly.
          </p>
        </div>
        <div className="lg:col-span-7 bg-surface-container p-8 rounded-2xl border border-outline-variant relative overflow-hidden flex gap-6">
          {/* Fake UI Left */}
          <div className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex flex-col items-center justify-center border-dashed gap-4 text-center">
            <span className="material-symbols-outlined text-primary-fixed-dim text-4xl">upload_file</span>
            <p className="font-label-md text-label-md text-on-surface-variant">Drag neuroscience_v4.pdf here</p>
            <div className="w-full h-1 bg-surface-variant rounded mt-4 overflow-hidden">
              <div className="w-full h-full bg-secondary animate-pulse"></div>
            </div>
          </div>
          {/* Fake UI Right */}
          <div className="flex-1 flex flex-col gap-3">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 flex items-center gap-3 ambient-shadow">
              <div className="w-16 h-10 bg-primary-container rounded flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary-container text-sm">play_arrow</span>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface">1. Intro to Synapses</p>
                <p className="font-label-sm text-label-sm text-outline text-[10px]">4:20 • Generated</p>
              </div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 flex items-center gap-3 ambient-shadow">
              <div className="w-16 h-10 bg-surface-variant rounded flex items-center justify-center">
                <span className="material-symbols-outlined text-outline text-sm">hourglass_empty</span>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface">2. Neuroplasticity</p>
                <p className="font-label-sm text-label-sm text-outline text-[10px]">Generating script...</p>
              </div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 flex items-center gap-3 ambient-shadow opacity-60">
              <div className="w-16 h-10 bg-surface-variant rounded"></div>
              <div className="w-24 h-4 bg-surface-variant rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
