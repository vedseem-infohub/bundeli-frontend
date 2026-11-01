"use client";

import React from "react";
import Link from "next/link";
import { collections } from "@/data/collections";
import { ArrowRight, Sparkles, ChevronRight } from "lucide-react";

export default function CollectionsPage() {
  return (
    <div className="py-10 lg:py-16 bg-[#F8F4EA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-[#292522]/60 font-sans">
          <Link href="/" className="hover:text-[#682C2C] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#B89555]" />
          <span className="text-[#682C2C] font-semibold">Collections</span>
        </nav>

        {/* Page Header */}
        <div className="border-b border-[#B89555]/30 pb-8">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#682C2C]">
            CURATED ANTHOLOGIES
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#292522] mt-2">
            Thematic Heritage Collections
          </h1>
          <p className="text-xs sm:text-sm text-[#292522]/75 max-w-2xl mt-3 leading-relaxed font-light">
            Each collection is thoughtfully assembled to illuminate a unique facet of Central India's artistic legacy—from sacred palace murals to river folklore and architectural geometry.
          </p>
        </div>

        {/* Collections Stacked List */}
        <div className="space-y-12">
          {collections.map((col, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={col.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#F4EFE6] border border-[#B89555]/25 rounded-sm p-6 sm:p-8 shadow-art hover:border-[#682C2C] transition-all duration-300"
              >
                {/* Image */}
                <div
                  className={`lg:col-span-6 relative aspect-16/10 rounded-sm overflow-hidden shadow-lg border border-[#B89555]/30 ${
                    isReversed ? "lg:order-2" : ""
                  }`}
                >
                  <img
                    src={col.bannerImage}
                    alt={col.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-[#682C2C] text-[#F8F4EA] text-[10px] uppercase font-semibold tracking-wider px-3 py-1">
                    {col.artworkCount} Curated Pieces
                  </span>
                </div>

                {/* Text Content */}
                <div
                  className={`lg:col-span-6 space-y-4 ${
                    isReversed ? "lg:order-1" : ""
                  }`}
                >
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#B89555] font-semibold">
                      {col.tagline}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#292522] mt-1">
                      {col.title}
                    </h2>
                  </div>

                  <p className="text-xs sm:text-sm text-[#292522]/80 leading-relaxed font-light">
                    {col.description}
                  </p>

                  <p className="text-xs text-[#292522]/70 leading-relaxed">
                    {col.story}
                  </p>

                  <div className="pt-2">
                    <span className="text-[11px] text-[#72765A] block italic">
                      Curated by {col.curator}
                    </span>
                  </div>

                  <div className="pt-3">
                    <Link
                      href={`/collections/${col.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#682C2C] hover:bg-[#4A1B1B] text-[#F8F4EA] text-xs uppercase tracking-widest font-semibold rounded-sm shadow-md transition-colors"
                    >
                      <span>Explore Collection Works</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
