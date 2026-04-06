import { z } from 'zod'

const nameMaxLength = 200
const mainQuestionMaxLength = 2000
const additionalContextMaxLength = 3000

export const genders = ['prefer-not-to-say', 'female', 'male', 'non-binary'] as const
export type Gender = (typeof genders)[number]

export const focusAreas = [
  'General Life Guidance',
  'Love & Relationships',
  'Career & Finance',
  'Health & Wellness',
  'Spiritual Growth',
  'Family & Home',
] as const
export type FocusArea = (typeof focusAreas)[number]

export const relationshipStatuses = [
  'Single',
  'In a Relationship',
  'Married',
  'Prefer not to say',
] as const
export type RelationshipStatus = (typeof relationshipStatuses)[number]

export const birthDetailsSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(nameMaxLength, `Name must be ${nameMaxLength} characters or fewer`),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  dob: z.string().min(1, 'Date of birth is required'),
  timeOfBirth: z.string().min(1, 'Time of birth is required'),
  placeOfBirth: z.string().min(1, 'Place of birth is required'),
  gender: z.enum(genders),
})

export const readingContextSchema = z.object({
  focusArea: z.enum(focusAreas),
  relationshipStatus: z.enum(relationshipStatuses),
  mainQuestion: z
    .string()
    .min(1, 'Main question is required')
    .max(mainQuestionMaxLength, `Question must be ${mainQuestionMaxLength} characters or fewer`),
  additionalContext: z
    .string()
    .max(
      additionalContextMaxLength,
      `Additional context must be ${additionalContextMaxLength} characters or fewer`
    )
    .optional()
    .default(''),
})

export const readingFormSchema = birthDetailsSchema.merge(readingContextSchema)

export type BirthDetailsFormValues = z.infer<typeof birthDetailsSchema>
export type ReadingContextFormValues = z.infer<typeof readingContextSchema>
export type ReadingFormValues = z.infer<typeof readingFormSchema>
