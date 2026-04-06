import { ensurePresent } from '@/lib/utils/ensure-present'

export const plans = ['quickGlimpse', 'singleReading', 'completeDeepDive'] as const
export type Plan = (typeof plans)[number]

export type PlanConfig = {
  readonly name: string
  readonly priceInCents: number
  readonly displayPrice: string
  readonly wordRange: string
  readonly maxTokens: number
  readonly depth: string
  readonly featured: boolean
}

export const planConfigs: Record<Plan, PlanConfig> = {
  quickGlimpse: {
    name: 'Quick Glimpse',
    priceInCents: 1500,
    displayPrice: '$15',
    wordRange: '600-800',
    maxTokens: 1000,
    depth: 'brief overview',
    featured: false,
  },
  singleReading: {
    name: 'Single Reading',
    priceInCents: 3000,
    displayPrice: '$30',
    wordRange: '1200-1500',
    maxTokens: 2000,
    depth: 'detailed analysis',
    featured: false,
  },
  completeDeepDive: {
    name: 'Complete Deep Dive',
    priceInCents: 5000,
    displayPrice: '$50',
    wordRange: '2500-3500',
    maxTokens: 4000,
    depth: 'comprehensive analysis',
    featured: true,
  },
}

export const planFeatures: Record<Plan, readonly string[]> = {
  quickGlimpse: [
    'Birth chart snapshot',
    'Sun & Moon sign overview',
    'Life path number meaning',
    '1 follow-up question',
    '7-day access',
  ],
  singleReading: [
    'Full birth chart analysis',
    'Sun, Moon & Rising signs',
    'Life path deep dive',
    'Tarot card spread',
    '3 follow-up questions',
    '30-day access',
  ],
  completeDeepDive: [
    'Comprehensive birth chart',
    'All planetary aspects',
    'Life path & destiny numbers',
    'Extended tarot reading',
    'Past life indicators',
    'Year-ahead forecast',
    'Unlimited follow-up questions',
    '365-day access',
  ],
}

export const isPlan = (value: string): value is Plan =>
  (plans as readonly string[]).includes(value)

const priceInCentsToPlanMap = new Map(
  plans.map((plan) => [planConfigs[plan].priceInCents, plan])
)

export const priceInCentsToPlan = (priceInCents: number): Plan =>
  ensurePresent(
    priceInCentsToPlanMap.get(priceInCents),
    `plan for price ${priceInCents} cents`
  )
