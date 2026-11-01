"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { artworks } from "@/data/artworks";
import { categories } from "@/data/categories";
import { api } from "@/lib/api";
import ArtworkGrid from "@/components/artwork/ArtworkGrid";
import ArtworkFilters from "@/components/artwork/ArtworkFilters";
import { Filter, SlidersHorizontal, ArrowUpDown, X, ChevronRight } from "lucide-react";

function ShopContent() {
  const searchParams = useSearchParams();

  // Initial filter state from URL params
  const initialCategory = searchParams.get("category") || "";
  const initialStyle = searchParams.get("style") || "";
  const initialArtist = searchParams.get("artist") || "";
  const initialSearch = searchParams.get("search") || "";
  const initialSort = searchParams.get("sort") || "featured";

  const [filters, setFilters] = useState({
    search: initialSearch,
    category: initialCategory,
    styles: initialStyle ? [initialStyle] : [],
    artist: initialArtist,
    minPrice: null,
    maxPrice: null,
    size: "",
    orientation: "",
    availability: "",
  });

  const [sortBy, setSortBy] = useState(initialSort);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [allArtworks, setAllArtworks] = useState(artworks);

  // Fetch dynamic artworks from backend
  useEffect(() => {
    let isMounted = true;
    api.getArtworks().then((backendArtworks) => {
      if (isMounted && backendArtworks && backendArtworks.length > 0) {
        setAllArtworks(backendArtworks);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Sync if URL query params change
  useEffect(() => {
    const cat = searchParams.get("category");
    const st = searchParams.get("style");
    const art = searchParams.get("artist");
    const q = searchParams.get("search");
    const sort = searchParams.get("sort");

    setFilters((prev) => ({
      ...prev,
      category: cat || prev.category,
      styles: st ? [st] : prev.styles,
      artist: art || prev.artist,
      search: q || prev.search,
    }));

    if (sort) setSortBy(sort);
  }, [searchParams]);

  // Reset filters
  const resetFilters = () => {
    setFilters({
      search: "",
      category: "",
      styles: [],
      artist: "",
      minPrice: null,
      maxPrice: null,
      size: "",
      orientation: "",
      availability: "",
    });
    setCurrentPage(1);
  };

  // Filtered & Sorted artworks
  const filteredArtworks = useMemo(() => {
    return allArtworks.filter((item) => {
      // Search
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchArtist = item.artist.toLowerCase().includes(q);
        const matchStyle = item.style.toLowerCase().includes(q);
        const matchCat = item.category.toLowerCase().includes(q);
        if (!matchTitle && !matchArtist && !matchStyle && !matchCat) return false;
      }

      // Category
      if (filters.category && item.categorySlug !== filters.category) {
        return false;
      }

      // Styles
      if (filters.styles.length > 0 && !filters.styles.includes(item.style)) {
        return false;
      }

      // Artist
      if (filters.artist && item.artistSlug !== filters.artist) {
        return false;
      }

      // Price
      if (filters.minPrice !== null && (item.price < filters.minPrice || item.isPriceOnRequest)) {
        return false;
      }
      if (filters.maxPrice !== null && (item.price > filters.maxPrice || item.isPriceOnRequest)) {
        return false;
      }

      // Size
      if (filters.size && item.size !== filters.size) {
        return false;
      }

      // Orientation
      if (filters.orientation && item.orientation !== filters.orientation) {
        return false;
      }

      // Availability
      if (filters.availability) {
        if (filters.availability === "In Stock" && item.isPriceOnRequest) return false;
        if (filters.availability === "Price on Request" && !item.isPriceOnRequest) return false;
      }

      return true;
    });
  }, [filters]);

  // Sort
  const sortedArtworks = useMemo(() => {
    const list = [...filteredArtworks];
    switch (sortBy) {
      case "price-asc":
        return list.sort((a, b) => (a.price || 0) - (b.price || 0));
      case "price-desc":
        return list.sort((a, b) => (b.price || 0) - (a.price || 0));
      case "newest":
        return list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case "title-asc":
        return list.sort((a, b) => a.title.localeCompare(b.title));
      case "featured":
      default:
        return list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  }, [filteredArtworks, sortBy]);

  // Pagination
  const totalPages = Math.ceil(sortedArtworks.length / itemsPerPage);
  const paginatedArtworks = sortedArtworks.slice(0, currentPage * itemsPerPage);

  const currentCategoryName = filters.category
    ? categories.find((c) => c.slug === filters.category)?.name
    : null;

  return (
    <div className="py-8 lg:py-12 bg-[#F8F4EA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-[#292522]/60 mb-6 font-sans">
          <Link href="/" className="hover:text-[#682C2C] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#B89555]" />
          <Link href="/shop" className="hover:text-[#682C2C] transition-colors">
            Art Showcase
          </Link>
          {currentCategoryName && (
            <>
              <ChevronRight className="w-3 h-3 text-[#B89555]" />
              <span className="text-[#682C2C] font-semibold">{currentCategoryName}</span>
            </>
          )}
        </nav>

        {/* Page Title & Intro Banner */}
        <div className="border-b border-[#B89555]/30 pb-8 mb-8">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#682C2C]">
            LIVING HERITAGE SHOWCASE & COMMISSIONS
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#292522] mt-2">
            {currentCategoryName || "Authentic Art Showcase"}
          </h1>
          <p className="text-xs sm:text-sm text-[#292522]/75 max-w-2xl mt-2 leading-relaxed font-light">
            Browse our living archive of Bundelkhand court frescoes, devotional miniatures, Sanjhi reliefs, and lost-wax bronze sculptures. Select any artwork to commission a custom handcrafted piece directly with our master artisans on WhatsApp.
          </p>
        </div>

        {/* Toolbar: Results Count, Mobile Filter Button, Sort Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#B89555]/20 mb-8">
          {/* Results Count & Search Query notice */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#292522]/70">
              Showing <strong className="text-[#682C2C] font-semibold">{paginatedArtworks.length}</strong> of{" "}
              <strong>{sortedArtworks.length}</strong> masterworks
            </span>
            {filters.search && (
              <span className="text-xs bg-[#E9DFCD] text-[#292522] px-2 py-0.5 rounded-xs flex items-center gap-1">
                Keyword: "{filters.search}"
                <button onClick={() => setFilters({ ...filters, search: "" })}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 justify-between sm:justify-end">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-[#F4EFE6] border border-[#B89555]/40 text-xs font-semibold uppercase tracking-wider text-[#292522] rounded-xs"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#682C2C]" />
              <span>Filters</span>
            </button>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#292522]/60 hidden sm:inline">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 bg-[#F4EFE6] border border-[#B89555]/40 text-xs text-[#292522] rounded-xs font-serif font-medium focus:outline-none focus:border-[#682C2C]"
              >
                <option value="featured">Curator Featured</option>
                <option value="newest">Newest Additions</option>
                <option value="title-asc">Alphabetical (A - Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Left Sidebar Filters (3 Cols) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 bg-[#F4EFE6] p-5 rounded-sm border border-[#B89555]/20 shadow-sm">
            <ArtworkFilters
              filters={filters}
              setFilters={setFilters}
              resetFilters={resetFilters}
              totalResults={sortedArtworks.length}
            />
          </aside>

          {/* Right Artwork Grid (9 Cols) */}
          <div className="lg:col-span-9 space-y-8">
            <ArtworkGrid
              artworks={paginatedArtworks}
              onResetFilters={resetFilters}
            />

            {/* Load More Button if remaining */}
            {paginatedArtworks.length < sortedArtworks.length && (
              <div className="pt-8 text-center">
                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="px-8 py-3.5 bg-[#682C2C] hover:bg-[#4A1B1B] text-[#F8F4EA] text-xs uppercase tracking-widest font-semibold rounded-sm shadow-md transition-colors"
                >
                  Load More Artworks ({sortedArtworks.length - paginatedArtworks.length} Remaining)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Slide-out Drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-[#292522]/80 backdrop-blur-sm"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-[#F8F4EA] text-[#292522] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#B89555]/20 bg-[#F4EFE6]">
              <h3 className="font-serif text-base font-bold text-[#292522]">
                Refine Art Collection
              </h3>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-1.5 text-[#292522] hover:text-[#682C2C]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <ArtworkFilters
                filters={filters}
                setFilters={setFilters}
                resetFilters={resetFilters}
                totalResults={sortedArtworks.length}
                isMobileDrawer={true}
                onCloseMobile={() => setIsMobileFiltersOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center">
          <div className="w-8 h-8 border-2 border-[#682C2C] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-serif text-sm text-[#292522]">Loading Bundeli Kalavrat Archive...</p>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
