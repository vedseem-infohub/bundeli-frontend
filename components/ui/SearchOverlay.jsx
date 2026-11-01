"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { artworks as defaultArtworks } from "@/data/artworks";
import { artists } from "@/data/artists";
import { categories } from "@/data/categories";
import { collections } from "@/data/collections";
import { api, getImageUrl } from "@/lib/api";
import { Search, X, ArrowRight, Sparkles, Tag, User, Layers, Palette } from "lucide-react";

export default function SearchOverlay() {
  const { isSearchOpen, setIsSearchOpen } = useApp();
  const [query, setQuery] = useState("");
  const [artworksList, setArtworksList] = useState(defaultArtworks);
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    api.getArtworks().then((backendArtworks) => {
      if (isMounted && backendArtworks && backendArtworks.length > 0) {
        setArtworksList(backendArtworks);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Popular quick tags
  const popularTags = [
    "Orchha Fresco",
    "Bundeli Sanjhi",
    "Lost-Wax Bronze",
    "Datia Miniature",
    "Gond Art",
    "Betwa River",
    "Terracotta Relief",
    "Teakwood Jharokha",
  ];

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSearchOpen]);

  // Handle ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const cleanQuery = query.trim().toLowerCase();

  const matchingArtworks = cleanQuery
    ? artworksList.filter(
        (a) =>
          a.title.toLowerCase().includes(cleanQuery) ||
          a.artist.toLowerCase().includes(cleanQuery) ||
          a.style.toLowerCase().includes(cleanQuery) ||
          a.medium.toLowerCase().includes(cleanQuery) ||
          a.category.toLowerCase().includes(cleanQuery)
      )
    : [];

  const matchingArtists = cleanQuery
    ? artists.filter(
        (art) =>
          art.name.toLowerCase().includes(cleanQuery) ||
          art.location.toLowerCase().includes(cleanQuery) ||
          art.style.toLowerCase().includes(cleanQuery)
      )
    : [];

  const matchingCategories = cleanQuery
    ? categories.filter(
        (c) =>
          c.name.toLowerCase().includes(cleanQuery) ||
          c.shortDescription.toLowerCase().includes(cleanQuery)
      )
    : [];

  const matchingCollections = cleanQuery
    ? collections.filter(
        (col) =>
          col.title.toLowerCase().includes(cleanQuery) ||
          col.tagline.toLowerCase().includes(cleanQuery)
      )
    : [];

  const hasResults =
    matchingArtworks.length > 0 ||
    matchingArtists.length > 0 ||
    matchingCategories.length > 0 ||
    matchingCollections.length > 0;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (cleanQuery) {
      setIsSearchOpen(false);
      router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#292522]/90 backdrop-blur-md animate-in fade-in duration-200">
      {/* Top Search Input Bar */}
      <div className="w-full bg-[#F8F4EA] border-b border-[#B89555]/30 shadow-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
            <Search className="w-6 h-6 text-[#B89555] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by artwork title, master artist, style (e.g. Orchha fresco, terracotta, bronze)..."
              className="w-full bg-transparent text-[#292522] placeholder-[#72765A] text-lg sm:text-xl font-serif focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-[#72765A] hover:text-[#292522] text-xs uppercase tracking-wider px-2 py-1"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="p-2 text-[#292522] hover:text-[#682C2C] rounded-full hover:bg-[#E9DFCD] transition-colors"
              aria-label="Close search"
            >
              <X className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>

      {/* Results Content Area */}
      <div className="flex-1 overflow-y-auto max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 text-[#F8F4EA]">
        {!cleanQuery ? (
          <div className="space-y-8 max-w-3xl">
            <div>
              <div className="flex items-center gap-2 text-[#B89555] text-xs uppercase tracking-widest font-semibold mb-3">
                <Sparkles className="w-4 h-4" />
                <span>Popular Discoveries</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-4 py-2 rounded-full border border-[#B89555]/40 text-[#E9DFCD] text-sm hover:border-[#B89555] hover:bg-[#B89555]/10 hover:text-[#F8F4EA] transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#F8F4EA]/10">
              <Link
                href="/shop"
                onClick={() => setIsSearchOpen(false)}
                className="p-4 rounded-sm border border-[#F8F4EA]/10 hover:border-[#B89555]/50 bg-[#292522] hover:bg-[#292522]/80 transition-all flex items-center justify-between group"
              >
                <div>
                  <h4 className="text-base font-serif text-[#F8F4EA] group-hover:text-[#B89555] transition-colors">
                    Explore All Available Artworks
                  </h4>
                  <p className="text-xs text-[#E9DFCD]/70">Browse the entire curated catalog</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#B89555] transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/artists"
                onClick={() => setIsSearchOpen(false)}
                className="p-4 rounded-sm border border-[#F8F4EA]/10 hover:border-[#B89555]/50 bg-[#292522] hover:bg-[#292522]/80 transition-all flex items-center justify-between group"
              >
                <div>
                  <h4 className="text-base font-serif text-[#F8F4EA] group-hover:text-[#B89555] transition-colors">
                    Meet Master Artisans & Painters
                  </h4>
                  <p className="text-xs text-[#E9DFCD]/70">Centuries of living heritage lineages</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#B89555] transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-[#F8F4EA]/10 pb-4">
              <p className="text-sm text-[#E9DFCD]">
                Search results for <span className="font-serif italic text-[#B89555]">"{query}"</span>
              </p>
              {matchingArtworks.length > 0 && (
                <button
                  onClick={handleSearchSubmit}
                  className="text-xs uppercase tracking-wider text-[#B89555] hover:text-[#F8F4EA] flex items-center gap-1.5 transition-colors"
                >
                  View all in Gallery View <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {!hasResults ? (
              <div className="py-16 text-center">
                <Palette className="w-12 h-12 text-[#B89555]/50 mx-auto mb-4 stroke-1" />
                <h3 className="text-xl font-serif text-[#F8F4EA] mb-2">No matching art treasures found</h3>
                <p className="text-sm text-[#E9DFCD]/70 max-w-md mx-auto mb-6">
                  We couldn't find matches for "{query}". Try searching for regional art terms like "Orchha", "Terracotta", "Miniature", "Fresco", or browse our complete collection.
                </p>
                <Link
                  href="/shop"
                  onClick={() => setIsSearchOpen(false)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#B89555] text-[#292522] text-xs font-semibold uppercase tracking-widest hover:bg-[#D4AF67] transition-all"
                >
                  Browse All Artworks
                </Link>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Matching Artworks */}
                {matchingArtworks.length > 0 && (
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-[#B89555] font-semibold mb-4 flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5" />
                      Artworks ({matchingArtworks.length})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {matchingArtworks.slice(0, 6).map((art, idx) => (
                        <Link
                          key={art._id || art.id || idx}
                          href={`/art/${art.slug}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex gap-4 p-3 rounded-sm bg-[#292522] border border-[#F8F4EA]/10 hover:border-[#B89555] transition-all group"
                        >
                          <img
                            src={getImageUrl(art.images || art.image)}
                            alt={art.title}
                            className="w-16 h-20 object-cover rounded-sm shrink-0 group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="flex flex-col justify-center min-w-0">
                            <span className="text-[10px] uppercase tracking-wider text-[#B89555]">
                              {art.category}
                            </span>
                            <h5 className="text-sm font-serif text-[#F8F4EA] group-hover:text-[#B89555] truncate transition-colors">
                              {art.title}
                            </h5>
                            <p className="text-xs text-[#E9DFCD]/70 truncate">{art.artist}</p>
                            <p className="text-xs font-medium text-[#F8F4EA] mt-1">
                              {art.isPriceOnRequest ? "Price on Request" : `₹${art.price.toLocaleString("en-IN")}`}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Matching Artists */}
                {matchingArtists.length > 0 && (
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-[#B89555] font-semibold mb-4 flex items-center gap-2">
                      <User className="w-3.5 h-3.5" />
                      Artists ({matchingArtists.length})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {matchingArtists.map((artist) => (
                        <Link
                          key={artist.id}
                          href={`/artists/${artist.slug}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex items-center gap-4 p-3 rounded-sm bg-[#292522] border border-[#F8F4EA]/10 hover:border-[#B89555] transition-all group"
                        >
                          <img
                            src={artist.avatar}
                            alt={artist.name}
                            className="w-14 h-14 rounded-full object-cover shrink-0 border border-[#B89555]/50"
                          />
                          <div>
                            <h5 className="text-sm font-serif text-[#F8F4EA] group-hover:text-[#B89555] transition-colors">
                              {artist.name}
                            </h5>
                            <p className="text-xs text-[#B89555]">{artist.role}</p>
                            <p className="text-[11px] text-[#E9DFCD]/70">{artist.location}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Matching Categories & Collections */}
                {(matchingCategories.length > 0 || matchingCollections.length > 0) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#F8F4EA]/10">
                    {matchingCategories.length > 0 && (
                      <div>
                        <h4 className="text-xs uppercase tracking-widest text-[#B89555] font-semibold mb-3 flex items-center gap-2">
                          <Layers className="w-3.5 h-3.5" /> Categories
                        </h4>
                        <div className="space-y-2">
                          {matchingCategories.map((c) => (
                            <Link
                              key={c.id}
                              href={`/shop?category=${c.slug}`}
                              onClick={() => setIsSearchOpen(false)}
                              className="block p-2.5 rounded-sm bg-[#292522] hover:bg-[#292522]/70 text-xs text-[#F8F4EA] hover:text-[#B89555] transition-colors"
                            >
                              <span className="font-serif text-sm block">{c.name}</span>
                              <span className="text-[#E9DFCD]/60 text-[11px] line-clamp-1">{c.shortDescription}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                    {matchingCollections.length > 0 && (
                      <div>
                        <h4 className="text-xs uppercase tracking-widest text-[#B89555] font-semibold mb-3 flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5" /> Collections
                        </h4>
                        <div className="space-y-2">
                          {matchingCollections.map((col) => (
                            <Link
                              key={col.id}
                              href={`/collections/${col.slug}`}
                              onClick={() => setIsSearchOpen(false)}
                              className="block p-2.5 rounded-sm bg-[#292522] hover:bg-[#292522]/70 text-xs text-[#F8F4EA] hover:text-[#B89555] transition-colors"
                            >
                              <span className="font-serif text-sm block">{col.title}</span>
                              <span className="text-[#E9DFCD]/60 text-[11px] line-clamp-1">{col.tagline}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
