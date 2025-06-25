import { PageMetaData } from '@/components'
// import ContactForm from './components/ContactForm'
import FooterWithLinks from '../../hotels/Home/components/FooterWithLinks'
import Hero from './components/Hero'
import TopNavBar11 from '../../hotels/Home/components/TopNavBar'

const Contact = () => {
  return (
    <>
      <PageMetaData title="Contact Us" />

      <TopNavBar11 />

      <main>
        <Hero />
        {/* <div className='mb-5'>
          <ContactForm />
        </div> */}


      </main>

      <FooterWithLinks />
    </>
  )
}

export default Contact
