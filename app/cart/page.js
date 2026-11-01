"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import {
  Trash2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Palette,
  MessageSquare,
} from "lucide-react";

// Crisp WhatsApp SVG Icon
function WhatsAppIcon({ className = "w-5 h-5" }) {
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

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    clearCart,
    redirectToWhatsApp,
    redirectSelectedToWhatsApp,
  } = useApp();

  const [customNotes, setCustomNotes] = useState("");

  const handleSendToWhatsApp = () => {
    redirectSelectedToWhatsApp({ customNotes });
  };

  return (
    <div className="py-10 lg:py-16 bg-[#F8F4EA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-[#292522]/60 font-sans">
          <Link href="/" className="hover:text-[#682C2C] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#B89555]" />
          <span className="text-[#682C2C] font-semibold">Selected Artworks for Commission</span>
        </nav>

        {/* Page Title */}
        <div className="border-b border-[#B89555]/30 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#682C2C]">
              ATELIER SHOWCASE & COMMISSION SELECTIONS
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#292522] mt-1">
              Your Selected Artworks ({cart.length})
            </h1>
          </div>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-[#682C2C] hover:underline uppercase tracking-wider font-semibold self-start sm:self-auto cursor-pointer"
            >
              Clear All Selections
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto space-y-5 bg-[#F4EFE6] p-8 rounded-sm border border-[#B89555]/20 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#E9DFCD] flex items-center justify-center mx-auto text-[#682C2C]">
              <Palette className="w-8 h-8 stroke-1" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#292522]">
                No Artworks Selected Yet
              </h3>
              <p className="text-xs text-[#292522]/70 mt-2 leading-relaxed">
                Bundeli Kalavrat is an authentic showcase portfolio. Select the paintings, murals, or sculptures you would like our master artisans to create, and connect directly with us on WhatsApp.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#682C2C] text-[#F8F4EA] text-xs uppercase tracking-widest font-semibold hover:bg-[#4A1B1B] transition-colors rounded-sm shadow-md"
            >
              <span>Explore Art Showcase</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Selected Items (8 Cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Atelier notice */}
              <div className="p-4 bg-[#F4EFE6] rounded-sm border border-[#B89555]/30 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#72765A] font-semibold">
                  <Sparkles className="w-4 h-4 text-[#B89555]" />
                  <span>Direct Artisan Handcraft Guarantee</span>
                </div>
                <p className="text-[11px] text-[#292522]/70 leading-relaxed">
                  Every piece is individually created on commission using natural mineral pigments, raw earth binders, and handmade wasli paper in our Orchha and Chhatarpur craft clusters.
                </p>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.artwork.id}
                    className="flex flex-col sm:flex-row gap-5 p-5 bg-[#F4EFE6] border border-[#B89555]/25 rounded-sm items-start sm:items-center justify-between shadow-xs"
                  >
                    <div className="flex gap-4 items-center">
                      <img
                        src={item.artwork.images[0]}
                        alt={item.artwork.title}
                        className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-sm border border-[#B89555]/30 shrink-0"
                      />
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-wider text-[#B89555] font-semibold">
                          {item.artwork.category}
                        </span>
                        <h3 className="font-serif text-base font-bold text-[#292522]">
                          <Link href={`/art/${item.artwork.slug}`} className="hover:text-[#682C2C]">
                            {item.artwork.title}
                          </Link>
                        </h3>
                        <p className="text-xs text-[#72765A]">Artist Style: {item.artwork.artist}</p>
                        <p className="text-[11px] text-[#292522]/60 italic">
                          Medium: {item.artwork.medium}
                        </p>
                        <p className="text-[10px] text-[#292522]/50">
                          Showcase Dimensions: {item.artwork.dimensions}
                        </p>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-0 border-[#B89555]/15">
                      <button
                        onClick={() => redirectToWhatsApp(item.artwork)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#1ebe57] text-[#0C381E] text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shadow-xs"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5" />
                        <span>Inquire This Piece</span>
                      </button>

                      <button
                        onClick={() => removeFromCart(item.artwork.id)}
                        className="text-xs text-[#682C2C] hover:underline flex items-center gap-1"
                        aria-label="Remove artwork"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: WhatsApp Commission Inquiry Submission (4 Cols) */}
            <div className="lg:col-span-4 bg-[#F4EFE6] border border-[#B89555]/30 p-6 rounded-sm space-y-6 shadow-art">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#292522]">
                  Artworks on WhatsApp
                </h3>
                <p className="text-xs text-[#292522]/70 mt-1 leading-relaxed">
                  Submit your selected artworks directly to our Orchha atelier. We will review dimensions, pigments, and timeline with you.
                </p>
              </div>

              {/* Custom Notes */}
              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#292522]/80">
                  Custom Requirements / Notes
                </label>
                <textarea
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="E.g., custom wall sizes, specific frames, religious inscriptions, or delivery deadline..."
                  rows={4}
                  className="w-full text-xs p-3 bg-[#F8F4EA] border border-[#B89555]/40 rounded-xs text-[#292522] placeholder-[#292522]/40 focus:outline-none focus:border-[#682C2C] resize-none"
                />
              </div>

              {/* WhatsApp Action Button */}
              <div className="space-y-3">
                <button
                  onClick={handleSendToWhatsApp}
                  className="w-full flex items-center justify-center gap-2.5 py-4 bg-[#25D366] hover:bg-[#1ebe57] text-[#0C381E] font-bold text-xs uppercase tracking-widest transition-all rounded-xs shadow-md hover:shadow-lg cursor-pointer"
                >
                  <WhatsAppIcon className="w-5 h-5 text-[#0C381E]" />
                  <span>Send Selection to WhatsApp</span>
                </button>

                <p className="text-[11px] text-center text-[#72765A] leading-relaxed">
                  Opens WhatsApp with all {cart.length} selected artworks and your custom notes prefilled.
                </p>
              </div>

              <div className="border-t border-[#B89555]/20 pt-4 space-y-2 text-xs text-[#292522]/75">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#B89555] shrink-0" />
                  <span>Physical Certificate of Authenticity signed by artisan</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#B89555] shrink-0" />
                  <span>Bespoke sizes, framing, & color matching available</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
