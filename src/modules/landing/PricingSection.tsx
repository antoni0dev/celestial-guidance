'use client'

import { useState } from 'react'
import { plans, planConfigs, planFeatures } from '@/modules/reading/core'
import type { Plan } from '@/modules/reading/core'
import ReadingModal from '@/modules/reading/ReadingModal'

const PricingSection = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)

  return (
    <section id="pricing" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl text-text-heading-1 md:text-4xl">
            Choose Your Reading
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-text-muted">
            Every plan includes cross-referenced insights from all four
            spiritual disciplines
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-3">
          {plans.map((plan) => {
            const config = planConfigs[plan]
            const features = planFeatures[plan]

            return (
              <div
                key={plan}
                className={`glass relative rounded-[var(--radius-card)] p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  config.featured
                    ? 'scale-105 border-celestial-500/40 shadow-lg md:scale-110'
                    : ''
                }`}
              >
                {config.featured && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-[var(--radius-pill)] bg-gradient-to-r from-celestial-500 to-celestial-400 px-4 py-1 text-xs font-bold text-white">
                    MOST POPULAR
                  </span>
                )}

                <div className="mb-6 text-center">
                  <h3 className="mb-2 text-xl text-text-heading-2">
                    {config.name}
                  </h3>
                  <div className="mb-1 text-4xl font-bold text-text-heading-1">
                    {config.displayPrice}
                  </div>
                  <p className="text-sm text-text-muted">
                    {config.wordRange} words
                  </p>
                </div>

                <ul className="mb-8 flex flex-col gap-3">
                  {features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-text-body"
                    >
                      <span className="mt-0.5 text-celestial-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setSelectedPlan(plan)}
                  className={`w-full rounded-[var(--radius-pill)] py-3 text-sm font-semibold transition-all hover:brightness-110 ${
                    config.featured
                      ? 'bg-gradient-to-r from-celestial-500 to-celestial-400 text-white shadow-md hover:shadow-lg'
                      : 'glass text-celestial-800 hover:bg-surface-hover'
                  }`}
                >
                  Get Your Reading
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {selectedPlan && (
        <ReadingModal
          plan={selectedPlan}
          isOpen={selectedPlan !== null}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </section>
  )
}

export default PricingSection
