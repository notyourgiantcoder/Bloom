import Link from "next/link";
import Image from "next/image";

export default function SideNavBar() {
  return (
    <>
      {/* SideNavBar (Desktop) */}
      <nav aria-label="Sidebar Navigation" className="bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container docked left-0 h-full w-64 fixed top-0 flex flex-col py-stack-lg z-40 hidden md:flex border-r border-transparent">
        {/* Header / Brand */}
        <div className="px-6 mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-container-lowest overflow-hidden flex items-center justify-center">
             <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3jF8YVypIaO5ukcmOo6FHkJ0pAjX81Dee485kU_uXHlMZuuV7P82ZAGlocfbCQTCp_nYTO9Q8hIahYF6cBsCD6fDQrvbgXiO4iZUJxC4Y4C6fU3r-eZ5uXZaO4gXHE6p7b_cZ4YpDrbnVLebS_5lzCdpxGuYCkp7npX4rJf_JUjLc-GGtMhNx0Fw8Yc1_nCcW1TsUrthPHY71E6ncrtmWs3dVb0ob-xG8BUSCCvs6X-DBZnDodgA-rRI2U36FKCjPlAgGKJu6Iws" alt="Workspace Avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-headline-sm font-headline-sm text-on-primary leading-none">Creator Workspace</h2>
            <p className="font-label-sm text-label-sm text-on-primary/70 mt-1">MediLab Pro</p>
          </div>
        </div>
        {/* Navigation Links */}
        <div className="flex flex-col gap-1 flex-1 px-2">
          {/* Active: Dashboard */}
          <Link href="/dashboard" aria-current="page" className="flex items-center gap-3 text-secondary-container dark:text-secondary border-l-4 border-secondary bg-on-primary-fixed-variant/10 px-4 py-3 font-label-md text-label-md rounded-r-lg translate-x-1 transition-transform">
            <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
            Dashboard
          </Link>
          <Link href="/course-builder" className="flex items-center gap-3 text-on-primary/70 dark:text-on-primary-container/70 px-4 py-3 font-label-md text-label-md rounded-r-lg border-l-4 border-transparent hover:bg-on-primary-fixed-variant/20 hover:text-on-primary transition-all">
            <span className="material-symbols-outlined" data-icon="school">school</span>
            Courses
          </Link>
          <Link href="/dashboard" className="flex items-center gap-3 text-on-primary/70 dark:text-on-primary-container/70 px-4 py-3 font-label-md text-label-md rounded-r-lg border-l-4 border-transparent hover:bg-on-primary-fixed-variant/20 hover:text-on-primary transition-all">
            <span className="material-symbols-outlined" data-icon="auto_awesome">auto_awesome</span>
            AI Studio
          </Link>
          <Link href="/dashboard" className="flex items-center gap-3 text-on-primary/70 dark:text-on-primary-container/70 px-4 py-3 font-label-md text-label-md rounded-r-lg border-l-4 border-transparent hover:bg-on-primary-fixed-variant/20 hover:text-on-primary transition-all">
            <span className="material-symbols-outlined" data-icon="groups">groups</span>
            Community
          </Link>
          <Link href="/dashboard" className="flex items-center gap-3 text-on-primary/70 dark:text-on-primary-container/70 px-4 py-3 font-label-md text-label-md rounded-r-lg border-l-4 border-transparent hover:bg-on-primary-fixed-variant/20 hover:text-on-primary transition-all">
            <span className="material-symbols-outlined" data-icon="analytics">analytics</span>
            Analytics
          </Link>
          <Link href="/dashboard" className="flex items-center gap-3 text-on-primary/70 dark:text-on-primary-container/70 px-4 py-3 font-label-md text-label-md rounded-r-lg border-l-4 border-transparent hover:bg-on-primary-fixed-variant/20 hover:text-on-primary transition-all">
            <span className="material-symbols-outlined" data-icon="settings">settings</span>
            Settings
          </Link>
        </div>
        {/* Footer Actions */}
        <div className="px-6 mt-auto flex flex-col gap-4">
          <button className="w-full bg-surface-container-lowest text-primary font-label-md text-label-md py-2 rounded-lg hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2 border border-surface-container-low">
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Project
          </button>
          <Link href="/dashboard" className="flex items-center gap-3 text-on-primary/70 dark:text-on-primary-container/70 py-2 font-label-md text-label-md hover:text-on-primary transition-colors">
            <span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
            Profile
          </Link>
        </div>
      </nav>

      {/* Mobile Top App Bar */}
      <header className="md:hidden bg-primary text-on-primary w-full h-16 fixed top-0 flex items-center justify-between px-4 z-50 shadow-sm">
        <h1 className="font-headline-sm text-headline-sm">Creator Workspace</h1>
        <button className="text-on-primary">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </header>
    </>
  );
}
