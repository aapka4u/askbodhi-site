"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Header />

      <main className="flex-1" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="max-w-3xl mx-auto px-6 py-20 lg:py-28 lg:px-24">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--color-teal)", fontFamily: "var(--font-body)" }}
          >
            Free Diagnostic
          </p>
          <h1
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-charcoal)" }}
          >
            Let&apos;s find out where your traffic really goes
          </h1>
          <p
            className="text-lg mb-10"
            style={{ color: "var(--color-stone-600)", fontFamily: "var(--font-body)" }}
          >
            Fill in your details and we&apos;ll send you a free traffic architecture
            breakdown — showing what percentage of your organic traffic actually
            drives revenue.
          </p>

          {submitted ? (
            <div
              className="rounded-xl border p-10 text-center"
              style={{
                borderColor: "var(--color-stone-200)",
                backgroundColor: "var(--color-teal-pale)",
              }}
            >
              <p
                className="text-2xl font-bold mb-2"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-teal)" }}
              >
                Thank you!
              </p>
              <p style={{ color: "var(--color-stone-600)" }}>
                We&apos;ll review your site and get back to you within 48 hours
                with your traffic architecture breakdown.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // For now, just show success state.
                // Later: connect to a form handler (Formspree, Vercel functions, etc.)
                setSubmitted(true);
              }}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "var(--color-charcoal)", fontFamily: "var(--font-body)" }}
                >
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors focus:ring-2"
                  style={{
                    borderColor: "var(--color-stone-200)",
                    backgroundColor: "var(--color-white)",
                    color: "var(--color-charcoal)",
                    fontFamily: "var(--font-body)",
                  }}
                  placeholder="Rajul"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "var(--color-charcoal)", fontFamily: "var(--font-body)" }}
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors focus:ring-2"
                  style={{
                    borderColor: "var(--color-stone-200)",
                    backgroundColor: "var(--color-white)",
                    color: "var(--color-charcoal)",
                    fontFamily: "var(--font-body)",
                  }}
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label
                  htmlFor="website"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "var(--color-charcoal)", fontFamily: "var(--font-body)" }}
                >
                  Website URL
                </label>
                <input
                  id="website"
                  name="website"
                  type="url"
                  required
                  className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors focus:ring-2"
                  style={{
                    borderColor: "var(--color-stone-200)",
                    backgroundColor: "var(--color-white)",
                    color: "var(--color-charcoal)",
                    fontFamily: "var(--font-body)",
                  }}
                  placeholder="https://yourcompany.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "var(--color-charcoal)", fontFamily: "var(--font-body)" }}
                >
                  What&apos;s your biggest growth challenge right now?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors focus:ring-2 resize-y"
                  style={{
                    borderColor: "var(--color-stone-200)",
                    backgroundColor: "var(--color-white)",
                    color: "var(--color-charcoal)",
                    fontFamily: "var(--font-body)",
                  }}
                  placeholder="e.g., We get traffic but it doesn't convert, we're invisible in AI search results, our competitors outrank us..."
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-3.5 rounded-lg text-base font-semibold transition-colors cursor-pointer"
                style={{
                  backgroundColor: "var(--color-teal)",
                  color: "#fff",
                  fontFamily: "var(--font-body)",
                  border: "none",
                }}
              >
                Request My Free Diagnostic
              </button>

              <p className="text-xs" style={{ color: "var(--color-stone-400)" }}>
                No spam, no sales pitch. Just a data-driven breakdown of your traffic architecture.
              </p>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
