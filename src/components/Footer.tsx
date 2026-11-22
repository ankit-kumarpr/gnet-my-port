import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Twitter, Mail, MapPin, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#05090C] border-t border-white/[0.08] text-[#A7B5C5] py-16 px-6 md:px-12 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-48 rounded-full bg-[#00C995]/[0.03] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* 1. Brand Identity & Brief */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#00C995] flex items-center justify-center font-black text-lg text-[#05090C] shadow-md shadow-[#00C995]/20">
                G
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Grandeur <span className="text-[#00C995]">Net</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm leading-relaxed max-w-sm text-[#A7B5C5]">
              Dehradun’s premier digital engineering agency. Architecting high-conversion
              e-commerce, web applications, and autonomous AI systems for ambitious businesses worldwide.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#080F18] border border-white/[0.08] flex items-center justify-center text-[#A7B5C5] hover:text-[#00C995] hover:border-[#00C995]/50 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#080F18] border border-white/[0.08] flex items-center justify-center text-[#A7B5C5] hover:text-[#00C995] hover:border-[#00C995]/50 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#080F18] border border-white/[0.08] flex items-center justify-center text-[#A7B5C5] hover:text-[#00C995] hover:border-[#00C995]/50 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 2. Quick Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-[#00C995] transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="#projects" className="hover:text-[#00C995] transition-colors">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-[#00C995] transition-colors">
                  Engineering Capabilities
                </Link>
              </li>
              <li>
                <Link href="#process" className="hover:text-[#00C995] transition-colors">
                  Agile Process
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#00C995] transition-colors">
                  About the Guild
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-[#00C995] transition-colors">
                  Initiate Project
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Engineering Services */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">
              Capabilities
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="#services" className="hover:text-[#00C995] transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-[#00C995] transition-colors">
                  Application Engineering
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-[#00C995] transition-colors">
                  E-Commerce Flagships
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-[#00C995] transition-colors">
                  AI & Autonomous Systems
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-[#00C995] transition-colors">
                  SEO & Performance CRO
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-[#00C995] transition-colors">
                  UI/UX & Design Systems
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Contact & Headquarters */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">
              Headquarters
            </h4>
            <div className="space-y-3 text-xs leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#00C995] shrink-0 mt-0.5" />
                <span>
                  Bengali Kothi Chowk, Haridwar Bypass Rd, Dehradun 248001, India
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#00C995] shrink-0" />
                <a href="mailto:info@grandeurnet.com" className="hover:text-[#00C995] transition-colors">
                  info@grandeurnet.com
                </a>
              </div>
              <div className="pt-2 text-[#00E5A0] font-mono font-semibold">
                +91 91490 50623
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-xs text-[#A7B5C5]/70 gap-4">
          <div>
            © {new Date().getFullYear()} Grandeur Net. All rights reserved. 100% Client-Owned Intellectual Property.
          </div>
          <div className="flex gap-6 font-mono text-[11px]">
            <Link href="#contact" className="hover:text-[#00C995] transition-colors">
              Non-Disclosure (NDA)
            </Link>
            <Link href="#contact" className="hover:text-[#00C995] transition-colors">
              SLA Guarantees
            </Link>
            <Link href="#contact" className="hover:text-[#00C995] transition-colors">
              Security Protocol
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
