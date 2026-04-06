import { NextResponse } from 'next/server'
import { plans, planConfigs, isPlan } from '@/modules/reading/core'
import { createPaymentIntent } from '@/modules/payment/stripe'

export const POST = async (request: Request) => {
  const body = (await request.json()) as { plan: string }

  if (!isPlan(body.plan)) {
    return NextResponse.json(
      { error: `Expected plan to be one of ${plans.join(', ')}, got "${body.plan}"` },
      { status: 400 }
    )
  }

  const config = planConfigs[body.plan]

  const result = await createPaymentIntent({
    amountInCents: config.priceInCents,
    plan: body.plan,
  })

  return NextResponse.json({ clientSecret: result.clientSecret })
}
