import type { Plan } from './core'

export type BirthDetails = {
  name: string
  email: string
  dob: string
  timeOfBirth: string
  placeOfBirth: string
  gender: string
}

export type ReadingContext = {
  focusArea: string
  relationshipStatus: string
  mainQuestion: string
  additionalContext: string
}

export type SpiritualProfile = {
  zodiacSign: string
  moonSign: string
  lifePathNumber: number
  tarotCards: readonly string[]
}

export type ReadingInput = BirthDetails & ReadingContext & { plan: Plan }

export type ReadingResult = {
  reading: string
  spiritualProfile: SpiritualProfile
  generatedAt: string
}
