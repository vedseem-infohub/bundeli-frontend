"use client";

import React from "react";
import { ShieldCheck, HeartHandshake, Sparkles, BookOpen } from "lucide-react";

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: ShieldCheck,
      title: "Authentic Artworks",
      description:
        "Every single masterpiece is certified with an archival Certificate of Provenance signed directly by the master creator.",
    },
    {
      icon: Sparkles,
      title: "Celebrating Indian Heritage",
      description:
        "Rooted in the royal fresco, miniature, and lost-wax bronze traditions of Bundelkhand that flourished for over four hundred years.",
    },
    {
      icon: HeartHandshake,
      title: "Supporting Artists & Artisans",
      description:
        "We operate on a transparent direct-to-artisan model, returning equitable proceeds to regional artisan clans and rural cooperatives.",
    },
    {
      icon: BookOpen,
      title: "Carefully Curated Collections",
      description:
        "Every piece is evaluated by cultural historians for aesthetic excellence, conservation quality, and living historical resonance.",
    },
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#F8F4EA] border-b border-[#B89555]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#682C2C] flex items-center justify-center gap-2">
            <span className="w-6 h-px bg-[#682C2C]" />
            THE GALLERY PROMISE
            <span className="w-6 h-px bg-[#682C2C]" />
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#292522]">
            Why Choose Bundeli Kalavrat
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-[#F4EFE6] border border-[#B89555]/20 rounded-sm hover:border-[#682C2C] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#682C2C]/10 border border-[#B89555]/40 flex items-center justify-center text-[#682C2C] mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#292522] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-xs text-[#292522]/70 leading-relaxed font-light">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
