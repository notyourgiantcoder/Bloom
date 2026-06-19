"use client";

import { ReactNode } from "react";

interface AuthDemoPageProps {
  title: string;
  intro: string;
  steps: string[];
  children: ReactNode;
}

export function AuthDemoPage({ title, intro, steps, children }: AuthDemoPageProps) {
  return (
    <div className="min-h-screen bg-[#050f0b] text-slate-100 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
        <p className="text-slate-400 mb-8">{intro}</p>
        {steps.length > 0 && (
          <ol className="list-decimal list-inside text-sm text-slate-400 mb-8 space-y-1">
            {steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        )}
        <div className="space-y-8">{children}</div>
      </div>
    </div>
  );
}
