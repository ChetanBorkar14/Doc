"use client";

import { useState } from "react";
import { Menu, X, Heart } from "lucide-react";

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Toggle sidebar visibility
    const sidebar = document.querySelector('aside');
    if (sidebar) {
      sidebar.classList.toggle('-translate-x-full');
    }
  };

  return (
    <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-gradient-to-br from-[#05668d] to-[#00a896]">
          <Heart className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="font-bold text-lg text-[#05668d]">MediCare</div>
          <div className="text-xs text-gray-600">Doctor Dashboard</div>
        </div>
      </div>
      
      <button
        onClick={toggleMenu}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <X className="w-6 h-6 text-[#05668d]" />
        ) : (
          <Menu className="w-6 h-6 text-[#05668d]" />
        )}
      </button>
    </div>
  );
}
