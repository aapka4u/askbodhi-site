"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { DimensionScore } from '@/types/assessment';

// ─── Score Ring SVG ────────────────────────────────────
export function ScoreRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 80;
  const offset = circumference - (circumference * score) / 100;

  return (
    <div style={{ width: 200, height: 200, margin: '0 auto 24px', position: 'relative' }}>
      <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-teal)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--color-teal-bright)" stopOpacity="1" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="80" fill="none" stroke="var(--color-stone-100, #F5F5F4)" strokeWidth="8" />
        <motion.circle
          cx="100" cy="100" r="80" fill="none"
          stroke="url(#scoreGradient)" strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 2.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </svg>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ fontFamily: "var(--font-display, 'Lora', serif)", fontSize: 48, fontWeight: 700, color: 'var(--color-teal, #0F766E)', lineHeight: 1 }}
        >
          {score}
        </motion.div>
        <div style={{ fontSize: 12, color: 'var(--color-stone-600, #57534E)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          out of 100
        </div>
      </motion.div>
    </div>
  );
}

// ─── Dimension Bar ─────────────────────────────────────
export function DimBar({ dim, delay }: { dim: DimensionScore; delay: number }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
      <span style={{ fontSize: 13, color: 'var(--color-stone-600, #57534E)', width: 160, flexShrink: 0, fontWeight: 500 }}>{dim.label}</span>
      <div style={{ flex: 1, height: 6, borderRadius: 3, background: 'var(--color-stone-100, #F5F5F4)', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: animated ? `${(dim.value / dim.max) * 100}%` : '0%' }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          style={{ height: '100%', borderRadius: 3, background: 'linear-gradient(90deg, var(--color-teal, #0F766E), var(--color-teal-bright, #14B8A6))' }}
        />
      </div>
      <span
        style={{
          fontFamily: "var(--font-mono, 'Geist Mono', monospace)",
          fontSize: 13, fontWeight: 600, width: 44, textAlign: 'right',
          color: 'var(--color-charcoal, #1C1917)',
        }}
      >
        {animated ? dim.value : 0}/{dim.max}
      </span>
    </div>
  );
}
