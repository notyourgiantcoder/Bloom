"use client";

export default function SettingsPage() {
  return (
    <div className="max-w-[800px] mx-auto">
      <div className="mb-stack-lg">
        <h1 className="font-display-lg text-display-lg text-primary mb-2">Settings</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Manage your account preferences, billing, and integrations.</p>
      </div>

      {/* Inner Navigation (Tabs) */}
      <div className="mb-stack-lg overflow-x-auto pb-2 -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0">
        <nav className="flex gap-6 border-b border-outline-variant/20 min-w-max">
          <button className="pb-3 border-b-2 border-secondary text-primary font-label-md text-label-md px-1 transition-colors">Profile</button>
          <button className="pb-3 border-b-2 border-transparent text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md px-1">Notifications</button>
          <button className="pb-3 border-b-2 border-transparent text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md px-1">Payment Gateway</button>
          <button className="pb-3 border-b-2 border-transparent text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md px-1">Billing</button>
          <button className="pb-3 border-b-2 border-transparent text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md px-1">Integrations</button>
          <button className="pb-3 border-b-2 border-transparent text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md px-1">API</button>
        </nav>
      </div>

      <div className="space-y-stack-lg">
        {/* Profile Section */}
        <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 card-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-surface-container/50 rounded-bl-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          <h2 className="font-headline-sm text-headline-sm text-primary mb-6">Profile Settings</h2>
          <div className="flex flex-col sm:flex-row gap-8 items-start mb-8">
            <div className="shrink-0 relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border border-outline-variant/30 bg-surface-container flex items-center justify-center">
                <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-headline-md text-headline-md">E</div>
              </div>
              <button aria-label="Upload new photo" className="absolute bottom-0 right-0 bg-surface border border-outline-variant/30 p-1.5 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              </button>
            </div>
            <div className="flex-1 space-y-4 w-full">
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="fullName">Full Name</label>
                <input className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-2 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-outline-variant" id="fullName" type="text" defaultValue="Elena Rostova" />
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="customDomain">Custom Domain</label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-outline-variant/20 bg-surface-container text-on-surface-variant font-body-md text-sm">https://</span>
                  <input className="flex-1 min-w-0 bg-surface-container border border-outline-variant/20 rounded-none rounded-r-lg px-4 py-2 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" id="customDomain" placeholder="elena-design.bloom.com" type="text" />
                </div>
              </div>
              <div className="pt-2">
                <button className="bg-primary hover:opacity-90 text-on-primary font-label-md text-label-md px-6 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 font-semibold">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Billing Section: Bento Layout */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Current Plan Card */}
          <div className="col-span-1 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 card-shadow flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Current Plan</h3>
                <span className="bg-secondary text-on-secondary font-label-sm text-[10px] px-2.5 py-0.5 rounded-full font-bold">Active</span>
              </div>
              <div className="font-headline-md text-headline-md text-primary mb-1">MediLab Pro</div>
              <div className="font-body-md text-on-surface-variant mb-6">₹2,499 / month</div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 font-body-md text-sm text-on-surface">
                  <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span> Unlimited Courses
                </li>
                <li className="flex items-center gap-2 font-body-md text-sm text-on-surface">
                  <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span> Custom Domain
                </li>
                <li className="flex items-center gap-2 font-body-md text-sm text-on-surface">
                  <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span> Advanced Analytics
                </li>
              </ul>
            </div>
            <button className="w-full bg-transparent border border-outline-variant text-primary hover:bg-surface-container font-label-md text-label-md px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              Manage Subscription
            </button>
          </div>

          {/* Invoice Table Card */}
          <div className="col-span-1 md:col-span-2 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 card-shadow">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-sm text-headline-sm text-primary">Billing History</h3>
              <button className="text-secondary hover:underline font-label-sm text-label-sm flex items-center gap-1 transition-colors">
                View All <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/20">
                    <th className="py-3 px-2 font-label-sm text-label-sm text-on-surface-variant font-medium">Date</th>
                    <th className="py-3 px-2 font-label-sm text-label-sm text-on-surface-variant font-medium">Amount</th>
                    <th className="py-3 px-2 font-label-sm text-label-sm text-on-surface-variant font-medium">Status</th>
                    <th className="py-3 px-2 font-label-sm text-label-sm text-on-surface-variant font-medium text-right">Invoice</th>
                  </tr>
                </thead>
                <tbody className="font-body-md text-sm text-on-surface">
                  <tr className="border-b border-outline-variant/10 hover:bg-surface-container/30 transition-colors">
                    <td className="py-4 px-2">Oct 12, 2023</td>
                    <td className="py-4 px-2">₹2,499.00</td>
                    <td className="py-4 px-2">
                      <span className="inline-flex items-center gap-1 text-secondary">
                        <span className="material-symbols-outlined text-[14px]">check</span> Paid
                      </span>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <button aria-label="Download Invoice" className="text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">download</span>
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-outline-variant/10 hover:bg-surface-container/30 transition-colors">
                    <td className="py-4 px-2">Sep 12, 2023</td>
                    <td className="py-4 px-2">₹2,499.00</td>
                    <td className="py-4 px-2">
                      <span className="inline-flex items-center gap-1 text-secondary">
                        <span className="material-symbols-outlined text-[14px]">check</span> Paid
                      </span>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <button aria-label="Download Invoice" className="text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">download</span>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container/30 transition-colors">
                    <td className="py-4 px-2">Aug 12, 2023</td>
                    <td className="py-4 px-2">₹2,499.00</td>
                    <td className="py-4 px-2">
                      <span className="inline-flex items-center gap-1 text-secondary">
                        <span className="material-symbols-outlined text-[14px]">check</span> Paid
                      </span>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <button aria-label="Download Invoice" className="text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">download</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="mt-12 border border-error/30 rounded-xl p-6 bg-error-container/10">
          <h2 className="font-headline-sm text-headline-sm text-error mb-2">Danger Zone</h2>
          <p className="font-body-md text-sm text-on-surface-variant mb-6 max-w-2xl">
            Once you delete your account, there is no going back. Please be certain. All your courses, student data, and analytics will be permanently erased.
          </p>
          <button className="bg-transparent border border-error text-error hover:bg-error hover:text-on-error font-label-md text-label-md px-6 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-2">
            Delete Account
          </button>
        </section>
      </div>
    </div>
  );
}
