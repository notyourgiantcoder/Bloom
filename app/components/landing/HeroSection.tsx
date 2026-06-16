export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
        {/* Left Content */}
        <div className="lg:col-span-6 z-10 flex flex-col gap-stack-lg">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface max-w-2xl">
            Teach anything.<br />Reach everyone.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
            The quiet, powerful workspace for professional educators. Build courses, harness AI, and host interactive medical simulations all in one tactile, beautifully simple platform.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button className="rounded-lg bg-primary text-on-primary px-8 py-3.5 font-label-md text-label-md hover:bg-surface-tint transition-colors focus:ring-2 focus:ring-primary ambient-shadow">
              Start building
            </button>
            <button className="rounded-lg bg-transparent border border-outline-variant text-primary px-8 py-3.5 font-label-md text-label-md hover:bg-surface-container-low transition-colors">
              Explore platform
            </button>
          </div>
        </div>
        {/* Right Artwork / Mockup */}
        <div className="lg:col-span-6 relative h-[500px] flex justify-center items-center mt-12 lg:mt-0">
          {/* The Bloom Pulse */}
          <div className="absolute w-[350px] h-[350px] bg-gradient-to-tr from-primary-container to-secondary-container blur-[100px] rounded-full animate-bloom-pulse mix-blend-multiply opacity-80 pointer-events-none"></div>
          {/* Floating Mockup Element */}
          <div className="relative z-10 w-full max-w-md bg-surface-container-lowest border border-outline-variant rounded-xl p-6 ambient-shadow transform rotate-[-2deg] hover:rotate-0 transition-transform duration-700 ease-out">
            <div className="flex items-center gap-4 mb-6 border-b border-surface-variant pb-4">
              <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined filled">play_lesson</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Advanced Cardiology</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Module 4 • Arrhythmias</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-secondary rounded-full"></div>
              </div>
              <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
                <span>65% Complete</span>
                <span>Next: ECG Analysis</span>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="rounded-lg bg-secondary text-on-secondary px-4 py-2 font-label-sm text-label-sm hover:opacity-90 transition-opacity">
                Resume Lesson
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
