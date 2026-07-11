import { MdUploadFile, MdPlayArrow, MdHourglassEmpty } from "react-icons/md";

export default function AIFeatureSpotlight() {
  return (
    <section
      className="landing-container"
      style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
    >
      <div className="landing-two-col">
        {/* Text Column */}
        <div style={{ maxWidth: "28rem" }}>
          <h5>AI PDF → Video</h5>
          <h2 className="mt-3">
            Upload a PDF.
            <br />
            Get a full video course.
          </h2>
          <p className="text-on-surface-variant mt-4" style={{ fontSize: "1.1rem" }}>
            Stop recording slides. Bloom&apos;s AI ingests your dense academic
            papers and generates professional, synthesized video lessons
            instantly.
          </p>
        </div>

        {/* Mockup Column */}
        <div
          className="bg-surface-container rounded-[2rem] border border-outline-variant/30 flex gap-4 w-full"
          style={{ maxWidth: "32rem", padding: "1.5rem", minHeight: "18rem" }}
        >
          {/* Upload Area */}
          <div className="landing-mockup-card flex-1 flex flex-col items-center justify-center gap-3 text-center"
               style={{ borderStyle: "dashed", padding: "1.5rem" }}>
            <MdUploadFile className="text-primary text-4xl" />
            <p className="text-on-surface-variant text-sm font-medium">
              Drag neuroscience_v4.pdf here
            </p>
            <div className="w-full h-1 bg-surface-variant rounded-full mt-3 overflow-hidden">
              <div className="w-full h-full bg-secondary animate-pulse rounded-full" />
            </div>
          </div>

          {/* Generated Videos */}
          <div className="flex-1 flex flex-col gap-3">
            <div className="landing-mockup-card flex items-center gap-3" style={{ padding: "0.85rem" }}>
              <div className="w-12 h-8 bg-primary-container rounded flex items-center justify-center flex-shrink-0">
                <MdPlayArrow className="text-on-primary-container text-sm" />
              </div>
              <div>
                <p className="text-on-surface text-sm font-medium" style={{ margin: 0 }}>
                  1. Intro to Synapses
                </p>
                <p className="text-outline text-xs" style={{ margin: 0 }}>4:20 • Generated</p>
              </div>
            </div>
            <div className="landing-mockup-card flex items-center gap-3" style={{ padding: "0.85rem" }}>
              <div className="w-12 h-8 bg-surface-variant rounded flex items-center justify-center flex-shrink-0">
                <MdHourglassEmpty className="text-outline text-sm" />
              </div>
              <div>
                <p className="text-on-surface text-sm font-medium" style={{ margin: 0 }}>
                  2. Neuroplasticity
                </p>
                <p className="text-outline text-xs" style={{ margin: 0 }}>Generating script...</p>
              </div>
            </div>
            <div
              className="landing-mockup-card flex items-center gap-3 opacity-50"
              style={{ padding: "0.85rem" }}
            >
              <div className="w-12 h-8 bg-surface-variant rounded flex-shrink-0" />
              <div className="w-20 h-3 bg-surface-variant rounded" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
