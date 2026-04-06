'use client'

import { planConfigs } from './core'
import type { Plan } from './core'

type GeneratingOverlayProps = {
  plan: Plan
}

const sparkleDelays = [0, 0.5, 1, 1.5, 2, 2.5, 0.3, 0.8, 1.3] as const

const GeneratingOverlay = ({ plan }: GeneratingOverlayProps) => {
  const config = planConfigs[plan]

  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center space-y-8 py-12">
      <div className="relative">
        <div className="flex flex-wrap justify-center gap-3">
          {sparkleDelays.map((delay, index) => (
            <span
              key={`sparkle-${index}`}
              className="animate-twinkle text-2xl"
              style={{ animationDelay: `${delay}s` }}
            >
              ✨
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-celestial-200 border-t-celestial-500" />

        <div className="text-center">
          <h3 className="mb-2 text-xl text-text-heading-1">
            Generating your reading...
          </h3>
          <p className="text-sm text-text-muted">
            Crafting your{' '}
            <span className="font-medium text-celestial-600">
              {config.name}
            </span>
          </p>
        </div>
      </div>

      <p className="text-center text-xs text-text-muted">
        This may take a moment for longer readings
      </p>
    </div>
  )
}

export default GeneratingOverlay
