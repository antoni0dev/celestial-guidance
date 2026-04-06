# Celestial Guidance

AI-powered spiritual readings web app. Users select a plan, pay via Stripe or PayPal, fill in birth details, and receive an AI-generated reading displayed on screen and emailed to them.

## Commands

```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build - run this after every code change to verify
npm run lint         # ESLint check
npm start            # Start production server
```

## Environment Variables

Copy `.env.example` to `.env` and fill in values. All are required for the app to work:

| Variable | Service | Purpose |
|---|---|---|
| `STRIPE_SECRET_KEY` | Stripe | Server-side payment processing |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe | Client-side payment form |
| `STRIPE_WEBHOOK_SECRET` | Stripe | Webhook signature verification |
| `PAYPAL_CLIENT_ID` | PayPal | Server-side order creation |
| `PAYPAL_CLIENT_SECRET` | PayPal | Server-side order capture |
| `PAYPAL_MODE` | PayPal | `sandbox` or `live` |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | PayPal | Client-side PayPal buttons |
| `OPENAI_API_KEY` | OpenAI | AI reading generation |
| `RESEND_API_KEY` | Resend | Email delivery |
| `FROM_EMAIL` | Resend | Sender email address |

## Architecture

**Stateless flow** - no database, no accounts, no cookies. Pay -> generate -> email. Done.

```
User clicks plan -> Form modal (birth details) -> Payment (Stripe/PayPal)
     -> Server verifies payment -> OpenAI generates reading (streaming)
     -> Reading displayed on screen + emailed via Resend
```

**Runtime:** Next.js 15 (App Router), TypeScript (strict), Tailwind CSS v4

**AI:** OpenAI gpt-4o-mini, temperature 0.85, streaming responses. Spiritual calculations (zodiac, moon sign, life path number, tarot cards) computed from birth date before prompting.

**Payments:** Stripe Payment Elements (embedded) + PayPal buttons. Server always verifies payment amount before generating - never trust client-sent prices.

**Email:** Resend with inline HTML template. Sent after stream completes via Next.js `after()`.

## Project Structure

```
src/
  app/
    page.tsx                           -- Landing page (composes all sections)
    layout.tsx                         -- Root layout, fonts, SEO metadata
    globals.css                        -- Tailwind theme tokens + animations
    api/
      create-payment-intent/route.ts   -- Stripe: create payment intent
      create-paypal-order/route.ts     -- PayPal: create order
      capture-paypal-order/route.ts    -- PayPal: capture + verify amount
      generate-reading/route.ts        -- Verify payment, stream AI reading, email

  lib/
    utils/
      match.ts                         -- Exhaustive pattern matching (never use switch/case)
      ensure-present.ts                -- Fail-fast assertion for required values
    env.ts                             -- Validated env vars (crashes on missing)

  modules/
    landing/                           -- Landing page sections (one component per file)
      Navbar.tsx                       -- Fixed nav, mobile hamburger, scroll-aware
      HeroSection.tsx                  -- Hero with sparkle animations, CTAs
      HowItWorks.tsx                   -- 4-step process grid
      ServicesSection.tsx              -- 4 service cards (palm, astrology, tarot, numerology)
      TestimonialsSection.tsx          -- 6 rotating testimonials
      PricingSection.tsx               -- 3 plan cards + opens ReadingModal
      FaqSection.tsx                   -- 7 accordion items
      Footer.tsx                       -- Links, copyright

    reading/                           -- Core reading logic + UI
      core.ts                          -- Plans const array, configs, prices (SOURCE OF TRUTH)
      types.ts                         -- Pure type definitions (zero runtime code)
      schema.ts                        -- Zod validation schemas for form
      spiritual.ts                     -- Zodiac, moon sign, life path, tarot calculations
      prompt.ts                        -- OpenAI prompt builder (plan-specific)
      generate.ts                      -- OpenAI streaming generation
      ReadingForm.tsx                  -- Multi-step form (react-hook-form + Zod)
      ReadingModal.tsx                 -- Full flow orchestrator (form -> pay -> generate -> display)
      ReadingDisplay.tsx               -- Rendered reading with spiritual badges
      GeneratingOverlay.tsx            -- Loading animation during AI generation

    payment/                           -- Payment integrations
      core.ts                          -- Payment provider const array
      types.ts                         -- PaymentResult type
      stripe.ts                        -- Server: createPaymentIntent, verifyPaymentIntent
      paypal.ts                        -- Server: createPayPalOrder, capturePayPalOrder
      stripe-checkout.tsx              -- Client: Stripe PaymentElement wrapper
      paypal-checkout.tsx              -- Client: PayPal Buttons wrapper
      checkout-section.tsx             -- Client: Tab switcher (Stripe/PayPal)

    email/
      send-reading.ts                  -- Resend API + HTML email template
```

## Three Pricing Plans

Defined in `src/modules/reading/core.ts` - this is the single source of truth for all plan data.

| Plan | Price | Words | AI Tokens | Sections |
|---|---|---|---|---|
| Quick Glimpse | $15 | 600-800 | 1,000 | 5 base sections |
| Single Reading | $30 | 1,200-1,500 | 2,000 | 5 base sections (detailed) |
| Complete Deep Dive | $50 | 2,500-3,500 | 4,000 | 5 base + 6 deep-dive sections |

## Design System

All design tokens live in `src/app/globals.css` as Tailwind `@theme` variables. Never hardcode colors.

**Colors** (use via Tailwind classes like `text-celestial-500`, `bg-celestial-100`):
- celestial-50 (#fdf2f8) through celestial-900 (#831843) - pink palette
- text-body (#5a4a5a), text-muted (#8a7a8a)
- surface (white/60% opacity), border (pink/20% opacity)

**Typography:**
- Headings: Playfair Display (serif) - set globally on h1-h6
- Body: Inter (sans-serif) - set globally on body

**Effects:**
- `glass` utility class: frosted glass surface (backdrop-blur + white bg + pink border)
- Animations: twinkle, pulse-soft, fade-up, glow, text-glow, float, shimmer, star-spin

**Spacing conventions:**
- Sections: `py-20 px-6 md:px-12` with `max-w-7xl mx-auto`
- Cards: `p-8` or `p-10`, `rounded-[20px]`
- Buttons: `px-10 py-4`, `rounded-full` (pill shape)

## How to Add a New Feature

### Adding a new landing section
1. Create `src/modules/landing/NewSection.tsx` (one component per file)
2. Use the `glass` class for card surfaces
3. Use Tailwind theme tokens (`text-celestial-500`, etc.) - never hardcode hex
4. Import and add to `src/app/page.tsx` in the `<main>` block

### Adding a new pricing plan
1. Add the plan key to `plans` array in `src/modules/reading/core.ts`
2. Add config to `planConfigs` Record (price, word range, tokens, etc.)
3. Add features to `planFeatures` Record
4. TypeScript will error everywhere the new plan needs handling (exhaustive Records)

### Changing the AI prompt
1. Edit `src/modules/reading/prompt.ts`
2. `baseSections` = sections included in ALL plans
3. `deepDiveSections` = additional sections for Complete Deep Dive only
4. `planPromptConfigs` Record controls per-plan instructions

### Changing spiritual calculations
1. Edit `src/modules/reading/spiritual.ts`
2. All calculation data (zodiac boundaries, moon signs, tarot spreads) are typed const arrays
3. `computeSpiritualProfile()` is the single entry point

### Adding a new form field
1. Add to the Zod schema in `src/modules/reading/schema.ts`
2. Add the UI field in `src/modules/reading/ReadingForm.tsx` (step 1 or step 2)
3. Add to the `ReadingInput` type in `src/modules/reading/types.ts`
4. Include in the prompt in `src/modules/reading/prompt.ts`

### Changing email template
1. Edit the HTML template in `src/modules/email/send-reading.ts`
2. Uses inline CSS (email clients don't support external CSS)

## Key Patterns Used

### Const arrays as single source of truth
```typescript
// Define once, derive type from it
const plans = ['quickGlimpse', 'singleReading', 'completeDeepDive'] as const
type Plan = (typeof plans)[number]
```

### Record lookups (never switch/case)
```typescript
// Exhaustive - TypeScript errors if a plan is missing
const planConfigs: Record<Plan, PlanConfig> = {
  quickGlimpse: { ... },
  singleReading: { ... },
  completeDeepDive: { ... },
}
```

### match() for functional branching
```typescript
import { match } from '@/lib/utils/match'
const label = match(plan, {
  quickGlimpse: () => 'Quick',
  singleReading: () => 'Standard',
  completeDeepDive: () => 'Premium',
})
```

### ensurePresent() for required values
```typescript
import { ensurePresent } from '@/lib/utils/ensure-present'
const apiKey = ensurePresent(process.env.API_KEY, 'API_KEY env variable')
```

## TypeScript Rules

- Use `type` for everything (never `interface`)
- Never use `as` type assertions
- Derive types from const arrays
- No `switch/case` - use Record lookups or `match()`
- No `?.` or `??` on non-optional types - trust your types
- Arrow functions for everything
