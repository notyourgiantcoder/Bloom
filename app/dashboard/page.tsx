import Link from "next/link";
import Image from "next/image";
import { MdCalendarMonth, MdAdd, MdPayments, MdTrendingUp, MdGroups, MdLibraryBooks, MdCheckCircle, MdArrowForward, MdForum, MdStar, MdPersonAdd, MdVideocam, MdQuiz, MdCampaign, MdAutoAwesome, MdEditDocument, MdErrorOutline } from "react-icons/md";
import { requireAuth } from "@/lib/supabase/auth-helpers";
import { getSupabaseServerClient } from "@/lib/supabase/server-client";

export default async function DashboardPage() {
  const { user, profile } = await requireAuth();
  const supabase = await getSupabaseServerClient();

  // Fetch real courses count
  const { count: totalCourses } = await supabase
    .from("courses")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  const { count: publishedCourses } = await supabase
    .from("courses")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("status", "published");

  const draftCourses = (totalCourses || 0) - (publishedCourses || 0);

  // Fetch recent courses
  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  // Fetch recent render jobs for activity feed
  const { data: renderJobs } = await supabase
    .from("render_jobs")
    .select("*, courses(title)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(3);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const displayName = profile.full_name || user.email?.split("@")[0] || "User";

  return (
    <div className="max-w-container-max mx-auto h-full flex flex-col gap-stack-lg">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant/30 pb-6">
        <div>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary tracking-tight">
            {greeting()}, {displayName} 👋
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-2xl">
            {profile.role === "student" 
              ? "Here's a quick overview of your learning progress today."
              : "Here's a quick overview of your teaching impact today."}
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard" className="bg-transparent border border-[#E8E0D5] text-secondary font-label-md text-label-md py-2 px-4 rounded-lg hover:border-primary transition-colors flex items-center gap-2">
            <MdCalendarMonth className="text-[18px]" />
            Schedule
          </Link>
          {profile.role === "creator" && (
            <Link href="/course-builder" className="bg-primary text-on-primary font-label-md text-label-md py-2 px-4 rounded-lg hover:bg-[#356664] focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors flex items-center gap-2">
              <MdAdd className="text-[18px]" />
              New Course
            </Link>
          )}
        </div>
      </header>

      {/* Stats Row (Bento Style) */}
      <section aria-label="Key Statistics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat Card 1 */}
        <div className="bg-surface-container-lowest border border-[#E8E0D5] rounded-xl p-5 shadow-[0_1px_4px_rgba(26,46,46,0.06)] relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-surface-container rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500 pointer-events-none"></div>
          <div className="flex items-start justify-between mb-2">
            <p className="font-label-sm text-label-sm text-on-surface-variant">Revenue</p>
            <MdPayments className="text-secondary text-[20px] bg-secondary-container/30 p-1 rounded-md" />
          </div>
          <h3 className="font-headline-md text-headline-md text-primary">₹0</h3>
          <p className="font-label-sm text-label-sm text-outline flex items-center mt-2 gap-1">
            No data yet
          </p>
        </div>
        {/* Stat Card 2 */}
        <div className="bg-surface-container-lowest border border-[#E8E0D5] rounded-xl p-5 shadow-[0_1px_4px_rgba(26,46,46,0.06)] relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-surface-container rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500 pointer-events-none"></div>
          <div className="flex items-start justify-between mb-2">
            <p className="font-label-sm text-label-sm text-on-surface-variant">Active Learners</p>
            <MdGroups className="text-secondary text-[20px] bg-secondary-container/30 p-1 rounded-md" />
          </div>
          <h3 className="font-headline-md text-headline-md text-primary">0</h3>
          <p className="font-label-sm text-label-sm text-outline flex items-center mt-2 gap-1">
            No data yet
          </p>
        </div>
        {/* Stat Card 3 */}
        <div className="bg-surface-container-lowest border border-[#E8E0D5] rounded-xl p-5 shadow-[0_1px_4px_rgba(26,46,46,0.06)] relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-surface-container rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500 pointer-events-none"></div>
          <div className="flex items-start justify-between mb-2">
            <p className="font-label-sm text-label-sm text-on-surface-variant">Live Courses</p>
            <MdLibraryBooks className="text-secondary text-[20px] bg-secondary-container/30 p-1 rounded-md" />
          </div>
          <h3 className="font-headline-md text-headline-md text-primary">{publishedCourses || 0}</h3>
          <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center mt-2 gap-1">
            {draftCourses} drafts pending
          </p>
        </div>
        {/* Stat Card 4 */}
        <div className="bg-surface-container-lowest border border-[#E8E0D5] rounded-xl p-5 shadow-[0_1px_4px_rgba(26,46,46,0.06)] relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-surface-container rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500 pointer-events-none"></div>
          <div className="flex items-start justify-between mb-2">
            <p className="font-label-sm text-label-sm text-on-surface-variant">Avg. Completion</p>
            <MdCheckCircle className="text-secondary text-[20px] bg-secondary-container/30 p-1 rounded-md" />
          </div>
          <h3 className="font-headline-md text-headline-md text-primary">0%</h3>
          <p className="font-label-sm text-label-sm text-outline flex items-center mt-2 gap-1">
            No data yet
          </p>
        </div>
      </section>

      {/* Main Layout Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mt-2">
        {/* Recent Activity Feed */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-headline-sm text-headline-sm text-primary">Recent Activity</h2>
            <Link href="/dashboard" className="font-label-sm text-label-sm text-secondary hover:underline flex items-center gap-1">
              View all <MdArrowForward className="text-[14px]" />
            </Link>
          </div>
          <div className="bg-surface-container-lowest border border-[#E8E0D5] rounded-xl p-1 shadow-[0_1px_4px_rgba(26,46,46,0.06)] min-h-[200px]">
            {!renderJobs || renderJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center text-outline">
                <MdAutoAwesome className="text-4xl mb-2 text-outline-variant" />
                <p className="font-body-md">No activity yet.</p>
                <p className="font-body-sm text-sm">Create your first course to see updates here.</p>
              </div>
            ) : (
              <ul className="divide-y divide-outline-variant/20">
                {renderJobs.map((job: any) => (
                  <li key={job.id} className="p-4 flex gap-4 hover:bg-surface-container/30 transition-colors rounded-lg group">
                    <div className="w-10 h-10 rounded-full bg-[#E8E0D5]/50 flex items-center justify-center flex-shrink-0 text-primary">
                      {job.status === 'complete' ? <MdStar /> : job.status === 'failed' ? <MdErrorOutline /> : <MdAutoAwesome />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <p className="font-label-md text-label-md text-primary">
                          Video Generation <span className="font-bold">{job.status}</span>
                        </p>
                        <span className="font-label-sm text-label-sm text-outline">
                          {new Date(job.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-1 text-sm">
                        Course: {job.courses?.title || "Unknown"}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <h2 className="font-headline-sm text-headline-sm text-primary mb-2">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Action Card 1 */}
            <Link href="/course-builder" className="bg-surface-container-lowest border border-[#E8E0D5] rounded-xl p-5 shadow-[0_1px_4px_rgba(26,46,46,0.06)] hover:border-secondary hover:shadow-md transition-all group flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <MdVideocam />
              </div>
              <span className="font-label-md text-label-md text-primary">Record Lesson</span>
            </Link>
            {/* Action Card 2 */}
            <Link href="/course-builder" className="bg-surface-container-lowest border border-[#E8E0D5] rounded-xl p-5 shadow-[0_1px_4px_rgba(26,46,46,0.06)] hover:border-secondary hover:shadow-md transition-all group flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <MdQuiz />
              </div>
              <span className="font-label-md text-label-md text-primary">Create Quiz</span>
            </Link>
            {/* Action Card 3 */}
            <Link href="/course-builder" className="bg-surface-container-lowest border border-[#E8E0D5] rounded-xl p-5 shadow-[0_1px_4px_rgba(26,46,46,0.06)] hover:border-secondary hover:shadow-md transition-all group flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <MdCampaign />
              </div>
              <span className="font-label-md text-label-md text-primary">Announcement</span>
            </Link>
            {/* Action Card 4 */}
            <Link href="/dashboard/ai-studio" className="bg-surface-container-lowest border border-[#E8E0D5] rounded-xl p-5 shadow-[0_1px_4px_rgba(26,46,46,0.06)] hover:border-secondary hover:shadow-md transition-all group flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#E8E0D5] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <MdAutoAwesome />
              </div>
              <span className="font-label-md text-label-md text-primary">AI Studio</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Your Courses Section (Horizontal Scroll) */}
      <section className="mt-4 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-headline-sm text-headline-sm text-primary">Your Courses</h2>
          <Link href="/dashboard" className="font-label-sm text-label-sm text-secondary hover:underline flex items-center gap-1">
            Manage all <MdArrowForward className="text-[14px]" />
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0 snap-x">
          
          {courses && courses.map((course) => (
            <div key={course.id} className="bg-surface-container-lowest border border-[#E8E0D5] rounded-xl shadow-[0_1px_4px_rgba(26,46,46,0.06)] min-w-[300px] w-[300px] flex-shrink-0 snap-start overflow-hidden flex flex-col">
              <div className="h-40 bg-surface-container flex items-center justify-center relative">
                <MdLibraryBooks className="text-5xl text-outline-variant opacity-50" />
                <div className="absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur-sm px-2 py-1 rounded font-label-sm text-label-sm text-primary capitalize">
                  {course.status}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-headline-md text-body-lg font-medium text-primary mb-1 line-clamp-2 leading-tight">{course.title}</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant mb-4 line-clamp-2">{course.description || "No description provided."}</p>
                <div className="mt-auto grid grid-cols-2 gap-2 border-t border-[#E8E0D5] pt-3">
                  <div>
                    <p className="font-label-sm text-label-sm text-outline text-[10px]">CREATED</p>
                    <p className="font-label-md text-label-md text-primary">{new Date(course.created_at).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="font-label-sm text-label-sm text-outline text-[10px]">ENROLLED</p>
                    <p className="font-label-md text-label-md text-primary">0</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add New Card */}
          <Link href="/course-builder" className="bg-transparent border border-outline-variant border-dashed rounded-xl shadow-none min-w-[300px] w-[300px] flex-shrink-0 snap-start flex flex-col items-center justify-center text-outline hover:text-primary hover:border-primary hover:bg-surface-container-lowest transition-all min-h-[300px]">
            <div className="w-16 h-16 rounded-full bg-surface-container-lowest flex items-center justify-center mb-4 border border-[#E8E0D5]">
              <MdAdd className="text-[32px]" />
            </div>
            <h3 className="font-headline-md text-body-lg font-medium">Create New Course</h3>
          </Link>
        </div>
      </section>
    </div>
  );
}
