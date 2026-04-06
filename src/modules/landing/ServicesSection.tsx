const services = [
  {
    title: 'Palm Reading',
    subtitle: 'Your Life Map in Your Hands',
    description:
      'Discover the hidden narratives etched into your palms. From your heart line to your fate line, every crease tells a story about your past, present, and future.',
    tags: ['Life Path', 'Heart Line', 'Fate Line', 'Career'],
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="h-12 w-12"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path d="M24 4c-3 0-6 4-6 10s3 8 6 8 6-2 6-8-3-10-6-10z" className="text-celestial-500" />
        <path d="M14 18c-2-1-5 1-7 6s0 9 2 10 5-1 7-6 0-9-2-10z" className="text-celestial-400" />
        <path d="M34 18c2-1 5 1 7 6s0 9-2 10-5-1-7-6 0-9 2-10z" className="text-celestial-400" />
        <circle cx="24" cy="30" r="8" className="text-celestial-500" />
        <path d="M24 36v8M20 40h8" className="text-celestial-400" />
      </svg>
    ),
  },
  {
    title: 'Astrology & Birth Chart',
    subtitle: 'Written in the Stars',
    description:
      'Your birth chart is a cosmic snapshot of the sky at the exact moment you entered this world. Unlock the planetary influences that shape your personality and destiny.',
    tags: ['Birth Chart', 'Transits', 'Compatibility', 'Forecast'],
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="h-12 w-12"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <circle cx="24" cy="24" r="18" className="text-celestial-500" />
        <circle cx="24" cy="24" r="12" className="text-celestial-400" />
        <circle cx="24" cy="24" r="4" className="text-celestial-500" />
        <line x1="24" y1="6" x2="24" y2="12" className="text-celestial-400" />
        <line x1="24" y1="36" x2="24" y2="42" className="text-celestial-400" />
        <line x1="6" y1="24" x2="12" y2="24" className="text-celestial-400" />
        <line x1="36" y1="24" x2="42" y2="24" className="text-celestial-400" />
      </svg>
    ),
  },
  {
    title: 'Tarot Card Reading',
    subtitle: 'Messages from the Universe',
    description:
      'Each card drawn is a window into the cosmic energy surrounding your question. Aetheria Nexus interprets spreads with unmatched precision and depth.',
    tags: ['Card Spread', 'Guidance', 'Love', 'Career'],
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="h-12 w-12"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <rect x="10" y="6" width="20" height="32" rx="3" className="text-celestial-500" />
        <rect x="18" y="10" width="20" height="32" rx="3" className="text-celestial-400" />
        <path d="M28 22l-4-6-4 6h3v6h2v-6h3z" className="text-celestial-500" />
      </svg>
    ),
  },
  {
    title: 'Numerology',
    subtitle: 'The Power of Numbers',
    description:
      'Numbers vibrate at specific frequencies that influence every aspect of your life. Discover your life path, soul urge, and expression numbers.',
    tags: ['Life Path', 'Soul Urge', 'Expression', 'Forecast'],
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="h-12 w-12"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <circle cx="16" cy="16" r="10" className="text-celestial-500" />
        <circle cx="32" cy="16" r="10" className="text-celestial-400" />
        <circle cx="24" cy="30" r="10" className="text-celestial-500" />
        <text x="14" y="20" fontSize="10" fill="currentColor" className="text-celestial-400">7</text>
        <text x="30" y="20" fontSize="10" fill="currentColor" className="text-celestial-500">3</text>
        <text x="22" y="34" fontSize="10" fill="currentColor" className="text-celestial-400">9</text>
      </svg>
    ),
  },
] as const

const ServicesSection = () => (
  <section id="services" className="px-6 py-24">
    <div className="mx-auto max-w-6xl">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl text-text-heading-1 md:text-4xl">
          Four Disciplines, One Reading
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-text-muted">
          Aetheria Nexus weaves together four ancient spiritual practices into a
          single, unified insight
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.title}
            className="glass group rounded-[var(--radius-card)] p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="mb-1 text-xl text-text-heading-2">
              {service.title}
            </h3>
            <p className="mb-3 text-sm font-semibold text-celestial-500">
              {service.subtitle}
            </p>
            <p className="mb-6 text-sm leading-relaxed text-text-muted">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="glass rounded-[var(--radius-tag)] px-3 py-1 text-xs font-medium text-celestial-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default ServicesSection
