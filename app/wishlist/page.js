"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Heart, Trash2, ArrowRight, ChevronRight, Sparkles, Check } from "lucide-react";

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

export default function WishlistPage() {
  const { wishlist, toggleWishlist, redirectToWhatsApp, selectArtwork, isSelected } = useApp();

  return (
    <div className="py-10 lg:py-16 bg-[#F8F4EA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-[#292522]/60 font-sans">
          <Link href="/" className="hover:text-[#682C2C] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#B89555]" />
          <span className="text-[#682C2C] font-semibold">Curated Wishlist</span>
        </nav>

        {/* Page Header */}
        <div className="border-b border-[#B89555]/30 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#682C2C]">
              SAVED SHOWCASE PIECES
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#292522] mt-1">
              Your Saved Masterpieces ({wishlist.length})
            </h1>
          </div>
          <Link
            href="/shop"
            className="text-xs font-semibold uppercase tracking-wider text-[#682C2C] hover:text-[#B89555] transition-colors flex items-center gap-1"
          >
            <span>Continue Art Exploration</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Wishlist Items List or Empty State */}
        {wishlist.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto space-y-5 bg-[#F4EFE6] p-8 rounded-sm border border-[#B89555]/20 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#E9DFCD] flex items-center justify-center mx-auto text-[#682C2C]">
              <Heart className="w-8 h-8 stroke-1" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#292522]">
                Your Wishlist is Empty
              </h3>
              <p className="text-xs text-[#292522]/70 mt-2 leading-relaxed">
                Save the Bundelkhand frescoes, Sanjhi terracotta reliefs, or temple bronzes you love while browsing our showcase to revisit or commission them anytime.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#682C2C] text-[#F8F4EA] text-xs uppercase tracking-widest font-semibold hover:bg-[#4A1B1B] transition-colors rounded-sm shadow-md"
            >
              <span>Explore All Artworks</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((artwork) => {
              const selected = isSelected(artwork.id);
              return (
                <div
                  key={artwork.id}
                  className="group flex flex-col bg-[#F4EFE6] border border-[#B89555]/25 rounded-sm overflow-hidden shadow-art hover:shadow-art-hover transition-all justify-between"
                >
                  <div>
                    <div className="relative aspect-4/5 w-full overflow-hidden bg-[#E9DFCD]">
                      <Link href={`/art/${artwork.slug}`}>
                        <img
                          src={artwork.images[0]}
                          alt={artwork.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                      <button
                        onClick={() => toggleWishlist(artwork)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-[#F8F4EA]/90 text-[#682C2C] hover:bg-[#682C2C] hover:text-[#F8F4EA] transition-colors shadow-sm"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-4 space-y-1.5">
                      <span className="text-[10px] uppercase tracking-wider text-[#B89555] font-semibold">
                        {artwork.category}
                      </span>
                      <h3 className="font-serif text-base font-bold text-[#292522] line-clamp-1 hover:text-[#682C2C]">
                        <Link href={`/art/${artwork.slug}`}>{artwork.title}</Link>
                      </h3>
                      <p className="text-xs text-[#72765A]">{artwork.artist}</p>
                      <p className="text-[11px] text-[#292522]/60 italic line-clamp-1">
                        {artwork.medium}
                      </p>
                      <p className="text-[10px] text-[#292522]/50">
                        {artwork.dimensions}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0 space-y-2">
                    <button
                      onClick={() => redirectToWhatsApp(artwork)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#25D366] hover:bg-[#1ebe57] text-[#0C381E] text-xs uppercase tracking-widest font-bold transition-colors rounded-xs shadow-xs cursor-pointer"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>Artworks on WhatsApp</span>
                    </button>
                    <button
                      onClick={() => selectArtwork(artwork)}
                      className={`w-full py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-xs border transition-colors flex items-center justify-center gap-1.5 ${selected
                          ? "border-[#25D366] text-[#0C381E] bg-[#25D366]/10"
                          : "border-[#B89555]/40 text-[#682C2C] hover:bg-[#B89555]/10"
                        }`}
                    >
                      {selected && <Check className="w-3.5 h-3.5 text-[#25D366]" />}
                      <span>{selected ? "Selected for Commission" : "+ Add to Selection"}</span>
                    </button>
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
