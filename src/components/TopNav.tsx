"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, X, Activity, Stethoscope, FileText, Pill, Users } from "lucide-react";

export default function TopNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/dashboard", label: "Overview", icon: Activity },
    { href: "/dashboard/consultations", label: "Consultations", icon: Stethoscope },
    { href: "/dashboard/prescriptions", label: "Prescriptions", icon: FileText },
    { href: "/dashboard/pharmacy", label: "Pharmacy", icon: Pill },
    { href: "/dashboard/patient", label: "Patients", icon: Users },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-gradient-to-br from-[#05668d] to-[#00a896]">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-lg text-[#05668d]">MediCare</div>
            <div className="text-xs text-gray-600">Doctor Dashboard</div>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gradient-to-r from-[#05668d] to-[#028090] text-white"
                    : "text-gray-700 hover:bg-[#f0f3bd] hover:text-[#05668d]"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="w-6 h-6 text-[#05668d]" /> : <Menu className="w-6 h-6 text-[#05668d]" />}
        </button>
      </div>

      {/* Mobile dropdown panel (slides from top) */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out bg-white border-t border-gray-200 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="px-4 py-2 flex flex-col">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gradient-to-r from-[#05668d] to-[#028090] text-white"
                    : "text-gray-700 hover:bg-[#f0f3bd] hover:text-[#05668d]"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}


