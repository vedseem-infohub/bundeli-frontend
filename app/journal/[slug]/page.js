"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { journalArticles as defaultArticles } from "@/data/journal";
import { artworks as defaultArtworks } from "@/data/artworks";
import { api, getImageUrl } from "@/lib/api";
import ArtworkCard from "@/components/artwork/ArtworkCard";
import { Clock, ChevronRight, ArrowRight, BookOpen } from "lucide-react";

export default function JournalArticlePage() {
  const params = useParams();
  const { slug } = params;

  const [article, setArticle] = useState(
    () => defaultArticles.find((a) => a.slug === slug) || null
  );

  useEffect(() => {
    let isMounted = true;
    api.getBlogByIdOrSlug(slug).then((backendBlog) => {
      if (isMounted && backendBlog) {
        setArticle(backendBlog);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (!article) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4">
        <h2 className="font-serif text-2xl font-bold text-[#292522]">Article Not Found</h2>
        <Link
          href="/journal"
          className="mt-6 inline-block px-6 py-2.5 bg-[#682C2C] text-[#F8F4EA] text-xs uppercase tracking-widest font-semibold rounded-sm"
        >
          Return to Journal
        </Link>
      </div>
    );
  }

  // Get matching related artworks
  const related = (article.relatedArtworks || [])
    .map((id) => defaultArtworks.find((a) => a.id === id || a.slug === id))
    .filter(Boolean);

  // Other articles
  const otherArticles = defaultArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 2);

  const coverImg = getImageUrl(article.coverImage || article.image || article);

  return (
    <article className="py-8 lg:py-16 bg-[#F8F4EA] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-[#292522]/60 font-sans">
          <Link href="/" className="hover:text-[#682C2C] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#B89555]" />
          <Link href="/journal" className="hover:text-[#682C2C] transition-colors">
            Journal
          </Link>
          <ChevronRight className="w-3 h-3 text-[#B89555]" />
          <span className="text-[#682C2C] font-semibold truncate max-w-xs sm:max-w-none">
            {article.title}
          </span>
        </nav>

        {/* Article Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 bg-[#682C2C] text-[#F8F4EA] text-[10px] uppercase font-semibold tracking-widest rounded-xs">
            {article.category || "Heritage Essay"}
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#292522] leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center justify-center gap-3 text-xs text-[#72765A] pt-2">
            <span>By <strong>{article.author || "Bundeli Guild"}</strong> ({article.authorRole || "Senior Historian"})</span>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime || "5 min read"}
            </span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-16/9 w-full rounded-sm overflow-hidden shadow-2xl border border-[#B89555]/30">
          <img
            src={coverImg}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Summary Lead */}
        {article.summary && (
          <div className="p-6 bg-[#F4EFE6] rounded-sm border-l-4 border-[#682C2C] text-sm sm:text-base font-serif italic text-[#292522]/90 leading-relaxed">
            "{article.summary}"
          </div>
        )}

        {/* Article Body Content */}
        {article.content && (
          <div className="prose prose-stone max-w-none text-[#292522]/85 text-sm sm:text-base leading-relaxed space-y-6 font-light">
            {article.content.split("\n\n").map((paragraph, index) => {
              const trimmed = paragraph.trim();
              if (!trimmed) return null;

              if (trimmed.startsWith("### ")) {
                return (
                  <h3
                    key={index}
                    className="font-serif text-xl sm:text-2xl font-bold text-[#292522] pt-6 border-b border-[#B89555]/20 pb-2"
                  >
                    {trimmed.replace("### ", "")}
                  </h3>
                );
              }

              if (trimmed.startsWith("- ")) {
                const items = trimmed.split("\n- ").map((item) => item.replace("- ", ""));
                return (
                  <ul key={index} className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                    {items.map((item, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                    ))}
                  </ul>
                );
              }

              return <p key={index}>{trimmed}</p>;
            })}
          </div>
        )}

        {/* Related Artworks */}
        {related.length > 0 && (
          <div className="border-t border-[#B89555]/30 pt-12">
            <h3 className="font-serif text-2xl font-bold text-[#292522] mb-6">
              Artworks Mentioned in This Essay
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {related.map((art) => (
                <ArtworkCard key={art._id || art.id} artwork={art} />
              ))}
            </div>
          </div>
        )}

        {/* Other Recommended Articles */}
        {otherArticles.length > 0 && (
          <div className="border-t border-[#B89555]/30 pt-12">
            <h3 className="font-serif text-2xl font-bold text-[#292522] mb-6">
              Continue Reading From the Kalavrat Journal
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherArticles.map((other) => (
                <Link
                  key={other._id || other.id || other.slug}
                  href={`/journal/${other.slug}`}
                  className="p-5 rounded-sm bg-[#F4EFE6] border border-[#B89555]/30 hover:border-[#682C2C] flex items-center justify-between group transition-all"
                >
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#B89555]">
                      {other.category}
                    </span>
                    <h4 className="font-serif text-base font-bold text-[#292522] group-hover:text-[#682C2C] mt-1 line-clamp-1">
                      {other.title}
                    </h4>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#B89555] group-hover:translate-x-1 transition-transform shrink-0 ml-3" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
