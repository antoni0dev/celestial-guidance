const twinkleStars = [
  { top: '10%', left: '5%', delay: '0s' },
  { top: '20%', right: '10%', delay: '1s' },
  { top: '40%', left: '15%', delay: '0.5s' },
  { top: '15%', right: '25%', delay: '2s' },
  { top: '60%', left: '8%', delay: '1.5s' },
  { top: '30%', right: '5%', delay: '0.8s' },
  { top: '70%', right: '15%', delay: '2.5s' },
  { top: '50%', left: '25%', delay: '1.2s' },
] as const

const HeroSection = () => (
  <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
    <div className="pointer-events-none absolute inset-0 animate-float rounded-full bg-[radial-gradient(ellipse_at_center,_var(--color-celestial-200)_0%,_transparent_70%)] opacity-50" />

    {twinkleStars.map((star) => (
      <span
        key={`${star.top}-${star.delay}`}
        className="pointer-events-none absolute animate-twinkle text-2xl"
        style={{
          top: star.top,
          left: 'left' in star ? star.left : undefined,
          right: 'right' in star ? star.right : undefined,
          animationDelay: star.delay,
        }}
      >
        ✨
      </span>
    ))}

    <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
      <span className="glass inline-flex items-center gap-2 rounded-[var(--radius-pill)] px-6 py-2 text-sm font-semibold text-celestial-800">
        ✨ POWERED BY AETHERIA NEXUS™ AI ENGINE ✨
      </span>

      <h1 className="animate-text-glow text-4xl leading-tight text-text-heading-1 md:text-5xl lg:text-6xl">
        The Most Precise Spiritual Reading You&apos;ll Ever Get
      </h1>

      <p className="max-w-2xl text-lg leading-relaxed text-text-muted md:text-xl">
        Aetheria Nexus cross-references palm reading, astrology, tarot &amp;
        numerology into one deeply personal, multi-dimensional reading that
        reveals patterns no single method can see alone.
      </p>

      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <a
          href="#pricing"
          className="rounded-[var(--radius-pill)] bg-gradient-to-r from-celestial-500 to-celestial-400 px-8 py-3.5 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:brightness-110"
        >
          Get Your Reading
        </a>
        <a
          href="#how-it-works"
          className="glass rounded-[var(--radius-pill)] px-8 py-3.5 text-lg font-semibold text-celestial-800 transition-all hover:bg-surface-hover"
        >
          See How It Works
        </a>
      </div>

      <p className="text-sm text-text-muted">
        10,000+ Readings · 4.9★ Rating · Delivered to Your Email
      </p>
    </div>
  </section>
)

export default HeroSection
