export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-[0.15em] w-[1em] ${className}`}>
      <div className="h-[0.15em] bg-current rounded-full w-full"></div>
      <div className="h-[0.15em] bg-current rounded-full w-[70%]"></div>
      <div className="h-[0.15em] bg-current rounded-full w-[90%]"></div>
      <div className="h-[0.15em] bg-current rounded-full w-[70%]"></div>
      <div className="h-[0.15em] bg-current rounded-full w-full"></div>
    </div>
  );
}
