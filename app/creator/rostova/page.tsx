"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import TopNavBar from "../../components/layout/TopNavBar";
import Footer from "../../components/layout/Footer";

export default function CreatorPublicProfilePage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [question, setQuestion] = useState("");
  const [questionSent, setQuestionSent] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (question) {
      setQuestionSent(true);
      setQuestion("");
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col relative overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      {/* Background Pulse */}
      <div 
        className="absolute w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(245,230,0,0.15)_0%,rgba(242,100,17,0.05)_50%,transparent_70%)] rounded-full blur-[40px] z-0 pointer-events-none top-[20%] right-[-100px]"
        style={{ animation: 'bloom-pulse 4s linear ease-in-out infinite alternate' }}
      ></div>

      <TopNavBar />

      {/* Main Canvas */}
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg flex flex-col gap-stack-lg z-10">
        
        {/* Header Profile Section */}
        <section className="relative w-full rounded-xl overflow-hidden bg-surface-container-lowest border border-outline-variant/30 shadow-sm card-shadow">
          {/* Cover Image / Gradient */}
          <div className="h-48 md:h-64 w-full bg-gradient-to-r from-surface-variant to-tertiary-fixed opacity-85 relative">
            <img 
              alt="Cover Image" 
              className="w-full h-full object-cover mix-blend-overlay"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmpEqz32pQpXFmeNV11FENe_1G6QhJhJTXhtGsDGQweLACkmkk6JG-IQj00vGUU4pzoCacxcb8zv-VCgTcY24bePbJQdmS2jcLgJm908jlK9rrmEIp3UwIGKBJZo3OF-IBZWRZ33O1ziTBvR7fVYyNsaF1cGHYxkQRpb_KvctuB3FqsHqQ6_WEHoVoTvkmJkLe6Wxrw9WGpnJcP3MYzr6g-MV3NWeS8_5hlAqCb32r9AKjo-S_CVXSo8UBNX6pO3FGWbJ402MwDUc"
            />
          </div>
          
          {/* Profile details row overlay */}
          <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-end -mt-16 md:-mt-20 relative z-20">
            {/* Avatar Photo */}
            <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-outline-variant/30 bg-surface-container shadow-md shrink-0">
              <img 
                alt="Elena Rostova" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh2uek-1i7b3oNTPq7rUoiG8P44iOBcVgqrSOk2vyn8jF_GHMvPUTKbP-ugFLmFeAdiCwXE1hIFnHY95fKEjkeLLjrwx-r44739l6KJk9ZVTwLhxd_Op6bNAxVMqYgV1fOThKvB3W-OHG56epPozHm5LvwpHYmPsAjPOgRoENEDfuKRKFnS3ipEkDbHDyE3Pnsm6Lwcnh8ZCcMR20TLnFtT1ti41WPq-z0l2v3txB3on6WvhybTev0RvtQR5-HWJGT3bfUz9sVjdQ"
              />
            </div>
            
            {/* Meta Details */}
            <div className="flex-1 pb-2">
              <div className="flex flex-wrap justify-between items-end gap-4">
                <div>
                  <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary tracking-tight">Elena Rostova</h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">Visual Storyteller &amp; Creative Director</p>
                </div>
                <div className="flex gap-3">
                  <button className="bg-transparent border border-outline-variant text-primary px-5 py-2.5 rounded-lg font-label-md text-label-md transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    Message
                  </button>
                  <button className="bg-primary hover:opacity-90 text-on-primary px-6 py-2.5 rounded-lg font-label-md text-label-md transition-colors shadow-sm font-semibold">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          
          {/* Left Column (Bio & Courses) */}
          <div className="lg:col-span-8 flex flex-col gap-stack-lg">
            
            {/* Bio Card */}
            <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 md:p-8 card-shadow">
              <h2 className="font-headline-sm text-headline-sm text-primary mb-4">About Elena</h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
                Studying the intersection of cinematography, video production, and cohort-based learning. 
                With over a decade of production experience in the Creative Storytelling Collective, my mission is to design educational paths 
                that eliminate noise, promote visual memory retention, and cultivate flow-state learning for creators, designers, and film professionals.
              </p>
              
              {/* Profile statistics */}
              <div className="grid grid-cols-3 gap-4 border-t border-outline-variant/30 pt-6">
                <div className="text-center md:text-left">
                  <div className="font-headline-sm text-[28px] text-primary font-bold">12</div>
                  <div className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider mt-1">Workshops</div>
                </div>
                <div className="text-center md:text-left border-x border-outline-variant/20 px-4">
                  <div className="font-headline-sm text-[28px] text-primary font-bold">3,240</div>
                  <div className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider mt-1">Students</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="font-headline-sm text-[28px] text-primary flex items-center justify-center md:justify-start gap-1 font-bold">
                    4.9 <span className="material-symbols-outlined text-secondary text-[20px] filled">star</span>
                  </div>
                  <div className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider mt-1">Avg Rating</div>
                </div>
              </div>
            </section>

            {/* Courses section */}
            <section className="space-y-6">
              <h2 className="font-headline-sm text-headline-sm text-primary">Active Cohorts &amp; Courses</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter">
                
                {/* Course 1 */}
                <div className="group bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
                  <div className="aspect-video relative overflow-hidden bg-surface-dim">
                    <img 
                      alt="Visual Storytelling Masterclass" 
                      className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
                      src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    />
                    <span className="absolute top-3 left-3 bg-secondary text-on-secondary font-label-sm text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold">Bestseller</span>
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-headline-sm text-[20px] text-primary group-hover:text-primary-container transition-colors leading-tight mb-2">Visual Storytelling Masterclass</h3>
                      <p className="font-body-md text-sm text-on-surface-variant line-clamp-2">Learn to shoot cinematic videos that capture audience attention and grow your personal brand.</p>
                    </div>
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-outline-variant/20">
                      <span className="font-headline-sm text-[20px] text-on-surface">₹299</span>
                      <Link href="/courses/anatomy" className="text-secondary font-label-md text-label-sm hover:underline flex items-center gap-1 font-bold">
                        View Details <span className="material-symbols-outlined text-[14px] font-bold">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Course 2 */}
                <div className="group bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
                  <div className="aspect-video relative overflow-hidden bg-surface-dim">
                    <img 
                      alt="Full-Stack Creative Production" 
                      className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
                      src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    />
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-headline-sm text-[20px] text-primary group-hover:text-primary-container transition-colors leading-tight mb-2">Full-Stack Creative Production</h3>
                      <p className="font-body-md text-sm text-on-surface-variant line-clamp-2">Structuring your creative workflow, script writing, edit management, and social distribution.</p>
                    </div>
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-outline-variant/20">
                      <span className="font-headline-sm text-[20px] text-on-surface">₹399</span>
                      <Link href="/courses/anatomy" className="text-secondary font-label-md text-label-sm hover:underline flex items-center gap-1 font-bold">
                        View Details <span className="material-symbols-outlined text-[14px] font-bold">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            </section>
          </div>

          {/* Right Column (Sidebar Actions) */}
          <div className="lg:col-span-4 flex flex-col gap-stack-lg">
            
            {/* Connect Section */}
            <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 card-shadow">
              <h3 className="font-headline-sm text-[18px] text-primary mb-4">Connect</h3>
              <div className="flex flex-col gap-3">
                <a href="#" className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors py-1.5 font-label-md text-label-md">
                  <span className="material-symbols-outlined text-outline">language</span>
                  Portfolio Website
                </a>
                <a href="#" className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors py-1.5 font-label-md text-label-md">
                  <span className="material-symbols-outlined text-outline">campaign</span>
                  Cohort Announcements
                </a>
                <a href="#" className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors py-1.5 font-label-md text-label-md">
                  <span className="material-symbols-outlined text-outline">share</span>
                  Twitter / X
                </a>
              </div>
            </section>

            {/* Newsletter Subscription */}
            <section className="bg-surface-container border border-outline-variant/40 rounded-xl p-6">
              <h3 className="font-headline-sm text-[18px] text-primary mb-2">Weekly Creator Letter</h3>
              <p className="font-body-md text-sm text-on-surface-variant mb-4 leading-normal">Get insights on production science, editing hooks, and monetization tools straight to your inbox.</p>
              
              {subscribed ? (
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 text-center text-secondary font-label-md text-label-sm font-bold">
                  ✓ Successfully Subscribed!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                  <input 
                    type="email" 
                    placeholder="name@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-4 py-2 font-body-md text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-outline-variant"
                  />
                  <button type="submit" className="w-full bg-primary hover:opacity-90 text-on-primary font-label-md text-label-sm py-2.5 rounded-lg transition-colors font-bold">
                    Subscribe
                  </button>
                </form>
              )}
            </section>

            {/* Ask a Question */}
            <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 card-shadow">
              <h3 className="font-headline-sm text-[18px] text-primary mb-2">Ask a Question</h3>
              <p className="font-body-md text-sm text-on-surface-variant mb-4 leading-normal">Have a question about camera setups, lighting, or scripting your workshops? Ask Elena directly.</p>
              
              {questionSent ? (
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 text-center text-secondary font-label-md text-label-sm font-bold">
                  ✓ Message sent to Elena.
                </div>
              ) : (
                <form onSubmit={handleSendQuestion} className="flex flex-col gap-3">
                  <textarea 
                    placeholder="Your question..." 
                    rows={3}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-lg p-3 font-body-md text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none placeholder:text-outline-variant"
                  ></textarea>
                  <button type="submit" className="w-full bg-transparent border border-primary hover:bg-primary/10 text-primary font-label-md text-label-sm py-2.5 rounded-lg transition-colors font-bold">
                    Send Question
                  </button>
                </form>
              )}
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
