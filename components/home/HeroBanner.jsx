"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { api, getImageUrl } from "@/lib/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DEFAULT_POSTERS = [
  {
    id: "banner-1",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=2400&q=95",
    alt: "Bundeli Kalavrat Cultural Art Poster",
    link: "/shop",
  },
  {
    id: "banner-2",
    image: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=2400&q=95",
    alt: "Sacred Earth & Mineral Heritage Poster",
    link: "/collections",
  },
  {
    id: "banner-3",
    image: "https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&w=2400&q=95",
    alt: "Master Artisans Royal Collection Poster",
    link: "/heritage",
  },
];

export default function HeroBanner() {
  const [posters, setPosters] = useState(DEFAULT_POSTERS);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Touch & Drag Gesture Tracking
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef(null);

  // Fetch active banners from backend API on mount
  useEffect(() => {
    let isMounted = true;
    api.getBanners().then((backendBanners) => {
      if (isMounted && backendBanners && backendBanners.length > 0) {
        const activeOnly = backendBanners.filter((b) => b.isActive !== false);
        const mapped = (activeOnly.length > 0 ? activeOnly : backendBanners).map((b, idx) => ({
          id: b._id || b.id || `b-${idx}`,
          image: getImageUrl(b.image || b),
          alt: b.alt || b.title || "Bundeli Kalavrat Cultural Art Banner",
          link: b.link || "",
        }));
        setPosters(mapped);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const totalSlides = posters.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    pauseTemporarily();
  };

  const pauseTemporarily = () => {
    setIsPaused(true);
    setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  // Auto-cycle through slides smoothly if multiple slides exist
  useEffect(() => {
    if (totalSlides <= 1 || isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(timer);
  }, [totalSlides, isPaused, currentSlide]);

  // Touch handlers for mobile and tablet devices
  const handleTouchStart = (e) => {
    setIsPaused(true);
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null);
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    if (touchStartX === null) return;
    const currentX = e.targetTouches[0].clientX;
    setTouchEndX(currentX);
    setDragOffset(currentX - touchStartX);
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const distance = touchStartX - touchEndX;
      const minSwipeDistance = 45; // Minimum px to register swipe

      if (distance > minSwipeDistance) {
        // Swiped Left -> Next Slide
        nextSlide();
      } else if (distance < -minSwipeDistance) {
        // Swiped Right -> Previous Slide
        prevSlide();
      }
    }

    setTouchStartX(null);
    setTouchEndX(null);
    setDragOffset(0);
    pauseTemporarily();
  };

  // Mouse drag handlers for desktop devices
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only primary mouse button
    setIsPaused(true);
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    setDragOffset(currentX - dragStartX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const minDragDistance = 50;
    if (dragOffset < -minDragDistance) {
      // Dragged Left -> Next Slide
      nextSlide();
    } else if (dragOffset > minDragDistance) {
      // Dragged Right -> Previous Slide
      prevSlide();
    }

    setDragOffset(0);
    pauseTemporarily();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
      pauseTemporarily();
    } else if (e.key === "ArrowRight") {
      nextSlide();
      pauseTemporarily();
    }
  };

  return (
    <section
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className={`relative w-full h-[60vh] sm:h-[75vh] lg:h-[85vh] min-h-[420px] max-h-[850px] bg-[#292522] overflow-hidden select-none focus:outline-hidden ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      style={{ touchAction: "pan-y" }}
      aria-label="Bundeli Kalavrat Hero Carousel"
    >
      {/* Horizontal Sliding Track for Smooth Drag & Swipe */}
      <div
        className={`flex w-full h-full ${
          isDragging ? "transition-none" : "transition-transform duration-700 ease-out"
        }`}
        style={{
          transform: `translateX(calc(-${currentSlide * 100}% + ${dragOffset}px))`,
        }}
      >
        {posters.map((poster, index) => {
          const content = (
            <img
              src={poster.image}
              alt={poster.alt}
              className="w-full h-full object-cover object-center pointer-events-none select-none"
              draggable={false}
              loading={index === 0 ? "eager" : "lazy"}
            />
          );

          return (
            <div
              key={poster.id || index}
              className="w-full h-full shrink-0 relative bg-[#292522]"
            >
              {poster.link && !isDragging ? (
                <Link
                  href={poster.link}
                  className="block w-full h-full cursor-pointer"
                  tabIndex={index === currentSlide ? 0 : -1}
                >
                  {content}
                </Link>
              ) : (
                content
              )}
            </div>
          );
        })}
      </div>

      {/* Manual Navigation Controls: Left & Right Arrows */}
      {totalSlides > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
              pauseTemporarily();
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#292522]/65 hover:bg-[#682C2C] text-[#F8F4EA] border border-[#B89555]/50 flex items-center justify-center backdrop-blur-xs transition-all duration-300 shadow-2xl z-20 cursor-pointer group hover:scale-105 active:scale-95"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#B89555] group-hover:text-[#F8F4EA] transition-colors" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
              pauseTemporarily();
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#292522]/65 hover:bg-[#682C2C] text-[#F8F4EA] border border-[#B89555]/50 flex items-center justify-center backdrop-blur-xs transition-all duration-300 shadow-2xl z-20 cursor-pointer group hover:scale-105 active:scale-95"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#B89555] group-hover:text-[#F8F4EA] transition-colors" />
          </button>
        </>
      )}

      {/* Slide Counter Badge (Top-Right) */}
      {totalSlides > 1 && (
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 px-3 py-1 rounded-full bg-[#292522]/75 backdrop-blur-xs border border-[#B89555]/40 text-[#F8F4EA] font-mono text-[11px] font-semibold tracking-wider flex items-center gap-1.5 shadow-xl select-none">
          <span className="text-[#B89555]">0{currentSlide + 1}</span>
          <span className="text-[#F8F4EA]/40">/</span>
          <span>0{totalSlides}</span>
        </div>
      )}

      {/* Manual Slide Pagination Indicators (Bottom-Center) */}
      {totalSlides > 1 && (
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-2.5 z-20 bg-[#292522]/60 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-[#B89555]/30 shadow-2xl">
          {posters.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(idx);
              }}
              className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlide
                  ? "w-7 sm:w-9 bg-[#B89555] shadow-sm"
                  : "w-2 sm:w-2.5 bg-[#F8F4EA]/40 hover:bg-[#F8F4EA]/80"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Subtle Bottom Vignette Gradient */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#292522]/50 to-transparent pointer-events-none z-10" />
    </section>
  );
}
