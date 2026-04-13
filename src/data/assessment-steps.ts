import type { Step } from '@/types/assessment';

// Industry suggestions for autocomplete
export const INDUSTRY_SUGGESTIONS = [
  'Accounting & Finance',
  'Advertising & Marketing',
  'Aerospace & Defense',
  'Agriculture & Farming',
  'Architecture & Design',
  'Automotive',
  'Banking',
  'Biotechnology',
  'Cannabis',
  'Chemicals',
  'Clean Energy & Renewables',
  'Construction',
  'Consulting',
  'Consumer Goods & FMCG',
  'Cybersecurity',
  'E-commerce & Retail',
  'Education & EdTech',
  'Electronics & Semiconductors',
  'Energy & Utilities',
  'Entertainment & Media',
  'Environmental Services',
  'ESG & Sustainability',
  'Fashion & Apparel',
  'Financial Services',
  'Food & Beverage',
  'Gaming',
  'Government & Public Sector',
  'Healthcare & Hospitals',
  'Hospitality & Travel',
  'Human Resources & Staffing',
  'Industrial Manufacturing',
  'Information Technology',
  'Insurance',
  'Legal Services',
  'Logistics & Supply Chain',
  'Manufacturing',
  'Maritime & Shipping',
  'Mining & Metals',
  'Nonprofit & NGO',
  'Oil & Gas',
  'Pharmaceuticals',
  'Printing & Publishing',
  'Professional Services',
  'Real Estate & PropTech',
  'SaaS & Software',
  'Sports & Fitness',
  'Telecommunications',
  'Transportation',
  'Venture Capital & Private Equity',
  'Waste Management',
];

// Country suggestions for autocomplete
export const COUNTRY_SUGGESTIONS = [
  'Netherlands',
  'Germany',
  'United Kingdom',
  'France',
  'Belgium',
  'United States',
  'Canada',
  'India',
  'Australia',
  'Spain',
  'Italy',
  'Sweden',
  'Norway',
  'Denmark',
  'Switzerland',
  'Austria',
  'Ireland',
  'Poland',
  'Portugal',
  'Brazil',
  'Mexico',
  'Japan',
  'South Korea',
  'Singapore',
  'United Arab Emirates',
  'South Africa',
  'Nigeria',
  'Indonesia',
  'Thailand',
  'New Zealand',
];

export const STEPS: Step[] = [
  // INTRO
  { type: 'intro' },

  // Q1: Contact info
  {
    type: 'fields',
    num: '01',
    title: '',
    hint: '',
    fields: [
      {
        row: [
          { id: 'name', label: '', placeholder: '', required: true },
          { id: 'role', label: '', placeholder: '', required: true },
        ],
      },
      {
        row: [
          { id: 'email', label: '', placeholder: '', type: 'email', required: true },
          { id: 'company', label: '', placeholder: '', required: true },
        ],
      },
    ],
  },

  // Q2: Website + details (with autocomplete fields)
  {
    type: 'fields',
    num: '02',
    title: '',
    hint: '',
    fields: [
      { single: { id: 'website', label: '', placeholder: '', type: 'url', required: true } },
      {
        row: [
          { id: 'industry', label: '', placeholder: '', required: true },
          { id: 'country', label: '', placeholder: '', required: true },
        ],
      },
    ],
  },

  // AI MOMENT 1: Domain Scan
  { type: 'scan', title: '' },

  // Q3: Company size
  {
    type: 'choice',
    num: '03',
    title: '',
    options: [
      { key: 'A', text: '', value: '1-10' },
      { key: 'B', text: '', value: '11-50' },
      { key: 'C', text: '', value: '51-200' },
      { key: 'D', text: '', value: '200+' },
    ],
  },

  // Q4: Where customers find them
  {
    type: 'choice',
    num: '04',
    title: '',
    options: [
      { key: 'A', text: '', value: 'google' },
      { key: 'B', text: '', value: 'paid' },
      { key: 'C', text: '', value: 'referral' },
      { key: 'D', text: '', value: 'social' },
      { key: 'E', text: '', value: 'ai_search' },
      { key: 'F', text: '', value: 'unsure' },
    ],
  },

  // Q5: Revenue tracking
  {
    type: 'choice',
    num: '05',
    title: '',
    hint: '',
    options: [
      { key: 'A', text: '', value: 'yes' },
      { key: 'B', text: '', value: 'roughly' },
      { key: 'C', text: '', value: 'no' },
    ],
  },

  // Q6: AI search check
  {
    type: 'choice',
    num: '06',
    title: '',
    hint: '',
    options: [
      { key: 'A', text: '', value: 'yes_cited' },
      { key: 'B', text: '', value: 'yes_not_cited' },
      { key: 'C', text: '', value: 'no' },
    ],
  },

  // Q7: Schema
  {
    type: 'choice',
    num: '07',
    title: '',
    hint: '',
    options: [
      { key: 'A', text: '', value: 'yes_ext' },
      { key: 'B', text: '', value: 'some' },
      { key: 'C', text: '', value: 'unknown' },
      { key: 'D', text: '', value: 'no' },
    ],
  },

  // Q8: AI maturity
  {
    type: 'choice',
    num: '08',
    title: '',
    options: [
      { key: 'A', text: '', value: 'none' },
      { key: 'B', text: '', value: 'experimenting' },
      { key: 'C', text: '', value: 'some' },
      { key: 'D', text: '', value: 'embedded' },
    ],
  },

  // Q9: Biggest challenge
  {
    type: 'choice',
    num: '09',
    title: '',
    hint: '',
    options: [
      { key: 'A', text: '', value: 'visibility' },
      { key: 'B', text: '', value: 'conversion' },
      { key: 'C', text: '', value: 'competitors' },
      { key: 'D', text: '', value: 'ai_invisible' },
      { key: 'E', text: '', value: 'no_strategy' },
      { key: 'F', text: '', value: 'scaling' },
    ],
  },

  // AI MOMENT 2: Competitor Intelligence
  {
    type: 'competitors_ai',
    title: '',
    hint: '',
  },

  // Q10: 90-day wish
  {
    type: 'text',
    num: '10',
    title: '',
    hint: '',
    field: {
      id: 'wish',
      placeholder: '',
      multiline: true,
    },
    optional: false,
  },

  // Q11: How they found us
  {
    type: 'choice',
    num: '11',
    title: '',
    options: [
      { key: 'A', text: '', value: 'google' },
      { key: 'B', text: '', value: 'ai' },
      { key: 'C', text: '', value: 'referral' },
      { key: 'D', text: '', value: 'linkedin' },
      { key: 'E', text: '', value: 'other' },
    ],
  },

  // AI MOMENT 3: Enhanced result
  { type: 'result' },
];
