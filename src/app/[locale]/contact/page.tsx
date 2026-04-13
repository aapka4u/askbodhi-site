"use client";

export const dynamic = "force-dynamic";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <Header />

      <main className="flex-1" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="max-w-3xl mx-auto px-6 py-20 lg:py-28 lg:px-24">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--color-teal)", fontFamily: "var(--font-body)" }}
          >
            {t("contact.label")}
          </p>
          <h1
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-charcoal)" }}
          >
            {t("contact.title")}
          </h1>
          <p
            className="text-lg mb-10"
            style={{ color: "var(--color-stone-600)", fontFamily: "var(--font-body)" }}
          >
            {t("contact.description")}
          </p>

          {submitted ? (
            <div
              className="rounded-xl border p-10 text-center"
              style={{ borderColor: "var(--color-stone-200)", backgroundColor: "var(--color-teal-pale)" }}
            >
              <p
                className="text-2xl font-bold mb-2"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-teal)" }}
              >
                {t("contact.successTitle")}
              </p>
              <p style={{ color: "var(--color-stone-600)" }}>
                {t("contact.successMessage")}
              </p>
            </div>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setSubmitting(true);
                setError(null);
                const form = e.currentTarget;
                const formData = new FormData(form);
                try {
                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      name: formData.get("name"),
                      email: formData.get("email"),
                      website: formData.get("website"),
                      message: formData.get("message"),
                    }),
                  });
                  if (!res.ok) throw new Error("Submission failed");
                  setSubmitted(true);
                } catch {
                  setError(t("contact.form.error"));
                } finally {
                  setSubmitting(false);
                }
              }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1.5"
                  style={{ color: "var(--color-charcoal)", fontFamily: "var(--font-body)" }}>
                  {t("contact.form.nameLabel")}
                </label>
                <input id="name" name="name" type="text" required
                  className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors focus:ring-2"
                  style={{ borderColor: "var(--color-stone-200)", backgroundColor: "var(--color-white)", color: "var(--color-charcoal)", fontFamily: "var(--font-body)" }}
                  placeholder={t("contact.form.namePlaceholder")} />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5"
                  style={{ color: "var(--color-charcoal)", fontFamily: "var(--font-body)" }}>
                  {t("contact.form.emailLabel")}
                </label>
                <input id="email" name="email" type="email" required
                  className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors focus:ring-2"
                  style={{ borderColor: "var(--color-stone-200)", backgroundColor: "var(--color-white)", color: "var(--color-charcoal)", fontFamily: "var(--font-body)" }}
                  placeholder={t("contact.form.emailPlaceholder")} />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium mb-1.5"
                  style={{ color: "var(--color-charcoal)", fontFamily: "var(--font-body)" }}>
                  {t("contact.form.websiteLabel")}
                </label>
                <input id="website" name="website" type="url" required
                  className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors focus:ring-2"
                  style={{ borderColor: "var(--color-stone-200)", backgroundColor: "var(--color-white)", color: "var(--color-charcoal)", fontFamily: "var(--font-body)" }}
                  placeholder={t("contact.form.websitePlaceholder")} />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1.5"
                  style={{ color: "var(--color-charcoal)", fontFamily: "var(--font-body)" }}>
                  {t("contact.form.messageLabel")}
                </label>
                <textarea id="message" name="message" rows={4}
                  className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors focus:ring-2 resize-y"
                  style={{ borderColor: "var(--color-stone-200)", backgroundColor: "var(--color-white)", color: "var(--color-charcoal)", fontFamily: "var(--font-body)" }}
                  placeholder={t("contact.form.messagePlaceholder")} />
              </div>

              {error && (
                <p className="text-sm rounded-lg px-4 py-3" style={{ color: "var(--color-ember)", backgroundColor: "var(--color-ember-soft)" }}>
                  {error}
                </p>
              )}

              <button type="submit" disabled={submitting}
                className="w-full sm:w-auto px-10 py-3.5 rounded-lg text-base font-semibold transition-colors cursor-pointer"
                style={{ backgroundColor: submitting ? "var(--color-stone-400)" : "var(--color-teal)", color: "#fff", fontFamily: "var(--font-body)", border: "none" }}>
                {submitting ? t("contact.form.submittingButton") : t("contact.form.submitButton")}
              </button>

              <p className="text-xs" style={{ color: "var(--color-stone-400)" }}>
                {t("contact.form.disclaimer")}
              </p>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
