"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { journalArticles as defaultArticles } from "@/data/journal";
import { api, getImageUrl } from "@/lib/api";
import { Clock, ArrowRight, ChevronRight, BookOpen } from "lucide-react";

export default function JournalPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [articlesList, setArticlesList] = useState(defaultArticles);

  useEffect(() => {
    let isMounted = true;
    api.getBlogs().then((backendBlogs) => {
      if (isMounted && backendBlogs && backendBlogs.length > 0) {
        setArticlesList(backendBlogs);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const categoriesList = [
    "all",
    "Heritage & History",
    "Artistic Traditions",
    "Craft & Artisans",
    "Technique & Mastery",
  ];

  const featuredArticle = articlesList[0] || defaultArticles[0];

  const filteredArticles = articlesList.filter((article) => {
    if (selectedCategory === "all") return true;
    return article.category === selectedCategory;
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
          <span className="text-[#682C2C] font-semibold">The Kalavrat Journal</span>
        </nav>

        {/* Page Header */}
        <div className="border-b border-[#B89555]/30 pb-8">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#682C2C]">
            ESSAYS & DISPATCHES
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#292522] mt-2">
            The Bundeli Kalavrat Journal
          </h1>
          <p className="text-xs sm:text-sm text-[#292522]/75 max-w-2xl mt-3 leading-relaxed font-light">
            In-depth perspectives on Bundelkhand’s palace murals, mineral pigment chemistry, sacred symbolism, and the living master artisans preserving India’s visual culture.
          </p>
        </div>

        {/* Featured Cover Story */}
        {featuredArticle && (
          <div className="bg-[#F4EFE6] border border-[#B89555]/30 rounded-sm overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 relative aspect-16/10 lg:aspect-auto">
              <img
                src={getImageUrl(featuredArticle.coverImage || featuredArticle.image || featuredArticle)}
                alt={featuredArticle.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-[#682C2C] text-[#F8F4EA] text-[10px] uppercase font-semibold tracking-wider px-3 py-1">
                Cover Story
              </span>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#72765A]">
                  <span>{featuredArticle.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredArticle.readTime || "6 min read"}
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#292522] leading-snug">
                  <Link
                    href={`/journal/${featuredArticle.slug}`}
                    className="hover:text-[#682C2C] transition-colors"
                  >
                    {featuredArticle.title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-[#292522]/75 leading-relaxed font-light">
                  {featuredArticle.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#B89555]/20 flex items-center justify-between">
                <span className="text-xs text-[#292522]/60">
                  By {featuredArticle.author} ({featuredArticle.authorRole})
                </span>
                <Link
                  href={`/journal/${featuredArticle.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#682C2C] hover:text-[#B89555] transition-colors"
                >
                  <span>Read Essay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Category Pills Filter */}
        <div className="flex flex-wrap gap-2 border-b border-[#B89555]/20 pb-4">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 text-xs font-serif rounded-xs transition-colors capitalize ${
                selectedCategory === cat
                  ? "bg-[#682C2C] text-[#F8F4EA] font-semibold"
                  : "bg-[#F4EFE6] text-[#292522] hover:bg-[#E9DFCD] border border-[#B89555]/30"
              }`}
            >
              {cat === "all" ? "All Essays" : cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, idx) => (
            <article
              key={article._id || article.id || article.slug || idx}
              className="bg-[#F4EFE6] border border-[#B89555]/30 rounded-sm overflow-hidden flex flex-col justify-between hover:shadow-xl transition-shadow group"
            >
              <Link
                href={`/journal/${article.slug}`}
                className="block relative aspect-16/10 overflow-hidden bg-[#E9DFCD]"
              >
                <img
                  src={getImageUrl(article.coverImage || article.image || article)}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-[#682C2C] text-[#F8F4EA] text-[10px] uppercase font-semibold tracking-wider px-2.5 py-0.5">
                  {article.category || "Heritage"}
                </span>
              </Link>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#72765A]">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime || "5 min read"}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#292522] group-hover:text-[#682C2C] transition-colors leading-snug">
                    <Link href={`/journal/${article.slug}`}>{article.title}</Link>
                  </h3>

                  <p className="text-xs text-[#292522]/70 leading-relaxed font-light line-clamp-3">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#B89555]/20 flex items-center justify-between text-xs">
                  <span className="text-[#292522]/60 truncate">{article.author}</span>
                  <Link
                    href={`/journal/${article.slug}`}
                    className="font-semibold uppercase tracking-wider text-[#682C2C] hover:text-[#B89555] flex items-center gap-1 transition-colors shrink-0"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
