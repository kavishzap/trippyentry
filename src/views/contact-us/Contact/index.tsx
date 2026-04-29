import { PageMetaData } from '@/components'
import Hero from './components/Hero'
import FooterWithLinks from '../../hotels/Home/components/FooterWithLinks'
import TopNavBar from '../../hotels/Home/components/TopNavBar'

const Contact = () => {
  return (
    <div className="d-flex flex-column min-vh-100 trippy-contact-page-root">
      <PageMetaData title="Contact — Trippy Entry" />

      <TopNavBar />

      <main className="trippy-contact-flow flex-grow-1 d-flex flex-column">
        <div className="trippy-contact-flow__base" aria-hidden />
        <div className="trippy-contact-flow__grid" aria-hidden />
        <div className="trippy-contact-flow__scanlines" aria-hidden />
        <Hero />
      </main>

      <FooterWithLinks />

      <style
        dangerouslySetInnerHTML={{
          __html: `
      html, body {
        overflow-x: hidden !important;
      }

      .trippy-contact-page-root {
        min-height: 100dvh;
        min-height: 100svh;
        background: #000000;
      }

      main.trippy-contact-flow {
        overflow-x: hidden;
        width: 100%;
        position: relative;
        background-color: #000000;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }

      .trippy-contact-flow__base {
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        background:
          radial-gradient(ellipse 118% 82% at 50% -18%, rgba(212, 175, 55, 0.28), transparent 56%),
          radial-gradient(ellipse 88% 52% at 100% 32%, rgba(212, 175, 55, 0.1), transparent 50%),
          radial-gradient(ellipse 78% 56% at 0% 68%, rgba(232, 213, 163, 0.1), transparent 46%),
          linear-gradient(180deg, #000000 0%, #080602 40%, #030201 72%, #000000 100%);
      }

      .trippy-contact-flow__grid {
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        background-image:
          linear-gradient(rgba(212, 175, 55, 0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(232, 213, 163, 0.035) 1px, transparent 1px);
        background-size: 48px 48px;
        mask-image: linear-gradient(180deg, black 0%, rgba(0,0,0,0.5) 78%, transparent 100%);
        opacity: 0.5;
      }
      .trippy-contact-flow__scanlines {
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        background: repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 0, 0, 0.1) 2px,
          rgba(0, 0, 0, 0.1) 4px
        );
        opacity: 0.08;
      }

      main.trippy-contact-flow > *:not(.trippy-contact-flow__base):not(.trippy-contact-flow__grid):not(.trippy-contact-flow__scanlines) {
        position: relative;
        z-index: 1;
        flex: 1 0 auto;
        display: flex;
        flex-direction: column;
        min-height: 0;
      }
    `,
        }}
      />
    </div>
  )
}

export default Contact
