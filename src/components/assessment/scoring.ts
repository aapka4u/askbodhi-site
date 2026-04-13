import type { Answers, DimensionScore } from '@/types/assessment';

// Map step numbers to named answer keys
export const STEP_KEY_MAP: Record<string, string> = {
  '03': 'companySize',
  '04': 'discovery',
  '05': 'revenueTracking',
  '06': 'aiCited',
  '07': 'schemaMarkup',
  '08': 'aiMaturity',
  '09': 'challenge',
  '10': 'wish',
  '11': 'foundAskBodhi',
};

export function computeScore(answers: Answers): number {
  let score = 45; // base

  if (answers.companySize === '200+') score += 8;
  else if (answers.companySize === '51-200') score += 5;

  if (answers.discovery === 'google') score += 8;
  else if (answers.discovery === 'ai_search') score += 10;

  if (answers.revenueTracking === 'yes') score += 7;

  if (answers.aiCited === 'yes_cited') score += 12;
  else if (answers.aiCited === 'yes_not_cited') score += 3;

  if (answers.schemaMarkup === 'yes_ext') score += 8;
  else if (answers.schemaMarkup === 'some') score += 4;

  if (answers.aiMaturity === 'embedded') score += 10;
  else if (answers.aiMaturity === 'some') score += 6;

  if (answers.challenge === 'no_strategy') score += 5;

  if (answers.foundAskBodhi === 'google' || answers.foundAskBodhi === 'ai') score += 3;

  return Math.min(score, 100);
}

export function computeDimensions(answers: Answers): DimensionScore[] {
  return [
    {
      label: 'searchVisibility',
      value: Math.min(100, 30 + (answers.discovery === 'google' ? 40 : 20)),
      max: 100, color: 'var(--color-teal, #0F766E)',
    },
    {
      label: 'aiReadiness',
      value: Math.min(100, answers.aiMaturity === 'embedded' ? 80 : answers.aiMaturity === 'some' ? 60 : 30),
      max: 100, color: 'var(--color-teal-bright, #14B8A6)',
    },
    {
      label: 'technicalFoundation',
      value: Math.min(100, answers.schemaMarkup === 'yes_ext' ? 85 : answers.schemaMarkup === 'some' ? 55 : 25),
      max: 100, color: 'var(--color-ember, #EA580C)',
    },
    {
      label: 'contentStrategy',
      value: Math.min(100, answers.challenge === 'no_strategy' ? 40 : 65),
      max: 100, color: 'var(--color-teal, #0F766E)',
    },
    {
      label: 'competitivePosition',
      value: Math.min(100, 45 + (answers.companySize === '200+' ? 30 : 15)),
      max: 100, color: 'var(--color-teal-bright, #14B8A6)',
    },
  ];
}
