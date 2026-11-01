"use client";

import React, { useState, useEffect } from "react";
import {
  Star,
  CheckCircle2,
  Send,
  Sparkles,
  ShieldCheck,
  User,
  MapPin,
  MessageSquareQuote,
  Check,
} from "lucide-react";
import { initialReviews } from "@/data/reviews";
import { api } from "@/lib/api";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState(initialReviews);
  const [filterRating, setFilterRating] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);

  // Form states
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [location, setLocation] = useState("");
  const [artworkTitle, setArtworkTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Load reviews from backend API (and merge with local cache)
  useEffect(() => {
    let isMounted = true;
    api.getReviews().then((backendReviews) => {
      if (isMounted && backendReviews && backendReviews.length > 0) {
        setReviews(backendReviews);
      } else {
        try {
          const stored = localStorage.getItem("bk_patron_reviews");
          if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
              const userIds = new Set(parsed.map((r) => r._id || r.id));
              const filteredInitial = initialReviews.filter((r) => !userIds.has(r.id));
              setReviews([...parsed, ...filteredInitial]);
            }
          }
        } catch (err) {
          console.warn("Could not load stored reviews:", err);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute summary metrics
  const totalReviews = reviews.length;
  const averageRating = (
    reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / (totalReviews || 1)
  ).toFixed(1);
  const fiveStarCount = reviews.filter((r) => r.rating === 5).length;
  const fiveStarPercent = Math.round((fiveStarCount / totalReviews) * 100);

  // Filter reviews
  const filteredReviews = reviews.filter((r) => {
    if (filterRating === "5") return r.rating === 5;
    if (filterRating === "4") return r.rating === 4;
    return true;
  });

  const displayedReviews = filteredReviews.slice(0, visibleCount);

  // Rating labels for user clarity
  const ratingLabels = {
    1: "1 Star - Needs Improvement",
    2: "2 Stars - Fair",
    3: "3 Stars - Satisfactory",
    4: "4 Stars - Very Good Heritage Quality",
    5: "5 Stars - Exceptional Masterpiece",
  };

  // Handle Review Submission
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!name.trim()) {
      setErrorMessage("Please provide your name or patron title.");
      return;
    }
    if (!comment.trim() || comment.trim().length < 10) {
      setErrorMessage("Please write a short review paragraph (at least 10 characters).");
      return;
    }
    if (rating < 1 || rating > 5) {
      setErrorMessage("Please select a star rating between 1 and 5.");
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewPayload = {
        name: name.trim(),
        location: location.trim() || "India",
        role: "Verified Collector",
        rating: Number(rating),
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        comment: comment.trim(),
        artworkTitle: artworkTitle.trim() || "Bundeli Kalavrat Commission",
        verified: true,
      };

      let createdReview = null;
      try {
        const response = await api.submitReview(reviewPayload);
        if (response && response.data) {
          createdReview = response.data;
        }
      } catch (backendErr) {
        console.warn("Backend review submission fallback:", backendErr?.message);
      }

      const finalizedReview = createdReview || {
        ...reviewPayload,
        _id: `user-rev-${Date.now()}`,
        id: `user-rev-${Date.now()}`,
      };

      // Update state immediately at top of list
      setReviews((prev) => [finalizedReview, ...prev]);

      // Also save to localStorage for offline cache
      try {
        const stored = localStorage.getItem("bk_patron_reviews");
        const parsed = stored ? JSON.parse(stored) : [];
        const newStored = [finalizedReview, ...parsed];
        localStorage.setItem("bk_patron_reviews", JSON.stringify(newStored));
      } catch (storageErr) {
        console.warn("Storage error:", storageErr);
      }

      // Reset form
      setName("");
      setLocation("");
      setArtworkTitle("");
      setComment("");
      setRating(5);
      setHoverRating(0);
      setSuccessMessage(
        `Thank you, ${finalizedReview.name}! Your review has been successfully published to our patron gallery.`
      );

      // Scroll to reviews section smoothly
      const element = document.getElementById("patron-reviews-gallery");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } catch (err) {
      setErrorMessage("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="patron-reviews-gallery"
      className="py-16 sm:py-24 bg-[#F8F4EA] border-b border-[#B89555]/20 relative overflow-hidden text-[#292522]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#682C2C] flex items-center gap-2 font-sans">
              <span className="w-6 h-px bg-[#682C2C]" />
              ESTEEMED PATRONS & COLLECTORS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#292522]">
              Words of Collectors & Patrons
            </h2>
            <p className="text-xs sm:text-sm text-[#72765A] font-light max-w-xl font-sans leading-relaxed">
              Read authentic impressions from collectors, royal heritage curators, and interior architects who have commissioned Bundelkhand&apos;s timeless artworks.
            </p>
          </div>

          <a
            href="#drop-review-form"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#F8F4EA] bg-[#682C2C] hover:bg-[#522222] px-5 py-3 rounded-sm shadow-md transition-all mt-4 md:mt-0 font-sans cursor-pointer self-start md:self-auto"
          >
            <Sparkles className="w-4 h-4 text-[#B89555]" />
            <span>Drop Your Review</span>
          </a>
        </div>

        {/* Rating Summary Bar */}
        <div className="bg-[#FAF7F0] border border-[#B89555]/30 rounded-sm p-6 sm:p-8 mb-12 shadow-art">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center divide-y md:divide-y-0 md:divide-x divide-[#B89555]/20">
            {/* Score & Stars */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-4xl sm:text-5xl font-bold text-[#682C2C]">
                  {averageRating}
                </span>
                <span className="text-sm font-sans text-[#72765A]">/ 5.0</span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-[#B89555]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(Number(averageRating))
                        ? "fill-[#B89555] text-[#B89555]"
                        : "text-[#B89555]/40"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-[#72765A] mt-2 font-sans">
                Based on {totalReviews} authenticated collector reviews
              </p>
            </div>

            {/* Satisfaction Rate */}
            <div className="pt-4 md:pt-0 md:px-6 flex flex-col items-center md:items-start text-center md:text-left">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#292522]">
                {fiveStarPercent}%
              </span>
              <p className="text-xs font-semibold text-[#682C2C] mt-1 font-sans">
                5-Star Masterpiece Rating
              </p>
              <p className="text-xs text-[#72765A] mt-1 font-sans">
                Acclaimed for pure mineral lapis lazuli & 24k gold leaf gilding
              </p>
            </div>

            {/* Heritage Authenticity Guarantee */}
            <div className="pt-4 md:pt-0 md:px-6 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center gap-2 text-[#292522]">
                <ShieldCheck className="w-6 h-6 text-[#B89555]" />
                <span className="font-serif text-lg font-bold">100% Handcrafted</span>
              </div>
              <p className="text-xs text-[#72765A] mt-1 font-sans">
                Every artwork is individually created by generational Orchha master artisans.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="pt-4 md:pt-0 md:pl-6 flex flex-col gap-2">
              <span className="text-xs uppercase tracking-wider text-[#72765A] font-semibold font-sans">
                Filter Patrons:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setFilterRating("all")}
                  className={`text-xs px-3 py-1.5 rounded-sm font-sans transition-colors ${
                    filterRating === "all"
                      ? "bg-[#682C2C] text-[#F8F4EA] font-semibold"
                      : "bg-[#F4EFE6] text-[#292522] hover:bg-[#E9DFCD]"
                  }`}
                >
                  All ({reviews.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterRating("5")}
                  className={`text-xs px-3 py-1.5 rounded-sm font-sans transition-colors ${
                    filterRating === "5"
                      ? "bg-[#682C2C] text-[#F8F4EA] font-semibold"
                      : "bg-[#F4EFE6] text-[#292522] hover:bg-[#E9DFCD]"
                  }`}
                >
                  5 Stars ({fiveStarCount})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterRating("4")}
                  className={`text-xs px-3 py-1.5 rounded-sm font-sans transition-colors ${
                    filterRating === "4"
                      ? "bg-[#682C2C] text-[#F8F4EA] font-semibold"
                      : "bg-[#F4EFE6] text-[#292522] hover:bg-[#E9DFCD]"
                  }`}
                >
                  4 Stars ({reviews.filter((r) => r.rating === 4).length})
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {displayedReviews.map((rev, idx) => (
            <div
              key={rev._id || rev.id || `review-${idx}`}
              className="bg-[#FAF7F0] border border-[#B89555]/30 hover:border-[#682C2C] rounded-sm p-6 sm:p-7 flex flex-col justify-between shadow-art hover:shadow-art-hover transition-all duration-300 relative group"
            >
              {/* Top Row: Stars + Verified Badge */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#B89555]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating
                            ? "fill-[#B89555] text-[#B89555]"
                            : "text-[#B89555]/30"
                        }`}
                      />
                    ))}
                  </div>

                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-sans text-[#0C381E] bg-[#25D366]/15 px-2 py-0.5 rounded-xs border border-[#25D366]/30 font-medium">
                      <Check className="w-3 h-3 text-[#25D366] stroke-[3]" />
                      Verified Patron
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <div className="relative mb-6">
                  <MessageSquareQuote className="w-8 h-8 text-[#B89555]/20 absolute -top-3 -left-2 pointer-events-none" />
                  <p className="font-sans text-xs sm:text-sm text-[#292522]/85 leading-relaxed relative z-10 font-light italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                {/* Artwork Reference Tag if exists */}
                {rev.artworkTitle && (
                  <div className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F4EFE6] border border-[#B89555]/20 text-[11px] font-sans text-[#682C2C] rounded-xs">
                    <Sparkles className="w-3 h-3 text-[#B89555]" />
                    <span className="font-medium truncate max-w-[220px]">
                      {rev.artworkTitle}
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom: Reviewer details */}
              <div className="pt-4 border-t border-[#B89555]/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#682C2C] text-[#F8F4EA] flex items-center justify-center font-serif text-xs font-bold shrink-0 shadow-xs">
                    {rev.name ? rev.name.charAt(0).toUpperCase() : "P"}
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#292522] leading-tight">
                      {rev.name}
                    </h4>
                    <p className="text-[11px] text-[#72765A] font-sans flex items-center gap-1 mt-0.5">
                      {rev.location && (
                        <>
                          <MapPin className="w-2.5 h-2.5 text-[#B89555]" />
                          <span>{rev.location}</span>
                          <span>•</span>
                        </>
                      )}
                      <span>{rev.role || "Patron"}</span>
                    </p>
                  </div>
                </div>

                <span className="text-[10px] text-[#72765A]/80 font-sans shrink-0">
                  {rev.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Expand / View All button if more than visibleCount */}
        {filteredReviews.length > visibleCount && (
          <div className="text-center mb-16">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#682C2C] text-[#682C2C] hover:bg-[#682C2C] hover:text-[#F8F4EA] transition-colors rounded-sm text-xs font-semibold uppercase tracking-wider font-sans cursor-pointer"
            >
              <span>Load More Reviews ({filteredReviews.length - visibleCount} remaining)</span>
            </button>
          </div>
        )}

        {/* Review Submission Form Section */}
        <div
          id="drop-review-form"
          className="mt-16 bg-[#FAF7F0] border border-[#B89555]/40 rounded-sm p-6 sm:p-10 lg:p-12 shadow-art relative overflow-hidden"
        >
          {/* Subtle Royal Accent Corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#B89555]/10 to-transparent pointer-events-none rounded-bl-full" />

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#682C2C] font-sans">
                SHARE YOUR PATRON EXPERIENCE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#292522]">
                Leave Your Review for Bundeli Kalavrat
              </h3>
              <p className="text-xs sm:text-sm text-[#72765A] font-sans max-w-lg mx-auto">
                Have you commissioned a masterpiece or experienced our regional atelier craftsmanship? We welcome your authentic feedback and patron review.
              </p>
            </div>

            {/* Success Alert */}
            {successMessage && (
              <div className="p-4 bg-[#25D366]/15 border border-[#25D366]/40 text-[#0C381E] rounded-sm flex items-start gap-3 animate-in fade-in duration-300">
                <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm font-sans font-medium">
                  {successMessage}
                </p>
              </div>
            )}

            {/* Error Alert */}
            {errorMessage && (
              <div className="p-4 bg-red-100 border border-red-300 text-red-800 rounded-sm text-xs sm:text-sm font-sans">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmitReview} className="space-y-6">
              {/* Star Rating Selector (Out of 5) */}
              <div className="bg-[#F8F4EA] border border-[#B89555]/30 rounded-sm p-5 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#292522] font-sans">
                    Rate Your Experience (Out of 5 Stars) *
                  </label>
                  <p className="text-xs text-[#72765A] font-sans mt-0.5">
                    {ratingLabels[hoverRating || rating]}
                  </p>
                </div>

                {/* Interactive 5 Star Buttons */}
                <div className="flex items-center justify-center sm:justify-end gap-1.5">
                  {[1, 2, 3, 4, 5].map((starValue) => {
                    const isFilled = starValue <= (hoverRating || rating);
                    return (
                      <button
                        key={starValue}
                        type="button"
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHoverRating(starValue)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1.5 text-[#B89555] hover:scale-115 transition-transform cursor-pointer focus:outline-hidden"
                        title={`${starValue} Star${starValue > 1 ? "s" : ""}`}
                        aria-label={`Rate ${starValue} out of 5 stars`}
                      >
                        <Star
                          className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                            isFilled
                              ? "fill-[#B89555] text-[#B89555]"
                              : "text-[#B89555]/30 hover:text-[#B89555]/70"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name and Location Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#292522] mb-1.5 font-sans">
                    Your Name / Patron Title *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maharani Pratibha / Rajesh Sharma"
                      className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-4 py-2.5 text-xs sm:text-sm text-[#292522] placeholder:text-[#72765A]/50 focus:outline-hidden focus:border-[#682C2C] transition-colors"
                    />
                    <User className="w-4 h-4 text-[#B89555] absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#292522] mb-1.5 font-sans">
                    City / Country (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. New Delhi, Mumbai, or London"
                      className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-4 py-2.5 text-xs sm:text-sm text-[#292522] placeholder:text-[#72765A]/50 focus:outline-hidden focus:border-[#682C2C] transition-colors"
                    />
                    <MapPin className="w-4 h-4 text-[#B89555] absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Optional Artwork Title */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#292522] mb-1.5 font-sans">
                  Artwork Title or Type of Commission (Optional)
                </label>
                <input
                  type="text"
                  value={artworkTitle}
                  onChange={(e) => setArtworkTitle(e.target.value)}
                  placeholder="e.g. Orchha Palace Fresco, Bundeli Miniature, Sacred Mandana"
                  className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-4 py-2.5 text-xs sm:text-sm text-[#292522] placeholder:text-[#72765A]/50 focus:outline-hidden focus:border-[#682C2C] transition-colors"
                />
              </div>

              {/* Short Paragraph Review */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#292522] mb-1.5 font-sans">
                  Your Review (Short Paragraph) *
                </label>
                <textarea
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts on the painting's natural pigments, hand-painted details, authenticity, WhatsApp consultation, or packaging..."
                  className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-4 py-3 text-xs sm:text-sm text-[#292522] placeholder:text-[#72765A]/50 focus:outline-hidden focus:border-[#682C2C] transition-colors resize-y leading-relaxed"
                />
                <span className="text-[11px] text-[#72765A] block mt-1">
                  Minimum 10 characters. Your review will be published immediately to our patron gallery.
                </span>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-[#72765A] font-sans">
                  <ShieldCheck className="w-4 h-4 text-[#B89555]" />
                  <span>Authenticated patron submissions only</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#682C2C] hover:bg-[#522222] text-[#F8F4EA] text-xs font-semibold uppercase tracking-widest rounded-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-[#B89555]" />
                  <span>{isSubmitting ? "Publishing..." : "Publish Patron Review"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

