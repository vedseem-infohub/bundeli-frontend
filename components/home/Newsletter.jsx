"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";

export default function Newsletter() {
  const { addToast } = useApp();
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please provide a valid email format");
      return;
    }

    setError("");
    setIsSuccess(true);
    addToast("Welcome to the Bundeli Kalavrat collector circle!");
  };

  return (
    <section className="py-20 lg:py-24 bg-[#682C2C] text-[#F8F4EA] relative overflow-hidden">
      {/* Subtle cultural motif background */}
      <div className="absolute inset-0 opacity-10 bg-radial from-[#B89555] to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#B89555]/20 border border-[#B89555]/40 rounded-full text-[11px] uppercase tracking-widest text-[#B89555] font-semibold">
          <Mail className="w-3.5 h-3.5" />
          <span>Curator Invitations</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F8F4EA]">
          Stay Connected With Art and Heritage
        </h2>

        <p className="text-xs sm:text-base text-[#E9DFCD] max-w-xl mx-auto leading-relaxed font-light">
          Receive updates about new collections, featured artists and inspiring stories.
        </p>

        {isSuccess ? (
          <div className="p-6 bg-[#F8F4EA] text-[#292522] rounded-sm max-w-md mx-auto shadow-2xl animate-in zoom-in-95 duration-200">
            <CheckCircle2 className="w-10 h-10 text-[#72765A] mx-auto mb-2" />
            <h4 className="font-serif text-lg font-bold text-[#682C2C]">
              You Are Subscribed
            </h4>
            <p className="text-xs text-[#292522]/70 mt-1">
              Thank you for supporting traditional Indian art. Private previews of upcoming palace collections will arrive in your inbox.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto space-y-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-[#F8F4EA] text-[#292522] placeholder-[#292522]/50 text-xs rounded-sm focus:outline-none focus:ring-2 focus:ring-[#B89555]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#B89555] hover:bg-[#D4AF67] text-[#292522] text-xs uppercase tracking-widest font-bold rounded-sm transition-colors shadow-lg flex items-center justify-center gap-1.5"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            {error && <p className="text-xs text-[#F8F4EA] bg-[#B65D42]/80 py-1 px-2 rounded-xs">{error}</p>}
            <p className="text-[11px] text-[#E9DFCD]/60 pt-1">
              We respect your privacy. No spam, only rare art discoveries. Unsubscribe at any time.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
