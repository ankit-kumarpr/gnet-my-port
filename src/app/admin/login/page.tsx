"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Shield, Lock, Mail, Eye, EyeOff, ArrowRight, Loader2, AlertCircle } from "lucide-react";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("from") || "/admin/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed. Please verify credentials.");
      }

      router.push(redirectPath);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl bg-[#0C1721]/90 backdrop-blur-xl border border-white/[0.08] p-6 sm:p-8 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] space-y-6">
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-semibold text-[#A5B2C0] uppercase tracking-wider">
            Administrator Email
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#A5B2C0] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@grandeurnet.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#070D14] border border-white/[0.1] focus:border-[#00D6A0] text-sm text-[#F5F8FA] placeholder:text-[#A5B2C0]/40 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-semibold text-[#A5B2C0] uppercase tracking-wider">
            Access Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#A5B2C0] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#070D14] border border-white/[0.1] focus:border-[#00D6A0] text-sm text-[#F5F8FA] placeholder:text-[#A5B2C0]/40 outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A5B2C0] hover:text-[#F5F8FA] transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-[#00D6A0] to-[#00BF8F] hover:from-[#10B981] hover:to-[#00D6A0] text-[#050A0B] text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#00D6A0]/20 hover:shadow-[#00D6A0]/35 transition-all disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Verifying Credentials...</span>
            </>
          ) : (
            <>
              <span>Sign In To Dashboard</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </>
          )}
        </button>
      </form>

      {/* Quick Credential Hint for Initial Setup */}
      <div className="pt-3 border-t border-white/[0.06] text-center">
        <p className="text-[11px] font-mono text-[#A5B2C0]/70">
          Default Admin: <span className="text-[#00D6A0]">admin@grandeurnet.com</span>
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#050A0B] text-[#F5F8FA] flex flex-col justify-center items-center px-4 sm:px-6 relative overflow-hidden">
      {/* Background radial accent glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#00D6A0]/[0.06] rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-8">
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-block group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/grandeur-net-logo-dark.png"
              alt="Grandeur Net"
              className="h-10 w-auto mx-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0C1721] border border-[#00D6A0]/30 text-[#00D6A0] text-xs font-mono font-medium">
            <Shield className="w-3.5 h-3.5" />
            <span>CENTRAL ADMINISTRATIVE GATEWAY</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F8FA] tracking-tight">
            Grandeur CMS Sign In
          </h1>
          <p className="text-xs sm:text-sm text-[#A5B2C0]">
            Authenticate to manage case studies, project media & categories.
          </p>
        </div>

        {/* Suspense boundary for useSearchParams */}
        <Suspense
          fallback={
            <div className="p-12 rounded-3xl bg-[#0C1721] border border-white/[0.08] flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-[#00D6A0] animate-spin" />
            </div>
          }
        >
          <LoginFormContent />
        </Suspense>

        {/* Return to website */}
        <div className="text-center">
          <Link
            href="/"
            className="text-xs font-mono text-[#A5B2C0] hover:text-[#00D6A0] transition-colors"
          >
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
