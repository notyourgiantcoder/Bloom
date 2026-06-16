import SideNavBar from "../components/layout/SideNavBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface text-on-surface font-body-md overflow-x-hidden flex h-screen w-full relative">
      {/* Bloom Pulse Background Effect */}
      <div 
        className="absolute w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(17,71,70,0.1)_0%,rgba(70,103,41,0.05)_50%,rgba(231,254,253,0)_70%)] rounded-full blur-[40px] z-0 pointer-events-none top-[-100px] right-[-100px]"
        style={{ animation: 'pulse-bloom 4s linear ease-in-out infinite alternate' }}
      ></div>
      
      <SideNavBar />
      
      {/* Main Content Canvas */}
      <main className="flex-1 ml-0 md:ml-64 mt-16 md:mt-0 p-margin-mobile md:p-margin-desktop overflow-y-auto relative z-10 w-full h-full">
        {children}
      </main>
      
      {/* Required for custom animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-bloom {
            0% { transform: scale(1.0); opacity: 0.7; }
            100% { transform: scale(1.04); opacity: 1.0; }
        }
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
