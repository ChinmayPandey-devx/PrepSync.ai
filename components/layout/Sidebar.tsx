"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileSearch, MessageSquare, BookOpen, Building2 } from "lucide-react";
import { clsx } from "clsx";

const navigation = [
  { name: "Analyze Resume", href: "/analyze", icon: FileSearch },
  { name: "Mock Interview", href: "/interview", icon: MessageSquare },
  { name: "Alumni Log", href: "/alumni", icon: BookOpen },
  { name: "Company Intel", href: "/intel", icon: Building2 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-slate-900 border-r border-slate-800">
      <div className="flex h-16 shrink-0 items-center px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-indigo-500 rounded-lg p-1.5">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">PrepSync AI</span>
        </Link>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto px-4 py-4">
        <nav className="flex-1 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  isActive
                    ? "bg-indigo-500/10 text-indigo-400"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white",
                  "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
                )}
              >
                <item.icon
                  className={clsx(
                    isActive ? "text-indigo-400" : "text-slate-400 group-hover:text-white",
                    "h-5 w-5 shrink-0"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
