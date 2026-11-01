"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Calendar,
} from "lucide-react";

export default function ContactPage() {
  const { addToast } = useApp();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Your full name is required";
    if (!formData.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Contact number is required";
    }
    if (!formData.message.trim()) {
      errs.message = "Please share a message or details of your inquiry";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      addToast("Your inquiry has been delivered to our Orchha curators!");
    }, 800);
  };

  return (
    <div className="py-10 lg:py-16 bg-[#F8F4EA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-[#292522]/60 font-sans">
          <Link href="/" className="hover:text-[#682C2C] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#B89555]" />
          <span className="text-[#682C2C] font-semibold">Contact & Studio Visits</span>
        </nav>

        {/* Page Header */}
        <div className="border-b border-[#B89555]/30 pb-8">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#682C2C]">
            CURATOR ADVISORY & VISITS
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#292522] mt-2">
            Connect with Bundeli Kalavrat
          </h1>
          <p className="text-xs sm:text-sm text-[#292522]/75 max-w-2xl mt-3 leading-relaxed font-light">
            Whether inquiring about rare Orchha frescoes, custom commissioned temple bronzes, architectural consultations, or scheduling a private viewing at our heritage atelier in Orchha.
          </p>
        </div>

        {/* Grid: Contact Information Left + Form Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Studio & Gallery Details (5 Cols) */}
          <div className="lg:col-span-5 space-y-8 bg-[#F4EFE6] p-8 rounded-sm border border-[#B89555]/30 shadow-art">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#292522]">
                Our Heritage Gallery & Ateliers
              </h2>
              <p className="text-xs text-[#292522]/70 mt-1 leading-relaxed">
                Located near the historic cenotaphs of the Bundela kings, our flagship atelier welcomes collectors and researchers by appointment.
              </p>
            </div>

            <div className="space-y-5 text-xs text-[#292522]/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#682C2C] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#292522]">Orchha Flagship Gallery</h4>
                  <p className="text-[#292522]/70 mt-0.5">
                    Raja Ram Marg, Opposite Jahangir Mahal, Orchha 472246, Niwari District, Madhya Pradesh, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#682C2C] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#292522]">Khajuraho Sculpture Studio</h4>
                  <p className="text-[#292522]/70 mt-0.5">
                    Near Western Group of Temples, Sevagram, Khajuraho 471606, Madhya Pradesh, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#682C2C] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#292522]">Curatorial Inquiries</h4>
                  <p className="text-[#292522]/70 mt-0.5">+91 7686 288 411 / +91 98112 00412</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#682C2C] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#292522]">Electronic Correspondence</h4>
                  <p className="text-[#292522]/70 mt-0.5">curator@bundelikalavrat.com</p>
                  <p className="text-[#292522]/70">advisory@bundelikalavrat.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#682C2C] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#292522]">Viewing Hours</h4>
                  <p className="text-[#292522]/70 mt-0.5">Tuesday – Sunday: 10:00 AM – 6:30 PM (IST)</p>
                  <p className="text-[#292522]/70">Mondays: Closed for Atelier Conservation</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#B89555]/20">
              <span className="text-[11px] text-[#72765A] flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#B89555]" />
                White-glove private appointments include guided master craftsman interaction.
              </span>
            </div>
          </div>

          {/* Right Column: Contact & Commission Form (7 Cols) */}
          <div className="lg:col-span-7 bg-[#F4EFE6] p-8 sm:p-10 rounded-sm border border-[#B89555]/30 shadow-art">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#72765A]/15 text-[#72765A] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#B89555] font-semibold">
                    Message Dispatched
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#292522] mt-1">
                    Thank You, {formData.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#292522]/70 mt-2 max-w-md mx-auto leading-relaxed">
                    Our Senior Curator has received your communication. We will review your query and respond via email or telephone within 24 business hours.
                  </p>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-[#682C2C] text-[#F8F4EA] text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-[#4A1B1B] transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#292522]">
                    Send Us an Inquiry
                  </h3>
                  <p className="text-xs text-[#292522]/70 mt-1">
                    All inquiries are addressed personally by our art historians and conservation specialists.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#292522] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Radhika Singhal"
                      className="w-full text-xs px-3 py-2.5 bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm focus:outline-none focus:border-[#682C2C]"
                    />
                    {errors.name && <p className="text-[11px] text-[#682C2C] mt-0.5">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#292522] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="radhika@example.com"
                      className="w-full text-xs px-3 py-2.5 bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm focus:outline-none focus:border-[#682C2C]"
                    />
                    {errors.email && <p className="text-[11px] text-[#682C2C] mt-0.5">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#292522] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full text-xs px-3 py-2.5 bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm focus:outline-none focus:border-[#682C2C]"
                    />
                    {errors.phone && <p className="text-[11px] text-[#682C2C] mt-0.5">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#292522] mb-1">
                      Nature of Inquiry
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full text-xs px-3 py-2.5 bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm focus:outline-none focus:border-[#682C2C] font-serif"
                    >
                      <option value="general">General Artwork Inquiry</option>
                      <option value="commission">Commission Custom Fresco or Sculpture</option>
                      <option value="advisory">Architect & Interior Design Collaboration</option>
                      <option value="studio-visit">Book Private Orchha Atelier Viewing</option>
                      <option value="shipping">Insured Museum Shipping Consultation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#292522] mb-1">
                    Your Message / Specific Artwork Requirements *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your aesthetic vision, preferred mediums, wall dimensions, or specific queries..."
                    className="w-full text-xs p-3 bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm focus:outline-none focus:border-[#682C2C]"
                  />
                  {errors.message && <p className="text-[11px] text-[#682C2C] mt-0.5">{errors.message}</p>}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#682C2C] hover:bg-[#4A1B1B] text-[#F8F4EA] text-xs uppercase tracking-widest font-semibold rounded-sm shadow-md transition-colors disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? "Connecting to Curators..." : "Transmit Inquiry"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
