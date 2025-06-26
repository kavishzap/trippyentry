import { PageMetaData } from '@/components'
import FooterWithLinks from '../../hotels/Home/components/FooterWithLinks'
import Hero from './components/Hero'
import OurStory from './components/OurStory'
import OurTeam from './components/OurTeam'
import TopNavBar from '../../hotels/Home/components/TopNavBar'

const About = () => {
  return (
    <>
      <PageMetaData title="About us" />

      <TopNavBar />

      <main>
        <Hero />

        <OurStory />
        <OurTeam />
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

export default About
