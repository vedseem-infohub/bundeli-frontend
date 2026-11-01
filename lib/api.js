// Bundeli Kalavrat Frontend Centralized API Client

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

/**
 * Universal safe image URL resolver for artworks, categories, banners, etc.
 * Supports string URLs, Cloudinary objects ({ url, publicId }), and arrays.
 */
export function getImageUrl(
  source,
  fallback = "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=85"
) {
  if (!source) return fallback;

  // If array of images
  if (Array.isArray(source)) {
    if (source.length === 0) return fallback;
    const first = source[0];
    if (typeof first === "string") return first;
    if (first && typeof first === "object" && first.url) return first.url;
    return fallback;
  }

  // If string
  if (typeof source === "string") {
    return source.trim() ? source : fallback;
  }

  // If object with url
  if (typeof source === "object" && source.url) {
    return source.url;
  }

  return fallback;
}

/**
 * Execute HTTP requests to backend API with automatic error handling
 */
async function fetchApi(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    credentials: "include",
    ...options,
  };

  if (config.body && !(config.body instanceof FormData)) {
    config.headers = {
      "Content-Type": "application/json",
      ...(config.headers || {}),
    };
  }

  try {
    const res = await fetch(url, config);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || `API Error (${res.status})`);
    }
    return data;
  } catch (err) {
    // Return or throw
    throw err;
  }
}

export const api = {
  // Hero Banners
  getBanners: async () => {
    try {
      const res = await fetchApi("/banners/active");
      return res.data && res.data.length > 0 ? res.data : null;
    } catch {
      return null;
    }
  },

  // Categories
  getCategories: async () => {
    try {
      const res = await fetchApi("/categories");
      return res.data && res.data.length > 0 ? res.data : null;
    } catch {
      return null;
    }
  },

  // Artworks
  getArtworks: async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetchApi(`/artworks${query ? `?${query}` : ""}`);
      return res.data && res.data.length > 0 ? res.data : null;
    } catch {
      return null;
    }
  },

  // New Arrivals
  getNewArrivals: async () => {
    try {
      const res = await fetchApi("/artworks/new-arrivals");
      return res.data && res.data.length > 0 ? res.data : null;
    } catch {
      return null;
    }
  },

  // Single Artwork
  getArtworkByIdOrSlug: async (idOrSlug) => {
    try {
      const res = await fetchApi(`/artworks/${idOrSlug}`);
      return res.data || null;
    } catch {
      return null;
    }
  },

  // Cultural Achievements
  getAchievements: async (type = "") => {
    try {
      const res = await fetchApi(`/achievements${type ? `?type=${type}` : ""}`);
      return res.data && res.data.length > 0 ? res.data : null;
    } catch {
      return null;
    }
  },

  // Celebrity Patron Acquisitions
  getCelebrityPaintings: async () => {
    try {
      const res = await fetchApi("/celebrity-paintings");
      return res.data && res.data.length > 0 ? res.data : null;
    } catch {
      return null;
    }
  },

  // News & Press Releases
  getNews: async () => {
    try {
      const res = await fetchApi("/news");
      return res.data && res.data.length > 0 ? res.data : null;
    } catch {
      return null;
    }
  },

  // Blogs & Heritage Essays
  getBlogs: async (query = "") => {
    try {
      const res = await fetchApi(`/blogs${query}`);
      return res.data && res.data.length > 0 ? res.data : null;
    } catch {
      return null;
    }
  },

  getBlogByIdOrSlug: async (idOrSlug) => {
    try {
      const res = await fetchApi(`/blogs/${idOrSlug}`);
      return res.data || null;
    } catch {
      return null;
    }
  },

  // Patron Reviews
  getReviews: async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetchApi(`/reviews${query ? `?${query}` : ""}`);
      return res.data && res.data.length > 0 ? res.data : null;
    } catch {
      return null;
    }
  },

  submitReview: async (reviewData) => {
    return await fetchApi("/reviews", {
      method: "POST",
      body: JSON.stringify(reviewData),
    });
  },

  // Master Artists & Hereditary Guilds
  getArtists: async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetchApi(`/artists${query ? `?${query}` : ""}`);
      return res.data && res.data.length > 0 ? res.data : null;
    } catch {
      return null;
    }
  },

  getArtistBySlug: async (slugOrId) => {
    try {
      const res = await fetchApi(`/artists/${slugOrId}`);
      return res.data || null;
    } catch {
      return null;
    }
  },

  // User Artwork Selections & Inquiries
  recordSelection: async (selectionData) => {
    try {
      return await fetchApi("/user/selections", {
        method: "POST",
        body: JSON.stringify(selectionData),
      });
    } catch (err) {
      console.warn("Failed to record selection to backend:", err?.message);
      return null;
    }
  },
};

export default api;

