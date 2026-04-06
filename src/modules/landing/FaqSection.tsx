'use client'

import { useState } from 'react'

const faqItems = [
  {
    question: 'How does Aetheria Nexus combine four spiritual methods?',
    answer:
      'Aetheria Nexus analyzes your birth details through astrology, numerology, tarot, and palm reading simultaneously. It cross-references insights from all four disciplines, identifying patterns and confirmations that no single method can reveal on its own. The result is a multi-dimensional spiritual profile that is far more precise than any individual reading.',
  },
  {
    question: 'Why is an Aetheria Nexus reading more accurate?',
    answer:
      'Traditional readings rely on a single method, which gives you one perspective. Aetheria Nexus creates a multi-dimensional view by validating insights across all four spiritual practices. When your birth chart, life path number, tarot spread, and palm lines all point to the same theme, you can trust that insight with far greater confidence.',
  },
  {
    question: 'How fast will I get my reading?',
    answer:
      'Your reading is generated instantly by our Aetheria Nexus AI engine and delivered directly to your email. Most readings arrive within a few minutes of completing your payment and entering your birth details.',
  },
  {
    question: 'Is my data safe and private?',
    answer:
      'We take your privacy seriously. We do not store your personal data on our servers after your reading is generated. Your reading is delivered securely via email, and we never share your information with third parties.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit and debit cards through Stripe, as well as PayPal. All transactions are secured with industry-standard encryption to protect your financial information.',
  },
  {
    question: 'Can I get a refund?',
    answer:
      'If you are unsatisfied with your reading, please contact us at celestialguidance.ai@gmail.com within 24 hours of purchase. We review each refund request individually and strive to ensure your complete satisfaction.',
  },
  {
    question: 'How detailed is the Complete Deep Dive?',
    answer:
      'The Complete Deep Dive is our most comprehensive offering at 2,500-3,500 words. It includes 11 in-depth sections covering your full birth chart, all planetary aspects, life path and destiny numbers, an extended tarot reading, past life indicators, and a detailed 12-month forecast. You also get unlimited follow-up questions for a full year.',
  },
] as const

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) =>
    setOpenIndex((prev) => (prev === index ? null : index))

  return (
    <section id="faq" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl text-text-heading-1 md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-text-muted">
            Everything you need to know about your Aetheria Nexus reading
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={item.question}
                className="glass rounded-[var(--radius-card)] transition-all duration-300"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="pr-4 font-semibold text-text-heading-2">
                    {item.question}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg text-celestial-500 transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96 pb-6' : 'max-h-0'
                  }`}
                >
                  <p className="px-6 leading-relaxed text-text-muted">
                    {item.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FaqSection
