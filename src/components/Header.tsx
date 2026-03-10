"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Expertise", href: "#expertise" },
  { label: "Réalisations", href: "#realisations" },
  { label: "À Propos", href: "#apropos" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div id="progress-bar" style={{ width: `${progress}%` }} />
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#001F3F]/95 backdrop-blur-md shadow-lg shadow-black/30"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3">
            <Image
              src="/images/logo.jpeg"
              alt="NH Construction Plus"
              width={48}
              height={48}
              className="rounded-md object-contain"
            />
            <span className="text-white font-black text-sm md:text-base leading-tight">
              NH CONSTRUCTION<br />
              <span className="text-[#FF8C00]">PLUS</span>
            </span>
          </a>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-[#FF8C00] text-sm font-semibold transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C00] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* CTA desktop */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 bg-[#FF8C00] hover:bg-[#e07b00] text-white font-bold text-sm px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105 shadow-lg shadow-orange-900/30"
          >
            Demander un devis
          </a>

          {/* Burger mobile */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <div className="md:hidden bg-[#001F3F]/98 backdrop-blur-md border-t border-white/10 px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-white/80 hover:text-[#FF8C00] font-semibold py-2 border-b border-white/10"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="bg-[#FF8C00] text-white font-bold text-center py-3 rounded-full mt-2"
            >
              Demander un devis
            </a>
          </div>
        )}
      </header>
    </>
  );
}
