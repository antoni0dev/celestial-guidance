import Navbar from '@/modules/landing/Navbar'
import HeroSection from '@/modules/landing/HeroSection'
import HowItWorks from '@/modules/landing/HowItWorks'
import ServicesSection from '@/modules/landing/ServicesSection'
import TestimonialsSection from '@/modules/landing/TestimonialsSection'
import PricingSection from '@/modules/landing/PricingSection'
import FaqSection from '@/modules/landing/FaqSection'
import Footer from '@/modules/landing/Footer'

const HomePage = () => (
  <>
    <Navbar />
    <main>
      <HeroSection />
      <HowItWorks />
      <ServicesSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
    </main>
    <Footer />
  </>
)

export default HomePage
