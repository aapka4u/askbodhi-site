// Assessment types for AskBodhi AI Readiness Assessment

export interface Answers {
  [key: string]: string;
}

export interface FieldConfig {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}

export interface OptionConfig {
  key: string;
  text: string;
  value: string;
}

export interface AutocompleteConfig {
  id: string;
  placeholder: string;
  suggestions: string[];
}

export interface StepBase {
  type: string;
  num?: string;
  title?: string;
  hint?: string;
}

export interface IntroStep extends StepBase {
  type: 'intro';
}

export interface FieldsStep extends StepBase {
  type: 'fields';
  fields: Array<{
    row?: FieldConfig[];
    single?: FieldConfig;
    autocomplete?: AutocompleteConfig;
  }>;
}

export interface ChoiceStep extends StepBase {
  type: 'choice';
  options: OptionConfig[];
}

export interface TextStep extends StepBase {
  type: 'text';
  field: { id: string; placeholder: string; multiline?: boolean };
  optional?: boolean;
}

export interface ScanStep extends StepBase {
  type: 'scan';
}

export interface CompetitorsAiStep extends StepBase {
  type: 'competitors_ai';
}

export interface ResultStep extends StepBase {
  type: 'result';
}

export type Step =
  | IntroStep
  | FieldsStep
  | ChoiceStep
  | TextStep
  | ScanStep
  | CompetitorsAiStep
  | ResultStep;

export interface ScanResult {
  domainRating: number;
  organicKeywords: number;
  monthlyTraffic: number;
}

export interface CompetitorResult {
  domain: string;
  dr: number;
  commonKeywords: number;
  checked: boolean;
}

export interface DimensionScore {
  label: string;
  value: number;
  max: number;
  color: string;
}
