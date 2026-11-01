"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { CheckCircle2, Info, X } from "lucide-react";

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-3 p-4 bg-[#292522] text-[#F8F4EA] border border-[#B89555]/40 shadow-2xl rounded-sm transform transition-all duration-300 animate-in slide-in-from-bottom-5"
        >
          <div className="flex items-center gap-3">
            {toast.type === "info" ? (
              <Info className="w-5 h-5 text-[#B89555] shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-[#B89555] shrink-0" />
            )}
            <p className="text-xs sm:text-sm font-light leading-snug">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#E9DFCD]/60 hover:text-[#F8F4EA] transition-colors p-1"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
