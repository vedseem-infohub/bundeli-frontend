"use client";

import React, { useState } from "react";
import Link from "next/link";
import { artists } from "@/data/artists";
import { Search, MapPin, Award, Palette, ArrowRight, ChevronRight } from "lucide-react";

export default function ArtistsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");

  const regions = ["all", "Bundelkhand", "Central India"];

  const filteredArtists = artists.filter((artist) => {
    const matchesSearch =
      artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.style.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRegion =
      selectedRegion === "all" || artist.region === selectedRegion;

    return matchesSearch && matchesRegion;
  });

  return (
    <div className="py-10 lg:py-16 bg-[#F8F4EA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-[#292522]/60 font-sans">
          <Link href="/" className="hover:text-[#682C2C] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#B89555]" />
          <span className="text-[#682C2C] font-semibold">Master Artists</span>
        </nav>

        {/* Page Header Banner */}
        <div className="border-b border-[#B89555]/30 pb-8">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#682C2C]">
            HEREDITARY GUILDS & CONTEMPORARY MASTERS
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#292522] mt-2">
            The Custodians of Bundeli Art
          </h1>
          <p className="text-xs sm:text-sm text-[#292522]/75 max-w-2xl mt-3 leading-relaxed font-light">
            Meet the venerable fresco masters, lost-wax bronze sculptors, and folk muralists dedicated to keeping Bundelkhand's 400-year-old aesthetic lineages alive in modern India.
          </p>
        </div>

        {/* Search & Region Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#F4EFE6] rounded-sm border border-[#B89555]/20">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#B89555] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search artists, traditions, towns..."
              className="w-full pl-9 pr-3 py-2 bg-[#F8F4EA] border border-[#B89555]/30 text-xs text-[#292522] rounded-xs focus:outline-none focus:border-[#682C2C]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-[#292522]/60 hidden sm:inline">Region:</span>
            <div className="flex gap-2">
              {regions.map((reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`px-3 py-1.5 text-xs rounded-xs font-serif transition-colors capitalize ${
                    selectedRegion === reg
                      ? "bg-[#682C2C] text-[#F8F4EA] font-semibold"
                      : "bg-[#F8F4EA] text-[#292522] border border-[#B89555]/30 hover:border-[#682C2C]"
                  }`}
                >
                  {reg === "all" ? "All Regions" : reg}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Artist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtists.map((artist) => (
            <div
              key={artist.id}
              className="group flex flex-col bg-[#F4EFE6] border border-[#B89555]/25 hover:border-[#682C2C] rounded-sm overflow-hidden shadow-art hover:shadow-art-hover transition-all duration-300 p-6 justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={artist.avatar}
                    alt={artist.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-[#B89555]/50 shrink-0 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#292522] group-hover:text-[#682C2C] transition-colors">
                      {artist.name}
                    </h3>
                    <p className="text-xs text-[#682C2C] font-semibold mt-0.5">{artist.role}</p>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#72765A] mt-1">
                      <MapPin className="w-3 h-3 text-[#B89555] shrink-0" />
                      <span>{artist.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#292522]/75 leading-relaxed line-clamp-3 font-light">
                  {artist.biography}
                </p>

                <div className="pt-2 border-t border-[#B89555]/15 space-y-1.5 text-[11px]">
                  <div>
                    <span className="text-[#292522]/60">Tradition: </span>
                    <strong className="text-[#292522]">{artist.style}</strong>
                  </div>
                  <div>
                    <span className="text-[#292522]/60">Experience: </span>
                    <strong className="text-[#292522]">{artist.experienceYears} Years</strong>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-[#B89555]/20 flex items-center justify-between">
                <span className="text-xs text-[#72765A] font-semibold">
                  {artist.artworkCount} Masterpieces
                </span>
                <Link
                  href={`/artists/${artist.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-[#682C2C] group-hover:text-[#B89555] transition-colors"
                >
                  <span>Explore Artist Atelier</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
