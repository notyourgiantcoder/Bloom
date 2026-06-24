"use client";
import { MdUploadFile, MdAddToDrive, MdLink, MdDownload, MdPlayArrow, MdTerminal, MdTune, MdExpandMore, MdAutoAwesome } from "react-icons/md";

import { useEffect, useState, useRef } from "react";
import { createRenderJob } from "../actions";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { RealtimeChannel } from "@supabase/supabase-js";

type RenderJobStatus =
  | "queued"
  | "processing_pipeline"
  | "manifest_ready"
  | "rendering_video"
  | "complete"
  | "failed";

interface StatusConfig {
  label: string;
  progress: number;
  isError?: boolean;
}

const STATUS_MAP: Record<RenderJobStatus, StatusConfig | ((progress: number, errorMessage?: string) => StatusConfig)> = {
  queued: { label: "Uploading your PDF...", progress: 0 },
  processing_pipeline: (progress: number) => ({
    label: "Processing your content...",
    progress: progress || 10,
  }),
  manifest_ready: { label: "Preparing video render engine...", progress: 90 },
  rendering_video: { label: "Rendering your video frames with Remotion...", progress: 95 },
  complete: { label: "Your video is ready!", progress: 100 },
  failed: (progress: number, errorMessage?: string) => ({
    label: errorMessage || "Something went wrong. Please try again.",
    progress: progress || 0,
    isError: true,
  }),
};

function getStatusConfig(status: RenderJobStatus, progress: number, errorMessage?: string): StatusConfig {
  const mapper = STATUS_MAP[status];
  if (typeof mapper === "function") {
    return mapper(progress, errorMessage);
  }
  return mapper as StatusConfig;
}

export default function VideoGenerator() {
  const [voiceModel, setVoiceModel] = useState("Elena (Warm, Academic)");
  const [pacing, setPacing] = useState(1.0);
  const [ambient, setAmbient] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };


  const [jobId, setJobId] = useState<string | null>(null);
  const [status, setStatus] = useState<RenderJobStatus | "">("");
  const [progress, setProgress] = useState(0);
  const [label, setLabel] = useState("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | "">("");
  const [loading, setLoading] = useState(false);
  const renderTriggeredRef = useRef<Record<string, boolean>>({});

  useEffect(() => {
    let channel: RealtimeChannel;

    if (jobId) {
      const supabase = getSupabaseBrowserClient();
      channel = supabase
        .channel(`job-${jobId}`)
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "render_jobs",
            filter: `id=eq.${jobId}`,
          },
          (payload) => {
            const newStatus = payload.new.status as RenderJobStatus;
            const newProgress = payload.new.progress as number;
            const newErrorMessage = payload.new.error_message as string | null;

            setStatus(newStatus);
            if (payload.new.video_url) {
              setVideoUrl(payload.new.video_url as string);
            }
            if (newProgress !== undefined && newProgress !== null) {
              setProgress(newProgress);
            }
            if (newErrorMessage) {
              setErrorMessage(newErrorMessage);
            }

            setProgress((prevProgress) => {
              const currentProgress = newProgress ?? prevProgress;
              const config = getStatusConfig(newStatus, currentProgress, newErrorMessage ?? undefined);
              setLabel(config.label);
              return currentProgress;
            });

            if (newStatus === "complete" || newStatus === "failed") {
              setLoading(false);
            }

            if (newStatus === "manifest_ready" && payload.new.manifest_url && jobId) {
              if (!renderTriggeredRef.current[jobId]) {
                renderTriggeredRef.current[jobId] = true;
                fetch("/api/render", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    job_id: jobId,
                    manifest_url: payload.new.manifest_url,
                  }),
                }).then(async (res) => {
                  if (!res.ok) {
                    setErrorMessage("Cloud AWS rendering not configured. Your manifest is ready for local testing!");
                    setLoading(false);
                  }
                }).catch((err) => {
                  setErrorMessage("Failed to trigger cloud render. Proceed with local testing.");
                  setLoading(false);
                });
              }
            }
          }
        )
        .subscribe();
    }

    return () => {
      if (channel) getSupabaseBrowserClient().removeChannel(channel);
    };
  }, [jobId]);

  const handleSynthesize = async () => {
    if (!selectedFile) {
      setErrorMessage("Please select a PDF file first.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    try {
      setLabel("Uploading your PDF to storage...");
      setStatus("queued");
      setProgress(0);

      const supabase = getSupabaseBrowserClient();
      const filePath = `inputs/${Date.now()}_${selectedFile.name}`;
      
      const { error: uploadError } = await supabase.storage
        .from("assets")
        .upload(filePath, selectedFile);

      if (uploadError) {
        throw new Error("Failed to upload PDF: " + uploadError.message);
      }

      const { data: publicUrlData } = supabase.storage
        .from("assets")
        .getPublicUrl(filePath);

      const id = await createRenderJob(publicUrlData.publicUrl);
      setJobId(id);
      setLabel("Processing job...");
    } catch (err: any) {
      setErrorMessage(err.message);
      setLoading(false);
      setStatus("");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
      {/* Left Column (Upload & Output) */}
      <div className="lg:col-span-8 flex flex-col gap-stack-lg">
        {/* Upload Zone */}
        <section 
          className="bg-surface-container/40 rounded-xl border-2 border-dashed border-primary-fixed p-[40px] md:p-[64px] flex flex-col items-center justify-center text-center transition-colors hover:bg-surface-container/70 cursor-pointer group relative overflow-hidden"
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="application/pdf" 
            className="hidden" 
          />
          <div className="w-16 h-16 rounded-full bg-primary-fixed/30 flex items-center justify-center mb-stack-md group-hover:scale-105 transition-transform">
            <MdUploadFile className="text-[32px] text-primary" />
          </div>
          <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Upload Source Material</h3>
          <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg max-w-md">
            {selectedFile ? `Selected: ${selectedFile.name}` : "Drag and drop your PDF protocols, research papers, or clinical guidelines here to begin."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-primary text-on-primary font-label-md text-label-md py-2.5 px-6 rounded-lg hover:opacity-90 transition-colors shadow-sm font-semibold"
            >
              Browse Files
            </button>
            <span className="font-body-md text-body-md text-outline-variant">or import from</span>
            <button className="flex items-center gap-2 text-primary font-label-md text-label-md py-2 px-4 rounded-lg border border-outline-variant hover:bg-surface-container transition-colors bg-transparent">
              <MdAddToDrive className="text-[18px]" />
              Drive
            </button>
            <button className="flex items-center gap-2 text-primary font-label-md text-label-md py-2 px-4 rounded-lg border border-outline-variant hover:bg-surface-container transition-colors bg-transparent">
              <MdLink className="text-[18px]" />
              Notion
            </button>
          </div>
        </section>

        {/* Output Panel */}
        <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 md:p-8 card-shadow">
          <div className="flex justify-between items-center mb-stack-lg border-b border-outline-variant/30 pb-4">
            <h3 className="font-headline-sm text-headline-sm text-primary">Generated Course Lessons</h3>
            <button className="text-secondary font-label-md text-label-md hover:underline flex items-center gap-1">
              Export All <MdDownload className="text-[16px]" />
            </button>
          </div>
          
          {videoUrl ? (
            <div className="w-full aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
              <video src={videoUrl} controls autoPlay className="w-full h-full object-contain" />
            </div>
          ) : (
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
                      <MdPlayArrow className="text-[28px]" />
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
                      <MdPlayArrow className="text-[28px]" />
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
          )}
        </section>
      </div>

      {/* Right Column (Processing State & Customization) */}
      <div className="lg:col-span-4 flex flex-col gap-stack-lg">
        {/* Processing State Terminal */}
        <div className="bg-inverse-surface rounded-xl p-5 md:p-6 card-shadow overflow-hidden relative border border-outline-variant/10 text-inverse-on-surface">
          <div className="flex items-center gap-2 mb-4 border-b border-outline/20 pb-3">
            <MdTerminal className="text-secondary text-[18px]" />
            <span className="font-label-sm text-label-sm text-outline-variant uppercase tracking-wider">System Output</span>
          </div>
          
          <div className="font-label-md text-label-sm space-y-2 mb-6 min-h-[120px] font-mono">
            {status ? (
              <div className="flex justify-between items-start">
                <span className={status === "complete" ? "text-secondary-fixed/90" : status === "failed" ? "text-red-400" : "text-primary-fixed-dim"}>
                  &gt; {label}
                </span>
                <span className={status === "complete" ? "text-secondary font-semibold" : status === "failed" ? "text-red-500 font-semibold" : "text-outline animate-pulse"}>
                  [{status}]
                </span>
              </div>
            ) : (
              <div className="text-outline-variant">&gt; Waiting for job...</div>
            )}
            {errorMessage && (
              <div className="text-red-400 mt-2 text-xs">
                {errorMessage}
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-on-primary-fixed rounded-full overflow-hidden mt-auto">
            <div 
              className="h-full bg-secondary rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progress}%`, backgroundColor: status === "failed" ? "#EF4444" : undefined }}
            ></div>
          </div>
        </div>

        {/* Customization Panel */}
        <aside className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 card-shadow">
          <div className="flex items-center gap-2 mb-stack-md border-b border-outline-variant/30 pb-4">
            <MdTune className="text-primary text-[20px]" />
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
                <MdExpandMore className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none" />
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
            disabled={loading}
            className="w-full mt-stack-lg bg-primary hover:opacity-90 text-on-primary font-label-md text-label-md py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 font-semibold"
          >
            {loading ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Synthesizing...
              </>
            ) : (
              <>
                <MdAutoAwesome className="text-[20px]" />
                Synthesize Voiceover
              </>
            )}
          </button>
        </aside>
      </div>
    </div>
  );
}