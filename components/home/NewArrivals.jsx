"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { artworks as defaultArtworks } from "@/data/artworks";
import { api } from "@/lib/api";
import ArtworkCard from "@/components/artwork/ArtworkCard";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export default function NewArrivals() {
  const [newArrivalsList, setNewArrivalsList] = useState(
    defaultArtworks.filter((a) => a.isNew)
  );
  const scrollRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    api.getNewArrivals().then((backendArrivals) => {
      if (isMounted && backendArrivals && backendArrivals.length > 0) {
        setNewArrivalsList(backendArrivals);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-[#F4EFE6] border-b border-[#B89555]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#682C2C] flex items-center gap-2">
              <span className="w-6 h-px bg-[#682C2C]" />
              FRESH FROM REGIONAL ATELIERS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#292522]">
              New Arrivals
            </h2>
            <p className="text-xs sm:text-sm text-[#292522]/70 font-light">
              Recently completed original creations from master studios across Central India.
            </p>
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link
              href="/shop?sort=newest"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#682C2C] hover:text-[#B89555] border-b border-[#682C2C] pb-1 transition-colors"
            >
              <span>View All New Arrivals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Scroll Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-1.5 ml-2">
              <button
                onClick={() => scroll("left")}
                className="p-2 rounded-full border border-[#B89555]/40 hover:border-[#682C2C] text-[#292522] hover:text-[#682C2C] bg-[#F8F4EA] transition-colors shadow-sm cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-2 rounded-full border border-[#B89555]/40 hover:border-[#682C2C] text-[#292522] hover:text-[#682C2C] bg-[#F8F4EA] transition-colors shadow-sm cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth"
        >
          {newArrivalsList.map((artwork, idx) => (
            <div
              key={artwork._id || artwork.id || idx}
              className="w-[280px] sm:w-[320px] shrink-0"
            >
              <ArtworkCard artwork={artwork} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
