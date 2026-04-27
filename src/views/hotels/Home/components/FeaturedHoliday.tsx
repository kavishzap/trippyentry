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
    a: 'We support major cards and other methods shown at checkout for your region. If a payment fails, try another card or contact your bank — you can also reach us and we will look into it with you.',
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
      <div className="trippy-why-faq__aurora" aria-hidden />
      <div className="trippy-why-faq__grid" aria-hidden />
      <div className="trippy-why-faq__scanlines" aria-hidden />

      <Container className="trippy-why-faq__inner position-relative z-1 py-3 py-md-4 py-lg-5">
        <Row className="align-items-start gy-4 gy-lg-5 gx-lg-4 gx-xl-5">
          <Col xs={12} lg={6}>
            <div id="faqs" className="trippy-why-faq__faq-col">
              <motion.div
                className="text-center text-lg-start mb-3 mb-lg-4"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="trippy-why-faq__eyebrow d-inline-flex align-items-center gap-2 mb-2">
                  <span className="trippy-why-faq__pulse trippy-why-faq__pulse--faq" aria-hidden />
                  <span>Quick answers</span>
                </div>
                <h2 className="trippy-why-faq__faq-title mb-0">
                  <span className="trippy-why-faq__faq-title-line trippy-why-faq__faq-title-line--main">FAQs</span>
                  <span className="trippy-why-faq__faq-title-line trippy-why-faq__faq-title-line--accent">before you go</span>
                </h2>
                <p className="trippy-why-faq__faq-intro mx-auto mx-lg-0 mt-3 mb-0">
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
        </Row>
      </Container>

      <style>{`
        .trippy-why-faq {
          --neon-cyan: #2ef2ff;
          --neon-magenta: #ff2ee6;
          --neon-violet: #a855ff;
          color: #e8e4ff;
          background: transparent;
          scroll-margin-top: 6.5rem;
        }
        @media (min-width: 992px) {
          .trippy-why-faq { scroll-margin-top: 5.5rem; }
        }

        .trippy-why-faq__aurora {
          position: absolute;
          inset: -40% -20%;
          background: conic-gradient(from 120deg at 50% 50%,
            rgba(46, 242, 255, 0.12),
            rgba(255, 46, 230, 0.1),
            rgba(168, 85, 255, 0.16),
            rgba(46, 242, 255, 0.08),
            rgba(255, 46, 230, 0.06),
            rgba(46, 242, 255, 0.12));
          animation: twf-aurora 22s linear infinite;
          opacity: 0.48;
          filter: blur(56px);
          pointer-events: none;
        }
        @keyframes twf-aurora {
          to { transform: rotate(360deg); }
        }

        .trippy-why-faq__grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(46, 242, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 46, 230, 0.04) 1px, transparent 1px);
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

        .trippy-why-faq__eyebrow {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(46, 242, 255, 0.85);
        }
        .trippy-why-faq__pulse {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--neon-magenta);
          box-shadow: 0 0 10px var(--neon-magenta);
        }

        .trippy-why-faq__faq-title {
          font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.08;
        }
        .trippy-why-faq__faq-title-line { display: block; }
        .trippy-why-faq__faq-title-line--main {
          font-size: clamp(1.75rem, 4.2vw, 2.5rem);
          background: linear-gradient(135deg, #fff 0%, var(--neon-cyan) 50%, var(--neon-violet) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .trippy-why-faq__faq-title-line--accent {
          font-size: clamp(1.9rem, 4.6vw, 2.65rem);
          background: linear-gradient(90deg, var(--neon-magenta), var(--neon-violet), var(--neon-cyan));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .trippy-why-faq__faq-intro {
          max-width: 36rem;
          font-size: clamp(0.9rem, 1.65vw, 1.02rem);
          line-height: 1.6;
          color: rgba(232, 228, 255, 0.78);
        }

        .trippy-why-faq__faq-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .trippy-why-faq__faq-item {
          border-radius: 0.85rem;
          border: 1px solid rgba(46, 242, 255, 0.22);
          background: rgba(8, 6, 22, 0.72);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
          overflow: hidden;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .trippy-why-faq__faq-item:hover {
          border-color: rgba(46, 242, 255, 0.38);
        }
        .trippy-why-faq__faq-item[open] {
          border-color: rgba(255, 46, 230, 0.35);
          box-shadow:
            0 10px 36px rgba(0, 0, 0, 0.4),
            0 0 28px rgba(168, 85, 255, 0.1);
        }

        .trippy-why-faq__faq-summary {
          list-style: none;
          cursor: pointer;
          padding: 1rem 1.15rem;
          padding-right: 2.5rem;
          font-weight: 700;
          font-size: clamp(0.9rem, 1.5vw, 1rem);
          letter-spacing: -0.01em;
          color: #f4f2ff;
          position: relative;
          user-select: none;
        }
        .trippy-why-faq__faq-summary::-webkit-details-marker { display: none; }
        .trippy-why-faq__faq-summary::after {
          content: "";
          position: absolute;
          right: 1.1rem;
          top: 50%;
          width: 10px;
          height: 10px;
          border-right: 2px solid var(--neon-cyan);
          border-bottom: 2px solid var(--neon-cyan);
          transform: translateY(-60%) rotate(45deg);
          transition: transform 0.25s ease;
          opacity: 0.85;
        }
        .trippy-why-faq__faq-item[open] .trippy-why-faq__faq-summary::after {
          transform: translateY(-20%) rotate(225deg);
        }
        .trippy-why-faq__faq-summary:hover {
          color: #fff;
        }

        .trippy-why-faq__faq-answer {
          padding: 0 1.15rem 1.1rem;
          font-size: 0.875rem;
          line-height: 1.65;
          color: rgba(232, 228, 255, 0.82);
          border-top: 1px solid rgba(46, 242, 255, 0.12);
          padding-top: 0.85rem;
          margin-top: 0;
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
          background: linear-gradient(90deg, var(--neon-magenta) 0%, var(--neon-violet) 55%, var(--neon-cyan) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: twf-title-shimmer 6s ease-in-out infinite alternate;
          padding-bottom: 0.22em;
        }

        @keyframes twf-title-shimmer {
          0% { filter: hue-rotate(-6deg) brightness(1); }
          100% { filter: hue-rotate(8deg) brightness(1.06); }
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
          text-shadow: none;
          filter: none;
        }

        .trippy-why__feat:last-child {
          margin-bottom: 0 !important;
        }

        @media (max-width: 991.98px) {
          .trippy-why-faq__scanlines {
            opacity: 0.1;
          }
          .trippy-why__title-line--main {
            text-shadow: none;
            filter: none;
          }
          .trippy-why__title-line--accent {
            text-shadow: none;
            filter: none !important;
            animation: none !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .trippy-why-faq__aurora,
          .trippy-why__title-line--accent {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  )
}

export default FeaturedHoliday
