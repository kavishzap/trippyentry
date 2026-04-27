import { Col, Container, Row } from 'react-bootstrap'
import { motion } from 'framer-motion'

const HERO_ART_SRC = '/2.png'

const Hero = () => {
  return (
    <section className="trippy-hero position-relative overflow-hidden">
      <div className="trippy-hero__aurora" aria-hidden />
      <div className="trippy-hero__grid" aria-hidden />
      <div className="trippy-hero__scanlines" aria-hidden />

      <Container className="trippy-hero__inner position-relative z-1 pb-3 pb-lg-5">
        <Row className="trippy-hero__row align-items-center g-3 g-lg-5">
          <Col xs={12} lg={6} className="trippy-hero__text-col">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="trippy-hero__eyebrow d-inline-flex align-items-center gap-2 mb-2 mb-lg-3">
                <span className="trippy-hero__pulse" aria-hidden />
                <span>Live across Mauritius</span>
              </div>

              <h1 className="trippy-hero__title mb-2 mb-lg-4">
                <span className="trippy-hero__title-line trippy-hero__title-line--main">Trippy</span>
                <span className="trippy-hero__title-line trippy-hero__title-line--accent">Events</span>
              </h1>

              <p className="trippy-hero__lead text-white mb-3 mb-lg-4">
                Step into the glow — the hottest concerts, raves, and live shows on the island, curated for your energy
                and your budget. One portal. Infinite nights.
              </p>

              <div className="trippy-hero__pills d-flex flex-wrap gap-2 mb-0">
                <span className="trippy-pill">Feel the Bass</span>
                <span className="trippy-pill trippy-pill--alt">Chase the Lights</span>
                <span className="trippy-pill">Live the Night</span>
              </div>
            </motion.div>
          </Col>

          <Col xs={12} lg={6} className="trippy-hero__neon-col">
            <motion.div
              className="trippy-hero__visual mx-auto"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={HERO_ART_SRC}
                alt=""
                className="trippy-hero__visual-img"
                width={800}
                height={800}
                decoding="async"
              />
            </motion.div>
          </Col>
        </Row>
      </Container>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .trippy-hero .trippy-hero__inner.container {
            padding-top: 0;
          }
          @media (min-width: 576px) and (max-width: 991.98px) {
            .trippy-hero .trippy-hero__inner.container {
              padding-top: 0.25rem;
            }
          }
          @media (min-width: 992px) {
            .trippy-hero .trippy-hero__inner.container {
              padding-top: 3rem;
            }
          }

          .trippy-hero {
            --neon-cyan: #2ef2ff;
            --neon-magenta: #ff2ee6;
            --neon-violet: #a855ff;
            --neon-lime: #c4ff0d;
            --hero-bg: #05040d;
            --hero-bg-mid: #0a0620;
            min-height: clamp(380px, 62vh, 720px);
            background: transparent;
            color: #e8e4ff;
          }

          .trippy-hero__aurora {
            position: absolute;
            inset: -40% -20%;
            background: conic-gradient(from 120deg at 50% 50%,
              rgba(46, 242, 255, 0.15),
              rgba(255, 46, 230, 0.12),
              rgba(168, 85, 255, 0.18),
              rgba(196, 255, 13, 0.08),
              rgba(46, 242, 255, 0.15));
            animation: trippy-aurora-spin 22s linear infinite;
            opacity: 0.55;
            filter: blur(60px);
            pointer-events: none;
          }
          @media (max-width: 991.98px) {
            .trippy-hero__aurora {
              opacity: 0.32;
              filter: blur(36px);
            }
            .trippy-hero__scanlines {
              opacity: 0.06;
            }
          }

          @keyframes trippy-aurora-spin {
            to { transform: rotate(360deg); }
          }

          .trippy-hero__grid {
            position: absolute;
            inset: 0;
            background-image:
              linear-gradient(rgba(46, 242, 255, 0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 46, 230, 0.04) 1px, transparent 1px);
            background-size: 48px 48px;
            mask-image: linear-gradient(180deg, black 0%, transparent 85%);
            pointer-events: none;
          }

          .trippy-hero__scanlines {
            position: absolute;
            inset: 0;
            background: repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.12) 2px,
              rgba(0, 0, 0, 0.12) 4px
            );
            opacity: 0.25;
            pointer-events: none;
          }

          .trippy-hero__eyebrow {
            font-size: 0.75rem;
            letter-spacing: 0.28em;
            text-transform: uppercase;
            color: rgba(232, 228, 255, 0.72);
            font-weight: 600;
          }

          .trippy-hero__pulse {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--neon-magenta);
            box-shadow: 0 0 12px var(--neon-magenta), 0 0 24px var(--neon-cyan);
            animation: trippy-pulse 2s ease-in-out infinite;
          }

          @keyframes trippy-pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.65; transform: scale(0.85); }
          }

          .trippy-hero__title {
            font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
            font-weight: 800;
            line-height: 0.95;
            letter-spacing: -0.03em;
          }

          .trippy-hero__title-line {
            display: block;
          }

          .trippy-hero__title-line--main {
            font-size: clamp(2.75rem, 8vw, 4.25rem);
            background: linear-gradient(135deg, #fff 0%, var(--neon-cyan) 45%, var(--neon-violet) 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            text-shadow: 0 0 40px rgba(46, 242, 255, 0.35);
            filter: drop-shadow(0 0 2px rgba(46, 242, 255, 0.5));
          }

          .trippy-hero__title-line--accent {
            font-size: clamp(3rem, 9vw, 4.75rem);
            background: linear-gradient(90deg, var(--neon-magenta), var(--neon-lime));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: trippy-title-shimmer 6s ease-in-out infinite alternate;
          }

          @keyframes trippy-title-shimmer {
            0% { filter: hue-rotate(0deg) brightness(1); }
            100% { filter: hue-rotate(25deg) brightness(1.08); }
          }

          .trippy-hero__lead {
            font-size: clamp(1rem, 2.2vw, 1.15rem);
            line-height: 1.65;
            font-weight: 500;
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff;
            max-width: 36rem;
            /* Crisp bright core + outer neon (glow sits behind the white) */
            text-shadow:
              0 0 0.5px #fff,
              0 0 1px rgba(255, 255, 255, 0.95),
              0 0 18px rgba(46, 242, 255, 0.45),
              0 0 36px rgba(46, 242, 255, 0.28),
              0 0 52px rgba(255, 46, 230, 0.2);
            filter: drop-shadow(0 0 12px rgba(46, 242, 255, 0.35))
              drop-shadow(0 0 20px rgba(255, 46, 230, 0.18));
          }

          /* Mobile / tablet: neon sits behind headline + lead (stacked grid) */
          @media (max-width: 991.98px) {
            .trippy-hero__row {
              display: grid;
              grid-template-columns: 1fr;
              grid-template-rows: 1fr;
            }
            .trippy-hero__text-col,
            .trippy-hero__neon-col {
              grid-column: 1;
              grid-row: 1;
            }
            .trippy-hero__text-col {
              position: relative;
              z-index: 2;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            .trippy-hero__neon-col {
              z-index: 1;
              display: flex;
              justify-content: center;
              align-items: flex-start;
              align-self: start;
              justify-self: center;
              width: 100%;
              padding-top: 0.75rem;
              pointer-events: none;
            }
            .trippy-hero__visual {
              width: min(calc(100vw - 1.25rem), 380px);
              max-width: 100%;
              opacity: 0.45;
            }
            .trippy-hero__visual-img {
              max-height: min(42vh, 400px);
              opacity: 0.75;
            }
            /* Crisp type: heavy shadows read as blur on small screens */
            .trippy-hero__title-line--main {
              text-shadow: none;
              filter: none;
            }
            .trippy-hero__title-line--accent {
              text-shadow: none;
              filter: none !important;
              animation: none !important;
            }
            .trippy-hero__lead {
              color: #ffffff !important;
              -webkit-text-fill-color: #ffffff;
              font-weight: 500;
              text-shadow:
                0 0 0.5px #fff,
                0 0 1px rgba(255, 255, 255, 0.95),
                0 0 14px rgba(46, 242, 255, 0.48),
                0 0 30px rgba(46, 242, 255, 0.28),
                0 0 44px rgba(255, 46, 230, 0.18);
              filter: drop-shadow(0 0 10px rgba(46, 242, 255, 0.32))
                drop-shadow(0 0 16px rgba(255, 46, 230, 0.16));
            }
            .trippy-hero__eyebrow {
              text-shadow: none;
            }
            .trippy-pill,
            .trippy-pill--alt {
              backdrop-filter: none;
              -webkit-backdrop-filter: none;
            }
          }

          @media (min-width: 992px) {
            .trippy-hero__neon-col {
              pointer-events: auto;
              padding-top: 0;
            }
            .trippy-hero__visual {
              opacity: 1;
              max-width: min(100%, 440px);
            }
            .trippy-hero__visual-img {
              opacity: 1;
            }
          }

          .trippy-pill {
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 0.04em;
            padding: 0.45rem 0.9rem;
            border-radius: 999px;
            border: 1px solid rgba(46, 242, 255, 0.35);
            color: rgba(200, 255, 255, 0.95);
            background: rgba(10, 8, 28, 0.65);
            box-shadow: 0 0 20px rgba(46, 242, 255, 0.08), inset 0 0 20px rgba(46, 242, 255, 0.04);
            backdrop-filter: blur(8px);
          }

          .trippy-pill--alt {
            border-color: rgba(255, 46, 230, 0.4);
            color: rgba(255, 210, 250, 0.95);
            box-shadow: 0 0 20px rgba(255, 46, 230, 0.1), inset 0 0 18px rgba(255, 46, 230, 0.05);
          }

          /* Hero art: full column, PNG only — no rings / glow / motion on image */
          .trippy-hero__visual {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            max-width: 100%;
          }

          .trippy-hero__visual-img {
            width: 100%;
            max-width: 100%;
            height: auto;
            max-height: min(52vh, 520px);
            display: block;
            object-fit: contain;
            object-position: center;
          }

          @media (prefers-reduced-motion: reduce) {
            .trippy-hero__aurora {
              animation: none !important;
            }
          }

          @media (max-width: 768px) {
            .trippy-hero {
              min-height: auto;
              padding-bottom: 1.5rem;
            }
          }
        `,
        }}
      />
    </section>
  )
}

export default Hero
