"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileSearch, MessageSquare, BookOpen, Building2 } from "lucide-react";
import { clsx } from "clsx";

const navigation = [
  { name: "Analyze", href: "/analyze", icon: FileSearch },
  { name: "Interview", href: "/interview", icon: MessageSquare },
  { name: "Alumni", href: "/alumni", icon: BookOpen },
  { name: "Intel", href: "/intel", icon: Building2 },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-200 pb-safe z-[99]">
      <div className="flex justify-around items-center h-16 px-2">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                isActive ? "text-indigo-600" : "text-slate-500 hover:text-slate-900",
                "flex flex-col items-center justify-center w-full h-full space-y-1 text-[10px] font-medium"
              )}
            >
              <item.icon
                className={clsx(
                  isActive ? "text-indigo-600" : "text-slate-400",
                  "h-5 w-5"
                )}
                aria-hidden="true"
              />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
