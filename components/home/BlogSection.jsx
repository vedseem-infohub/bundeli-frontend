"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { journalArticles as defaultArticles } from "@/data/journal";
import { api, getImageUrl } from "@/lib/api";
import { Clock, Calendar, ArrowRight, Feather } from "lucide-react";

export default function BlogSection() {
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

  const articles = articlesList.slice(0, 3);

  return (
    <section className="py-8 sm:py-12 lg:py-14 bg-[#F8F4EA] border-b border-[#B89555]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#682C2C] flex items-center gap-2 font-sans">
              <span className="w-6 h-px bg-[#682C2C]" />
              THE KALAVRAT JOURNAL & ESSAYS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#292522]">
              Stories of Art, Heritage & Mastery
            </h2>
            <p className="text-xs sm:text-sm text-[#72765A] font-light max-w-xl font-sans leading-relaxed">
              In-depth essays on 17th-century palace fresco techniques, sacred Indian geometry, natural pigment chemistry, and living craft lineages.
            </p>
          </div>

          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#682C2C] hover:text-[#B89555] border-b border-[#682C2C] pb-1 transition-colors mt-4 md:mt-0 group shrink-0 font-sans"
          >
            <span>View All Journal Essays ({articlesList.length})</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* 3 Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((article, idx) => {
            const articleImg = getImageUrl(article.coverImage || article.image || article);
            return (
              <article
                key={article._id || article.id || article.slug || idx}
                className="group flex flex-col bg-[#FAF7F0] border border-[#B89555]/30 hover:border-[#682C2C] rounded-sm overflow-hidden shadow-art hover:shadow-art-hover transition-all duration-500 hover:-translate-y-1"
              >
                {/* Cover Image Container */}
                <Link
                  href={`/journal/${article.slug}`}
                  className="block relative aspect-16/10 w-full overflow-hidden bg-[#E9DFCD]"
                >
                  <img
                    src={articleImg}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#292522]/60 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-[#682C2C] text-[#F8F4EA] text-[10px] font-sans uppercase font-semibold tracking-wider px-2.5 py-0.5 border border-[#B89555]/40 shadow-xs">
                    {article.category || "Heritage & History"}
                  </span>
                </Link>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-[11px] font-sans text-[#72765A]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#B89555]" />
                        {article.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#B89555]" />
                        {article.readTime || "5 min read"}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#292522] group-hover:text-[#682C2C] transition-colors leading-snug line-clamp-2">
                      <Link href={`/journal/${article.slug}`}>{article.title}</Link>
                    </h3>

                    <p className="font-sans text-xs sm:text-[13px] text-[#292522]/75 font-light leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>
                  </div>

                  {/* Author Byline & Link */}
                  <div className="pt-4 border-t border-[#B89555]/15 flex items-center justify-between font-sans">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#682C2C] text-[#B89555] flex items-center justify-center">
                        <Feather className="w-3 h-3" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-[#292522]">
                          {article.author || "Curatorial Guild"}
                        </span>
                        <span className="text-[9px] text-[#72765A]">
                          {article.authorRole || "Senior Historian"}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/journal/${article.slug}`}
                      className="text-xs font-semibold uppercase tracking-wider text-[#682C2C] group-hover:text-[#B89555] flex items-center gap-1 transition-colors shrink-0"
                    >
                      <span>Read Essay</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
