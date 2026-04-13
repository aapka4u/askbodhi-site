"use client";

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { fadeUp } from './AssessmentUI';
import { INDUSTRY_SUGGESTIONS, COUNTRY_SUGGESTIONS } from '@/data/assessment-steps';
import Autocomplete from './Autocomplete';
import type { Answers } from '@/types/assessment';
import type { Step } from '@/types/assessment';

interface NavButtonsProps {
  goBack: () => void;
  goNext: () => void;
  canAdvance: boolean;
}

function NavButtons({ goBack, goNext, canAdvance }: NavButtonsProps) {
  const t = useTranslations('assessmentForm');
  return (
    <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={goBack}
        style={{ flex: 1, padding: '12px 20px', background: 'var(--color-stone-100, #F5F5F4)', color: 'var(--color-stone-600, #57534E)', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
        {t('nav.back')}
      </motion.button>
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={goNext} disabled={!canAdvance}
        style={{ flex: 1, padding: '12px 20px', background: canAdvance ? 'var(--color-teal, #0F766E)' : 'var(--color-stone-200, #E7E5E4)', color: canAdvance ? '#fff' : 'var(--color-stone-400, #A8A29E)', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: canAdvance ? 'pointer' : 'not-allowed' }}>
        {t('nav.continue')}
      </motion.button>
    </div>
  );
}

function StepHeader({ num, title, hint }: { num?: string; title?: string; hint?: string }) {
  const t = useTranslations('assessmentForm');
  return (
    <div style={{ marginBottom: 8 }}>
      {num && <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-teal, #0F766E)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>{t('nav.questionPrefix')} {num}</div>}
      <h2 style={{ fontSize: 28, fontWeight: 600, color: 'var(--color-charcoal, #1C1917)', marginBottom: 20, fontFamily: "var(--font-display, 'Lora', serif)" }}>{title}</h2>
      {hint && <p style={{ fontSize: 14, color: 'var(--color-stone-600, #57534E)', marginBottom: 24 }}>{hint}</p>}
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '12px 14px',
  border: '1px solid var(--color-stone-200, #E7E5E4)', borderRadius: 8,
  fontFamily: "var(--font-body, 'Instrument Sans', sans-serif)", fontSize: 14,
  color: 'var(--color-charcoal, #1C1917)', background: 'var(--color-white, #fff)',
  transition: 'border-color 0.2s, box-shadow 0.2s', outline: 'none',
};

function focusHandler(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.target.style.borderColor = 'var(--color-teal, #0F766E)';
  e.target.style.boxShadow = '0 0 0 3px rgba(15, 118, 110, 0.1)';
}
function blurHandler(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.target.style.borderColor = '';
  e.target.style.boxShadow = '';
}

interface FormProps {
  step: Step;
  answers: Answers;
  answerKey: string;
  canAdvance: boolean;
  setAnswer: (key: string, val: string) => void;
  selectOption: (num: string, value: string) => void;
  goNext: () => void;
  goBack: () => void;
}

export function FieldsStep({ step, answers, canAdvance, setAnswer, goNext, goBack }: FormProps) {
  const t = useTranslations('assessmentForm');
  if (step.type !== 'fields') return null;
  const num = step.num!;
  const title = t(`steps.q${num}.title`);
  const hint = t(`steps.q${num}.hint`);

  return (
    <motion.div key={`fields-${num}`} {...fadeUp} style={{ maxWidth: 600, margin: '0 auto' }}>
      <StepHeader num={num} title={title} hint={hint} />
      {step.fields.map((fieldGroup, idx) => {
        if (fieldGroup.row) {
          return (
            <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              {fieldGroup.row.map((f) => (
                <div key={f.id}>
                  <label style={{ display: 'block', fontWeight: 500, marginBottom: 8, fontSize: 14, color: 'var(--color-charcoal, #1C1917)' }}>{t(`steps.q${num}.fields.${f.id}.label`)}</label>
                  <input type={f.type || 'text'} id={f.id} placeholder={t(`steps.q${num}.fields.${f.id}.placeholder`)} value={answers[f.id] || ''} onChange={(e) => setAnswer(f.id, e.target.value)} required={f.required} style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
                </div>
              ))}
            </div>
          );
        }
        if (fieldGroup.single) {
          const f = fieldGroup.single;
          const isAutocomplete = f.id === 'industry' || f.id === 'country';
          const suggestions = f.id === 'industry' ? INDUSTRY_SUGGESTIONS : f.id === 'country' ? COUNTRY_SUGGESTIONS : [];
          if (isAutocomplete) {
            return (
              <div key={f.id} style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontWeight: 500, marginBottom: 8, fontSize: 14, color: 'var(--color-charcoal, #1C1917)' }}>{t(`steps.q${num}.fields.${f.id}.label`)}</label>
                <Autocomplete items={suggestions} value={answers[f.id] || ''} onChange={(val) => setAnswer(f.id, val)} placeholder={t(`steps.q${num}.fields.${f.id}.placeholder`)} label="" />
              </div>
            );
          }
          return (
            <div key={f.id} style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontWeight: 500, marginBottom: 8, fontSize: 14, color: 'var(--color-charcoal, #1C1917)' }}>{t(`steps.q${num}.fields.${f.id}.label`)}</label>
              <input type={f.type || 'text'} id={f.id} placeholder={t(`steps.q${num}.fields.${f.id}.placeholder`)} value={answers[f.id] || ''} onChange={(e) => setAnswer(f.id, e.target.value)} required={f.required} style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
            </div>
          );
        }
        return null;
      })}
      <NavButtons goBack={goBack} goNext={goNext} canAdvance={canAdvance} />
    </motion.div>
  );
}

export function ChoiceStep({ step, answers, answerKey, canAdvance, selectOption, goNext, goBack }: FormProps) {
  const t = useTranslations('assessmentForm');
  if (step.type !== 'choice') return null;
  const num = step.num!;
  const title = t(`steps.q${num}.title`);
  const hint = t.has(`steps.q${num}.hint`) ? t(`steps.q${num}.hint`) : undefined;

  return (
    <motion.div key={`choice-${num}`} {...fadeUp} style={{ maxWidth: 600, margin: '0 auto' }}>
      <StepHeader num={num} title={title} hint={hint} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {step.options?.map((opt) => (
          <motion.div key={opt.key} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => selectOption(step.num!, opt.value)}
            style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', border: `1px solid ${answers[answerKey] === opt.value ? 'var(--color-teal, #0F766E)' : 'var(--color-stone-200, #E7E5E4)'}`, borderRadius: 8, background: answers[answerKey] === opt.value ? 'var(--color-teal-pale, #F0FDFA)' : 'var(--color-white, #fff)', cursor: 'pointer', transition: 'all 0.2s', fontSize: 14, color: 'var(--color-charcoal, #1C1917)', fontWeight: answers[answerKey] === opt.value ? 500 : 400 }}>
            <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${answers[answerKey] === opt.value ? 'var(--color-teal, #0F766E)' : 'var(--color-stone-200, #E7E5E4)'}`, background: answers[answerKey] === opt.value ? 'var(--color-teal, #0F766E)' : 'transparent', marginRight: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {answers[answerKey] === opt.value && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />}
            </div>
            {t(`steps.q${num}.options.${opt.value}`)}
          </motion.div>
        ))}
      </div>
      <NavButtons goBack={goBack} goNext={goNext} canAdvance={canAdvance} />
    </motion.div>
  );
}

export function TextStep({ step, answers, canAdvance, setAnswer, goNext, goBack }: FormProps) {
  const t = useTranslations('assessmentForm');
  if (step.type !== 'text') return null;
  const num = step.num!;
  const title = t(`steps.q${num}.title`);
  const hint = t.has(`steps.q${num}.hint`) ? t(`steps.q${num}.hint`) : undefined;
  const placeholder = t(`steps.q${num}.placeholder`);

  return (
    <motion.div key={`text-${num}`} {...fadeUp} style={{ maxWidth: 600, margin: '0 auto' }}>
      <StepHeader num={num} title={title} hint={hint} />
      <div style={{ marginBottom: 24 }}>
        <textarea placeholder={placeholder} value={answers[step.field.id] || ''} onChange={(e) => setAnswer(step.field.id, e.target.value)}
          style={{ ...inputStyle, minHeight: 120, resize: 'vertical' as const }} onFocus={focusHandler} onBlur={blurHandler} />
      </div>
      <NavButtons goBack={goBack} goNext={goNext} canAdvance={canAdvance} />
    </motion.div>
  );
}
