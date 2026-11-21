import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Twitter, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-brand-border/60 text-slate-400 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-green flex items-center justify-center font-bold text-lg text-brand-dark">
                G
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Grandeur <span className="text-brand-green">Net</span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed max-w-sm text-slate-400">
              Dehradun’s premier digital engineering agency. Architecting high-conversion
              e-commerce, web applications, and AI automations for ambitious brands worldwide.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-brand-surface border border-brand-border flex items-center justify-center text-slate-300 hover:text-brand-green hover:border-brand-green transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-brand-surface border border-brand-border flex items-center justify-center text-slate-300 hover:text-brand-green hover:border-brand-green transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-brand-surface border border-brand-border flex items-center justify-center text-slate-300 hover:text-brand-green hover:border-brand-green transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-brand-green transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="#projects" className="hover:text-brand-green transition-colors">
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-brand-green transition-colors">
                  Core Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-green transition-colors">
                  About the Team
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-brand-green transition-colors">
                  Book Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Case Studies */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-4">
              Flagship Work
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <span className="text-slate-300 hover:text-brand-green cursor-pointer">
                  Kraftwood Luxury E-Commerce
                </span>
              </li>
              <li>
                <span className="text-slate-300 hover:text-brand-green cursor-pointer">
                  Divyanshi PropTech Engine
                </span>
              </li>
              <li>
                <span className="text-slate-300 hover:text-brand-green cursor-pointer">
                  GT Travels Booking Hub
                </span>
              </li>
              <li>
                <span className="text-slate-300 hover:text-brand-green cursor-pointer">
                  Interiorpreneurs Marketplace
                </span>
              </li>
              <li>
                <span className="text-slate-300 hover:text-brand-green cursor-pointer">
                  Apex Cloud Automations
                </span>
              </li>
            </ul>
          </div>

          {/* Address & Office */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-4">
              Offices
            </h4>
            <div className="space-y-3 text-xs leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                <span>
                  Bengali Kothi Chowk, Haridwar Bypass Rd, Dehradun, Uttarakhand, 248001
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-green shrink-0" />
                <span>info@grandeurnet.com</span>
              </div>
              <div className="pt-2 text-brand-green font-mono">
                +91 91490 50623
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Security note */}
        <div className="pt-8 border-t border-brand-border/40 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Grandeur Net. All rights reserved. Designed & Engineered
            with precision.
          </div>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Disclosure</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
