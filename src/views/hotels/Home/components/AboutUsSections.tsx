import { Col, Container, Row } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { TRIPPY_MARKETING_POSTER_URL } from '@/lib/marketingPosterUrl'

const ABOUT_HERO_IMG = TRIPPY_MARKETING_POSTER_URL

const ABOUT_STORY_INTRO = [
  `TrippyEntry began with a simple bet: people in Mauritius deserve a way to find live events and get through the door without the hassle. We built the app we wanted to use—clear listings, easy checkout, and a team that still cares about the show long after the lights go up.`,
  `From the first line of code to every night at the venue, we are focused on the fan, the staff on the ground, and the community around each event. Our story is still being written, one line-up, one city, and one “see you at the show” at a time.`,
] as const

const AboutPageHero = ({ embedOnHome }: { embedOnHome: boolean }) => {
  const titleClass = 'trippy-about-page-hero__title mb-0'
  const ourStoryTitle = (
    <>
      <span className="trippy-about-page-hero__title-line trippy-about-page-hero__title-line--main">Our</span>
      <span className="trippy-about-page-hero__title-line trippy-about-page-hero__title-line--accent">Story</span>
    </>
  )
  return (
  <section
    className="trippy-about-page-hero position-relative overflow-hidden"
    aria-label={embedOnHome ? 'About us' : undefined}
    style={
      {
        '--aph-poster-url': `url('${ABOUT_HERO_IMG}')`,
      } as React.CSSProperties
    }
  >
    <div className="trippy-about-page-hero__grid" aria-hidden />
    <div className="trippy-about-page-hero__scanlines" aria-hidden />
    <div className="trippy-about-page-hero__mb-scrim d-block d-lg-none" aria-hidden />

    <Container className="position-relative z-2 py-4 py-md-5">
      <Row className="align-items-center gy-4 gy-lg-5">
        <Col xs={12} lg={6} className="order-1 order-lg-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center text-lg-start trippy-about-page-hero__story-col"
          >
            {!embedOnHome ? (
            <h1 className={titleClass}>{ourStoryTitle}</h1>
            ) : (
            <h2 className={titleClass}>{ourStoryTitle}</h2>
            )}
            <div className="trippy-about-page-hero__body mt-3 mt-md-4">
              {ABOUT_STORY_INTRO.map((p) => (
                <p key={p} className="mb-0 trippy-about-page-hero__para">
                  {p}
                </p>
              ))}
            </div>
          </motion.div>
        </Col>

        <Col xs={12} lg={6} className="d-none d-lg-block order-2 order-lg-2">
          <motion.div
            className="trippy-about-page-hero__visual-wrap mx-auto ms-lg-auto me-lg-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="trippy-about-page-hero__visual-glow" aria-hidden />
            <img
              src={ABOUT_HERO_IMG}
              alt=""
              className="trippy-about-page-hero__visual-img"
              loading="eager"
              decoding="async"
            />
            <div className="trippy-about-page-hero__visual-frame" aria-hidden />
          </motion.div>
        </Col>
      </Row>
    </Container>

    <style>{`
      .trippy-about-page-hero {
        --aph-cyan: #d4af37;
        --aph-magenta: #e8d5a3;
        --aph-bronze: #6b5418;
        --aph-lime: #c9a227;
        color: #c9b896;
        background: transparent;
      }
      @media (max-width: 991.98px) {
        .trippy-about-page-hero {
          min-height: min(90vh, 48rem);
          background-color: #020101;
          background-image: var(--aph-poster-url, none);
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center 8%;
        }
      }
      @media (min-width: 992px) {
        .trippy-about-page-hero {
          min-height: 0;
        }
      }
      .trippy-about-page-hero__mb-scrim {
        position: absolute;
        inset: 0;
        z-index: 1;
        pointer-events: none;
        background: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0.2) 0%,
          rgba(0, 0, 0, 0.5) 28%,
          rgba(0, 0, 0, 0.75) 58%,
          rgba(0, 0, 0, 0.9) 100%
        );
      }
      @media (min-width: 992px) {
        .trippy-about-page-hero__mb-scrim {
          display: none !important;
        }
      }
      @media (max-width: 991.98px) {
        .trippy-about-page-hero__story-col {
          position: relative;
          padding: 1.1rem 1.05rem 1.2rem;
          border-radius: 0.9rem;
          background: linear-gradient(145deg, rgba(0, 0, 0, 0.58) 0%, rgba(2, 1, 0, 0.72) 100%);
          border: 1px solid rgba(212, 175, 55, 0.2);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.55);
          -webkit-backdrop-filter: blur(6px) saturate(1.05);
          backdrop-filter: blur(6px) saturate(1.05);
        }
        .trippy-about-page-hero__title {
          text-shadow: 0 0 1px rgba(0, 0, 0, 0.9);
        }
        .trippy-about-page-hero__title-line--main,
        .trippy-about-page-hero__title-line--accent {
          filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 20px rgba(0, 0, 0, 0.6));
        }
        .trippy-about-page-hero__para {
          color: rgba(255, 248, 230, 0.94) !important;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.65), 0 2px 12px rgba(0, 0, 0, 0.75);
        }
        @supports not (backdrop-filter: blur(1px)) {
          .trippy-about-page-hero__story-col {
            background: rgba(2, 1, 0, 0.86);
            border-color: rgba(212, 175, 55, 0.32);
          }
        }
      }
      .trippy-about-page-hero__grid {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(212, 175, 55, 0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(232, 213, 163, 0.035) 1px, transparent 1px);
        background-size: 48px 48px;
        mask-image: linear-gradient(180deg, black 0%, transparent 92%);
        pointer-events: none;
        opacity: 0.5;
      }
      .trippy-about-page-hero__scanlines {
        position: absolute;
        inset: 0;
        background: repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 0, 0, 0.1) 2px,
          rgba(0, 0, 0, 0.1) 4px
        );
        opacity: 0.1;
        pointer-events: none;
      }
      @media (max-width: 991.98px) {
        .trippy-about-page-hero__grid {
          mask-image: linear-gradient(180deg, black 0%, rgba(0, 0, 0, 0.55) 100%);
          opacity: 0.35;
        }
        .trippy-about-page-hero__scanlines {
          opacity: 0.06;
        }
      }
      .trippy-about-page-hero__title {
        font-family: "DM Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
        font-weight: 800;
        letter-spacing: -0.03em;
        line-height: 1.08;
      }
      .trippy-about-page-hero__title-line { display: block; }
      .trippy-about-page-hero__title-line--main {
        font-size: clamp(1.85rem, 4.5vw, 2.55rem);
        background: linear-gradient(135deg, #fff8ec 0%, var(--aph-cyan) 50%, var(--aph-bronze) 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
      .trippy-about-page-hero__title-line--accent {
        font-size: clamp(2rem, 5vw, 2.85rem);
        background: linear-gradient(90deg, var(--aph-magenta) 0%, var(--aph-lime) 55%, var(--aph-cyan) 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
      .trippy-about-page-hero__body {
        max-width: 34rem;
        margin-left: auto;
        margin-right: auto;
      }
      @media (min-width: 992px) {
        .trippy-about-page-hero__body {
          margin-left: 0;
        }
      }
      .trippy-about-page-hero__para {
        line-height: 1.7;
        font-size: clamp(0.92rem, 1.75vw, 1.05rem);
        font-weight: 500;
        color: rgba(220, 205, 160, 0.9);
      }
      .trippy-about-page-hero__para + .trippy-about-page-hero__para {
        margin-top: 1rem;
      }
      .trippy-about-page-hero__visual-wrap {
        position: relative;
        display: block;
        width: fit-content;
        max-width: min(100%, 420px);
        margin-inline: auto;
        line-height: 0;
      }
      @media (min-width: 992px) {
        .trippy-about-page-hero__visual-wrap {
          margin-inline: 0;
          max-width: 100%;
        }
      }
      .trippy-about-page-hero__visual-glow {
        position: absolute;
        inset: -8%;
        background: radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.18), transparent 55%),
          radial-gradient(circle at 70% 30%, rgba(232, 213, 163, 0.14), transparent 50%);
        opacity: 0.7;
        pointer-events: none;
        z-index: 0;
      }
      .trippy-about-page-hero__visual-img {
        position: relative;
        z-index: 1;
        display: block;
        width: auto;
        max-width: 100%;
        height: auto;
        max-height: min(52vh, 480px);
        border-radius: 1rem;
        box-shadow: 0 16px 48px rgba(0, 0, 0, 0.45);
      }
      @media (min-width: 992px) {
        .trippy-about-page-hero__visual-img {
          max-height: min(70vh, 560px);
        }
      }
      .trippy-about-page-hero__visual-frame {
        position: absolute;
        inset: 0;
        z-index: 2;
        border-radius: 1rem;
        pointer-events: none;
        box-shadow:
          inset 0 0 0 1px rgba(212, 175, 55, 0.4),
          inset 0 0 40px rgba(212, 175, 55, 0.1),
          0 0 0 1px rgba(232, 213, 163, 0.18);
      }
    `}</style>
  </section>
  )
}

type AboutUsSectionsProps = {
  /** When true (default), hero uses h2 for correct outline on the home page. */
  embedOnHome?: boolean
}

const AboutUsSections = ({ embedOnHome = true }: AboutUsSectionsProps) => {
  return (
  <>
    <AboutPageHero embedOnHome={embedOnHome} />
  </>
  )
}

export default AboutUsSections
