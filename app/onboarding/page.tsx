"use client";
import { MdDraw, MdSchool, MdArrowForward, MdArrowBack, MdAddAPhoto } from "react-icons/md";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  // Step 3 – credentials
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [credError, setCredError] = useState<string | null>(null);

  // Step 4 – profile
  const [displayName, setDisplayName] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Submission
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const router = useRouter();
  const TOTAL_STEPS = 4;

  const handleNextStep = (step: number) => setCurrentStep(step);
  const handlePrevStep = (step: number) => setCurrentStep(step);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  // Validate credentials step before proceeding
  const handleCredentialsContinue = () => {
    setCredError(null);
    if (!email || !password || !confirmPassword) {
      setCredError("Please fill in all fields.");
      return;
    }
    if (password.length < 8) {
      setCredError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setCredError("Passwords do not match.");
      return;
    }
    handleNextStep(4);
  };

  // Final submit: sign up + update profile
  const handleFinishSetup = async () => {
    setSubmitError(null);
    setSubmitting(true);

    try {
      const supabase = getSupabaseBrowserClient();

      // 1. Sign up with email + password
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({ email, password });

      if (signUpError) {
        setSubmitError(signUpError.message);
        setSubmitting(false);
        return;
      }

      // 2. Upload avatar if provided (stored in `avatars` bucket)
      let avatarUrl: string | undefined;
      if (photoFile && signUpData.user) {
        const ext = photoFile.name.split(".").pop();
        const filePath = `${signUpData.user.id}/avatar.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, photoFile, { upsert: true });

        if (!uploadError) {
          const { data: publicUrlData } = supabase.storage
            .from("avatars")
            .getPublicUrl(filePath);
          avatarUrl = publicUrlData.publicUrl;
        }
      }

      // 3. Update user metadata with display name, role, topics & avatar
      await supabase.auth.updateUser({
        data: {
          display_name: displayName || email.split("@")[0],
          role: selectedRole,
          interests: selectedTopics,
          ...(avatarUrl ? { avatar_url: avatarUrl } : {}),
        },
      });

      router.push("/dashboard");
      router.refresh();
    } catch {
      setSubmitError("An unexpected error occurred. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md text-body-md antialiased relative overflow-x-hidden">
      {/* Pulse Background */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(45,95,93,0.15)_0%,rgba(198,239,161,0.1)_40%,transparent_70%)] rounded-full z-0 pointer-events-none"
        style={{ animation: "pulse-bloom 4s linear infinite alternate" }}
      ></div>

      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center p-margin-mobile md:p-margin-desktop z-10 w-full">
        <div className="w-full max-w-2xl bg-surface-container-lowest rounded-xl shadow-[0_1px_4px_rgba(26,46,46,0.06)] border border-outline-variant/30 p-8 md:p-12">

          {/* Header & Brand */}
          <div className="text-center mb-12">
            <h1 className="font-headline-sm text-headline-sm text-primary mb-2">Bloom</h1>
            <p className="text-on-surface-variant">Let&apos;s get your space set up.</p>
          </div>

          {/* Progress Indicator – 4 steps */}
          <div className="flex justify-center items-center mb-12">
            <div className="flex items-center gap-2">
              {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((step, idx) => (
                <div key={step} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-label-sm text-label-sm transition-colors ${
                      currentStep >= step
                        ? "bg-primary text-on-primary"
                        : "bg-surface-variant text-on-surface-variant"
                    }`}
                  >
                    {step}
                  </div>
                  {idx < TOTAL_STEPS - 1 && (
                    <div
                      className={`w-12 h-px transition-colors ${
                        currentStep > step ? "bg-primary" : "bg-outline-variant"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Step 1: Who are you? ── */}
          {currentStep === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h2 className="font-headline-md text-headline-md text-center mb-8">How will you use Bloom?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Creator Card */}
                <div
                  className={`cursor-pointer bg-surface-container-lowest border rounded-xl p-6 hover:shadow-sm transition-all ${
                    selectedRole === "creator"
                      ? "border-[#2d5f5d] bg-[#e1f8f7] ring-2 ring-[#2d5f5d]/20"
                      : "border-outline-variant"
                  }`}
                  onClick={() => setSelectedRole("creator")}
                >
                  <div className="w-12 h-12 rounded-full bg-secondary-container/50 text-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <MdDraw />
                  </div>
                  <h3 className="font-headline-sm text-headline-sm mb-2">Creator</h3>
                  <p className="text-on-surface-variant text-sm">I want to build courses, share knowledge, and grow an audience.</p>
                </div>
                {/* Student Card */}
                <div
                  className={`cursor-pointer bg-surface-container-lowest border rounded-xl p-6 hover:shadow-sm transition-all ${
                    selectedRole === "student"
                      ? "border-[#2d5f5d] bg-[#e1f8f7] ring-2 ring-[#2d5f5d]/20"
                      : "border-outline-variant"
                  }`}
                  onClick={() => setSelectedRole("student")}
                >
                  <div className="w-12 h-12 rounded-full bg-tertiary-container/50 text-tertiary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <MdSchool />
                  </div>
                  <h3 className="font-headline-sm text-headline-sm mb-2">Student</h3>
                  <p className="text-on-surface-variant text-sm">I&apos;m here to learn, explore courses, and join communities.</p>
                </div>
              </div>
              <div className="mt-10 flex justify-end">
                <button
                  className="bg-primary text-on-primary hover:bg-primary-container px-6 py-3 rounded-lg font-label-md text-label-md transition-colors flex items-center gap-2 focus:ring-2 focus:ring-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleNextStep(2)}
                  disabled={!selectedRole}
                >
                  Continue <MdArrowForward className="text-sm" />
                </button>
              </div>
            </div>
          )}

          {/* ── Step 2: Topics ── */}
          {currentStep === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h2 className="font-headline-md text-headline-md text-center mb-4">What interests you?</h2>
              <p className="text-center text-on-surface-variant mb-8">Select a few topics to personalize your experience.</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {["Health & Wellness", "Technology", "Personal Finance", "Design", "Business", "Productivity", "Arts & Culture"].map(
                  (topic) => {
                    const isSelected = selectedTopics.includes(topic);
                    return (
                      <button
                        key={topic}
                        className={`border rounded-full px-4 py-2 font-label-md text-label-md transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-[#c6efa1] text-[#2f4f13] border-[#c6efa1]"
                            : "border-outline-variant text-on-surface hover:bg-surface-container"
                        }`}
                        onClick={() => toggleTopic(topic)}
                      >
                        {topic}
                      </button>
                    );
                  }
                )}
              </div>
              <div className="mt-10 flex justify-between">
                <button
                  className="text-on-surface-variant hover:text-primary px-4 py-3 font-label-md text-label-md transition-colors flex items-center gap-2"
                  onClick={() => handlePrevStep(1)}
                >
                  <MdArrowBack className="text-sm" /> Back
                </button>
                <button
                  className="bg-primary text-on-primary hover:bg-primary-container px-6 py-3 rounded-lg font-label-md text-label-md transition-colors flex items-center gap-2 focus:ring-2 focus:ring-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleNextStep(3)}
                  disabled={selectedTopics.length === 0}
                >
                  Continue <MdArrowForward className="text-sm" />
                </button>
              </div>
            </div>
          )}

          {/* ── Step 3: Create Account (email + password) ── */}
          {currentStep === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h2 className="font-headline-md text-headline-md text-center mb-2">Create your account</h2>
              <p className="text-center text-on-surface-variant mb-8">You&apos;ll use these to sign in to Bloom.</p>

              {credError && (
                <div className="mb-6 bg-error-container text-on-error-container rounded-lg px-4 py-3 font-body-sm text-body-sm border border-error/20">
                  {credError}
                </div>
              )}

              <div className="space-y-5 max-w-md mx-auto">
                {/* Email */}
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-2" htmlFor="signup-email">
                    Email address
                  </label>
                  <input
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all placeholder:text-outline/50 outline-none"
                    id="signup-email"
                    placeholder="name@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-2" htmlFor="signup-password">
                    Create password
                  </label>
                  <input
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all placeholder:text-outline/50 outline-none"
                    id="signup-password"
                    placeholder="Minimum 8 characters"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-2" htmlFor="signup-confirm-password">
                    Confirm password
                  </label>
                  <input
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all placeholder:text-outline/50 outline-none"
                    id="signup-confirm-password"
                    placeholder="Re-enter your password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <div className="mt-10 flex justify-between">
                <button
                  className="text-on-surface-variant hover:text-primary px-4 py-3 font-label-md text-label-md transition-colors flex items-center gap-2"
                  onClick={() => handlePrevStep(2)}
                >
                  <MdArrowBack className="text-sm" /> Back
                </button>
                <button
                  className="bg-primary text-on-primary hover:bg-primary-container px-6 py-3 rounded-lg font-label-md text-label-md transition-colors flex items-center gap-2 focus:ring-2 focus:ring-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleCredentialsContinue}
                  disabled={!email || !password || !confirmPassword}
                >
                  Continue <MdArrowForward className="text-sm" />
                </button>
              </div>
            </div>
          )}

          {/* ── Step 4: Profile (Name + Photo) ── */}
          {currentStep === 4 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h2 className="font-headline-md text-headline-md text-center mb-8">Set up your profile</h2>

              {submitError && (
                <div className="mb-6 bg-error-container text-on-error-container rounded-lg px-4 py-3 font-body-sm text-body-sm border border-error/20">
                  {submitError}
                </div>
              )}

              <div className="space-y-6 max-w-md mx-auto">
                {/* Photo Upload */}
                <div className="flex flex-col items-center gap-4 mb-4">
                  <button
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                    aria-label="Upload profile photo"
                    className="focus:outline-none"
                  >
                    <div className="w-24 h-24 rounded-full bg-surface-variant border-2 border-dashed border-outline-variant flex items-center justify-center text-outline-variant hover:bg-surface-container-high hover:text-primary transition-colors cursor-pointer group overflow-hidden">
                      {photoPreview ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={photoPreview} alt="Profile preview" className="w-full h-full object-cover" />
                      ) : (
                        <MdAddAPhoto className="text-[32px]" />
                      )}
                    </div>
                  </button>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {photoPreview ? "Tap to change photo" : "Upload Profile Photo"}
                  </span>
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                </div>

                {/* Display Name */}
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-2" htmlFor="displayName">
                    Your name
                  </label>
                  <input
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all placeholder:text-outline/50 outline-none"
                    id="displayName"
                    placeholder="e.g. Aarya Jain"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    autoComplete="name"
                  />
                </div>
              </div>

              <div className="mt-12 flex justify-between items-center">
                <button type="button" onClick={() => handlePrevStep(3)} className="text-on-surface-variant hover:text-on-surface flex items-center gap-2 transition-colors">
                  <MdArrowBack className="text-sm" /> Back
                </button>
                <button
                  className="bg-primary text-on-primary hover:bg-primary-container px-8 py-3 rounded-lg font-label-md text-label-md transition-colors flex items-center gap-2 focus:ring-2 focus:ring-primary focus:outline-none shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  onClick={handleFinishSetup}
                  disabled={submitting || !displayName}
                >
                  {submitting ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Creating account…
                    </>
                  ) : (
                    <>
                      Finish setup <MdArrowForward className="text-sm" />
                    </>
                  )}
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
