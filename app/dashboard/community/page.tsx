import { MdFilterList, MdSearch, MdImage, MdAttachFile, MdMood, MdPushPin, MdTrendingUp, MdEvent, MdPersonAdd } from "react-icons/md";
import { requireAuth } from "@/lib/supabase/auth-helpers";

export default async function CommunityPage() {
  const { profile, user } = await requireAuth();

  const getInitial = (name: string) => name.charAt(0).toUpperCase();
  const displayName = profile.full_name || user.email?.split("@")[0] || "User";

  return (
    <div className="max-w-container-max mx-auto flex flex-col lg:flex-row gap-gutter relative">
      {/* Feed Column */}
      <div className="flex-1 lg:max-w-[580px] w-full flex flex-col gap-stack-md mx-auto lg:mx-0">
        {/* TopAppBar (Page Title) */}
        <div className="mb-stack-sm flex justify-between items-end">
          <h1 className="font-headline-md text-headline-md text-primary">Community Feed</h1>
          <div className="flex gap-2">
            <button className="bg-surface-container border border-outline-variant/30 px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container-high transition-colors shadow-sm flex items-center justify-center">
              <MdFilterList />
            </button>
            <button className="bg-surface-container border border-outline-variant/30 px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container-high transition-colors shadow-sm flex items-center justify-center">
              <MdSearch />
            </button>
          </div>
        </div>

        {/* Composer */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-stack-md card-shadow">
          <div className="flex gap-4 items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline-sm text-headline-sm flex-shrink-0 overflow-hidden">
               {profile.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  getInitial(displayName)
                )}
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
                <MdImage className="text-[20px]" />
              </button>
              <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container flex items-center justify-center">
                <MdAttachFile className="text-[20px]" />
              </button>
              <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container flex items-center justify-center">
                <MdMood className="text-[20px]" />
              </button>
            </div>
            <button className="bg-primary text-on-primary px-4 py-1.5 rounded-lg font-label-md text-label-md hover:bg-surface-tint transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface">
              Post
            </button>
          </div>
        </div>

        {/* Pinned Post */}
        <article className="bg-primary/5 border border-primary/20 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-4 right-4 flex items-center gap-1 text-primary font-label-sm text-[11px] font-semibold bg-primary/10 px-2 py-1 rounded-full">
            <MdPushPin className="text-[14px]" /> Pinned
          </div>
          <div className="flex gap-3 items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline-sm text-headline-sm">
              B
            </div>
            <div>
              <h3 className="font-label-md text-label-md text-on-surface font-bold">Bloom Team</h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Official Announcement</p>
            </div>
          </div>
          <div className="mb-4">
            <h4 className="font-headline-sm text-headline-sm text-primary mb-2">Welcome to your new Community Space! 🌱</h4>
            <p className="text-on-surface-variant">This space is meant for discussions, feedback, and collaborating. Start a new discussion above!</p>
          </div>
        </article>

        {/* Empty State */}
        <div className="text-center py-12 px-4 border border-outline-variant/30 rounded-xl bg-surface-container-lowest border-dashed">
            <p className="font-body-md text-on-surface-variant">No other posts yet. Be the first to share something with your community!</p>
        </div>

      </div>

      {/* Right Sidebar (Contextual Info) */}
      <aside className="w-full lg:w-[320px] hidden lg:flex flex-col gap-stack-lg flex-shrink-0">
        {/* Trending Posts Card */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-stack-md card-shadow opacity-60">
          <h3 className="font-headline-sm text-[18px] text-primary mb-4 flex items-center gap-2">
            <MdTrendingUp className="text-secondary" />
            Trending Discussions
          </h3>
          <p className="font-body-sm text-sm text-outline">Not enough data to show trends.</p>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-stack-md card-shadow opacity-60">
          <h3 className="font-headline-sm text-[18px] text-primary mb-4 flex items-center gap-2">
            <MdEvent className="text-secondary" />
            Upcoming Live Sessions
          </h3>
          <p className="font-body-sm text-sm text-outline">No upcoming sessions.</p>
        </div>

        {/* Invite Members */}
        {profile.role === "creator" && (
            <div className="bg-primary text-on-primary rounded-xl p-stack-md relative overflow-hidden shadow-sm">
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-on-primary-fixed-variant rounded-full opacity-50 blur-2xl"></div>
            <div className="relative z-10">
                <h3 className="font-headline-sm text-[18px] mb-2">Grow the Community</h3>
                <p className="font-body-md text-label-sm text-on-primary/80 mb-4">Invite students and peers to join your workspace.</p>
                <button className="w-full bg-surface-container-lowest text-primary py-2 px-4 rounded-lg font-label-md text-label-md hover:bg-surface-container transition-colors shadow-sm flex items-center justify-center gap-2">
                <MdPersonAdd className="text-[18px]" />
                Invite Members
                </button>
            </div>
            </div>
        )}
      </aside>
    </div>
  );
}
