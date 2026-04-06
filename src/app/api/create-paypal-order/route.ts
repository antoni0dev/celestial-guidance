import { NextResponse } from 'next/server'
import { plans, planConfigs, isPlan } from '@/modules/reading/core'
import { createPayPalOrder } from '@/modules/payment/paypal'

const centsPerDollar = 100

export const POST = async (request: Request) => {
  const body = (await request.json()) as { plan: string }

  if (!isPlan(body.plan)) {
    return NextResponse.json(
      { error: `Expected plan to be one of ${plans.join(', ')}, got "${body.plan}"` },
      { status: 400 }
    )
  }

  const config = planConfigs[body.plan]
  const amountInDollars = (config.priceInCents / centsPerDollar).toFixed(2)

  const orderId = await createPayPalOrder({
    amountInDollars,
    plan: body.plan,
  })

  return NextResponse.json({ orderId })
}
