"use client";
import Link from "next/link";
import { MdVisibility, MdAdd, MdFolder, MdFormatBold, MdFormatItalic, MdFormatUnderlined, MdFormatListBulleted, MdFormatListNumbered, MdAddPhotoAlternate, MdCode, MdUpload, MdDeleteForever, MdOutlineArticle } from "react-icons/md";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

export default function CourseBuilderPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [title, setTitle] = useState("Untitled Course");
  const [saving, setSaving] = useState(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = getSupabaseBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/sign-in");
      } else {
        setUser(user);
      }
      setLoading(false);
    };
    checkAuth();
  }, [router]);

  const handlePublish = async () => {
    if (!user) return;
    setSaving(true);
    const supabase = getSupabaseBrowserClient();
    
    const { error } = await supabase
      .from("courses")
      .insert({
        user_id: user.id,
        title: title,
        description: "A new course created in Bloom.",
        status: "draft"
      });
      
    setSaving(false);
    if (!error) {
      router.push("/dashboard");
    } else {
      alert("Error saving course: " + error.message);
    }
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center text-outline">Loading builder...</div>;
  }

  return (
    <div className="bg-surface-container-lowest text-on-surface font-body-md overflow-hidden h-screen flex flex-col relative w-full">
      <div 
        className="absolute w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(45,95,93,0.15)_0%,rgba(123,160,91,0.05)_100%)] rounded-full blur-[60px] z-0 pointer-events-none top-[-10%] left-[-10%]"
        style={{ animation: 'bloomPulse 4s linear infinite' }}
      ></div>

      {/* TopNavBar */}
      <header className="bg-surface docked full-width top-0 sticky z-50 shadow-sm transition-colors">
        <div className="flex justify-between items-center w-full px-margin-desktop py-4 max-w-container-max mx-auto">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <Link href="/" className="text-headline-md font-headline-md font-bold text-primary">Bloom</Link>
            <span className="text-outline-variant">|</span>
            <span className="font-body-md text-on-surface-variant">Course Builder</span>
          </div>
          {/* Global Nav Context */}
          <nav className="hidden md:flex gap-8 items-center font-label-md text-label-md">
            <Link href="/dashboard" className="text-on-surface-variant hover:text-primary transition-colors">Dashboard</Link>
          </nav>
          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-primary font-label-md text-label-sm border border-primary/30 px-3 py-1.5 rounded-lg hover:bg-primary/5 transition-colors">
              <MdVisibility className="text-[18px]" />
              Preview
            </button>
            <button 
                onClick={handlePublish}
                disabled={saving}
                className="font-label-md text-label-md text-on-primary bg-primary hover:bg-surface-tint px-6 py-2 rounded-lg transition-colors inline-block text-center flex items-center justify-center disabled:opacity-60">
              {saving ? "Saving..." : "Save Draft"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace (3 Panel Layout) */}
      <main className="flex-1 flex overflow-hidden w-full max-w-[1600px] mx-auto bg-surface-container-lowest relative z-10 border-t border-[#E8E0D5]">
        
        {/* Left Panel: Course Outline Tree (Empty State) */}
        <aside className="w-80 border-r border-[#E8E0D5] bg-surface-container-lowest flex flex-col h-full flex-shrink-0 z-20">
          <div className="p-4 border-b border-[#E8E0D5] flex justify-between items-center bg-white sticky top-0">
            <h2 className="font-label-md text-label-md text-primary tracking-wide">COURSE OUTLINE</h2>
            <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md px-4 mt-2">
              <MdAdd className="text-[20px]" /> Add Module
            </button>
          </div>
          <div className="flex-1 overflow-y-auto custom-scroll p-8 flex flex-col items-center justify-center text-center opacity-60">
             <MdFolder className="text-4xl text-outline mb-2" />
             <p className="font-body-md text-outline">No modules yet.</p>
             <p className="font-body-sm text-sm text-outline">Click Add Module to start organizing your course.</p>
          </div>
          <div className="p-4 border-t border-[#E8E0D5] bg-surface-container-low mt-auto">
            <div className="flex items-center justify-between text-label-sm font-label-sm text-outline-variant">
              <span>Status: New Draft</span>
              <span>Not saved</span>
            </div>
          </div>
        </aside>

        {/* Center Panel: Rich Text Editor Canvas */}
        <section className="flex-1 flex flex-col min-w-0 bg-surface-container-lowest relative z-10">
          {/* Formatting Toolbar */}
          <div className="h-14 border-b border-[#E8E0D5] bg-white flex items-center px-6 gap-6 flex-shrink-0 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2">
              <select className="bg-transparent border-none text-body-md font-body-md text-on-surface focus:ring-0 cursor-pointer p-0 pr-6 outline-none">
                <option>Normal text</option>
                <option>Heading 1</option>
                <option>Heading 2</option>
                <option>Heading 3</option>
              </select>
            </div>
            <div className="w-px h-6 bg-[#E8E0D5]"></div>
            
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded hover:bg-surface-container text-on-surface transition-colors"><MdFormatBold className="text-[20px]" /></button>
              <button className="p-1.5 rounded hover:bg-surface-container text-on-surface transition-colors"><MdFormatItalic className="text-[20px]" /></button>
              <button className="p-1.5 rounded hover:bg-surface-container text-on-surface transition-colors"><MdFormatUnderlined className="text-[20px]" /></button>
            </div>
            
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded hover:bg-surface-container text-on-surface transition-colors"><MdFormatListBulleted className="text-[20px]" /></button>
              <button className="p-1.5 rounded hover:bg-surface-container text-on-surface transition-colors"><MdFormatListNumbered className="text-[20px]" /></button>
            </div>

            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded hover:bg-surface-container text-on-surface transition-colors flex items-center gap-1 pr-3">
                <MdAddPhotoAlternate className="text-[20px]" />
                <span className="font-label-sm text-xs">Media</span>
              </button>
              <button className="p-1.5 rounded hover:bg-surface-container text-on-surface transition-colors flex items-center gap-1 pr-3">
                <MdCode className="text-[20px]" />
                <span className="font-label-sm text-xs">Block</span>
              </button>
            </div>
          </div>
          {/* Editor Canvas (Empty State) */}
          <div className="flex-1 overflow-y-auto custom-scroll p-8 md:p-12">
            <div className="max-w-[720px] mx-auto">
              {/* Title Input */}
              <input 
                className="w-full bg-transparent border-none text-display-lg font-display-lg text-primary placeholder:text-outline-variant focus:ring-0 p-0 mb-8 outline-none" 
                placeholder="Course Title..." 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {/* Content Area */}
              <div className="space-y-6 text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
                
                {/* Empty block indicator */}
                <div className="flex flex-col items-center justify-center text-outline-variant opacity-50 hover:opacity-100 transition-opacity mt-20 cursor-text p-12 border-2 border-dashed border-[#E8E0D5] rounded-xl">
                  <MdOutlineArticle className="text-[48px] mb-4" />
                  <span className="font-body-md text-body-md mb-2">Start writing your course content here.</span>
                  <span className="font-body-sm text-sm">Type &apos;/&apos; for commands to add images, videos, or quizzes.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Panel: Lesson Settings */}
        <aside className="hidden xl:flex w-80 border-l border-[#E8E0D5] bg-surface-container-lowest flex-col h-full flex-shrink-0 z-20">
          <div className="p-4 border-b border-[#E8E0D5] bg-white sticky top-0">
            <h2 className="font-label-md text-label-md text-primary tracking-wide">COURSE SETTINGS</h2>
          </div>
          <div className="flex-1 overflow-y-auto custom-scroll p-6 space-y-8">
            {/* Visibility */}
            <div className="space-y-3">
              <label className="block font-label-md text-label-md text-on-surface">Visibility</label>
              <div className="bg-surface-container-low rounded-lg p-1 flex border border-[#E8E0D5]">
                <button className="flex-1 py-1.5 text-label-sm font-label-sm text-outline-variant hover:text-primary transition-colors">Published</button>
                <button className="flex-1 py-1.5 text-label-sm font-label-sm bg-white rounded-md shadow-[0_1px_4px_rgba(26,46,46,0.06)] text-primary">Draft</button>
              </div>
            </div>
            {/* Access Level */}
            <div className="space-y-3">
              <label className="block font-label-md text-label-md text-on-surface">Access Level</label>
              <select className="w-full bg-white border border-[#E8E0D5] rounded-lg px-3 py-2 text-body-md font-body-md text-on-surface-variant outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors" defaultValue="Paid Members Only">
                <option>Free Preview</option>
                <option value="Paid Members Only">Paid Members Only</option>
                <option>Premium Tier</option>
              </select>
            </div>
            {/* Cover Image Upload */}
            <div className="space-y-3">
              <label className="block font-label-md text-label-md text-on-surface">Course Cover</label>
              <div className="border-2 border-dashed border-[#E8E0D5] rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:bg-surface transition-colors cursor-pointer group">
                <button className="w-full mt-4 bg-surface-container-lowest text-primary font-label-md text-label-md py-3 rounded-lg hover:bg-surface-container transition-colors shadow-sm flex items-center justify-center gap-2 font-semibold">
                  <MdUpload /> Upload Image
                </button>
                <p className="font-label-sm text-label-sm text-outline-variant mt-2">SVG, PNG, JPG (max. 800x400px)</p>
              </div>
            </div>
            {/* Metadata */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block font-label-sm text-label-sm text-outline">SEO Description</label>
                <textarea className="w-full bg-white border border-[#E8E0D5] rounded-lg px-3 py-2 text-body-md font-body-md text-on-surface-variant outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none" placeholder="Brief summary for search engines..." rows={3}></textarea>
              </div>
            </div>
            {/* Danger Zone */}
            <div className="pt-6 border-t border-[#E8E0D5]">
              <button className="w-full flex justify-center items-center gap-2 py-2 text-label-md font-label-md text-error hover:bg-error-container/20 rounded-lg transition-colors border border-transparent hover:border-error/30">
                <MdDeleteForever className="text-[18px]" />
                Delete Course
              </button>
            </div>
          </div>
        </aside>

      </main>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bloomPulse {
            0% { transform: scale(1.0); opacity: 0.7; }
            50% { transform: scale(1.04); opacity: 1.0; }
            100% { transform: scale(1.0); opacity: 0.7; }
        }
        .custom-scroll::-webkit-scrollbar {
            width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
            background-color: rgba(112, 121, 120, 0.2);
            border-radius: 10px;
        }
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
