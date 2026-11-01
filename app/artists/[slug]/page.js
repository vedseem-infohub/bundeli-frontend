"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { artists } from "@/data/artists";
import { artworks } from "@/data/artworks";
import { api } from "@/lib/api";
import ArtworkGrid from "@/components/artwork/ArtworkGrid";
import { MapPin, Award, Palette, ArrowRight, ChevronRight, Sparkles } from "lucide-react";

export default function ArtistDetailPage() {
  const params = useParams();
  const { slug } = params;

  const staticArtist = artists.find((a) => a.slug === slug);
  const [artist, setArtist] = useState(staticArtist);
  const [loading, setLoading] = useState(!staticArtist);

  useEffect(() => {
    let isMounted = true;
    api
      .getArtistBySlug(slug)
      .then((backendArtist) => {
        if (isMounted && backendArtist) {
          setArtist(backendArtist);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4">
        <p className="text-xs uppercase tracking-widest text-[#B89555] font-semibold animate-pulse">
          Loading Master Atelier...
        </p>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4">
        <h2 className="font-serif text-2xl font-bold text-[#292522]">Artist Profile Not Found</h2>
        <Link
          href="/artists"
          className="mt-6 inline-block px-6 py-2.5 bg-[#682C2C] text-[#F8F4EA] text-xs uppercase tracking-widest font-semibold rounded-sm"
        >
          View All Artists
        </Link>
      </div>
    );
  }

  const artistArtworks = artworks.filter((a) => a.artistSlug === artist.slug);
  const otherArtists = artists.filter((a) => (a.slug || a.id) !== (artist.slug || artist.id)).slice(0, 3);

  return (
    <div className="py-8 lg:py-14 bg-[#F8F4EA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-[#292522]/60 font-sans">
          <Link href="/" className="hover:text-[#682C2C] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#B89555]" />
          <Link href="/artists" className="hover:text-[#682C2C] transition-colors">
            Artists
          </Link>
          <ChevronRight className="w-3 h-3 text-[#B89555]" />
          <span className="text-[#682C2C] font-semibold">{artist.name}</span>
        </nav>

        {/* Hero Artist Banner & Portrait Presentation */}
        <div className="bg-[#F4EFE6] rounded-sm border border-[#B89555]/30 overflow-hidden shadow-xl">
          <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#292522]">
            <img
              src={artist.coverImage}
              alt={artist.name}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#292522] via-[#292522]/60 to-transparent" />
          </div>

          <div className="px-6 sm:px-10 pb-10 pt-0 relative -mt-20 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
            <img
              src={artist.avatar}
              alt={artist.name}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-[#F8F4EA] shadow-2xl shrink-0"
            />

            <div className="space-y-3 flex-1 text-[#292522]">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#682C2C] font-semibold">
                  {artist.style}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#292522]">
                  {artist.name}
                </h1>
                <p className="text-sm text-[#72765A] font-medium mt-0.5">{artist.role}</p>
                <div className="flex items-center gap-1.5 text-xs text-[#292522]/70 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#B89555]" />
                  <span>{artist.location}</span>
                </div>
              </div>

              {/* Badges/Awards */}
              {artist.awards && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {artist.awards.map((award, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E9DFCD] text-[#682C2C] text-xs font-semibold rounded-xs border border-[#B89555]/30"
                    >
                      <Award className="w-3.5 h-3.5 text-[#B89555]" />
                      <span>{award}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Biography & Artistic Journey */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-serif text-2xl font-bold text-[#292522] border-b border-[#B89555]/20 pb-3">
              Artistic Biography & Heritage Lineage
            </h2>
            <p className="text-sm leading-relaxed text-[#292522]/80 font-light">
              {artist.biography}
            </p>
            <div className="p-6 bg-[#F4EFE6] rounded-sm border-l-2 border-[#682C2C] space-y-2">
              <h3 className="font-serif text-lg font-bold text-[#292522]">The Creative Journey</h3>
              <p className="text-xs sm:text-sm text-[#292522]/75 leading-relaxed font-light">
                {artist.journey}
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6 bg-[#F4EFE6] p-6 rounded-sm border border-[#B89555]/20 h-fit">
            <h3 className="font-serif text-lg font-bold text-[#292522] border-b border-[#B89555]/20 pb-2">
              Atelier Details
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[#292522]/60 block font-medium">Primary Style</span>
                <span className="font-serif font-bold text-sm text-[#682C2C]">{artist.style}</span>
              </div>
              <div>
                <span className="text-[#292522]/60 block font-medium">Studio Mediums</span>
                <ul className="list-disc list-inside mt-1 space-y-1 text-[#292522]/80">
                  {artist.mediums?.map((m, idx) => (
                    <li key={idx}>{m}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-[#292522]/60 block font-medium">Studio Experience</span>
                <span className="font-semibold text-[#292522]">{artist.experienceYears} Years Dedicated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Artist's Collection Grid */}
        <div className="space-y-8 pt-4">
          <div className="flex items-center justify-between border-b border-[#B89555]/20 pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B89555] font-semibold">
                ORIGINAL WORKS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#292522] mt-1">
                Artworks by {artist.name} ({artistArtworks.length})
              </h2>
            </div>
          </div>

          <ArtworkGrid artworks={artistArtworks} />
        </div>

        {/* Related Artists */}
        <div className="border-t border-[#B89555]/20 pt-12">
          <h3 className="font-serif text-2xl font-bold text-[#292522] mb-8">
            Other Master Artisans of Central India
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherArtists.map((other) => (
              <Link
                key={other.id}
                href={`/artists/${other.slug}`}
                className="group flex gap-4 p-4 bg-[#F4EFE6] border border-[#B89555]/20 hover:border-[#682C2C] rounded-sm transition-all"
              >
                <img
                  src={other.avatar}
                  alt={other.name}
                  className="w-16 h-16 rounded-full object-cover border border-[#B89555]/40 shrink-0"
                />
                <div className="space-y-1">
                  <h4 className="font-serif text-base font-bold text-[#292522] group-hover:text-[#682C2C] transition-colors">
                    {other.name}
                  </h4>
                  <p className="text-xs text-[#682C2C]">{other.role}</p>
                  <p className="text-[11px] text-[#72765A]">{other.location}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
