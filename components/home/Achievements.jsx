"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import {
  Award,
  Users,
  Globe,
  Trophy,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Landmark,
  Scroll,
} from "lucide-react";

const ICON_MAP = {
  Award,
  Users,
  Globe,
  Trophy,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Landmark,
  Scroll,
};

export default function Achievements() {
  const [stats, setStats] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    api
      .getAchievements()
      .then((backendData) => {
        if (isMounted) {
          if (backendData && backendData.length > 0) {
            const fetchedStats = backendData.filter((item) => item.type === "stat");
            const fetchedMilestones = backendData.filter(
              (item) => item.type === "milestone"
            );

            setStats(
              fetchedStats.map((s, idx) => ({
                id: s._id || s.id || `stat-${idx}`,
                number: s.number,
                label: s.label || s.title,
                detail: s.detail || s.description,
                icon: ICON_MAP[s.icon] || Award,
              }))
            );

            setMilestones(
              fetchedMilestones.map((m, idx) => ({
                id: m._id || m.id || `mile-${idx}`,
                badge: m.badge || "HERITAGE RECOGNITION",
                title: m.title || m.label,
                description: m.description || m.detail,
                icon: ICON_MAP[m.icon] || Trophy,
              }))
            );
          } else {
            setStats([]);
            setMilestones([]);
          }
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  if (!loading && stats.length === 0 && milestones.length === 0) {
    return null;
  }

  return (
    <section className="py-8 sm:py-12 lg:py-14 bg-[#FAF7F0] border-b border-[#B89555]/20 relative overflow-hidden">
      {/* Decorative Background Cultural Motif */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B89555]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#682C2C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#682C2C] flex items-center gap-2 font-sans">
              <span className="w-6 h-px bg-[#682C2C]" />
              LEGACY & MILESTONES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#292522]">
              Our Heritage Achievements
            </h2>
            <p className="text-xs sm:text-sm text-[#72765A] font-light max-w-xl font-sans leading-relaxed">
              Committed to preserving the rare court art, folk murals, and bronze craftsmanship of Central India through ethical patronage and museum-grade curation.
            </p>
          </div>

          <Link
            href="/heritage"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#682C2C] hover:text-[#B89555] border-b border-[#682C2C] pb-1 transition-colors mt-4 md:mt-0 group shrink-0 font-sans"
          >
            <span>Read Our Full Heritage Story</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* 4 Prominent Stat Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat._id || stat.id || stat.label || idx}
                className="bg-[#F8F4EA] border border-[#B89555]/30 rounded-sm p-6 sm:p-8 flex flex-col justify-between shadow-art hover:shadow-art-hover transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-full bg-[#E9DFCD]/70 border border-[#B89555]/40 flex items-center justify-center text-[#682C2C] group-hover:bg-[#682C2C] group-hover:text-[#F8F4EA] transition-colors">
                    <Icon className="w-5 h-5 text-[#B89555] group-hover:text-[#F8F4EA]" />
                  </span>
                  <span className="text-[10px] uppercase tracking-widest font-sans font-semibold text-[#B89555]">
                    Milestone
                  </span>
                </div>

                <div>
                  <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#682C2C] tracking-tight group-hover:text-[#4A1B1B] transition-colors">
                    {stat.number}
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#292522] mt-1 mb-2 leading-snug">
                    {stat.label}
                  </h3>
                  <p className="font-sans text-xs text-[#72765A] leading-relaxed">
                    {stat.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Heritage Honors Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 sm:mb-16">
          {milestones.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={m._id || m.id || m.title || idx}
                className="bg-[#F8F4EA] border border-[#B89555]/25 rounded-sm p-6 flex flex-col justify-between shadow-xs hover:border-[#682C2C] transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="p-1.5 rounded-full bg-[#682C2C] text-[#B89555] border border-[#B89555]/40 shrink-0">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] uppercase tracking-widest font-sans font-semibold text-[#682C2C]">
                      {m.badge}
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-[#292522] mb-2 leading-snug">
                    {m.title}
                  </h4>
                  <p className="font-sans text-xs text-[#72765A] leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cultural Seal & Patron Quote Banner */}
        <div className="bg-[#682C2C] text-[#F8F4EA] rounded-sm p-8 sm:p-10 border border-[#B89555]/50 shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-10 text-[#B89555] pointer-events-none">
            <Landmark className="w-64 h-64" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
            <div className="max-w-2xl">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-[#B89555] text-xs font-sans uppercase tracking-widest font-semibold mb-2">
                <Scroll className="w-4 h-4" />
                <span>The Kalavrat Oath of Provenance</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-snug text-[#F8F4EA]">
                “Art is not merely acquired; it is a sacred guardianship of human soul and heritage.”
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#E9DFCD]/80 font-light mt-2 leading-relaxed">
                Every collector holding a Bundeli Kalavrat piece is directly enabling the survival of ancient Central Indian court atelier traditions for another century.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link
                href="/artists"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#B89555] hover:bg-[#D4AF67] text-[#292522] font-sans text-xs font-bold uppercase tracking-widest rounded-xs transition-colors shadow-md"
              >
                Meet the Master Artists
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-6 py-3.5 bg-transparent hover:bg-white/10 text-[#F8F4EA] font-sans text-xs font-semibold uppercase tracking-widest rounded-xs border border-[#F8F4EA]/40 transition-colors"
              >
                Private Studio Visits
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
