import OpenAI from 'openai'

import { env } from '@/lib/env'

import { planConfigs } from './core'
import { buildReadingPrompt, readingModel, readingTemperature } from './prompt'
import type { ReadingInput, SpiritualProfile } from './types'

type GenerateReadingStreamInput = {
  input: ReadingInput
  spiritualProfile: SpiritualProfile
}

export const generateReadingStream = async ({
  input,
  spiritualProfile,
}: GenerateReadingStreamInput): Promise<ReadableStream<Uint8Array>> => {
  const openai = new OpenAI({ apiKey: env().openaiApiKey })
  const prompt = buildReadingPrompt({ ...input, spiritualProfile })
  const config = planConfigs[input.plan]

  const response = await openai.chat.completions.create({
    model: readingModel,
    temperature: readingTemperature,
    max_tokens: config.maxTokens,
    stream: true,
    messages: [{ role: 'user', content: prompt }],
  })

  const encoder = new TextEncoder()

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      for await (const chunk of response) {
        const content = chunk.choices[0]?.delta?.content
        if (content) {
          controller.enqueue(encoder.encode(content))
        }
      }
      controller.close()
    },
  })
}
