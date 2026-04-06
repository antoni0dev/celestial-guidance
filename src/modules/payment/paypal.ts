import { env } from '@/lib/env'
import { ensurePresent } from '@/lib/utils/ensure-present'

const paypalModeToBaseUrl: Record<'sandbox' | 'live', string> = {
  sandbox: 'https://api-m.sandbox.paypal.com',
  live: 'https://api-m.paypal.com',
}

const orderIdPattern = /^[A-Z0-9]+$/

const getPayPalBaseUrl = (): string => paypalModeToBaseUrl[env().paypalMode]

const getPayPalAccessToken = async (): Promise<string> => {
  const { paypalClientId, paypalClientSecret } = env()
  const credentials = Buffer.from(
    `${paypalClientId}:${paypalClientSecret}`
  ).toString('base64')

  const response = await fetch(`${getPayPalBaseUrl()}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  if (!response.ok) {
    throw new Error(
      `Expected PayPal token request to succeed, got status ${response.status}`
    )
  }

  const data = (await response.json()) as { access_token: string }
  return data.access_token
}

type CreatePayPalOrderInput = {
  amountInDollars: string
  plan: string
}

export const createPayPalOrder = async ({
  amountInDollars,
  plan,
}: CreatePayPalOrderInput): Promise<string> => {
  const accessToken = await getPayPalAccessToken()

  const response = await fetch(`${getPayPalBaseUrl()}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: amountInDollars,
          },
          description: `Celestial Guidance - ${plan}`,
        },
      ],
    }),
  })

  if (!response.ok) {
    throw new Error(
      `Expected PayPal order creation to succeed, got status ${response.status}`
    )
  }

  const data = (await response.json()) as { id: string }
  return data.id
}

type CapturePayPalOrderInput = {
  orderId: string
}

type PayPalCaptureResult = {
  transactionId: string
  amountCaptured: string
}

export const capturePayPalOrder = async ({
  orderId,
}: CapturePayPalOrderInput): Promise<PayPalCaptureResult> => {
  if (!orderIdPattern.test(orderId)) {
    throw new Error(
      `Expected valid PayPal order ID matching ${orderIdPattern}, got "${orderId}"`
    )
  }

  const accessToken = await getPayPalAccessToken()

  const response = await fetch(
    `${getPayPalBaseUrl()}/v2/checkout/orders/${orderId}/capture`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  )

  if (!response.ok) {
    throw new Error(
      `Expected PayPal order capture to succeed, got status ${response.status}`
    )
  }

  const data = (await response.json()) as {
    purchase_units: ReadonlyArray<{
      payments: {
        captures: ReadonlyArray<{
          id: string
          amount: { value: string }
        }>
      }
    }>
  }

  const capture = ensurePresent(
    data.purchase_units[0]?.payments?.captures?.[0],
    'PayPal capture result from order response'
  )

  return {
    transactionId: capture.id,
    amountCaptured: capture.amount.value,
  }
}
