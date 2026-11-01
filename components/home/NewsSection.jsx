"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { newsDispatches as defaultNews } from "@/data/news";
import { api, getImageUrl } from "@/lib/api";
import {
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react";

export default function NewsSection() {
  const [newsList, setNewsList] = useState(defaultNews);

  useEffect(() => {
    let isMounted = true;
    api.getNews().then((backendNews) => {
      if (isMounted && backendNews && backendNews.length > 0) {
        setNewsList(backendNews);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const featuredNews = newsList[0] || defaultNews[0];
  const sideNews = newsList.slice(1, 4);

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F0] border-b border-[#B89555]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#682C2C] flex items-center gap-2 font-sans">
              <span className="w-6 h-px bg-[#682C2C]" />
              GALLERY DISPATCHES • PRESS & EXHIBITIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#292522]">
              Latest News & Press Releases
            </h2>
            <p className="text-xs sm:text-sm text-[#72765A] font-light max-w-xl font-sans leading-relaxed">
              Exhibition announcements, national artisan honors, press features, and cultural guild initiatives from our Orchha ateliers.
            </p>
          </div>

          <div className="flex items-center gap-3 mt-4 md:mt-0 font-sans">
            <Link
              href="/contact?subject=press"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#682C2C] hover:text-[#B89555] border-b border-[#682C2C] pb-1 transition-colors group shrink-0"
            >
              <span>Curator Press Desk & Media Enquiries</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Editorial Press Room Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Featured News Card (7 cols) */}
          {featuredNews && (
            <div className="lg:col-span-7 bg-[#F8F4EA] border border-[#B89555]/30 rounded-sm overflow-hidden shadow-art hover:shadow-art-hover transition-all duration-500 flex flex-col justify-between group">
              <div className="relative aspect-16/10 w-full overflow-hidden bg-[#E9DFCD]">
                <img
                  src={getImageUrl(featuredNews.image || featuredNews)}
                  alt={featuredNews.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#292522]/90 via-[#292522]/40 to-transparent" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 bg-[#682C2C] text-[#F8F4EA] text-[10px] uppercase font-sans font-semibold tracking-wider rounded-xs border border-[#B89555]/40 shadow-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B89555] animate-pulse" />
                    {featuredNews.badge || "PRESS & DISPATCH"}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-[#F8F4EA]">
                  <span className="text-[11px] font-sans text-[#B89555] font-semibold tracking-wide block mb-1">
                    {featuredNews.outlet || "Bundeli Kalavrat Press"}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold leading-snug drop-shadow-sm group-hover:text-white transition-colors">
                    {featuredNews.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <p className="font-sans text-xs sm:text-sm text-[#292522]/80 leading-relaxed font-light">
                  {featuredNews.summary}
                </p>

                <div className="pt-4 border-t border-[#B89555]/20 flex items-center justify-between font-sans text-xs">
                  <div className="flex items-center gap-3 text-[#72765A]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#B89555]" />
                      {featuredNews.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#B89555]" />
                      {featuredNews.readTime || "4 min read"}
                    </span>
                  </div>

                  <Link
                    href={featuredNews.link || `/contact?subject=${featuredNews.slug || "press"}`}
                    className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider text-[#682C2C] hover:text-[#B89555] transition-colors"
                  >
                    <span>Read Full Dispatch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Side News Feed (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {sideNews.map((news, idx) => (
              <div
                key={news._id || news.id || idx}
                className="bg-[#F8F4EA] border border-[#B89555]/25 rounded-sm p-5 hover:border-[#682C2C] shadow-xs hover:shadow-art transition-all duration-300 flex gap-4 group"
              >
                <div className="relative w-24 sm:w-28 h-24 sm:h-28 shrink-0 rounded-xs overflow-hidden bg-[#E9DFCD]">
                  <img
                    src={getImageUrl(news.image || news)}
                    alt={news.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[9px] uppercase tracking-wider font-sans font-bold text-[#682C2C]">
                        {news.badge || "DISPATCH"}
                      </span>
                      <span className="text-[10px] font-sans text-[#72765A]">
                        {news.date}
                      </span>
                    </div>

                    <h4 className="font-serif text-sm sm:text-base font-bold text-[#292522] group-hover:text-[#682C2C] transition-colors leading-snug line-clamp-2">
                      <Link href={news.link || `/contact?subject=${news.slug || "press"}`}>{news.title}</Link>
                    </h4>

                    <p className="font-sans text-[11px] text-[#292522]/70 mt-1 line-clamp-2 leading-relaxed">
                      {news.summary}
                    </p>
                  </div>

                  <div className="mt-2 pt-2 border-t border-[#B89555]/15 flex items-center justify-between text-[11px] font-sans">
                    <span className="text-[#B89555] font-medium truncate">
                      {news.outlet || "Bundeli Press"}
                    </span>
                    <Link
                      href={news.link || `/contact?subject=${news.slug || "press"}`}
                      className="text-[#682C2C] group-hover:text-[#B89555] font-semibold flex items-center gap-1 shrink-0 transition-colors"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
