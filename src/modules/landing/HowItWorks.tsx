const steps = [
  {
    number: '01',
    icon: '🎯',
    title: 'Choose Your Reading',
    description:
      'Pick from Quick Glimpse, Single Reading, or Complete Deep Dive - each offering a different level of spiritual insight.',
  },
  {
    number: '02',
    icon: '📝',
    title: 'Share Your Details',
    description:
      'Enter your birth date, time, location, and your burning question. The more precise your details, the more accurate your reading.',
  },
  {
    number: '03',
    icon: '🔮',
    title: 'AI Generates Your Reading',
    description:
      'Aetheria Nexus cross-references astrology, tarot, numerology, and palm reading to create your unique spiritual profile.',
  },
  {
    number: '04',
    icon: '✉️',
    title: 'Receive via Email',
    description:
      'Your personalized reading is delivered straight to your inbox, beautifully formatted and ready to explore.',
  },
] as const

const HowItWorks = () => (
  <section id="how-it-works" className="px-6 py-24">
    <div className="mx-auto max-w-6xl">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl text-text-heading-1 md:text-4xl">
          How It Works
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-text-muted">
          Four simple steps to unlock your most precise spiritual reading ever
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div
            key={step.number}
            className="glass group rounded-[var(--radius-card)] p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <span className="mb-2 block text-sm font-bold text-celestial-400">
              STEP {step.number}
            </span>
            <span className="mb-4 block text-4xl">{step.icon}</span>
            <h3 className="mb-3 text-xl text-text-heading-2">{step.title}</h3>
            <p className="text-sm leading-relaxed text-text-muted">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default HowItWorks
