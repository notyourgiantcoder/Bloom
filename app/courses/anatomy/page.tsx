"use client";

import { useState } from "react";
import Image from "next/image";
import TopNavBar from "../../components/layout/TopNavBar";

export default function StudentLearningPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLesson, setActiveLesson] = useState("2.3");
  const [progress, setProgress] = useState(65);
  const [noteText, setNoteText] = useState("");
  const [notesList, setNotesList] = useState<string[]>([]);
  const [questions, setQuestions] = useState<{ user: string; text: string; time: string }[]>([
    { user: "Sarah Jenkins", text: "How does this apply when designing video pacing for high-retention storytelling?", time: "2h ago" }
  ]);
  const [newQuestion, setNewQuestion] = useState("");

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (noteText) {
      setNotesList([...notesList, noteText]);
      setNoteText("");
    }
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestion) {
      setQuestions([...questions, { user: "You", text: newQuestion, time: "Just now" }]);
      setNewQuestion("");
    }
  };

  return (
    <div className="bg-background text-on-background font-body-md antialiased relative min-h-screen flex flex-col">
      {/* Background Pulse */}
      <div 
        className="absolute w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(17,71,70,0.15)_0%,rgba(70,103,41,0.05)_50%,transparent_70%)] rounded-full blur-[40px] z-0 pointer-events-none top-[15%] right-[-100px]"
        style={{ animation: 'bloom-pulse 4s linear infinite' }}
      ></div>

      <TopNavBar />

      {/* Main Learning Layout */}
      <main className="flex-grow flex flex-col lg:flex-row max-w-[1600px] mx-auto w-full px-margin-mobile md:px-margin-desktop py-stack-lg gap-gutter h-[calc(100vh-80px)] z-10 relative">
        
        {/* Left Column: Video Area (65%) */}
        <div className="w-full lg:w-[65%] flex flex-col gap-stack-lg h-full overflow-y-auto custom-scrollbar pr-2">
          
          {/* Video Player Placeholder */}
          <div className="relative w-full aspect-video bg-surface-container rounded-xl border border-outline-variant/30 overflow-hidden group shadow-sm">
            {/* Video Poster Image */}
            <Image 
              alt="Video Poster" 
              fill
              className="object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBU-aGIzVCGOiIw6hcQlchAuabsCh11N186TlIRD2pnbpI6qEoanxuR1yOpIALsxwOR-4ICFas961JupGTCPM1CVavy5FgTsNTCgkKsY8S__xz7q4SDrRtGlz7h49Ogqs6rRAwjsd22TtJQT4OKS3MYs5FBDk-ECGQR5pfJ8m-0Ola3reE1dgHdryXY6-ybFSPKDEB5uru3dSY6h_rsE-XhXuVWV31SB2TfPPKcc2j-gQ0AFF7AHxtfeUIojNumuxv77cO3V8vJYCo"
              unoptimized
            />
            
            {/* Play Button Overlay */}
            {!isPlaying ? (
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/35 transition-colors cursor-pointer"
                onClick={() => setIsPlaying(true)}
              >
                <button className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center backdrop-blur-sm hover:scale-105 transition-all shadow-lg font-bold">
                  <span className="material-symbols-outlined filled text-4xl ml-1">play_arrow</span>
                </button>
              </div>
            ) : (
              <div className="absolute inset-0 bg-black flex items-center justify-center">
                <div className="text-center p-8">
                  <span className="material-symbols-outlined text-[64px] text-secondary animate-bounce">movie</span>
                  <h3 className="font-headline-sm text-headline-sm text-white mt-4">Playing Video Stream</h3>
                  <p className="font-body-md text-sm text-outline-variant mt-2">Lesson 2.3: Visual Hook &amp; Composition</p>
                  <button 
                    onClick={() => setIsPlaying(false)} 
                    className="mt-6 border border-outline-variant/30 px-4 py-2 rounded-lg text-white font-label-md text-label-sm hover:bg-white/10"
                  >
                    Pause Video
                  </button>
                </div>
              </div>
            )}

            {/* Custom Controls Bar (Teal) */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-primary-container/90 to-transparent flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-on-primary hover:text-secondary-container transition-colors"
              >
                <span className="material-symbols-outlined">{isPlaying ? "pause" : "play_arrow"}</span>
              </button>
              <div className="flex-grow h-1 bg-surface-container/30 rounded-full overflow-hidden cursor-pointer relative">
                <div className="absolute left-0 top-0 h-full bg-secondary" style={{ width: '33%' }}></div>
              </div>
              <span className="font-label-sm text-label-sm text-on-primary">12:34 / 45:00</span>
              <button className="text-on-primary hover:text-secondary-container transition-colors"><span className="material-symbols-outlined">volume_up</span></button>
              <button className="text-on-primary hover:text-secondary-container transition-colors"><span className="material-symbols-outlined">settings</span></button>
              <button className="text-on-primary hover:text-secondary-container transition-colors"><span className="material-symbols-outlined">fullscreen</span></button>
            </div>
          </div>

          {/* Lesson Info */}
          <div className="flex flex-col gap-stack-sm mt-2">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight">Visual Hook &amp; Storytelling</h1>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2 flex items-center gap-2 flex-wrap">
                  <span>Module 2, Lesson 3</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-outline-variant/30"></span>
                  <span>45 mins</span>
                </p>
              </div>
              
              <div className="flex items-center gap-3 bg-surface-container border border-outline-variant/30 rounded-full py-2 px-4 shadow-sm shrink-0">
                <Image 
                  alt="Creator Avatar" 
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full border border-outline-variant/30"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh2uek-1i7b3oNTPq7rUoiG8P44iOBcVgqrSOk2vyn8jF_GHMvPUTKbP-ugFLmFeAdiCwXE1hIFnHY95fKEjkeLLjrwx-r44739l6KJk9ZVTwLhxd_Op6bNAxVMqYgV1fOThKvB3W-OHG56epPozHm5LvwpHYmPsAjPOgRoENEDfuKRKFnS3ipEkDbHDyE3Pnsm6Lwcnh8ZCcMR20TLnFtT1ti41WPq-z0l2v3txB3on6WvhybTev0RvtQR5-HWJGT3bfUz9sVjdQ"
                  unoptimized
                />
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold leading-tight">Elena Rostova</span>
                  <span className="font-label-sm text-[10px] text-on-surface-variant">Creative Director</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-outline-variant/30 mt-4">
            <nav aria-label="Tabs" className="flex gap-8">
              <button 
                onClick={() => setActiveTab("overview")} 
                className={`py-4 px-1 font-label-md text-label-md transition-colors border-b-2 font-semibold ${activeTab === "overview" ? "border-secondary text-primary" : "border-transparent text-on-surface-variant hover:text-primary"}`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab("notes")} 
                className={`py-4 px-1 font-label-md text-label-md transition-colors border-b-2 font-semibold ${activeTab === "notes" ? "border-secondary text-primary" : "border-transparent text-on-surface-variant hover:text-primary"}`}
              >
                My Notes
              </button>
              <button 
                onClick={() => setActiveTab("qa")} 
                className={`py-4 px-1 font-label-md text-label-md transition-colors border-b-2 font-semibold ${activeTab === "qa" ? "border-secondary text-primary" : "border-transparent text-on-surface-variant hover:text-primary"}`}
              >
                Q&amp;A
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="font-body-md text-body-md text-on-surface pb-12 mt-4">
            {activeTab === "overview" && (
              <div className="space-y-4">
                <p>In this lesson, we explore how cinematic hooks are structured and how editing tempos keep viewers engaged. We will analyze frame balance, visual flow, and how audio levels set the correct ambient mood.</p>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mt-6 mb-3">Key Takeaways</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>The first 5 seconds rule: Structuring visual curiosity.</li>
                  <li>Designing for retention: Pacing, transitions, and cuts.</li>
                  <li>Analyzing real-world cinematic cohort case studies.</li>
                </ul>
                
                <div className="mt-8 p-6 bg-surface-container border border-outline-variant/30 rounded-xl flex items-start gap-4 shadow-sm">
                  <span className="material-symbols-outlined text-secondary text-2xl mt-1">description</span>
                  <div>
                    <h4 className="font-headline-sm text-lg text-on-surface">Lesson Resources</h4>
                    <p className="font-body-md text-sm text-on-surface-variant mt-1 mb-3">Download the companion workspaces, script sheets, and editing templates.</p>
                    <button className="text-primary font-label-md text-label-sm border border-primary px-4 py-2 rounded-lg hover:opacity-90 transition-colors inline-flex items-center gap-2">
                      Download PDF <span className="material-symbols-outlined text-[14px]">download</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notes" && (
              <div className="space-y-6">
                <form onSubmit={handleAddNote} className="flex flex-col gap-3">
                  <textarea 
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Take a note for this timestamp..."
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-lg p-3 font-body-md text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                    rows={3}
                  ></textarea>
                  <button type="submit" className="self-end bg-primary hover:opacity-90 text-on-primary font-label-md text-label-sm py-2 px-4 rounded-lg transition-colors font-bold shadow-sm">
                    Add Note
                  </button>
                </form>

                <div className="space-y-3">
                  <h4 className="font-label-md text-label-md text-primary uppercase tracking-wider">Saved Notes</h4>
                  {notesList.length === 0 ? (
                    <p className="text-on-surface-variant text-sm italic">No notes saved yet. Type above to save notes linked to your study session.</p>
                  ) : (
                    <ul className="space-y-2">
                      {notesList.map((note, idx) => (
                        <li key={idx} className="bg-surface-container p-4 rounded-lg border border-outline-variant/30 text-sm flex gap-3 items-start shadow-sm">
                          <span className="material-symbols-outlined text-outline-variant mt-0.5">sticky_note_2</span>
                          <span className="flex-1">{note}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {activeTab === "qa" && (
              <div className="space-y-6">
                <form onSubmit={handleAddQuestion} className="flex flex-col gap-3">
                  <textarea 
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Ask a question about this lesson..."
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-lg p-3 font-body-md text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                    rows={3}
                  ></textarea>
                  <button type="submit" className="self-end bg-primary hover:opacity-90 text-on-primary font-label-md text-label-sm py-2 px-4 rounded-lg transition-colors font-bold shadow-sm">
                    Post Question
                  </button>
                </form>

                <div className="space-y-4">
                  <h4 className="font-label-md text-label-md text-primary uppercase tracking-wider">Discussion Board</h4>
                  <ul className="space-y-4">
                    {questions.map((q, idx) => (
                      <li key={idx} className="bg-surface-container p-4 rounded-lg border border-outline-variant/30 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-sm text-[10px] font-bold">
                              {q.user[0]}
                            </div>
                            <span className="font-label-sm text-label-sm font-semibold text-on-surface">{q.user}</span>
                          </div>
                          <span className="font-label-sm text-[10px] text-on-surface-variant">{q.time}</span>
                        </div>
                        <p className="text-body-md text-sm text-on-surface-variant leading-relaxed pl-8">{q.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Sidebar (35%) */}
        <aside className="w-full lg:w-[35%] bg-surface-container-lowest border border-outline-variant/20 rounded-xl flex flex-col h-full overflow-hidden shadow-sm shrink-0">
          {/* Sidebar Header & Progress */}
          <div className="p-5 border-b border-outline-variant/20 bg-surface-container-lowest">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-3">Course Syllabus</h2>
            <div className="space-y-2">
              <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
                <span>Overall Progress</span>
                <span className="font-bold text-secondary">{progress}%</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-secondary h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Syllabus Items */}
          <div className="flex-grow overflow-y-auto custom-scrollbar p-4 space-y-4 max-h-[450px]">
            
            {/* Module 1 */}
            <div className="space-y-1">
              <h3 className="font-label-md text-label-sm text-primary uppercase tracking-wider px-2 py-1">Module 1: Foundations of Cinematography</h3>
              <div className="space-y-1">
                {/* Lesson 1.1 */}
                <div 
                  onClick={() => { setActiveLesson("1.1"); setProgress(15); }}
                  className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors ${activeLesson === "1.1" ? "bg-surface-container border border-primary/20" : "hover:bg-surface-container"}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary text-[20px] filled">check_circle</span>
                    <span className="font-body-md text-sm text-on-surface">1.1 Introduction to Camera Setups</span>
                  </div>
                  <span className="font-label-sm text-[11px] text-outline">15:00</span>
                </div>

                {/* Lesson 1.2 */}
                <div 
                  onClick={() => { setActiveLesson("1.2"); setProgress(35); }}
                  className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors ${activeLesson === "1.2" ? "bg-surface-container border border-primary/20" : "hover:bg-surface-container"}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary text-[20px] filled">check_circle</span>
                    <span className="font-body-md text-sm text-on-surface">1.2 Psychology of Composition</span>
                  </div>
                  <span className="font-label-sm text-[11px] text-outline">30:00</span>
                </div>
              </div>
            </div>

            {/* Module 2 */}
            <div className="space-y-1 pt-2">
              <h3 className="font-label-md text-label-sm text-primary uppercase tracking-wider px-2 py-1">Module 2: Calibrating Calmer Paces</h3>
              <div className="space-y-1">
                {/* Lesson 2.1 */}
                <div 
                  onClick={() => { setActiveLesson("2.1"); setProgress(45); }}
                  className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors ${activeLesson === "2.1" ? "bg-surface-container border border-primary/20" : "hover:bg-surface-container"}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary text-[20px] filled">check_circle</span>
                    <span className="font-body-md text-sm text-on-surface">2.1 Lighting Techniques</span>
                  </div>
                  <span className="font-label-sm text-[11px] text-outline">25:00</span>
                </div>

                {/* Lesson 2.2 */}
                <div 
                  onClick={() => { setActiveLesson("2.2"); setProgress(55); }}
                  className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors ${activeLesson === "2.2" ? "bg-surface-container border border-primary/20" : "hover:bg-surface-container"}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary text-[20px] filled">check_circle</span>
                    <span className="font-body-md text-sm text-on-surface">2.2 Audio Mastery &amp; Lavs</span>
                  </div>
                  <span className="font-label-sm text-[11px] text-outline">40:00</span>
                </div>

                {/* Lesson 2.3 (Active) */}
                <div 
                  onClick={() => { setActiveLesson("2.3"); setProgress(65); }}
                  className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors ${activeLesson === "2.3" ? "bg-surface-container border border-primary/30 shadow-sm" : "hover:bg-surface-container"}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-[20px]">play_circle</span>
                    <span className="font-body-md text-sm font-semibold text-primary">2.3 Visual Hook &amp; Composition</span>
                  </div>
                  <span className="font-label-sm text-[11px] text-primary">45:00</span>
                </div>

                {/* Lesson 2.4 (Draft) */}
                <div 
                  onClick={() => { setActiveLesson("2.4"); setProgress(78); }}
                  className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors ${activeLesson === "2.4" ? "bg-surface-container border border-primary/20 animate-pulse" : "hover:bg-surface-container opacity-60"}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-outline-variant text-[20px]">quiz</span>
                    <span className="font-body-md text-sm italic text-on-surface-variant">2.4 Final Script Feedback (Draft)</span>
                  </div>
                  <span className="font-label-sm text-[11px] text-outline">10:00</span>
                </div>
              </div>
            </div>

          </div>
        </aside>

      </main>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bloom-pulse {
            0% { transform: scale(1.0); opacity: 0.7; }
            50% { transform: scale(1.04); opacity: 1.0; }
            100% { transform: scale(1.0); opacity: 0.7; }
        }
      `}} />
    </div>
  );
}
