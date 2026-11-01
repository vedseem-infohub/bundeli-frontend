"use client";

import React from "react";
import Link from "next/link";
import { journalArticles } from "@/data/journal";
import { ArrowRight, Clock } from "lucide-react";

export default function JournalSection() {
  const articles = journalArticles.slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-[#F4EFE6] border-b border-[#B89555]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#682C2C] flex items-center gap-2">
              <span className="w-6 h-px bg-[#682C2C]" />
              THE KALAVRAT JOURNAL
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#292522]">
              Journal and Stories
            </h2>
            <p className="text-xs sm:text-sm text-[#292522]/70 font-light">
              Essays on architectural history, traditional pigment chemistry, and living craft lineages.
            </p>
          </div>

          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#682C2C] hover:text-[#B89555] border-b border-[#682C2C] pb-1 transition-colors mt-4 md:mt-0 group shrink-0"
          >
            <span>View All Journal Essays</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* 3 Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((article, idx) => (
            <article
              key={article._id || article.id || idx}
              className="group flex flex-col bg-[#F8F4EA] border border-[#B89555]/20 hover:border-[#682C2C] rounded-sm overflow-hidden shadow-art hover:shadow-art-hover transition-all duration-300"
            >
              <Link href={`/journal/${article.slug}`} className="block relative aspect-16/10 w-full overflow-hidden bg-[#E9DFCD]">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-[#682C2C] text-[#F8F4EA] text-[10px] uppercase font-semibold tracking-wider px-2.5 py-0.5">
                  {article.category}
                </span>
              </Link>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-[#72765A]">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#292522] group-hover:text-[#682C2C] transition-colors leading-snug line-clamp-2">
                    <Link href={`/journal/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-[#292522]/70 leading-relaxed line-clamp-3 font-light">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#B89555]/15 flex items-center justify-between">
                  <span className="text-[11px] text-[#292522]/60">
                    By {article.author}
                  </span>
                  <Link
                    href={`/journal/${article.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#682C2C] group-hover:text-[#B89555] transition-colors"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
