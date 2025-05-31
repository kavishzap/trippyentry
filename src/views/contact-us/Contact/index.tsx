import { PageMetaData } from '@/components'
import ContactForm from './components/ContactForm'
import FooterWithLinks from './components/FooterWithLinks'
import Hero from './components/Hero'
import TopNavBar11 from './components/TopNavBar11'

const Contact = () => {
  return (
    <>
      <PageMetaData title="Contact Us" />

      <TopNavBar11 />

      <main>
        <Hero />
        <ContactForm />
      
      </main>

      <FooterWithLinks />
    </>
  )
}

export default Contact
