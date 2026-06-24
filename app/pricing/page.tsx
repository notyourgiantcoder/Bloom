"use client";
import { MdCheckCircle, MdRemove, MdCheck, MdAdd } from "react-icons/md";

import { useState } from "react";
import Link from "next/link";
import TopNavBar from "../components/layout/TopNavBar";
import Footer from "../components/layout/Footer";

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
        
        {/* Header Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight mb-stack-md">
            Invest in your creative journey.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg">
            Choose a plan that fits your growth. Cancel anytime. No hidden fees.
          </p>
          
          {/* Toggle Monthly / Yearly */}
          <div className="flex items-center justify-center gap-4">
            <span className={`font-label-md text-label-md transition-colors ${billingPeriod === "monthly" ? "text-on-surface font-bold" : "text-on-surface-variant"}`}>
              Monthly
            </span>
            <button 
              onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "yearly" : "monthly")}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-surface-variant transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              role="switch"
              aria-checked={billingPeriod === "yearly"}
            >
              <span className="sr-only">Toggle billing period</span>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-primary transition-transform ${billingPeriod === "yearly" ? "translate-x-6" : "translate-x-1"}`}></span>
            </button>
            <div className="flex items-center gap-2">
              <span className={`font-label-md text-label-md transition-colors ${billingPeriod === "yearly" ? "text-on-surface font-bold" : "text-on-surface-variant"}`}>
                Yearly
              </span>
              <span className="bg-secondary/15 text-secondary font-label-sm text-[11px] px-2 py-0.5 rounded-full border border-secondary/20 font-semibold">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards (Bento/Asymmetric Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter items-stretch mb-24 max-w-5xl mx-auto">
          
          {/* Free Plan */}
          <div className="bg-surface-variant/30 rounded-xl border border-outline-variant p-8 flex flex-col relative overflow-hidden transition-transform hover:-translate-y-1 duration-300 shadow-sm card-shadow">
            <div className="mb-stack-lg">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Free</h3>
              <p className="font-body-md text-sm text-on-surface-variant mb-6">Essential tools to start building your audience.</p>
              <div className="flex items-baseline gap-1">
                <span className="font-display-lg text-display-lg text-primary">₹{currentPrices.free}</span>
                <span className="font-body-md text-sm text-on-surface-variant">/mo</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-stack-lg flex-grow">
              <li className="flex items-start gap-3">
                <MdCheckCircle className="text-secondary text-[20px]" />
                <span className="font-body-md text-sm text-on-surface">Up to 3 active projects</span>
              </li>
              <li className="flex items-start gap-3">
                <MdCheckCircle className="text-secondary text-[20px]" />
                <span className="font-body-md text-sm text-on-surface">Basic analytics dashboard</span>
              </li>
              <li className="flex items-start gap-3">
                <MdCheckCircle className="text-secondary text-[20px]" />
                <span className="font-body-md text-sm text-on-surface">Community support access</span>
              </li>
            </ul>
            
            <Link href="/sign-in" className="w-full bg-transparent border border-outline text-primary font-label-md text-label-sm py-3 rounded-lg hover:bg-surface-variant transition-colors mt-auto text-center block font-semibold">
              Get Started
            </Link>
          </div>

          {/* Creator Pro Plan */}
          <div className="bg-surface-container-lowest rounded-xl border-2 border-primary shadow-md p-8 flex flex-col relative overflow-hidden transform md:-translate-y-4 transition-transform hover:-translate-y-5 duration-300 z-10 card-shadow">
            <div className="absolute top-0 right-0 bg-primary text-on-primary font-label-sm text-[10px] px-3 py-1 rounded-bl-lg uppercase tracking-wider font-semibold">
              Most Popular
            </div>
            <div className="mb-stack-lg">
              <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Creator Pro</h3>
              <p className="font-body-md text-sm text-on-surface-variant mb-6">Advanced features for growing creators.</p>
              <div className="flex items-baseline gap-1">
                <span className="font-display-lg text-display-lg text-primary">₹{currentPrices.pro}</span>
                <span className="font-body-md text-sm text-on-surface-variant">/mo</span>
              </div>
              <p className="font-label-sm text-[11px] text-outline mt-1 font-mono">
                {billingPeriod === "yearly" ? `Billed annually (₹${currentPrices.pro * 12}/yr)` : "Billed monthly"}
              </p>
            </div>
            
            <ul className="space-y-4 mb-stack-lg flex-grow">
              <li className="flex items-start gap-3">
                <MdCheckCircle className="text-primary text-[20px]" />
                <span className="font-body-md text-sm text-on-surface font-medium">Unlimited projects</span>
              </li>
              <li className="flex items-start gap-3">
                <MdCheckCircle className="text-primary text-[20px]" />
                <span className="font-body-md text-sm text-on-surface">Advanced audience analytics</span>
              </li>
              <li className="flex items-start gap-3">
                <MdCheckCircle className="text-primary text-[20px]" />
                <span className="font-body-md text-sm text-on-surface">Custom domain integration</span>
              </li>
              <li className="flex items-start gap-3">
                <MdCheckCircle className="text-primary text-[20px]" />
                <span className="font-body-md text-sm text-on-surface">Priority email support</span>
              </li>
            </ul>
            
            <Link href="/sign-in" className="w-full bg-primary text-on-primary font-label-md text-label-sm py-3 rounded-lg hover:bg-primary-container transition-colors mt-auto text-center block font-semibold shadow-sm">
              Upgrade to Pro
            </Link>
          </div>

          {/* MediLab Pro Plan */}
          <div className="bg-tertiary-fixed/30 rounded-xl border border-tertiary/20 p-8 flex flex-col relative overflow-hidden transition-transform hover:-translate-y-1 duration-300 shadow-sm card-shadow">
            <div className="mb-stack-lg">
              <h3 className="font-headline-sm text-headline-sm text-tertiary-container mb-2">MediLab Pro</h3>
              <p className="font-body-md text-sm text-on-surface-variant mb-6">Full suite for serious medical educators.</p>
              <div className="flex items-baseline gap-1">
                <span className="font-display-lg text-display-lg text-primary">₹{currentPrices.medilab}</span>
                <span className="font-body-md text-sm text-on-surface-variant">/mo</span>
              </div>
              <p className="font-label-sm text-[11px] text-outline mt-1 font-mono">
                {billingPeriod === "yearly" ? `Billed annually (₹${currentPrices.medilab * 12}/yr)` : "Billed monthly"}
              </p>
            </div>
            
            <ul className="space-y-4 mb-stack-lg flex-grow">
              <li className="flex items-start gap-3">
                <MdCheckCircle className="text-tertiary-container text-[20px]" />
                <span className="font-body-md text-sm text-on-surface font-medium">Everything in Creator Pro</span>
              </li>
              <li className="flex items-start gap-3">
                <MdCheckCircle className="text-tertiary-container text-[20px]" />
                <span className="font-body-md text-sm text-on-surface">Full AI Studio Access</span>
              </li>
              <li className="flex items-start gap-3">
                <MdCheckCircle className="text-tertiary-container text-[20px]" />
                <span className="font-body-md text-sm text-on-surface">White-labeled courses</span>
              </li>
              <li className="flex items-start gap-3">
                <MdCheckCircle className="text-tertiary-container text-[20px]" />
                <span className="font-body-md text-sm text-on-surface">Dedicated success manager</span>
              </li>
            </ul>
            
            <Link href="/sign-in" className="w-full bg-tertiary-container text-on-primary font-label-md text-label-sm py-3 rounded-lg hover:bg-tertiary opacity-90 transition-opacity mt-auto text-center block font-semibold shadow-sm">
              Contact Sales
            </Link>
          </div>

        </div>

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
