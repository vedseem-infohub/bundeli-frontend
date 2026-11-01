"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function StorytellingBanner() {
  return (
    <section className="relative py-28 lg:py-36 bg-[#292522] text-[#F8F4EA] overflow-hidden border-b border-[#B89555]/30">
      {/* Background Photography with atmospheric overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=2000&q=90"
          alt="Ancient Orchha palace chhatris at twilight"
          className="w-full h-full object-cover object-center opacity-30 transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#292522] via-[#292522]/90 to-[#292522]/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-8 h-px bg-[#B89555]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#B89555] font-semibold">
              AN UNBROKEN DEVOTION
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F8F4EA] leading-[1.15]">
            Preserving Heritage. <br />
            Inspiring Generations.
          </h2>

          <p className="text-sm sm:text-base text-[#E9DFCD] leading-relaxed font-light max-w-2xl">
            In the fresco-covered chambers of Orchha and the quiet courtyards of Chhatarpur, traditional Indian art was never mass-produced. Each creation is an unrepeatable dialogue between the artisan's spirit, sacred Vedic treatises, and pigments ground patiently from raw earth and lapis lazuli.
          </p>

          <p className="text-xs sm:text-sm text-[#E9DFCD]/80 leading-relaxed max-w-2xl">
            When you bring a Bundeli Kalavrat piece into your home, you are not merely decorating a wall—you are providing dignified livelihood to generational artisan families and securing ancient knowledge systems for the next century.
          </p>

          <div className="pt-4 flex flex-wrap gap-4 items-center">
            <Link
              href="/heritage"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#B89555] hover:bg-[#D4AF67] text-[#292522] text-xs uppercase tracking-widest font-bold transition-all rounded-sm shadow-xl hover:translate-y-[-2px]"
            >
              <span>Explore Our Heritage</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/journal"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#F8F4EA]/30 hover:border-[#B89555] text-[#F8F4EA] text-xs uppercase tracking-widest font-semibold transition-colors rounded-sm"
            >
              <span>Read The Artisans' Chronicles</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
