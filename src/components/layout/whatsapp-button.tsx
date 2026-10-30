"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-2xl shadow-premium-lg px-5 py-3 max-w-[240px]"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              aria-label="Kapat"
            >
              <X className="w-3 h-3 text-gray-500" />
            </button>
            <p className="text-sm text-[#101114] font-medium leading-snug">
              Merhaba! Size nasıl yardımcı olabiliriz?
            </p>
            <p className="text-xs text-[#737B86] mt-1">
              WhatsApp üzerinden yazın
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href="https://wa.me/905451013570?text=Merhaba%2C%20%C3%BCr%C3%BCnleriniz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp ile iletişime geçin"
        className="group relative"
      >
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20" />
        <div className="relative w-16 h-16 bg-[#25D366] hover:bg-[#20BD5A] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
          <MessageCircle className="w-8 h-8 text-white fill-white" />
        </div>
      </a>
    </div>
  );
}
