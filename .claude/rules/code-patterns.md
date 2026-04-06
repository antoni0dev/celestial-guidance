# Code Patterns

## TypeScript

Use `type` for everything. Never `interface`.
```typescript
// Good
type User = { name: string; email: string }

// Bad
interface User { name: string; email: string }
```

Never use `as` type assertions. Use type guards or redesign the API.
```typescript
// Good
const isPlan = (value: string): value is Plan => plans.includes(value as Plan)

// Bad
const plan = value as Plan
```

Derive types from const arrays - single source of truth:
```typescript
const plans = ['quickGlimpse', 'singleReading', 'completeDeepDive'] as const
type Plan = (typeof plans)[number]
// Adding a plan to the array automatically updates the type
```

## Pattern Matching

Never use `switch/case`. Use these patterns instead:

**Value mapping** - Record:
```typescript
const planToLabel: Record<Plan, string> = {
  quickGlimpse: 'Quick Glimpse',
  singleReading: 'Single Reading',
  completeDeepDive: 'Complete Deep Dive',
}
// TypeScript errors if you add a new plan and forget to update this Record
```

**Logic branching** - match():
```typescript
import { match } from '@/lib/utils/match'
const result = match(plan, {
  quickGlimpse: () => generateShort(),
  singleReading: () => generateMedium(),
  completeDeepDive: () => generateLong(),
})
```

## Required Values

Use `ensurePresent()` instead of optional chaining on values that must exist:
```typescript
import { ensurePresent } from '@/lib/utils/ensure-present'

// Good - crashes immediately with clear message if missing
const plan = ensurePresent(planMap.get(price), `plan for price ${price}`)

// Bad - silently returns undefined, crashes later
const plan = planMap.get(price)
```

## Functions

Arrow functions for everything:
```typescript
// Good
const calculateFee = (amount: number) => amount * 0.03

// Bad
function calculateFee(amount: number) { return amount * 0.03 }
```

Object parameters when a function has more than 1 argument:
```typescript
type FormatPriceInput = { cents: number; currency: string }
const formatPrice = ({ cents, currency }: FormatPriceInput) => ...
```

## React Components

- One component per file
- Default export for the component
- Arrow function components
- No `useMemo` or `useCallback` - React Compiler handles memoization
- No `console.log` in production code
- 'use client' only on components that need browser APIs (useState, useEffect, event handlers)

```typescript
'use client'

type PlanCardProps = {
  plan: Plan
  onSelect: () => void
}

const PlanCard = ({ plan, onSelect }: PlanCardProps) => {
  // component body
}

export default PlanCard
```

## Zod Validation

Form schemas live in `schema.ts` files. Use const arrays for enum options:
```typescript
export const focusAreas = ['General', 'Love', 'Career'] as const
export type FocusArea = (typeof focusAreas)[number]

export const formSchema = z.object({
  focusArea: z.enum(focusAreas),
  name: z.string().min(1, 'Required').max(200),
})

// Derive form type from schema
export type FormValues = z.infer<typeof formSchema>
```

## Error Handling

Let errors bubble up naturally. Only catch errors when:
1. You need to show an error message to the user
2. You need to provide a fallback value
3. You need to execute alternative logic

Never catch just to log. Never use empty catch blocks.
