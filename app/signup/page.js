"use client";

import React from "react";
import Link from "next/link";
import AuthCard from "@/components/auth/AuthCard";
import { ChevronRight, Shield, Award, Lock, Sparkles } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#F8F4EA] py-10 sm:py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      {/* Breadcrumb Navigation */}
      <div className="max-w-5xl mx-auto w-full mb-6">
        <nav className="flex items-center gap-2 text-xs font-sans text-[#72765A]">
          <Link href="/" className="hover:text-[#682C2C] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#B89555]" />
          <span className="text-[#682C2C] font-semibold">Join the Connoisseurs Circle</span>
        </nav>
      </div>

      {/* Main Luxury Auth Card */}
      <AuthCard initialMode="signup" />

      {/* Bottom Heritage & Trust Signals */}
      <div className="max-w-4xl mx-auto w-full mt-12 pt-8 border-t border-[#B89555]/20 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-[#E9DFCD]/60 border border-[#B89555]/40 flex items-center justify-center text-[#682C2C] mb-2.5">
            <Lock className="w-4 h-4 text-[#B89555]" />
          </div>
          <h4 className="font-serif font-bold text-sm text-[#292522]">
            End-to-End Encrypted
          </h4>
          <p className="font-sans text-xs text-[#72765A] mt-1">
            Bank-grade 256-bit SSL encryption safeguards your private art portfolio.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-[#E9DFCD]/60 border border-[#B89555]/40 flex items-center justify-center text-[#682C2C] mb-2.5">
            <Award className="w-4 h-4 text-[#B89555]" />
          </div>
          <h4 className="font-serif font-bold text-sm text-[#292522]">
            Certified Lineage
          </h4>
          <p className="font-sans text-xs text-[#72765A] mt-1">
            Every acquired masterpiece is accompanied by an authenticated legal certificate.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-[#E9DFCD]/60 border border-[#B89555]/40 flex items-center justify-center text-[#682C2C] mb-2.5">
            <Sparkles className="w-4 h-4 text-[#B89555]" />
          </div>
          <h4 className="font-serif font-bold text-sm text-[#292522]">
            Curator Advisory
          </h4>
          <p className="font-sans text-xs text-[#72765A] mt-1">
            Direct access to veteran art historians and Orchha palace master artisans.
          </p>
        </div>
      </div>
    </div>
  );
}

