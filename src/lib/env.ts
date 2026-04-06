import { ensurePresent } from './utils/ensure-present'

const getServerEnv = () => ({
  stripeSecretKey: ensurePresent(
    process.env.STRIPE_SECRET_KEY,
    'STRIPE_SECRET_KEY env variable'
  ),
  stripeWebhookSecret: ensurePresent(
    process.env.STRIPE_WEBHOOK_SECRET,
    'STRIPE_WEBHOOK_SECRET env variable'
  ),
  paypalClientId: ensurePresent(
    process.env.PAYPAL_CLIENT_ID,
    'PAYPAL_CLIENT_ID env variable'
  ),
  paypalClientSecret: ensurePresent(
    process.env.PAYPAL_CLIENT_SECRET,
    'PAYPAL_CLIENT_SECRET env variable'
  ),
  paypalMode: (process.env.PAYPAL_MODE ?? 'sandbox') as 'sandbox' | 'live',
  openaiApiKey: ensurePresent(
    process.env.OPENAI_API_KEY,
    'OPENAI_API_KEY env variable'
  ),
  resendApiKey: ensurePresent(
    process.env.RESEND_API_KEY,
    'RESEND_API_KEY env variable'
  ),
  fromEmail: ensurePresent(
    process.env.FROM_EMAIL,
    'FROM_EMAIL env variable'
  ),
})

type ServerEnv = ReturnType<typeof getServerEnv>

let cachedEnv: ServerEnv | null = null

export const env = (): ServerEnv => {
  if (!cachedEnv) {
    cachedEnv = getServerEnv()
  }
  return cachedEnv
}

export const clientEnv = {
  stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '',
  paypalClientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
}
