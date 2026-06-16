import Link from 'next/link';

export default function TopNavBar() {
  return (
    <nav className="bg-surface dark:bg-surface-container w-full top-0 sticky z-50 shadow-sm border-b-0">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-headline-md font-headline-md font-bold text-primary dark:text-primary-fixed">
            Bloom <span className="text-[10px] bg-secondary/10 text-secondary px-1.5 py-0.5 rounded align-top ml-1 font-normal tracking-normal uppercase">v1.1</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="font-label-md text-label-md text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors">
              Features
            </Link>
            <Link href="/" className="font-label-md text-label-md text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors">
              MediLab
            </Link>
            <Link href="/" className="font-label-md text-label-md text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors">
              Pricing
            </Link>
            <Link href="/" className="font-label-md text-label-md text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors">
              For Creators
            </Link>
          </div>
        </div>
        <div>
          <Link href="/sign-in" className="inline-flex items-center justify-center rounded-lg bg-primary text-on-primary px-5 py-2.5 font-label-md text-label-md hover:bg-surface-tint transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            Start for free
          </Link>
        </div>
      </div>
    </nav>
  );
}
