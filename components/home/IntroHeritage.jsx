"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Compass, Feather, Sparkles } from "lucide-react";

export default function IntroHeritage() {
  return (
    <section className="py-20 lg:py-28 bg-[#F8F4EA] border-b border-[#B89555]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Cultural Image Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/5 w-full rounded-sm overflow-hidden shadow-2xl border-2 border-[#B89555]/30">
              <img
                src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85"
                alt="Master artisan painting Bundelkhand miniature"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#292522]/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-[#F8F4EA]">
                <span className="text-[10px] uppercase tracking-widest text-[#B89555] font-semibold">
                  Atelier Spotlight • Orchha
                </span>
                <p className="font-serif text-sm italic mt-1 text-[#E9DFCD]">
                  "Each brushstroke carries the pulse of centuries, ground from mineral stones and consecrated by tradition."
                </p>
              </div>
            </div>

            {/* Overlapping Decorative Badge */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-[#682C2C] text-[#F8F4EA] p-5 sm:p-6 rounded-sm shadow-xl border border-[#B89555] max-w-[240px] hidden sm:block">
              <span className="text-3xl font-serif font-bold text-[#B89555] block">
                400+
              </span>
              <p className="text-xs uppercase tracking-wider text-[#E9DFCD] mt-1 font-medium leading-snug">
                Years of Unbroken Bundelkhand Painting & Sculptural Traditions
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#682C2C] flex items-center gap-2">
                <span className="w-6 h-px bg-[#682C2C]" />
                OUR CULTURAL LEGACY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#292522] leading-tight">
                Celebrating the Art, Soul and Heritage of Bundelkhand
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#292522]/80 leading-relaxed font-light">
              Nestled between the rugged granite ranges of the Vindhyas and the meandering sacred waters of the Betwa, Bundelkhand has fostered an artistic renaissance since the medieval reign of the Chandela and Bundela kings. Here, art was not merely royal patronage—it was a sacred prayer rendered in crushed mineral pigment, lost-wax bell metal, and sun-baked river clay.
            </p>

            <p className="text-sm text-[#292522]/75 leading-relaxed">
              Bundeli Kalavrat was founded to preserve these endangered classical masterworks. We bridge generations of reclusive master artisans in Tikamgarh, Chhatarpur, Datia, and Orchha directly with international collectors and interior architects, ensuring that every piece remains authentically handcrafted, ethical, and immortal.
            </p>

            {/* Cultural highlights */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3 bg-[#F4EFE6] border-l-2 border-[#B89555] rounded-xs">
                <h4 className="font-serif text-sm font-bold text-[#292522]">Pure Wasli & Mineral Pigment</h4>
                <p className="text-[11px] text-[#292522]/65 mt-0.5">Sourced from lapis, malachite, and gold leaf</p>
              </div>
              <div className="p-3 bg-[#F4EFE6] border-l-2 border-[#B89555] rounded-xs">
                <h4 className="font-serif text-sm font-bold text-[#292522]">Direct Artisan Lineage</h4>
                <p className="text-[11px] text-[#292522]/65 mt-0.5">Over 70% revenue directly honors our creators</p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/heritage"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#682C2C] border-b-2 border-[#682C2C] pb-1 hover:text-[#B89555] hover:border-[#B89555] transition-colors group"
              >
                <span>Explore Our Story & Preservation Mission</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
