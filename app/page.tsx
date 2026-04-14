import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Portfolio } from '@/components/sections/Portfolio'
import { Method } from '@/components/sections/Method'
import { Testimonials } from '@/components/sections/Testimonials'
import { CEO } from '@/components/sections/CEO'
import { ContactForms } from '@/components/sections/ContactForms'

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <Hero />
        <Services />
        <Portfolio />
        <Method />
        <Testimonials />
        <CEO />
        <ContactForms />
      </main>
      <Footer />
    </>
  )
}
