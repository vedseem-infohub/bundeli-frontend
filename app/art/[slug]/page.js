"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { artworks } from "@/data/artworks";
import { artists } from "@/data/artists";
import { useApp } from "@/context/AppContext";
import { api, getImageUrl } from "@/lib/api";
import ArtworkCard from "@/components/artwork/ArtworkCard";
import {
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Maximize2,
  X,
  ChevronRight,
  MessageSquare,
  Award,
  Sparkles,
  Layers,
  ArrowRight,
  Check,
  Palette,
  Clock,
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

export default function ArtworkDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;

  const {
    isInWishlist,
    toggleWishlist,
    openEnquiry,
    recordView,
    recentlyViewedArtworks,
    redirectToWhatsApp,
    isSelected,
    toggleSelectArtwork,
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState("story"); // 'story' | 'specs' | 'shipping' | 'artist'

  // Commission Customization States
  const [customSize, setCustomSize] = useState("Standard Showcase Dimensions");
  const [framingPreference, setFramingPreference] = useState("Traditional Teakwood Frame");
  const [customNotes, setCustomNotes] = useState("");

  const [artwork, setArtwork] = useState(() => artworks.find((a) => a.slug === slug) || null);

  useEffect(() => {
    let isMounted = true;
    api.getArtworkByIdOrSlug(slug).then((backendArt) => {
      if (isMounted && backendArt) {
        setArtwork(backendArt);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [slug]);

  useEffect(() => {
    if (artwork) {
      recordView(artwork);
      window.scrollTo(0, 0);
    }
  }, [artwork]);

  if (!artwork) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4">
        <h2 className="font-serif text-2xl font-bold text-[#292522]">Artwork Not Found</h2>
        <p className="text-xs text-[#292522]/70 mt-2">
          The artwork you are looking for may have been archived or is private.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-block px-6 py-2.5 bg-[#682C2C] text-[#F8F4EA] text-xs uppercase tracking-widest font-semibold rounded-sm"
        >
          Return to Gallery
        </Link>
      </div>
    );
  }

  const artist = artists.find((a) => a.slug === artwork.artistSlug);
  const inWish = isInWishlist(artwork.id);
  const selected = isSelected(artwork.id);

  // Related artworks in same category or collection
  const relatedArtworks = artworks
    .filter((a) => a.id !== artwork.id && (a.categorySlug === artwork.categorySlug || a.artistSlug === artwork.artistSlug))
    .slice(0, 4);

  // Direct WhatsApp Commission Action
  const handleCommissionWhatsApp = () => {
    const chosenSize = customSize === "Standard Showcase Dimensions" ? artwork.dimensions : customSize;
    redirectToWhatsApp(artwork, {
      customSize: chosenSize,
      framing: framingPreference,
      customNotes,
    });
  };

  return (
    <div className="py-8 lg:py-14 bg-[#F8F4EA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-[#292522]/60 font-sans">
          <Link href="/" className="hover:text-[#682C2C] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#B89555]" />
          <Link href="/shop" className="hover:text-[#682C2C] transition-colors">
            Shop Art
          </Link>
          <ChevronRight className="w-3 h-3 text-[#B89555]" />
          <Link
            href={`/shop?category=${artwork.categorySlug}`}
            className="hover:text-[#682C2C] transition-colors"
          >
            {artwork.category}
          </Link>
          <ChevronRight className="w-3 h-3 text-[#B89555]" />
          <span className="text-[#682C2C] font-semibold truncate max-w-[200px] sm:max-w-none">
            {artwork.title}
          </span>
        </nav>

        {/* Top Product Presentation: Gallery Left + Details Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Image Gallery (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Image with Zoom Trigger */}
            <div className="relative aspect-4/5 w-full bg-[#E9DFCD] rounded-sm overflow-hidden shadow-2xl border border-[#B89555]/30 group">
              <img
                src={getImageUrl(artwork.images[activeImageIndex] || artwork.images[0])}
                alt={artwork.title}
                className="w-full h-full object-cover object-center cursor-zoom-in transition-transform duration-700 ease-out group-hover:scale-105"
                onClick={() => setIsFullscreen(true)}
              />

              {/* Fullscreen view button */}
              <button
                onClick={() => setIsFullscreen(true)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-[#F8F4EA]/90 hover:bg-[#F8F4EA] text-[#292522] hover:text-[#682C2C] shadow-md transition-colors"
                aria-label="Expand Fullscreen View"
                title="Fullscreen Lightbox"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
                {artwork.isNew && (
                  <span className="bg-[#682C2C] text-[#F8F4EA] text-[10px] uppercase font-semibold tracking-wider px-3 py-1 shadow-sm">
                    New Arrival
                  </span>
                )}
                {artwork.isLimitedEdition && (
                  <span className="bg-[#B89555] text-[#292522] text-[10px] uppercase font-bold tracking-wider px-3 py-1 shadow-sm">
                    Limited Edition
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Row */}
            {artwork.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {artwork.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-24 rounded-sm overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx
                        ? "border-[#682C2C] ring-2 ring-[#682C2C]/20"
                        : "border-[#B89555]/30 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={getImageUrl(img)} alt="Angle preview" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Information & Purchase (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-[#B89555] font-semibold">
                  {artwork.style}
                </span>
                <span className="text-[11px] font-mono text-[#292522]/50">SKU: {artwork.sku}</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#292522] mt-1.5 leading-tight">
                {artwork.title}
              </h1>

              {/* Clickable Artist link */}
              <div className="flex items-center gap-2 mt-3 text-sm">
                <span className="text-[#292522]/60">Master Artist:</span>
                <Link
                  href={`/artists/${artwork.artistSlug}`}
                  className="font-serif font-bold text-[#682C2C] hover:underline flex items-center gap-1"
                >
                  <span>{artwork.artist}</span>
                  <ArrowRight className="w-3 h-3 text-[#B89555]" />
                </Link>
              </div>
            </div>

            {/* Bespoke Commission Atelier Banner */}
            <div className="p-5 bg-[#F4EFE6] rounded-sm border-2 border-[#B89555]/30 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#682C2C] flex items-center gap-1.5 font-sans">
                  <Sparkles className="w-3.5 h-3.5 text-[#B89555]" />
                  Atelier Showcase & Bespoke Commissions
                </span>
                <span className="text-[10px] font-medium px-2 py-0.5 bg-[#B89555]/20 text-[#682C2C] border border-[#B89555]/40 rounded-xs uppercase tracking-wider">
                  Handcrafted on Demand
                </span>
              </div>
              <p className="text-xs text-[#292522]/80 leading-relaxed font-light">
                Each artwork in our living archive is individually painted, sculpted, or embossed by our Orchha master artists. Select your preferred scale and framing, then connect directly with our atelier on WhatsApp.
              </p>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs border-y border-[#B89555]/20 py-4">
              <div>
                <span className="text-[#292522]/60 block text-[11px]">Medium</span>
                <span className="font-medium text-[#292522]">{artwork.medium}</span>
              </div>
              <div>
                <span className="text-[#292522]/60 block text-[11px]">Showcase Dimensions</span>
                <span className="font-medium text-[#292522]">{artwork.dimensions}</span>
              </div>
              <div>
                <span className="text-[#292522]/60 block text-[11px]">Substrate / Material</span>
                <span className="font-medium text-[#292522]">{artwork.material}</span>
              </div>
              <div>
                <span className="text-[#292522]/60 block text-[11px]">Orientation</span>
                <span className="font-medium text-[#292522]">{artwork.orientation}</span>
              </div>
            </div>

            {/* Commission Customization Controls */}
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Desired Size Selection */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#292522]/80 mb-1">
                    Dimensions / Scale
                  </label>
                  <select
                    value={customSize}
                    onChange={(e) => setCustomSize(e.target.value)}
                    className="w-full text-xs p-2.5 bg-[#F4EFE6] border border-[#B89555]/30 rounded-xs text-[#292522] focus:outline-none focus:ring-1 focus:ring-[#682C2C]"
                  >
                    <option value="Standard Showcase Dimensions">Showcase Size ({artwork.dimensions})</option>
                    <option value="Compact Size (18 x 24 in)">Compact Format (18 x 24 in)</option>
                    <option value="Monumental Scale (36 x 48 in)">Monumental Scale (36 x 48 in)</option>
                    <option value="Custom Wall Dimensions">Custom Wall Scale (Discuss in WhatsApp)</option>
                  </select>
                </div>

                {/* Framing Selection */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#292522]/80 mb-1">
                    Presentation & Framing
                  </label>
                  <select
                    value={framingPreference}
                    onChange={(e) => setFramingPreference(e.target.value)}
                    className="w-full text-xs p-2.5 bg-[#F4EFE6] border border-[#B89555]/30 rounded-xs text-[#292522] focus:outline-none focus:ring-1 focus:ring-[#682C2C]"
                  >
                    <option value="Traditional Teakwood Frame">Traditional Teakwood Heritage Frame</option>
                    <option value="Gold-Leaf Beaded Frame">24K Gold-Leaf Beaded Border Frame</option>
                    <option value="Museum Float Acrylic">Museum Float Acrylic Presentation</option>
                    <option value="Unframed on Wasli">Unframed on Raw Wasli Paper</option>
                  </select>
                </div>
              </div>

              {/* Custom Inscription / Notes */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#292522]/80 mb-1">
                  Custom Notes / Dedication (Optional)
                </label>
                <input
                  type="text"
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="E.g., specific deity stanza, family monogram, or room color matching..."
                  className="w-full text-xs p-2.5 bg-[#F4EFE6] border border-[#B89555]/30 rounded-xs text-[#292522] placeholder-[#292522]/40 focus:outline-none focus:ring-1 focus:ring-[#682C2C]"
                />
              </div>

              {/* Primary Action: Direct WhatsApp Commission */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleCommissionWhatsApp}
                  className="flex-1 flex items-center justify-center gap-2.5 py-4 bg-[#25D366] hover:bg-[#1ebe57] text-[#0C381E] text-xs uppercase tracking-widest font-bold transition-all rounded-xs shadow-md hover:shadow-lg cursor-pointer"
                >
                  <WhatsAppIcon className="w-5 h-5 text-[#0C381E]" />
                  <span>Commission Artwork on WhatsApp</span>
                </button>

                {/* Multi-Artwork Selection Toggle */}
                <button
                  onClick={() => toggleSelectArtwork(artwork)}
                  className={`px-4 py-4 border rounded-xs text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 ${
                    selected
                      ? "border-[#25D366] bg-[#25D366]/10 text-[#0C381E]"
                      : "border-[#B89555]/40 hover:border-[#682C2C] text-[#292522] bg-[#F4EFE6]"
                  }`}
                  title={selected ? "Selected for commission" : "Add to selected artworks"}
                >
                  <Check className={`w-4 h-4 ${selected ? "text-[#25D366] stroke-[3]" : "text-[#292522]/40"}`} />
                  <span className="hidden sm:inline">{selected ? "Selected" : "Select Work"}</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(artwork)}
                  className={`p-4 border rounded-xs transition-colors shrink-0 ${
                    inWish
                      ? "border-[#682C2C] bg-[#682C2C]/10 text-[#682C2C]"
                      : "border-[#B89555]/40 hover:border-[#682C2C] text-[#292522] bg-[#F4EFE6]"
                  }`}
                  aria-label="Wishlist"
                  title="Save to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWish ? "fill-current" : ""}`} />
                </button>
              </div>

              <button
                onClick={() => openEnquiry(artwork)}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs text-[#292522]/80 hover:text-[#682C2C] border border-[#B89555]/30 rounded-xs hover:bg-[#F4EFE6] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#B89555]" />
                <span>Submit Detailed Curatorial Inquiry Form</span>
              </button>
            </div>

            {/* Reassurance Badges */}
            <div className="space-y-2.5 pt-4 text-xs text-[#292522]/80">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#B89555] shrink-0" />
                <span>Physical Certificate of Authenticity signed by master artisan</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#B89555] shrink-0" />
                <span>Complimentary insured shipping in custom shock-proof crating</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-[#B89555] shrink-0" />
                <span>Direct artisan patronage: over 70% returns to regional craft clusters</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed In-Depth Information Section */}
        <div className="border-t border-[#B89555]/20 pt-10">
          <div className="flex border-b border-[#B89555]/20 gap-6 text-xs sm:text-sm font-serif font-bold uppercase tracking-wider overflow-x-auto pb-1">
            {[
              { id: "story", label: "Artwork Story & Significance" },
              { id: "specs", label: "Full Specifications & Framing" },
              { id: "artist", label: "About the Master Artisan" },
              { id: "shipping", label: "White-Glove Shipping & Care" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 transition-colors shrink-0 ${
                  activeTab === tab.id
                    ? "border-b-2 border-[#682C2C] text-[#682C2C]"
                    : "text-[#292522]/60 hover:text-[#292522]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="py-8 text-sm leading-relaxed text-[#292522]/80 max-w-4xl space-y-4">
            {activeTab === "story" && (
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#292522]">
                  The Cultural Provenance
                </h3>
                <p>{artwork.story}</p>
                <p>{artwork.description}</p>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#292522]">
                  Archival Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F4EFE6] p-6 rounded-sm border border-[#B89555]/20 text-xs">
                  <div>
                    <span className="text-[#292522]/60 block">Frame Presentation</span>
                    <span className="font-semibold text-[#292522]">{artwork.specs?.framed}</span>
                  </div>
                  <div>
                    <span className="text-[#292522]/60 block">Certificate Details</span>
                    <span className="font-semibold text-[#292522]">{artwork.specs?.certificate}</span>
                  </div>
                  <div>
                    <span className="text-[#292522]/60 block">Artisan Signature</span>
                    <span className="font-semibold text-[#292522]">{artwork.specs?.signature}</span>
                  </div>
                  <div>
                    <span className="text-[#292522]/60 block">Year of Creation</span>
                    <span className="font-semibold text-[#292522]">{artwork.specs?.year}</span>
                  </div>
                  <div>
                    <span className="text-[#292522]/60 block">Approx. Packaged Weight</span>
                    <span className="font-semibold text-[#292522]">{artwork.specs?.weight}</span>
                  </div>
                  <div>
                    <span className="text-[#292522]/60 block">Pigment Composition</span>
                    <span className="font-semibold text-[#292522]">{artwork.medium}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "artist" && artist && (
              <div className="flex flex-col sm:flex-row gap-6 items-start bg-[#F4EFE6] p-6 rounded-sm border border-[#B89555]/20">
                <img
                  src={artist.avatar}
                  alt={artist.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-[#B89555]/50 shrink-0"
                />
                <div className="space-y-2">
                  <h4 className="font-serif text-lg font-bold text-[#292522]">{artist.name}</h4>
                  <p className="text-xs text-[#682C2C] font-semibold">{artist.role} • {artist.location}</p>
                  <p className="text-xs text-[#292522]/75 leading-relaxed">{artist.biography}</p>
                  <Link
                    href={`/artists/${artist.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#682C2C] hover:underline pt-2"
                  >
                    <span>View All {artist.artworkCount} Works by {artist.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#292522]">
                  Insured Delivery & Conservation Guidelines
                </h3>
                <p>
                  All artworks are packed in museum-grade, climate-cushioned wooden crates engineered to protect mineral pigments and fragile wasli paper from humidity, pressure variations, and transit shocks.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
                  <div className="p-4 bg-[#F4EFE6] border border-[#B89555]/20 rounded-xs">
                    <h5 className="font-serif font-bold text-sm text-[#292522]">Transit Time</h5>
                    <p className="text-[#292522]/70 mt-1">3–5 business days within India; 7–12 days worldwide via insured air transit.</p>
                  </div>
                  <div className="p-4 bg-[#F4EFE6] border border-[#B89555]/20 rounded-xs">
                    <h5 className="font-serif font-bold text-sm text-[#292522]">Direct Handover</h5>
                    <p className="text-[#292522]/70 mt-1">Requires collector's physical signature and verification upon delivery.</p>
                  </div>
                  <div className="p-4 bg-[#F4EFE6] border border-[#B89555]/20 rounded-xs">
                    <h5 className="font-serif font-bold text-sm text-[#292522]">Conservation</h5>
                    <p className="text-[#292522]/70 mt-1">Display away from direct continuous harsh sunlight. Keep humidity between 45%–60%.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Artworks Carousel/Grid */}
        {relatedArtworks.length > 0 && (
          <div className="border-t border-[#B89555]/20 pt-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#B89555] font-semibold">
                  CURATOR SUGGESTIONS
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#292522] mt-1">
                  Related Artworks from This Tradition
                </h3>
              </div>
              <Link
                href="/shop"
                className="text-xs font-semibold uppercase tracking-wider text-[#682C2C] hover:underline"
              >
                View Catalog
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedArtworks.map((item) => (
                <ArtworkCard key={item.id} artwork={item} />
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed Artworks */}
        {recentlyViewedArtworks.length > 1 && (
          <div className="border-t border-[#B89555]/20 pt-12">
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-[#B89555] font-semibold">
                YOUR ART JOURNEY
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#292522] mt-1">
                Recently Viewed Artworks
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {recentlyViewedArtworks
                .filter((a) => a.id !== artwork.id)
                .slice(0, 4)
                .map((item) => (
                  <ArtworkCard key={item.id} artwork={item} />
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-[#292522]/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-[#F8F4EA]/10 hover:bg-[#F8F4EA]/20 text-[#F8F4EA] transition-colors"
            aria-label="Close Fullscreen"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={getImageUrl(artwork.images[activeImageIndex] || artwork.images[0])}
            alt={artwork.title}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xs shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
