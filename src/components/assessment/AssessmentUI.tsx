"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { CompetitorResult } from '@/types/assessment';

// Animation variants — shared across steps
export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] as const } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] as const } },
};

// ─── Logo SVG ────────────────────────────────────────────
export function LogoSvg({ size = 32 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width={size} height={size} style={{ color: 'var(--color-teal, #0F766E)' }}>
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="1" r="1" />
      <circle cx="12" cy="23" r="1" />
      <circle cx="1" cy="12" r="1" />
      <circle cx="23" cy="12" r="1" />
      <line x1="12" y1="4" x2="12" y2="10" strokeLinecap="round" />
      <line x1="12" y1="14" x2="12" y2="20" strokeLinecap="round" />
    </svg>
  );
}

// ─── Scan Terminal Line ──────────────────────────────────
export function ScanLine({ text, delay, done }: { text: string; delay: number; done?: boolean }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        fontFamily: "var(--font-mono, 'Geist Mono', monospace)",
        fontSize: 14,
        color: done ? 'var(--color-teal-bright, #14B8A6)' : 'var(--color-stone-400, #A8A29E)',
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <span style={{ color: done ? 'var(--color-teal-bright, #14B8A6)' : 'var(--color-ember, #EA580C)' }}>
        {done ? '✓' : '→'}
      </span>
      {text}
      {!done && (
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          style={{
            display: 'inline-block',
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--color-teal-bright, #14B8A6)',
            marginLeft: 4,
          }}
        />
      )}
    </motion.div>
  );
}

// ─── Metric Card ───────────────────────────────────────
export function MetricCard({ label, value }: { label: string; value: string | number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        textAlign: 'center',
        padding: '16px',
        background: 'var(--color-stone-100, #F5F5F4)',
        borderRadius: 8,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display, 'Lora', serif)",
          fontSize: 28,
          fontWeight: 700,
          color: 'var(--color-teal, #0F766E)',
          lineHeight: 1,
          marginBottom: 4,
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 12, color: 'var(--color-stone-600, #57534E)', fontWeight: 500 }}>
        {label}
      </div>
    </motion.div>
  );
}

// ─── Competitor Chip ───────────────────────────────────
export function CompetitorChip(
  { comp, index, onToggle }: { comp: CompetitorResult; index: number; onToggle: () => void }
) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.35 }}
      onClick={onToggle}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '14px 16px',
        background: comp.checked ? 'var(--color-teal-pale, #F0FDFA)' : 'var(--color-white, #fff)',
        border: `1px solid ${comp.checked ? 'var(--color-teal, #0F766E)' : 'var(--color-stone-200, #E7E5E4)'}`,
        borderRadius: 8,
        cursor: 'pointer',
        transition: 'all 0.2s',
        userSelect: 'none' as const,
      }}
    >
      <div
        style={{
          width: 18, height: 18, borderRadius: 4,
          border: `2px solid ${comp.checked ? 'var(--color-teal, #0F766E)' : 'var(--color-stone-200, #E7E5E4)'}`,
          background: comp.checked ? 'var(--color-teal, #0F766E)' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s',
        }}
      >
        {comp.checked && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        )}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-charcoal, #1C1917)' }}>{comp.domain}</div>
        <div style={{ fontSize: 12, color: 'var(--color-stone-400, #A8A29E)', marginTop: 2 }}>
          {comp.commonKeywords} shared keywords
        </div>
      </div>
      <div
        style={{
          padding: '3px 8px', borderRadius: 4,
          background: 'var(--color-teal-pale, #F0FDFA)', color: 'var(--color-teal, #0F766E)',
          fontSize: 11, fontWeight: 600, border: '1px solid var(--color-teal, #0F766E)',
        }}
      >
        DR {comp.dr}
      </div>
    </motion.div>
  );
}
