import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AskBodhi — AI-Led Growth for Forward-Thinking Companies",
  description:
    "AskBodhi helps companies grow through AI-led SEO, Generative Engine Optimization, custom AI engines, and digital diagnostics. Based in the Netherlands, serving globally.",
  alternates: { canonical: "https://askbodhi.com" },
};

const services = [
  {
    title: "SEO & GEO",
    description:
      "Technical audits, content strategy, and Generative Engine Optimization. Get cited by ChatGPT, Perplexity, and Google AI Overviews — not just ranked by Google.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    title: "AI Engines",
    description:
      "Custom AI engines built for your domain — from product recommendation systems to intelligent content generation that drives organic and paid performance.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
  },
  {
    title: "Digital Diagnostics",
    description:
      "A full traffic architecture breakdown revealing what percentage of your organic traffic actually drives revenue — and where the hidden opportunities are.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: "Growth Strategy",
    description:
      "Content strategy, conversion optimization, paid search advisory, and competitive analysis. A fractional growth team powered by AI, working at your pace.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex-1">
        {/* ========== HERO ========== */}
        <section
          className="w-full"
          style={{ backgroundColor: "var(--color-bg)" }}
        >
          <div className="max-w-6xl mx-auto px-6 py-20 lg:py-32 lg:px-24">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--color-teal)", fontFamily: "var(--font-body)" }}
            >
              AI-Led Growth Consultancy
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-charcoal)" }}
            >
              Your company deserves to be{" "}
              <span style={{ color: "var(--color-teal)" }}>found</span> —{" "}
              <br className="hidden md:block" />
              by humans <em>and</em> AI.
            </h1>
            <p
              className="text-lg md:text-xl max-w-2xl mb-10"
              style={{ color: "var(--color-stone-600)", fontFamily: "var(--font-body)" }}
            >
              AskBodhi helps forward-thinking companies become the top digital asset
              in their sector — through SEO, Generative Engine Optimization, custom AI engines,
              and data-driven growth strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg text-base font-semibold no-underline transition-colors"
                style={{
                  backgroundColor: "var(--color-teal)",
                  color: "#fff",
                  fontFamily: "var(--font-body)",
                }}
              >
                Get a Free Diagnostic
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg text-base font-semibold no-underline border transition-colors"
                style={{
                  borderColor: "var(--color-stone-200)",
                  color: "var(--color-stone-600)",
                  fontFamily: "var(--font-body)",
                  backgroundColor: "var(--color-white)",
                }}
              >
                See How We Work
              </Link>
            </div>
          </div>
        </section>

        {/* ========== PROOF BAR ========== */}
        <section
          className="w-full border-y"
          style={{ borderColor: "var(--color-stone-200)", backgroundColor: "var(--color-white)" }}
        >
          <div className="max-w-6xl mx-auto px-6 py-10 lg:px-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p
                className="text-3xl font-bold"
                style={{ fontFamily: "var(--font-mono)", color: "var(--color-teal)" }}
              >
                +56%
              </p>
              <p className="text-sm mt-1" style={{ color: "var(--color-stone-400)" }}>
                Paid performance lift via AI engine
              </p>
            </div>
            <div>
              <p
                className="text-3xl font-bold"
                style={{ fontFamily: "var(--font-mono)", color: "var(--color-teal)" }}
              >
                13K+
              </p>
              <p className="text-sm mt-1" style={{ color: "var(--color-stone-400)" }}>
                Organic clicks recovered in 90 days
              </p>
            </div>
            <div>
              <p
                className="text-3xl font-bold"
                style={{ fontFamily: "var(--font-mono)", color: "var(--color-teal)" }}
              >
                KD 0–2
              </p>
              <p className="text-sm mt-1" style={{ color: "var(--color-stone-400)" }}>
                Keyword difficulty on GEO terms in NL
              </p>
            </div>
          </div>
        </section>

        {/* ========== SERVICES ========== */}
        <section
          id="services"
          className="w-full"
          style={{ backgroundColor: "var(--color-bg)" }}
        >
          <div className="max-w-6xl mx-auto px-6 py-20 lg:px-24">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--color-teal)", fontFamily: "var(--font-body)" }}
            >
              What We Do
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-12"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-charcoal)" }}
            >
              Four pillars of AI-led growth
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((s) => (
                <div
                  key={s.title}
                  className="rounded-xl border p-8 transition-shadow hover:shadow-md"
                  style={{
                    borderColor: "var(--color-stone-200)",
                    backgroundColor: "var(--color-white)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: "var(--color-teal-pale)", color: "var(--color-teal)" }}
                  >
                    {s.icon}
                  </div>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-charcoal)" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-stone-600)" }}>
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== RESULTS / PROOF ========== */}
        <section
          id="results"
          className="w-full"
          style={{ backgroundColor: "var(--color-stone-100)" }}
        >
          <div className="max-w-6xl mx-auto px-6 py-20 lg:px-24">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--color-teal)", fontFamily: "var(--font-body)" }}
            >
              Real Results
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-12"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-charcoal)" }}
            >
              We let the numbers speak
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Case 1: Boekengilde */}
              <div
                className="rounded-xl border overflow-hidden"
                style={{ borderColor: "var(--color-stone-200)", backgroundColor: "var(--color-white)" }}
              >
                <div className="h-1" style={{ backgroundColor: "var(--color-teal)" }} />
                <div className="p-8">
                  <p
                    className="text-xs uppercase tracking-wider font-semibold mb-1"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--color-stone-400)" }}
                  >
                    Case Study
                  </p>
                  <h3
                    className="text-xl font-bold mb-4"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-charcoal)" }}
                  >
                    Boekengilde
                  </h3>
                  <p className="text-sm mb-6" style={{ color: "var(--color-stone-600)" }}>
                    A multi-brand Dutch printing group needed to break through a performance ceiling.
                    We built a custom AI recommendation engine that transformed how their paid campaigns
                    targeted and converted visitors.
                  </p>
                  <div className="flex gap-6">
                    <div>
                      <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--color-teal)" }}>
                        +56%
                      </p>
                      <p className="text-xs" style={{ color: "var(--color-stone-400)" }}>
                        Paid performance lift
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--color-teal)" }}>
                        13K
                      </p>
                      <p className="text-xs" style={{ color: "var(--color-stone-400)" }}>
                        Organic clicks in 90 days
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Case 2: EximPe */}
              <div
                className="rounded-xl border overflow-hidden"
                style={{ borderColor: "var(--color-stone-200)", backgroundColor: "var(--color-white)" }}
              >
                <div className="h-1" style={{ backgroundColor: "var(--color-ember)" }} />
                <div className="p-8">
                  <p
                    className="text-xs uppercase tracking-wider font-semibold mb-1"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--color-stone-400)" }}
                  >
                    Case Study
                  </p>
                  <h3
                    className="text-xl font-bold mb-4"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-charcoal)" }}
                  >
                    EximPe
                  </h3>
                  <p className="text-sm mb-6" style={{ color: "var(--color-stone-600)" }}>
                    A fintech platform with 11,000 monthly visits and near-zero commercial traffic.
                    Our traffic architecture breakdown revealed the content-traffic mismatch — and
                    a complete blog restructuring turned informational visitors into pipeline.
                  </p>
                  <div className="flex gap-6">
                    <div>
                      <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--color-ember)" }}>
                        11K
                      </p>
                      <p className="text-xs" style={{ color: "var(--color-stone-400)" }}>
                        Monthly visits (zero commercial)
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--color-teal)" }}>
                        Fixed
                      </p>
                      <p className="text-xs" style={{ color: "var(--color-stone-400)" }}>
                        Content-traffic mismatch resolved
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== APPROACH ========== */}
        <section
          id="approach"
          className="w-full"
          style={{ backgroundColor: "var(--color-bg)" }}
        >
          <div className="max-w-6xl mx-auto px-6 py-20 lg:px-24">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--color-teal)", fontFamily: "var(--font-body)" }}
            >
              Our Approach
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-12"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-charcoal)" }}
            >
              Diagnose first, then build
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Foundation & Audit",
                  desc: "Full digital diagnostic per brand. Traffic architecture breakdown, technical SEO audit, GEO readiness assessment, competitive landscape analysis.",
                },
                {
                  step: "02",
                  title: "Build & Deploy",
                  desc: "Execute the prioritized fix list. Implement schema markup, restructure content, build AI engines, optimize for AI citation across ChatGPT, Perplexity, and AI Overviews.",
                },
                {
                  step: "03",
                  title: "Optimize & Scale",
                  desc: "Weekly scorecards, continuous optimization, expand to additional brands. Prove results on one brand, then replicate across the group.",
                },
              ].map((phase) => (
                <div key={phase.step}>
                  <p
                    className="text-4xl font-bold mb-3"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--color-teal-pale)" }}
                  >
                    {phase.step}
                  </p>
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-charcoal)" }}
                  >
                    {phase.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-stone-600)" }}>
                    {phase.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== CTA ========== */}
        <section
          className="w-full"
          style={{ backgroundColor: "var(--color-teal-pale)" }}
        >
          <div className="max-w-6xl mx-auto px-6 py-20 lg:px-24 text-center">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-charcoal)" }}
            >
              Find out where your traffic really goes
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto mb-8"
              style={{ color: "var(--color-stone-600)", fontFamily: "var(--font-body)" }}
            >
              Get a free traffic architecture breakdown. We&apos;ll show you what percentage
              of your organic traffic actually drives revenue — and what to do about it.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 rounded-lg text-lg font-semibold no-underline transition-colors"
              style={{
                backgroundColor: "var(--color-teal)",
                color: "#fff",
                fontFamily: "var(--font-body)",
              }}
            >
              Request Your Free Diagnostic
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
