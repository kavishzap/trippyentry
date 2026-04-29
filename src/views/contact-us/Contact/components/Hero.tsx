import { Col, Container, Row } from 'react-bootstrap'
import { BsEnvelope, BsHeadset, BsInboxesFill, BsPhone } from 'react-icons/bs'
import { motion } from 'framer-motion'

import { TRIPPY_MARKETING_POSTER_URL } from '@/lib/marketingPosterUrl'

const CONTACT_HERO_IMG = TRIPPY_MARKETING_POSTER_URL

const ContactHero = () => {
  return (
    <section className="trippy-contact-hero position-relative overflow-hidden">
      <div className="trippy-contact-hero__aurora" aria-hidden />
      <div className="trippy-contact-hero__grid" aria-hidden />
      <div className="trippy-contact-hero__scanlines" aria-hidden />

      <Container className="position-relative z-1 py-4 py-md-5 pb-lg-4">
        <Row className="align-items-center gy-4 gy-lg-5">
          <Col lg={6} className="order-2 order-lg-1">
            <motion.div
              className="trippy-contact-hero__visual-wrap mx-auto mx-lg-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="trippy-contact-hero__visual-glow" aria-hidden />
              <img
                src={CONTACT_HERO_IMG}
                alt=""
                className="trippy-contact-hero__visual-img"
                loading="lazy"
                decoding="async"
              />
              <div className="trippy-contact-hero__visual-frame" aria-hidden />
            </motion.div>
          </Col>

          <Col lg={6} className="order-1 order-lg-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-center text-lg-start"
            >
              <div className="trippy-contact-hero__eyebrow d-inline-flex align-items-center gap-2 mb-3">
                <span className="trippy-contact-hero__pulse" aria-hidden />
                <span>Open channel</span>
              </div>
              <h1 className="trippy-contact-hero__title mb-0">
                <span className="trippy-contact-hero__title-line trippy-contact-hero__title-line--main">Enter the</span>
                <span className="trippy-contact-hero__title-line trippy-contact-hero__title-line--accent">Connection</span>
              </h1>
              <p className="trippy-contact-hero__lead mx-auto mx-lg-0 mt-3 mb-0">
                Whether you need support or just want to tap in, we&apos;re here to keep your journey smooth and
                unforgettable.
              </p>
            </motion.div>

            <motion.div
              className="trippy-contact-channels mt-4 mt-lg-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-24px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href="tel:+23055063356" className="trippy-contact-channel trippy-contact-channel--phone">
                <span className="trippy-contact-channel__glyph" aria-hidden>
                  <BsHeadset />
                </span>
                <span className="trippy-contact-channel__body">
                  <span className="trippy-contact-channel__kicker">Call</span>
                  <span className="trippy-contact-channel__value">
                    <BsPhone className="trippy-contact-channel__value-icon" aria-hidden />
                    +230 5506 3356
                  </span>
                </span>
                <span className="trippy-contact-channel__arrow" aria-hidden />
              </a>

              <a href="mailto:zeko.mru@gmail.com" className="trippy-contact-channel trippy-contact-channel--mail">
                <span className="trippy-contact-channel__glyph" aria-hidden>
                  <BsInboxesFill />
                </span>
                <span className="trippy-contact-channel__body">
                  <span className="trippy-contact-channel__kicker">Email</span>
                  <span className="trippy-contact-channel__value">
                    <BsEnvelope className="trippy-contact-channel__value-icon" aria-hidden />
                    zeko.mru@gmail.com
                  </span>
                </span>
                <span className="trippy-contact-channel__arrow" aria-hidden />
              </a>
            </motion.div>
          </Col>
        </Row>
      </Container>

      <style>{`
        .trippy-contact-hero {
          --tc-cyan: #d4af37;
          --tc-magenta: #e8d5a3;
          --tc-bronze: #6b5418;
          color: #c9b896;
          background: transparent;
        }
        .trippy-contact-hero__aurora {
          position: absolute;
          inset: -45% -20%;
          background: conic-gradient(from 200deg at 50% 45%,
            rgba(212, 175, 55, 0.12),
            rgba(232, 213, 163, 0.1),
            rgba(212, 175, 55, 0.14),
            rgba(212, 175, 55, 0.1));
          opacity: 0.48;
          filter: blur(52px);
          pointer-events: none;
          animation: trippy-contact-aurora 26s linear infinite;
        }
        @keyframes trippy-contact-aurora {
          to { transform: rotate(360deg); }
        }
        .trippy-contact-hero__grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(212, 175, 55, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232, 213, 163, 0.035) 1px, transparent 1px);
          background-size: 42px 42px;
          mask-image: linear-gradient(180deg, black 0%, transparent 90%);
          pointer-events: none;
          opacity: 0.55;
        }
        .trippy-contact-hero__scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.1) 2px,
            rgba(0, 0, 0, 0.1) 4px
          );
          opacity: 0.12;
          pointer-events: none;
        }
        .trippy-contact-hero__eyebrow {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(212, 175, 55, 0.88);
        }
        .trippy-contact-hero__pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--tc-magenta);
          box-shadow: 0 0 12px var(--tc-magenta), 0 0 22px var(--tc-cyan);
          animation: trippy-contact-pulse 2s ease-in-out infinite;
        }
        @keyframes trippy-contact-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.65; transform: scale(0.88); }
        }
        .trippy-contact-hero__title {
          font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.05;
        }
        .trippy-contact-hero__title-line { display: block; }
        .trippy-contact-hero__title-line--main {
          font-size: clamp(2.1rem, 5.5vw, 3.25rem);
          background: linear-gradient(135deg, #fff 0%, var(--tc-cyan) 48%, var(--tc-bronze) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .trippy-contact-hero__title-line--accent {
          font-size: clamp(2.35rem, 6vw, 3.6rem);
          background: linear-gradient(90deg, var(--tc-magenta), var(--tc-bronze), var(--tc-cyan));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .trippy-contact-hero__lead {
          max-width: 38rem;
          font-size: clamp(0.95rem, 1.9vw, 1.12rem);
          line-height: 1.65;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
        }

        /* Hug poster art: full-width box + object-fit:contain caused empty side gutters inside the frame */
        .trippy-contact-hero__visual-wrap {
          position: relative;
          display: block;
          width: fit-content;
          max-width: min(100%, 420px);
          margin-inline: auto;
          line-height: 0;
        }
        @media (min-width: 992px) {
          .trippy-contact-hero__visual-wrap {
            margin-inline: 0;
            max-width: 100%;
          }
        }
        /* Match About Us poster chrome: soft glow + rounded image + inset gold frame */
        .trippy-contact-hero__visual-glow {
          position: absolute;
          inset: -8%;
          background: radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.18), transparent 55%),
            radial-gradient(circle at 70% 30%, rgba(232, 213, 163, 0.14), transparent 50%);
          opacity: 0.7;
          pointer-events: none;
          z-index: 0;
        }
        .trippy-contact-hero__visual-img {
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
          .trippy-contact-hero__visual-img {
            max-height: min(70vh, 560px);
          }
        }
        .trippy-contact-hero__visual-frame {
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

        .trippy-contact-channels {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .trippy-contact-channel {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.15rem 0;
          text-decoration: none !important;
          color: inherit;
          border-bottom: 1px solid rgba(212, 175, 55, 0.14);
          transition: background 0.2s ease, padding-left 0.2s ease;
        }
        .trippy-contact-channel:first-of-type {
          border-top: 1px solid rgba(212, 175, 55, 0.14);
        }
        .trippy-contact-channel:hover {
          background: linear-gradient(90deg, rgba(212, 175, 55, 0.06), transparent 55%);
          padding-left: 0.35rem;
        }
        .trippy-contact-channel__glyph {
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          font-size: 1.2rem;
          color: #fff;
          border: 1px solid rgba(212, 175, 55, 0.4);
          background: rgba(212, 175, 55, 0.08);
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.12);
        }
        .trippy-contact-channel--mail .trippy-contact-channel__glyph {
          border-color: rgba(232, 213, 163, 0.4);
          background: rgba(232, 213, 163, 0.08);
          box-shadow: 0 0 20px rgba(232, 213, 163, 0.1);
        }
        .trippy-contact-channel__body {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          gap: 0.2rem;
        }
        .trippy-contact-channel__kicker {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(212, 175, 55, 0.75);
        }
        .trippy-contact-channel--mail .trippy-contact-channel__kicker {
          color: rgba(232, 213, 163, 0.78);
        }
        .trippy-contact-channel__value {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          font-size: clamp(1rem, 2.4vw, 1.2rem);
          letter-spacing: -0.02em;
          color: #fff;
        }
        .trippy-contact-channel__value-icon {
          opacity: 0.85;
          font-size: 1.05rem;
        }
        .trippy-contact-channel__arrow {
          flex-shrink: 0;
          width: 10px;
          height: 10px;
          border-right: 2px solid rgba(212, 175, 55, 0.5);
          border-bottom: 2px solid rgba(212, 175, 55, 0.5);
          transform: rotate(-45deg);
          opacity: 0.6;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .trippy-contact-channel:hover .trippy-contact-channel__arrow {
          opacity: 1;
          transform: rotate(-45deg) translate(2px, -2px);
        }

        @media (min-width: 768px) {
          .trippy-contact-channels {
            flex-direction: row;
            align-items: stretch;
            border-top: 1px solid rgba(212, 175, 55, 0.14);
            border-bottom: 1px solid rgba(212, 175, 55, 0.14);
          }
          .trippy-contact-channel {
            flex: 1;
            flex-direction: column;
            align-items: flex-start;
            padding: 1.5rem 1.25rem;
            border-bottom: none;
            border-top: none;
            border-right: 1px solid rgba(212, 175, 55, 0.12);
          }
          .trippy-contact-channel:first-of-type {
            border-top: none;
          }
          .trippy-contact-channel:last-of-type {
            border-right: none;
          }
          .trippy-contact-channel:hover {
            padding-left: 1.25rem;
            background: linear-gradient(180deg, rgba(212, 175, 55, 0.07), transparent 70%);
          }
          .trippy-contact-channel__arrow {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .trippy-contact-hero__aurora { animation: none !important; }
          .trippy-contact-hero__pulse { animation: none !important; }
        }
      `}</style>
    </section>
  )
}

export default ContactHero
