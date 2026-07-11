"use client";
import { MdCheckCircle, MdRemove, MdCheck, MdAdd } from "react-icons/md";

import { useState } from "react";
import Link from "next/link";
import TopNavBar from "../components/layout/TopNavBar";
import Footer from "../components/layout/Footer";
import PricingSection from "../components/landing/PricingSection";

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const monthlyPrices = {
    free: 0,
    pro: 999,
    medilab: 2499
  };

  const yearlyPrices = {
    free: 0,
    pro: 799,
    medilab: 1999
  };

  const currentPrices = billingPeriod === "monthly" ? monthlyPrices : yearlyPrices;

  return (
    <div className="bg-surface-container-lowest text-on-surface font-body-md min-h-screen flex flex-col relative overflow-x-hidden selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Background Pulse */}
      <div 
        className="absolute w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(17,71,70,0.15)_0%,rgba(70,103,41,0.05)_50%,transparent_70%)] rounded-full blur-[40px] z-0 pointer-events-none top-[10%] left-[20%]"
        style={{ animation: 'bloom-pulse 4s linear ease-in-out infinite alternate' }}
      ></div>

      <TopNavBar />

      {/* Main Container */}
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg z-10 relative">
        
        {/* Replaced with PricingSection */}
        <PricingSection />

        {/* Feature Comparison Table */}
        <div className="mb-24 overflow-x-auto max-w-5xl mx-auto">
          <h2 className="font-headline-sm text-headline-sm text-primary text-center mb-stack-lg">Compare Features</h2>
          <div className="min-w-[800px] border border-outline-variant rounded-xl overflow-hidden bg-surface-container-lowest shadow-sm card-shadow">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-variant/40 border-b border-outline-variant/50">
                  <th className="p-4 font-label-md text-label-md text-on-surface-variant w-1/3">Feature</th>
                  <th className="p-4 font-label-md text-label-md text-on-surface-variant text-center w-2/9">Free</th>
                  <th className="p-4 font-label-md text-label-md text-primary font-bold text-center w-2/9 bg-primary/5">Creator Pro</th>
                  <th className="p-4 font-label-md text-label-md text-tertiary-container font-bold text-center w-2/9 bg-tertiary-fixed/10">MediLab Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30 text-sm">
                <tr className="hover:bg-surface/30 transition-colors">
                  <td className="p-4 font-body-md text-on-surface">Active Projects</td>
                  <td className="p-4 text-center font-body-md text-on-surface-variant">3</td>
                  <td className="p-4 text-center font-body-md text-on-surface bg-primary/5">Unlimited</td>
                  <td className="p-4 text-center font-body-md text-on-surface bg-tertiary-fixed/10">Unlimited</td>
                </tr>
                <tr className="hover:bg-surface/30 transition-colors">
                  <td className="p-4 font-body-md text-on-surface">Analytics</td>
                  <td className="p-4 text-center font-body-md text-on-surface-variant">Basic</td>
                  <td className="p-4 text-center font-body-md text-on-surface bg-primary/5">Advanced</td>
                  <td className="p-4 text-center font-body-md text-on-surface bg-tertiary-fixed/10">Advanced + Export</td>
                </tr>
                <tr className="hover:bg-surface/30 transition-colors">
                  <td className="p-4 font-body-md text-on-surface">AI Studio Access</td>
                  <td className="p-4 text-center text-outline-variant"><MdRemove className="inline-block text-[18px]" /></td>
                  <td className="p-4 text-center text-outline-variant bg-primary/5"><MdRemove className="inline-block text-[18px]" /></td>
                  <td className="p-4 text-center text-tertiary-container bg-tertiary-fixed/10"><MdCheck className="inline-block text-[20px] text-secondary" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-24">
          <h2 className="font-headline-sm text-headline-sm text-center mb-stack-lg">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-b border-outline-variant pb-4">
              <button 
                onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
                className="w-full flex justify-between items-center text-left focus:outline-none"
              >
                <span className="font-label-md text-label-md text-on-surface">Can I switch plans later?</span>
                {openFaq === 0 ? <MdRemove className="text-outline" /> : <MdAdd className="text-outline" />}
              </button>
              {openFaq === 0 && (
                <div className="mt-2 font-body-md text-body-md text-on-surface-variant">
                  Yes, you can upgrade or downgrade your plan at any time. Prorated charges will be applied automatically.
                </div>
              )}
            </div>
            <div className="border-b border-outline-variant pb-4">
              <button 
                onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                className="w-full flex justify-between items-center text-left focus:outline-none"
              >
                <span className="font-label-md text-label-md text-on-surface">What payment methods do you accept?</span>
                {openFaq === 1 ? <MdRemove className="text-outline" /> : <MdAdd className="text-outline" />}
              </button>
              {openFaq === 1 && (
                <div className="mt-2 font-body-md text-body-md text-on-surface-variant">
                  We accept all major credit cards, UPI, and net banking options available in India.
                </div>
              )}
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
