import { Col, Container, Row } from 'react-bootstrap'
import { motion } from 'framer-motion'

const OurTeam = () => {
  return (
    <section className="trippy-about-team position-relative overflow-hidden">
      <div className="trippy-about-team__grid" aria-hidden />
      <div className="trippy-about-team__scanlines" aria-hidden />

      <Container className="position-relative z-1 py-4 py-lg-5">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <motion.div
              className="trippy-about-team__panel text-center rounded-4 p-4 p-md-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="trippy-about-team__title mb-3">
                <span className="trippy-about-team__title-line trippy-about-team__title-line--main">Our</span>
                <span className="trippy-about-team__title-line trippy-about-team__title-line--accent">Team</span>
              </h2>
              <p className="trippy-about-team__body mt-2 mb-0">
                Behind TrippyEntry is a passionate crew of developers, designers, and event people — united by a love
                for live music and the culture around it. We build a fan-first experience for ticketing and entry,
                from code to the door, so the only thing you have to think about is the next drop.
              </p>
            </motion.div>
          </Col>
        </Row>
      </Container>

      <style>{`
        .trippy-about-team {
          --tmt-cyan: #d4af37;
          --tmt-magenta: #e8d5a3;
          --tmt-bronze: #6b5418;
          --tmt-lime: #c9a227;
          color: #c9b896;
          background: transparent;
        }
        .trippy-about-team__grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(212, 175, 55, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232, 213, 163, 0.028) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: linear-gradient(180deg, black 0%, transparent 90%);
          pointer-events: none;
          opacity: 0.4;
        }
        .trippy-about-team__scanlines {
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
        .trippy-about-team__panel {
          background: rgba(6, 5, 3, 0.55);
          border: 1px solid rgba(212, 175, 55, 0.22);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 2px 24px rgba(0, 0, 0, 0.4);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .trippy-about-team__panel:hover {
          border-color: rgba(212, 175, 55, 0.35);
          box-shadow: 0 4px 32px rgba(0, 0, 0, 0.45);
        }
        .trippy-about-team__title {
          font-family: "DM Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        .trippy-about-team__title-line {
          display: block;
          line-height: 1.08;
        }
        .trippy-about-team__title-line--main {
          font-size: clamp(1.6rem, 3.8vw, 2.1rem);
          background: linear-gradient(135deg, #fff8ec 0%, var(--tmt-cyan) 50%, var(--tmt-bronze) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .trippy-about-team__title-line--accent {
          font-size: clamp(1.75rem, 4.2vw, 2.35rem);
          background: linear-gradient(90deg, var(--tmt-magenta) 0%, var(--tmt-lime) 50%, var(--tmt-cyan) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .trippy-about-team__body {
          line-height: 1.7;
          font-size: clamp(0.92rem, 1.75vw, 1.05rem);
          font-weight: 500;
          color: rgba(220, 205, 160, 0.9);
        }
        @media (max-width: 576px) {
          .trippy-about-team__panel { padding: 1.25rem !important; }
        }
      `}</style>
    </section>
  )
}

export default OurTeam
