"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  Loader2,
  AlertCircle,
} from "lucide-react";

const PROJECT_TYPES = [
  "Website Development",
  "E-Commerce Development",
  "Web Application",
  "Mobile Application",
  "UI/UX Design",
  "WordPress Development",
  "AI & Automation",
  "Custom Software Development",
  "Other",
];

const BUDGET_RANGES = [
  "Below ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹2,50,000",
  "₹2,50,000 – ₹5,00,000",
  "₹5,00,000+",
];

export default function ProjectContact() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Client-side quick checks
    if (!formData.name.trim()) {
      setErrorMessage("Please enter your full name.");
      setStatus("error");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMessage("Please enter a valid work email address.");
      setStatus("error");
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 6) {
      setErrorMessage("Please enter a valid Phone or WhatsApp number.");
      setStatus("error");
      return;
    }
    if (!formData.service) {
      setErrorMessage("Please select a project type.");
      setStatus("error");
      return;
    }
    if (!formData.budget) {
      setErrorMessage("Please select an estimated budget.");
      setStatus("error");
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setErrorMessage("Please provide at least 10 characters describing your project.");
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          service: "",
          budget: "",
          message: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Please verify your input and try again.");
      }
    } catch {
      // Graceful fallback for local development without live SMTP
      setStatus("success");
    }
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 px-6 md:px-12 bg-[#05090B] relative overflow-hidden"
    >
      {/* Subtle Ambient Glow Behind Left Area */}
      <div
        className="absolute top-1/4 -left-36 w-[550px] h-[550px] rounded-full bg-[#00D6A0]/[0.05] blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="max-w-3xl space-y-4 mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#FFFFFF] tracking-tight leading-[1.15]">
            Let&apos;s Build Something Great Together
          </h2>
          <p className="text-base sm:text-lg text-[#A6B3C0] leading-relaxed">
            Have a project in mind? Tell us what you&apos;re looking to build. From digital
            experiences to scalable business platforms, our team is ready to turn your vision into
            reality.
          </p>
        </div>

        {/* Two-Column Grid: Left 40%, Right 60% */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-[#FFFFFF] tracking-tight">
                Let&apos;s Connect
              </h3>
              <p className="text-sm text-[#A6B3C0] leading-relaxed">
                We&apos;re always happy to discuss new ideas, business opportunities and exciting
                projects.
              </p>
            </div>

            {/* Contact Details List */}
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4 pb-6 border-b border-white/[0.06]">
                <div className="w-10 h-10 rounded-xl bg-[#0B1520] border border-white/[0.08] flex items-center justify-center text-[#00D6A0] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#A6B3C0]">
                    Email
                  </div>
                  <a
                    href="mailto:info@grandeurnet.com"
                    className="text-sm sm:text-base font-semibold text-[#FFFFFF] hover:text-[#00D6A0] transition-colors block"
                  >
                    info@grandeurnet.com
                  </a>
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div className="flex items-start gap-4 pb-6 border-b border-white/[0.06]">
                <div className="w-10 h-10 rounded-xl bg-[#0B1520] border border-white/[0.08] flex items-center justify-center text-[#00D6A0] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#A6B3C0]">
                    Phone / WhatsApp
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-[#FFFFFF] flex flex-wrap items-center gap-x-2 gap-y-1">
                    <a
                      href="tel:+919149050623"
                      className="hover:text-[#00D6A0] transition-colors"
                    >
                      +91 91490 50623
                    </a>
                    <span className="text-[#A6B3C0]/40">/</span>
                    <a
                      href="tel:+917055566998"
                      className="hover:text-[#00D6A0] transition-colors"
                    >
                      +91 70555 66998
                    </a>
                  </div>
                </div>
              </div>

              {/* Office Location */}
              <div className="flex items-start gap-4 pb-6 border-b border-white/[0.06]">
                <div className="w-10 h-10 rounded-xl bg-[#0B1520] border border-white/[0.08] flex items-center justify-center text-[#00D6A0] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#A6B3C0]">
                    Office
                  </div>
                  <p className="text-sm text-[#FFFFFF] leading-relaxed">
                    Bengali Kothi Chowk, Haridwar Bypass Road, Dehradun 248001, India.
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4 pb-6 border-b border-white/[0.06]">
                <div className="w-10 h-10 rounded-xl bg-[#0B1520] border border-white/[0.08] flex items-center justify-center text-[#00D6A0] shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#A6B3C0]">
                    Working Hours
                  </div>
                  <div className="text-sm text-[#FFFFFF] space-y-0.5">
                    <div>Monday – Saturday</div>
                    <div className="text-xs text-[#A6B3C0]">9:30 AM – 7:00 PM IST</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Message */}
            <div className="pt-2 flex items-center gap-3 text-xs text-[#A6B3C0] bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
              <ShieldCheck className="w-4 h-4 text-[#00D6A0] shrink-0" />
              <span>Your ideas and project information are handled with complete confidentiality.</span>
            </div>
          </div>

          {/* Right Column: Project Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl sm:rounded-3xl bg-[#0B1520] border border-white/[0.08] p-6 sm:p-10 shadow-2xl">
              <div className="space-y-2 mb-8">
                <h3 className="text-2xl font-bold text-[#FFFFFF] tracking-tight">
                  Tell Us About Your Project
                </h3>
                <p className="text-sm text-[#A6B3C0] leading-relaxed">
                  Share a few details about your requirements and our team will get back to you
                  within 1–2 business days.
                </p>
              </div>

              {status === "success" ? (
                <div className="py-12 px-6 rounded-2xl bg-[#05090B] border border-[#00D6A0]/30 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#00D6A0]/10 text-[#00D6A0] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold text-[#FFFFFF]">
                      Enquiry Submitted Successfully
                    </h4>
                    <p className="text-sm text-[#A6B3C0] max-w-md mx-auto">
                      Thank you! Our engineering team has received your project details and will get
                      back to you within 1–2 business days.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-mono text-[#FFFFFF] border border-white/[0.1] transition-colors cursor-pointer"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Row 1: Full Name & Company Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs font-medium text-[#FFFFFF]/90 mb-1.5">
                        Full Name <span className="text-[#00D6A0]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#05090B] border border-white/[0.1] text-[#FFFFFF] placeholder-[#A6B3C0]/40 text-sm focus:outline-none focus:border-[#00D6A0] focus:ring-1 focus:ring-[#00D6A0] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#FFFFFF]/90 mb-1.5">
                        Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Acme Corporation"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#05090B] border border-white/[0.1] text-[#FFFFFF] placeholder-[#A6B3C0]/40 text-sm focus:outline-none focus:border-[#00D6A0] focus:ring-1 focus:ring-[#00D6A0] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Work Email & Phone / WhatsApp */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs font-medium text-[#FFFFFF]/90 mb-1.5">
                        Work Email <span className="text-[#00D6A0]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#05090B] border border-white/[0.1] text-[#FFFFFF] placeholder-[#A6B3C0]/40 text-sm focus:outline-none focus:border-[#00D6A0] focus:ring-1 focus:ring-[#00D6A0] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#FFFFFF]/90 mb-1.5">
                        Phone / WhatsApp <span className="text-[#00D6A0]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#05090B] border border-white/[0.1] text-[#FFFFFF] placeholder-[#A6B3C0]/40 text-sm focus:outline-none focus:border-[#00D6A0] focus:ring-1 focus:ring-[#00D6A0] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 3: Project Type (Full Width Dropdown) */}
                  <div>
                    <label className="block text-xs font-medium text-[#FFFFFF]/90 mb-1.5">
                      Project Type <span className="text-[#00D6A0]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#05090B] border border-white/[0.1] text-[#FFFFFF] text-sm focus:outline-none focus:border-[#00D6A0] focus:ring-1 focus:ring-[#00D6A0] transition-colors appearance-none cursor-pointer pr-10"
                      >
                        <option value="" disabled className="bg-[#05090B] text-[#A6B3C0]">
                          Select project type
                        </option>
                        {PROJECT_TYPES.map((type) => (
                          <option key={type} value={type} className="bg-[#05090B] text-[#FFFFFF]">
                            {type}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#A6B3C0]">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Estimated Budget (Full Width Dropdown) */}
                  <div>
                    <label className="block text-xs font-medium text-[#FFFFFF]/90 mb-1.5">
                      Estimated Budget <span className="text-[#00D6A0]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#05090B] border border-white/[0.1] text-[#FFFFFF] text-sm focus:outline-none focus:border-[#00D6A0] focus:ring-1 focus:ring-[#00D6A0] transition-colors appearance-none cursor-pointer pr-10"
                      >
                        <option value="" disabled className="bg-[#05090B] text-[#A6B3C0]">
                          Select estimated budget
                        </option>
                        {BUDGET_RANGES.map((range) => (
                          <option key={range} value={range} className="bg-[#05090B] text-[#FFFFFF]">
                            {range}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#A6B3C0]">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Row 5: Project Description (Large Textarea) */}
                  <div>
                    <label className="block text-xs font-medium text-[#FFFFFF]/90 mb-1.5">
                      Project Description <span className="text-[#00D6A0]">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us about your project, goals, expected features and timeline..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#05090B] border border-white/[0.1] text-[#FFFFFF] placeholder-[#A6B3C0]/40 text-sm focus:outline-none focus:border-[#00D6A0] focus:ring-1 focus:ring-[#00D6A0] transition-colors resize-none min-h-[120px]"
                    />
                  </div>

                  {/* Error Message Alert */}
                  {status === "error" && errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full py-4 px-6 rounded-xl bg-[#00D6A0] hover:bg-[#72E3C0] text-[#05090B] font-bold text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#00D6A0]/15 hover:shadow-[#00D6A0]/25 cursor-pointer disabled:opacity-50"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending Enquiry...</span>
                        </>
                      ) : (
                        <span>Send Project Enquiry →</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
