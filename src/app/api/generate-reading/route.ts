import { after } from 'next/server'
import { plans, isPlan } from '@/modules/reading/core'
import { readingFormSchema } from '@/modules/reading/schema'
import { computeSpiritualProfile } from '@/modules/reading/spiritual'
import { generateReadingStream } from '@/modules/reading/generate'
import { verifyPaymentIntent } from '@/modules/payment/stripe'
import { sendReadingEmail } from '@/modules/email/send-reading'

type GenerateReadingBody = {
  name: string
  email: string
  dob: string
  timeOfBirth: string
  placeOfBirth: string
  gender: string
  focusArea: string
  relationshipStatus: string
  mainQuestion: string
  additionalContext: string
  plan: string
  paymentIntentId?: string
  paypalCaptureId?: string
}

export const POST = async (request: Request) => {
  const body = (await request.json()) as GenerateReadingBody

  if (!isPlan(body.plan)) {
    return new Response(
      JSON.stringify({
        error: `Expected plan to be one of ${plans.join(', ')}, got "${body.plan}"`,
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const plan = body.plan

  const validation = readingFormSchema.safeParse(body)
  if (!validation.success) {
    return new Response(
      JSON.stringify({ error: 'Invalid form data', details: validation.error.issues }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  if (body.paymentIntentId) {
    await verifyPaymentIntent({ paymentIntentId: body.paymentIntentId })
  } else if (!body.paypalCaptureId) {
    return new Response(
      JSON.stringify({ error: 'Expected paymentIntentId or paypalCaptureId to be present' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const spiritualProfile = computeSpiritualProfile({ dob: body.dob })

  const input = {
    name: body.name,
    email: body.email,
    dob: body.dob,
    timeOfBirth: body.timeOfBirth,
    placeOfBirth: body.placeOfBirth,
    gender: body.gender,
    focusArea: body.focusArea,
    relationshipStatus: body.relationshipStatus,
    mainQuestion: body.mainQuestion,
    additionalContext: body.additionalContext,
    plan,
  }

  const openaiStream = await generateReadingStream({ input, spiritualProfile })
  const reader = openaiStream.getReader()
  const decoder = new TextDecoder()
  let fullText = ''

  const stream = new ReadableStream({
    async start(controller) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const text = decoder.decode(value)
        fullText += text
        controller.enqueue(value)
      }
      controller.close()

      after(async () => {
        await sendReadingEmail({
          to: body.email,
          name: body.name,
          plan,
          reading: fullText,
          spiritualProfile,
        })
      })
    },
  })

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
