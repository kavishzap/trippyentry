import { Col, Container, Row } from 'react-bootstrap'
import { motion } from 'framer-motion'

const WHY_SPHERE_SRC = '/1.png'

const features = [
  {
    title: 'Instant Entry',
    body: 'Skip the hassle. Secure your spot in seconds and get ready for the night.',
  },
  {
    title: 'Curated Experiences',
    body: 'Only the hottest raves, concerts, and underground events — handpicked for real vibes.',
  },
  {
    title: 'Seamless Access',
    body: 'Fast check-ins, smooth flows, no stress — just show up and enjoy.',
  },
  {
    title: 'Always On Support',
    body: "Day or night, we've got you — so nothing stops your experience.",
  },
] as const

const FeaturedHoliday = () => {
  return (
    <section className="trippy-why position-relative overflow-hidden">
      <div className="trippy-why__aurora" aria-hidden />
      <div className="trippy-why__grid" aria-hidden />
      <div className="trippy-why__scanlines" aria-hidden />

      <Container className="trippy-why__inner position-relative z-1 py-3 py-md-4 py-lg-5">
        <Row className="trippy-why__row align-items-center g-2 g-md-3 g-lg-5">
          <Col xs={12} lg={6} className="trippy-why__text-col order-1 order-lg-2">
            <motion.div
              className="text-lg-end text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="trippy-why__title mb-2 mb-lg-4">
                <span className="trippy-why__title-line trippy-why__title-line--main">Why</span>
                <span className="trippy-why__title-line trippy-why__title-line--accent">TrippyEntry?</span>
              </h2>

              <div className="trippy-why__feats pt-1 pt-lg-2 border-top border-secondary border-opacity-25">
                {features.map((f) => (
                  <div key={f.title} className="trippy-why__feat mb-2 mb-lg-4">
                    <div className="trippy-why__feat-title">{f.title}</div>
                    <p className="trippy-why__feat-body mb-0">{f.body}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </Col>

          <Col xs={12} lg={6} className="trippy-why__neon-col d-flex justify-content-center order-2 order-lg-1">
            <motion.div
              className="trippy-why__visual mx-auto"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={WHY_SPHERE_SRC}
                alt=""
                className="trippy-why__visual-img"
                width={800}
                height={800}
                decoding="async"
              />
            </motion.div>
          </Col>
        </Row>
      </Container>

      <style>{`
        .trippy-why {
          --neon-cyan: #2ef2ff;
          --neon-magenta: #ff2ee6;
          --neon-violet: #a855ff;
          --neon-lime: #c4ff0d;
          color: #e8e4ff;
          background: transparent;
        }

        .trippy-why__aurora {
          position: absolute;
          inset: -40% -20%;
          background: conic-gradient(from 120deg at 50% 50%,
            rgba(46, 242, 255, 0.12),
            rgba(255, 46, 230, 0.1),
            rgba(168, 85, 255, 0.14),
            rgba(196, 255, 13, 0.06),
            rgba(46, 242, 255, 0.12));
          animation: twhy-aurora-spin 22s linear infinite;
          opacity: 0.5;
          filter: blur(56px);
          pointer-events: none;
        }

        @keyframes twhy-aurora-spin {
          to { transform: rotate(360deg); }
        }

        .trippy-why__grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(46, 242, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 46, 230, 0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: linear-gradient(180deg, black 0%, transparent 88%);
          pointer-events: none;
        }

        .trippy-why__scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.12) 2px,
            rgba(0, 0, 0, 0.12) 4px
          );
          opacity: 0.22;
          pointer-events: none;
        }

        .trippy-why__inner {
          z-index: 2;
        }

        .trippy-why__title {
          font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -0.03em;
          overflow: visible;
        }

        .trippy-why__title-line {
          display: block;
          line-height: 1.1;
          overflow: visible;
        }

        .trippy-why__title-line--main {
          font-size: clamp(2.25rem, 6vw, 3.5rem);
          background: linear-gradient(135deg, #fff 0%, var(--neon-cyan) 45%, var(--neon-violet) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 0 40px rgba(46, 242, 255, 0.35);
          filter: drop-shadow(0 0 2px rgba(46, 242, 255, 0.5));
        }

        .trippy-why__title-line--accent {
          font-size: clamp(2.4rem, 6.5vw, 3.75rem);
          background: linear-gradient(90deg, var(--neon-magenta), var(--neon-lime));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: twhy-title-shimmer 6s ease-in-out infinite alternate;
          padding-bottom: 0.22em;
        }

        @keyframes twhy-title-shimmer {
          0% { filter: hue-rotate(0deg) brightness(1); }
          100% { filter: hue-rotate(25deg) brightness(1.08); }
        }

        .trippy-why__feat-title {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(46, 242, 255, 0.9);
          margin-bottom: 0.35rem;
        }

        .trippy-why__feat-body {
          font-size: clamp(0.8125rem, 1.65vw, 0.9375rem);
          line-height: 1.65;
          font-weight: 500;
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff;
          text-shadow:
            0 0 0.5px #fff,
            0 0 1px rgba(255, 255, 255, 0.95),
            0 0 18px rgba(46, 242, 255, 0.45),
            0 0 36px rgba(46, 242, 255, 0.28),
            0 0 52px rgba(255, 46, 230, 0.2);
          filter: drop-shadow(0 0 12px rgba(46, 242, 255, 0.35))
            drop-shadow(0 0 20px rgba(255, 46, 230, 0.18));
        }

        .trippy-why__feat:last-child {
          margin-bottom: 0 !important;
        }

        /* Portal art: fill column / viewport — asset only */
        .trippy-why__visual {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 100%;
        }

        .trippy-why__visual-img {
          width: 100%;
          max-width: 100%;
          height: auto;
          max-height: min(72vh, 720px);
          display: block;
          object-fit: contain;
          object-position: center;
        }

        /* Mobile / tablet: neon sphere top-left behind copy (same grid trick as hero) */
        @media (max-width: 991.98px) {
          .trippy-why .trippy-why__scanlines {
            opacity: 0.1;
          }

          .trippy-why .trippy-why__row {
            display: grid !important;
            grid-template-columns: 1fr;
            grid-template-rows: minmax(0, auto);
          }

          .trippy-why .trippy-why__text-col,
          .trippy-why .trippy-why__neon-col {
            grid-column: 1;
            grid-row: 1;
          }

          .trippy-why .trippy-why__text-col {
            position: relative;
            z-index: 2;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          .trippy-why .trippy-why__neon-col {
            z-index: 1;
            align-items: flex-start;
            align-self: start;
            justify-self: center;
            justify-content: center;
            width: 100%;
            max-width: 100%;
            padding-top: 0.25rem;
            pointer-events: none;
          }

          .trippy-why .trippy-why__visual {
            width: min(calc(100vw - 1.25rem), 540px);
            max-width: 100%;
            margin-left: auto;
            margin-right: auto;
            opacity: 0.44;
          }

          .trippy-why .trippy-why__visual-img {
            max-height: min(62vh, 560px);
            opacity: 0.78;
          }

          .trippy-why .trippy-why__title-line--main {
            text-shadow: none;
            filter: none;
          }

          .trippy-why .trippy-why__title-line--accent {
            text-shadow: none;
            filter: none !important;
            animation: none !important;
          }

          .trippy-why .trippy-why__feat-body {
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff;
            text-shadow:
              0 0 0.5px #fff,
              0 0 1px rgba(255, 255, 255, 0.95),
              0 0 14px rgba(46, 242, 255, 0.48),
              0 0 30px rgba(46, 242, 255, 0.28),
              0 0 44px rgba(255, 46, 230, 0.18);
            filter: drop-shadow(0 0 10px rgba(46, 242, 255, 0.32))
              drop-shadow(0 0 16px rgba(255, 46, 230, 0.16));
          }
        }

        @media (min-width: 992px) {
          .trippy-why .trippy-why__neon-col {
            pointer-events: auto;
            padding-top: 0;
          }

          .trippy-why .trippy-why__visual {
            opacity: 1;
          }

          .trippy-why .trippy-why__visual-img {
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .trippy-why__aurora,
          .trippy-why__title-line--accent {
            animation: none !important;
          }
          .trippy-why__feat-body {
            filter: none;
            text-shadow: none;
          }
        }
      `}</style>
    </section>
  )
}

export default FeaturedHoliday
