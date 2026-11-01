"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { categories } from "@/data/categories";
import { collections } from "@/data/collections";
import { X, ChevronDown, ChevronRight, Phone, Mail, MapPin, Heart, Palette, User, LogOut } from "lucide-react";

export default function MobileDrawer({ isOpen, onClose, cartCount, wishlistCount }) {
  const { user, logout } = useApp();
  const [shopExpanded, setShopExpanded] = useState(false);
  const [collectionsExpanded, setCollectionsExpanded] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#292522]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-4/5 max-w-sm bg-[#F8F4EA] text-[#292522] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#B89555]/20 bg-[#F4EFE6]">
          <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#682C2C] flex items-center justify-center text-[#B89555] font-serif font-bold text-sm shadow-sm">
              BK
            </div>
            <div>
              <span className="font-serif font-bold text-base tracking-wider text-[#682C2C] block leading-tight">
                BUNDELI KALAVRAT
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#B89555] block">
                Heritage Art Gallery
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="p-1.5 text-[#292522] hover:text-[#682C2C] rounded-full hover:bg-[#E9DFCD]"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Nav Badges */}
        <div className="grid grid-cols-2 divide-x divide-[#B89555]/20 border-b border-[#B89555]/20 bg-[#E9DFCD]/40 text-xs">
          <Link
            href="/wishlist"
            onClick={onClose}
            className="flex items-center justify-center gap-2 py-3 hover:text-[#682C2C]"
          >
            <Heart className="w-4 h-4 text-[#682C2C]" />
            <span>Wishlist ({wishlistCount})</span>
          </Link>
          <Link
            href="/cart"
            onClick={onClose}
            className="flex items-center justify-center gap-2 py-3 hover:text-[#682C2C]"
          >
            <Palette className="w-4 h-4 text-[#682C2C]" />
            <span>Selected ({cartCount})</span>
          </Link>
        </div>

        {/* Collector Account Bar */}
        <div className="px-6 py-3 bg-[#F4EFE6] border-b border-[#B89555]/20 font-sans">
          {user ? (
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 truncate">
                <span className="w-6 h-6 rounded-full bg-[#682C2C] text-[#F8F4EA] flex items-center justify-center font-serif text-[11px] font-bold">
                  {(user.name ? user.name.charAt(0) : (user.email ? user.email.charAt(0) : "U")).toUpperCase()}
                </span>
                <div className="truncate">
                  <p className="font-semibold text-[#682C2C] truncate">{user.name || user.email || "Esteemed Patron"}</p>
                  <p className="text-[10px] text-[#292522]/60 truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="flex items-center gap-1 text-[11px] text-rose-800 hover:underline shrink-0 ml-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Exit</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="text-[#292522]/70 text-[11px]">Collector Dossier:</span>
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  onClick={onClose}
                  className="px-3 py-1 bg-[#682C2C] text-[#F8F4EA] text-[11px] font-semibold uppercase tracking-wider rounded-xs"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={onClose}
                  className="px-3 py-1 border border-[#B89555] text-[#682C2C] text-[11px] font-semibold uppercase tracking-wider rounded-xs hover:bg-[#B89555]/10"
                >
                  Join
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-1 font-serif text-base">
          <Link
            href="/"
            onClick={onClose}
            className="block py-2.5 text-[#292522] hover:text-[#682C2C] border-b border-[#B89555]/10"
          >
            Home
          </Link>

          {/* Art Showcase Accordion */}
          <div className="border-b border-[#B89555]/10 py-1">
            <button
              onClick={() => setShopExpanded(!shopExpanded)}
              className="w-full flex items-center justify-between py-2 text-[#292522] hover:text-[#682C2C]"
            >
              <span>Art Showcase</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${shopExpanded ? "rotate-180" : ""}`}
              />
            </button>
            {shopExpanded && (
              <div className="pl-4 pb-2 space-y-2 text-sm font-sans text-[#292522]/80">
                <Link
                  href="/shop"
                  onClick={onClose}
                  className="block py-1 hover:text-[#682C2C] font-semibold text-[#682C2C]"
                >
                  All Showcase Works →
                </Link>
                {categories.map((c, idx) => (
                  <Link
                    key={c._id || c.id || c.slug || idx}
                    href={`/shop?category=${c.slug}`}
                    onClick={onClose}
                    className="block py-1 hover:text-[#682C2C]"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Collections Accordion */}
          <div className="border-b border-[#B89555]/10 py-1">
            <button
              onClick={() => setCollectionsExpanded(!collectionsExpanded)}
              className="w-full flex items-center justify-between py-2 text-[#292522] hover:text-[#682C2C]"
            >
              <span>Collections</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${collectionsExpanded ? "rotate-180" : ""}`}
              />
            </button>
            {collectionsExpanded && (
              <div className="pl-4 pb-2 space-y-2 text-sm font-sans text-[#292522]/80">
                <Link
                  href="/collections"
                  onClick={onClose}
                  className="block py-1 hover:text-[#682C2C] font-semibold text-[#682C2C]"
                >
                  All Curated Collections →
                </Link>
                {collections.map((col, idx) => (
                  <Link
                    key={col._id || col.id || col.slug || idx}
                    href={`/collections/${col.slug}`}
                    onClick={onClose}
                    className="block py-1 hover:text-[#682C2C]"
                  >
                    {col.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/artists"
            onClick={onClose}
            className="block py-2.5 text-[#292522] hover:text-[#682C2C] border-b border-[#B89555]/10"
          >
            Artists
          </Link>
          <Link
            href="/heritage"
            onClick={onClose}
            className="block py-2.5 text-[#292522] hover:text-[#682C2C] border-b border-[#B89555]/10"
          >
            Our Heritage
          </Link>
          <Link
            href="/journal"
            onClick={onClose}
            className="block py-2.5 text-[#292522] hover:text-[#682C2C] border-b border-[#B89555]/10"
          >
            Journal
          </Link>
          <Link
            href="/contact"
            onClick={onClose}
            className="block py-2.5 text-[#292522] hover:text-[#682C2C] border-b border-[#B89555]/10"
          >
            Contact & Studio Appointments
          </Link>
        </div>

        {/* Bottom Contact & Heritage note */}
        <div className="p-6 bg-[#F4EFE6] border-t border-[#B89555]/20 text-xs space-y-3 font-sans text-[#292522]/70">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#B89555] shrink-0" />
            <span>Orchha & Khajuraho Gallery, MP, India</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-[#B89555] shrink-0" />
            <span>curator@bundelikalavrat.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-[#B89555] shrink-0" />
            <span>+91 7686 288 411</span>
          </div>
        </div>
      </div>
    </div>
  );
}
