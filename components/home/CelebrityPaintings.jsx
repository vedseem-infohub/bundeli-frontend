"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { api, getImageUrl } from "@/lib/api";
import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Star,
  ExternalLink,
} from "lucide-react";

export default function CelebrityPaintings() {
  const { openEnquiry } = useApp();
  const [celebritiesList, setCelebritiesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    api
      .getCelebrityPaintings()
      .then((backendCelebrities) => {
        if (isMounted) {
          setCelebritiesList(backendCelebrities || []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  if (!loading && celebritiesList.length === 0) {
    return null;
  }

  const handleEnquiry = (item) => {
    openEnquiry({
      id: item._id || item.id,
      title: `Bespoke Celebrity Commission Similar to: ${item.artworkTitle}`,
      artist: item.artist,
      medium: item.medium,
      isPriceOnRequest: true,
      price: null,
      images: [getImageUrl(item.image || item)],
    });
  };

  return (
    <section className="py-8 sm:py-12 lg:py-14 bg-[#F8F4EA] border-b border-[#B89555]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8">
          <div className="space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#292522]">
              Paintings Sold to Celebrated Patrons
            </h2>
          </div>

          <Link
            href="/contact?subject=celebrity-commission"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#682C2C] hover:text-[#B89555] border-b border-[#682C2C] pb-1 transition-colors mt-4 md:mt-0 group shrink-0 font-sans"
          >
            <span>Artwork a Celebrity-Grade Masterpiece</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* Celebrity Acquisitions Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {celebritiesList.map((item, idx) => {
            const itemImg = getImageUrl(item.image || item);
            return (
              <div
                key={item._id || item.id || idx}
                className="group flex flex-col bg-[#FAF7F0] border border-[#B89555]/30 rounded-sm overflow-hidden shadow-art hover:shadow-art-hover transition-all duration-500 hover:-translate-y-1"
              >
                {/* Artwork Image Container */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-[#E9DFCD]">
                  <img
                    src={itemImg}
                    alt={item.artworkTitle}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#292522]/85 via-[#292522]/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#682C2C]/90 backdrop-blur-xs text-[#F8F4EA] text-[10px] font-sans uppercase tracking-wider font-semibold rounded-xs border border-[#B89555]/40 shadow-xs">
                      <Star className="w-3 h-3 text-[#B89555] fill-[#B89555]" />
                      {item.tag || "Bespoke Royal Acquisition"}
                    </span>
                    <span className="text-[10px] font-mono text-[#F8F4EA]/90 bg-[#292522]/80 backdrop-blur-xs px-2 py-0.5 rounded-xs border border-white/10">
                      {item.year || "2024"}
                    </span>
                  </div>

                  {/* Bottom Overlay Label inside image */}
                  <div className="absolute bottom-3 left-3 right-3 text-[#F8F4EA]">
                    <p className="text-[10px] font-sans uppercase tracking-widest text-[#B89555] font-semibold">
                      Acquired Artwork
                    </p>
                    <p className="font-serif text-sm sm:text-base font-bold text-white drop-shadow-sm truncate">
                      {item.artworkTitle}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Celebrity Patron Header */}
                    <div className="border-b border-[#B89555]/15 pb-3">
                      <span className="text-[10px] uppercase tracking-widest font-sans font-semibold text-[#682C2C] block">
                        Prominent Connoisseur
                      </span>
                      <h3 className="font-serif text-xl font-bold text-[#292522] mt-0.5 leading-snug group-hover:text-[#682C2C] transition-colors">
                        {item.celebrityName}
                      </h3>
                      <p className="text-xs font-sans text-[#72765A] mt-0.5">
                        {item.celebrityTitle} • <span className="text-[#292522]/60">{item.location}</span>
                      </p>
                    </div>

                    {/* Patron Quote */}
                    {item.quote && (
                      <div className="mt-3 relative pl-3 border-l-2 border-[#B89555]">
                        <p className="font-serif italic text-xs sm:text-[13px] text-[#292522]/85 leading-relaxed">
                          “{item.quote}”
                        </p>
                      </div>
                    )}

                    {/* Artwork Technical Specs */}
                    <div className="mt-4 pt-3 border-t border-[#B89555]/15 space-y-1.5 text-xs font-sans">
                      <div className="flex items-center justify-between text-[#72765A]">
                        <span>Master Artist:</span>
                        <span className="font-medium text-[#292522]">{item.artist}</span>
                      </div>
                      <div className="flex items-center justify-between text-[#72765A]">
                        <span>Dimensions:</span>
                        <span className="font-medium text-[#292522]">{item.dimensions || "Bespoke Royal Scale"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Commission Call to Action */}
                  <div className="pt-2">
                    <button
                      onClick={() => handleEnquiry(item)}
                      className="w-full py-2.5 px-4 bg-[#682C2C] hover:bg-[#522222] text-[#F8F4EA] text-xs font-sans font-semibold uppercase tracking-wider rounded-xs border border-[#B89555]/40 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#B89555]" />
                      <span>Request Similar Artworks</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
