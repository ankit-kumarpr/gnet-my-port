"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  Globe2,
  Navigation,
} from "lucide-react";

export default function CompanyLocationSection() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-[#F3F6FA] dark:bg-[#071321] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* =========================================================================
              LEFT COLUMN: Company Address, Contact Info & Direct Start Project CTA
              ========================================================================= */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-white/[0.08] text-[#00A980] dark:text-[#00C99A] font-mono text-[11px] font-bold uppercase tracking-wider mb-4 shadow-sm">
                <MapPin className="w-3.5 h-3.5" />
                <span>Headquarters & Production Labs</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-[#10243A] dark:text-white tracking-tight leading-tight">
                Engineering Out of <br />
                <span className="text-[#00A980] dark:text-[#00C99A]">Dehradun, India</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-[#8999AD] leading-relaxed font-normal">
                Based in the foothills of Uttarakhand, we deliver enterprise-grade digital systems
                for ambitious brands across India, North America, the UK, the UAE, and Australia.
              </p>
            </div>

            {/* Address & Contact Specifications Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-white/[0.08] shadow-sm space-y-4">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/[0.05] flex items-center justify-center text-[#00A980] dark:text-[#00C99A] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400 dark:text-[#8999AD] uppercase tracking-wider">
                    Physical Address
                  </div>
                  <div className="text-sm font-bold text-[#10243A] dark:text-white mt-0.5">
                    Bengali Kothi Chowk, Haridwar Bypass Rd
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Dehradun, Uttarakhand 248001, India
                  </div>
                </div>
              </div>

              {/* Direct Telephone */}
              <div className="flex items-center gap-3.5 pt-3 border-t border-slate-100 dark:border-white/[0.06]">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/[0.05] flex items-center justify-center text-[#00A980] dark:text-[#00C99A] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400 dark:text-[#8999AD] uppercase tracking-wider">
                    Direct Line
                  </div>
                  <a
                    href="tel:+919149251680"
                    className="text-sm font-bold text-[#10243A] dark:text-white hover:text-[#00A980] dark:hover:text-[#00C99A] transition-colors"
                  >
                    +91 91492 51680
                  </a>
                </div>
              </div>

              {/* Official Email */}
              <div className="flex items-center gap-3.5 pt-3 border-t border-slate-100 dark:border-white/[0.06]">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/[0.05] flex items-center justify-center text-[#00A980] dark:text-[#00C99A] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400 dark:text-[#8999AD] uppercase tracking-wider">
                    Client Inquiries
                  </div>
                  <a
                    href="mailto:info@grandeurnet.com"
                    className="text-sm font-bold text-[#10243A] dark:text-white hover:text-[#00A980] dark:hover:text-[#00C99A] transition-colors"
                  >
                    info@grandeurnet.com
                  </a>
                </div>
              </div>

              {/* SLA Response Time */}
              <div className="flex items-center gap-3.5 pt-3 border-t border-slate-100 dark:border-white/[0.06]">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/[0.05] flex items-center justify-center text-[#00A980] dark:text-[#00C99A] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400 dark:text-[#8999AD] uppercase tracking-wider">
                    Response Benchmark
                  </div>
                  <div className="text-sm font-semibold text-[#10243A] dark:text-white">
                    Guaranteed Sub-2 Hr SLA Response
                  </div>
                </div>
              </div>
            </div>

            {/* Start a Project Primary Action Button */}
            <div className="pt-2">
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-[#05090B] bg-gradient-to-r from-[#00C99A] to-[#00BF8F] hover:from-[#10B981] hover:to-[#00C99A] shadow-lg shadow-[#00C99A]/20 hover:shadow-[#00C99A]/35 transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 stroke-[2.5]" />
              </Link>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Interactive Dehradun Map Presentation
              ========================================================================= */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl p-3 sm:p-4 bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-white/[0.08] shadow-xl shadow-slate-200/50 dark:shadow-black/40">
              {/* Map Canvas / Embedded Frame */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] w-full bg-slate-100 dark:bg-[#071321]">
                <iframe
                  title="Grandeur Net Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13778.225576722883!2d78.0247!3d30.2863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3909299447e1d529%3A0xcda7ce0839e144a!2sBengali%20Kothi%2C%20Dehradun%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-full border-0 filter grayscale-[0.2] contrast-[1.05]"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Floating Map Pin Badge */}
                <div className="absolute bottom-4 left-4 right-4 z-10 p-3.5 rounded-xl bg-white/95 dark:bg-[#071321]/95 backdrop-blur-md border border-slate-200 dark:border-white/[0.1] shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#00C99A] text-[#05090B] flex items-center justify-center font-bold">
                      <Navigation className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#10243A] dark:text-white">
                        Grandeur Net HQ
                      </div>
                      <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                        30.2863° N, 78.0247° E
                      </div>
                    </div>
                  </div>

                  <a
                    href="https://maps.google.com/?q=Bengali+Kothi+Chowk+Haridwar+Bypass+Rd+Dehradun"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono font-bold text-[#00A980] dark:text-[#00C99A] hover:underline flex items-center gap-1"
                  >
                    <span>Get Directions</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
