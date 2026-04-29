import { PageMetaData } from '@/components'
import FooterWithLinks from '../../hotels/Home/components/FooterWithLinks'
import AboutPageContent from './components/Hero'
import TopNavBar from '../../hotels/Home/components/TopNavBar'

const About = () => {
  return (
    <>
      <PageMetaData title="About — Trippy Entry" />
      <TopNavBar />

      <main className="trippy-about-flow">
        <div className="trippy-about-flow__base" aria-hidden />
        <AboutPageContent />
      </main>

      <FooterWithLinks />

      <style
        dangerouslySetInnerHTML={{
          __html: `
      html, body {
        overflow-x: hidden !important;
      }

      main.trippy-about-flow {
        overflow-x: hidden;
        width: 100%;
        position: relative;
        background-color: #000000;
      }

      .trippy-about-flow__base {
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        background:
          radial-gradient(ellipse 118% 82% at 50% -18%, rgba(212, 175, 55, 0.28), transparent 56%),
          radial-gradient(ellipse 88% 52% at 100% 38%, rgba(212, 175, 55, 0.1), transparent 50%),
          radial-gradient(ellipse 78% 56% at 0% 72%, rgba(232, 213, 163, 0.1), transparent 46%),
          linear-gradient(180deg, #000000 0%, #080602 40%, #030201 72%, #000000 100%);
      }

      main.trippy-about-flow > *:not(.trippy-about-flow__base) {
        position: relative;
        z-index: 1;
      }
    `,
        }}
      />
    </>
  )
}

export default About
