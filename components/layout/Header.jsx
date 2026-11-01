"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { ShopMegaMenu, CollectionsMegaMenu } from "./MegaMenu";
import MobileDrawer from "./MobileDrawer";
import {
  Search,
  Heart,
  Palette,
  User,
  Menu,
  ChevronDown,
  ShieldCheck,
  Sparkles,
  PhoneCall,
} from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const {
    cart,
    setIsCartOpen,
    wishlist,
    setIsSearchOpen,
    user,
    logout,
  } = useApp();

  const [activeMegaMenu, setActiveMegaMenu] = useState(null); // 'shop' | 'collections' | null
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const headerRef = useRef(null);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  // Track scroll for sticky shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mega menu on route change
  useEffect(() => {
    setActiveMegaMenu(null);
    setIsMobileOpen(false);
    setIsAccountOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Art", href: "/shop", mega: "shop" },
    { name: "Collections", href: "/collections", mega: "collections" },
    { name: "Artists", href: "/artists" },
    { name: "Our Heritage", href: "/heritage" },
    { name: "Journal", href: "/journal" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 w-full transition-all duration-300"
      onMouseLeave={() => setActiveMegaMenu(null)}
    >
      {/* Top Announcement Bar */}
      <div className="bg-[#682C2C] text-[#F8F4EA] py-1.5 px-4 text-[11px] sm:text-xs font-sans tracking-wide border-b border-[#B89555]/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89555] animate-pulse" />
            <span className="font-light">
              Welcome to <strong className="font-semibold text-[#B89555]">Bundeli Kalavrat</strong> — Authentic Indian Art & Heritage
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-[#E9DFCD]/80 text-[11px]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B89555]" />
              Physical Certificate of Authenticity with Every Masterpiece
            </span>
            <span className="text-[#B89555]/60">•</span>
            <span>Bespoke Art Commissions Direct via WhatsApp</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="text-[#E9DFCD] hover:text-[#B89555] transition-colors flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3 text-[#B89555]" />
              <span className="hidden sm:inline">Curator Helpline:</span> +91 7686 288 411
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 ${isScrolled
            ? "bg-[#F8F4EA]/95 backdrop-blur-md shadow-md py-3 border-b border-[#B89555]/20"
            : "bg-[#F8F4EA] py-4 border-b border-[#B89555]/20"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className="lg:hidden p-2 text-[#292522] hover:text-[#682C2C] focus:outline-none"
            aria-label="Open mobile menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Brand Logo & Emblem */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Custom Heritage Chhatri/Mandala Monogram SVG */}
            <div className="w-10 h-10 rounded-full bg-[#682C2C] border border-[#B89555] flex items-center justify-center text-[#B89555] shadow-sm transform group-hover:scale-105 transition-transform duration-300 shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                {/* Indian dome chhatri crown motif */}
                <path d="M12 2v2" />
                <path d="M12 4c-4 0-7 3-7 7v7h14v-7c0-4-3-7-7-7z" />
                <path d="M9 18v-4a3 3 0 0 1 6 0v4" />
                <circle cx="12" cy="8" r="1" fill="#B89555" />
                <path d="M5 18h14" />
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.12em] text-[#682C2C] leading-none group-hover:text-[#4A1B1B] transition-colors">
                BUNDELI KALAVRAT
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#B89555] font-semibold mt-1">
                Heritage Art Gallery
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <div
                  key={link.name}
                  className="relative py-2"
                  onMouseEnter={() => {
                    if (link.mega) setActiveMegaMenu(link.mega);
                    else setActiveMegaMenu(null);
                  }}
                >
                  <Link
                    href={link.href}
                    className={`px-3 py-1.5 text-xs font-serif uppercase tracking-widest transition-all flex items-center gap-1 ${isActive
                        ? "text-[#682C2C] font-bold border-b-2 border-[#682C2C]"
                        : "text-[#292522] hover:text-[#682C2C]"
                      }`}
                  >
                    <span>{link.name}</span>
                    {link.mega && (
                      <ChevronDown
                        className={`w-3 h-3 text-[#B89555] transition-transform duration-200 ${activeMegaMenu === link.mega ? "rotate-180" : ""
                          }`}
                      />
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#292522] hover:text-[#682C2C] hover:bg-[#E9DFCD]/50 rounded-full transition-colors"
              aria-label="Search artworks"
              title="Search gallery"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* Account Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                className="hidden sm:flex items-center gap-1.5 p-2 text-[#292522] hover:text-[#682C2C] hover:bg-[#E9DFCD]/50 rounded-full transition-colors"
                aria-label="Account"
                title={user ? `Signed in as ${user.name || user.email || "Collector"}` : "Collector Account"}
              >
                {user ? (
                  <span className="w-6 h-6 rounded-full bg-[#682C2C] text-[#F8F4EA] flex items-center justify-center text-xs font-serif font-bold border border-[#B89555]/60 shadow-xs">
                    {(user.name ? user.name.charAt(0) : (user.email ? user.email.charAt(0) : "U")).toUpperCase()}
                  </span>
                ) : (
                  <User className="w-5 h-5 stroke-[1.75]" />
                )}
              </button>

              {isAccountOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#F8F4EA] border border-[#B89555]/30 shadow-2xl rounded-sm py-2 text-xs text-[#292522] z-50 animate-in fade-in zoom-in-95 duration-150">
                  {user ? (
                    <>
                      <div className="px-4 py-3 border-b border-[#B89555]/20 bg-[#F4EFE6]/60">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-7 h-7 rounded-full bg-[#682C2C] text-[#F8F4EA] flex items-center justify-center text-xs font-serif font-bold border border-[#B89555]">
                            {(user.name ? user.name.charAt(0) : (user.email ? user.email.charAt(0) : "U")).toUpperCase()}
                          </span>
                          <div className="overflow-hidden">
                            <p className="font-serif font-bold text-sm text-[#682C2C] truncate">
                              {user.name || user.email || "Esteemed Patron"}
                            </p>
                            <p className="text-[10px] text-[#292522]/60 truncate font-sans">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-[#B89555]/20 text-[#682C2C] border border-[#B89555]/40 text-[9px] uppercase tracking-wider font-semibold rounded-xs">
                          Patron • Connoisseur
                        </span>
                      </div>
                      <Link
                        href="/wishlist"
                        onClick={() => setIsAccountOpen(false)}
                        className="block px-4 py-2 hover:bg-[#F4EFE6] hover:text-[#682C2C]"
                      >
                        Curated Wishlist ({wishlistCount})
                      </Link>
                      <Link
                        href="/cart"
                        onClick={() => setIsAccountOpen(false)}
                        className="block px-4 py-2 hover:bg-[#F4EFE6] hover:text-[#682C2C]"
                      >
                        Selected Artworks ({cartCount})
                      </Link>
                      <Link
                        href="/contact"
                        onClick={() => setIsAccountOpen(false)}
                        className="block px-4 py-2 hover:bg-[#F4EFE6] hover:text-[#682C2C]"
                      >
                        Schedule Private Viewing
                      </Link>
                      <div className="border-t border-[#B89555]/15 mt-1 pt-1">
                        <button
                          onClick={() => {
                            logout();
                            setIsAccountOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-rose-800 hover:bg-rose-50 font-medium transition-colors"
                        >
                          Sign Out
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-3 border-b border-[#B89555]/15">
                        <p className="font-serif font-bold text-sm text-[#682C2C]">
                          Collector Dossier
                        </p>
                        <p className="text-[11px] text-[#72765A] font-sans mt-0.5">
                          Access your personal art portfolio & private previews
                        </p>
                        <div className="mt-3 flex flex-col gap-2">
                          <Link
                            href="/login"
                            onClick={() => setIsAccountOpen(false)}
                            className="w-full text-center py-2 bg-[#682C2C] hover:bg-[#4A1B1B] text-[#F8F4EA] font-semibold rounded-xs uppercase tracking-wider text-[11px] transition-colors"
                          >
                            Sign In
                          </Link>
                          <Link
                            href="/signup"
                            onClick={() => setIsAccountOpen(false)}
                            className="w-full text-center py-1.5 border border-[#B89555] hover:bg-[#B89555]/10 text-[#682C2C] font-semibold rounded-xs uppercase tracking-wider text-[10px] transition-colors"
                          >
                            Create Account
                          </Link>
                        </div>
                      </div>
                      <Link
                        href="/wishlist"
                        onClick={() => setIsAccountOpen(false)}
                        className="block px-4 py-2 hover:bg-[#F4EFE6] hover:text-[#682C2C]"
                      >
                        Curated Wishlist ({wishlistCount})
                      </Link>
                      <Link
                        href="/cart"
                        onClick={() => setIsAccountOpen(false)}
                        className="block px-4 py-2 hover:bg-[#F4EFE6] hover:text-[#682C2C]"
                      >
                        Selected Artworks ({cartCount})
                      </Link>
                    </>
                  )}
                  <div className="border-t border-[#B89555]/15 mt-1 pt-1.5 px-4 pb-1">
                    <span className="block text-[10px] text-[#292522]/50 italic">
                      Bundeli Kalavrat Concierge • Orchha
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="relative p-2 text-[#292522] hover:text-[#682C2C] hover:bg-[#E9DFCD]/50 rounded-full transition-colors"
              aria-label="Wishlist"
              title="View Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[1.75]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#682C2C] text-[#F8F4EA] text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center border border-[#F8F4EA]">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Selected Artworks for Commission Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#292522] hover:text-[#682C2C] hover:bg-[#E9DFCD]/50 rounded-full transition-colors cursor-pointer"
              aria-label="Selected Artworks"
              title="Selected Artworks for Commission"
            >
              <Palette className="w-5 h-5 stroke-[1.75]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#25D366] text-[#0C381E] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#F8F4EA] shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mega Menus Render */}
      {activeMegaMenu === "shop" && (
        <ShopMegaMenu onClose={() => setActiveMegaMenu(null)} />
      )}
      {activeMegaMenu === "collections" && (
        <CollectionsMegaMenu onClose={() => setActiveMegaMenu(null)} />
      )}

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />
    </header>
  );
}
