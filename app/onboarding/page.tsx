"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const router = useRouter();

  const handleNextStep = (step: number) => {
    setCurrentStep(step);
  };

  const handlePrevStep = (step: number) => {
    setCurrentStep(step);
  };

  const toggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleFinishSetup = () => {
    router.push("/dashboard");
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md text-body-md antialiased relative overflow-x-hidden">
      {/* Pulse Background */}
      <div 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(45,95,93,0.15)_0%,rgba(198,239,161,0.1)_40%,transparent_70%)] rounded-full z-0 pointer-events-none"
        style={{ animation: 'pulse-bloom 4s linear infinite alternate' }}
      ></div>

      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center p-margin-mobile md:p-margin-desktop z-10 w-full">
        <div className="w-full max-w-2xl bg-surface-container-lowest rounded-xl shadow-[0_1px_4px_rgba(26,46,46,0.06)] border border-outline-variant/30 p-8 md:p-12">
          
          {/* Header & Brand */}
          <div className="text-center mb-12">
            <h1 className="font-headline-sm text-headline-sm text-primary mb-2">Bloom</h1>
            <p className="text-on-surface-variant">Let's get your space set up.</p>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center items-center mb-12">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-label-sm text-label-sm transition-colors ${currentStep >= 1 ? 'bg-primary text-on-primary' : 'bg-surface-variant text-on-surface-variant'}`}>1</div>
              <div className={`w-12 h-px transition-colors ${currentStep >= 2 ? 'bg-primary' : 'bg-outline-variant'}`}></div>
              
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-label-sm text-label-sm transition-colors ${currentStep >= 2 ? 'bg-primary text-on-primary' : 'bg-surface-variant text-on-surface-variant'}`}>2</div>
              <div className={`w-12 h-px transition-colors ${currentStep >= 3 ? 'bg-primary' : 'bg-outline-variant'}`}></div>
              
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-label-sm text-label-sm transition-colors ${currentStep >= 3 ? 'bg-primary text-on-primary' : 'bg-surface-variant text-on-surface-variant'}`}>3</div>
            </div>
          </div>

          {/* Step 1: Who are you? */}
          {currentStep === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h2 className="font-headline-md text-headline-md text-center mb-8">How will you use Bloom?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Creator Card */}
                <div 
                  className={`cursor-pointer bg-surface-container-lowest border rounded-xl p-6 hover:shadow-sm transition-all ${selectedRole === 'creator' ? 'border-[#2d5f5d] bg-[#e1f8f7] ring-2 ring-[#2d5f5d]/20' : 'border-outline-variant'}`}
                  onClick={() => setSelectedRole('creator')}
                >
                  <div className="w-12 h-12 bg-surface-container rounded-lg flex items-center justify-center mb-4 text-primary">
                    <span className="material-symbols-outlined filled">draw</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm mb-2">Creator</h3>
                  <p className="text-on-surface-variant text-sm">I want to build courses, share knowledge, and grow an audience.</p>
                </div>
                {/* Student Card */}
                <div 
                  className={`cursor-pointer bg-surface-container-lowest border rounded-xl p-6 hover:shadow-sm transition-all ${selectedRole === 'student' ? 'border-[#2d5f5d] bg-[#e1f8f7] ring-2 ring-[#2d5f5d]/20' : 'border-outline-variant'}`}
                  onClick={() => setSelectedRole('student')}
                >
                  <div className="w-12 h-12 bg-surface-container rounded-lg flex items-center justify-center mb-4 text-primary">
                    <span className="material-symbols-outlined filled">school</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm mb-2">Student</h3>
                  <p className="text-on-surface-variant text-sm">I'm here to learn, explore courses, and join communities.</p>
                </div>
              </div>
              <div className="mt-10 flex justify-end">
                <button 
                  className="bg-primary text-on-primary hover:bg-primary-container px-6 py-3 rounded-lg font-label-md text-label-md transition-colors flex items-center gap-2 focus:ring-2 focus:ring-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleNextStep(2)}
                  disabled={!selectedRole}
                >
                  Continue <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Topics */}
          {currentStep === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h2 className="font-headline-md text-headline-md text-center mb-4">What interests you?</h2>
              <p className="text-center text-on-surface-variant mb-8">Select a few topics to personalize your experience.</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {['Health & Wellness', 'Technology', 'Personal Finance', 'Design', 'Business', 'Productivity', 'Arts & Culture'].map((topic) => {
                  const isSelected = selectedTopics.includes(topic);
                  return (
                    <button 
                      key={topic}
                      className={`border rounded-full px-4 py-2 font-label-md text-label-md transition-colors cursor-pointer ${isSelected ? 'bg-[#c6efa1] text-[#2f4f13] border-[#c6efa1]' : 'border-outline-variant text-on-surface hover:bg-surface-container'}`}
                      onClick={() => toggleTopic(topic)}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>
              <div className="mt-10 flex justify-between">
                <button 
                  className="text-on-surface-variant hover:text-primary px-4 py-3 font-label-md text-label-md transition-colors flex items-center gap-2"
                  onClick={() => handlePrevStep(1)}
                >
                  <span className="material-symbols-outlined text-sm">arrow_back</span> Back
                </button>
                <button 
                  className="bg-primary text-on-primary hover:bg-primary-container px-6 py-3 rounded-lg font-label-md text-label-md transition-colors flex items-center gap-2 focus:ring-2 focus:ring-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleNextStep(3)}
                  disabled={selectedTopics.length === 0}
                >
                  Continue <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Setup Space */}
          {currentStep === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h2 className="font-headline-md text-headline-md text-center mb-8">Set up your space</h2>
              <div className="space-y-6 max-w-md mx-auto">
                {/* Photo Upload */}
                <div className="flex flex-col items-center gap-4 mb-8">
                  <div className="w-24 h-24 rounded-full bg-surface-container border border-outline-variant border-dashed flex items-center justify-center text-on-surface-variant cursor-pointer hover:bg-surface-container-high transition-colors">
                    <span className="material-symbols-outlined text-[32px]">add_a_photo</span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Upload Profile Photo</span>
                </div>
                {/* Inputs */}
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-2" htmlFor="workspaceName">Workspace Name</label>
                  <input 
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all placeholder:text-outline/50 outline-none" 
                    id="workspaceName" 
                    placeholder="e.g. Acme Academy" 
                    type="text" 
                  />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-2" htmlFor="subdomain">Subdomain</label>
                  <div className="flex items-center">
                    <span className="bg-surface-container border border-r-0 border-outline-variant rounded-l-lg px-4 py-3 text-on-surface-variant font-label-md text-label-md">bloom.so/</span>
                    <input 
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-r-lg px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all placeholder:text-outline/50 outline-none" 
                      id="subdomain" 
                      placeholder="yourname" 
                      type="text" 
                    />
                  </div>
                </div>
              </div>
              <div className="mt-12 flex justify-between items-center">
                <button 
                  className="text-on-surface-variant hover:text-primary px-4 py-3 font-label-md text-label-md transition-colors flex items-center gap-2"
                  onClick={() => handlePrevStep(2)}
                >
                  <span className="material-symbols-outlined text-sm">arrow_back</span> Back
                </button>
                <button 
                  className="bg-primary text-on-primary hover:bg-primary-container px-8 py-3 rounded-lg font-label-md text-label-md transition-colors flex items-center gap-2 focus:ring-2 focus:ring-primary focus:outline-none shadow-sm"
                  onClick={handleFinishSetup}
                >
                  Finish setup <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-bloom {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
            100% { transform: translate(-50%, -50%) scale(1.04); opacity: 1; }
        }
      `}} />
    </div>
  );
}
