"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { categories as defaultCategories } from "@/data/categories";
import { api, getImageUrl } from "@/lib/api";
import { ArrowRight } from "lucide-react";

export default function ExploreCategories() {
  const [categoriesList, setCategoriesList] = useState(defaultCategories);

  useEffect(() => {
    let isMounted = true;
    api.getCategories().then((backendCategories) => {
      if (isMounted && backendCategories && backendCategories.length > 0) {
        setCategoriesList(backendCategories);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-8 sm:py-12 lg:py-14 bg-[#FAF7F0] border-b border-[#B89555]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8">
          <div className="space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#292522]">
              Explore Artworks by Category
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4 md:mt-0">
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#682C2C] hover:text-[#B89555] transition-colors shrink-0 font-sans"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Full-Rounded Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-40 justify-items-center">
          {categoriesList.map((cat, idx) => {
            const catImg = getImageUrl(cat.image || cat);
            const artworkCount = cat.artworkCount || 0;

            return (
              <Link
                key={cat._id || cat.id || cat.slug || idx}
                href={`/shop?category=${cat.slug}`}
                className="group flex flex-col items-center text-center w-full max-w-[180px]"
              >
                {/* Full Rounded Circular Card Container */}
                <div className="relative aspect-square w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-40 lg:h-40 xl:w-55 xl:h-55 rounded-full p-1 border-2 border-[#B89555]/40 group-hover:border-[#682C2C] shadow-art group-hover:shadow-art-hover transition-all duration-500 bg-[#F8F4EA] group-hover:scale-105 group-hover:ring-4 group-hover:ring-[#B89555]/20 overflow-hidden cursor-pointer">
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    {/* Category Image with Zoom Effect */}
                    <img
                      src={catImg}
                      alt={cat.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-115"
                    />
                    {/* Luxury Cultural Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#292522]/85 via-[#292522]/45 to-[#292522]/20 group-hover:from-[#682C2C]/90 group-hover:via-[#682C2C]/50 transition-all duration-500" />

                    {/* Text inside the circular card */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center text-[#F8F4EA]">
                      <span className="text-[10px] font-sans uppercase tracking-widest text-[#B89555] font-semibold mb-0.5">
                        {artworkCount} Pieces
                      </span>
                      <h3 className="font-serif text-xs sm:text-sm font-bold text-[#F8F4EA] leading-tight px-1 drop-shadow-sm group-hover:text-white transition-colors line-clamp-2">
                        {cat.name}
                      </h3>
                      <span className="mt-1.5 text-[9px] uppercase tracking-wider font-sans font-semibold text-[#F8F4EA] px-2 py-0.5 bg-[#682C2C]/90 border border-[#B89555]/60 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                        Explore →
                      </span>
                    </div>
                  </div>
                </div>

                {/* Title & Count Label below the circle */}
                <span className="mt-3 font-serif text-sm sm:text-base font-bold text-[#292522] group-hover:text-[#682C2C] transition-colors leading-tight">
                  {cat.name}
                </span>
                <span className="text-[11px] font-sans text-[#72765A] mt-0.5">
                  {artworkCount} Artworks
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
