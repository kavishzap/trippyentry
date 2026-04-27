import { Col, Container, Row } from 'react-bootstrap'
import { motion } from 'framer-motion'

const ABOUT_STORY_IMG = encodeURI('/ChatGPT Image Apr 28, 2026, 01_41_28 AM.png')

const storyParagraphs = [
  'TrippyEntry started with one vision — to transform the way people enter and experience events. Not just booking tickets, but stepping into a whole new world of sound, lights, and energy.',
  "Built for the new generation of ravers, explorers, and experience seekers, TrippyEntry makes discovering and accessing events effortless. Whether you're deep in the scene or just getting started, everything you need is just a few taps away.",
  'We are a team of creators, developers, and nightlife enthusiasts who understand the pulse of Mauritius — the music, the culture, the underground energy. That’s why we built a platform that goes beyond traditional ticketing and brings a fully immersive digital experience to life.',
  'From high-energy raves and concerts to exclusive underground gatherings, TrippyEntry connects people to moments that matter.',
  'Because we believe the best nights aren’t just attended — they’re experienced.',
] as const

const OurStory = () => (
  <section className="trippy-about-story position-relative overflow-hidden">
    <div className="trippy-about-story__scanlines" aria-hidden />

    <Container className="position-relative z-1 py-4 py-lg-5">
      <Row className="align-items-start gy-4 gy-lg-5">
        <Col lg={6} className="order-2 order-lg-1">
          <motion.div
            className="trippy-about-story__visual-wrap mx-auto mx-lg-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="trippy-about-story__visual-glow" aria-hidden />
            <img
              src={ABOUT_STORY_IMG}
              alt=""
              className="trippy-about-story__img"
              loading="lazy"
              decoding="async"
            />
            <div className="trippy-about-story__frame" aria-hidden />
          </motion.div>
        </Col>

        <Col lg={6} className="order-1 order-lg-2">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-center text-lg-start"
          >
            <h2 className="trippy-about-story__heading mb-2">
              <span className="trippy-about-story__heading-line trippy-about-story__heading-line--main">Our Story</span>
            </h2>
            <p className="trippy-about-story__subhead mb-4 mb-lg-4">How TrippyEntry Was Born</p>

            <div className="trippy-about-story__body text-start">
              {storyParagraphs.map((text, i) => (
                <p key={i} className={i === storyParagraphs.length - 1 ? 'trippy-about-story__pull mb-0' : 'mb-3 mb-lg-4'}>
                  {text}
                </p>
              ))}
            </div>
          </motion.div>
        </Col>
      </Row>
    </Container>

    <style>{`
      .trippy-about-story {
        --st-cyan: #2ef2ff;
        --st-magenta: #ff2ee6;
        --st-violet: #a855ff;
        color: #e8e4ff;
        background: transparent;
      }
      .trippy-about-story__scanlines {
        position: absolute;
        inset: 0;
        background: repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 0, 0, 0.12) 2px,
          rgba(0, 0, 0, 0.12) 4px
        );
        opacity: 0.14;
        pointer-events: none;
      }
      .trippy-about-story__heading {
        font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
        font-weight: 800;
        letter-spacing: -0.03em;
        line-height: 1.1;
      }
      .trippy-about-story__heading-line--main {
        font-size: clamp(1.85rem, 4.5vw, 2.65rem);
        background: linear-gradient(135deg, #fff 0%, var(--st-cyan) 45%, var(--st-violet) 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
      .trippy-about-story__subhead {
        font-size: clamp(1rem, 2.2vw, 1.2rem);
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: rgba(46, 242, 255, 0.92);
        border-left: 3px solid rgba(255, 46, 230, 0.65);
        padding-left: 1rem;
        display: inline-block;
        text-align: left;
      }
      @media (min-width: 992px) {
        .trippy-about-story__subhead {
          display: block;
          border-left: 0;
          padding-left: 0;
          border-bottom: 2px solid rgba(46, 242, 255, 0.35);
          padding-bottom: 0.75rem;
        }
      }
      .trippy-about-story__body p {
        font-size: clamp(0.9rem, 1.55vw, 1rem);
        line-height: 1.7;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.92);
        text-shadow:
          0 0 1px rgba(255, 255, 255, 0.4),
          0 0 18px rgba(46, 242, 255, 0.12);
      }
      .trippy-about-story__pull {
        font-size: clamp(1rem, 1.8vw, 1.08rem) !important;
        font-weight: 700 !important;
        font-style: italic;
        color: #fff !important;
        padding: 1rem 1.15rem;
        border-radius: 0.75rem;
        border: 1px solid rgba(46, 242, 255, 0.35);
        background: linear-gradient(135deg, rgba(46, 242, 255, 0.08), rgba(255, 46, 230, 0.06));
        box-shadow: inset 0 0 0 1px rgba(255, 46, 230, 0.12), 0 0 28px rgba(168, 85, 255, 0.12);
      }
      .trippy-about-story__visual-wrap {
        position: relative;
        width: 100%;
        max-width: 100%;
      }
      .trippy-about-story__visual-glow {
        position: absolute;
        inset: -8%;
        background: radial-gradient(circle at 50% 50%, rgba(46, 242, 255, 0.18), transparent 55%),
          radial-gradient(circle at 70% 30%, rgba(255, 46, 230, 0.14), transparent 50%);
        opacity: 0.7;
        pointer-events: none;
        z-index: 0;
      }
      /* Full image: natural aspect ratio, never cropped (scales to column width) */
      .trippy-about-story__img {
        position: relative;
        z-index: 1;
        display: block;
        width: 100%;
        max-width: 100%;
        height: auto;
        object-fit: contain;
        object-position: center;
        border-radius: 1rem;
        box-shadow: 0 16px 48px rgba(0, 0, 0, 0.45);
      }
      .trippy-about-story__frame {
        position: absolute;
        inset: 0;
        z-index: 2;
        border-radius: 1rem;
        pointer-events: none;
        box-shadow:
          inset 0 0 0 1px rgba(46, 242, 255, 0.4),
          inset 0 0 40px rgba(168, 85, 255, 0.1),
          0 0 0 1px rgba(255, 46, 230, 0.18);
      }
    `}</style>
  </section>
)

const AboutPageContent = () => <OurStory />

export default AboutPageContent
