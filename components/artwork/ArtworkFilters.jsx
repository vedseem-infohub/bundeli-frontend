"use client";

import React, { useState } from "react";
import { categories } from "@/data/categories";
import { artists } from "@/data/artists";
import { X, RotateCcw, ChevronDown, Filter } from "lucide-react";

export default function ArtworkFilters({
  filters,
  setFilters,
  resetFilters,
  totalResults,
  isMobileDrawer = false,
  onCloseMobile,
}) {
  const [openSections, setOpenSections] = useState({
    categories: true,
    styles: true,
    price: true,
    artists: false,
    medium: false,
    size: false,
    orientation: false,
    availability: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const stylesList = [
    "Bundelkhand Royal Fresco",
    "Bundeli Sanjhi & Terracotta",
    "Bundelkhand Court Miniature",
    "Classical Chandela Revival",
    "Pardhan Gond Tribal Narrative",
    "Contemporary Indian Expressions",
    "Datia Illuminated Miniature",
    "Tikamgarh Bell Metal Dhokra",
    "Architectural Heritage Study",
  ];

  const mediumsList = [
    "Natural Mineral Pigments & 24K Gold Leaf",
    "Ken River Silt Clay & Natural Earth Dyes",
    "Stone Tempera & Silver Foil Inlay",
    "Lost-Wax Cast Bronze with Antique Verdigris Patina",
    "Natural Indigo, Tree Gum & Acrylic on Canvas",
    "Oil & Mineral Pigment on Linen",
    "Hand-chiseled Vindhyan Sandstone",
    "Archival Giclée Pigment Print on Cotton Rag",
  ];

  const priceRanges = [
    { label: "Under ₹25,000", min: 0, max: 25000 },
    { label: "₹25,000 - ₹50,000", min: 25000, max: 50000 },
    { label: "₹50,000 - ₹1,00,000", min: 50000, max: 100000 },
    { label: "Above ₹1,00,000", min: 100000, max: 9999999 },
  ];

  const orientations = ["Portrait", "Landscape", "Square"];
  const sizes = ["Small", "Medium", "Large"];

  const handleCategoryToggle = (slug) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === slug ? "" : slug,
    }));
  };

  const handleStyleToggle = (style) => {
    setFilters((prev) => {
      const exists = prev.styles.includes(style);
      return {
        ...prev,
        styles: exists ? prev.styles.filter((s) => s !== style) : [...prev.styles, style],
      };
    });
  };

  const handleArtistToggle = (slug) => {
    setFilters((prev) => ({
      ...prev,
      artist: prev.artist === slug ? "" : slug,
    }));
  };

  const handlePriceRangeToggle = (min, max) => {
    setFilters((prev) => {
      if (prev.minPrice === min && prev.maxPrice === max) {
        return { ...prev, minPrice: null, maxPrice: null };
      }
      return { ...prev, minPrice: min, maxPrice: max };
    });
  };

  const handleOrientationToggle = (ori) => {
    setFilters((prev) => ({
      ...prev,
      orientation: prev.orientation === ori ? "" : ori,
    }));
  };

  const handleSizeToggle = (size) => {
    setFilters((prev) => ({
      ...prev,
      size: prev.size === size ? "" : size,
    }));
  };

  const handleAvailabilityToggle = (avail) => {
    setFilters((prev) => ({
      ...prev,
      availability: prev.availability === avail ? "" : avail,
    }));
  };

  const activeFiltersCount =
    (filters.category ? 1 : 0) +
    filters.styles.length +
    (filters.artist ? 1 : 0) +
    (filters.minPrice !== null ? 1 : 0) +
    (filters.orientation ? 1 : 0) +
    (filters.size ? 1 : 0) +
    (filters.availability ? 1 : 0) +
    (filters.search ? 1 : 0);

  return (
    <div className="space-y-6">
      {/* Filters Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#B89555]/30">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#682C2C]" />
          <h3 className="font-serif text-base font-bold text-[#292522]">
            Curator Filters
          </h3>
          {activeFiltersCount > 0 && (
            <span className="bg-[#682C2C] text-[#F8F4EA] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>

        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs text-[#682C2C] hover:underline"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Active Filter Tags */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-1.5 pb-2">
          {filters.category && (
            <span className="inline-flex items-center gap-1 text-[11px] bg-[#E9DFCD] text-[#292522] px-2 py-0.5 rounded-xs">
              Category: {categories.find((c) => c.slug === filters.category)?.name || filters.category}
              <button onClick={() => handleCategoryToggle(filters.category)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.styles.map((s) => (
            <span key={s} className="inline-flex items-center gap-1 text-[11px] bg-[#E9DFCD] text-[#292522] px-2 py-0.5 rounded-xs">
              {s}
              <button onClick={() => handleStyleToggle(s)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {filters.artist && (
            <span className="inline-flex items-center gap-1 text-[11px] bg-[#E9DFCD] text-[#292522] px-2 py-0.5 rounded-xs">
              Artist: {artists.find((a) => a.slug === filters.artist)?.name || filters.artist}
              <button onClick={() => handleArtistToggle(filters.artist)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.orientation && (
            <span className="inline-flex items-center gap-1 text-[11px] bg-[#E9DFCD] text-[#292522] px-2 py-0.5 rounded-xs">
              {filters.orientation}
              <button onClick={() => handleOrientationToggle(filters.orientation)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.size && (
            <span className="inline-flex items-center gap-1 text-[11px] bg-[#E9DFCD] text-[#292522] px-2 py-0.5 rounded-xs">
              Size: {filters.size}
              <button onClick={() => handleSizeToggle(filters.size)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* 1. Category Filter Section */}
      <div className="border-b border-[#B89555]/20 pb-4">
        <button
          onClick={() => toggleSection("categories")}
          className="w-full flex items-center justify-between text-xs uppercase tracking-widest font-semibold text-[#292522] py-1"
        >
          <span>Categories</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#B89555] transition-transform ${openSections.categories ? "rotate-180" : ""}`}
          />
        </button>
        {openSections.categories && (
          <div className="mt-3 space-y-2">
            {categories.map((cat, idx) => (
              <label
                key={cat._id || cat.id || cat.slug || idx}
                className="flex items-center justify-between text-xs text-[#292522]/80 hover:text-[#682C2C] cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="categoryFilter"
                    checked={filters.category === cat.slug}
                    onChange={() => handleCategoryToggle(cat.slug)}
                    className="accent-[#682C2C]"
                  />
                  <span>{cat.name}</span>
                </div>
                <span className="text-[10px] text-[#72765A]">({cat.artworkCount})</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 2. Art Style Filter Section */}
      <div className="border-b border-[#B89555]/20 pb-4">
        <button
          onClick={() => toggleSection("styles")}
          className="w-full flex items-center justify-between text-xs uppercase tracking-widest font-semibold text-[#292522] py-1"
        >
          <span>Art Traditions & Style</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#B89555] transition-transform ${openSections.styles ? "rotate-180" : ""}`}
          />
        </button>
        {openSections.styles && (
          <div className="mt-3 space-y-2">
            {stylesList.map((style) => (
              <label
                key={style}
                className="flex items-center gap-2 text-xs text-[#292522]/80 hover:text-[#682C2C] cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.styles.includes(style)}
                  onChange={() => handleStyleToggle(style)}
                  className="accent-[#682C2C] rounded-xs"
                />
                <span className="line-clamp-1">{style}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 3. Medium & Substrates Section */}
      <div className="border-b border-[#B89555]/20 pb-4">
        <button
          onClick={() => toggleSection("medium")}
          className="w-full flex items-center justify-between text-xs uppercase tracking-widest font-semibold text-[#292522] py-1"
        >
          <span>Medium & Pigments</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#B89555] transition-transform ${openSections.medium ? "rotate-180" : ""}`}
          />
        </button>
        {openSections.medium && (
          <div className="mt-3 space-y-2">
            {mediumsList.map((med) => (
              <div
                key={med}
                className="text-[11px] text-[#292522]/80 flex items-center gap-1.5 py-0.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89555]" />
                <span className="line-clamp-1">{med}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Artists Section */}
      <div className="border-b border-[#B89555]/20 pb-4">
        <button
          onClick={() => toggleSection("artists")}
          className="w-full flex items-center justify-between text-xs uppercase tracking-widest font-semibold text-[#292522] py-1"
        >
          <span>Master Artists</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#B89555] transition-transform ${openSections.artists ? "rotate-180" : ""}`}
          />
        </button>
        {openSections.artists && (
          <div className="mt-3 space-y-2">
            {artists.map((artist) => (
              <label
                key={artist.id}
                className="flex items-center justify-between text-xs text-[#292522]/80 hover:text-[#682C2C] cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="artistFilter"
                    checked={filters.artist === artist.slug}
                    onChange={() => handleArtistToggle(artist.slug)}
                    className="accent-[#682C2C]"
                  />
                  <span>{artist.name}</span>
                </div>
                <span className="text-[10px] text-[#72765A]">({artist.artworkCount})</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 5. Orientation & Size Section */}
      <div className="border-b border-[#B89555]/20 pb-4">
        <button
          onClick={() => toggleSection("orientation")}
          className="w-full flex items-center justify-between text-xs uppercase tracking-widest font-semibold text-[#292522] py-1"
        >
          <span>Orientation & Size</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#B89555] transition-transform ${openSections.orientation ? "rotate-180" : ""}`}
          />
        </button>
        {openSections.orientation && (
          <div className="mt-3 space-y-3">
            <div>
              <span className="text-[11px] text-[#72765A] block mb-1.5 font-medium">Orientation</span>
              <div className="flex gap-2">
                {orientations.map((ori) => (
                  <button
                    key={ori}
                    type="button"
                    onClick={() => handleOrientationToggle(ori)}
                    className={`px-3 py-1 text-xs border rounded-xs transition-colors ${
                      filters.orientation === ori
                        ? "border-[#682C2C] bg-[#682C2C] text-[#F8F4EA]"
                        : "border-[#B89555]/40 text-[#292522] hover:border-[#682C2C]"
                    }`}
                  >
                    {ori}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[11px] text-[#72765A] block mb-1.5 font-medium">Artwork Size</span>
              <div className="flex gap-2">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => handleSizeToggle(sz)}
                    className={`px-3 py-1 text-xs border rounded-xs transition-colors ${
                      filters.size === sz
                        ? "border-[#682C2C] bg-[#682C2C] text-[#F8F4EA]"
                        : "border-[#B89555]/40 text-[#292522] hover:border-[#682C2C]"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 6. Availability */}
      <div className="pb-2">
        <button
          onClick={() => toggleSection("availability")}
          className="w-full flex items-center justify-between text-xs uppercase tracking-widest font-semibold text-[#292522] py-1"
        >
          <span>Availability</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#B89555] transition-transform ${openSections.availability ? "rotate-180" : ""}`}
          />
        </button>
        {openSections.availability && (
          <div className="mt-3 space-y-2">
            {["In Stock", "Price on Request"].map((avail) => (
              <label
                key={avail}
                className="flex items-center gap-2 text-xs text-[#292522]/80 hover:text-[#682C2C] cursor-pointer"
              >
                <input
                  type="radio"
                  name="availabilityFilter"
                  checked={filters.availability === avail}
                  onChange={() => handleAvailabilityToggle(avail)}
                  className="accent-[#682C2C]"
                />
                <span>{avail}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {isMobileDrawer && (
        <div className="pt-4 border-t border-[#B89555]/30">
          <button
            onClick={onCloseMobile}
            className="w-full py-3 bg-[#682C2C] text-[#F8F4EA] text-xs uppercase tracking-widest font-semibold rounded-sm shadow-md"
          >
            Show {totalResults} Artworks
          </button>
        </div>
      )}
    </div>
  );
}
