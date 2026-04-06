'use client'

import { useState, useEffect } from 'react'
import { planConfigs } from './core'
import type { Plan } from './core'
import type { ReadingFormValues } from './schema'
import type { SpiritualProfile } from './types'
import { computeSpiritualProfile } from './spiritual'
import ReadingForm from './ReadingForm'
import ReadingDisplay from './ReadingDisplay'
import GeneratingOverlay from './GeneratingOverlay'
import CheckoutSection from '@/modules/payment/checkout-section'

type ReadingModalProps = {
  plan: Plan
  isOpen: boolean
  onClose: () => void
}

const readingSteps = ['form', 'payment', 'generating', 'complete'] as const
type ReadingStep = (typeof readingSteps)[number]

type PaymentResult = {
  provider: string
  transactionId: string
}

const ReadingModal = ({ plan, isOpen, onClose }: ReadingModalProps) => {
  const [step, setStep] = useState<ReadingStep>('form')
  const [formData, setFormData] = useState<ReadingFormValues | null>(null)
  const [reading, setReading] = useState('')
  const [spiritualProfile, setSpiritualProfile] =
    useState<SpiritualProfile | null>(null)
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null)

  const config = planConfigs[plan]

  useEffect(() => {
    if (!isOpen) {
      setStep('form')
      setFormData(null)
      setReading('')
      setSpiritualProfile(null)
      setPaymentResult(null)
    }
  }, [isOpen])

  const handleFormSubmit = (data: ReadingFormValues) => {
    setFormData(data)
    setStep('payment')
  }

  const handlePaymentSuccess = (result: PaymentResult) => {
    setPaymentResult(result)
    setStep('generating')
    generateReading(result)
  }

  const generateReading = async (payment: PaymentResult) => {
    if (!formData) return

    const profile = computeSpiritualProfile({ dob: formData.dob })
    setSpiritualProfile(profile)

    const response = await fetch('/api/generate-reading', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        plan,
        payment,
      }),
    })

    if (!response.ok || !response.body) {
      setReading('Something went wrong generating your reading. Please contact support.')
      setStep('complete')
      return
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let accumulated = ''

    let done = false
    while (!done) {
      const chunk = await reader.read()
      done = chunk.done
      if (chunk.value) {
        accumulated += decoder.decode(chunk.value, { stream: !done })
        setReading(accumulated)
      }
    }

    setStep('complete')
  }

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && step !== 'generating') {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="glass relative w-full max-w-2xl animate-modal-in rounded-[var(--radius-card)] p-6 shadow-2xl md:p-8">
        {step !== 'generating' && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-celestial-100 hover:text-celestial-700"
            aria-label="Close"
          >
            ×
          </button>
        )}

        <div className="max-h-[80vh] overflow-y-auto">
          {step === 'form' && (
            <ReadingForm plan={plan} onSubmit={handleFormSubmit} />
          )}

          {step === 'payment' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="mb-2 text-xl text-text-heading-1">
                  Complete Your Payment
                </h3>
                <p className="text-sm text-text-muted">
                  {config.name} - {config.displayPrice}
                </p>
              </div>
              <CheckoutSection
                plan={plan}
                amountInCents={config.priceInCents}
                amountInDollars={config.displayPrice}
                onPaymentSuccess={handlePaymentSuccess}
              />
              <button
                type="button"
                onClick={() => setStep('form')}
                className="w-full text-center text-sm text-text-muted hover:text-celestial-600"
              >
                Back to form
              </button>
            </div>
          )}

          {step === 'generating' && <GeneratingOverlay plan={plan} />}

          {step === 'complete' && spiritualProfile && formData && (
            <ReadingDisplay
              reading={reading}
              spiritualProfile={spiritualProfile}
              plan={plan}
              name={formData.name}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ReadingModal
