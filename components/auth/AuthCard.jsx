"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Gem,
} from "lucide-react";

export default function AuthCard({ initialMode = "login" }) {
  const router = useRouter();
  const { login, signup, user, addToast } = useApp();

  const [mode, setMode] = useState(initialMode); // "login" | "signup"
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: true,
    receiveNewsletter: true,
  });

  // Demo auto-fill
  const fillDemo = (e) => {
    e.preventDefault();
    setLoginData({
      email: "collector@bundelikalavrat.com",
      password: "RoyalHeritage2026!",
      rememberMe: true,
    });
    setErrorMessage("");
    addToast("Sample collector credentials loaded.", "info");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!loginData.email || !loginData.password) {
      setErrorMessage("Please provide both your email and password.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await login(loginData.email, loginData.password);
      if (res?.success) {
        setTimeout(() => {
          router.push("/");
        }, 800);
      }
    } catch (err) {
      setErrorMessage(err?.message || "Failed to sign in. Please verify your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!signupData.name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!signupData.email.trim()) {
      setErrorMessage("Please provide a valid email address.");
      return;
    }
    if (signupData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    if (signupData.password !== signupData.confirmPassword) {
      setErrorMessage("Passwords do not match. Please re-enter.");
      return;
    }
    if (!signupData.agreeTerms) {
      setErrorMessage("Please accept the Collector Agreement to proceed.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await signup({
        name: signupData.name,
        email: signupData.email,
        phone: signupData.phone,
        password: signupData.password,
      });
      if (res?.success) {
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (err) {
      setErrorMessage(err?.message || "Registration could not be completed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      addToast("Please enter your registered email address.", "error");
      return;
    }
    addToast(`Password recovery link dispatched to ${forgotEmail}`, "success");
    setShowForgotPassword(false);
    setForgotEmail("");
  };

  // If already logged in
  if (user) {
    return (
      <div className="w-full max-w-xl mx-auto bg-[#FAF7F0] border border-[#B89555]/30 rounded-sm p-8 sm:p-12 text-center shadow-art">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#682C2C] text-[#F8F4EA] flex items-center justify-center font-serif text-2xl font-bold border-2 border-[#B89555] shadow-md mb-4">
          {(user.name ? user.name.charAt(0) : (user.email ? user.email.charAt(0) : "U")).toUpperCase()}
        </div>
        <span className="inline-block px-3 py-1 bg-[#B89555]/15 border border-[#B89555]/40 text-[#682C2C] text-[10px] uppercase tracking-widest font-semibold rounded-xs mb-3 font-sans">
          Active Collector Dossier
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#292522] font-bold mb-2">
          Welcome back, {user.name || user.email || "Esteemed Patron"}
        </h2>
        <p className="font-sans text-sm text-[#72765A] mb-8 max-w-md mx-auto">
          You are currently signed in to your Bundeli Kalavrat portfolio with{" "}
          <strong className="text-[#292522]">{user.email}</strong>.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/shop"
            className="w-full sm:w-auto px-6 py-3 bg-[#682C2C] hover:bg-[#4A1B1B] text-[#F8F4EA] font-sans text-xs font-semibold uppercase tracking-widest rounded-xs transition-colors"
          >
            Explore Gallery
          </Link>
          <Link
            href="/wishlist"
            className="w-full sm:w-auto px-6 py-3 border border-[#B89555] text-[#682C2C] hover:bg-[#B89555]/10 font-sans text-xs font-semibold uppercase tracking-widest rounded-xs transition-colors"
          >
            View Curated Wishlist
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto bg-[#FAF7F0] border border-[#B89555]/30 rounded-sm shadow-art overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* Left Side: Luxury Cultural Heritage Visual */}
        <div className="lg:col-span-5 relative bg-[#292522] text-[#F8F4EA] p-8 sm:p-10 flex flex-col justify-between overflow-hidden">
          {/* Background Artwork */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=85"
              alt="Bundelkhand Royal Art"
              className="w-full h-full object-cover object-center opacity-30 transform scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#292522] via-[#292522]/85 to-[#292522]/60" />
            <div className="absolute inset-0 bg-radial from-transparent to-[#292522]/80" />
          </div>

          {/* Top Brand Seal */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#682C2C] border border-[#B89555] flex items-center justify-center text-[#B89555] font-serif font-bold text-sm shadow-sm">
                BK
              </div>
              <div>
                <span className="font-serif font-bold text-base tracking-widest text-[#F8F4EA] block leading-tight">
                  BUNDELI KALAVRAT
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#B89555] font-sans font-semibold block">
                  Heritage Art Gallery
                </span>
              </div>
            </div>

            <div className="mt-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#682C2C]/80 border border-[#B89555]/50 text-[#F8F4EA] text-[10px] uppercase tracking-widest font-semibold rounded-xs font-sans">
                <Sparkles className="w-3 h-3 text-[#B89555]" />
                Connoisseur Circle
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8F4EA] mt-3 leading-snug">
                Guardians of India’s Rare Palace Art
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#E9DFCD]/80 font-light mt-2 leading-relaxed">
                Connect directly with certified master artisans from Orchha, Datia, and Khajuraho ateliers.
              </p>
            </div>
          </div>

          {/* Center Privileges Checklist */}
          <div className="relative z-10 my-8 space-y-3.5 font-sans text-xs">
            <div className="flex items-start gap-3 text-[#E9DFCD]">
              <div className="mt-0.5 p-1 rounded-full bg-[#682C2C] border border-[#B89555]/60 text-[#B89555] shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-[#F8F4EA] font-semibold block">
                  Physical Authenticity Dossier
                </strong>
                <span className="text-[11px] text-[#E9DFCD]/70">
                  Every acquisition includes an archival certificate of lineage.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-[#E9DFCD]">
              <div className="mt-0.5 p-1 rounded-full bg-[#682C2C] border border-[#B89555]/60 text-[#B89555] shrink-0">
                <Gem className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-[#F8F4EA] font-semibold block">
                  Curator Previews & Reserve Rights
                </strong>
                <span className="text-[11px] text-[#E9DFCD]/70">
                  First access to newly commissioned miniatures and fresco reliefs.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-[#E9DFCD]">
              <div className="mt-0.5 p-1 rounded-full bg-[#682C2C] border border-[#B89555]/60 text-[#B89555] shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-[#F8F4EA] font-semibold block">
                  Insured White-Glove Logistics
                </strong>
                <span className="text-[11px] text-[#E9DFCD]/70">
                  Museum-standard transit with temperature-safe packing across India.
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Royal Quote */}
          <div className="relative z-10 pt-4 border-t border-[#B89555]/30">
            <p className="font-serif italic text-xs text-[#B89555] leading-relaxed">
              “Art is not merely viewed; it is inherited, treasured, and preserved for generations.”
            </p>
            <span className="text-[10px] uppercase tracking-widest text-[#E9DFCD]/60 mt-1 block font-sans">
              Royal Orchha Heritage Trust
            </span>
          </div>
        </div>

        {/* Right Side: Auth Forms */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-[#FAF7F0]">
          {/* Mode Tabs */}
          <div className="flex border-b border-[#B89555]/25 mb-8">
            <button
              onClick={() => {
                setMode("login");
                setErrorMessage("");
              }}
              className={`pb-3 px-4 font-serif text-base sm:text-lg font-bold transition-all relative ${mode === "login"
                ? "text-[#682C2C]"
                : "text-[#292522]/50 hover:text-[#292522]"
                }`}
            >
              Sign In
              {mode === "login" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#682C2C]" />
              )}
            </button>

            <button
              onClick={() => {
                setMode("signup");
                setErrorMessage("");
              }}
              className={`pb-3 px-4 font-serif text-base sm:text-lg font-bold transition-all relative ${mode === "signup"
                ? "text-[#682C2C]"
                : "text-[#292522]/50 hover:text-[#292522]"
                }`}
            >
              Create Account
              {mode === "signup" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#682C2C]" />
              )}
            </button>
          </div>

          {/* Form Header */}
          <div className="mb-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#682C2C] leading-tight">
              {mode === "login"
                ? "Access Your Collector Portfolio"
                : "Become a Registered Collector"}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#72765A] mt-1.5 leading-relaxed">
              {mode === "login"
                ? "Enter your credentials to view acquired masterpieces, custom commissions, and private dossiers."
                : "Join an elite community of art patrons, architects, and collectors worldwide."}
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-sans rounded-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* FORGOT PASSWORD MODAL/OVERLAY */}
          {showForgotPassword ? (
            <div className="bg-[#F4EFE6] border border-[#B89555]/40 p-6 rounded-sm mb-6 animate-in fade-in duration-200">
              <h4 className="font-serif font-bold text-lg text-[#682C2C] mb-1">
                Recover Collector Account
              </h4>
              <p className="font-sans text-xs text-[#292522]/80 mb-4">
                Enter your registered email address and we will dispatch a secure verification link to reset your key.
              </p>
              <form onSubmit={handleForgotPassword} className="space-y-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-sans font-semibold text-[#292522] mb-1">
                    Registered Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B89555]" />
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="e.g. patron@domain.com"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#B89555]/30 focus:border-[#B89555] focus:outline-none focus:ring-1 focus:ring-[#B89555] rounded-xs text-xs font-sans text-[#292522]"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#682C2C] hover:bg-[#4A1B1B] text-[#F8F4EA] font-sans text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors"
                  >
                    Send Recovery Link
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="px-4 py-2 text-xs font-sans text-[#292522]/70 hover:text-[#292522]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : null}

          {/* ===================== LOGIN FORM ===================== */}
          {mode === "login" && !showForgotPassword && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-[11px] uppercase tracking-wider font-sans font-semibold text-[#292522] mb-1.5"
                >
                  Email Address / Collector ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#B89555]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="login-email"
                    type="email"
                    required
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    placeholder="patron@artgallery.com"
                    className="w-full pl-10 pr-4 py-3 bg-[#FAF7F0] border border-[#B89555]/30 focus:border-[#B89555] focus:outline-none focus:ring-1 focus:ring-[#B89555] rounded-xs text-xs sm:text-sm font-sans text-[#292522] transition-colors"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="login-password"
                    className="block text-[11px] uppercase tracking-wider font-sans font-semibold text-[#292522]"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-[11px] font-sans text-[#B89555] hover:text-[#682C2C] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#B89555]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-[#FAF7F0] border border-[#B89555]/30 focus:border-[#B89555] focus:outline-none focus:ring-1 focus:ring-[#B89555] rounded-xs text-xs sm:text-sm font-sans text-[#292522] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#B89555]/80 hover:text-[#682C2C]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={loginData.rememberMe}
                    onChange={(e) =>
                      setLoginData({ ...loginData, rememberMe: e.target.checked })
                    }
                    className="w-4 h-4 rounded-xs border-[#B89555]/50 text-[#682C2C] focus:ring-[#B89555]"
                  />
                  <span className="font-sans text-xs text-[#292522]/80">
                    Remember this collector terminal
                  </span>
                </label>

                {/* Quick demo autofill */}
                <button
                  type="button"
                  onClick={fillDemo}
                  className="text-[11px] font-sans font-medium text-[#72765A] hover:text-[#682C2C] underline decoration-dotted"
                  title="Autofill sample credentials"
                >
                  Fill Sample
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3.5 px-6 bg-[#682C2C] hover:bg-[#4A1B1B] text-[#F8F4EA] font-sans text-xs sm:text-sm font-semibold uppercase tracking-widest rounded-xs border border-[#B89555]/40 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-[#F8F4EA] border-t-transparent rounded-full animate-spin" />
                    Verifying Credentials...
                  </span>
                ) : (
                  <>
                    <span>Sign In to Dossier</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Social / Alternative Divider */}
              {/* <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#B89555]/20" />
                </div>
                <span className="relative px-3 bg-[#FAF7F0] text-[10px] uppercase tracking-widest text-[#292522]/50 font-sans">
                  Or Instant Authentication
                </span>
              </div> */}

              {/* Google Sign In Button */}
              {/* <button
                type="button"
                onClick={() => {
                  login("artpatron@google.com", "google-oauth");
                }}
                className="w-full py-3 px-4 bg-white hover:bg-[#F4EFE6] text-[#292522] border border-[#B89555]/30 rounded-xs font-sans text-xs font-medium flex items-center justify-center gap-3 transition-colors shadow-xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.04h3.88c2.27-2.09 3.66-5.17 3.66-9.14z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.04c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.13C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.28c-.25-.72-.38-1.49-.38-2.28s.13-1.56.38-2.28V6.59H1.24C.45 8.16 0 9.97 0 12s.45 3.84 1.24 5.41l4.04-3.13z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.59l4.04 3.13c.95-2.83 3.6-4.97 6.72-4.97z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button> */}
            </form>
          )}

          {/* ===================== SIGNUP FORM ===================== */}
          {mode === "signup" && (
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="signup-name"
                  className="block text-[11px] uppercase tracking-wider font-sans font-semibold text-[#292522] mb-1.5"
                >
                  Full Name / Title
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#B89555]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="signup-name"
                    type="text"
                    required
                    value={signupData.name}
                    onChange={(e) =>
                      setSignupData({ ...signupData, name: e.target.value })
                    }
                    placeholder="e.g. Radhika Sharma"
                    className="w-full pl-10 pr-4 py-3 bg-[#FAF7F0] border border-[#B89555]/30 focus:border-[#B89555] focus:outline-none focus:ring-1 focus:ring-[#B89555] rounded-xs text-xs sm:text-sm font-sans text-[#292522] transition-colors"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="signup-email"
                  className="block text-[11px] uppercase tracking-wider font-sans font-semibold text-[#292522] mb-1.5"
                >
                  Official Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#B89555]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="signup-email"
                    type="email"
                    required
                    value={signupData.email}
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                    placeholder="patron@domain.com"
                    className="w-full pl-10 pr-4 py-3 bg-[#FAF7F0] border border-[#B89555]/30 focus:border-[#B89555] focus:outline-none focus:ring-1 focus:ring-[#B89555] rounded-xs text-xs sm:text-sm font-sans text-[#292522] transition-colors"
                  />
                </div>
              </div>

              {/* Contact Phone (Optional) */}
              <div>
                <label
                  htmlFor="signup-phone"
                  className="block text-[11px] uppercase tracking-wider font-sans font-semibold text-[#292522] mb-1.5"
                >
                  Contact Number <span className="text-[#72765A] font-normal lowercase">(for art delivery updates)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#B89555]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    id="signup-phone"
                    type="tel"
                    value={signupData.phone}
                    onChange={(e) =>
                      setSignupData({ ...signupData, phone: e.target.value })
                    }
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-3 bg-[#FAF7F0] border border-[#B89555]/30 focus:border-[#B89555] focus:outline-none focus:ring-1 focus:ring-[#B89555] rounded-xs text-xs sm:text-sm font-sans text-[#292522] transition-colors"
                  />
                </div>
              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="signup-password"
                    className="block text-[11px] uppercase tracking-wider font-sans font-semibold text-[#292522] mb-1.5"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#B89555]">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={signupData.password}
                      onChange={(e) =>
                        setSignupData({ ...signupData, password: e.target.value })
                      }
                      placeholder="Min 6 characters"
                      className="w-full pl-10 pr-10 py-3 bg-[#FAF7F0] border border-[#B89555]/30 focus:border-[#B89555] focus:outline-none focus:ring-1 focus:ring-[#B89555] rounded-xs text-xs sm:text-sm font-sans text-[#292522] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#B89555]/80 hover:text-[#682C2C]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="signup-confirm-password"
                    className="block text-[11px] uppercase tracking-wider font-sans font-semibold text-[#292522] mb-1.5"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#B89555]">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="signup-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={signupData.confirmPassword}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          confirmPassword: e.target.value,
                        })
                      }
                      placeholder="Re-enter password"
                      className="w-full pl-10 pr-10 py-3 bg-[#FAF7F0] border border-[#B89555]/30 focus:border-[#B89555] focus:outline-none focus:ring-1 focus:ring-[#B89555] rounded-xs text-xs sm:text-sm font-sans text-[#292522] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#B89555]/80 hover:text-[#682C2C]"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-2 pt-1">
                <label className="flex items-start gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={signupData.agreeTerms}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        agreeTerms: e.target.checked,
                      })
                    }
                    className="mt-0.5 w-4 h-4 rounded-xs border-[#B89555]/50 text-[#682C2C] focus:ring-[#B89555]"
                  />
                  <span className="font-sans text-xs text-[#292522]/80 leading-tight">
                    I accept the Bundeli Kalavrat{" "}
                    <span className="text-[#682C2C] underline">Collector Terms</span> &{" "}
                    <span className="text-[#682C2C] underline">Authenticity Guarantee</span>.
                  </span>
                </label>

                <label className="flex items-start gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={signupData.receiveNewsletter}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        receiveNewsletter: e.target.checked,
                      })
                    }
                    className="mt-0.5 w-4 h-4 rounded-xs border-[#B89555]/50 text-[#682C2C] focus:ring-[#B89555]"
                  />
                  <span className="font-sans text-xs text-[#292522]/80 leading-tight">
                    Receive invitations to private gallery previews & rare folk art miniature releases.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3.5 px-6 bg-[#682C2C] hover:bg-[#4A1B1B] text-[#F8F4EA] font-sans text-xs sm:text-sm font-semibold uppercase tracking-widest rounded-xs border border-[#B89555]/40 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-[#F8F4EA] border-t-transparent rounded-full animate-spin" />
                    Creating Collector Account...
                  </span>
                ) : (
                  <>
                    <span>Create Collector Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          )}

          {/* Footer note & direct switch */}
          <div className="mt-8 pt-6 border-t border-[#B89555]/20 text-center font-sans text-xs text-[#292522]/70">
            {mode === "login" ? (
              <p>
                Don&apos;t have a collector account yet?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setErrorMessage("");
                  }}
                  className="text-[#682C2C] font-semibold hover:underline ml-1"
                >
                  Create one now →
                </button>
              </p>
            ) : (
              <p>
                Already have a registered account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setErrorMessage("");
                  }}
                  className="text-[#682C2C] font-semibold hover:underline ml-1"
                >
                  Sign in here →
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

