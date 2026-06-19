import Link from "next/link";
import Image from "next/image";

export default function CourseBuilderPage() {
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
            <Link href="/#features" className="text-on-surface-variant hover:text-primary transition-colors">Features</Link>
            <Link href="/courses/anatomy" className="text-on-surface-variant hover:text-primary transition-colors">MediLab</Link>
            <Link href="/pricing" className="text-on-surface-variant hover:text-primary transition-colors">Pricing</Link>
            <Link href="/dashboard" className="text-primary border-b-2 border-secondary pb-1 opacity-80 transition-opacity">For Creators</Link>
          </nav>
          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="font-label-md text-label-md text-primary bg-transparent border border-[#E8E0D5] hover:border-primary hover:text-primary-container px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">visibility</span>
              Preview
            </Link>
            <Link href="/dashboard" className="font-label-md text-label-md text-on-primary bg-primary hover:bg-surface-tint px-6 py-2 rounded-lg transition-colors inline-block text-center flex items-center justify-center">
              Publish Course
            </Link>
          </div>
        </div>
      </header>

      {/* Main Workspace (3 Panel Layout) */}
      <main className="flex-1 flex overflow-hidden w-full max-w-[1600px] mx-auto bg-surface-container-lowest relative z-10 border-t border-[#E8E0D5]">
        
        {/* Left Panel: Course Outline Tree */}
        <aside className="w-80 border-r border-[#E8E0D5] bg-surface-container-lowest flex flex-col h-full flex-shrink-0 z-20">
          <div className="p-4 border-b border-[#E8E0D5] flex justify-between items-center bg-white sticky top-0">
            <h2 className="font-label-md text-label-md text-primary tracking-wide">COURSE OUTLINE</h2>
            <button className="text-primary hover:bg-surface-container p-1 rounded transition-colors" title="Add Module">
              <span className="material-symbols-outlined text-[20px]">add</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto custom-scroll p-4 space-y-4">
            {/* Module 1 */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 p-2 hover:bg-surface-container rounded-md group cursor-move">
                <span className="material-symbols-outlined text-outline-variant text-[16px] opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">drag_indicator</span>
                <span className="material-symbols-outlined text-primary text-[20px]">folder</span>
                <span className="font-label-md text-label-md text-on-surface flex-1 truncate">1. Foundations of Design</span>
                <button className="text-outline-variant hover:text-primary opacity-0 group-hover:opacity-100"><span className="material-symbols-outlined text-[16px]">more_vert</span></button>
              </div>
              <div className="pl-8 space-y-1">
                {/* Active Lesson */}
                <div className="flex items-center gap-2 p-2 bg-surface-container-low border border-primary/20 rounded-md group cursor-pointer relative shadow-[0_1px_4px_rgba(26,46,46,0.06)]">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
                  <span className="material-symbols-outlined text-primary text-[18px]">article</span>
                  <span className="font-body-md text-body-md text-primary flex-1 truncate">Introduction to Grids</span>
                </div>
                {/* Completed Lesson */}
                <div className="flex items-center gap-2 p-2 hover:bg-surface-container rounded-md group cursor-pointer">
                  <div className="w-2 h-2 rounded-full bg-secondary flex-shrink-0"></div>
                  <span className="material-symbols-outlined text-outline-variant text-[18px]">play_circle</span>
                  <span className="font-body-md text-body-md text-on-surface-variant flex-1 truncate">Layout Principles Video</span>
                </div>
                {/* Draft Lesson */}
                <div className="flex items-center gap-2 p-2 hover:bg-surface-container rounded-md group cursor-pointer">
                  <div className="w-2 h-2 rounded-full bg-[#E8E0D5] flex-shrink-0"></div>
                  <span className="material-symbols-outlined text-outline-variant text-[18px]">quiz</span>
                  <span className="font-body-md text-body-md text-outline-variant flex-1 truncate italic">Knowledge Check (Draft)</span>
                </div>
              </div>
            </div>
            {/* Module 2 */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 p-2 hover:bg-surface-container rounded-md group cursor-move">
                <span className="material-symbols-outlined text-outline-variant text-[16px] opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">drag_indicator</span>
                <span className="material-symbols-outlined text-primary text-[20px]">folder</span>
                <span className="font-label-md text-label-md text-on-surface flex-1 truncate">2. Advanced Components</span>
                <button className="text-outline-variant hover:text-primary opacity-0 group-hover:opacity-100"><span className="material-symbols-outlined text-[16px]">more_vert</span></button>
              </div>
              <div className="pl-8 space-y-1">
                <div className="flex items-center gap-2 p-2 hover:bg-surface-container rounded-md group cursor-pointer">
                  <div className="w-2 h-2 rounded-full bg-[#E8E0D5] flex-shrink-0"></div>
                  <span className="material-symbols-outlined text-outline-variant text-[18px]">article</span>
                  <span className="font-body-md text-body-md text-on-surface-variant flex-1 truncate">Building Complex Navs</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-[#E8E0D5] bg-surface-container-low mt-auto">
            <div className="flex items-center justify-between text-label-sm font-label-sm text-outline-variant">
              <span>Status: Draft</span>
              <span>Saved 2m ago</span>
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
              <button className="p-1.5 rounded hover:bg-surface-container text-on-surface transition-colors"><span className="material-symbols-outlined text-[20px]">format_bold</span></button>
              <button className="p-1.5 rounded hover:bg-surface-container text-on-surface transition-colors"><span className="material-symbols-outlined text-[20px]">format_italic</span></button>
              <button className="p-1.5 rounded hover:bg-surface-container text-on-surface transition-colors"><span className="material-symbols-outlined text-[20px]">format_underlined</span></button>
            </div>
            <div className="w-px h-6 bg-[#E8E0D5]"></div>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded hover:bg-surface-container text-on-surface transition-colors"><span className="material-symbols-outlined text-[20px]">format_list_bulleted</span></button>
              <button className="p-1.5 rounded hover:bg-surface-container text-on-surface transition-colors"><span className="material-symbols-outlined text-[20px]">format_list_numbered</span></button>
            </div>
            <div className="w-px h-6 bg-[#E8E0D5]"></div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button className="p-1.5 rounded hover:bg-surface-container text-on-surface transition-colors text-primary flex items-center gap-1 px-2">
                <span className="material-symbols-outlined text-[20px]">add_photo_alternate</span>
                <span className="font-label-sm text-label-sm">Add Media</span>
              </button>
              <button className="p-1.5 rounded hover:bg-surface-container text-on-surface transition-colors flex items-center gap-1 px-2">
                <span className="material-symbols-outlined text-[20px]">code</span>
                <span className="font-label-sm text-label-sm">Embed</span>
              </button>
            </div>
          </div>
          {/* Editor Canvas */}
          <div className="flex-1 overflow-y-auto custom-scroll p-8 md:p-12">
            <div className="max-w-[720px] mx-auto">
              {/* Title Input */}
              <input className="w-full bg-transparent border-none text-display-lg font-display-lg text-primary placeholder:text-outline-variant focus:ring-0 p-0 mb-8 outline-none" placeholder="Lesson Title..." type="text" defaultValue="Introduction to Grids" />
              {/* Content Area */}
              <div className="space-y-6 text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
                <p>Grids are the foundational architectural skeleton of any robust digital design system. They establish a rhythmic consistency that guides the user&apos;s eye and categorizes information into digestible chunks.</p>
                <p>In this lesson, we will explore the <strong className="text-primary font-medium">Fixed Grid</strong> philosophy adapted for editorial and highly focused technical interfaces.</p>
                {/* Image Block */}
                <div className="my-8 rounded-xl border border-[#E8E0D5] bg-surface-container-low p-2 shadow-[0_1px_4px_rgba(26,46,46,0.06)] relative group">
                  <Image alt="Grid diagram placeholder" width={720} height={256} className="w-full h-64 object-cover rounded-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsnlv4ySyN9wJ5o0zCMsluUL07tma6B30HOESmRJ0pKbO4Mw7BLwIkisZJ1HD0JCmQg8vwBkXZCk4QtRfk2R1cCRJNcy8XZWc9Uo5WuY-lAqGMCt8xOmnUkwcR3FUrJEf1ZeRqUUUCeX6r4WsuOd8hhZ7MYHNdq51C1VqgSImQ4N_PdOFq87C_BCNRbs1VtP_7yMMK99Am_xu2UZXvQn8NNV2ppdzeXpO5h8E_16QKkAwQPFz3FTYLnVL4v9YJz_5J7iTGniLNZD8" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <button className="bg-white/90 p-1.5 rounded-md shadow-sm text-primary hover:bg-white"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                    <button className="bg-white/90 p-1.5 rounded-md shadow-sm text-error hover:bg-white"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                  </div>
                  <p className="text-center text-label-sm font-label-sm text-outline mt-2 mb-1">Figure 1: The 12-column desktop grid.</p>
                </div>
                <h2 className="text-headline-md font-headline-md text-primary mt-12 mb-4">The 12-Column Layout</h2>
                <p>For desktop viewports (1280px+), we utilize a 12-column structure with generous 24px gutters. This allows for complex nesting of components without feeling claustrophobic.</p>
                <ul className="list-disc pl-6 space-y-2 mt-4 marker:text-secondary">
                  <li>Provides granular control over card widths.</li>
                  <li>Easily divides into halves, thirds, or quarters.</li>
                  <li>Maintains an editorial feel with wider margins.</li>
                </ul>
                {/* Empty block indicator */}
                <div className="flex items-center gap-2 text-outline-variant opacity-50 hover:opacity-100 transition-opacity mt-8 cursor-text">
                  <span className="material-symbols-outlined text-[20px]">add</span>
                  <span className="font-body-md text-body-md">Type &apos;/&apos; for commands</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Panel: Lesson Settings */}
        <aside className="hidden xl:flex w-80 border-l border-[#E8E0D5] bg-surface-container-lowest flex-col h-full flex-shrink-0 z-20">
          <div className="p-4 border-b border-[#E8E0D5] bg-white sticky top-0">
            <h2 className="font-label-md text-label-md text-primary tracking-wide">LESSON SETTINGS</h2>
          </div>
          <div className="flex-1 overflow-y-auto custom-scroll p-6 space-y-8">
            {/* Visibility */}
            <div className="space-y-3">
              <label className="block font-label-md text-label-md text-on-surface">Visibility</label>
              <div className="bg-surface-container-low rounded-lg p-1 flex border border-[#E8E0D5]">
                <button className="flex-1 py-1.5 text-label-sm font-label-sm bg-white rounded-md shadow-[0_1px_4px_rgba(26,46,46,0.06)] text-primary">Published</button>
                <button className="flex-1 py-1.5 text-label-sm font-label-sm text-outline-variant hover:text-primary transition-colors">Draft</button>
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
              <label className="block font-label-md text-label-md text-on-surface">Lesson Cover</label>
              <div className="border-2 border-dashed border-[#E8E0D5] rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:bg-surface transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center mb-3 group-hover:bg-primary-container group-hover:text-on-primary-container text-primary transition-colors">
                  <span className="material-symbols-outlined">upload</span>
                </div>
                <p className="font-label-md text-label-md text-primary mb-1">Click to upload</p>
                <p className="font-label-sm text-label-sm text-outline-variant">SVG, PNG, JPG or GIF (max. 800x400px)</p>
              </div>
            </div>
            {/* Metadata */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block font-label-sm text-label-sm text-outline">Estimated Read Time</label>
                <div className="flex items-center gap-2">
                  <input className="w-20 bg-white border border-[#E8E0D5] rounded-lg px-3 py-1.5 text-body-md font-body-md outline-none text-on-surface focus:ring-2 focus:ring-primary focus:border-primary" type="number" defaultValue="15" />
                  <span className="font-body-md text-body-md text-on-surface-variant">minutes</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block font-label-sm text-label-sm text-outline">SEO Description</label>
                <textarea className="w-full bg-white border border-[#E8E0D5] rounded-lg px-3 py-2 text-body-md font-body-md text-on-surface-variant outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none" placeholder="Brief summary for search engines..." rows={3}></textarea>
              </div>
            </div>
            {/* Danger Zone */}
            <div className="pt-6 border-t border-[#E8E0D5]">
              <button className="w-full flex justify-center items-center gap-2 py-2 text-label-md font-label-md text-error hover:bg-error-container/20 rounded-lg transition-colors border border-transparent hover:border-error/30">
                <span className="material-symbols-outlined text-[18px]">delete_forever</span>
                Delete Lesson
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
