'use client'

import { planConfigs } from './core'
import type { Plan } from './core'
import type { SpiritualProfile } from './types'

type ReadingDisplayProps = {
  reading: string
  spiritualProfile: SpiritualProfile
  plan: Plan
  name: string
}

type ProfileBadge = {
  label: string
  value: string
}

const buildProfileBadges = (profile: SpiritualProfile): ProfileBadge[] => [
  { label: 'Zodiac', value: profile.zodiacSign },
  { label: 'Moon', value: profile.moonSign },
  { label: 'Life Path', value: String(profile.lifePathNumber) },
  ...profile.tarotCards.map((card) => ({ label: 'Tarot', value: card })),
]

const formatReadingText = (text: string): string[] =>
  text.split('\n\n').filter((paragraph) => paragraph.trim().length > 0)

const formatParagraph = (paragraph: string): string =>
  paragraph.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')

const ReadingDisplay = ({
  reading,
  spiritualProfile,
  plan,
  name,
}: ReadingDisplayProps) => {
  const config = planConfigs[plan]
  const badges = buildProfileBadges(spiritualProfile)
  const paragraphs = formatReadingText(reading)
  const generationDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="mb-2 text-2xl text-text-heading-1">
          {name}&apos;s Reading
        </h2>
        <div className="flex items-center justify-center gap-3">
          <span className="rounded-[var(--radius-pill)] bg-celestial-100 px-3 py-1 text-xs font-medium text-celestial-700">
            {config.name}
          </span>
          <span className="text-sm text-text-muted">{generationDate}</span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {badges.map((badge) => (
          <span
            key={`${badge.label}-${badge.value}`}
            className="glass rounded-[var(--radius-tag)] px-3 py-1.5 text-xs font-medium text-celestial-700"
          >
            {badge.label}: {badge.value}
          </span>
        ))}
      </div>

      <div className="glass rounded-[var(--radius-card)] p-6 md:p-8">
        <div className="prose prose-sm max-w-none space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p
              key={`p-${index}`}
              className="leading-relaxed text-text-body"
              dangerouslySetInnerHTML={{ __html: formatParagraph(paragraph) }}
            />
          ))}
        </div>
      </div>

      <div className="glass rounded-xl p-4 text-center">
        <p className="text-sm text-text-muted">
          Your reading has also been sent to your email
        </p>
      </div>
    </div>
  )
}

export default ReadingDisplay
