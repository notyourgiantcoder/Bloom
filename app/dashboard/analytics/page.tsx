export default function AnalyticsPage() {
  return (
    <div className="max-w-container-max mx-auto space-y-gutter">
      {/* Header & Date Range */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-stack-md border-b border-outline-variant/30 pb-stack-md">
        <div>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary">Analytics</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Overview of your creator workspace performance.</p>
        </div>
        <div className="flex items-center gap-3 bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-4 py-2 hover:border-outline-variant transition-colors cursor-pointer card-shadow">
          <span className="material-symbols-outlined text-outline">calendar_today</span>
          <span className="font-label-md text-label-md text-on-surface">Last 30 Days</span>
          <span className="material-symbols-outlined text-outline">expand_more</span>
        </div>
      </header>

      {/* Stats Row (Bento Grid Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {/* Stat Card 1 */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 card-shadow flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-fixed/20 rounded-full blur-xl group-hover:bg-primary-fixed/30 transition-colors"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Revenue</span>
            <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">payments</span>
          </div>
          <div className="relative z-10">
            <h3 className="font-headline-md text-headline-md text-on-surface m-0">$12,450</h3>
            <div className="flex items-center gap-1 mt-2 text-secondary">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              <span className="font-label-sm text-label-sm">+14.2%</span>
              <span className="font-label-sm text-label-sm text-outline ml-1">vs last month</span>
            </div>
          </div>
        </div>
        {/* Stat Card 2 */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 card-shadow flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary-container/20 rounded-full blur-xl group-hover:bg-secondary-container/30 transition-colors"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Students</span>
            <span className="material-symbols-outlined text-secondary bg-secondary/10 p-2 rounded-lg">group</span>
          </div>
          <div className="relative z-10">
            <h3 className="font-headline-md text-headline-md text-on-surface m-0">1,284</h3>
            <div className="flex items-center gap-1 mt-2 text-secondary">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              <span className="font-label-sm text-label-sm">+5.8%</span>
              <span className="font-label-sm text-label-sm text-outline ml-1">vs last month</span>
            </div>
          </div>
        </div>
        {/* Stat Card 3 */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 card-shadow flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-tertiary-fixed/20 rounded-full blur-xl group-hover:bg-tertiary-fixed/30 transition-colors"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Watch Time</span>
            <span className="material-symbols-outlined text-tertiary bg-tertiary/10 p-2 rounded-lg">schedule</span>
          </div>
          <div className="relative z-10">
            <h3 className="font-headline-md text-headline-md text-on-surface m-0">4,520h</h3>
            <div className="flex items-center gap-1 mt-2 text-error">
              <span className="material-symbols-outlined text-[16px]">trending_down</span>
              <span className="font-label-sm text-label-sm">-2.1%</span>
              <span className="font-label-sm text-label-sm text-outline ml-1">vs last month</span>
            </div>
          </div>
        </div>
        {/* Stat Card 4 */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 card-shadow flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-surface-variant/50 rounded-full blur-xl group-hover:bg-surface-variant/70 transition-colors"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Completion</span>
            <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">task_alt</span>
          </div>
          <div className="relative z-10">
            <h3 className="font-headline-md text-headline-md text-on-surface m-0">68%</h3>
            <div className="flex items-center gap-1 mt-2 text-secondary">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              <span className="font-label-sm text-label-sm">+1.4%</span>
              <span className="font-label-sm text-label-sm text-outline ml-1">vs last month</span>
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
            <button className="material-symbols-outlined text-outline hover:text-on-surface transition-colors">more_horiz</button>
          </div>
          <div className="flex-1 relative min-h-[300px] w-full bg-surface-container-low rounded-lg border border-outline-variant/20 flex items-end justify-between px-4 pb-8 pt-4">
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M 0 80 Q 15 60, 30 70 T 50 40 T 70 50 T 90 20 L 100 20 L 100 100 L 0 100 Z" fill="rgba(17, 71, 70, 0.05)"></path>
              <path d="M 0 80 Q 15 60, 30 70 T 50 40 T 70 50 T 90 20 L 100 20" fill="none" stroke="#114746" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
              <circle cx="30" cy="70" fill="#ffffff" r="3" stroke="#114746" strokeWidth="2" vectorEffect="non-scaling-stroke"></circle>
              <circle cx="50" cy="40" fill="#ffffff" r="3" stroke="#114746" strokeWidth="2" vectorEffect="non-scaling-stroke"></circle>
              <circle cx="70" cy="50" fill="#ffffff" r="3" stroke="#114746" strokeWidth="2" vectorEffect="non-scaling-stroke"></circle>
              <circle cx="90" cy="20" fill="#114746" r="4" stroke="#ffffff" strokeWidth="2" vectorEffect="non-scaling-stroke"></circle>
            </svg>
            <div className="absolute bottom-2 left-0 w-full flex justify-between px-8 text-outline font-label-sm text-label-sm">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4</span>
            </div>
          </div>
        </div>

        {/* Bar Chart (Enrollment) */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 card-shadow flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Enrollment</h2>
            <button className="material-symbols-outlined text-outline hover:text-on-surface transition-colors">more_horiz</button>
          </div>
          <div className="flex-1 w-full flex items-end justify-between gap-2 h-full min-h-[250px] pb-6 relative">
            <div className="absolute inset-0 flex flex-col justify-between pb-8 pointer-events-none">
              <div className="border-t border-outline-variant/20 w-full h-0"></div>
              <div className="border-t border-outline-variant/20 w-full h-0"></div>
              <div className="border-t border-outline-variant/20 w-full h-0"></div>
              <div className="border-t border-outline-variant/20 w-full h-0"></div>
            </div>
            <div className="w-1/5 bg-secondary/20 rounded-t-sm h-[40%] hover:bg-secondary transition-colors relative group">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface font-label-sm text-label-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">120</div>
            </div>
            <div className="w-1/5 bg-secondary/20 rounded-t-sm h-[60%] hover:bg-secondary transition-colors relative group">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface font-label-sm text-label-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">180</div>
            </div>
            <div className="w-1/5 bg-secondary/20 rounded-t-sm h-[30%] hover:bg-secondary transition-colors relative group">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface font-label-sm text-label-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">90</div>
            </div>
            <div className="w-1/5 bg-secondary rounded-t-sm h-[80%] shadow-[0_0_10px_rgba(242,100,17,0.3)] relative group">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface font-label-sm text-label-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">240</div>
            </div>
            <div className="w-1/5 bg-secondary/20 rounded-t-sm h-[50%] hover:bg-secondary transition-colors relative group">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface font-label-sm text-label-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">150</div>
            </div>
            <div className="absolute bottom-0 left-0 w-full flex justify-between text-outline font-label-sm text-label-sm pt-2">
              <span className="w-1/5 text-center">M</span>
              <span className="w-1/5 text-center">T</span>
              <span className="w-1/5 text-center">W</span>
              <span className="w-1/5 text-center">T</span>
              <span className="w-1/5 text-center">F</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Course Performance & Table */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-gutter">
        {/* Horizontal Bar Chart (Course Performance) */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 card-shadow flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Top Courses</h2>
            <button className="material-symbols-outlined text-outline hover:text-on-surface transition-colors">more_horiz</button>
          </div>
          <div className="space-y-4 flex-1 flex flex-col justify-center">
            <div>
              <div className="flex justify-between font-label-md text-label-md text-on-surface mb-1">
                <span>Advanced UX Design</span>
                <span>$4,200</span>
              </div>
              <div className="w-full bg-surface-container-low rounded-full h-2 overflow-hidden">
                <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-label-md text-label-md text-on-surface mb-1">
                <span>Intro to Framer</span>
                <span>$3,150</span>
              </div>
              <div className="w-full bg-surface-container-low rounded-full h-2 overflow-hidden">
                <div className="bg-primary h-2 opacity-80 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-label-md text-label-md text-on-surface mb-1">
                <span>Design Systems 101</span>
                <span>$2,800</span>
              </div>
              <div className="w-full bg-surface-container-low rounded-full h-2 overflow-hidden">
                <div className="bg-primary h-2 opacity-60 rounded-full" style={{ width: '55%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-label-md text-label-md text-on-surface mb-1">
                <span>Typography Mastery</span>
                <span>$1,900</span>
              </div>
              <div className="w-full bg-surface-container-low rounded-full h-2 overflow-hidden">
                <div className="bg-outline h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Table: Student Data */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl card-shadow xl:col-span-2 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-outline-variant/25 flex justify-between items-center">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Recent Students</h2>
            <button className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant/25 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium">Student Name</th>
                  <th className="px-6 py-4 font-medium">Enrollment Date</th>
                  <th className="px-6 py-4 font-medium">Progress</th>
                  <th className="px-6 py-4 font-medium text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="font-body-md text-body-md divide-y divide-outline-variant/10">
                <tr className="hover:bg-surface-container-low/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-label-md text-label-md">EJ</div>
                      <span className="text-on-surface font-medium">Elena Jenkins</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">Oct 24, 2023</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-surface-container-low rounded-full h-1.5 overflow-hidden">
                        <div className="bg-secondary h-1.5 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                      <span className="font-label-sm text-label-sm text-secondary font-bold">100%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-on-surface font-label-md text-label-md">$299</td>
                </tr>
                <tr className="hover:bg-surface-container-low/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-label-md text-label-md">MR</div>
                      <span className="text-on-surface font-medium">Marcus Rowe</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">Oct 22, 2023</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-surface-container-low rounded-full h-1.5 overflow-hidden">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">45%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-on-surface font-label-md text-label-md">$149</td>
                </tr>
                <tr className="hover:bg-surface-container-low/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-label-md text-label-md">SL</div>
                      <span className="text-on-surface font-medium">Sarah Lin</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">Oct 20, 2023</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-surface-container-low rounded-full h-1.5 overflow-hidden">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: '12%' }}></div>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">12%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-on-surface font-label-md text-label-md">$299</td>
                </tr>
                <tr className="hover:bg-surface-container-low/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-label-md text-label-md">DT</div>
                      <span className="text-on-surface font-medium">David Thompson</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">Oct 18, 2023</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-surface-container-low rounded-full h-1.5 overflow-hidden">
                        <div className="bg-secondary h-1.5 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">88%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-on-surface font-label-md text-label-md">$49</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
