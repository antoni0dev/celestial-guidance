'use client'

import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact Us', href: 'mailto:celestialguidance.ai@gmail.com' },
] as const

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2 text-xl font-bold">
          <span>✨</span>
          <span className="bg-gradient-to-r from-celestial-500 to-celestial-600 bg-clip-text text-transparent">
            Celestial Guidance
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-body transition-colors hover:text-celestial-500"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#pricing"
            className="rounded-[var(--radius-pill)] bg-gradient-to-r from-celestial-500 to-celestial-400 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"
          >
            Book Now
          </a>
        </div>

        <button
          onClick={toggleMobileMenu}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-6 bg-celestial-800 transition-all duration-300 ${
              isMobileMenuOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-celestial-800 transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-celestial-800 transition-all duration-300 ${
              isMobileMenuOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="glass animate-slide-down border-t border-border md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="text-text-body transition-colors hover:text-celestial-500"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#pricing"
              onClick={closeMobileMenu}
              className="mt-2 rounded-[var(--radius-pill)] bg-gradient-to-r from-celestial-500 to-celestial-400 px-6 py-2.5 text-center text-sm font-semibold text-white shadow-md"
            >
              Book Now
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
