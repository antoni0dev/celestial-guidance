'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  readingFormSchema,
  genders,
  focusAreas,
  relationshipStatuses,
} from './schema'
import type { ReadingFormValues } from './schema'
import { planConfigs } from './core'
import type { Plan } from './core'

type ReadingFormProps = {
  plan: Plan
  onSubmit: (data: ReadingFormValues) => void
}

const resolver = zodResolver(readingFormSchema)

const totalSteps = 2

const genderLabels: Record<(typeof genders)[number], string> = {
  'prefer-not-to-say': 'Prefer not to say',
  female: 'Female',
  male: 'Male',
  'non-binary': 'Non-binary',
}

const ReadingForm = ({ plan, onSubmit }: ReadingFormProps) => {
  const [step, setStep] = useState(1)
  const config = planConfigs[plan]

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver,
    defaultValues: {
      name: '',
      email: '',
      dob: '',
      timeOfBirth: '',
      placeOfBirth: '',
      gender: 'prefer-not-to-say' as const,
      focusArea: 'General Life Guidance' as const,
      relationshipStatus: 'Prefer not to say' as const,
      mainQuestion: '',
      additionalContext: '',
    },
  })

  const handleNext = async () => {
    const stepOneFields = [
      'name',
      'email',
      'dob',
      'timeOfBirth',
      'placeOfBirth',
      'gender',
    ] as const
    const isValid = await trigger([...stepOneFields])
    if (isValid) setStep(2)
  }

  const handleBack = () => setStep(1)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mb-2 inline-block rounded-[var(--radius-pill)] bg-celestial-100 px-4 py-1 text-sm font-medium text-celestial-700">
          {config.name} - {config.displayPrice}
        </div>
        <div className="mt-3 flex items-center justify-center gap-2 text-sm text-text-muted">
          <span
            className={
              step === 1
                ? 'font-semibold text-celestial-600'
                : 'text-text-muted'
            }
          >
            1. Birth Details
          </span>
          <span className="text-celestial-300">/</span>
          <span
            className={
              step === 2
                ? 'font-semibold text-celestial-600'
                : 'text-text-muted'
            }
          >
            2. Your Question
          </span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="space-y-5"
        noValidate
      >
        {step === 1 && (
          <div className="space-y-4 animate-fade-up">
            <FormField label="Full Name" error={errors.name?.message}>
              <input
                {...register('name')}
                type="text"
                placeholder="Your full name"
                className="glass w-full rounded-xl px-4 py-3 text-text-body outline-none transition-all focus:border-celestial-400 focus:ring-2 focus:ring-celestial-200"
              />
            </FormField>

            <FormField label="Email" error={errors.email?.message}>
              <input
                {...register('email')}
                type="email"
                placeholder="your@email.com"
                className="glass w-full rounded-xl px-4 py-3 text-text-body outline-none transition-all focus:border-celestial-400 focus:ring-2 focus:ring-celestial-200"
              />
            </FormField>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Date of Birth" error={errors.dob?.message}>
                <input
                  {...register('dob')}
                  type="date"
                  className="glass w-full rounded-xl px-4 py-3 text-text-body outline-none transition-all focus:border-celestial-400 focus:ring-2 focus:ring-celestial-200"
                />
              </FormField>

              <FormField
                label="Time of Birth"
                error={errors.timeOfBirth?.message}
              >
                <input
                  {...register('timeOfBirth')}
                  type="time"
                  className="glass w-full rounded-xl px-4 py-3 text-text-body outline-none transition-all focus:border-celestial-400 focus:ring-2 focus:ring-celestial-200"
                />
              </FormField>
            </div>

            <FormField
              label="Place of Birth"
              error={errors.placeOfBirth?.message}
            >
              <input
                {...register('placeOfBirth')}
                type="text"
                placeholder="City, Country"
                className="glass w-full rounded-xl px-4 py-3 text-text-body outline-none transition-all focus:border-celestial-400 focus:ring-2 focus:ring-celestial-200"
              />
            </FormField>

            <FormField label="Gender" error={errors.gender?.message}>
              <select
                {...register('gender')}
                className="glass w-full rounded-xl px-4 py-3 text-text-body outline-none transition-all focus:border-celestial-400 focus:ring-2 focus:ring-celestial-200"
              >
                {genders.map((g) => (
                  <option key={g} value={g}>
                    {genderLabels[g]}
                  </option>
                ))}
              </select>
            </FormField>

            <button
              type="button"
              onClick={handleNext}
              className="w-full rounded-[var(--radius-pill)] bg-gradient-to-r from-celestial-500 to-celestial-400 py-3 text-sm font-semibold text-white transition-all hover:brightness-110 hover:shadow-lg"
            >
              Next - Your Question
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fade-up">
            <FormField label="Focus Area" error={errors.focusArea?.message}>
              <select
                {...register('focusArea')}
                className="glass w-full rounded-xl px-4 py-3 text-text-body outline-none transition-all focus:border-celestial-400 focus:ring-2 focus:ring-celestial-200"
              >
                {focusAreas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField
              label="Relationship Status"
              error={errors.relationshipStatus?.message}
            >
              <select
                {...register('relationshipStatus')}
                className="glass w-full rounded-xl px-4 py-3 text-text-body outline-none transition-all focus:border-celestial-400 focus:ring-2 focus:ring-celestial-200"
              >
                {relationshipStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField
              label="Your Main Question"
              error={errors.mainQuestion?.message}
            >
              <textarea
                {...register('mainQuestion')}
                rows={3}
                placeholder="What would you like guidance on?"
                className="glass w-full resize-none rounded-xl px-4 py-3 text-text-body outline-none transition-all focus:border-celestial-400 focus:ring-2 focus:ring-celestial-200"
              />
            </FormField>

            <FormField
              label="Additional Context (optional)"
              error={errors.additionalContext?.message}
            >
              <textarea
                {...register('additionalContext')}
                rows={2}
                placeholder="Any other details you'd like to share..."
                className="glass w-full resize-none rounded-xl px-4 py-3 text-text-body outline-none transition-all focus:border-celestial-400 focus:ring-2 focus:ring-celestial-200"
              />
            </FormField>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="glass flex-1 rounded-[var(--radius-pill)] py-3 text-sm font-semibold text-celestial-700 transition-all hover:bg-surface-hover"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 rounded-[var(--radius-pill)] bg-gradient-to-r from-celestial-500 to-celestial-400 py-3 text-sm font-semibold text-white transition-all hover:brightness-110 hover:shadow-lg"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-center gap-2">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition-all ${
                i + 1 === step
                  ? 'w-6 bg-celestial-500'
                  : 'bg-celestial-200'
              }`}
            />
          ))}
        </div>
      </form>
    </div>
  )
}

type FormFieldProps = {
  label: string
  error: string | undefined
  children: React.ReactNode
}

const FormField = ({ label, error, children }: FormFieldProps) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-medium text-text-heading-2">
      {label}
    </label>
    {children}
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
)

export default ReadingForm
