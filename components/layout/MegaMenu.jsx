"use client";

import React from "react";
import Link from "next/link";
import { categories } from "@/data/categories";
import { collections } from "@/data/collections";
import { artworks } from "@/data/artworks";
import { ArrowRight, Sparkles } from "lucide-react";

export function ShopMegaMenu({ onClose }) {
  const featuredArtwork = artworks.find((a) => a.isFeatured && a.slug.includes("orchha")) || artworks[0];

  const artStyles = [
    { name: "Bundelkhand Royal Fresco", desc: "Tempera & 24K gold miniatures of Orchha", filter: "Bundelkhand Royal Fresco" },
    { name: "Bundeli Sanjhi & Terracotta", desc: "Ken River silt clay wall reliefs", filter: "Bundeli Sanjhi & Terracotta" },
    { name: "Classical Chandela Bronze", desc: "Khajuraho temple lost-wax casts", filter: "Classical Chandela Revival" },
    { name: "Datia Illuminated Miniatures", desc: "Braj poetry & Krishna lore manuscripts", filter: "Datia Illuminated Miniature" },
    { name: "Pardhan Gond Tribal Lore", desc: "Pointillist mythologies of Central India", filter: "Pardhan Gond Tribal Narrative" },
  ];

  return (
    <div className="absolute top-full left-0 w-full bg-[#F8F4EA] border-b border-[#B89555]/30 shadow-2xl z-40 py-8 px-6 lg:px-12 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
        {/* Column 1: Core Categories */}
        <div className="col-span-4 border-r border-[#B89555]/20 pr-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs uppercase tracking-widest text-[#B89555] font-semibold">
              Art Disciplines
            </h4>
            <Link
              href="/shop"
              onClick={onClose}
              className="text-xs font-serif text-[#682C2C] hover:underline flex items-center gap-1"
            >
              All Artworks <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <ul className="space-y-2.5">
            {categories.map((c, idx) => (
              <li key={c._id || c.id || c.slug || idx}>
                <Link
                  href={`/shop?category=${c.slug}`}
                  onClick={onClose}
                  className="group flex items-baseline justify-between text-[#292522] hover:text-[#682C2C] transition-colors"
                >
                  <span className="font-serif text-sm font-medium group-hover:translate-x-1 transition-transform inline-block">
                    {c.name}
                  </span>
                  <span className="text-[11px] text-[#72765A]">
                    {c.artworkCount} works
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: Distinctive Styles */}
        <div className="col-span-4 border-r border-[#B89555]/20 pr-6">
          <h4 className="text-xs uppercase tracking-widest text-[#B89555] font-semibold mb-4">
            Heritage Art Traditions
          </h4>
          <div className="space-y-3">
            {artStyles.map((style) => (
              <Link
                key={style.name}
                href={`/shop?style=${encodeURIComponent(style.filter)}`}
                onClick={onClose}
                className="block group p-2 rounded-sm hover:bg-[#F4EFE6] transition-colors"
              >
                <div className="font-serif text-sm text-[#292522] group-hover:text-[#682C2C] font-medium transition-colors">
                  {style.name}
                </div>
                <div className="text-[11px] text-[#292522]/60 mt-0.5">{style.desc}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Column 3: Featured Masterpiece Spotlight */}
        <div className="col-span-4 pl-2">
          <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#B89555] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curator's Spotlight</span>
          </div>

          <Link
            href={`/art/${featuredArtwork.slug}`}
            onClick={onClose}
            className="group block bg-[#F4EFE6] p-3 rounded-sm border border-[#B89555]/20 hover:border-[#B89555] transition-all"
          >
            <div className="relative aspect-16/10 overflow-hidden rounded-sm mb-3">
              <img
                src={featuredArtwork.images[0]}
                alt={featuredArtwork.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2 left-2 bg-[#682C2C] text-[#F8F4EA] text-[10px] uppercase font-semibold px-2 py-0.5">
                Featured
              </span>
            </div>
            <h5 className="font-serif text-sm font-bold text-[#292522] group-hover:text-[#682C2C] truncate transition-colors">
              {featuredArtwork.title}
            </h5>
            <p className="text-xs text-[#72765A] mt-0.5">{featuredArtwork.artist}</p>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#B89555]/15">
              <span className="text-[11px] font-semibold text-[#682C2C] uppercase tracking-wider">
                Bespoke Commission
              </span>
              <span className="text-[11px] text-[#292522]/60 group-hover:underline flex items-center gap-1">
                Explore Artwork <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function CollectionsMegaMenu({ onClose }) {
  return (
    <div className="absolute top-full left-0 w-full bg-[#F8F4EA] border-b border-[#B89555]/30 shadow-2xl z-40 py-8 px-6 lg:px-12 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6 border-b border-[#B89555]/20 pb-3">
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#B89555] font-semibold">
              Curated Collections
            </h4>
            <p className="text-xs text-[#292522]/60 mt-0.5">
              Thoughtfully assembled thematic anthologies reflecting Central Indian heritage
            </p>
          </div>
          <Link
            href="/collections"
            onClick={onClose}
            className="text-xs font-serif text-[#682C2C] hover:underline flex items-center gap-1"
          >
            All Collections <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {collections.map((col, idx) => (
            <Link
              key={col._id || col.id || col.slug || idx}
              href={`/collections/${col.slug}`}
              onClick={onClose}
              className="group flex flex-col bg-[#F4EFE6] rounded-sm overflow-hidden border border-[#B89555]/20 hover:border-[#682C2C] transition-all p-2.5"
            >
              <div className="relative aspect-4/3 overflow-hidden rounded-sm mb-2.5">
                <img
                  src={col.coverImage}
                  alt={col.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-1.5 right-1.5 bg-[#292522]/80 text-[#F8F4EA] text-[10px] px-1.5 py-0.5 rounded-xs">
                  {col.artworkCount} works
                </span>
              </div>
              <h5 className="font-serif text-xs font-bold text-[#292522] group-hover:text-[#682C2C] line-clamp-1 transition-colors">
                {col.title}
              </h5>
              <p className="text-[10px] text-[#72765A] mt-0.5 line-clamp-2">
                {col.tagline}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
