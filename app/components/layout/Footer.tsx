import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest dark:bg-surface-dim border-t border-outline-variant w-full full-width bottom-0 mt-12">
      <div className="w-full py-stack-lg px-margin-desktop flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto">
        <div className="mb-4 md:mb-0">
          <span className="text-headline-sm font-headline-sm text-primary dark:text-primary-fixed">Bloom</span>
          <p className="font-body-md text-body-md mt-2 text-on-surface-variant">Made with care in India 🌱</p>
        </div>
        <div className="flex flex-wrap gap-6 items-center">
          <Link href="/" className="font-label-sm text-label-sm text-on-surface-variant dark:text-outline hover:text-secondary transition-colors">
            Terms
          </Link>
          <Link href="/" className="font-label-sm text-label-sm text-on-surface-variant dark:text-outline hover:text-secondary transition-colors">
            Privacy
          </Link>
          <Link href="/" className="font-label-sm text-label-sm text-on-surface-variant dark:text-outline hover:text-secondary transition-colors">
            Support
          </Link>
          <Link href="/" className="font-label-sm text-label-sm text-on-surface-variant dark:text-outline hover:text-secondary transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
