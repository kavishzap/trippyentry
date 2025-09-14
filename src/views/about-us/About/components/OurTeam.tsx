import { Col, Container, Row } from 'react-bootstrap'

const OurTeam = () => {
  return (
    <section className="our-team-section pt-0 position-relative overflow-hidden">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <div className="team-panel text-center rounded-4 p-4 p-md-5 shadow-lg">
              <h2 className="team-title display-6 fw-bold mb-3">Our Team</h2>

              <p className="team-body mt-2 mb-0">
                Behind ZEKO is a passionate team of developers, designers, and event enthusiasts driven by a shared love for live entertainment. We blend tech innovation with real-world experience to create a seamless, fan-first ticketing platform. Whether we're writing code or curating events, everything we do is built around one goal — making unforgettable experiences easier to access for everyone.
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Styles: light + dark */}
      <style>{`
        /* ---------- Tokens ---------- */
        .our-team-section {
          --bg-start: #f8fafc;        /* light slate-50 */
          --bg-end:   #eef2f7;        /* light slate-100 */
          --panel-bg: #ffffff;
          --panel-border: rgba(0,0,0,0.06);
          --panel-shadow: 0 12px 28px rgba(0,0,0,0.08);
          --title-grad-a: #60a5fa;    /* blue-400 */
          --title-grad-b: #22d3ee;    /* cyan-400 */
          --body-color: #475569;      /* slate-600 */

          padding: 6rem 0 4rem;
          background: linear-gradient(135deg, var(--bg-start), var(--bg-end));
        }

        /* Subtle background glow */
        .our-team-section::before {
          content: "";
          position: absolute;
          inset: -20% -10% auto -10%;
          height: 60%;
          background:
            radial-gradient(40rem 20rem at 10% 20%, rgba(99,102,241,0.12), transparent 60%),
            radial-gradient(30rem 18rem at 90% 10%, rgba(34,211,238,0.10), transparent 60%);
          pointer-events: none;
          filter: blur(2px);
        }

        .team-panel {
          background: var(--panel-bg);
          border: 1px solid var(--panel-border);
          box-shadow: var(--panel-shadow);
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
        }
        .team-panel:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 36px rgba(0,0,0,0.12);
          border-color: rgba(0,0,0,0.08);
        }

        .team-title {
          background: linear-gradient(90deg, var(--title-grad-a), var(--title-grad-b));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: .3px;
        }

        .team-body {
          color: var(--body-color);
          line-height: 1.75;
          font-size: 1.05rem;
        }

        /* ---------- Dark mode (Bootstrap 5.3 data theme, .dark, or system) ---------- */
        :where([data-bs-theme="dark"] .our-team-section, .dark .our-team-section) {
          --bg-start: #0b1220;
          --bg-end:   #0f172a;
          --panel-bg: #0b1220;
          --panel-border: rgba(255,255,255,0.08);
          --panel-shadow: 0 18px 48px rgba(0,0,0,0.55);
          --title-grad-a: #93c5fd;  /* blue-300 */
          --title-grad-b: #67e8f9;  /* cyan-300 */
          --body-color: #cbd5e1;    /* slate-300 */
        }

        @media (prefers-color-scheme: dark) {
          .our-team-section:not([data-bs-theme="light"]) {
            --bg-start: #0b1220;
            --bg-end:   #0f172a;
            --panel-bg: #0b1220;
            --panel-border: rgba(255,255,255,0.08);
            --panel-shadow: 0 18px 48px rgba(0,0,0,0.55);
            --title-grad-a: #93c5fd;
            --title-grad-b: #67e8f9;
            --body-color: #cbd5e1;
          }
        }

        /* Responsive polish */
        @media (max-width: 576px) {
          .our-team-section { padding: 4.5rem 0 3rem; }
          .team-panel { padding: 1.25rem; }
          .team-body { font-size: 1rem; }
        }
      `}</style>
    </section>
  )
}

export default OurTeam
