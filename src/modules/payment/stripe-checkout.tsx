'use client'

import { useState } from 'react'
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'

type StripeCheckoutProps = {
  clientSecret: string
  onSuccess: () => void
  onError: (error: string) => void
}

const StripeCheckout = ({
  clientSecret: _clientSecret,
  onSuccess,
  onError,
}: StripeCheckoutProps) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) return

    setIsSubmitting(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/reading`,
      },
      redirect: 'if_required',
    })

    if (error) {
      onError(error.message ?? 'Payment failed. Please try again.')
      setIsSubmitting(false)
      return
    }

    onSuccess()
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement
        options={{
          layout: 'tabs',
        }}
      />
      <button
        type="submit"
        disabled={!stripe || !elements || isSubmitting}
        className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:from-pink-600 hover:to-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? 'Processing...' : 'Complete Payment'}
      </button>
    </form>
  )
}

export default StripeCheckout
