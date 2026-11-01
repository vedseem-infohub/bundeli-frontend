"use client";

import React from "react";
import Link from "next/link";
import { collections } from "@/data/collections";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FeaturedCollections() {
  const heroCol = collections[0]; // The Bundelkhand Heritage Collection
  const folkCol = collections[1]; // Colours of Indian Folk Art
  const sacredCol = collections[2]; // Sacred Stories
  const natureCol = collections[3]; // Nature and Rural Life
  const contemporaryCol = collections[4]; // Contemporary Expressions

  return (
    <section className="py-8 sm:py-12 lg:py-14 bg-[#F8F4EA] border-b border-[#B89555]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#682C2C] flex items-center justify-center gap-2">
            <span className="w-6 h-px bg-[#682C2C]" />
            EXCEPTIONAL ANTHOLOGIES
            <span className="w-6 h-px bg-[#682C2C]" />
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#292522]">
            Curated For Art Lovers
          </h2>
          <p className="text-xs sm:text-sm text-[#292522]/70 leading-relaxed font-light">
            Assembled by our resident cultural historians, each collection explores a thematic convergence of architecture, mythology, and regional folklore.
          </p>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Main Hero Card (Large 7 columns) */}
          <div className="lg:col-span-7">
            <Link
              href={`/collections/${heroCol.slug}`}
              className="group relative block w-full h-full min-h-[460px] sm:min-h-[520px] rounded-sm overflow-hidden shadow-2xl border border-[#B89555]/30"
            >
              <img
                src={heroCol.bannerImage}
                alt={heroCol.title}
                className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#292522]/90 via-[#292522]/40 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 text-[#F8F4EA] space-y-3">
                <span className="inline-block px-3 py-1 bg-[#682C2C] text-[#F8F4EA] text-[10px] uppercase font-semibold tracking-widest rounded-xs">
                  Premier Anthology • {heroCol.artworkCount} Works
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight group-hover:text-[#B89555] transition-colors">
                  {heroCol.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#E9DFCD]/90 font-light max-w-lg leading-relaxed line-clamp-2">
                  {heroCol.story}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B89555] group-hover:underline">
                  <span>Explore Heritage Collection</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          </div>

          {/* Right Column (5 columns): Two stacked cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
            {/* Folk Col */}
            <Link
              href={`/collections/${folkCol.slug}`}
              className="group relative block w-full h-[250px] rounded-sm overflow-hidden shadow-lg border border-[#B89555]/30 flex-1"
            >
              <img
                src={folkCol.coverImage}
                alt={folkCol.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#292522]/85 via-[#292522]/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-[#F8F4EA] space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-[#B89555] font-semibold">
                  Living Rituals • {folkCol.artworkCount} Pieces
                </span>
                <h4 className="font-serif text-xl font-bold group-hover:text-[#B89555] transition-colors">
                  {folkCol.title}
                </h4>
                <p className="text-[11px] text-[#E9DFCD]/80 line-clamp-1">
                  {folkCol.tagline}
                </p>
              </div>
            </Link>

            {/* Sacred Col */}
            <Link
              href={`/collections/${sacredCol.slug}`}
              className="group relative block w-full h-[250px] rounded-sm overflow-hidden shadow-lg border border-[#B89555]/30 flex-1"
            >
              <img
                src={sacredCol.coverImage}
                alt={sacredCol.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#292522]/85 via-[#292522]/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-[#F8F4EA] space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-[#B89555] font-semibold">
                  Cosmic Order • {sacredCol.artworkCount} Works
                </span>
                <h4 className="font-serif text-xl font-bold group-hover:text-[#B89555] transition-colors">
                  {sacredCol.title}
                </h4>
                <p className="text-[11px] text-[#E9DFCD]/80 line-clamp-1">
                  {sacredCol.tagline}
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom Dual Editorial Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-6 lg:mt-8">
          <Link
            href={`/collections/${natureCol.slug}`}
            className="group relative block w-full h-[240px] rounded-sm overflow-hidden shadow-md border border-[#B89555]/20"
          >
            <img
              src={natureCol.bannerImage}
              alt={natureCol.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#292522]/90 via-[#292522]/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-[#F8F4EA]">
              <span className="text-[10px] uppercase tracking-widest text-[#B89555]">
                {natureCol.artworkCount} Artworks
              </span>
              <h4 className="font-serif text-xl font-bold mt-1 group-hover:text-[#B89555] transition-colors">
                {natureCol.title}
              </h4>
              <p className="text-xs text-[#E9DFCD]/80 mt-1 line-clamp-1">
                {natureCol.description}
              </p>
            </div>
          </Link>

          <Link
            href={`/collections/${contemporaryCol.slug}`}
            className="group relative block w-full h-[240px] rounded-sm overflow-hidden shadow-md border border-[#B89555]/20"
          >
            <img
              src={contemporaryCol.bannerImage}
              alt={contemporaryCol.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#292522]/90 via-[#292522]/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-[#F8F4EA]">
              <span className="text-[10px] uppercase tracking-widest text-[#B89555]">
                {contemporaryCol.artworkCount} Artworks
              </span>
              <h4 className="font-serif text-xl font-bold mt-1 group-hover:text-[#B89555] transition-colors">
                {contemporaryCol.title}
              </h4>
              <p className="text-xs text-[#E9DFCD]/80 mt-1 line-clamp-1">
                {contemporaryCol.description}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
