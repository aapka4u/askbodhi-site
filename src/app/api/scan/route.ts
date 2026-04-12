import { NextRequest, NextResponse } from 'next/server';

/* ═══════════════════════════════════════════════════════════════════
   /api/scan — Real-data diagnostic endpoint for AskBodhi Assessment

   Calls three APIs in parallel:
   1. Ahrefs v3  → Domain Rating, Organic Keywords, Traffic, Competitors
   2. PageSpeed  → Performance score, Core Web Vitals (free, no auth)
   3. Perplexity → AI Visibility check (is this brand mentioned by AI?)

   Rate-limited: 1 scan per IP per 5 minutes
   Cached: same domain → same results for 24h
   ═══════════════════════════════════════════════════════════════════ */

// ─── Simple in-memory rate limiter & cache ─────────────────────
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 5 * 60 * 1000; // 5 minutes

const domainCache = new Map<string, { data: ScanResponse; ts: number }>();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// ─── Types ─────────────────────────────────────────────────────
interface AhrefsMetrics {
  domainRating: number;
  organicKeywords: number;
  monthlyTraffic: number;
  backlinks: number;
}

interface AhrefsCompetitor {
  domain: string;
  dr: number;
  commonKeywords: number;
}

interface PageSpeedResult {
  performanceScore: number;
  lcp: number;       // Largest Contentful Paint (ms)
  cls: number;       // Cumulative Layout Shift
  fcp: number;       // First Contentful Paint (ms)
  speedIndex: number;
}

interface AiVisibilityResult {
  mentioned: boolean;
  context: string;       // snippet of what the AI said
  citations: string[];   // URLs cited alongside the brand
}

interface ScanResponse {
  domain: string;
  ahrefs: AhrefsMetrics | null;
  competitors: AhrefsCompetitor[];
  pageSpeed: PageSpeedResult | null;
  aiVisibility: AiVisibilityResult | null;
  scannedAt: string;
  errors: string[];      // transparent about what failed
}

// ─── Helpers ───────────────────────────────────────────────────
function cleanDomain(input: string): string {
  let d = input.trim().toLowerCase();
  // Remove protocol
  d = d.replace(/^https?:\/\//, '');
  // Remove www.
  d = d.replace(/^www\./, '');
  // Remove trailing slash and path
  d = d.split('/')[0];
  // Remove port
  d = d.split(':')[0];
  return d;
}

function ensureUrl(input: string): string {
  let url = input.trim();
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }
  return url;
}

function todayStr(): string {
  return new Date().toISOString().split('T')[0];
}

// ─── Ahrefs API v3 ────────────────────────────────────────────
async function fetchAhrefs(domain: string): Promise<{
  metrics: AhrefsMetrics | null;
  competitors: AhrefsCompetitor[];
}> {
  const token = process.env.AHREFS_API_TOKEN;
  if (!token) return { metrics: null, competitors: [] };

  const baseUrl = 'https://api.ahrefs.com/v3/site-explorer';
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  };
  const date = todayStr();

  try {
    // Fire all four Ahrefs calls in parallel
    const [drRes, metricsRes, blRes, compRes] = await Promise.allSettled([
      // 1. Domain Rating
      fetch(
        `${baseUrl}/domain-rating?` +
          new URLSearchParams({ target: domain, date }).toString(),
        { headers, signal: AbortSignal.timeout(10000) }
      ),
      // 2. Metrics (organic keywords + traffic)
      fetch(
        `${baseUrl}/metrics?` +
          new URLSearchParams({
            target: domain,
            date,
            mode: 'subdomains',
          }).toString(),
        { headers, signal: AbortSignal.timeout(10000) }
      ),
      // 3. Backlinks Stats (separate endpoint)
      fetch(
        `${baseUrl}/backlinks-stats?` +
          new URLSearchParams({
            target: domain,
            date,
            mode: 'subdomains',
          }).toString(),
        { headers, signal: AbortSignal.timeout(10000) }
      ),
      // 4. Organic Competitors (requires select + country)
      fetch(
        `${baseUrl}/organic-competitors?` +
          new URLSearchParams({
            target: domain,
            date,
            mode: 'subdomains',
            select: 'competitor_domain,domain_rating,keywords_common',
            country: 'us',
            limit: '5',
          }).toString(),
        { headers, signal: AbortSignal.timeout(10000) }
      ),
    ]);

    // Parse Domain Rating
    // API returns: { "domain_rating": { "domain_rating": 46.0, "ahrefs_rank": 912037 } }
    let domainRating = 0;
    if (drRes.status === 'fulfilled' && drRes.value.ok) {
      const drData = await drRes.value.json();
      domainRating = drData.domain_rating?.domain_rating ?? 0;
    }

    // Parse Metrics
    // API returns: { "metrics": { "org_keywords": 962, "org_traffic": 2176, ... } }
    let organicKeywords = 0;
    let monthlyTraffic = 0;
    if (metricsRes.status === 'fulfilled' && metricsRes.value.ok) {
      const mData = await metricsRes.value.json();
      organicKeywords = mData.metrics?.org_keywords ?? 0;
      monthlyTraffic = Math.round(mData.metrics?.org_traffic ?? 0);
    }

    // Parse Backlinks
    // API returns: { "metrics": { "live": 8134, "all_time": 18662, ... } }
    let backlinks = 0;
    if (blRes.status === 'fulfilled' && blRes.value.ok) {
      const blData = await blRes.value.json();
      backlinks = blData.metrics?.live ?? 0;
    }

    // Parse Competitors
    // API returns: { "competitors": [{ "competitor_domain": "...", "domain_rating": 88, "keywords_common": 91 }] }
    const competitors: AhrefsCompetitor[] = [];
    if (compRes.status === 'fulfilled' && compRes.value.ok) {
      const cData = await compRes.value.json();
      const rows = cData.competitors ?? [];
      for (const row of rows.slice(0, 5)) {
        competitors.push({
          domain: row.competitor_domain ?? 'unknown',
          dr: row.domain_rating ?? 0,
          commonKeywords: row.keywords_common ?? 0,
        });
      }
    }

    return {
      metrics: { domainRating, organicKeywords, monthlyTraffic, backlinks },
      competitors,
    };
  } catch (err) {
    console.error('[Ahrefs] Failed:', err);
    return { metrics: null, competitors: [] };
  }
}

// ─── Google PageSpeed Insights ─────────────────────────────────
async function fetchPageSpeed(url: string): Promise<PageSpeedResult | null> {
  try {
    const apiKey = process.env.PAGESPEED_API_KEY;
    const params = new URLSearchParams({
      url,
      strategy: 'mobile',
      category: 'performance',
    });
    if (apiKey) params.set('key', apiKey);

    const res = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params.toString()}`,
      { signal: AbortSignal.timeout(30000) } // PageSpeed can be slow
    );

    if (!res.ok) return null;

    const data = await res.json();
    const lighthouse = data.lighthouseResult;
    if (!lighthouse) return null;

    const audits = lighthouse.audits ?? {};

    return {
      performanceScore: Math.round((lighthouse.categories?.performance?.score ?? 0) * 100),
      lcp: Math.round(audits['largest-contentful-paint']?.numericValue ?? 0),
      cls: parseFloat((audits['cumulative-layout-shift']?.numericValue ?? 0).toFixed(3)),
      fcp: Math.round(audits['first-contentful-paint']?.numericValue ?? 0),
      speedIndex: Math.round(audits['speed-index']?.numericValue ?? 0),
    };
  } catch (err) {
    console.error('[PageSpeed] Failed:', err);
    return null;
  }
}

// ─── Perplexity Sonar — AI Visibility Check ────────────────────
async function fetchAiVisibility(
  domain: string,
  companyName?: string
): Promise<AiVisibilityResult | null> {
  const apiKey = process.env.PERPLEXITY_API_KEY;
  if (!apiKey) return null;

  try {
    const query = companyName
      ? `What do you know about ${companyName} (${domain})? Is it a reputable company in its industry?`
      : `What do you know about the company at ${domain}? What does it do and is it well-known in its industry?`;

    const res = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'sonar',
        messages: [
          {
            role: 'system',
            content:
              'You are a research assistant. Give a brief, factual answer about this company. If you cannot find information, say so clearly. Keep your answer under 100 words.',
          },
          { role: 'user', content: query },
        ],
        max_tokens: 200,
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) return null;

    const data = await res.json();
    const content: string = data.choices?.[0]?.message?.content ?? '';
    const citations: string[] = data.citations ?? [];

    // Determine if the brand is actually mentioned/known
    const lowerContent = content.toLowerCase();
    const domainLower = domain.toLowerCase();
    const companyLower = (companyName ?? domain).toLowerCase();

    const mentioned =
      !lowerContent.includes('i could not find') &&
      !lowerContent.includes('no information') &&
      !lowerContent.includes('i don\'t have') &&
      !lowerContent.includes('unable to find') &&
      (lowerContent.includes(domainLower) || lowerContent.includes(companyLower));

    return {
      mentioned,
      context: content.slice(0, 300),
      citations: citations.slice(0, 5),
    };
  } catch (err) {
    console.error('[Perplexity] Failed:', err);
    return null;
  }
}

// ─── Main Handler ──────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawDomain = body.domain || body.website || '';
    const companyName = body.companyName || '';

    if (!rawDomain) {
      return NextResponse.json(
        { error: 'Missing domain' },
        { status: 400 }
      );
    }

    const domain = cleanDomain(rawDomain);
    const fullUrl = ensureUrl(rawDomain);

    // ── Rate limiting ──
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';
    const lastScan = rateLimitMap.get(clientIp) ?? 0;
    if (Date.now() - lastScan < RATE_LIMIT_MS) {
      return NextResponse.json(
        { error: 'Rate limited. Please wait a few minutes.' },
        { status: 429 }
      );
    }
    rateLimitMap.set(clientIp, Date.now());

    // ── Cache check ──
    const cached = domainCache.get(domain);
    if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
      return NextResponse.json(cached.data);
    }

    // ── Fire all three APIs in parallel ──
    const [ahrefsResult, pageSpeedResult, aiVisResult] = await Promise.allSettled([
      fetchAhrefs(domain),
      fetchPageSpeed(fullUrl),
      fetchAiVisibility(domain, companyName),
    ]);

    // ── Assemble response ──
    const errors: string[] = [];

    const ahrefs =
      ahrefsResult.status === 'fulfilled'
        ? ahrefsResult.value.metrics
        : null;
    if (!ahrefs) errors.push('Domain metrics temporarily unavailable');

    const competitors =
      ahrefsResult.status === 'fulfilled'
        ? ahrefsResult.value.competitors
        : [];

    const pageSpeed =
      pageSpeedResult.status === 'fulfilled'
        ? pageSpeedResult.value
        : null;
    if (!pageSpeed) errors.push('PageSpeed analysis timed out');

    const aiVisibility =
      aiVisResult.status === 'fulfilled'
        ? aiVisResult.value
        : null;
    if (!aiVisibility) errors.push('AI visibility check unavailable');

    const response: ScanResponse = {
      domain,
      ahrefs,
      competitors,
      pageSpeed,
      aiVisibility,
      scannedAt: new Date().toISOString(),
      errors,
    };

    // ── Cache result ──
    domainCache.set(domain, { data: response, ts: Date.now() });

    return NextResponse.json(response);
  } catch (err) {
    console.error('[Scan] Unexpected error:', err);
    return NextResponse.json(
      { error: 'Scan failed. Please try again.' },
      { status: 500 }
    );
  }
}
