# Architecture

## Data Flow

```
Landing Page (PricingSection)
  |-- User clicks plan button
  |
ReadingModal (orchestrator)
  |-- Step 1: ReadingForm (birth details + reading context)
  |-- Step 2: CheckoutSection (Stripe or PayPal)
  |-- Step 3: GeneratingOverlay (loading animation)
  |       |-- POST /api/generate-reading (streaming)
  |       |   |-- Server verifies payment
  |       |   |-- Computes spiritual profile from DOB
  |       |   |-- Builds plan-specific prompt
  |       |   |-- Streams OpenAI response to client
  |       |   |-- after(): sends email via Resend
  |-- Step 4: ReadingDisplay (shows completed reading)
```

## Payment Security

The server NEVER trusts client-sent prices. Payment verification flow:

**Stripe:** Client sends `paymentIntentId` -> server calls `stripe.paymentIntents.retrieve()` -> checks `status === 'succeeded'`

**PayPal:** Client sends `orderId` -> server captures via PayPal API -> extracts the actual captured amount -> uses `priceInCentsToPlan()` to derive plan from the real amount -> rejects if amount doesn't match any plan

## Module Boundaries

- `lib/` - zero domain knowledge. Pure utilities that could be used in any project.
- `modules/reading/` - all reading domain logic. Plans, types, spiritual math, AI prompts, form, display.
- `modules/payment/` - all payment integration. Stripe + PayPal server helpers and client components.
- `modules/email/` - email sending. Resend API + HTML template.
- `modules/landing/` - landing page UI sections. Pure presentation components.
- `app/api/` - API routes. Thin wrappers that call module functions.

## Adding API Routes

API routes go in `src/app/api/{route-name}/route.ts`. They should be thin:
1. Parse and validate the request body (use Zod schemas)
2. Call the relevant module function
3. Return the response

Never put business logic directly in API routes. Put it in the relevant module.

## Server vs Client

- Files in `modules/reading/` without 'use client' are server-only (spiritual.ts, prompt.ts, generate.ts)
- Files with 'use client' at the top are client components (ReadingForm.tsx, ReadingModal.tsx, etc.)
- API routes are always server-side
- `lib/env.ts` should only be imported in server-side code (it reads process.env)
- `lib/env.ts` exports `clientEnv` for NEXT_PUBLIC_ variables safe to use on the client

## Streaming Pattern

The generate-reading API streams OpenAI's response directly to the client:

```typescript
// Server: create a ReadableStream that forwards OpenAI chunks
const stream = new ReadableStream({
  async start(controller) {
    const reader = openaiStream.getReader()
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      fullText += decoder.decode(value)
      controller.enqueue(value)
    }
    controller.close()
  }
})

// Client: read the stream chunk by chunk
const reader = response.body.getReader()
while (true) {
  const { done, value } = await reader.read()
  if (done) break
  reading += decoder.decode(value)
  setReading(reading) // triggers re-render with new text
}
```

## File Naming

- Components: PascalCase (`ReadingForm.tsx`, `HeroSection.tsx`)
- Modules/utilities: kebab-case or camelCase (`ensure-present.ts`, `core.ts`)
- One component per file
- Default exports for components
- Named exports for utilities, types, and constants
