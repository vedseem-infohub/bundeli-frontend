"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { artworks as defaultArtworks } from "@/data/artworks";
import { categories as defaultCategories } from "@/data/categories";
import { api } from "@/lib/api";
import ArtworkCard from "@/components/artwork/ArtworkCard";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export default function ExploreArtworks() {
  const [activeTab, setActiveTab] = useState("all");
  const [artworksList, setArtworksList] = useState(defaultArtworks);
  const [categoriesList, setCategoriesList] = useState(defaultCategories);

  // Fetch live artworks and categories from backend
  useEffect(() => {
    let isMounted = true;
    Promise.all([api.getArtworks(), api.getCategories()]).then(
      ([backendArtworks, backendCategories]) => {
        if (!isMounted) return;
        if (backendArtworks && backendArtworks.length > 0) {
          setArtworksList(backendArtworks);
        }
        if (backendCategories && backendCategories.length > 0) {
          setCategoriesList(backendCategories);
        }
      }
    );
    return () => {
      isMounted = false;
    };
  }, []);

  // Tab definitions
  const tabs = useMemo(() => {
    return [
      { id: "all", label: "All Masterpieces", slug: "", count: artworksList.length },
      ...categoriesList.map((c) => ({
        id: c.slug,
        label: c.name,
        slug: c.slug,
        count: artworksList.filter(
          (a) => a.categorySlug === c.slug || (a.category && a.category.toLowerCase() === c.name.toLowerCase())
        ).length,
      })),
    ];
  }, [artworksList, categoriesList]);

  // Filter artworks based on active tab - exactly 4 cards in one line
  const displayedArtworks = useMemo(() => {
    if (activeTab === "all") {
      return artworksList.slice(0, 4);
    }
    const filtered = artworksList.filter(
      (a) =>
        a.categorySlug === activeTab ||
        (a.category && a.category.toLowerCase() === activeTab.toLowerCase())
    );
    return filtered.slice(0, 4);
  }, [activeTab, artworksList]);

  const currentTabObj = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section className="py-16 sm:py-24 bg-[#F8F4EA] border-b border-[#B89555]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
          <div className="space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#292522]">
              Explore Masterpiece Artworks
            </h2>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#682C2C] hover:text-[#B89555] border-b border-[#682C2C] pb-1 transition-colors mt-4 md:mt-0 group shrink-0 font-sans"
          >
            <span>View Full Gallery ({artworksList.length})</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* Filter Discipline Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-10 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-sans font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 border cursor-pointer ${
                  isActive
                    ? "bg-[#682C2C] text-[#F8F4EA] border-[#682C2C] shadow-md ring-2 ring-[#B89555]/30"
                    : "bg-[#FAF7F0] text-[#292522]/80 border-[#B89555]/30 hover:border-[#682C2C] hover:text-[#682C2C]"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive
                      ? "bg-[#B89555] text-[#292522] font-bold"
                      : "bg-[#E9DFCD] text-[#72765A]"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Artworks Grid - Exactly 4 cards in one line */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {displayedArtworks.map((artwork, idx) => (
            <ArtworkCard
              key={artwork._id || artwork.id || artwork.slug || idx}
              artwork={artwork}
            />
          ))}
        </div>

        {/* Empty state safeguard */}
        {displayedArtworks.length === 0 && (
          <div className="text-center py-16 bg-[#FAF7F0] border border-[#B89555]/20 rounded-sm p-8">
            <Sparkles className="w-8 h-8 text-[#B89555] mx-auto mb-3" />
            <p className="font-serif text-lg text-[#292522] font-bold">
              No artworks currently found in this discipline.
            </p>
            <p className="font-sans text-xs text-[#72765A] mt-1 mb-4">
              Our curators are constantly accessioning new works from Orchha ateliers.
            </p>
            <button
              onClick={() => setActiveTab("all")}
              className="px-5 py-2 bg-[#682C2C] text-[#F8F4EA] text-xs font-sans uppercase tracking-wider font-semibold rounded-xs"
            >
              Browse All Artworks
            </button>
          </div>
        )}

        {/* Section Bottom Bar / CTA */}
        <div className="mt-12 pt-8 border-t border-[#B89555]/20 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FAF7F0] p-6 rounded-sm border border-[#B89555]/25 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#682C2C] text-[#B89555] flex items-center justify-center border border-[#B89555]/50 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-serif font-bold text-sm sm:text-base text-[#292522]">
                Certified Provenance with Every Acquisition
              </p>
              <p className="font-sans text-xs text-[#72765A]">
                Each artwork includes an archival physical legal certificate stamped by master Bundelkhand artists.
              </p>
            </div>
          </div>

          <Link
            href={activeTab === "all" ? "/shop" : `/shop?category=${activeTab}`}
            className="w-full sm:w-auto text-center px-6 py-3 bg-[#682C2C] hover:bg-[#4A1B1B] text-[#F8F4EA] font-sans text-xs font-semibold uppercase tracking-widest rounded-xs border border-[#B89555]/50 transition-all shadow-md shrink-0 flex items-center justify-center gap-2"
          >
            <span>
              Explore All {activeTab === "all" ? "Artworks" : currentTabObj.label} ({currentTabObj.count})
            </span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
