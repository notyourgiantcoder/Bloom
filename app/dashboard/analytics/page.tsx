import { MdCalendarToday, MdExpandMore, MdPayments, MdTrendingUp, MdGroup, MdSchedule, MdTrendingDown, MdTaskAlt, MdMoreHoriz, MdAutoAwesome } from "react-icons/md";
import { requireAuth } from "@/lib/supabase/auth-helpers";
import { getSupabaseServerClient } from "@/lib/supabase/server-client";

export default async function AnalyticsPage() {
  const { user } = await requireAuth();
  const supabase = await getSupabaseServerClient();

  // Fetch real data to show at least some activity or empty states
  const { count: renderCount } = await supabase
    .from("render_jobs")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  const { count: courseCount } = await supabase
    .from("courses")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  return (
    <div className="max-w-container-max mx-auto space-y-gutter">
      {/* Header & Date Range */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-stack-md border-b border-outline-variant/30 pb-stack-md">
        <div>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary">Analytics</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Overview of your creator workspace performance.</p>
        </div>
        <div className="flex items-center gap-3 bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-4 py-2 hover:border-outline-variant transition-colors cursor-pointer card-shadow">
          <MdCalendarToday className="text-outline" />
          <span className="font-label-md text-label-md text-on-surface">Last 30 Days</span>
          <MdExpandMore className="text-outline" />
        </div>
      </header>

      {/* Stats Row (Bento Grid Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {/* Stat Card 1 */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 card-shadow flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-fixed/20 rounded-full blur-xl group-hover:bg-primary-fixed/30 transition-colors"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Revenue</span>
            <MdPayments className="text-primary bg-primary/10 p-2 rounded-lg text-[40px]" />
          </div>
          <div className="relative z-10">
            <h3 className="font-headline-md text-headline-md text-on-surface m-0">$0</h3>
            <div className="flex items-center gap-1 mt-2 text-outline font-label-sm">
              Not enough data
            </div>
          </div>
        </div>
        {/* Stat Card 2 */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 card-shadow flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary-container/20 rounded-full blur-xl group-hover:bg-secondary-container/30 transition-colors"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Students</span>
            <MdGroup className="text-secondary bg-secondary/10 p-2 rounded-lg text-[40px]" />
          </div>
          <div className="relative z-10">
            <h3 className="font-headline-md text-headline-md text-on-surface m-0">0</h3>
            <div className="flex items-center gap-1 mt-2 text-outline font-label-sm">
              Not enough data
            </div>
          </div>
        </div>
        {/* Stat Card 3 */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 card-shadow flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-tertiary-fixed/20 rounded-full blur-xl group-hover:bg-tertiary-fixed/30 transition-colors"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Courses Created</span>
            <MdSchedule className="text-tertiary bg-tertiary/10 p-2 rounded-lg text-[40px]" />
          </div>
          <div className="relative z-10">
            <h3 className="font-headline-md text-headline-md text-on-surface m-0">{courseCount || 0}</h3>
            <div className="flex items-center gap-1 mt-2 text-outline font-label-sm">
              Total courses
            </div>
          </div>
        </div>
        {/* Stat Card 4 */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 card-shadow flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-surface-variant/50 rounded-full blur-xl group-hover:bg-surface-variant/70 transition-colors"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Videos Generated</span>
            <MdAutoAwesome className="text-primary bg-primary/10 p-2 rounded-lg text-[40px]" />
          </div>
          <div className="relative z-10">
            <h3 className="font-headline-md text-headline-md text-on-surface m-0">{renderCount || 0}</h3>
            <div className="flex items-center gap-1 mt-2 text-outline font-label-sm">
              AI studio jobs
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Main Line Chart (Revenue) */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 card-shadow lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Revenue Over Time</h2>
            <button className="text-outline hover:text-on-surface transition-colors flex items-center justify-center"><MdMoreHoriz className="text-xl" /></button>
          </div>
          <div className="flex-1 relative min-h-[300px] w-full bg-surface-container-low rounded-lg border border-outline-variant/20 flex flex-col items-center justify-center text-center p-4">
             <MdTrendingUp className="text-4xl text-outline mb-2" />
             <p className="font-body-md text-outline">Not enough data to display revenue chart.</p>
          </div>
        </div>

        {/* Bar Chart (Enrollment) */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 card-shadow flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Enrollment</h2>
            <button className="text-outline hover:text-on-surface transition-colors flex items-center justify-center"><MdMoreHoriz className="text-xl" /></button>
          </div>
          <div className="flex-1 w-full flex flex-col items-center justify-center min-h-[250px] p-4 text-center">
             <MdGroup className="text-4xl text-outline mb-2" />
             <p className="font-body-md text-outline">No enrollments yet.</p>
          </div>
        </div>
      </div>

      {/* Bottom Row: Course Performance & Table */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-gutter">
        {/* Horizontal Bar Chart (Course Performance) */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 card-shadow flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Top Courses</h2>
            <button className="text-outline hover:text-on-surface transition-colors flex items-center justify-center"><MdMoreHoriz className="text-xl" /></button>
          </div>
          <div className="space-y-4 flex-1 flex flex-col justify-center text-center">
             <p className="font-body-md text-outline">Publish a course to see performance metrics here.</p>
          </div>
        </div>

        {/* Table: Student Data */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl card-shadow xl:col-span-2 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-outline-variant/25 flex justify-between items-center">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Recent Students</h2>
            <button className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors" disabled>View All</button>
          </div>
          <div className="overflow-x-auto min-h-[200px] flex items-center justify-center">
             <p className="font-body-md text-outline text-center p-8">No students enrolled yet. Share your course link to get started!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
