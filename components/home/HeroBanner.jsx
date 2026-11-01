"use client";

import React, { useState, useEffect } from "react";
import { api, getImageUrl } from "@/lib/api";

const DEFAULT_POSTERS = [
  {
    id: "banner-1",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=2400&q=95",
    alt: "Bundeli Kalavrat Cultural Art Poster",
  },
  {
    id: "banner-2",
    image: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=2400&q=95",
    alt: "Sacred Earth & Mineral Heritage Poster",
  },
  {
    id: "banner-3",
    image: "https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&w=2400&q=95",
    alt: "Master Artisans Royal Collection Poster",
  },
];

export default function HeroBanner() {
  const [posters, setPosters] = useState(DEFAULT_POSTERS);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch banners from backend API on mount
  useEffect(() => {
    let isMounted = true;
    api.getBanners().then((backendBanners) => {
      if (isMounted && backendBanners && backendBanners.length > 0) {
        const mapped = backendBanners.map((b, idx) => ({
          id: b._id || b.id || `b-${idx}`,
          image: getImageUrl(b.image || b),
          alt: b.alt || b.title || "Bundeli Kalavrat Cultural Art Banner",
        }));
        setPosters(mapped);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-cycle through posters smoothly if multiple posters are configured
  useEffect(() => {
    if (posters.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % posters.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [posters.length]);

  return (
    <section className="relative w-full h-[60vh] sm:h-[75vh] lg:h-[85vh] min-h-[420px] max-h-[850px] bg-[#292522] overflow-hidden">
      {/* Poster Display */}
      {posters.map((poster, index) => (
        <div
          key={poster.id || index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <img
            src={poster.image}
            alt={poster.alt}
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}
    </section>
  );
}
