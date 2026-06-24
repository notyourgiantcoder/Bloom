import Link from "next/link";
import Image from "next/image";
import { MdCalendarMonth, MdAdd, MdPayments, MdTrendingUp, MdGroups, MdLibraryBooks, MdCheckCircle, MdArrowForward, MdForum, MdStar, MdPersonAdd, MdVideocam, MdQuiz, MdCampaign, MdAutoAwesome, MdEditDocument } from "react-icons/md";

export default function DashboardPage() {
  return (
    <div className="max-w-container-max mx-auto h-full flex flex-col gap-stack-lg">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant/30 pb-6">
        <div>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary tracking-tight">Good morning, Dr. Aris 👋</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-2xl">Here&apos;s a quick overview of your teaching impact today.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard" className="bg-transparent border border-[#E8E0D5] text-secondary font-label-md text-label-md py-2 px-4 rounded-lg hover:border-primary transition-colors flex items-center gap-2">
            <MdCalendarMonth className="text-[18px]" />
            Schedule
          </Link>
          <Link href="/course-builder" className="bg-primary text-on-primary font-label-md text-label-md py-2 px-4 rounded-lg hover:bg-[#356664] focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors flex items-center gap-2">
            <MdAdd className="text-[18px]" />
            New Course
          </Link>
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
          <h3 className="font-headline-md text-headline-md text-primary">₹1,42,500</h3>
          <p className="font-label-sm text-label-sm text-secondary flex items-center mt-2 gap-1">
            <MdTrendingUp className="text-[14px]" />
            +12% from last month
          </p>
        </div>
        {/* Stat Card 2 */}
        <div className="bg-surface-container-lowest border border-[#E8E0D5] rounded-xl p-5 shadow-[0_1px_4px_rgba(26,46,46,0.06)] relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-surface-container rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500 pointer-events-none"></div>
          <div className="flex items-start justify-between mb-2">
            <p className="font-label-sm text-label-sm text-on-surface-variant">Active Learners</p>
            <MdGroups className="text-secondary text-[20px] bg-secondary-container/30 p-1 rounded-md" />
          </div>
          <h3 className="font-headline-md text-headline-md text-primary">3,240</h3>
          <p className="font-label-sm text-label-sm text-secondary flex items-center mt-2 gap-1">
            <MdTrendingUp className="text-[14px]" />
            +85 this week
          </p>
        </div>
        {/* Stat Card 3 */}
        <div className="bg-surface-container-lowest border border-[#E8E0D5] rounded-xl p-5 shadow-[0_1px_4px_rgba(26,46,46,0.06)] relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-surface-container rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500 pointer-events-none"></div>
          <div className="flex items-start justify-between mb-2">
            <p className="font-label-sm text-label-sm text-on-surface-variant">Live Courses</p>
            <MdLibraryBooks className="text-secondary text-[20px] bg-secondary-container/30 p-1 rounded-md" />
          </div>
          <h3 className="font-headline-md text-headline-md text-primary">12</h3>
          <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center mt-2 gap-1">
            2 drafts pending
          </p>
        </div>
        {/* Stat Card 4 */}
        <div className="bg-surface-container-lowest border border-[#E8E0D5] rounded-xl p-5 shadow-[0_1px_4px_rgba(26,46,46,0.06)] relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-surface-container rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500 pointer-events-none"></div>
          <div className="flex items-start justify-between mb-2">
            <p className="font-label-sm text-label-sm text-on-surface-variant">Avg. Completion</p>
            <MdCheckCircle className="text-secondary text-[20px] bg-secondary-container/30 p-1 rounded-md" />
          </div>
          <h3 className="font-headline-md text-headline-md text-primary">78%</h3>
          <p className="font-label-sm text-label-sm text-secondary flex items-center mt-2 gap-1">
            <MdTrendingUp className="text-[14px]" />
            +4% from average
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
          <div className="bg-surface-container-lowest border border-[#E8E0D5] rounded-xl p-1 shadow-[0_1px_4px_rgba(26,46,46,0.06)]">
            <ul className="divide-y divide-outline-variant/20">
              {/* Activity Item 1 */}
              <li className="p-4 flex gap-4 hover:bg-surface-container/30 transition-colors rounded-lg group">
                <div className="w-10 h-10 rounded-full bg-[#E8E0D5]/50 flex items-center justify-center flex-shrink-0 text-primary">
                  <MdForum />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="font-label-md text-label-md text-primary">New question in <span className="font-bold">Clinical Anatomy 101</span></p>
                    <span className="font-label-sm text-label-sm text-outline">2h ago</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1 text-sm">Sarah Jenkins asked: &quot;Could you clarify the distinction between...&quot;</p>
                  <button className="mt-2 text-secondary font-label-sm text-label-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Reply now</button>
                </div>
              </li>
              {/* Activity Item 2 */}
              <li className="p-4 flex gap-4 hover:bg-surface-container/30 transition-colors rounded-lg group">
                <div className="w-10 h-10 rounded-full bg-secondary-container/50 flex items-center justify-center flex-shrink-0 text-secondary">
                  <MdStar />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="font-label-md text-label-md text-primary">New 5-star review</p>
                    <span className="font-label-sm text-label-sm text-outline">5h ago</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1 text-sm">&quot;Excellent breakdown of complex cardiovascular pathology...&quot;</p>
                </div>
              </li>
              {/* Activity Item 3 */}
              <li className="p-4 flex gap-4 hover:bg-surface-container/30 transition-colors rounded-lg group">
                <div className="w-10 h-10 rounded-full bg-[#E8E0D5]/50 flex items-center justify-center flex-shrink-0 text-primary">
                  <MdPersonAdd />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="font-label-md text-label-md text-primary">Milestone reached!</p>
                    <span className="font-label-sm text-label-sm text-outline">1d ago</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1 text-sm">You just crossed 3,000 active learners across all courses.</p>
                </div>
              </li>
            </ul>
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
            <Link href="/dashboard" className="bg-surface-container-lowest border border-[#E8E0D5] rounded-xl p-5 shadow-[0_1px_4px_rgba(26,46,46,0.06)] hover:border-secondary hover:shadow-md transition-all group flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#E8E0D5] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <MdAutoAwesome />
              </div>
              <span className="font-label-md text-label-md text-primary">AI Assistant</span>
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
          {/* Course Card 1 */}
          <div className="bg-surface-container-lowest border border-[#E8E0D5] rounded-xl shadow-[0_1px_4px_rgba(26,46,46,0.06)] min-w-[300px] w-[300px] flex-shrink-0 snap-start overflow-hidden flex flex-col">
            <div className="h-40 bg-surface-container relative">
              <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDispiJPbDJIhB3B_TgU2vxjcIJBexf3ORBO7qIKHGdS5meFxyGhn4yvN-P4mpblyP7R0vLFsHpuIjFWu80BqhhWC2o55HA-WSOAATxYEsVb9opUnHT7juADmT0QT4jrXajnONMKwRtyJ-NcubJ8crbfNjevW12VP-9VfQpDLafhifko5g-ZLHp2kDSMvfRE94PFWqdtxwUPC2TYUkjRue5Y7NvFX0GQiBgc7SKEIVZ2X7jVlt5GS1zN3g9f4KBul8nezQJ9lbYFbA" alt="Clinical Anatomy Course" width={300} height={160} className="w-full h-full object-cover" unoptimized />
              <div className="absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur-sm px-2 py-1 rounded font-label-sm text-label-sm text-primary">Active</div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-headline-md text-body-lg font-medium text-primary mb-1 line-clamp-2 leading-tight">Advanced Clinical Anatomy &amp; Pathology</h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant mb-4">12 Modules • 48 Lessons</p>
              <div className="mt-auto grid grid-cols-2 gap-2 border-t border-[#E8E0D5] pt-3">
                <div>
                  <p className="font-label-sm text-label-sm text-outline text-[10px]">ENROLLED</p>
                  <p className="font-label-md text-label-md text-primary">1,204</p>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-outline text-[10px]">RATING</p>
                  <p className="font-label-md text-label-md text-primary flex items-center">
                    <MdStar className="text-secondary text-[14px] mr-1" /> 4.9
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Course Card 2 */}
          <div className="bg-surface-container-lowest border border-[#E8E0D5] rounded-xl shadow-[0_1px_4px_rgba(26,46,46,0.06)] min-w-[300px] w-[300px] flex-shrink-0 snap-start overflow-hidden flex flex-col">
            <div className="h-40 bg-surface-container relative">
              <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3AXe47wxvkGn83Lv0zMr6z8_9sdpe_SIJdwEBbauR4hnEM4lDzO1GpNBhH6q6dqihCEkMlCGX1AFgUSUMPoOj8kYoVDA4AeCjSIFqMJTTf4A4Xuka_jAv5QS57aHHkzTXZPavTxzPIRWFT376xtB8_BzSNGALY9_xM2naJt6q5eGmolo_J35JVP4ZY1Zjf2s0AtogHseujQPhWfiSb7VyLp3EzGOmg3-629HR07jPZAMMTCCxXeJVis7dlCpeS3JN_D4AKYCRDVE" alt="Pharmacology Course" width={300} height={160} className="w-full h-full object-cover" unoptimized />
              <div className="absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur-sm px-2 py-1 rounded font-label-sm text-label-sm text-primary">Active</div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-headline-md text-body-lg font-medium text-primary mb-1 line-clamp-2 leading-tight">Essential Pharmacology for Med Students</h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant mb-4">8 Modules • 32 Lessons</p>
              <div className="mt-auto grid grid-cols-2 gap-2 border-t border-[#E8E0D5] pt-3">
                <div>
                  <p className="font-label-sm text-label-sm text-outline text-[10px]">ENROLLED</p>
                  <p className="font-label-md text-label-md text-primary">856</p>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-outline text-[10px]">RATING</p>
                  <p className="font-label-md text-label-md text-primary flex items-center">
                    <MdStar className="text-secondary text-[14px] mr-1" /> 4.8
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Course Card 3 (Draft) */}
          <div className="bg-surface border border-outline-variant border-dashed rounded-xl shadow-none min-w-[300px] w-[300px] flex-shrink-0 snap-start overflow-hidden flex flex-col opacity-80 hover:opacity-100 transition-opacity">
            <div className="h-40 bg-surface-container-highest flex items-center justify-center relative">
              <MdEditDocument className="text-[48px] text-outline text-[48px]" />
              <div className="absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur-sm px-2 py-1 rounded font-label-sm text-label-sm text-on-surface-variant">Draft</div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-center items-center text-center">
              <h3 className="font-headline-md text-body-lg font-medium text-primary mb-2 line-clamp-2 leading-tight">Surgical Techniques Fundamentals</h3>
              <div className="w-full bg-outline-variant/30 h-1.5 rounded-full mt-2 mb-1">
                <div className="bg-secondary h-1.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant">45% Complete</p>
              <button className="mt-4 border border-primary text-primary font-label-sm text-label-sm py-1.5 px-4 rounded-md hover:bg-primary hover:text-on-primary transition-colors">Continue Editing</button>
            </div>
          </div>
          {/* Add New Card */}
          <Link href="/course-builder" className="bg-transparent border border-outline-variant border-dashed rounded-xl shadow-none min-w-[300px] w-[300px] flex-shrink-0 snap-start flex flex-col items-center justify-center text-outline hover:text-primary hover:border-primary hover:bg-surface-container-lowest transition-all">
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
