import Link from "next/link";
import { MdArrowForward } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";
import { LogoMark } from "../ui/LogoMark";

export default function Footer() {
  return (
    <footer className="relative mt-40">
      {/* Floating Banner */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-12 z-10 w-[90%] max-w-5xl bg-secondary-container text-on-secondary-container rounded-[5rem] px-8 py-6 md:py-10 md:px-12 flex items-center justify-between shadow-xl">
        <h3 className="text-2xl md:text-4xl font-medium m-0 tracking-tight">Connect with our experts.</h3>
        <button className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border-[1.5px] border-on-secondary-container hover:bg-on-secondary-container hover:text-secondary-container transition-colors">
          <MdArrowForward className="text-2xl md:text-3xl font-light" />
        </button>
      </div>

      {/* Main Footer Body */}
      <div className="bg-primary text-on-primary pt-32 pb-12 px-8 md:px-16 rounded-t-[3rem]">
        <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between gap-16">
          
          {/* Left Column */}
          <div className="flex flex-col gap-10 h-full justify-between">
            <div>
              {/* Logo placeholder - styling like the screenshot's green bars */}
              {/* Logo placeholder - styling like the screenshot's green bars */}
              <LogoMark className="text-[#c6efa1] text-5xl mb-4" />
              <div className="flex flex-wrap gap-6 text-sm font-medium mt-16 opacity-90">
                <Link href="/" className="hover:opacity-100 transition-opacity">About</Link>
                <Link href="/" className="hover:opacity-100 transition-opacity">Work</Link>
                <Link href="/" className="hover:opacity-100 transition-opacity">Collective</Link>
                <Link href="/" className="hover:opacity-100 transition-opacity">Contact</Link>
              </div>
            </div>
            
            <p className="text-xs opacity-70 mt-16 md:mt-24">© 2024 Bloom Education</p>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-8 w-full md:max-w-md">
            <h3 className="text-2xl md:text-3xl font-medium m-0 tracking-tight">Learn the latest trends!</h3>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="flex-1 rounded-[2rem] px-6 py-3.5 text-sm text-on-surface bg-surface border-none outline-none focus:ring-2 focus:ring-secondary placeholder:text-outline"
              />
              <button className="bg-[#DDE279] text-[#1D3220] px-8 py-3.5 rounded-[2rem] font-semibold hover:brightness-105 transition-all shadow-md text-sm whitespace-nowrap">
                Submit
              </button>
            </div>

            <div className="mt-2">
               <Link href="/" className="inline-flex opacity-80 hover:opacity-100 transition-opacity">
                 <FaLinkedinIn className="text-xl" />
               </Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
