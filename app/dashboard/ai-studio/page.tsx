"use client";

import { useState } from "react";
import Link from "next/link";

export default function AIStudioPage() {
  const [voiceModel, setVoiceModel] = useState("Elena (Warm, Academic)");
  const [pacing, setPacing] = useState(1.0);
  const [ambient, setAmbient] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(75);
  const [statusLogs, setStatusLogs] = useState([
    { text: "Parsing PDF metadata...", status: "Done", type: "success" },
    { text: "Extracting core chapters...", status: "Done", type: "success" },
    { text: "Rendering scenes...", status: "In Progress", type: "loading" }
  ]);

  const handleSynthesize = () => {
    setIsGenerating(true);
    setProgress(0);
    setStatusLogs([
      { text: "Initiating audio synthesis...", status: "Queued", type: "info" }
    ]);

    setTimeout(() => {
      setStatusLogs(prev => [
        ...prev,
        { text: "Parsing course outline and transcripts...", status: "Done", type: "success" }
      ]);
      setProgress(30);
    }, 800);

    setTimeout(() => {
      setStatusLogs(prev => [
        ...prev,
        { text: "Generating deep voice simulation...", status: "Running", type: "loading" }
      ]);
      setProgress(60);
    }, 1800);

    setTimeout(() => {
      setStatusLogs(prev => [
        ...prev,
        { text: "Mixing background ambient tracks...", status: "Running", type: "loading" }
      ]);
      setProgress(85);
    }, 2800);

    setTimeout(() => {
      setStatusLogs(prev => [
        ...prev.map(l => l.status === "Running" || l.status === "Queued" ? { ...l, status: "Done", type: "success" } : l),
        { text: "Voice synthesis complete", status: "Done", type: "success" }
      ]);
      setProgress(100);
      setIsGenerating(false);
    }, 4000);
  };

  return (
    <div className="max-w-container-max mx-auto flex flex-col gap-stack-lg">
      {/* Page Header */}
      <header className="mb-stack-sm flex justify-between items-end border-b border-outline-variant/30 pb-6">
        <div>
          <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary tracking-tight">AI Studio</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Transform medical documents into engaging video courses.</p>
        </div>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Column (Upload & Output) */}
        <div className="lg:col-span-8 flex flex-col gap-stack-lg">
          {/* Upload Zone */}
          <section className="bg-surface-container/40 rounded-xl border-2 border-dashed border-primary-fixed p-[40px] md:p-[64px] flex flex-col items-center justify-center text-center transition-colors hover:bg-surface-container/70 cursor-pointer group relative overflow-hidden">
            <div className="w-16 h-16 rounded-full bg-primary-fixed/30 flex items-center justify-center mb-stack-md group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[32px] text-primary">upload_file</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Upload Source Material</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg max-w-md">Drag and drop your PDF protocols, research papers, or clinical guidelines here to begin.</p>
            <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
              <button className="bg-primary text-on-primary font-label-md text-label-md py-2.5 px-6 rounded-lg hover:opacity-90 transition-colors shadow-sm font-semibold">
                Browse Files
              </button>
              <span className="font-body-md text-body-md text-outline-variant">or import from</span>
              <button className="flex items-center gap-2 text-primary font-label-md text-label-md py-2 px-4 rounded-lg border border-outline-variant hover:bg-surface-container transition-colors bg-transparent">
                <span className="material-symbols-outlined text-[18px]">add_to_drive</span>
                Drive
              </button>
              <button className="flex items-center gap-2 text-primary font-label-md text-label-md py-2 px-4 rounded-lg border border-outline-variant hover:bg-surface-container transition-colors bg-transparent">
                <span className="material-symbols-outlined text-[18px]">link</span>
                Notion
              </button>
            </div>
          </section>

          {/* Output Panel */}
          <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 md:p-8 card-shadow">
            <div className="flex justify-between items-center mb-stack-lg border-b border-outline-variant/30 pb-4">
              <h3 className="font-headline-sm text-headline-sm text-primary">Generated Course Lessons</h3>
              <button className="text-secondary font-label-md text-label-md hover:underline flex items-center gap-1">
                Export All <span className="material-symbols-outlined text-[16px]">download</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack-md">
              {/* Lesson Card 1 */}
              <div className="group relative bg-surface rounded-lg overflow-hidden border border-outline-variant/50 hover:border-primary-fixed transition-all cursor-pointer card-shadow">
                <div className="aspect-video bg-surface-dim relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-85 mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-inverse-surface/20">
                    <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center backdrop-blur-sm shadow-md font-bold">
                      <span className="material-symbols-outlined text-[28px] filled">play_arrow</span>
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-inverse-surface/90 text-inverse-on-surface font-label-sm text-[10px] px-2 py-0.5 rounded backdrop-blur-md">02:45</span>
                </div>
                <div className="p-4 bg-surface-container-low">
                  <h4 className="font-label-md text-label-md text-primary mb-1 line-clamp-1">1. Introduction to Protocols</h4>
                  <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block"></span> Rendered successfully
                  </p>
                </div>
              </div>

              {/* Lesson Card 2 */}
              <div className="group relative bg-surface rounded-lg overflow-hidden border border-outline-variant/50 hover:border-primary-fixed transition-all cursor-pointer card-shadow">
                <div className="aspect-video bg-surface-dim relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-85 mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-inverse-surface/20">
                    <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center backdrop-blur-sm shadow-md font-bold">
                      <span className="material-symbols-outlined text-[28px] filled">play_arrow</span>
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-inverse-surface/90 text-inverse-on-surface font-label-sm text-[10px] px-2 py-0.5 rounded backdrop-blur-md">05:12</span>
                </div>
                <div className="p-4 bg-surface-container-low">
                  <h4 className="font-label-md text-label-md text-primary mb-1 line-clamp-1">2. Core Methodology</h4>
                  <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block"></span> Rendered successfully
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column (Processing State & Customization) */}
        <div className="lg:col-span-4 flex flex-col gap-stack-lg">
          {/* Processing State Terminal */}
          <div className="bg-inverse-surface rounded-xl p-5 md:p-6 card-shadow overflow-hidden relative border border-outline-variant/10 text-inverse-on-surface">
            <div className="flex items-center gap-2 mb-4 border-b border-outline/20 pb-3">
              <span className="material-symbols-outlined text-secondary text-[18px]">terminal</span>
              <span className="font-label-sm text-label-sm text-outline-variant uppercase tracking-wider">System Output</span>
            </div>
            
            <div className="font-label-md text-label-sm space-y-2 mb-6 min-h-[120px] font-mono">
              {statusLogs.map((log, i) => (
                <div key={i} className="flex justify-between items-start">
                  <span className={log.type === "success" ? "text-secondary-fixed/90" : log.type === "loading" ? "text-primary-fixed-dim" : "text-surface-bright"}>
                    &gt; {log.text}
                  </span>
                  <span className={log.status === "Done" ? "text-secondary font-semibold" : "text-outline animate-pulse"}>
                    [{log.status}]
                  </span>
                </div>
              ))}
              {isGenerating && (
                <div className="text-outline-variant animate-pulse">&gt; Synthesizing audio channels...</div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-on-primary-fixed rounded-full overflow-hidden mt-auto">
              <div 
                className="h-full bg-secondary rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Customization Panel */}
          <aside className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 card-shadow">
            <div className="flex items-center gap-2 mb-stack-md border-b border-outline-variant/30 pb-4">
              <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
              <h3 className="font-headline-sm text-headline-sm text-primary">Studio Settings</h3>
            </div>
            
            <div className="space-y-stack-md">
              {/* Voiceover Setting */}
              <div>
                <label className="block font-label-md text-label-md text-primary mb-2">Voice Model</label>
                <div className="relative">
                  <select 
                    value={voiceModel}
                    onChange={(e) => setVoiceModel(e.target.value)}
                    className="w-full appearance-none bg-surface-container border border-outline-variant/30 rounded-lg py-2.5 pl-4 pr-10 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  >
                    <option>Elena (Warm, Academic)</option>
                    <option>Dr. Marcus (Professional, Calm)</option>
                    <option>AI Assistant (Neutral, Clear)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none">expand_more</span>
                </div>
              </div>

              {/* Pacing Setting */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block font-label-md text-label-md text-primary">Speech Pacing</label>
                  <span className="font-label-sm text-label-sm text-outline-variant">{pacing.toFixed(1)}x</span>
                </div>
                <input 
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={pacing}
                  onChange={(e) => setPacing(parseFloat(e.target.value))}
                  className="w-full h-1 bg-surface-dim rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[10px] font-label-sm text-outline mt-1 px-1">
                  <span>Relaxed</span>
                  <span>Brisk</span>
                </div>
              </div>

              {/* Music Toggle */}
              <div className="pt-2">
                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="font-label-md text-label-md text-primary">Background Ambient</span>
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      checked={ambient} 
                      onChange={(e) => setAmbient(e.target.checked)} 
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-surface-dim peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </div>
                </label>
                <p className="font-body-md text-[13px] leading-snug text-on-surface-variant mt-1">Subtle low-fi beats mixed for concentration.</p>
              </div>
            </div>

            <button 
              onClick={handleSynthesize}
              disabled={isGenerating}
              className="w-full mt-stack-lg bg-primary hover:opacity-90 text-on-primary font-label-md text-label-md py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 font-semibold"
            >
              {isGenerating ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  Synthesizing...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                  Synthesize Voiceover
                </>
              )}
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}
