"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Heart, Eye, Check, Sparkles } from "lucide-react";
import { getImageUrl } from "@/lib/api";

// Crisp WhatsApp SVG Icon
function WhatsAppIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ArtworkCard({ artwork }) {
  const {
    isInWishlist,
    toggleWishlist,
    openQuickView,
    redirectToWhatsApp,
    isSelected,
    toggleSelectArtwork,
  } = useApp();

  const [isHovered, setIsHovered] = useState(false);
  const artId = artwork._id || artwork.id;
  const inWish = isInWishlist(artId);
  const selected = isSelected(artId);

  const hasSecondaryImage = artwork.images && artwork.images.length > 1;
  const rawImage = isHovered && hasSecondaryImage ? artwork.images[1] : (artwork.images && artwork.images[0]) || artwork.image;
  const currentImage = getImageUrl(rawImage);

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(artwork);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(artwork);
  };

  // Direct selection that redirects straight to WhatsApp
  const handleCommissionWhatsApp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    redirectToWhatsApp(artwork);
  };

  // Multi-select toggle for combining multiple artworks
  const handleToggleSelect = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSelectArtwork(artwork);
  };

  return (
    <div
      className={`group relative flex flex-col bg-[#F8F4EA] border transition-all duration-300 rounded-sm overflow-hidden shadow-art hover:shadow-art-hover ${
        selected ? "border-[#25D366] ring-1 ring-[#25D366]/40" : "border-[#B89555]/20 hover:border-[#B89555]/80"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Artwork Image Container */}
      <div className="relative aspect-3/4 w-full overflow-hidden bg-[#E9DFCD]">
        <Link href={`/art/${artwork.slug}`} className="block w-full h-full">
          <img
            src={currentImage}
            alt={artwork.title}
            className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          <span className="bg-[#682C2C] text-[#F8F4EA] text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 shadow-sm">
            Showcase Original
          </span>
          {artwork.isNew && (
            <span className="bg-[#B89555] text-[#292522] text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 shadow-sm">
              New Atelier Arrival
            </span>
          )}
        </div>

        {/* Top Right Action Controls: Wishlist & Selection Checkbox */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
          {/* Select Toggle Button */}
          <button
            onClick={handleToggleSelect}
            className={`p-1.5 rounded-full transition-all duration-200 shadow-sm flex items-center justify-center ${
              selected
                ? "bg-[#25D366] text-white"
                : "bg-[#F8F4EA]/90 text-[#292522] hover:text-[#25D366] hover:bg-[#F8F4EA]"
            }`}
            aria-label={selected ? "Selected for commission" : "Select artwork"}
            title={selected ? "Selected for commission" : "Select artwork"}
          >
            <Check className={`w-3.5 h-3.5 ${selected ? "stroke-[3]" : "stroke-[1.5]"}`} />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={`p-1.5 rounded-full transition-all duration-200 shadow-sm ${
              inWish
                ? "bg-[#682C2C] text-[#F8F4EA]"
                : "bg-[#F8F4EA]/90 text-[#292522] hover:text-[#682C2C] hover:bg-[#F8F4EA]"
            }`}
            aria-label={inWish ? "Remove from saved works" : "Save to works"}
            title={inWish ? "Remove from saved works" : "Save to works"}
          >
            <Heart className={`w-3.5 h-3.5 ${inWish ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Quick View Button Hover Overlay on Desktop */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#292522]/85 via-[#292522]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center gap-2 z-10">
          <button
            onClick={handleQuickView}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-[#F8F4EA]/95 hover:bg-[#F8F4EA] text-[#292522] text-[11px] font-semibold uppercase tracking-wider rounded-xs shadow-md transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#682C2C]" />
            <span>Quick View</span>
          </button>
          <button
            onClick={handleCommissionWhatsApp}
            className="flex items-center gap-1.5 py-2 px-3 bg-[#1ebe57] hover:bg-[#169c47] text-white text-[11px] font-bold uppercase tracking-wider rounded-xs shadow-md transition-colors"
            title="Commission artwork on WhatsApp"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Information Container */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Discipline */}
          <div className="flex items-center justify-between text-[10px] text-[#72765A] uppercase tracking-wider mb-1">
            <span className="font-medium">{artwork.category}</span>
            <span>{artwork.orientation}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-sm sm:text-base font-bold text-[#292522] group-hover:text-[#682C2C] transition-colors leading-snug line-clamp-1">
            <Link href={`/art/${artwork.slug}`}>{artwork.title}</Link>
          </h3>

          {/* Artist Link */}
          <p className="text-xs text-[#292522]/70 mt-1 line-clamp-1">
            Style of{" "}
            <Link
              href={`/artists/${artwork.artistSlug}`}
              className="text-[#682C2C] hover:underline font-serif font-medium"
            >
              {artwork.artist}
            </Link>
          </p>

          {/* Medium and dimensions */}
          <p className="text-[11px] text-[#292522]/60 mt-1 line-clamp-1 italic">
            {artwork.medium}
          </p>
          <p className="text-[10px] text-[#292522]/50 mt-0.5">
            Dimensions: {artwork.dimensions}
          </p>
        </div>

        {/* Commission CTA (Showcase only, no price tag selling) */}
        <div className="pt-3 mt-3 border-t border-[#B89555]/20 flex flex-col gap-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#682C2C] font-semibold flex items-center gap-1 text-[10px] uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-[#B89555]" />
              Custom Creation
            </span>
            <span className="text-[10px] text-[#72765A]">Orchha Atelier</span>
          </div>

          {/* Prominent Action Button: Redirects directly to WhatsApp */}
          <button
            onClick={handleCommissionWhatsApp}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#25D366] hover:bg-[#1ebe57] text-[#0C381E] font-bold text-xs uppercase tracking-wider rounded-xs transition-all shadow-xs hover:shadow-md cursor-pointer"
            aria-label={`Commission ${artwork.title} on WhatsApp`}
          >
            <WhatsAppIcon className="w-4 h-4 text-[#0C381E]" />
            <span>Commission on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
