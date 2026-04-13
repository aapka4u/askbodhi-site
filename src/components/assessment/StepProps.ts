import type { Answers, ScanResult, CompetitorResult, DimensionScore, PageSpeedResult, AiVisibilityResult } from '@/types/assessment';
import type { Step } from '@/types/assessment';

export interface BaseStepProps {
  step: Step;
  answers: Answers;
  answerKey: string;
  canAdvance: boolean;
  setAnswer: (key: string, val: string) => void;
  goNext: () => void;
  goBack: () => void;
}

export interface ChoiceStepProps extends BaseStepProps {
  selectOption: (num: string, value: string) => void;
}

export interface ScanStepProps {
  scanPhase: 'scanning' | 'results';
  scanResult: ScanResult | null;
  pageSpeed?: PageSpeedResult | null;
  aiVisibility?: AiVisibilityResult | null;
}

export interface CompetitorsStepProps extends BaseStepProps {
  competitors: CompetitorResult[];
  setCompetitors: React.Dispatch<React.SetStateAction<CompetitorResult[]>>;
  competitorText: string;
  setCompetitorText: (val: string) => void;
}

export interface ResultStepProps {
  score: number;
  dimensions: DimensionScore[];
  scanResult: ScanResult | null;
  competitors: CompetitorResult[];
  answers: Answers;
}
