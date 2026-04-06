'use client'

import { useState, useEffect } from 'react'

const testimonials = [
  {
    name: 'Sarah M.',
    initial: 'S',
    text: 'This reading was so accurate it gave me chills. It pinpointed things about my career transition that I hadn\'t even told anyone about. The combination of tarot and numerology insights was incredibly powerful.',
  },
  {
    name: 'James L.',
    initial: 'J',
    text: 'I\'ve had tarot readings before, but the numerology insights from Aetheria Nexus added a whole new dimension. My life path number analysis was spot-on and helped me understand recurring patterns in my relationships.',
  },
  {
    name: 'Maya P.',
    initial: 'M',
    text: 'The reading was incredibly detailed and personal. It felt like the AI truly understood my energy. The birth chart analysis combined with the tarot spread painted a picture I\'ve never seen before.',
  },
  {
    name: 'Rachel D.',
    initial: 'R',
    text: 'Finally, a spiritual platform that feels professional, accurate, and secure. The Complete Deep Dive reading was worth every penny. I keep coming back to re-read sections and discover new insights.',
  },
  {
    name: 'Alex T.',
    initial: 'A',
    text: 'The Complete Deep Dive was worth every penny. The 12-month forecast has been eerily accurate so far, and the follow-up chat feature let me dig deeper into the areas that mattered most to me.',
  },
  {
    name: 'Emma K.',
    initial: 'E',
    text: 'I was skeptical about AI readings, but Aetheria Nexus proved me wrong. The cross-referencing of four spiritual methods created a reading more insightful than any human reading I\'ve had.',
  },
] as const

const autoRotateInterval = 5000

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, autoRotateInterval)
    return () => clearInterval(interval)
  }, [])

  const handleDotClick = (index: number) => setActiveIndex(index)

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl text-text-heading-1 md:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-text-muted">
            Join thousands who have discovered deeper self-awareness through
            Aetheria Nexus
          </p>
        </div>

        <div className="glass rounded-[var(--radius-card)] p-8 md:p-12">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-celestial-400 to-celestial-600 text-2xl font-bold text-white">
              {testimonials[activeIndex].initial}
            </div>

            <div className="mb-4 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-xl text-yellow-400">
                  ★
                </span>
              ))}
            </div>

            <blockquote className="mb-6 max-w-2xl text-lg leading-relaxed text-text-body italic">
              &ldquo;{testimonials[activeIndex].text}&rdquo;
            </blockquote>

            <p className="font-semibold text-text-heading-2">
              {testimonials[activeIndex].name}
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'scale-125 bg-celestial-500'
                  : 'bg-celestial-300 hover:bg-celestial-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
