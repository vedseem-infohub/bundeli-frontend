"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { artworks } from "@/data/artworks";
import { getImageUrl } from "@/lib/api";
import {
  WHATSAPP_PHONE,
  getArtworkWhatsAppUrl,
  getMultiArtworkWhatsAppUrl,
} from "@/lib/whatsapp";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Cart state
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0); // decimal 0.10 for 10%
  const [discountError, setDiscountError] = useState("");
  const [discountSuccess, setDiscountSuccess] = useState("");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // User / Auth state
  const [user, setUser] = useState(null);

  // Wishlist state
  const [wishlist, setWishlist] = useState([]);

  // Recently viewed IDs
  const [recentlyViewedIds, setRecentlyViewedIds] = useState([]);

  // Quick view modal
  const [quickViewArtwork, setQuickViewArtwork] = useState(null);

  // Enquiry modal
  const [enquiryArtwork, setEnquiryArtwork] = useState(null);

  // Search modal overlay
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Toast notification
  const [toasts, setToasts] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("bk_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem("bk_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedRecent = localStorage.getItem("bk_recent");
      if (savedRecent) setRecentlyViewedIds(JSON.parse(savedRecent));

      const savedUser = localStorage.getItem("bk_user");
      if (savedUser) setUser(JSON.parse(savedUser));
    } catch (e) {
      console.error("Failed to load state from localStorage", e);
    }
  }, []);

  // Save cart
  useEffect(() => {
    try {
      localStorage.setItem("bk_cart", JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Save wishlist
  useEffect(() => {
    try {
      localStorage.setItem("bk_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Save recently viewed
  useEffect(() => {
    try {
      localStorage.setItem("bk_recent", JSON.stringify(recentlyViewedIds));
    } catch (e) {
      console.error(e);
    }
  }, [recentlyViewedIds]);

  // Toast trigger
  const addToast = (message, type = "success") => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (artwork, quantity = 1) => {
    if (artwork.isPriceOnRequest) {
      openEnquiry(artwork);
      return;
    }
    setCart((prev) => {
      const existing = prev.find((item) => item.artwork.id === artwork.id);
      if (existing) {
        return prev.map((item) =>
          item.artwork.id === artwork.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { artwork, quantity }];
    });
    addToast(`"${artwork.title}" added to your collection bag.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (artworkId) => {
    setCart((prev) => prev.filter((item) => item.artwork.id !== artworkId));
    addToast("Item removed from your bag.", "info");
  };

  const updateCartQuantity = (artworkId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.artwork.id === artworkId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Artwork Selection & WhatsApp Commission Operations
  const isSelected = (artworkId) => {
    return cart.some((item) => item.artwork.id === artworkId);
  };

  const selectArtwork = (artwork) => {
    if (!isSelected(artwork.id)) {
      setCart((prev) => [...prev, { artwork, quantity: 1 }]);
      addToast(`"${artwork.title}" added to your selected artworks.`);

      // Record selection in backend for Admin Panel live tracking
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
        fetch(`${apiBase}/user/selections`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            userId: user?._id || user?.id,
            userName: user?.name || "Patron Collector",
            userEmail: user?.email || "",
            userPhone: user?.phone || "",
            artworkId: artwork.id || artwork._id,
            artworkTitle: artwork.title,
            artworkSlug: artwork.slug,
            artworkImage: getImageUrl(artwork.images || artwork.image),
            artist: artwork.artist,
            category: artwork.category,
            price: artwork.price,
            channel: "Direct Selection",
          }),
        }).catch(() => {});
      } catch (err) {
        // Non-blocking
      }
    }
  };

  const deselectArtwork = (artworkId) => {
    setCart((prev) => prev.filter((item) => item.artwork.id !== artworkId));
    addToast("Artwork removed from selection.", "info");
  };

  const toggleSelectArtwork = (artwork) => {
    if (isSelected(artwork.id)) {
      deselectArtwork(artwork.id);
    } else {
      selectArtwork(artwork);
    }
  };

  const redirectToWhatsApp = (artwork, options = {}) => {
    try {
      const url = getArtworkWhatsAppUrl(artwork, {
        customerName: user?.name,
        ...options,
      });
      addToast(`Connecting to WhatsApp for "${artwork.title}"...`, "success");

      // Record WhatsApp commission inquiry in backend for Admin Panel
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
        fetch(`${apiBase}/user/selections`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            userId: user?._id || user?.id,
            userName: user?.name || "Patron Collector",
            userEmail: user?.email || "",
            userPhone: user?.phone || "",
            artworkId: artwork.id || artwork._id,
            artworkTitle: artwork.title,
            artworkSlug: artwork.slug,
            artworkImage: getImageUrl(artwork.images || artwork.image),
            artist: artwork.artist,
            category: artwork.category,
            price: artwork.price,
            channel: "WhatsApp",
          }),
        }).catch(() => {});
      } catch (err) {
        // Non-blocking
      }

      if (typeof window !== "undefined") {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    } catch (e) {
      console.error("WhatsApp redirect error:", e);
    }
  };

  const redirectSelectedToWhatsApp = (options = {}) => {
    if (cart.length === 0) {
      addToast("Please select at least one artwork to commission.", "info");
      return;
    }
    try {
      const url = getMultiArtworkWhatsAppUrl(cart, {
        customerName: user?.name,
        ...options,
      });
      addToast(`Opening WhatsApp with ${cart.length} selected artworks...`, "success");
      if (typeof window !== "undefined") {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    } catch (e) {
      console.error("WhatsApp multi-redirect error:", e);
    }
  };

  // Cart totals
  const subtotal = cart.reduce(
    (sum, item) => sum + (item.artwork.price || 0) * item.quantity,
    0
  );
  const discountAmount = Math.round(subtotal * appliedDiscount);
  const shipping = subtotal > 0 ? (subtotal >= 15000 ? 0 : 2500) : 0;
  const estimatedTax = Math.round((subtotal - discountAmount) * 0.12); // 12% GST standard on Indian art
  const total = Math.max(0, subtotal - discountAmount + shipping + estimatedTax);

  const applyDiscount = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === "BUNDELI10" || clean === "HERITAGE10") {
      setAppliedDiscount(0.1);
      setDiscountSuccess("10% Heritage Collector discount applied!");
      setDiscountError("");
      addToast("10% Heritage discount applied!");
    } else if (clean === "ROYAL20") {
      setAppliedDiscount(0.2);
      setDiscountSuccess("20% Royal Patron discount applied!");
      setDiscountError("");
      addToast("20% Royal Patron discount applied!");
    } else {
      setDiscountError("Invalid promo code. Try 'BUNDELI10' or 'ROYAL20'.");
      setDiscountSuccess("");
    }
  };

  const removeDiscount = () => {
    setAppliedDiscount(0);
    setDiscountCode("");
    setDiscountSuccess("");
    setDiscountError("");
  };

  // Wishlist operations
  const isInWishlist = (artworkId) => {
    return wishlist.some((item) => item.id === artworkId);
  };

  const toggleWishlist = (artwork) => {
    if (isInWishlist(artwork.id)) {
      setWishlist((prev) => prev.filter((item) => item.id !== artwork.id));
      addToast(`Removed from your wishlist.`, "info");
    } else {
      setWishlist((prev) => [...prev, artwork]);
      addToast(`Saved to your personal wishlist.`);
    }
  };

  const moveToCartFromWishlist = (artwork) => {
    addToCart(artwork, 1);
    setWishlist((prev) => prev.filter((item) => item.id !== artwork.id));
  };

  // Recently viewed
  const recordView = (artwork) => {
    if (!artwork || !artwork.id) return;
    setRecentlyViewedIds((prev) => {
      const filtered = prev.filter((id) => id !== artwork.id);
      return [artwork.id, ...filtered].slice(0, 8);
    });
  };

  const recentlyViewedArtworks = recentlyViewedIds
    .map((id) => artworks.find((a) => a.id === id))
    .filter(Boolean);

  // Quick View
  const openQuickView = (artwork) => {
    setQuickViewArtwork(artwork);
  };

  const closeQuickView = () => {
    setQuickViewArtwork(null);
  };

  // Enquiry
  const openEnquiry = (artwork) => {
    setEnquiryArtwork(artwork);
  };

  const closeEnquiry = () => {
    setEnquiryArtwork(null);
  };

  // Auth operations
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  // Check current session from backend on mount
  useEffect(() => {
    const verifySession = async () => {
      try {
        const token = localStorage.getItem("bk_token");
        const res = await fetch(`${BACKEND_URL}/api/user/current`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (res.ok) {
          const userData = await res.json();
          const profile = userData.user || userData;
          if (profile && profile.name) {
            setUser(profile);
            localStorage.setItem("bk_user", JSON.stringify(profile));
          }
        }
      } catch (err) {
        // Backend offline or unauthenticated; retain local cached user if available
      }
    };
    verifySession();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/signin`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        const loggedUser = data.user || {
          _id: data._id || "u_" + Date.now(),
          name: data.name || email.split("@")[0],
          email: data.email || email,
          role: "collector",
        };
        setUser(loggedUser);
        localStorage.setItem("bk_user", JSON.stringify(loggedUser));
        if (data.token) {
          localStorage.setItem("bk_token", data.token);
        }
        addToast(data.message || `Welcome back, ${loggedUser.name}!`, "success");
        return { success: true, user: loggedUser, token: data.token };
      } else {
        const errMsg = data.message || "Invalid email or password.";
        addToast(errMsg, "error");
        throw new Error(errMsg);
      }
    } catch (err) {
      if (err.message && !err.message.includes("fetch")) {
        throw err;
      }
      console.warn("Backend server not responding, authenticating in client mode:", err?.message);
      const fallbackUser = {
        _id: "collector_" + Date.now().toString(36),
        name: email.split("@")[0].replace(/[^a-zA-Z]/g, " ").trim().replace(/\b\w/g, (c) => c.toUpperCase()) || "Collector",
        email,
        role: "collector",
        memberSince: "2026",
      };
      setUser(fallbackUser);
      localStorage.setItem("bk_user", JSON.stringify(fallbackUser));
      addToast(`Offline Mode: Welcome, ${fallbackUser.name}!`, "info");
      return { success: true, user: fallbackUser };
    }
  };

  const signup = async ({ name, email, phone, password }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/signup`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        const newUser = data.user || {
          _id: data._id || "u_" + Date.now(),
          name: data.name || name,
          email: data.email || email,
          role: "collector",
        };
        setUser(newUser);
        localStorage.setItem("bk_user", JSON.stringify(newUser));
        if (data.token) {
          localStorage.setItem("bk_token", data.token);
        }
        addToast(data.message || `Welcome to Bundeli Kalavrat, ${name}! Your account is ready.`, "success");
        return { success: true, user: newUser, token: data.token };
      } else {
        const errMsg = data.message || "Registration failed. Please check your details.";
        addToast(errMsg, "error");
        throw new Error(errMsg);
      }
    } catch (err) {
      if (err.message && !err.message.includes("fetch")) {
        throw err;
      }
      console.warn("Backend server not responding, registering in client mode:", err?.message);
      const fallbackUser = {
        _id: "collector_" + Date.now().toString(36),
        name,
        email,
        phone: phone || "",
        role: "collector",
        memberSince: "2026",
      };
      setUser(fallbackUser);
      localStorage.setItem("bk_user", JSON.stringify(fallbackUser));
      addToast(`Offline Mode: Account created for ${name}!`, "info");
      return { success: true, user: fallbackUser };
    }
  };

  const logout = async () => {
    try {
      await fetch(`${BACKEND_URL}/api/auth/logout`, {
        method: "GET",
        credentials: "include",
      });
    } catch (err) {
      console.warn("Backend logout notification failed:", err?.message);
    }
    setUser(null);
    localStorage.removeItem("bk_user");
    localStorage.removeItem("bk_token");
    addToast("You have been securely signed out.", "info");
  };

  return (
    <AppContext.Provider
      value={{
        // Auth
        user,
        login,
        signup,
        logout,
        // Cart & Artwork Selection
        cart,
        selectedArtworks: cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isSelected,
        selectArtwork,
        deselectArtwork,
        toggleSelectArtwork,
        redirectToWhatsApp,
        redirectSelectedToWhatsApp,
        WHATSAPP_PHONE,
        subtotal,
        discountAmount,
        appliedDiscount,
        discountCode,
        setDiscountCode,
        discountError,
        discountSuccess,
        applyDiscount,
        removeDiscount,
        shipping,
        estimatedTax,
        total,
        isCheckoutOpen,
        setIsCheckoutOpen,
        // Wishlist
        wishlist,
        isInWishlist,
        toggleWishlist,
        moveToCartFromWishlist,
        // Recently viewed
        recordView,
        recentlyViewedArtworks,
        // Quick view
        quickViewArtwork,
        openQuickView,
        closeQuickView,
        // Enquiry
        enquiryArtwork,
        openEnquiry,
        closeEnquiry,
        // Search
        isSearchOpen,
        setIsSearchOpen,
        // Toast
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
