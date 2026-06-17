"use client";

export default function CommunityPage() {
  return (
    <div className="max-w-container-max mx-auto flex flex-col lg:flex-row gap-gutter relative">
      {/* Feed Column */}
      <div className="flex-1 lg:max-w-[580px] w-full flex flex-col gap-stack-md mx-auto lg:mx-0">
        {/* TopAppBar (Page Title) */}
        <div className="mb-stack-sm flex justify-between items-end">
          <h1 className="font-headline-md text-headline-md text-primary">Community Feed</h1>
          <div className="flex gap-2">
            <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
            <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container">
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>
        </div>

        {/* Composer */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-stack-md card-shadow">
          <div className="flex gap-4 items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline-sm text-headline-sm flex-shrink-0">
              B
            </div>
            <div className="flex-1">
              <textarea 
                className="w-full bg-transparent border-none focus:ring-0 p-0 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 resize-none outline-none" 
                placeholder="Share an insight, ask a question, or post an update..." 
                rows={2}
              ></textarea>
            </div>
          </div>
          <div className="flex justify-between items-center border-t border-outline-variant/20 pt-3">
            <div className="flex gap-2">
              <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">image</span>
              </button>
              <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">attach_file</span>
              </button>
              <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">mood</span>
              </button>
            </div>
            <button className="bg-primary text-on-primary px-4 py-1.5 rounded-lg font-label-md text-label-md hover:bg-surface-tint transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface">
              Post
            </button>
          </div>
        </div>

        {/* Pinned Post */}
        <article className="bg-secondary-container/30 rounded-xl border border-secondary/20 p-stack-md card-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-secondary text-on-primary px-3 py-1 rounded-bl-lg font-label-sm text-label-sm flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">push_pin</span>
            Pinned
          </div>
          <div className="flex gap-3 items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline-sm text-headline-sm">
              B
            </div>
            <div>
              <h3 className="font-label-md text-label-md text-on-surface font-bold">Bloom Team</h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Official Announcement &bull; 2d ago</p>
            </div>
          </div>
          <div className="mb-4">
            <h4 className="font-headline-sm text-headline-sm text-primary mb-2">Welcome to the new MediLab Pro Community! 🌱</h4>
            <p className="text-on-surface-variant">We&apos;ve redesigned this space to be more focused, tactile, and conducive to deep work. Take a moment to introduce yourself below and share what you&apos;re currently working on.</p>
          </div>
          <div className="flex items-center gap-4 border-t border-outline-variant/20 pt-3">
            <div className="flex items-center gap-1 bg-surface-container-lowest border border-outline-variant/30 rounded-full px-3 py-1 text-label-sm font-label-md text-on-surface-variant cursor-pointer hover:bg-surface-container transition-colors">
              <span>124</span>
            </div>
            <div className="flex items-center gap-1 bg-surface-container-lowest border border-outline-variant/30 rounded-full px-3 py-1 text-label-sm font-label-md text-on-surface-variant cursor-pointer hover:bg-surface-container transition-colors">
              <span>89</span>
            </div>
            <button className="ml-auto text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">chat_bubble</span>
              42 Comments
            </button>
          </div>
        </article>

        {/* User Post 1 */}
        <article className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-stack-md card-shadow">
          <div className="flex justify-between items-start mb-3">
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-headline-sm text-headline-sm">
                D
              </div>
              <div>
                <h3 className="font-label-md text-label-md text-on-surface font-bold">David Chen</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Course Creator &bull; 4h ago</p>
              </div>
            </div>
            <button className="text-on-surface-variant hover:text-primary transition-colors p-1 rounded-full hover:bg-surface-container">
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
          </div>
          <div className="mb-4">
            <p className="text-on-surface mb-3">Just finished recording module 3 of the new Advanced Storytelling series. Trying out a more conversational tone this time around. Has anyone else experimented with moving away from formal scripting for highly technical subjects?</p>
          </div>
          <div className="flex items-center gap-4 border-t border-outline-variant/20 pt-3">
            <div className="flex items-center gap-1 bg-surface-container-low border border-outline-variant/30 rounded-full px-3 py-1 text-label-sm font-label-md text-on-surface cursor-pointer hover:bg-surface-container-highest transition-colors">
              <span>24</span>
            </div>
            <div className="flex items-center gap-1 bg-surface-container-lowest border border-outline-variant/30 rounded-full px-3 py-1 text-label-sm font-label-md text-on-surface-variant cursor-pointer hover:bg-surface-container transition-colors">
              <span>7</span>
            </div>
            <button className="ml-auto text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">chat_bubble</span>
              12 Comments
            </button>
          </div>
          {/* Inline Comment */}
          <div className="mt-4 pt-4 border-t border-outline-variant/10 flex gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-label-md text-label-md flex-shrink-0">
              SJ
            </div>
            <div className="flex-1 bg-surface-container-low rounded-lg p-3">
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-label-md text-label-sm font-bold text-on-surface">Sarah Jenkins</span>
                <span className="font-label-sm text-[10px] text-on-surface-variant">2h ago</span>
              </div>
              <p className="text-label-sm font-body-md text-on-surface">I switched to an outline-only approach last month! It definitely requires more editing post-recording, but the engagement metrics are way up. Highly recommend sticking with it.</p>
            </div>
          </div>
        </article>

        {/* User Post 2 */}
        <article className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-stack-md card-shadow">
          <div className="flex justify-between items-start mb-3">
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed font-headline-sm text-headline-sm">
                M
              </div>
              <div>
                <h3 className="font-label-md text-label-md text-on-surface font-bold">Marcus Thorne</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Digital Illustrator &bull; 6h ago</p>
              </div>
            </div>
            <button className="text-on-surface-variant hover:text-primary transition-colors p-1 rounded-full hover:bg-surface-container">
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
          </div>
          <div className="mb-4">
            <p className="text-on-surface">Looking for feedback on these new cellular models for the digital design deck. Trying to balance scientific accuracy with a more accessible visual style. Thoughts?</p>
          </div>
          <div className="flex items-center gap-4 border-t border-outline-variant/20 pt-3">
            <button className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-sm flex items-center gap-1 group">
              <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">add_reaction</span>
              React
            </button>
            <button className="ml-auto text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">chat_bubble</span>
              0 Comments
            </button>
          </div>
        </article>
      </div>

      {/* Right Sidebar (Contextual Info) */}
      <aside className="w-full lg:w-[320px] hidden lg:flex flex-col gap-stack-lg flex-shrink-0">
        {/* Trending Posts Card */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-stack-md card-shadow">
          <h3 className="font-headline-sm text-[18px] text-primary mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">trending_up</span>
            Trending Discussions
          </h3>
          <ul className="flex flex-col gap-3">
            <li className="group cursor-pointer">
              <h4 className="font-label-md text-label-sm text-on-surface group-hover:text-primary transition-colors line-clamp-2 leading-snug">Best practices for lighting physical demonstrations</h4>
              <p className="font-label-sm text-[10px] text-on-surface-variant mt-1">15 comments &bull; 42 reactions</p>
            </li>
            <li className="group cursor-pointer border-t border-outline-variant/10 pt-3">
              <h4 className="font-label-md text-label-sm text-on-surface group-hover:text-primary transition-colors line-clamp-2 leading-snug">Managing student questions during live sessions</h4>
              <p className="font-label-sm text-[10px] text-on-surface-variant mt-1">8 comments &bull; 21 reactions</p>
            </li>
            <li className="group cursor-pointer border-t border-outline-variant/10 pt-3">
              <h4 className="font-label-md text-label-sm text-on-surface group-hover:text-primary transition-colors line-clamp-2 leading-snug">Review: The new AI script generation tool</h4>
              <p className="font-label-sm text-[10px] text-on-surface-variant mt-1">34 comments &bull; 89 reactions</p>
            </li>
          </ul>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-stack-md card-shadow">
          <h3 className="font-headline-sm text-[18px] text-primary mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">event</span>
            Upcoming Live Sessions
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-start">
              <div className="bg-surface-container flex flex-col items-center justify-center p-2 rounded-lg min-w-[50px]">
                <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">Oct</span>
                <span className="font-headline-sm text-[18px] text-primary leading-none mt-1">14</span>
              </div>
              <div>
                <h4 className="font-label-md text-label-sm text-on-surface font-bold">Mastering Audio Post</h4>
                <p className="font-label-sm text-[11px] text-on-surface-variant mt-0.5">2:00 PM IST &bull; with Elena R.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="bg-surface-container flex flex-col items-center justify-center p-2 rounded-lg min-w-[50px]">
                <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">Oct</span>
                <span className="font-headline-sm text-[18px] text-primary leading-none mt-1">18</span>
              </div>
              <div>
                <h4 className="font-label-md text-label-sm text-on-surface font-bold">Weekly Community Q&amp;A</h4>
                <p className="font-label-sm text-[11px] text-on-surface-variant mt-0.5">11:00 AM IST &bull; Open Floor</p>
              </div>
            </div>
          </div>
          <button className="w-full mt-4 text-primary font-label-md text-label-sm hover:underline text-center">View Full Calendar</button>
        </div>

        {/* Invite Members */}
        <div className="bg-primary text-on-primary rounded-xl p-stack-md relative overflow-hidden shadow-sm">
          <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-on-primary-fixed-variant rounded-full opacity-50 blur-2xl"></div>
          <div className="relative z-10">
            <h3 className="font-headline-sm text-[18px] mb-2">Grow the Community</h3>
            <p className="font-body-md text-label-sm text-on-primary/80 mb-4">Invite fellow creators to Cohort Pro and earn workspace credits.</p>
            <button className="w-full bg-surface-container-lowest text-primary py-2 px-4 rounded-lg font-label-md text-label-md hover:bg-surface-container transition-colors shadow-sm flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              Invite Members
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
