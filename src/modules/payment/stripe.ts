import Stripe from 'stripe'
import { env } from '@/lib/env'

const getStripeClient = () => new Stripe(env().stripeSecretKey)

type CreatePaymentIntentInput = {
  amountInCents: number
  plan: string
  metadata?: Record<string, string>
}

export const createPaymentIntent = async ({
  amountInCents,
  plan,
  metadata,
}: CreatePaymentIntentInput) => {
  const stripe = getStripeClient()

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: 'usd',
    automatic_payment_methods: { enabled: true },
    metadata: { plan, ...metadata },
  })

  return { clientSecret: paymentIntent.client_secret }
}

type VerifyPaymentIntentInput = {
  paymentIntentId: string
}

export const verifyPaymentIntent = async ({
  paymentIntentId,
}: VerifyPaymentIntentInput) => {
  const stripe = getStripeClient()
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

  if (paymentIntent.status !== 'succeeded') {
    throw new Error(
      `Expected payment intent status "succeeded", got "${paymentIntent.status}"`
    )
  }

  return paymentIntent
}
