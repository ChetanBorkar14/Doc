"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Heart, Stethoscope, Users, FileText, Pill, Activity } from "lucide-react";
import { useEffect } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  
  const navItems = [
    { href: "/dashboard", label: "Overview", icon: Activity },
    { href: "/dashboard/consultations", label: "Consultations", icon: Stethoscope },
    { href: "/dashboard/prescriptions", label: "Prescriptions", icon: FileText },
    { href: "/dashboard/pharmacy", label: "Pharmacy", icon: Pill },
    { href: "/dashboard/patient", label: "Patients", icon: Users },
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    const sidebar = document.querySelector('aside');
    if (sidebar && window.innerWidth < 1024) {
      sidebar.classList.add('-translate-x-full');
    }
  }, [pathname]);
  
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col p-6 gap-8 shadow-lg lg:relative fixed inset-y-0 left-0 z-50 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out lg:z-auto">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
        <div className="p-2 rounded-full bg-gradient-to-br from-[#05668d] to-[#00a896]">
          <Heart className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className="font-bold text-lg text-[#05668d]">MediCare</div>
          <div className="text-xs text-gray-600">Doctor Dashboard</div>
        </div>
      </div>
      
      {/* Navigation */}
      <NavigationMenu orientation="vertical" className="flex-1">
        <NavigationMenuList className="flex-col gap-1 w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <NavigationMenuItem key={item.href} className="w-full">
                <NavigationMenuLink asChild>
                  <Link 
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 w-full ${
                      isActive 
                        ? 'bg-gradient-to-r from-[#05668d] to-[#028090] text-white shadow-md' 
                        : 'text-gray-700 hover:bg-[#f0f3bd] hover:text-[#05668d]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
      
      {/* Footer */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/doctor-avatar.png" alt="Doctor" />
            <AvatarFallback className="bg-gradient-to-br from-[#05668d] to-[#00a896] text-white font-semibold">
              DR
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold text-sm text-[#05668d]">Dr. Arjun Mehta</div>
            <div className="text-xs text-gray-600">General Physician</div>
          </div>
        </div>
      </div>
    </aside>
  );
}


