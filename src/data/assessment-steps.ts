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
    title: "Let's start with you",
    hint: "We'll use this to send your AI Readiness Report.",
    fields: [
      {
        row: [
          { id: 'name', label: 'Your name', placeholder: 'Full name', required: true },
          { id: 'role', label: 'Your role', placeholder: 'e.g. CEO, Head of Marketing', required: true },
        ],
      },
      {
        row: [
          { id: 'email', label: 'Work email', placeholder: 'you@company.com', type: 'email', required: true },
          { id: 'company', label: 'Company name', placeholder: 'Your company', required: true },
        ],
      },
    ],
  },

  // Q2: Website + details (with autocomplete fields)
  {
    type: 'fields',
    num: '02',
    title: 'About your company',
    hint: 'Your website URL is the most important field — it triggers our live analysis.',
    fields: [
      { single: { id: 'website', label: 'Company website', placeholder: 'https://yourcompany.com', type: 'url', required: true } },
      {
        row: [
          { id: 'industry', label: 'Industry / sector', placeholder: 'Start typing...', required: true },
          { id: 'country', label: 'Primary market', placeholder: 'Start typing...', required: true },
        ],
      },
    ],
  },

  // AI MOMENT 1: Domain Scan
  { type: 'scan', title: 'Scanning your digital footprint...' },

  // Q3: Company size
  {
    type: 'choice',
    num: '03',
    title: 'How big is your team?',
    options: [
      { key: 'A', text: '1–10 people', value: '1-10' },
      { key: 'B', text: '11–50 people', value: '11-50' },
      { key: 'C', text: '51–200 people', value: '51-200' },
      { key: 'D', text: '200+ people', value: '200+' },
    ],
  },

  // Q4: Where customers find them
  {
    type: 'choice',
    num: '04',
    title: 'Where do most of your customers find you today?',
    options: [
      { key: 'A', text: 'Google search', value: 'google' },
      { key: 'B', text: 'Paid ads (Google, Meta, LinkedIn)', value: 'paid' },
      { key: 'C', text: 'Referrals or word of mouth', value: 'referral' },
      { key: 'D', text: 'Social media', value: 'social' },
      { key: 'E', text: 'AI search (ChatGPT, Perplexity)', value: 'ai_search' },
      { key: 'F', text: "Honestly, I'm not sure", value: 'unsure' },
    ],
  },

  // Q5: Revenue tracking
  {
    type: 'choice',
    num: '05',
    title: 'Do you know what percentage of your website traffic actually drives revenue?',
    hint: "This is the question most companies can't answer.",
    options: [
      { key: 'A', text: 'Yes — we track this closely', value: 'yes' },
      { key: 'B', text: 'We have a rough idea', value: 'roughly' },
      { key: 'C', text: 'No — we track traffic but not its commercial value', value: 'no' },
    ],
  },

  // Q6: AI search check
  {
    type: 'choice',
    num: '06',
    title: 'Have you searched for your company in ChatGPT or Perplexity?',
    hint: "Try it now if you haven't. You might be surprised.",
    options: [
      { key: 'A', text: 'Yes — and we show up / get cited', value: 'yes_cited' },
      { key: 'B', text: "Yes — and we don't appear", value: 'yes_not_cited' },
      { key: 'C', text: "No — haven't checked", value: 'no' },
    ],
  },

  // Q7: Schema
  {
    type: 'choice',
    num: '07',
    title: 'Does your website use structured data (schema markup)?',
    hint: 'Schema helps both Google and AI engines understand your content.',
    options: [
      { key: 'A', text: 'Yes, extensively', value: 'yes' },
      { key: 'B', text: 'Some — like basic Organization or breadcrumbs', value: 'some' },
      { key: 'C', text: "I don't know", value: 'unknown' },
      { key: 'D', text: 'No', value: 'no' },
    ],
  },

  // Q8: AI maturity
  {
    type: 'choice',
    num: '08',
    title: "How would you describe your company's use of AI today?",
    options: [
      { key: 'A', text: "We haven't started — AI isn't part of our operations", value: 'none' },
      { key: 'B', text: 'A few people use ChatGPT or similar tools ad hoc', value: 'experimenting' },
      { key: 'C', text: "We've integrated AI into some specific workflows", value: 'some' },
      { key: 'D', text: 'AI is embedded across multiple business functions', value: 'embedded' },
    ],
  },

  // Q9: Biggest challenge
  {
    type: 'choice',
    num: '09',
    title: "What's your biggest digital growth challenge?",
    hint: 'Pick the one that keeps you up at night.',
    options: [
      { key: 'A', text: 'Getting found — we need more visibility', value: 'visibility' },
      { key: 'B', text: "We get traffic but it doesn't convert", value: 'conversion' },
      { key: 'C', text: "Competitors outrank us and we don't know why", value: 'competitors' },
      { key: 'D', text: "We're invisible in AI search results", value: 'ai_invisible' },
      { key: 'E', text: 'No clear digital strategy', value: 'no_strategy' },
      { key: 'F', text: 'We need to scale what works across more brands', value: 'scaling' },
    ],
  },

  // AI MOMENT 2: Competitor Intelligence
  {
    type: 'competitors_ai',
    title: 'We found your competitors',
    hint: 'Based on your keyword overlap, these companies compete for the same search terms.',
  },

  // Q10: 90-day wish
  {
    type: 'text',
    num: '10',
    title: 'If we could fix one thing about your digital presence in the next 90 days — what would it be?',
    hint: "Be specific. We'll reference this directly in your report.",
    field: {
      id: 'wish',
      placeholder:
        'e.g. "Get our product pages ranking in Google\'s top 3 for our core terms" or "Show up when someone asks ChatGPT about our industry"',
      multiline: true,
    },
    optional: false,
  },

  // Q11: How they found us
  {
    type: 'choice',
    num: '11',
    title: 'One last thing — how did you find AskBodhi?',
    options: [
      { key: 'A', text: 'Google search', value: 'google' },
      { key: 'B', text: 'AI search (ChatGPT, Perplexity)', value: 'ai' },
      { key: 'C', text: 'Referral from someone', value: 'referral' },
      { key: 'D', text: 'LinkedIn', value: 'linkedin' },
      { key: 'E', text: 'Other', value: 'other' },
    ],
  },

  // AI MOMENT 3: Enhanced result
  { type: 'result' },
];