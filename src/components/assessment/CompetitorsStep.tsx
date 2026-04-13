"use client";

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { fadeUp } from './AssessmentUI';
import type { BaseStepProps } from './StepProps';

interface Props extends Pick<BaseStepProps, 'answers' | 'setAnswer' | 'goNext' | 'goBack'> {}

export function CompetitorsStep({ answers, setAnswer, goNext, goBack }: Props) {
  const t = useTranslations('assessmentForm');

  return (
    <motion.div key="competitors" {...fadeUp} style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
      <h2 style={{ fontSize: 24, fontWeight: 600, color: 'var(--color-charcoal, #1C1917)', marginBottom: 6, fontFamily: "var(--font-display, 'Lora', serif)" }}>
        {t('competitors.heading')}
      </h2>
      <p style={{ fontSize: 14, color: 'var(--color-stone-600, #57534E)', marginBottom: 24 }}>
        {t('competitors.description')}
      </p>

      <textarea
        value={answers.competitorList || ''}
        onChange={(e) => setAnswer('competitorList', e.target.value)}
        placeholder={t('competitors.placeholder')}
        style={{
          width: '100%', minHeight: 100, padding: '12px 14px',
          border: '1px solid var(--color-stone-200, #E7E5E4)', borderRadius: 8,
          fontFamily: "var(--font-body, 'Instrument Sans', sans-serif)", fontSize: 14,
          color: 'var(--color-charcoal, #1C1917)', background: 'var(--color-white, #fff)',
          outline: 'none', resize: 'vertical',
        }}
      />

      <p style={{ fontSize: 12, color: 'var(--color-stone-400, #A8A29E)', marginTop: 12, marginBottom: 24 }}>
        {t('competitors.note')}
      </p>

      <div style={{ display: 'flex', gap: 12 }}>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={goBack}
          style={{ flex: 1, padding: '12px 20px', background: 'var(--color-stone-100, #F5F5F4)', color: 'var(--color-stone-600, #57534E)', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          {t('nav.back')}
        </motion.button>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={goNext}
          style={{ flex: 1, padding: '12px 20px', background: 'var(--color-teal, #0F766E)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          {t('nav.continue')}
        </motion.button>
      </div>
    </motion.div>
  );
}
