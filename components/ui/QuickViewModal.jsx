"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { getImageUrl } from "@/lib/api";
import { X, Heart, Eye, ShieldCheck, ArrowRight, Check, Sparkles } from "lucide-react";

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

export default function QuickViewModal() {
  const {
    quickViewArtwork,
    closeQuickView,
    isInWishlist,
    toggleWishlist,
    openEnquiry,
    redirectToWhatsApp,
    isSelected,
    toggleSelectArtwork,
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!quickViewArtwork) return null;

  const artwork = quickViewArtwork;
  const inWish = isInWishlist(artwork.id);
  const selected = isSelected(artwork.id);

  const handleCommissionWhatsApp = () => {
    closeQuickView();
    redirectToWhatsApp(artwork);
  };

  const handleEnquire = () => {
    closeQuickView();
    openEnquiry(artwork);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#292522]/80 backdrop-blur-sm"
        onClick={closeQuickView}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-4xl bg-[#F8F4EA] text-[#292522] rounded-sm shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row border border-[#B89555]/30">
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#F8F4EA]/80 hover:bg-[#F8F4EA] text-[#292522] hover:text-[#682C2C] shadow-sm transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Gallery */}
        <div className="w-full md:w-1/2 p-6 bg-[#F4EFE6] flex flex-col justify-between">
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-sm bg-[#E9DFCD] border border-[#B89555]/20 group">
            <img
              src={getImageUrl(artwork.images[activeImageIndex] || artwork.images[0])}
              alt={artwork.title}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            {artwork.isNew && (
              <span className="absolute top-3 left-3 bg-[#682C2C] text-[#F8F4EA] text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1">
                New Arrival
              </span>
            )}
            {artwork.isLimitedEdition && (
              <span className="absolute top-3 right-3 bg-[#B89555] text-[#292522] text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1">
                Limited Edition
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {artwork.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {artwork.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-14 h-16 rounded-sm overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx ? "border-[#682C2C]" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={getImageUrl(img)} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Artwork Information */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B89555] font-semibold">
                {artwork.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#292522] mt-1 leading-tight">
                {artwork.title}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-[#292522]/60">Created by</span>
                <Link
                  href={`/artists/${artwork.artistSlug}`}
                  onClick={closeQuickView}
                  className="text-xs font-serif font-medium text-[#682C2C] hover:underline"
                >
                  {artwork.artist}
                </Link>
              </div>
            </div>

            {/* Showcase Commission Status Box */}
            <div className="py-2.5 px-4 bg-[#F4EFE6] rounded-sm border border-[#B89555]/30 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-[#682C2C] font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#B89555]" />
                <span>Custom Creation on Demand</span>
              </div>
              <span className="text-[10px] text-[#72765A] font-medium uppercase tracking-wider">
                Orchha Heritage Atelier
              </span>
            </div>

            {/* Details Table */}
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs border-y border-[#B89555]/20 py-3">
              <div>
                <span className="text-[#292522]/60 block text-[11px]">Medium</span>
                <span className="font-medium text-[#292522]">{artwork.medium}</span>
              </div>
              <div>
                <span className="text-[#292522]/60 block text-[11px]">Showcase Dimensions</span>
                <span className="font-medium text-[#292522]">{artwork.dimensions}</span>
              </div>
              <div>
                <span className="text-[#292522]/60 block text-[11px]">Material</span>
                <span className="font-medium text-[#292522]">{artwork.material}</span>
              </div>
              <div>
                <span className="text-[#292522]/60 block text-[11px]">Orientation</span>
                <span className="font-medium text-[#292522]">{artwork.orientation}</span>
              </div>
            </div>

            <p className="text-xs text-[#292522]/75 leading-relaxed line-clamp-3">
              {artwork.description}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 space-y-3">
            <div className="flex gap-2">
              <button
                onClick={handleCommissionWhatsApp}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#1ebe57] text-[#0C381E] text-xs uppercase tracking-widest font-bold transition-colors rounded-sm shadow-md cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#0C381E]" />
                <span>Commission on WhatsApp</span>
              </button>

              <button
                onClick={() => toggleSelectArtwork(artwork)}
                className={`p-3 border rounded-sm transition-colors ${
                  selected
                    ? "border-[#25D366] bg-[#25D366]/10 text-[#0C381E]"
                    : "border-[#B89555]/40 hover:border-[#682C2C] text-[#292522]"
                }`}
                title={selected ? "Selected for commission" : "Select artwork"}
              >
                <Check className={`w-4 h-4 ${selected ? "text-[#25D366] stroke-[3]" : ""}`} />
              </button>

              <button
                onClick={() => toggleWishlist(artwork)}
                className={`p-3 border rounded-sm transition-colors ${
                  inWish
                    ? "border-[#682C2C] bg-[#682C2C]/10 text-[#682C2C]"
                    : "border-[#B89555]/40 hover:border-[#682C2C] text-[#292522]"
                }`}
                aria-label="Wishlist toggle"
              >
                <Heart className={`w-4 h-4 ${inWish ? "fill-current" : ""}`} />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <Link
                href={`/art/${artwork.slug}`}
                onClick={closeQuickView}
                className="text-[#682C2C] font-medium flex items-center gap-1 hover:underline"
              >
                <span>Full Artwork Details & Provenance</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="flex items-center gap-1 text-[#72765A] text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B89555]" /> Verified Certificate
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
