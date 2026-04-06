# CLAUDE.md

## Project Overview

Celestial Guidance is an AI-powered spiritual readings web app. Users select a plan, pay via Stripe or PayPal, fill in birth details, and receive an AI-generated reading (via OpenAI) displayed on screen and emailed to them.

## Commands

- `npm run dev` - Start Next.js dev server
- `npm run build` - Production build (TypeScript + compilation check)
- `npm run lint` - ESLint
- `npm start` - Start production server

## Required Environment Variables (.env)

- `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET` - Stripe payment
- `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, `PAYPAL_MODE` (sandbox/live), `NEXT_PUBLIC_PAYPAL_CLIENT_ID` - PayPal payment
- `OPENAI_API_KEY` - OpenAI API for reading generation
- `RESEND_API_KEY`, `FROM_EMAIL` - Email delivery via Resend

## Architecture

**Runtime:** Next.js 15 (App Router), TypeScript (strict), Tailwind CSS v4, deployed on Vercel.

**Auth model:** None. Stateless flow - pay, generate, email. No accounts, no cookies, no database.

**Payment flow:** Stripe Payment Elements or PayPal buttons embedded in a modal. Server verifies payment before generating.

**Reading generation:** OpenAI gpt-4o-mini with streaming. Spiritual calculations (zodiac, moon sign, life path, tarot) computed from birth details. Plan-specific prompts with varying depth/word count.

**Email delivery:** Resend with HTML template. Reading emailed after stream completes via Next.js `after()`.

**Three pricing plans** defined in `src/modules/reading/core.ts`:
- Quick Glimpse ($15): 600-800 word brief overview
- Single Reading ($30): 1200-1500 word detailed analysis
- Complete Deep Dive ($50): 2500-3500 word comprehensive analysis with 11 sections

## Project Structure

```
src/
  app/                    - Next.js routes + API routes
  lib/
    utils/                - match(), ensurePresent()
    env.ts                - Validated env vars
  modules/
    landing/              - Landing page sections (Navbar, Hero, HowItWorks, etc.)
    reading/              - Plans, types, spiritual calculations, prompts, form, display
    payment/              - Stripe + PayPal integration
    email/                - Resend email delivery
```

## Design System

Theme extracted from the original app, codified as Tailwind tokens in `globals.css`:
- Colors: celestial-50 through celestial-900 (pink palette)
- Surfaces: glassmorphism with `glass` utility class
- Typography: Playfair Display (headings), Inter (body)
- Animations: twinkle, pulse, fade-up, glow, etc.
