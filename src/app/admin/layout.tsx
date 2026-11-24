"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  PlusCircle,
  Tag,
  ShieldCheck,
  LogOut,
  ExternalLink,
  Menu,
  X,
  User,
  History,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<{
    name: string;
    email: string;
    role: string;
  } | null>(null);

  // Fetch session details on mount (unconditionally at top level)
  useEffect(() => {
    if (pathname === "/admin/login") return;

    fetch("/api/admin/auth/me")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        if (data.authenticated && data.user) {
          setAdminUser(data.user);
        }
      })
      .catch(() => {});
  }, [pathname]);

  // Skip layout chrome for login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      router.push("/admin/login");
    }
  };

  const navLinks = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      active: pathname === "/admin/dashboard",
    },
    {
      href: "/admin/projects",
      label: "Projects",
      icon: FolderKanban,
      active: pathname === "/admin/projects",
    },
    {
      href: "/admin/projects/create",
      label: "New Project",
      icon: PlusCircle,
      active: pathname === "/admin/projects/create",
    },
    {
      href: "/admin/categories",
      label: "Categories",
      icon: Tag,
      active: pathname === "/admin/categories",
    },
    {
      href: "/admin/audit-logs",
      label: "Audit Logs",
      icon: History,
      active: pathname === "/admin/audit-logs",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050A0B] text-[#F5F8FA] flex flex-col md:flex-row">
      {/* ------------------------------------------------------------------ */}
      {/* 1. DESKTOP SIDEBAR NAVIGATION                                     */}
      {/* ------------------------------------------------------------------ */}
      <aside className="hidden md:flex flex-col w-64 bg-[#09121B] border-r border-white/[0.08] p-5 shrink-0 justify-between h-screen sticky top-0">
        <div className="space-y-6">
          {/* Logo & Agency Tag */}
          <div className="space-y-3 pb-4 border-b border-white/[0.08]">
            <Link href="/" className="inline-block group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/grandeur-net-logo-dark.png"
                alt="Grandeur Net"
                className="h-8 w-auto object-contain transition-transform group-hover:scale-102"
              />
            </Link>
            <div className="flex items-center gap-2 text-[10px] font-mono text-[#00D6A0] uppercase font-bold tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D6A0] animate-pulse" />
              <span>Project CMS Panel</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-medium transition-all ${
                    item.active
                      ? "bg-[#00D6A0] text-[#050A0B] font-bold shadow-md shadow-[#00D6A0]/20"
                      : "text-[#A5B2C0] hover:text-[#F5F8FA] hover:bg-white/[0.05]"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Admin Details & Actions */}
        <div className="space-y-3 pt-4 border-t border-white/[0.08]">
          {/* Admin User Card */}
          <div className="p-3 rounded-xl bg-[#0C1721] border border-white/[0.06] flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00D6A0]/15 text-[#00D6A0] flex items-center justify-center font-bold text-xs">
              <User className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-[#F5F8FA] truncate">
                {adminUser?.name || "Administrator"}
              </div>
              <div className="text-[10px] font-mono text-[#00D6A0] truncate uppercase">
                {adminUser?.role || "superadmin"}
              </div>
            </div>
          </div>

          {/* External Public View */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-mono text-[#A5B2C0] hover:text-[#00D6A0] hover:bg-white/[0.03] transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </span>
            <span className="text-[10px] text-white/40">Live ↗</span>
          </Link>

          {/* Logout Action */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ------------------------------------------------------------------ */}
      {/* 2. MOBILE HEADER & NAVIGATION DRAWER                              */}
      {/* ------------------------------------------------------------------ */}
      <header className="md:hidden bg-[#09121B] border-b border-white/[0.08] p-4 flex items-center justify-between sticky top-0 z-50">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/grandeur-net-logo-dark.png"
            alt="Grandeur Net"
            className="h-7 w-auto object-contain"
          />
          <span className="text-[10px] font-mono font-bold text-[#00D6A0]">CMS</span>
        </Link>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-white/[0.05] text-[#F5F8FA]"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[61px] bottom-0 z-40 bg-[#050A0B]/95 backdrop-blur-xl p-5 flex flex-col justify-between">
          <nav className="space-y-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-mono font-medium transition-all ${
                    item.active
                      ? "bg-[#00D6A0] text-[#050A0B] font-bold"
                      : "text-[#A5B2C0] hover:text-[#F5F8FA] bg-[#0C1721]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="space-y-3 pt-4 border-t border-white/[0.08]">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.05] text-xs font-mono text-[#A5B2C0]"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View Public Website</span>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-xl bg-red-500/10 text-red-400 text-xs font-mono font-bold flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 3. MAIN CMS CONTENT AREA                                          */}
      {/* ------------------------------------------------------------------ */}
      <main className="flex-1 overflow-y-auto min-h-screen p-4 sm:p-6 lg:p-10">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
