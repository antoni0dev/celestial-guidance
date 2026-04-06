import type { Plan } from './core'
import { planConfigs } from './core'
import type { ReadingInput, SpiritualProfile } from './types'

export const readingTemperature = 0.85
export const readingModel = 'gpt-4o-mini'

const baseSections = [
  'Birth Chart Analysis',
  'Life Path Number Interpretation',
  'Tarot Card Reading',
  'Current Cosmic Influences',
  'Personalized Guidance',
] as const

const deepDiveSections = [
  'Past Life Indicators',
  'Karmic Lessons',
  'Soul Purpose & Mission',
  'Year-Ahead Forecast',
  'Relationship Compatibility Insights',
  'Career & Abundance Alignment',
] as const

type PlanPromptConfig = {
  readonly sectionInstruction: string
  readonly sections: readonly string[]
}

const planPromptConfigs: Record<Plan, PlanPromptConfig> = {
  quickGlimpse: {
    sectionInstruction: 'Cover these sections briefly:',
    sections: baseSections,
  },
  singleReading: {
    sectionInstruction: 'Cover these sections in detail:',
    sections: baseSections,
  },
  completeDeepDive: {
    sectionInstruction: 'Cover these sections comprehensively, plus additional deep-dive sections:',
    sections: [...baseSections, ...deepDiveSections],
  },
}

type BuildReadingPromptInput = ReadingInput & { spiritualProfile: SpiritualProfile }

export const buildReadingPrompt = (input: BuildReadingPromptInput): string => {
  const config = planConfigs[input.plan]
  const promptConfig = planPromptConfigs[input.plan]
  const sectionList = promptConfig.sections
    .map((section, index) => `${index + 1}. ${section}`)
    .join('\n')

  return `You are a gifted spiritual advisor and astrologer with deep knowledge of Western astrology, numerology, and tarot. Provide a ${config.depth} spiritual reading.

**Client Details:**
- Name: ${input.name}
- Date of Birth: ${input.dob}
- Time of Birth: ${input.timeOfBirth}
- Place of Birth: ${input.placeOfBirth}
- Gender: ${input.gender}

**Spiritual Profile:**
- Zodiac Sign: ${input.spiritualProfile.zodiacSign}
- Moon Sign: ${input.spiritualProfile.moonSign}
- Life Path Number: ${input.spiritualProfile.lifePathNumber}
- Tarot Cards: ${input.spiritualProfile.tarotCards.join(', ')}

**Reading Focus:**
- Focus Area: ${input.focusArea}
- Relationship Status: ${input.relationshipStatus}
- Main Question: ${input.mainQuestion}
${input.additionalContext ? `- Additional Context: ${input.additionalContext}` : ''}

**Instructions:**
Write a ${config.wordRange} word ${config.depth} for this client. ${promptConfig.sectionInstruction}

${sectionList}

Use a warm, empathetic, and mystical tone. Address the client by name. Reference their specific birth details and spiritual profile throughout. Make the reading feel deeply personal and insightful. Format with markdown headings for each section.`
}
