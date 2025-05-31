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
    </>
  )
}

export default About
