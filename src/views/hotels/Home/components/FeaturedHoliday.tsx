import { Col, Container, Row } from 'react-bootstrap'
import { motion } from 'framer-motion'

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

type FaqItem = { q: string; a: string }

const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'How do I buy tickets on Trippy Entry?',
    a: 'Browse upcoming events on the home feed, open an event you like, pick your ticket type, and complete checkout. You will get a confirmation and your tickets stay in your account for easy access at the door.',
  },
  {
    q: 'Can I get a refund or exchange my ticket?',
    a: 'Refund and exchange rules depend on the organizer of each event. Check the event page for policy details, or contact us with your order reference and we will help you coordinate with the promoter where possible.',
  },
  {
    q: 'How do I show my ticket at the venue?',
    a: 'Open your booking or ticket email / app entry at check-in. Have brightness up on your phone and your ID ready if the event requires it. We recommend saving tickets offline in case the network is busy at the gate.',
  },
  {
    q: 'What payment methods are supported?',
    a: 'MCB JUICE OR BANK TRANSFER',
  },
  {
    q: 'VIP tables, group packs, or accessibility — who do I ask?',
    a: 'Use the contact page or email us with the event name, date, and what you need (group size, accessibility, VIP). We route requests to the right team so you get a clear answer before you commit.',
  },
]

/** FAQs (left) + Why TrippyEntry? (right), one row — no illustration column. */
const FeaturedHoliday = () => {
  return (
    <section className="trippy-why-faq position-relative overflow-hidden">
      <div className="trippy-why-faq__grid" aria-hidden />
      <div className="trippy-why-faq__scanlines" aria-hidden />

      <Container className="trippy-why-faq__inner position-relative z-1 py-3 py-md-4 py-lg-5">
        <Row className="align-items-start gy-5 gy-lg-5 gx-lg-4 gx-xl-5">
          <Col xs={12} lg={6}>
            <div id="faqs" className="trippy-why-faq__faq-col">
              <motion.div
                className="text-center mb-3 mb-lg-4"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* <div className="trippy-why-faq__eyebrow d-inline-flex align-items-center justify-content-center gap-2 mb-2">
                  <span className="trippy-why-faq__pulse trippy-why-faq__pulse--faq" aria-hidden />
                  <span>Quick answers</span>
                </div> */}
                <h2 className="trippy-why-faq__faq-title mb-0">
                  <span className="trippy-why-faq__faq-title-line trippy-why-faq__faq-title-line--main">FAQs</span>
                  <span className="trippy-why-faq__faq-title-line trippy-why-faq__faq-title-line--accent">before you go</span>
                </h2>
                <p className="trippy-why-faq__faq-intro mx-auto mt-3 mb-0">
                  The essentials — tickets, access, payments, and how to reach a human when the night gets complicated.
                </p>
              </motion.div>

              <div className="trippy-why-faq__faq-list">
                {FAQ_ITEMS.map((item, idx) => (
                  <motion.div
                    key={item.q}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ duration: 0.45, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <details className="trippy-why-faq__faq-item">
                      <summary className="trippy-why-faq__faq-summary">{item.q}</summary>
                      <p className="trippy-why-faq__faq-answer mb-0">{item.a}</p>
                    </details>
                  </motion.div>
                ))}
              </div>
            </div>
          </Col>

          <Col xs={12} lg={6}>
            <motion.div
              className="trippy-why__col text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="trippy-why__title mb-3 mb-lg-4">
                <span className="trippy-why__title-line trippy-why__title-line--main">Why</span>
                <span className="trippy-why__title-line trippy-why__title-line--accent">TrippyEntry?</span>
              </h2>

              <div className="trippy-why__feats trippy-why__feats--rule pt-1 pt-lg-2">
                {features.map((f) => (
                  <div key={f.title} className="trippy-why__feat mb-3 mb-lg-4">
                    <div className="trippy-why__feat-title">{f.title}</div>
                    <p className="trippy-why__feat-body mb-0">{f.body}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>

      <style>{`
        .trippy-why-faq {
          --neon-cyan: #d4af37;
          --neon-magenta: #e8d5a3;
          --neon-bronze: #6b5418;
          --neon-lime: #c9a227;
          color: #c9b896;
          background: transparent;
          scroll-margin-top: 6.5rem;
        }
        @media (min-width: 992px) {
          .trippy-why-faq { scroll-margin-top: 5.5rem; }
        }

        .trippy-why-faq__grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(212, 175, 55, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232, 213, 163, 0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: linear-gradient(180deg, black 0%, transparent 88%);
          pointer-events: none;
        }

        .trippy-why-faq__scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.12) 2px,
            rgba(0, 0, 0, 0.12) 4px
          );
          opacity: 0.16;
          pointer-events: none;
        }

        .trippy-why-faq__inner { z-index: 2; }

        .trippy-why-faq__faq-col {
          width: 100%;
          max-width: 40rem;
          margin-inline: auto;
          padding: 0 0.25rem;
        }
        @media (min-width: 992px) {
          .trippy-why-faq__faq-col { padding: 0; }
        }

        .trippy-why-faq__eyebrow {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(212, 175, 55, 0.9);
        }
        .trippy-why-faq__pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--neon-magenta);
          box-shadow: 0 0 10px var(--neon-magenta);
        }

        .trippy-why-faq__faq-title {
          font-family: "DM Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.08;
        }
        .trippy-why-faq__faq-title-line { display: block; }
        .trippy-why-faq__faq-title-line--main {
          font-size: clamp(1.8rem, 4.2vw, 2.4rem);
          background: linear-gradient(135deg, #fff8ec 0%, var(--neon-cyan) 50%, var(--neon-bronze) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .trippy-why-faq__faq-title-line--accent {
          font-size: clamp(1.95rem, 4.6vw, 2.65rem);
          background: linear-gradient(90deg, var(--neon-magenta), var(--neon-lime));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .trippy-why-faq__faq-intro {
          max-width: 32rem;
          font-size: clamp(0.95rem, 1.8vw, 1.08rem);
          line-height: 1.65;
          color: rgba(230, 215, 175, 0.88);
        }

        .trippy-why-faq__faq-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          width: 100%;
        }

        .trippy-why-faq__faq-item {
          border-radius: 1rem;
          border: 1px solid rgba(212, 175, 55, 0.24);
          background: rgba(6, 5, 3, 0.55);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 2px 16px rgba(0, 0, 0, 0.35);
          overflow: hidden;
          text-align: left;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .trippy-why-faq__faq-item:hover {
          border-color: rgba(212, 175, 55, 0.4);
        }
        .trippy-why-faq__faq-item[open] {
          border-color: rgba(212, 175, 55, 0.45);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
        }

        .trippy-why-faq__faq-summary {
          list-style: none;
          cursor: pointer;
          padding: 1rem 1.2rem 1rem 1.2rem;
          padding-right: 2.6rem;
          font-family: "DM Sans", system-ui, sans-serif;
          font-weight: 600;
          font-size: clamp(0.98rem, 1.8vw, 1.08rem);
          line-height: 1.4;
          letter-spacing: 0.01em;
          color: #f4eed9;
          position: relative;
          user-select: none;
        }
        .trippy-why-faq__faq-summary::-webkit-details-marker { display: none; }
        .trippy-why-faq__faq-summary::after {
          content: "";
          position: absolute;
          right: 1.15rem;
          top: 50%;
          width: 8px;
          height: 8px;
          border-right: 2px solid var(--neon-cyan);
          border-bottom: 2px solid var(--neon-cyan);
          transform: translateY(-50%) rotate(45deg);
          transition: transform 0.25s ease;
          opacity: 0.8;
        }
        .trippy-why-faq__faq-item[open] .trippy-why-faq__faq-summary::after {
          transform: translateY(-50%) rotate(225deg);
        }
        .trippy-why-faq__faq-summary:hover {
          color: #fffef8;
        }

        .trippy-why-faq__faq-answer {
          padding: 0 1.2rem 1.15rem;
          font-size: 0.95rem;
          line-height: 1.7;
          color: rgba(220, 205, 160, 0.88);
          border-top: 1px solid rgba(212, 175, 55, 0.12);
          padding-top: 0.9rem;
          margin-top: 0;
        }
        @media (min-width: 768px) {
          .trippy-why-faq__faq-answer { font-size: 1.02rem; }
        }

        .trippy-why__col {
          width: 100%;
          max-width: 36rem;
          margin-inline: auto;
          padding: 0 0.25rem;
        }
        @media (min-width: 992px) {
          .trippy-why__col { padding: 0; }
        }

        .trippy-why__title {
          font-family: "DM Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .trippy-why__title-line {
          display: block;
          line-height: 1.08;
        }

        .trippy-why__title-line--main {
          font-size: clamp(1.8rem, 4.2vw, 2.5rem);
          background: linear-gradient(135deg, #fff8ec 0%, var(--neon-cyan) 50%, var(--neon-bronze) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .trippy-why__title-line--accent {
          font-size: clamp(1.95rem, 4.6vw, 2.75rem);
          background: linear-gradient(90deg, var(--neon-magenta) 0%, var(--neon-bronze) 50%, var(--neon-cyan) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        @keyframes trippy-why-title-pulse {
          0%, 100% {
            filter: brightness(1) drop-shadow(0 0 4px rgba(212, 175, 55, 0.1));
          }
          50% {
            filter: brightness(1.1) drop-shadow(0 0 18px rgba(255, 220, 170, 0.28));
          }
        }
        .trippy-why-faq__faq-title-line--main,
        .trippy-why-faq__faq-title-line--accent,
        .trippy-why__title-line--main,
        .trippy-why__title-line--accent {
          animation: trippy-why-title-pulse 3.2s ease-in-out infinite;
        }
        .trippy-why-faq__faq-title-line--accent,
        .trippy-why__title-line--accent {
          animation-delay: 0.4s;
        }

        .trippy-why__feats--rule {
          border-top: 1px solid rgba(212, 175, 55, 0.18) !important;
          max-width: 32rem;
          margin-left: auto;
          margin-right: auto;
        }

        .trippy-why__feat-title {
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(212, 175, 55, 0.92);
          margin-bottom: 0.4rem;
        }
        @media (min-width: 768px) {
          .trippy-why__feat-title { font-size: 0.82rem; }
        }

        .trippy-why__feat-body {
          font-size: clamp(0.9rem, 1.75vw, 1.05rem);
          line-height: 1.65;
          font-weight: 500;
          color: rgba(210, 195, 160, 0.92) !important;
          -webkit-text-fill-color: rgba(210, 195, 160, 0.92);
        }

        .trippy-why__feat:last-child {
          margin-bottom: 0 !important;
        }

        @media (max-width: 991.98px) {
          .trippy-why-faq__scanlines {
            opacity: 0.1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .trippy-why-faq__faq-title-line--main,
          .trippy-why-faq__faq-title-line--accent,
          .trippy-why__title-line--main,
          .trippy-why__title-line--accent {
            animation: none !important;
            filter: none;
          }
        }
      `}</style>
    </section>
  )
}

export default FeaturedHoliday
