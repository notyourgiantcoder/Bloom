"use client";

import VideoGenerator from "./components/VideoGenerator";

export default function AIStudioPage() {
  return (
    <div className="max-w-container-max mx-auto flex flex-col gap-stack-lg">
      {/* Page Header */}
      <header className="mb-stack-sm flex justify-between items-end border-b border-outline-variant/30 pb-6">
        <div>
          <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary tracking-tight">AI Studio</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Transform medical documents into engaging video courses.</p>
        </div>
      </header>

      {/* Grid Layout (Replaced mock UI with real VideoGenerator component) */}
      <VideoGenerator />
    </div>
  );
}
