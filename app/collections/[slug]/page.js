"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { collections } from "@/data/collections";
import { artworks } from "@/data/artworks";
import ArtworkGrid from "@/components/artwork/ArtworkGrid";
import { ChevronRight, Sparkles, ArrowRight } from "lucide-react";

export default function CollectionDetailPage() {
  const params = useParams();
  const { slug } = params;

  const collection = collections.find((c) => c.slug === slug);

  const [sortBy, setSortBy] = useState("featured");

  if (!collection) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4">
        <h2 className="font-serif text-2xl font-bold text-[#292522]">Collection Not Found</h2>
        <Link
          href="/collections"
          className="mt-6 inline-block px-6 py-2.5 bg-[#682C2C] text-[#F8F4EA] text-xs uppercase tracking-widest font-semibold rounded-sm"
        >
          View All Collections
        </Link>
      </div>
    );
  }

  // Filter artworks by collection slug
  const collectionArtworks = artworks.filter((a) => a.collectionSlug === collection.slug);

  const sortedArtworks = [...collectionArtworks].sort((a, b) => {
    if (sortBy === "price-asc") return (a.price || 0) - (b.price || 0);
    if (sortBy === "price-desc") return (b.price || 0) - (a.price || 0);
    if (sortBy === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    return 0;
  });

  return (
    <div className="py-8 lg:py-14 bg-[#F8F4EA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-[#292522]/60 font-sans">
          <Link href="/" className="hover:text-[#682C2C] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#B89555]" />
          <Link href="/collections" className="hover:text-[#682C2C] transition-colors">
            Collections
          </Link>
          <ChevronRight className="w-3 h-3 text-[#B89555]" />
          <span className="text-[#682C2C] font-semibold">{collection.title}</span>
        </nav>

        {/* Hero Collection Presentation */}
        <div className="relative rounded-sm overflow-hidden shadow-2xl border border-[#B89555]/30">
          <div className="relative h-72 sm:h-96 w-full">
            <img
              src={collection.bannerImage}
              alt={collection.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#292522] via-[#292522]/70 to-[#292522]/30" />
          </div>

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 text-[#F8F4EA] space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#B89555] font-semibold">
              {collection.tagline}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F8F4EA] leading-tight">
              {collection.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#E9DFCD] max-w-2xl font-light leading-relaxed">
              {collection.description}
            </p>
          </div>
        </div>

        {/* Curator Statement Box */}
        <div className="p-6 sm:p-8 bg-[#F4EFE6] rounded-sm border-l-4 border-[#682C2C] space-y-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#682C2C] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#B89555]" />
            <span>Curator's Statement • {collection.curator}</span>
          </div>
          <p className="text-xs sm:text-sm text-[#292522]/80 leading-relaxed font-light italic">
            "{collection.story}"
          </p>
        </div>

        {/* Collection Artworks Header & Sort */}
        <div className="flex items-center justify-between border-b border-[#B89555]/20 pb-4">
          <span className="text-xs text-[#292522]/70">
            Showing all <strong className="text-[#682C2C]">{sortedArtworks.length}</strong> masterworks in this anthology
          </span>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#292522]/60">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 bg-[#F4EFE6] border border-[#B89555]/40 text-xs text-[#292522] rounded-xs font-serif"
            >
              <option value="featured">Curator Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        {/* Collection Artworks Grid */}
        <ArtworkGrid artworks={sortedArtworks} />
      </div>
    </div>
  );
}
