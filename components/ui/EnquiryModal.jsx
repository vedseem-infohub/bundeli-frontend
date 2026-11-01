"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { api, getImageUrl } from "@/lib/api";
import { X, Send, CheckCircle2, ShieldAlert, Sparkles, MessageSquare } from "lucide-react";

export default function EnquiryModal() {
  const { enquiryArtwork, closeEnquiry, addToast } = useApp();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    preferredContact: "Email",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState("");

  if (!enquiryArtwork) return null;

  const artwork = enquiryArtwork;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
    if (!formData.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await api.recordSelection({
        userName: formData.name,
        userEmail: formData.email,
        userPhone: formData.phone,
        artworkId: artwork.id || artwork._id,
        artworkTitle: artwork.title,
        artworkSlug: artwork.slug || "",
        artworkImage: getImageUrl(artwork.images || artwork.image),
        artist: artwork.artist,
        category: artwork.category,
        price: artwork.price,
        channel: "Enquiry Modal",
        notes: `Preferred contact: ${formData.preferredContact}. City: ${formData.city || "Unspecified"}. Message: ${formData.message || "No notes"}`,
      });
    } catch (err) {
      // Non-blocking
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
    const code = "BK-ENQ-" + Math.floor(100000 + Math.random() * 900000);
    setReferenceCode(code);
    addToast(`Enquiry ${code} sent successfully to our curators!`);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      city: "",
      preferredContact: "Email",
      message: "",
    });
    closeEnquiry();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#292522]/80 backdrop-blur-sm"
        onClick={handleReset}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[#F8F4EA] text-[#292522] rounded-sm shadow-2xl overflow-hidden z-10 border border-[#B89555]/30">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#F4EFE6] border-b border-[#B89555]/20">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#682C2C]" />
            <h3 className="font-serif text-lg font-semibold text-[#292522]">
              Collector Artwork Enquiry
            </h3>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 text-[#292522]/70 hover:text-[#682C2C] rounded-full hover:bg-[#E9DFCD] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#72765A]/15 text-[#72765A] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#B89555] font-semibold">
                Enquiry Received
              </span>
              <h4 className="text-xl font-serif font-bold text-[#292522] mt-1">
                Thank You, {formData.name}
              </h4>
              <p className="text-xs text-[#292522]/70 mt-2 max-w-sm mx-auto leading-relaxed">
                Our Senior Art Curator has received your request regarding{" "}
                <strong>"{artwork.title}"</strong>. We will contact you via {formData.preferredContact} within 24 hours with complete provenance, valuation details, and custom crating options.
              </p>
            </div>

            <div className="p-3 bg-[#F4EFE6] rounded-sm border border-[#B89555]/30 text-xs text-[#292522]">
              Reference Code: <strong className="font-mono text-[#682C2C]">{referenceCode}</strong>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-[#682C2C] text-[#F8F4EA] text-xs uppercase tracking-widest font-semibold hover:bg-[#4A1B1B] transition-colors rounded-sm"
            >
              Return to Gallery
            </button>
          </div>
        ) : (
          <div className="p-6 overflow-y-auto max-h-[80vh]">
            {/* Artwork snippet */}
            <div className="flex gap-4 p-3 bg-[#F4EFE6] rounded-sm border border-[#B89555]/20 mb-5">
              <img
                src={getImageUrl(artwork.images || artwork.image)}
                alt={artwork.title}
                className="w-16 h-20 object-cover rounded-sm border border-[#B89555]/20 shrink-0"
              />
              <div className="flex flex-col justify-center">
                <span className="text-[10px] uppercase tracking-wider text-[#B89555] font-semibold">
                  {artwork.category}
                </span>
                <h5 className="font-serif text-sm font-semibold text-[#292522] line-clamp-1">
                  {artwork.title}
                </h5>
                <p className="text-xs text-[#72765A]">{artwork.artist}</p>
                <p className="text-xs font-semibold text-[#682C2C] mt-1">
                  {artwork.isPriceOnRequest ? "Price on Request" : `₹${artwork.price.toLocaleString("en-IN")}`}
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#292522] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maharani Rao"
                    className="w-full text-xs px-3 py-2 bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm focus:outline-none focus:border-[#682C2C]"
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
                    placeholder="artlover@example.com"
                    className="w-full text-xs px-3 py-2 bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm focus:outline-none focus:border-[#682C2C]"
                  />
                  {errors.email && <p className="text-[11px] text-[#682C2C] mt-0.5">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#292522] mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full text-xs px-3 py-2 bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm focus:outline-none focus:border-[#682C2C]"
                  />
                  {errors.phone && <p className="text-[11px] text-[#682C2C] mt-0.5">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#292522] mb-1">
                    City & Country
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. New Delhi, India"
                    className="w-full text-xs px-3 py-2 bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm focus:outline-none focus:border-[#682C2C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#292522] mb-1">
                  Preferred Contact Method
                </label>
                <div className="flex gap-4 text-xs">
                  {["Email", "Phone Call", "WhatsApp"].map((method) => (
                    <label key={method} className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="preferredContact"
                        value={method}
                        checked={formData.preferredContact === method}
                        onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                        className="accent-[#682C2C]"
                      />
                      <span>{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#292522] mb-1">
                  Enquiry Details & Questions
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Inquire about pricing, custom framing, international museum shipping, or artist provenance..."
                  className="w-full text-xs p-3 bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm focus:outline-none focus:border-[#682C2C]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#682C2C] hover:bg-[#4A1B1B] text-[#F8F4EA] text-xs uppercase tracking-widest font-semibold transition-colors rounded-sm shadow-md disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "Transmitting to Curators..." : "Submit Confidential Enquiry"}</span>
                </button>
                <p className="text-[11px] text-center text-[#292522]/60 mt-2">
                  All consultations are strictly private and curated by certified art historians.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
