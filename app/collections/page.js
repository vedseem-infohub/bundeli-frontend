"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { api, getImageUrl } from "@/lib/api";
import { ArrowRight, ChevronRight, Sparkles, Loader2 } from "lucide-react";

export default function CollectionsPage() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadCollections() {
      try {
        setLoading(true);
        const data = await api.getCollections();
        if (isMounted) {
          setCollections(data || []);
        }
      } catch (err) {
        console.error("Error loading collections:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadCollections();
    return () => {
      isMounted = false;
    };
  }, []);

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
            Each collection is thoughtfully assembled to illuminate a unique facet of Central India&apos;s artistic legacy—from sacred palace murals to river folklore and architectural geometry.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-[#682C2C]">
            <Loader2 className="w-8 h-8 animate-spin mb-3 text-[#B89555]" />
            <p className="font-serif text-sm tracking-widest text-[#292522]/70 uppercase">
              Curating Royal Anthologies...
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && collections.length === 0 && (
          <div className="text-center py-20 bg-[#F4EFE6] border border-[#B89555]/30 rounded-sm p-8">
            <Sparkles className="w-8 h-8 text-[#B89555] mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-[#292522]">No Collections Available</h3>
            <p className="text-xs text-[#292522]/70 mt-2 max-w-md mx-auto">
              Our curators are currently preparing new heritage anthologies. Check back soon or browse all available artworks in the gallery.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-[#682C2C] text-[#F8F4EA] text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-[#4A1B1B] transition-colors"
            >
              <span>Explore Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Collections Stacked List */}
        {!loading && collections.length > 0 && (
          <div className="space-y-12">
            {collections.map((col, index) => {
              const isReversed = index % 2 === 1;

              return (
                <div
                  key={col.id || col.slug}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#F4EFE6] border border-[#B89555]/25 rounded-sm p-6 sm:p-8 shadow-art hover:border-[#682C2C] transition-all duration-300"
                >
                  {/* Image */}
                  <div
                    className={`lg:col-span-6 relative aspect-16/10 rounded-sm overflow-hidden shadow-lg border border-[#B89555]/30 ${
                      isReversed ? "lg:order-2" : ""
                    }`}
                  >
                    <img
                      src={getImageUrl(col.bannerImage || col.coverImage)}
                      alt={col.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 bg-[#682C2C] text-[#F8F4EA] text-[10px] uppercase font-semibold tracking-wider px-3 py-1">
                      {col.artworkCount} Curated {col.artworkCount === 1 ? "Piece" : "Pieces"}
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
                        {col.tagline || "Heritage Collection"}
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#292522] mt-1">
                        {col.title}
                      </h2>
                    </div>

                    <p className="text-xs sm:text-sm text-[#292522]/80 leading-relaxed font-light">
                      {col.description}
                    </p>

                    {col.story && (
                      <p className="text-xs text-[#292522]/70 leading-relaxed italic">
                        &ldquo;{col.story}&rdquo;
                      </p>
                    )}

                    {col.curator && (
                      <div className="pt-2">
                        <span className="text-[11px] text-[#72765A] block italic">
                          Curated by {col.curator}
                        </span>
                      </div>
                    )}

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
        )}
      </div>
    </div>
  );
}
