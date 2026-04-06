import { NextResponse } from 'next/server'
import { capturePayPalOrder } from '@/modules/payment/paypal'
import { priceInCentsToPlan } from '@/modules/reading/core'

const centsPerDollar = 100

export const POST = async (request: Request) => {
  const body = (await request.json()) as { orderId: string }

  if (!body.orderId) {
    return NextResponse.json(
      { error: 'Expected orderId to be present' },
      { status: 400 }
    )
  }

  const captureResult = await capturePayPalOrder({
    orderId: body.orderId,
  })

  const amountInCents = Math.round(
    parseFloat(captureResult.amountCaptured) * centsPerDollar
  )
  const plan = priceInCentsToPlan(amountInCents)

  return NextResponse.json({
    success: true,
    plan,
    transactionId: captureResult.transactionId,
  })
}
