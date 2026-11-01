"use client";

import React from "react";
import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="py-28 px-4 text-center bg-[#F8F4EA] min-h-[60vh] flex flex-col items-center justify-center space-y-5">
      <div className="w-16 h-16 rounded-full bg-[#E9DFCD] text-[#682C2C] flex items-center justify-center mx-auto shadow-md">
        <Compass className="w-8 h-8 stroke-1" />
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest text-[#B89555] font-semibold">
          404 ERROR • ARCHIVE UNLOCATED
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#292522]">
          Artwork or Chamber Not Found
        </h1>
        <p className="text-xs sm:text-sm text-[#292522]/70 max-w-md mx-auto leading-relaxed">
          The requested art gallery room or catalog item might have been relocated or is private.
        </p>
      </div>

      <div className="pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3 bg-[#682C2C] hover:bg-[#4A1B1B] text-[#F8F4EA] text-xs uppercase tracking-widest font-semibold rounded-sm shadow-md transition-colors"
        >
          <span>Return to Grand Foyer</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
