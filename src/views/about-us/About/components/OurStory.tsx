import { Col, Container, Row } from "react-bootstrap";
import { motion } from "framer-motion";
const OurStory = () => {
  return (
    <section className="our-story-section position-relative overflow-hidden">
      <Container>
        {/* Top Intro */}
        <Row className="align-items-center gy-5 mb-5">
          <Col lg={6} className="text-center text-lg-start">
            <h2 className="display-5 fw-bold">
              Our <span className="highlight">Story</span>
            </h2>
            <p className="lead fw-semibold mt-3 text-muted">
              How we founded ZEKO...
            </p>
            <p className="mt-4 our-story-body">
              ZEKO was born from a simple idea — to make event booking easier,
              faster, and more accessible for everyone in Mauritius. Whether
              you're 16 or 60, tech-savvy or not, our mission is to bring live
              entertainment to your fingertips with zero hassle.
              <br />
              <br />
              We are a team of developers, designers, and event lovers who
              understand the unique culture and vibrant energy of Mauritius.
              That’s why we created a platform that bridges traditional
              ticketing with modern digital convenience — all in one sleek
              experience.
              <br />
              <br />
              From concerts and festivals to theatre nights and community
              gatherings, ZEKO empowers both organizers and attendees. Because
              we believe unforgettable experiences should be for everyone — not
              just a few.
            </p>
          </Col>

          {/* Right Illustration */}
          <Col lg={6} className="text-center">
            <motion.img
              src="https://lomezonmvcwxsdjbnimh.supabase.co/storage/v1/object/sign/hosted_img/final%20sam.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOWM2ODdjNC1hM2MxLTQyZjUtOGJmMi1hYTg2NDJkZTY0NDYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJob3N0ZWRfaW1nL2ZpbmFsIHNhbS5qcGciLCJpYXQiOjE3NTc4ODU3MTgsImV4cCI6MTgxODM2NTcxOH0.IQk5CBZTz9k3-kvTGz9CA6k-xG5vZBSGZE16Co4E2QA"
              alt="Our Story Illustration"
              className="img-fluid rounded-4 story-illustration"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            />
          </Col>
        </Row>
      </Container>

      {/* Light + Dark styles (with Bootstrap theme + .dark + prefers-color-scheme) */}
      <style>{`
        /* ---------- Base (light defaults) ---------- */
        .our-story-section {
          --story-bg-start: #f9fafb;
          --story-bg-end:   #f1f5f9;
          --story-card-bg:  #ffffff;
          --story-card-border: rgba(0,0,0,0.06);
          --story-card-shadow: 0 8px 24px rgba(0,0,0,0.08);
          --icon-bg: rgba(0,0,0,0.05);
          --icon-fg: #111827;
          --body-muted: #6b7280;

          padding: 6rem 0;
          background: linear-gradient(135deg, var(--story-bg-start), var(--story-bg-end));
        }

        .highlight {
          background: linear-gradient(90deg, #facc15, #f97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .our-story-body { color: var(--body-muted); }

        .story-card {
          background: var(--story-card-bg);
          box-shadow: var(--story-card-shadow);
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
          border: 1px solid var(--story-card-border);
        }
        .story-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
        }

        .icon-circle {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--icon-bg);
          color: var(--icon-fg);
          font-size: 24px;
        }

        .story-card-text { color: var(--body-muted); }

        .story-illustration {
          box-shadow: 0 12px 32px rgba(0,0,0,0.08);
        }

        /* ---------- Dark mode (Bootstrap data theme, .dark class, and prefers-color-scheme) ---------- */
        :where([data-bs-theme="dark"] .our-story-section, .dark .our-story-section) {
          --story-bg-start: #0b1220;
          --story-bg-end:   #0f172a;
          --story-card-bg:  #0b1220;
          --story-card-border: rgba(255,255,255,0.08);
          --story-card-shadow: 0 10px 32px rgba(0,0,0,0.5);
          --icon-bg: rgba(255,255,255,0.08);
          --icon-fg: #e5e7eb;
          --body-muted: #9ca3af;
        }

        @media (prefers-color-scheme: dark) {
          .our-story-section:not([data-bs-theme="light"]) {
            --story-bg-start: #0b1220;
            --story-bg-end:   #0f172a;
            --story-card-bg:  #0b1220;
            --story-card-border: rgba(255,255,255,0.08);
            --story-card-shadow: 0 10px 32px rgba(0,0,0,0.5);
            --icon-bg: rgba(255,255,255,0.08);
            --icon-fg: #e5e7eb;
            --body-muted: #9ca3af;
          }
        }

        /* Dark-specific polish */
        :where([data-bs-theme="dark"] .our-story-section, .dark .our-story-section) .story-card:hover {
          box-shadow: 0 16px 40px rgba(0,0,0,0.65);
        }
        :where([data-bs-theme="dark"] .our-story-section, .dark .our-story-section) .story-illustration {
          box-shadow: 0 18px 48px rgba(0,0,0,0.7);
        }
      `}</style>
    </section>
  );
};

export default OurStory;
