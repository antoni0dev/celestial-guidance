const footerLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: 'mailto:celestialguidance.ai@gmail.com' },
] as const

const contactEmail = 'celestialguidance.ai@gmail.com'

const Footer = () => (
  <footer className="border-t border-border px-6 py-12">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-8">
      <a href="#" className="flex items-center gap-2 text-xl font-bold">
        <span>✨</span>
        <span className="bg-gradient-to-r from-celestial-500 to-celestial-600 bg-clip-text text-transparent">
          Celestial Guidance
        </span>
      </a>

      <nav className="flex flex-wrap justify-center gap-6">
        {footerLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm text-text-muted transition-colors hover:text-celestial-500"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a
        href={`mailto:${contactEmail}`}
        className="text-sm text-text-muted transition-colors hover:text-celestial-500"
      >
        {contactEmail}
      </a>

      <div className="flex flex-col items-center gap-2 text-center text-xs text-text-muted">
        <p>&copy; 2026 Celestial Guidance. All rights reserved.</p>
        <p>Powered by Aetheria Nexus™ AI Engine</p>
      </div>
    </div>
  </footer>
)

export default Footer
