"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { artworks as defaultArtworks } from "@/data/artworks";
import { api } from "@/lib/api";
import ArtworkCard from "@/components/artwork/ArtworkCard";
import { ArrowRight } from "lucide-react";

export default function TrendingArtworks() {
  const [artworksList, setArtworksList] = useState(defaultArtworks);

  useEffect(() => {
    let isMounted = true;
    api.getArtworks().then((backendArtworks) => {
      if (isMounted && backendArtworks && backendArtworks.length > 0) {
        setArtworksList(backendArtworks);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const trendingList = artworksList.filter((a) => a.isFeatured).slice(0, 8);
  const displayList = trendingList.length > 0 ? trendingList : artworksList.slice(0, 8);

  return (
    <section className="py-20 lg:py-28 bg-[#F4EFE6] border-b border-[#B89555]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#682C2C] flex items-center gap-2">
              <span className="w-6 h-px bg-[#682C2C]" />
              COLLECTOR FAVORITES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#292522]">
              Discover Exceptional Artworks
            </h2>
            <p className="text-xs sm:text-sm text-[#292522]/70 font-light mt-1">
              A selection of artworks loved by our collectors.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#682C2C] hover:text-[#B89555] border-b border-[#682C2C] pb-1 transition-colors mt-4 md:mt-0 group shrink-0"
          >
            <span>View All Exceptional Artworks ({artworksList.length})</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* 4 products per row on desktop, 2 on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayList.map((artwork, idx) => (
            <ArtworkCard key={artwork._id || artwork.id || idx} artwork={artwork} />
          ))}
        </div>
      </div>
    </section>
  );
}
