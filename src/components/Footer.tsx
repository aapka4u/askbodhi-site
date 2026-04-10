import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="w-full border-t mt-auto"
      style={{ borderColor: "var(--color-stone-200)", backgroundColor: "var(--color-stone-100)" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <p
              className="text-lg font-bold mb-2"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-charcoal)" }}
            >
              AskBodhi
            </p>
            <p className="text-sm" style={{ color: "var(--color-stone-400)" }}>
              AI-Led Growth for Forward-Thinking Companies
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--color-stone-400)" }}>
              See clearly. Act decisively. Grow intelligently.
            </p>
          </div>

          {/* Services */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ fontFamily: "var(--font-body)", color: "var(--color-stone-400)" }}
            >
              Services
            </p>
            <ul className="space-y-2 list-none p-0 m-0">
              <li>
                <Link href="#services" className="text-sm no-underline" style={{ color: "var(--color-stone-600)" }}>
                  SEO &amp; GEO Optimization
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-sm no-underline" style={{ color: "var(--color-stone-600)" }}>
                  Custom AI Engines
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-sm no-underline" style={{ color: "var(--color-stone-600)" }}>
                  Digital Diagnostics
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-sm no-underline" style={{ color: "var(--color-stone-600)" }}>
                  Growth Strategy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ fontFamily: "var(--font-body)", color: "var(--color-stone-400)" }}
            >
              Contact
            </p>
            <p className="text-sm" style={{ color: "var(--color-stone-600)" }}>
              info@knowesg.com
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--color-stone-400)" }}>
              Netherlands &middot; Serving globally
            </p>
          </div>
        </div>

        <div
          className="mt-10 pt-6 border-t text-center"
          style={{ borderColor: "var(--color-stone-200)" }}
        >
          <p className="text-xs" style={{ color: "var(--color-stone-400)" }}>
            &copy; {new Date().getFullYear()} AskBodhi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
