"use client";

import HeroBanner from "@/components/home/HeroBanner";
import ExploreCategories from "@/components/home/ExploreCategories";
import ExploreArtworks from "@/components/home/ExploreArtworks";
import NewArrivals from "@/components/home/NewArrivals";
import Achievements from "@/components/home/Achievements";
import CelebrityPaintings from "@/components/home/CelebrityPaintings";
import NewsSection from "@/components/home/NewsSection";
import BlogSection from "@/components/home/BlogSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Section 1: Hero Banner */}
      <HeroBanner />

      {/* Section 2: Explore Our Categories (Full Rounded Showcase) */}
      <ExploreCategories />

      {/* Section 3: Explore Artworks Section */}
      <ExploreArtworks />

      {/* Section 4: New Arrivals (Fresh from Regional Ateliers) */}
      <NewArrivals />

      {/* Section 5: Paintings Sold to Celebrities & Esteemed Patrons */}
      <CelebrityPaintings />

      {/* Section 6: Cultural Achievements Section */}
      <Achievements />

      {/* Section 7: Latest News & Press Dispatches */}
      <NewsSection />

      {/* Section 8: Curated Blog & Heritage Stories */}
      <BlogSection />

      {/* Section 9: Patron Reviews & Testimonials with Review Form */}
      <ReviewsSection />

      {/* Section 10: Why Choose Bundeli Kalavrat */}
      <WhyChooseUs />
    </div>
  );
}
