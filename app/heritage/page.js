"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Sparkles,
  HeartHandshake,
  ArrowRight,
  ChevronRight,
  Compass,
  Feather,
  CheckCircle2,
} from "lucide-react";

export default function HeritagePage() {
  return (
    <div className="bg-[#F8F4EA] min-h-screen">
      {/* Top Breadcrumb & Hero */}
      <div className="relative py-24 lg:py-36 bg-[#292522] text-[#F8F4EA] overflow-hidden border-b border-[#B89555]/30">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=2000&q=90"
            alt="Palace chhatris of Orchha at sunset"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#292522] via-[#292522]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <nav className="flex items-center gap-2 text-xs text-[#E9DFCD]/70 font-sans">
            <Link href="/" className="hover:text-[#B89555] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-[#B89555]" />
            <span className="text-[#B89555] font-semibold">Our Heritage</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <span className="inline-block px-3 py-1 bg-[#682C2C] text-[#F8F4EA] text-[10px] uppercase font-semibold tracking-widest rounded-xs border border-[#B89555]/40">
              CULTURAL LEGACY & PHILOSOPHY
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              The Soul and Sacred Geometry of Bundelkhand
            </h1>
            <p className="text-sm sm:text-base text-[#E9DFCD] font-light leading-relaxed">
              Between the boulder-strewn Vindhyan ridges and the sapphire bends of the Betwa lies an unbroken 400-year devotion to Indian art, courtly miniature painting, and lost-wax metal craftsmanship.
            </p>
          </div>
        </div>
      </div>

      {/* Main Story Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-24">
        {/* Section 1: The Inspiration Behind Bundeli Kalavrat */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#682C2C] flex items-center gap-2">
              <span className="w-6 h-px bg-[#682C2C]" />
              OUR INSPIRATION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#292522] leading-tight">
              A Sanctuary for Living Traditions
            </h2>
            <p className="text-sm text-[#292522]/80 leading-relaxed font-light">
              Bundeli Kalavrat was conceived in the shadow of Orchha's seventeenth-century Jahangir Mahal. Witnessing the exquisite frescoes of celestial assemblies and courtly rasas—and learning that the descendants of those court painters still live quietly in neighboring hamlets—we resolved to create a global stage for their mastery.
            </p>
            <p className="text-sm text-[#292522]/80 leading-relaxed font-light">
              Too often, traditional Indian art has been categorized merely as souvenir craft. Bundeli Kalavrat restores these works to their rightful status as fine art masterpieces worthy of the world's finest private collections and international museums.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-4/3 rounded-sm overflow-hidden shadow-2xl border-2 border-[#B89555]/30">
              <img
                src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=85"
                alt="Classical Bundeli fresco art"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Four Pillars of Cultural Heritage */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#682C2C]">
              THE CRADLES OF CREATIVITY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#292522]">
              The Four Historic Ateliers of Bundelkhand
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Orchha: Royal Frescoes",
                desc: "Palace vaults covered in narrative tempera, where almond-eyed deities dance upon golden lotus pedestals.",
                img: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=600&q=80",
              },
              {
                title: "Datia: Illuminated Miniatures",
                desc: "Braj poetry illustrated with micro-brushwork on vintage wasli paper and pure gold dust inlays.",
                img: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=600&q=80",
              },
              {
                title: "Chhatarpur: Sanjhi & Terracotta",
                desc: "Ken River clay wall reliefs and ceremonial folk peacocks sculpted to celebrate the monsoon rains.",
                img: "https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&w=600&q=80",
              },
              {
                title: "Khajuraho: Stone & Bronze",
                desc: "Lost-wax cast bell metal and sandstone relief capturing Chandela dynasty symmetry and sensuous grace.",
                img: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className="bg-[#F4EFE6] rounded-sm overflow-hidden border border-[#B89555]/20 shadow-art p-5 space-y-3"
              >
                <div className="aspect-4/3 rounded-xs overflow-hidden mb-3">
                  <img src={pillar.img} alt={pillar.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#292522]">{pillar.title}</h3>
                <p className="text-xs text-[#292522]/70 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Mission, Vision & Ethical Artisan Lineage */}
        <div className="bg-[#F4EFE6] border border-[#B89555]/30 rounded-sm p-8 sm:p-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#682C2C]">
                OUR MISSION
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#292522]">
                Preserving Master-Apprentice Knowledge
              </h3>
              <p className="text-xs sm:text-sm text-[#292522]/80 leading-relaxed font-light">
                Traditional Indian art is not learned in university lecture halls; it is transmitted through *guru-shishya parampara*—decades of disciplined listening, grinding pigments, and observing the master's breath control while drawing microscopic lines.
              </p>
              <p className="text-xs sm:text-sm text-[#292522]/80 leading-relaxed font-light">
                We directly fund apprenticeship stipends for young artisans in Bundelkhand villages, making traditional art a viable and prestigious lifelong vocation for future generations.
              </p>
            </div>

            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#682C2C]">
                OUR VISION
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#292522]">
                Heritage in the World's Living Spaces
              </h3>
              <p className="text-xs sm:text-sm text-[#292522]/80 leading-relaxed font-light">
                To position Bundelkhand art alongside Japanese ukiyo-e, Persian miniatures, and Italian Renaissance frescoes as one of humanity's pinnacle aesthetic achievements.
              </p>
              <div className="space-y-2 pt-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#72765A]" />
                  <span>Fair Trade & Over 70% direct artisan compensation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#72765A]" />
                  <span>Zero toxic synthetic chemicals; 100% natural mineral binders</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#72765A]" />
                  <span>Museum-certified provenance and physical tamper-proof seals</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center space-y-6 pt-4">
          <h3 className="font-serif text-3xl font-bold text-[#292522]">
            Begin Your Heritage Art Collection Today
          </h3>
          <p className="text-xs sm:text-sm text-[#292522]/70 max-w-lg mx-auto">
            Discover original frescoes, Sanjhi terracotta panels, and classical bronzes ready for insured nationwide delivery.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/shop"
              className="px-8 py-3.5 bg-[#682C2C] hover:bg-[#4A1B1B] text-[#F8F4EA] text-xs uppercase tracking-widest font-semibold rounded-sm shadow-md transition-colors"
            >
              Browse All Artworks
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 border border-[#682C2C] text-[#682C2C] hover:bg-[#682C2C] hover:text-[#F8F4EA] text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors"
            >
              Book Studio Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
