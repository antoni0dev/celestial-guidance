'use client'

import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { clientEnv } from '@/lib/env'
import type { PaymentProvider } from './core'
import StripeCheckout from './stripe-checkout'
import PayPalCheckout from './paypal-checkout'

const stripePromise = loadStripe(clientEnv.stripePublishableKey)

type CheckoutSectionProps = {
  plan: string
  amountInCents: number
  amountInDollars: string
  onPaymentSuccess: (result: {
    provider: string
    transactionId: string
  }) => void
}

const providerLabels: Record<PaymentProvider, string> = {
  stripe: 'Card',
  paypal: 'PayPal',
}

const CheckoutSection = ({
  plan,
  amountInCents: _amountInCents,
  amountInDollars,
  onPaymentSuccess,
}: CheckoutSectionProps) => {
  const [activeProvider, setActiveProvider] =
    useState<PaymentProvider>('stripe')
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (activeProvider !== 'stripe') return

    const fetchClientSecret = async () => {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })

      if (!response.ok) {
        setError('Failed to initialize payment. Please try again.')
        return
      }

      const data = (await response.json()) as { clientSecret: string }
      setClientSecret(data.clientSecret)
    }

    setClientSecret(null)
    setError(null)
    fetchClientSecret()
  }, [activeProvider, plan])

  return (
    <div className="space-y-6">
      <div className="flex gap-2 rounded-xl bg-pink-50/50 p-1">
        {(['stripe', 'paypal'] as const).map((provider) => (
          <button
            key={provider}
            onClick={() => {
              setActiveProvider(provider)
              setError(null)
            }}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
              activeProvider === provider
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                : 'text-pink-700 hover:bg-pink-100/50'
            }`}
          >
            {providerLabels[provider]}
          </button>
        ))}
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {activeProvider === 'stripe' && clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: 'stripe',
              variables: {
                colorPrimary: '#ec4899',
                borderRadius: '12px',
              },
            },
          }}
        >
          <StripeCheckout
            clientSecret={clientSecret}
            onSuccess={() =>
              onPaymentSuccess({
                provider: 'stripe',
                transactionId: clientSecret.split('_secret_')[0],
              })
            }
            onError={setError}
          />
        </Elements>
      )}

      {activeProvider === 'stripe' && !clientSecret && !error && (
        <div className="flex items-center justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-pink-200 border-t-pink-500" />
        </div>
      )}

      {activeProvider === 'paypal' && (
        <PayPalScriptProvider
          options={{
            clientId: clientEnv.paypalClientId,
            currency: 'USD',
          }}
        >
          <PayPalCheckout
            plan={plan}
            amount={amountInDollars}
            onSuccess={(captureData) =>
              onPaymentSuccess({
                provider: 'paypal',
                transactionId: captureData.transactionId,
              })
            }
            onError={setError}
          />
        </PayPalScriptProvider>
      )}
    </div>
  )
}

export default CheckoutSection
