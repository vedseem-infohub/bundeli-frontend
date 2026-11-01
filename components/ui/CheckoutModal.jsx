"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";

export default function CheckoutModal() {
  const {
    cart,
    clearCart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    subtotal,
    discountAmount,
    shipping,
    estimatedTax,
    total,
    addToast,
  } = useApp();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Delivery & Payment, 3: Success
  const [formData, setFormData] = useState({
    firstName: "Aditya",
    lastName: "Singhania",
    email: "aditya.singhania@heritageart.in",
    phone: "+91 98201 54321",
    address: "B-42, Amrita Sher-Gil Marg, Civil Lines",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110003",
    deliveryOption: "standard-insured",
    paymentOption: "upi",
    notes: "Please call 1 hour prior to delivery. High-value art delivery.",
  });

  const [orderId, setOrderId] = useState("");

  if (!isCheckoutOpen) return null;

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      const generatedId = "BK-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000);
      setOrderId(generatedId);
      setStep(3);
      clearCart();
      addToast(`Order ${generatedId} confirmed! Thank you for supporting traditional Indian art.`);
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-[#292522]/85 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#F8F4EA] text-[#292522] rounded-sm shadow-2xl overflow-hidden z-10 border border-[#B89555]/40 flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#F4EFE6] border-b border-[#B89555]/20">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#682C2C]" />
            <h3 className="font-serif text-lg font-bold text-[#292522] tracking-wide">
              {step === 3 ? "Order Confirmed" : "Bundeli Kalavrat Private Checkout"}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-[#292522]/70 hover:text-[#682C2C] rounded-full hover:bg-[#E9DFCD] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper indicator if not on success */}
        {step < 3 && (
          <div className="px-6 py-2.5 bg-[#E9DFCD]/40 border-b border-[#B89555]/15 flex items-center justify-between text-xs font-serif">
            <div className={`flex items-center gap-1.5 ${step === 1 ? "text-[#682C2C] font-bold" : "text-[#72765A]"}`}>
              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[11px]">1</span>
              <span>Collector & Shipping Details</span>
            </div>
            <span className="text-[#B89555]">→</span>
            <div className={`flex items-center gap-1.5 ${step === 2 ? "text-[#682C2C] font-bold" : "text-[#292522]/50"}`}>
              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[11px]">2</span>
              <span>Delivery & Payment Simulation</span>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#292522] mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm focus:outline-none focus:border-[#682C2C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#292522] mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm focus:outline-none focus:border-[#682C2C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#292522] mb-1">Email for Invoices *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm focus:outline-none focus:border-[#682C2C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#292522] mb-1">Mobile (Courier Alerts) *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm focus:outline-none focus:border-[#682C2C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#292522] mb-1">Street Address *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full text-xs px-3 py-2 bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm focus:outline-none focus:border-[#682C2C]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#292522] mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm focus:outline-none focus:border-[#682C2C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#292522] mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm focus:outline-none focus:border-[#682C2C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#292522] mb-1">PIN Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm focus:outline-none focus:border-[#682C2C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#292522] mb-1">Special Art Handling Instructions (Optional)</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full text-xs p-2.5 bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm focus:outline-none focus:border-[#682C2C]"
                />
              </div>

              <div className="pt-3 flex justify-between items-center">
                <span className="text-xs text-[#292522]/60">Step 1 of 2</span>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#682C2C] text-[#F8F4EA] text-xs uppercase tracking-widest font-semibold hover:bg-[#4A1B1B] transition-colors rounded-sm shadow-md"
                >
                  <span>Continue to Delivery & Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNext} className="space-y-6">
              {/* Delivery options */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#B89555] font-semibold mb-3">
                  Insured Delivery Method
                </h4>
                <div className="space-y-2">
                  {[
                    {
                      id: "standard-insured",
                      title: "Insured Fine Art Courier (Free on ₹15k+)",
                      desc: "Custom foam cushioning, tamper-proof security seals, trackable dispatch in 3-5 days.",
                      price: shipping === 0 ? "Complimentary" : "₹2,500",
                    },
                    {
                      id: "white-glove",
                      title: "Museum-Grade Reinforced Wooden Crating",
                      desc: "Heavy duty plywood crates, climate-buffered interior lining, recommended for framed frescoes & sculptures.",
                      price: "Included in Gallery Guarantee",
                    },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={`block p-3 border rounded-sm cursor-pointer transition-all ${
                        formData.deliveryOption === opt.id
                          ? "border-[#682C2C] bg-[#F4EFE6]"
                          : "border-[#B89555]/30 hover:border-[#B89555]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="deliveryOption"
                            value={opt.id}
                            checked={formData.deliveryOption === opt.id}
                            onChange={(e) => setFormData({ ...formData, deliveryOption: e.target.value })}
                            className="accent-[#682C2C]"
                          />
                          <span className="text-xs font-semibold text-[#292522]">{opt.title}</span>
                        </div>
                        <span className="text-xs font-serif text-[#682C2C] font-semibold">{opt.price}</span>
                      </div>
                      <p className="text-[11px] text-[#292522]/70 ml-5 mt-1">{opt.desc}</p>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment simulation options */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#B89555] font-semibold mb-3">
                  Payment Method (Demonstration Mode)
                </h4>
                <div className="space-y-2">
                  {[
                    { id: "upi", label: "Instant UPI (GPay, PhonePe, BHIM, Paytm)", badge: "Fastest" },
                    { id: "card", label: "Credit / Debit Card (Visa, Mastercard, Amex, RuPay)", badge: "Encrypted" },
                    { id: "wire", label: "Direct Gallery RTGS / NEFT Wire Transfer", badge: "Preferred for high value" },
                  ].map((p) => (
                    <label
                      key={p.id}
                      className={`flex items-center justify-between p-3 border rounded-sm cursor-pointer transition-all ${
                        formData.paymentOption === p.id
                          ? "border-[#682C2C] bg-[#F4EFE6]"
                          : "border-[#B89555]/30 hover:border-[#B89555]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="paymentOption"
                          value={p.id}
                          checked={formData.paymentOption === p.id}
                          onChange={(e) => setFormData({ ...formData, paymentOption: e.target.value })}
                          className="accent-[#682C2C]"
                        />
                        <span className="text-xs font-semibold text-[#292522]">{p.label}</span>
                      </div>
                      <span className="text-[10px] uppercase font-semibold text-[#B89555] bg-[#E9DFCD] px-2 py-0.5 rounded-xs">
                        {p.badge}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Order Final Summary */}
              <div className="p-4 bg-[#F4EFE6] rounded-sm border border-[#B89555]/30 text-xs space-y-1.5">
                <div className="flex justify-between font-semibold">
                  <span>Payable Total:</span>
                  <span className="text-[#682C2C] text-sm font-serif">₹{total.toLocaleString("en-IN")}</span>
                </div>
                <p className="text-[11px] text-[#292522]/60">
                  Delivering to: {formData.address}, {formData.city}, {formData.state} - {formData.pincode}
                </p>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#292522]/70 hover:text-[#682C2C]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Address
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#682C2C] hover:bg-[#4A1B1B] text-[#F8F4EA] text-xs uppercase tracking-widest font-semibold transition-colors rounded-sm shadow-md"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authorize & Place Order</span>
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#72765A]/15 text-[#72765A] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-[#B89555] font-semibold">
                  Order Successfully Placed
                </span>
                <h4 className="text-2xl font-serif font-bold text-[#292522] mt-1">
                  Thank You for Patronizing Bundelkhand's Art
                </h4>
                <p className="text-xs text-[#292522]/70 mt-2 max-w-md mx-auto leading-relaxed">
                  Your order has been recorded in our gallery ledger. An authentic physical Certificate of Authenticity signed by the master artist is being prepared for dispatch with your artwork.
                </p>
              </div>

              <div className="max-w-md mx-auto p-4 bg-[#F4EFE6] rounded-sm border border-[#B89555]/30 text-xs space-y-2 text-left">
                <div className="flex justify-between border-b border-[#B89555]/15 pb-2">
                  <span className="text-[#292522]/60">Order Reference:</span>
                  <span className="font-mono font-bold text-[#682C2C]">{orderId}</span>
                </div>
                <div className="flex justify-between border-b border-[#B89555]/15 pb-2">
                  <span className="text-[#292522]/60">Collector:</span>
                  <span className="font-semibold">{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="flex justify-between border-b border-[#B89555]/15 pb-2">
                  <span className="text-[#292522]/60">Email Confirmation:</span>
                  <span className="font-mono">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#292522]/60">Total Settled:</span>
                  <span className="font-serif font-bold text-[#682C2C]">₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="pt-3 flex justify-center gap-4">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 bg-[#682C2C] text-[#F8F4EA] text-xs uppercase tracking-widest font-semibold hover:bg-[#4A1B1B] transition-colors rounded-sm shadow-md"
                >
                  Explore More Heritage Works
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
