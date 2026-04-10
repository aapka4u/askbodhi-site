"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full border-b" style={{ borderColor: "var(--color-stone-200)", backgroundColor: "var(--color-bg)" }}>
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4 lg:px-[var(--spacing-page)]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline">
          <div className="relative w-9 h-9">
            {/* Convergence symbol — three overlapping circles */}
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <circle cx="18" cy="12" r="10" fill="#0F766E" fillOpacity="0.08" stroke="#0F766E" strokeOpacity="0.15" strokeWidth="0.8" />
              <circle cx="12" cy="22" r="10" fill="#0F766E" fillOpacity="0.08" stroke="#0F766E" strokeOpacity="0.15" strokeWidth="0.8" />
              <circle cx="24" cy="22" r="10" fill="#0F766E" fillOpacity="0.08" stroke="#0F766E" strokeOpacity="0.15" strokeWidth="0.8" />
              <circle cx="18" cy="18.5" r="2.5" fill="#0F766E" />
              <circle cx="18" cy="18.5" r="3.5" stroke="#14B8A6" strokeWidth="0.8" fill="none" />
            </svg>
          </div>
          <span
            className="text-xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-charcoal)" }}
          >
            AskBodhi
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#services"
            className="text-sm no-underline transition-colors"
            style={{ fontFamily: "var(--font-body)", color: "var(--color-stone-600)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-teal)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-stone-600)")}
          >
            Services
          </Link>
          <Link
            href="#results"
            className="text-sm no-underline transition-colors"
            style={{ fontFamily: "var(--font-body)", color: "var(--color-stone-600)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-teal)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-stone-600)")}
          >
            Results
          </Link>
          <Link
            href="#approach"
            className="text-sm no-underline transition-colors"
            style={{ fontFamily: "var(--font-body)", color: "var(--color-stone-600)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-teal)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-stone-600)")}
          >
            Approach
          </Link>
          <Link
            href="/contact"
            className="text-sm font-semibold no-underline px-5 py-2.5 rounded-lg transition-colors"
            style={{
              fontFamily: "var(--font-body)",
              backgroundColor: "var(--color-teal)",
              color: "#fff",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-teal-bright)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--color-teal)")}
          >
            Get a Free Diagnostic
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t px-6 py-4 flex flex-col gap-4" style={{ borderColor: "var(--color-stone-200)" }}>
          <Link href="#services" className="text-sm no-underline" style={{ color: "var(--color-stone-600)" }} onClick={() => setMenuOpen(false)}>
            Services
          </Link>
          <Link href="#results" className="text-sm no-underline" style={{ color: "var(--color-stone-600)" }} onClick={() => setMenuOpen(false)}>
            Results
          </Link>
          <Link href="#approach" className="text-sm no-underline" style={{ color: "var(--color-stone-600)" }} onClick={() => setMenuOpen(false)}>
            Approach
          </Link>
          <Link
            href="/contact"
            className="text-sm font-semibold no-underline px-5 py-2.5 rounded-lg text-center"
            style={{ backgroundColor: "var(--color-teal)", color: "#fff" }}
            onClick={() => setMenuOpen(false)}
          >
            Get a Free Diagnostic
          </Link>
        </div>
      )}
    </header>
  );
}
