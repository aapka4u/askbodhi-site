'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { STEPS, INDUSTRY_SUGGESTIONS, COUNTRY_SUGGESTIONS } from '@/data/assessment-steps';
import type { Answers, ScanResult, CompetitorResult, DimensionScore } from '@/types/assessment';
import Autocomplete from '@/components/assessment/Autocomplete';

/* ======================================================
   AskBodhi AI Readiness Assessment — Live Intelligence
   ====================================================== */

// Animation variants
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] as const } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] as const } },
};

const staggerChild = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
};

// ─── Logo SVG ────────────────────────────────────────────
function LogoSvg({ size = 32 }: { size?: number }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" width={size} height={size}>
      <circle cx="18" cy="12" r="10" fill="#0F766E" fillOpacity="0.08" stroke="#0F766E" strokeOpacity="0.15" strokeWidth="0.8" />
      <circle cx="12" cy="22" r="10" fill="#0F766E" fillOpacity="0.08" stroke="#0F766E" strokeOpacity="0.15" strokeWidth="0.8" />
      <circle cx="24" cy="22" r="10" fill="#0F766E" fillOpacity="0.08" stroke="#0F766E" strokeOpacity="0.15" strokeWidth="0.8" />
      <circle cx="18" cy="18.5" r="2.5" fill="#0F766E" />
      <circle cx="18" cy="18.5" r="3.5" stroke="#14B8A6" strokeWidth="0.8" fill="none" />
    </svg>
  );
}

// ─── Scan Terminal Line ──────────────────────────────────
function ScanLine({ text, delay, done }: { text: string; delay: number; done?: boolean }) {
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

// ─── Metric Card ─────────────────────────────────────────
function MetricCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        textAlign: 'center',
        padding: '24px 16px',
        background: 'var(--color-white, #fff)',
        borderRadius: 12,
        border: '1px solid var(--color-stone-200, #E7E5E4)',
        minWidth: 140,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono, 'Geist Mono', monospace)",
          fontSize: 36,
          fontWeight: 700,
          color: accent,
          lineHeight: 1,
          marginBottom: 8,
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 13, color: 'var(--color-stone-400, #A8A29E)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}
      </div>
    </motion.div>
  );
}

// ─── Competitor Chip ─────────────────────────────────────
function CompetitorChip({
  comp,
  index,
  onToggle,
}: {
  comp: CompetitorResult;
  index: number;
  onToggle: () => void;
}) {
  // DR color intensity
  const drBg = comp.dr >= 80 ? 'var(--color-teal, #0F766E)' : comp.dr >= 60 ? 'var(--color-teal-bright, #14B8A6)' : 'var(--color-stone-400, #A8A29E)';

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
        padding: '14px 18px',
        background: comp.checked ? 'var(--color-teal-pale, #F0FDFA)' : 'var(--color-white, #fff)',
        border: `1.5px solid ${comp.checked ? 'var(--color-teal, #0F766E)' : 'var(--color-stone-200, #E7E5E4)'}`,
        borderRadius: 12,
        cursor: 'pointer',
        transition: 'all 0.2s',
        userSelect: 'none' as const,
      }}
    >
      {/* Checkbox */}
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 6,
          border: `2px solid ${comp.checked ? 'var(--color-teal, #0F766E)' : 'var(--color-stone-200, #E7E5E4)'}`,
          background: comp.checked ? 'var(--color-teal, #0F766E)' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'all 0.2s',
        }}
      >
        {comp.checked && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        )}
      </div>

      {/* Domain */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-charcoal, #1C1917)' }}>{comp.domain}</div>
        <div
          style={{
            fontSize: 12,
            color: 'var(--color-stone-400, #A8A29E)',
            fontFamily: "var(--font-mono, 'Geist Mono', monospace)",
          }}
        >
          {comp.commonKeywords} shared keywords
        </div>
      </div>

      {/* DR Pill */}
      <div
        style={{
          padding: '4px 10px',
          borderRadius: 20,
          background: drBg,
          color: '#fff',
          fontSize: 12,
          fontWeight: 700,
          fontFamily: "var(--font-mono, 'Geist Mono', monospace)",
          letterSpacing: '0.02em',
        }}
      >
        DR {comp.dr}
      </div>
    </motion.div>
  );
}

// ─── Score Ring SVG ──────────────────────────────────────
function ScoreRing({ score, animated }: { score: number; animated: boolean }) {
  const circumference = 2 * Math.PI * 80;
  const offset = animated ? circumference - (circumference * score) / 100 : circumference;
  const band = score >= 75 ? 'AI-Ready' : score >= 50 ? 'Emerging' : score >= 25 ? 'Catching Up' : 'Starting Line';
  const bandColor = score >= 75 ? 'var(--color-teal, #0F766E)' : score >= 50 ? 'var(--color-teal-bright, #14B8A6)' : score >= 25 ? 'var(--color-ember, #EA580C)' : 'var(--color-stone-400)';

  return (
    <div style={{ width: 200, height: 200, margin: '0 auto 24px', position: 'relative' }}>
      <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
        <circle cx="100" cy="100" r="80" fill="none" stroke="var(--color-stone-100, #F5F5F4)" strokeWidth="8" />
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="var(--color-teal, #0F766E)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 2.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: '44%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: "var(--font-mono, 'Geist Mono', monospace)",
          fontSize: 52,
          fontWeight: 700,
          color: 'var(--color-charcoal, #1C1917)',
        }}
      >
        {animated ? score : 0}
      </div>
      {animated && (
        <div
          style={{
            position: 'absolute',
            top: '65%',
            left: '50%',
            transform: 'translate(-50%, 0)',
            fontSize: 13,
            fontWeight: 600,
            color: bandColor,
            whiteSpace: 'nowrap',
          }}
        >
          {band}
        </div>
      )}
    </div>
  );
}

// ─── Intelligence Comparison Card ────────────────────────
function IntelCard({ scan, competitors }: { scan: ScanResult | null; competitors: CompetitorResult[] }) {
  if (!scan) return null;

  const avgDr = competitors.length > 0 ? Math.round(competitors.reduce((s, c) => s + c.dr, 0) / competitors.length) : 0;
  const avgKw = competitors.length > 0 ? Math.round(competitors.reduce((s, c) => s + c.commonKeywords, 0) / competitors.length) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      style={{
        background: 'var(--color-white, #fff)',
        borderRadius: 12,
        border: '1px solid var(--color-stone-200, #E7E5E4)',
        borderLeft: '4px solid var(--color-teal, #0F766E)',
        padding: '24px',
        margin: '32px 0 24px',
        textAlign: 'left',
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--color-teal, #0F766E)',
          marginBottom: 16,
          fontFamily: "var(--font-mono, 'Geist Mono', monospace)",
        }}
      >
        Intelligence Summary
      </div>

      {/* Comparison rows */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '12px 16px', alignItems: 'center', fontSize: 14 }}>
        <div style={{ fontWeight: 600, color: 'var(--color-stone-400)' }}></div>
        <div style={{ fontWeight: 600, color: 'var(--color-teal)', fontSize: 12, textTransform: 'uppercase', textAlign: 'center' }}>You</div>
        <div style={{ color: 'var(--color-stone-400)', fontSize: 12, textAlign: 'center' }}>vs</div>
        <div style={{ fontWeight: 600, color: 'var(--color-ember)', fontSize: 12, textTransform: 'uppercase', textAlign: 'center' }}>Comp. Avg</div>

        <div style={{ color: 'var(--color-stone-600)' }}>Domain Rating</div>
        <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: 'var(--color-charcoal)', textAlign: 'center' }}>{scan.domainRating}</div>
        <div style={{ color: 'var(--color-stone-400)', textAlign: 'center' }}>—</div>
        <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: 'var(--color-charcoal)', textAlign: 'center' }}>{avgDr}</div>

        <div style={{ color: 'var(--color-stone-600)' }}>Organic Keywords</div>
        <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: 'var(--color-charcoal)', textAlign: 'center' }}>{scan.organicKeywords.toLocaleString()}</div>
        <div style={{ color: 'var(--color-stone-400)', textAlign: 'center' }}>—</div>
        <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: 'var(--color-charcoal)', textAlign: 'center' }}>{avgKw.toLocaleString()}</div>

        <div style={{ color: 'var(--color-stone-600)' }}>Monthly Traffic</div>
        <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: 'var(--color-charcoal)', textAlign: 'center' }}>~{scan.monthlyTraffic.toLocaleString()}</div>
        <div style={{ color: 'var(--color-stone-400)', textAlign: 'center' }}>—</div>
        <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: 'var(--color-charcoal)', textAlign: 'center' }}>—</div>
      </div>

      <div
        style={{
          marginTop: 16,
          paddingTop: 16,
          borderTop: '1px solid var(--color-stone-100)',
          fontSize: 14,
          color: 'var(--color-stone-600)',
          lineHeight: 1.7,
        }}
      >
        Your full report will identify exactly which keyword gaps to close first and how to improve AI visibility.
      </div>
    </motion.div>
  );
}

// ─── Dimension Bar ───────────────────────────────────────
function DimBar({ dim, delay }: { dim: DimensionScore; delay: number }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
      <span style={{ fontSize: 13, color: 'var(--color-stone-600)', width: 160, flexShrink: 0 }}>{dim.label}</span>
      <div style={{ flex: 1, height: 8, borderRadius: 4, background: 'var(--color-stone-100)', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            borderRadius: 4,
            background: dim.color,
            width: animated ? `${(dim.value / dim.max) * 100}%` : '0%',
            transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>
      <span
        style={{
          fontFamily: "var(--font-mono, 'Geist Mono', monospace)",
          fontSize: 13,
          fontWeight: 600,
          width: 44,
          textAlign: 'right',
          color: 'var(--color-charcoal)',
        }}
      >
        {animated ? dim.value : 0}/{dim.max}
      </span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN ASSESSMENT COMPONENT
// ═══════════════════════════════════════════════════════════

export default function AssessmentPage() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1=forward, -1=back
  const [answers, setAnswers] = useState<Answers>({});
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [scanPhase, setScanPhase] = useState<'scanning' | 'results'>('scanning');
  const [competitors, setCompetitors] = useState<CompetitorResult[]>([]);
  const [customCompetitor, setCustomCompetitor] = useState('');
  const [resultAnimated, setResultAnimated] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const autoAdvanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const step = STEPS[current];
  const totalQ = STEPS.length - 2; // minus intro and result

  // Compute progress
  const pct = current <= 0 ? 0 : current >= STEPS.length - 1 ? 100 : Math.round((current / totalQ) * 100);

  // Compute score
  const computeScore = useCallback(() => {
    let score = 45;
    if (answers['05'] === 'yes') score += 8;
    else if (answers['05'] === 'roughly') score += 3;
    if (answers['06'] === 'yes_cited') score += 10;
    else if (answers['06'] === 'yes_not_cited') score += 3;
    if (answers['07'] === 'yes') score += 8;
    else if (answers['07'] === 'some') score += 3;
    if (answers['08'] === 'embedded') score += 12;
    else if (answers['08'] === 'some') score += 7;
    else if (answers['08'] === 'experimenting') score += 3;
    if (answers['03'] === '51-200' || answers['03'] === '11-50') score += 4;
    return Math.min(score, 95);
  }, [answers]);

  // Navigate
  const goNext = useCallback(() => {
    if (current >= STEPS.length - 1) return;
    setDirection(1);
    setCurrent((c) => c + 1);
  }, [current]);

  const goBack = useCallback(() => {
    if (current <= 0) return;
    setDirection(-1);
    setCurrent((c) => c - 1);
  }, [current]);

  // Update answer
  const setAnswer = useCallback((key: string, val: string) => {
    setAnswers((prev) => ({ ...prev, [key]: val }));
  }, []);

  // Select option (with auto-advance)
  const selectOption = useCallback(
    (num: string, value: string) => {
      setAnswer(num, value);
      if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
      autoAdvanceRef.current = setTimeout(goNext, 400);
    },
    [setAnswer, goNext]
  );

  // Check if fields step is complete
  const fieldsComplete = useCallback(() => {
    if (step.type !== 'fields') return true;
    for (const f of step.fields) {
      const items = f.row || (f.single ? [f.single] : []);
      for (const r of items) {
        if (r.required && !answers[r.id]) return false;
      }
    }
    return true;
  }, [step, answers]);

  // Check if text step is complete
  const textComplete = useCallback(() => {
    if (step.type !== 'text') return true;
    if (step.optional) return true;
    return !!answers[step.field.id];
  }, [step, answers]);

  // Can advance?
  const canAdvance =
    step.type === 'intro' ||
    step.type === 'scan' ||
    step.type === 'competitors_ai' ||
    step.type === 'result' ||
    (step.type === 'choice' && !!answers[step.num!]) ||
    (step.type === 'fields' && fieldsComplete()) ||
    (step.type === 'text' && textComplete());

  // Keyboard handler
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Enter to advance (not in textareas unless Cmd/Ctrl+Enter)
      if (e.key === 'Enter' && !e.shiftKey) {
        const target = e.target as HTMLElement;
        if (target.tagName === 'TEXTAREA' && !e.metaKey && !e.ctrlKey) return;
        // Don't advance from autocomplete selection
        if (target.closest('.ac-group')) return;

        if (step.type === 'intro') {
          e.preventDefault();
          goNext();
        } else if (canAdvance && step.type !== 'scan' && step.type !== 'result') {
          e.preventDefault();
          goNext();
        }
      }

      // Letter shortcuts for choice questions
      if (step.type === 'choice' && step.options) {
        const key = e.key.toLowerCase();
        const opt = step.options.find((o) => o.key.toLowerCase() === key);
        if (opt) {
          selectOption(step.num!, opt.value);
        }
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [step, canAdvance, goNext, selectOption]);

  // Scan domain when reaching the scan step
  useEffect(() => {
    if (step.type !== 'scan') return;

    const scan = async () => {
      setScanPhase('scanning');
      await new Promise((r) => setTimeout(r, 2000)); // Simulate delay

      // TODO: Call real Ahrefs endpoint when token available
      const website = answers['website'] || 'example.com';
      const simulated: ScanResult = {
        domainRating: Math.floor(Math.random() * 60) + 15,
        organicKeywords: Math.floor(Math.random() * 5000) + 100,
        monthlyTraffic: Math.floor(Math.random() * 10000) + 200,
        source: 'simulated',
      };

      setScanResult(simulated);

      // Fetch competitors
      // TODO: Replace with real Ahrefs call
      const comps: CompetitorResult[] = [
        { domain: 'competitor1.com', dr: Math.floor(Math.random() * 60) + 30, commonKeywords: Math.floor(Math.random() * 100) + 20, checked: true },
        { domain: 'competitor2.com', dr: Math.floor(Math.random() * 60) + 30, commonKeywords: Math.floor(Math.random() * 100) + 20, checked: true },
        { domain: 'competitor3.com', dr: Math.floor(Math.random() * 60) + 30, commonKeywords: Math.floor(Math.random() * 100) + 20, checked: true },
      ];
      setCompetitors(comps);

      await new Promise((r) => setTimeout(r, 1000));
      setScanPhase('results');
    };

    scan();
  }, [step, answers]);

  // Animate score when reaching result step
  useEffect(() => {
    if (step.type !== 'result') return;
    const targetScore = computeScore();
    setResultAnimated(false);
    setAnimatedScore(0);

    const interval = setInterval(() => {
      setAnimatedScore((prev) => {
        if (prev >= targetScore) {
          clearInterval(interval);
          return targetScore;
        }
        return prev + Math.ceil((targetScore - prev) / 10);
      });
    }, 50);

    setTimeout(() => setResultAnimated(true), 200);
    return () => clearInterval(interval);
  }, [step, computeScore]);

  // Render steps
  const renderStep = () => {
    if (step.type === 'intro') {
      return (
        <motion.div key="intro" {...fadeUp} style={{ textAlign: 'center', maxWidth: 500, margin: '0 auto' }}>
          <LogoSvg size={60} />
          <h1 style={{ marginTop: 24, marginBottom: 12, fontSize: 36, fontWeight: 700, color: 'var(--color-charcoal)' }}>
            AI Readiness Assessment
          </h1>
          <p style={{ fontSize: 16, color: 'var(--color-stone-600)', lineHeight: 1.6, marginBottom: 32 }}>
            Understand how visible and ready your business is for an AI-first search landscape. 11 questions, ~5 minutes.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={goNext}
            style={{
              padding: '12px 32px',
              background: 'var(--color-teal, #0F766E)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Start →
          </motion.button>
        </motion.div>
      );
    }

    if (step.type === 'fields') {
      return (
        <motion.div key={`fields-${step.num}`} {...fadeUp} style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-teal)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
              Question {step.num}
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-charcoal)', marginBottom: 8 }}>{step.title}</h2>
            {step.hint && <p style={{ fontSize: 15, color: 'var(--color-stone-500)', marginBottom: 24 }}>{step.hint}</p>}
          </div>

          {step.fields.map((fieldGroup, i) => (
            <div key={i} style={{ marginBottom: fieldGroup.row ? 16 : 0 }}>
              {fieldGroup.row ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {fieldGroup.row.map((f) => (
                    <div key={f.id}>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--color-charcoal)' }}>
                        {f.label}
                      </label>
                      <input
                        type={f.type || 'text'}
                        placeholder={f.placeholder}
                        value={answers[f.id] || ''}
                        onChange={(e) => setAnswer(f.id, e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid var(--color-stone-200)',
                          borderRadius: 6,
                          fontSize: 14,
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : fieldGroup.single ? (
                <div key={fieldGroup.single.id}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--color-charcoal)' }}>
                    {fieldGroup.single.label}
                  </label>
                  <input
                    type={fieldGroup.single.type || 'text'}
                    placeholder={fieldGroup.single.placeholder}
                    value={answers[fieldGroup.single.id] || ''}
                    onChange={(e) => setAnswer(fieldGroup.single!.id, e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid var(--color-stone-200)',
                      borderRadius: 6,
                      fontSize: 14,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              ) : null}
            </div>
          ))}

          {/* Autocomplete fields */}
          {step.num === '02' && (
            <div style={{ marginTop: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--color-charcoal)' }}>
                Industry / sector
              </label>
              <Autocomplete
                items={INDUSTRY_SUGGESTIONS}
                value={answers['industry'] || ''}
                onChange={(v) => setAnswer('industry', v)}
                placeholder="Start typing..."
              />

              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, marginTop: 12, color: 'var(--color-charcoal)' }}>
                Primary market
              </label>
              <Autocomplete
                items={COUNTRY_SUGGESTIONS}
                value={answers['country'] || ''}
                onChange={(v) => setAnswer('country', v)}
                placeholder="Start typing..."
              />
            </div>
          )}
        </motion.div>
      );
    }

    if (step.type === 'choice') {
      return (
        <motion.div key={`choice-${step.num}`} {...fadeUp} style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-teal)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
              Question {step.num}
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-charcoal)', marginBottom: 12 }}>{step.title}</h2>
            {step.hint && <p style={{ fontSize: 15, color: 'var(--color-stone-500)' }}>{step.hint}</p>}
          </div>

          <motion.div style={{ display: 'flex', flexDirection: 'column', gap: 10 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ staggerChildren: 0.08, delayChildren: 0.2 }}>
            {step.options?.map((opt, i) => (
              <motion.button
                key={opt.key}
                variants={staggerChild}
                onClick={() => selectOption(step.num!, opt.value)}
                style={{
                  textAlign: 'left',
                  padding: '14px 16px',
                  background: answers[step.num!] === opt.value ? 'var(--color-teal-pale)' : 'var(--color-white)',
                  border: `1.5px solid ${answers[step.num!] === opt.value ? 'var(--color-teal)' : 'var(--color-stone-200)'}`,
                  borderRadius: 8,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontSize: 15,
                  color: 'var(--color-charcoal)',
                }}
              >
                <span style={{ fontWeight: 700, marginRight: 8 }}>{opt.key}.</span>
                {opt.text}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      );
    }

    if (step.type === 'text') {
      return (
        <motion.div key={`text-${step.num}`} {...fadeUp} style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-teal)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
              Question {step.num}
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-charcoal)', marginBottom: 12 }}>{step.title}</h2>
            {step.hint && <p style={{ fontSize: 15, color: 'var(--color-stone-500)', marginBottom: 16 }}>{step.hint}</p>}
          </div>

          <textarea
            placeholder={step.field.placeholder}
            value={answers[step.field.id] || ''}
            onChange={(e) => setAnswer(step.field.id, e.target.value)}
            style={{
              width: '100%',
              minHeight: 120,
              padding: '12px',
              border: '1px solid var(--color-stone-200)',
              borderRadius: 8,
              fontSize: 14,
              fontFamily: 'inherit',
              resize: 'vertical',
              boxSizing: 'border-box',
            }}
          />
        </motion.div>
      );
    }

    if (step.type === 'scan') {
      return (
        <motion.div key="scan" {...fadeUp} style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-charcoal)', marginBottom: 32 }}>{step.title}</h2>

          {scanPhase === 'scanning' && (
            <div style={{ padding: '24px', background: 'var(--color-black, #1C1917)', borderRadius: 8, fontFamily: "var(--font-mono)" }}>
              <ScanLine text="Resolving domain..." delay={100} />
              <ScanLine text="Querying Ahrefs API..." delay={400} />
              <ScanLine text="Analyzing competitors..." delay={800} />
              <ScanLine text="Computing metrics..." delay={1200} done={scanPhase === 'results'} />
            </div>
          )}

          {scanPhase === 'results' && scanResult && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32 }}>
              <MetricCard label="Domain Rating" value={scanResult.domainRating.toString()} accent="var(--color-teal)" />
              <MetricCard label="Organic Keywords" value={(scanResult.organicKeywords / 100).toFixed(0)} accent="var(--color-teal-bright)" />
              <MetricCard label="Monthly Traffic" value={(scanResult.monthlyTraffic / 100).toFixed(0)} accent="var(--color-ember)" />
            </motion.div>
          )}
        </motion.div>
      );
    }

    if (step.type === 'competitors_ai') {
      return (
        <motion.div key="competitors" {...fadeUp} style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-charcoal)', marginBottom: 8 }}>{step.title}</h2>
          {step.hint && <p style={{ fontSize: 15, color: 'var(--color-stone-500)', marginBottom: 24 }}>{step.hint}</p>}

          <motion.div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {competitors.map((comp, i) => (
              <CompetitorChip
                key={i}
                comp={comp}
                index={i}
                onToggle={() => {
                  setCompetitors((prev) => prev.map((c, idx) => (idx === i ? { ...c, checked: !c.checked } : c)));
                }}
              />
            ))}
          </motion.div>

          <IntelCard scan={scanResult} competitors={competitors} />
        </motion.div>
      );
    }

    if (step.type === 'result') {
      const score = computeScore();
      return (
        <motion.div key="result" {...fadeUp} style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: 'var(--color-charcoal)', marginBottom: 8 }}>Your AI Readiness Score</h1>
          <p style={{ fontSize: 15, color: 'var(--color-stone-600)', marginBottom: 40 }}>
            Based on your answers and digital footprint analysis, here's how ready you are for AI-driven growth.
          </p>

          <ScoreRing score={score} animated={resultAnimated} />

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: resultAnimated ? 1 : 0 }} transition={{ delay: 0.5 }} style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-charcoal)', marginBottom: 24 }}>Your AI Readiness Dimensions</h2>

            <div style={{ background: 'var(--color-white)', borderRadius: 12, border: '1px solid var(--color-stone-200)', padding: 24, marginBottom: 32 }}>
              {[
                { label: 'Digital Discovery', value: Math.round((score * 0.9) / 100) * 10, max: 100, color: 'var(--color-teal)' },
                { label: 'Traffic Quality', value: Math.round((score * 0.85) / 100) * 10, max: 100, color: 'var(--color-teal-bright)' },
                { label: 'AI Visibility', value: Math.round((score * 0.8) / 100) * 10, max: 100, color: 'var(--color-ember)' },
                { label: 'Competitive Position', value: Math.round((score * 0.75) / 100) * 10, max: 100, color: 'var(--color-teal)' },
                { label: 'AI Operational Readiness', value: Math.round((score * 0.7) / 100) * 10, max: 100, color: 'var(--color-teal-bright)' },
              ].map((dim, i) => (
                <DimBar key={i} dim={dim} delay={100 + i * 150} />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => (window.location.href = '/contact')}
              style={{
                padding: '12px 32px',
                background: 'var(--color-teal, #0F766E)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Get Your Full Report
            </motion.button>
          </motion.div>
        </motion.div>
      );
    }

    return null;
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-stone-50, #F9F8F7)', padding: '40px 16px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Progress bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: pct / 100 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{
            height: 3,
            background: 'var(--color-teal, #0F766E)',
            borderRadius: 2,
            marginBottom: 32,
            transformOrigin: 'left',
          }}
        />

        {/* Step content */}
        <AnimatePresence mode="wait">
          <div key={current} style={{ animation: 'fade 0.3s' }}>
            {renderStep()}
          </div>
        </AnimatePresence>

        {/* Navigation */}
        {step.type !== 'intro' && step.type !== 'result' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ display: 'flex', gap: 12, justifyContent: 'space-between', marginTop: 48, maxWidth: 600, margin: '48px auto 0' }}
          >
            <button
              onClick={goBack}
              disabled={current <= 1}
              style={{
                padding: '10px 16px',
                background: 'transparent',
                border: '1px solid var(--color-stone-200)',
                borderRadius: 6,
                fontSize: 14,
                cursor: current <= 1 ? 'default' : 'pointer',
                color: current <= 1 ? 'var(--color-stone-300)' : 'var(--color-charcoal)',
                opacity: current <= 1 ? 0.5 : 1,
              }}
            >
              ← Back
            </button>
            <button
              onClick={goNext}
              disabled={!canAdvance}
              style={{
                padding: '10px 16px',
                background: canAdvance ? 'var(--color-teal)' : 'var(--color-stone-200)',
                border: 'none',
                borderRadius: 6,
                fontSize: 14,
                color: canAdvance ? '#fff' : 'var(--color-stone-400)',
                cursor: canAdvance ? 'pointer' : 'default',
              }}
            >
              Next →
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
