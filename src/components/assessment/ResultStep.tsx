"use client";

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { fadeUp } from './AssessmentUI';
import { ScoreRing, DimBar } from './ScoreDisplay';
import type { ResultStepProps } from './StepProps';

export function ResultStep({ score, dimensions, answers }: ResultStepProps) {
  const t = useTranslations('assessmentForm');
  const nextItems = t.raw('result.nextItems') as string[];

  return (
    <motion.div key="result" {...fadeUp} style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
      <h2 style={{ fontSize: 28, fontWeight: 600, color: 'var(--color-charcoal, #1C1917)', marginBottom: 20, fontFamily: "var(--font-display, 'Lora', serif)" }}>
        {t('result.heading')}
      </h2>

      <ScoreRing score={score} />

      {/* What happens next */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{
          background: 'var(--color-white, #fff)', borderRadius: 8,
          border: '1px solid var(--color-stone-200, #E7E5E4)',
          borderLeft: '4px solid var(--color-teal, #0F766E)',
          padding: '20px', marginBottom: 24, textAlign: 'left',
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-teal, #0F766E)', marginBottom: 16, fontFamily: "var(--font-mono, 'Geist Mono', monospace)" }}>
          {t('result.nextHeading')}
        </div>
        <div style={{ fontSize: 14, color: 'var(--color-stone-600, #57534E)', lineHeight: 1.8 }}>
          {t.rich('result.nextIntro', {
            domain: answers.website || 'your domain',
            strong: (chunks) => <strong style={{ color: 'var(--color-charcoal, #1C1917)' }}>{chunks}</strong>,
          })}
        </div>
        <ul style={{ fontSize: 14, color: 'var(--color-stone-600, #57534E)', lineHeight: 1.8, marginTop: 8, paddingLeft: 20 }}>
          {nextItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--color-stone-100, #F5F5F4)', fontSize: 13, color: 'var(--color-stone-600, #57534E)', lineHeight: 1.6 }}>
          {t.rich('result.nextTimeline', {
            strong: (chunks) => <strong style={{ color: 'var(--color-charcoal, #1C1917)' }}>{chunks}</strong>,
          })}
        </div>
      </motion.div>

      {/* Dimensions */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.5 }} style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--color-stone-200, #E7E5E4)', textAlign: 'left' }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--color-charcoal, #1C1917)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {t('result.dimensionsHeading')}
        </div>
        {dimensions.map((dim, idx) => (
          <DimBar key={dim.label} dim={{ ...dim, label: t(`dimensions.${dim.label}`) }} delay={900 + idx * 150} />
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
        style={{ marginTop: 28, padding: 16, background: 'var(--color-teal-pale, #F0FDFA)', borderRadius: 8, fontSize: 13, color: 'var(--color-stone-600, #57534E)', lineHeight: 1.5 }}
      >
        {t('result.cta')}
      </motion.div>

      {/* Get Full Report Button */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.0 }} style={{ marginTop: 24 }}>
        <Link href="/contact">
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            style={{ width: '100%', padding: '12px 32px', background: 'var(--color-teal, #0F766E)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
          >
            {t('result.ctaButton')}
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
