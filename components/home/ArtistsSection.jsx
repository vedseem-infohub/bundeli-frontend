"use client";

import React from "react";
import Link from "next/link";
import { artists } from "@/data/artists";
import { ArrowRight, MapPin, Award, Palette } from "lucide-react";

export default function ArtistsSection() {
  const featuredArtists = artists.slice(0, 4);

  return (
    <section className="py-8 sm:py-12 lg:py-14 bg-[#F8F4EA] border-b border-[#B89555]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#682C2C] flex items-center gap-2">
              <span className="w-6 h-px bg-[#682C2C]" />
              MASTER CRAFTSMEN & PAINTERS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#292522]">
              Meet the Artists Behind the Art
            </h2>
          </div>

          <Link
            href="/artists"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#682C2C] hover:text-[#B89555] border-b border-[#682C2C] pb-1 transition-colors mt-4 md:mt-0 group"
          >
            <span>View All Master Artists ({artists.length})</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* Artist Profile Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredArtists.map((artist) => (
            <div
              key={artist.id}
              className="group flex flex-col bg-[#F4EFE6] border border-[#B89555]/20 hover:border-[#682C2C] rounded-sm overflow-hidden shadow-art hover:shadow-art-hover transition-all duration-300 p-5 justify-between"
            >
              <div>
                {/* Portrait */}
                <div className="relative aspect-square w-full rounded-sm overflow-hidden mb-4 bg-[#E9DFCD] border border-[#B89555]/30">
                  <img
                    src={artist.avatar}
                    alt={artist.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#292522]/60 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-2.5 bg-[#292522]/80 backdrop-blur-xs text-[#F8F4EA] text-[10px] font-semibold px-2 py-0.5 rounded-xs">
                    {artist.artworkCount} Artworks Available
                  </span>
                </div>

                {/* Name & Role */}
                <h3 className="font-serif text-lg font-bold text-[#292522] group-hover:text-[#682C2C] transition-colors leading-snug">
                  {artist.name}
                </h3>
                <p className="text-xs text-[#682C2C] font-medium mt-0.5">{artist.role}</p>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-[11px] text-[#72765A] mt-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#B89555] shrink-0" />
                  <span>{artist.location}</span>
                </div>

                {/* Bio snippet */}
                <p className="text-xs text-[#292522]/70 mt-3 leading-relaxed line-clamp-3">
                  {artist.shortBio}
                </p>
              </div>

              {/* Explore Artist Button */}
              <div className="pt-4 mt-4 border-t border-[#B89555]/20">
                <Link
                  href={`/artists/${artist.slug}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#682C2C]/10 hover:bg-[#682C2C] text-[#682C2C] hover:text-[#F8F4EA] text-xs uppercase tracking-wider font-semibold rounded-xs transition-all duration-300"
                >
                  <span>Explore Artist</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
