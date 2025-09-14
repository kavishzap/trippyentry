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
      </main>

      <FooterWithLinks />

      <style
        dangerouslySetInnerHTML={{
          __html: `
      html, body {
        overflow-x: hidden !important;
      }

      main {
        overflow-x: hidden;
        width: 100%;
        position: relative;
      }
    `,
        }}
      />

    </>
  )
}

export default Contact
