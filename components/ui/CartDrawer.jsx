"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { X, Trash2, ArrowRight, ShieldCheck, Sparkles, Palette } from "lucide-react";

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

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    clearCart,
    redirectToWhatsApp,
    redirectSelectedToWhatsApp,
  } = useApp();

  const [customNotes, setCustomNotes] = useState("");

  if (!isCartOpen) return null;

  const handleSendToWhatsApp = () => {
    redirectSelectedToWhatsApp({ customNotes });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#292522]/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#F8F4EA] text-[#292522] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#B89555]/20 bg-[#F4EFE6]">
          <div className="flex items-center gap-2.5">
            <Palette className="w-5 h-5 text-[#682C2C]" />
            <div>
              <h3 className="font-serif text-lg tracking-wide text-[#292522] font-semibold leading-tight">
                Selected Artworks ({cart.length})
              </h3>
              <p className="text-[10px] uppercase tracking-wider text-[#72765A] font-medium">
                Custom Commission Portfolio
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-[#292522]/70 hover:text-[#682C2C] rounded-full hover:bg-[#E9DFCD] transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Showcase Explanation Banner */}
        <div className="px-6 py-3 bg-[#E9DFCD]/50 border-b border-[#B89555]/20 text-xs">
          <div className="flex items-start gap-2 text-[#292522]/80">
            <Sparkles className="w-4 h-4 text-[#B89555] shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              Our site is an authentic showcase. Select any artworks you want created, then connect with our Orchha master artisans directly on WhatsApp.
            </p>
          </div>
        </div>

        {/* Selected Artworks List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 divide-y divide-[#B89555]/15">
          {cart.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#E9DFCD] flex items-center justify-center mx-auto text-[#682C2C]">
                <Palette className="w-8 h-8 stroke-1" />
              </div>
              <div>
                <h4 className="font-serif text-lg text-[#292522]">No Artworks Selected Yet</h4>
                <p className="text-xs text-[#292522]/60 mt-1 max-w-xs mx-auto leading-relaxed">
                  Browse our showcase of Bundelkhand frescoes, Sanjhi reliefs, and classical bronzes to select works you wish to commission.
                </p>
              </div>
              <Link
                href="/shop"
                onClick={() => setIsCartOpen(false)}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#682C2C] text-[#F8F4EA] text-xs uppercase tracking-widest font-semibold hover:bg-[#4A1B1B] transition-colors rounded-sm"
              >
                Explore Art Showcase
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.artwork.id} className="pt-4 first:pt-0 flex gap-4">
                <img
                  src={item.artwork.images[0]}
                  alt={item.artwork.title}
                  className="w-20 h-24 object-cover rounded-sm border border-[#B89555]/30 shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <Link
                        href={`/art/${item.artwork.slug}`}
                        onClick={() => setIsCartOpen(false)}
                        className="font-serif text-sm font-semibold text-[#292522] hover:text-[#682C2C] transition-colors line-clamp-1"
                      >
                        {item.artwork.title}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.artwork.id)}
                        className="text-[#292522]/40 hover:text-[#682C2C] transition-colors p-1"
                        aria-label="Remove artwork"
                        title="Remove from selection"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-[#72765A]">{item.artwork.artist}</p>
                    <p className="text-[11px] text-[#292522]/60 mt-0.5 line-clamp-1">
                      {item.artwork.medium}
                    </p>
                    <p className="text-[10px] text-[#292522]/50 mt-0.5">
                      Showcase: {item.artwork.dimensions}
                    </p>
                  </div>

                  {/* Individual WhatsApp button */}
                  <div className="mt-2 pt-2 border-t border-[#B89555]/15 flex items-center justify-between">
                    <span className="text-[10px] text-[#682C2C] font-semibold uppercase tracking-wider">
                      Custom Order
                    </span>
                    <button
                      onClick={() => redirectToWhatsApp(item.artwork)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#0C381E] text-[10px] font-bold rounded-xs transition-colors"
                      title="Send this single artwork inquiry to WhatsApp"
                    >
                      <WhatsAppIcon className="w-3 h-3 text-[#25D366]" />
                      <span>Inquire Alone</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Commission Submission */}
        {cart.length > 0 && (
          <div className="border-t border-[#B89555]/20 bg-[#F4EFE6] px-6 py-5 space-y-4">
            {/* Custom Notes Input */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#292522]/80 mb-1">
                Notes for the Master Artisan (Optional)
              </label>
              <textarea
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="E.g., custom sizes, wall measurements, specific color palette, framing choices..."
                rows={2}
                className="w-full text-xs p-2.5 bg-[#F8F4EA] border border-[#B89555]/40 rounded-xs text-[#292522] placeholder-[#292522]/40 focus:outline-none focus:border-[#682C2C] resize-none"
              />
            </div>

            {/* CTAs */}
            <div className="space-y-2">
              <button
                onClick={handleSendToWhatsApp}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-[#25D366] hover:bg-[#1ebe57] text-[#0C381E] font-bold text-xs uppercase tracking-widest transition-all rounded-xs shadow-md hover:shadow-lg cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#0C381E]" />
                <span>Send {cart.length} Selected to WhatsApp</span>
              </button>

              <div className="flex items-center justify-between text-xs text-[#292522]/70 pt-1">
                <button
                  onClick={clearCart}
                  className="hover:text-[#682C2C] underline text-[11px]"
                >
                  Clear Selection
                </button>
                <span className="flex items-center gap-1 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B89555]" />
                  Direct Artisan Atelier
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
