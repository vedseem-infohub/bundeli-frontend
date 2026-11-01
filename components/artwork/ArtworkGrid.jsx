"use client";

import React from "react";
import ArtworkCard from "./ArtworkCard";
import { Palette, RotateCcw } from "lucide-react";

export default function ArtworkGrid({ artworks, onResetFilters }) {
  if (!artworks || artworks.length === 0) {
    return (
      <div className="py-20 px-4 text-center bg-[#F4EFE6] rounded-sm border border-[#B89555]/20 max-w-2xl mx-auto my-8">
        <Palette className="w-12 h-12 text-[#B89555] mx-auto mb-3 stroke-1" />
        <h3 className="font-serif text-xl font-bold text-[#292522]">
          No artworks match your refined filter selection
        </h3>
        <p className="text-xs text-[#292522]/70 mt-2 max-w-md mx-auto leading-relaxed">
          We have a growing archive of Bundelkhand frescoes, Sanjhi reliefs, and classical bronzes. Try adjusting your price bracket, category, or orientation.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-[#682C2C] text-[#F8F4EA] text-xs uppercase tracking-widest font-semibold hover:bg-[#4A1B1B] transition-colors rounded-sm shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {artworks.map((artwork, idx) => (
        <ArtworkCard key={artwork._id || artwork.id || idx} artwork={artwork} />
      ))}
    </div>
  );
}
