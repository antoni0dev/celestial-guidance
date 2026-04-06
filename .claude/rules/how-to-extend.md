# How to Extend This Project

Step-by-step guides for common changes. Follow existing patterns exactly.

## Adding a New Pricing Plan

1. **Add plan key** to the `plans` array in `src/modules/reading/core.ts`:
   ```typescript
   export const plans = ['quickGlimpse', 'singleReading', 'completeDeepDive', 'yourNewPlan'] as const
   ```

2. **Add config** to `planConfigs` Record (same file):
   ```typescript
   yourNewPlan: {
     name: 'Your New Plan',
     priceInCents: 7500,
     displayPrice: '$75',
     wordRange: '4000-5000',
     maxTokens: 6000,
     depth: 'ultra-comprehensive analysis',
     featured: false,
   },
   ```

3. **Add features** to `planFeatures` Record (same file):
   ```typescript
   yourNewPlan: ['Feature 1', 'Feature 2', 'Feature 3'],
   ```

4. **Add prompt config** in `src/modules/reading/prompt.ts` - add entry to `planPromptConfigs`:
   ```typescript
   yourNewPlan: {
     sectionInstruction: 'Cover all sections with extraordinary depth:',
     sections: [...baseSections, ...deepDiveSections, 'Additional Section'],
   },
   ```

5. **Run `npm run build`** - TypeScript will guide you to any other places that need updating (exhaustive Records will error on the missing key).

## Adding a New Landing Page Section

1. Create `src/modules/landing/YourSection.tsx`:
   ```tsx
   const YourSection = () => (
     <section className="py-20 px-6 md:px-12">
       <div className="max-w-7xl mx-auto">
         <div className="text-center mb-12">
           <h2 className="text-4xl mb-2">Section Title</h2>
           <p className="text-lg text-text-muted max-w-2xl mx-auto">Subtitle text</p>
         </div>
         {/* Your content here - use glass class for cards */}
       </div>
     </section>
   )
   export default YourSection
   ```

2. Add to `src/app/page.tsx`:
   ```tsx
   import YourSection from '@/modules/landing/YourSection'
   // Add inside <main> where you want it to appear
   ```

## Adding a New Form Field

1. **Add to Zod schema** in `src/modules/reading/schema.ts`:
   ```typescript
   // For a select field, define options as const array:
   export const zodiacPreferences = ['Western', 'Chinese', 'Vedic'] as const

   // Add to the appropriate schema (birthDetailsSchema or readingContextSchema):
   zodiacPreference: z.enum(zodiacPreferences),
   ```

2. **Add to types** in `src/modules/reading/types.ts`:
   ```typescript
   type ReadingContext = {
     // ... existing fields
     zodiacPreference: string
   }
   ```

3. **Add UI** in `src/modules/reading/ReadingForm.tsx` in the appropriate step.

4. **Use in prompt** in `src/modules/reading/prompt.ts` - add to the prompt template.

## Changing the AI Model or Behavior

Edit `src/modules/reading/prompt.ts`:
- `readingModel` - change the OpenAI model (e.g., 'gpt-4o' for higher quality)
- `readingTemperature` - 0.0 = deterministic, 1.0 = creative (currently 0.85)
- `baseSections` - sections included in every plan
- `deepDiveSections` - extra sections for Complete Deep Dive
- `buildReadingPrompt()` - the full prompt template

Edit `src/modules/reading/generate.ts` to change streaming behavior.

## Changing the Email Template

Edit `src/modules/email/send-reading.ts`. The template is inline HTML with inline CSS (required for email clients). Key colors used:
- Background: #fdf2f8
- Card: white
- Primary: #ec4899
- Heading: #831843
- Text: #5a4a5a

## Adding a New Page

1. Create `src/app/your-page/page.tsx`
2. Export a default component
3. It's automatically available at `/your-page`

## Adding a New API Route

1. Create `src/app/api/your-route/route.ts`
2. Export a named function (`POST`, `GET`, etc.)
3. Keep it thin - delegate to module functions:
   ```typescript
   import { NextResponse } from 'next/server'

   export const POST = async (request: Request) => {
     const body = await request.json()
     // validate, call module function, return response
     return NextResponse.json({ success: true })
   }
   ```

## Deploying to Vercel

1. Push to GitHub
2. Connect repo to Vercel (vercel.com -> New Project -> Import)
3. Set all environment variables in Vercel dashboard (Settings -> Environment Variables)
4. For Stripe webhooks: set the webhook URL to `https://your-domain.vercel.app/api/webhook` in Stripe Dashboard
5. Change `PAYPAL_MODE` from `sandbox` to `live` for production payments
