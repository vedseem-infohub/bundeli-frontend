"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import {
  ShieldCheck,
  Award,
  Sparkles,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function Footer() {
  const { addToast, contactInfo } = useApp();
  const [footerEmail, setFooterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const formattedWhatsApp = (
    contactInfo?.whatsappNo ||
    contactInfo?.mobileNo ||
    "917686288411"
  ).replace(/[^0-9]/g, "");

  const displayPhone =
    contactInfo?.mobileNo || contactInfo?.phone || "+91 7686 288 411";
  const displayEmail =
    contactInfo?.email || "curator@bundelikalavrat.com";
  const displayAddress =
    contactInfo?.address?.formatted ||
    "Raja Ram Marg, Near Jahangir Mahal, Orchha 472246, Madhya Pradesh, India";
  const socials = contactInfo?.socialLinks || {};

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!footerEmail.trim() || !/\S+@\S+\.\S+/.test(footerEmail)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setSubscribed(true);
    addToast("Welcome to the Bundeli Kalavrat collector circle!");
  };

  return (
    <footer className="bg-[#292522] text-[#F8F4EA] border-t-2 border-[#B89555]/40 mt-auto">
      {/* Heritage Trust Badges Strip */}
      <div className="border-b border-[#F8F4EA]/10 bg-[#1F1C1A] py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-6 h-6 text-[#B89555] mb-2" />
            <h5 className="font-serif text-sm font-semibold text-[#F8F4EA]">100% Certified Originals</h5>
            <p className="text-[11px] text-[#E9DFCD]/70 mt-0.5">Physical signature certificate with every piece</p>
          </div>
          <div className="flex flex-col items-center">
            <Award className="w-6 h-6 text-[#B89555] mb-2" />
            <h5 className="font-serif text-sm font-semibold text-[#F8F4EA]">Master Artisan Direct</h5>
            <p className="text-[11px] text-[#E9DFCD]/70 mt-0.5">Empowering Bundelkhand craft lineages</p>
          </div>
          <div className="flex flex-col items-center">
            <Sparkles className="w-6 h-6 text-[#B89555] mb-2" />
            <h5 className="font-serif text-sm font-semibold text-[#F8F4EA]">Archival Conservation</h5>
            <p className="text-[11px] text-[#E9DFCD]/70 mt-0.5">Natural stone minerals & handmade wasli</p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-6 h-6 text-[#B89555] mb-2" />
            <h5 className="font-serif text-sm font-semibold text-[#F8F4EA]">Insured White-Glove Transit</h5>
            <p className="text-[11px] text-[#E9DFCD]/70 mt-0.5">Custom shock-proof wooden crating</p>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Presentation (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#682C2C] border border-[#B89555] flex items-center justify-center text-[#B89555] font-serif font-bold text-sm shadow-md">
                BK
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-[0.1em] text-[#F8F4EA] block leading-none">
                  BUNDELI KALAVRAT
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89555] font-semibold mt-1 block">
                  Heritage Art Gallery & Atelier
                </span>
              </div>
            </div>

            <p className="text-xs text-[#E9DFCD]/80 leading-relaxed max-w-sm">
              Bundeli Kalavrat celebrates the timeless artistic heritage of Bundelkhand—from the sacred frescoes of Orchha and Datia palaces to the living Sanjhi wall reliefs of Chhatarpur and lost-wax bronze sculptures of Tikamgarh.
            </p>

            <div className="space-y-2 text-xs text-[#E9DFCD]/75 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B89555] shrink-0 mt-0.5" />
                <span>{displayAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B89555] shrink-0" />
                <a
                  href={`mailto:${displayEmail}`}
                  className="hover:text-[#B89555] transition-colors"
                >
                  {displayEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B89555] shrink-0" />
                <a
                  href={`tel:${displayPhone.replace(/[^\d+]/g, "")}`}
                  className="hover:text-[#B89555] transition-colors"
                >
                  {displayPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <a
                  href={`https://wa.me/${formattedWhatsApp}?text=Namaste%20Bundeli%20Kalavrat!%20I%20would%20like%20to%20inquire%20about%20commissioning%20custom%20artworks.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] rounded-xs font-semibold text-[11px] transition-colors border border-[#25D366]/40"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Social Media Links (Configured via Admin Portal) */}
            <div className="flex items-center space-x-3 pt-3 flex-wrap gap-y-2">
              {socials.instagram ? (
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[#B89555]/40 flex items-center justify-center text-[#E9DFCD] hover:border-[#B89555] hover:text-[#B89555] hover:bg-[#B89555]/10 transition-colors"
                  aria-label="Instagram"
                  title="Follow us on Instagram"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              ) : null}

              {socials.facebook ? (
                <a
                  href={socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[#B89555]/40 flex items-center justify-center text-[#E9DFCD] hover:border-[#B89555] hover:text-[#B89555] hover:bg-[#B89555]/10 transition-colors"
                  aria-label="Facebook"
                  title="Connect on Facebook"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
              ) : null}

              {socials.youtube ? (
                <a
                  href={socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[#B89555]/40 flex items-center justify-center text-[#E9DFCD] hover:border-[#B89555] hover:text-[#B89555] hover:bg-[#B89555]/10 transition-colors"
                  aria-label="YouTube"
                  title="Watch on YouTube"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136c-1.871-.502-9.376-.502-9.376-.502s-7.504 0-9.377.502a3.016 3.016 0 0 0-2.122 2.136c-.5 1.87-.5 5.764-.5 5.764s0 3.894.5 5.764a3.016 3.016 0 0 0 2.122 2.136c1.873.502 9.377.502 9.377.502s7.505 0 9.377-.502a3.016 3.016 0 0 0 2.122-2.136c.5-1.87.5-5.764.5-5.764s0-3.894-.5-5.764zm-13.498 9.314v-7l6.5 3.5-6.5 3.5z" />
                  </svg>
                </a>
              ) : null}

              {socials.twitter ? (
                <a
                  href={socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[#B89555]/40 flex items-center justify-center text-[#E9DFCD] hover:border-[#B89555] hover:text-[#B89555] hover:bg-[#B89555]/10 transition-colors"
                  aria-label="Twitter / X"
                  title="Follow on Twitter / X"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              ) : null}

              {socials.linkedin ? (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[#B89555]/40 flex items-center justify-center text-[#E9DFCD] hover:border-[#B89555] hover:text-[#B89555] hover:bg-[#B89555]/10 transition-colors"
                  aria-label="LinkedIn"
                  title="Connect on LinkedIn"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              ) : null}

              {socials.pinterest ? (
                <a
                  href={socials.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[#B89555]/40 flex items-center justify-center text-[#E9DFCD] hover:border-[#B89555] hover:text-[#B89555] hover:bg-[#B89555]/10 transition-colors"
                  aria-label="Pinterest"
                  title="Follow on Pinterest"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.357-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                  </svg>
                </a>
              ) : null}
            </div>
          </div>

          {/* Explore Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-[#B89555] uppercase">
              Explore Art
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E9DFCD]/80">
              <li>
                <Link href="/shop" className="hover:text-[#B89555] transition-colors">
                  All Artworks
                </Link>
              </li>
              <li>
                <Link href="/shop?category=paintings" className="hover:text-[#B89555] transition-colors">
                  Traditional Paintings
                </Link>
              </li>
              <li>
                <Link href="/shop?category=folk-art" className="hover:text-[#B89555] transition-colors">
                  Folk Art & Murals
                </Link>
              </li>
              <li>
                <Link href="/shop?category=sculptures" className="hover:text-[#B89555] transition-colors">
                  Sculptures & Bronze
                </Link>
              </li>
              <li>
                <Link href="/shop?category=contemporary-art" className="hover:text-[#B89555] transition-colors">
                  Contemporary Indian Art
                </Link>
              </li>
              <li>
                <Link href="/shop?category=art-prints" className="hover:text-[#B89555] transition-colors">
                  Archival Fine Art Prints
                </Link>
              </li>
            </ul>
          </div>

          {/* Information & Heritage */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-[#B89555] uppercase">
              Heritage & Stories
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E9DFCD]/80">
              <li>
                <Link href="/heritage" className="hover:text-[#B89555] transition-colors">
                  Our Cultural Legacy
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-[#B89555] transition-colors">
                  Curated Collections
                </Link>
              </li>
              <li>
                <Link href="/artists" className="hover:text-[#B89555] transition-colors">
                  Meet the Master Artisans
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-[#B89555] transition-colors">
                  The Kalavrat Journal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#B89555] transition-colors">
                  Studio Visits & Inquiries
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-[#B89555] transition-colors">
                  Personal Collector Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-[#B89555] uppercase">
              Collector Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E9DFCD]/80">
              <li>
                <Link href="/login" className="hover:text-[#B89555] transition-colors font-medium text-[#B89555]">
                  Collector Sign In / Register →
                </Link>
              </li>
              <li>
                <Link href="/contact?subject=shipping" className="hover:text-[#B89555] transition-colors">
                  Insured Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/contact?subject=returns" className="hover:text-[#B89555] transition-colors">
                  Authenticity Guarantee & Returns
                </Link>
              </li>
              <li>
                <Link href="/contact?subject=custom" className="hover:text-[#B89555] transition-colors">
                  Commission Custom Heritage Art
                </Link>
              </li>
              <li>
                <Link href="/contact?subject=advisory" className="hover:text-[#B89555] transition-colors">
                  Art Advisory for Architects
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#B89555] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#B89555] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Security */}
        <div className="border-t border-[#F8F4EA]/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E9DFCD]/60 space-y-4 sm:space-y-0">
          <p>
            © {new Date().getFullYear()} Bundeli Kalavrat. All rights reserved. Dedicated to the living traditions of Bundelkhand.
          </p>
          <div className="flex items-center space-x-6 text-[11px]">
            <span>Orchha • Datia • Chhatarpur • Khajuraho</span>
            <span>Handcrafted in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
