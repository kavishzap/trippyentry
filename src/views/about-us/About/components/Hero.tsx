// ZekoLanding.tsx
import { Col, Container, Row } from "react-bootstrap";
import { motion } from "framer-motion";

/* -------------------- Hero -------------------- */
const Hero = () => {
  return (
    <section className="hero-section position-relative py-5 overflow-hidden">
      <Container>
       <Row className="mb-4 mb-md-5">
          <Col xl={10} className="mx-auto text-center">
            <h1 className="hero-title fw-bold mb-3">
              Experience the Magic of Live Music —{" "}
              <span className="hero-highlight">We&apos;ll Get You There</span>
            </h1>
            <p className="lead hero-sub mb-4">
              From VIP to last-minute deals, we help fans catch the biggest
              concerts, festivals, and live shows. Your next unforgettable night
              starts here.
            </p>
          </Col>
        </Row>
      </Container>

      <style>{`
        /* Make section transparent; inherit colors from the unified surface */
        .hero-section { background: transparent; color: inherit; }

        .hero-title { letter-spacing: .2px; line-height: 1.15; }
        .hero-highlight {
          background: linear-gradient(90deg, var(--title-grad-a), var(--title-grad-b));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-sub { color: var(--hero-sub); }
        .h-20px { height: 20px; }
        .bg-mode { background: var(--chip-bg); }
        .hero-chip { backdrop-filter: saturate(1.2) blur(6px); }
        @media (max-width: 575.98px) {
    .hero-section { padding-bottom: 1rem !important; }
  }
      `}</style>
    </section>
  );
};

/* -------------------- Our Story -------------------- */
const OurStory = () => {
  return (
    <section
      className="our-story-section position-relative overflow-hidden"
      style={{ marginTop: "-80px" }}
    >
      <Container>
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

      <style>{`
        /* Transparent section; inherit shared background */
        .our-story-section { padding: 6rem 0; background: transparent; color: inherit; }

        .highlight {
          background: linear-gradient(90deg, var(--title-grad-a), var(--title-grad-b));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .our-story-body { color: var(--body-muted); }
        .story-illustration { box-shadow: 0 12px 32px rgba(0,0,0,0.08); }

        /* Dark polish for the image shadow on dark surfaces */
        :where([data-bs-theme="dark"] .our-story-section, .dark .our-story-section) .story-illustration {
          box-shadow: 0 18px 48px rgba(0,0,0,0.7);
        }
      `}</style>
    </section>
  );
};
/* -------------------- Page Composer with ONE shared background -------------------- */
const ZekoLanding = () => {
  return (
    <main className="zeko-surface">
      <Hero />
      <OurStory />
      {/* <OurTeam /> */}

      {/* Shared background + tokens (light/dark) */}
      <style>{`
        /* Base shared surface (dark-default look) */
.zeko-surface {
    /* No background: inherit whatever your app/page uses */
    background: transparent !important;
    color: inherit;

    /* Tokens used by Hero / Our Story / panels */
    --chip-bg: color-mix(in srgb, var(--bs-body-color) 6%, transparent);
    --title-grad-a: #60a5fa;   /* keep your nice highlight gradient */
    --title-grad-b: #22d3ee;
    --hero-sub: var(--bs-secondary-color);
    --body-muted: var(--bs-secondary-color);

    /* Cards/panels follow Bootstrap theme */
    --panel-bg: var(--bs-body-bg);
    --panel-border: var(--bs-border-color-translucent);
    --panel-shadow: 0 12px 28px rgba(0,0,0,0.08);
  }


        /* Light theme override (Bootstrap data theme or .light) */
        :where([data-bs-theme="light"] .zeko-surface, .light .zeko-surface) {
          --surface-a: #f8fafc;
          --surface-b: #eef2f7;
          --chip-bg: rgba(0,0,0,0.04);
          --title-grad-a: #3b82f6;  /* blue-500 */
          --title-grad-b: #06b6d4;  /* cyan-500 */
          --hero-sub: #475569;
          --body-muted: #475569;
          --panel-bg: #ffffff;
          --panel-border: rgba(0,0,0,0.06);
          --panel-shadow: 0 12px 28px rgba(0,0,0,0.08);

          color: #0f172a;
          background:
            radial-gradient(1200px 600px at 10% 0%, rgba(99,102,241,0.08), transparent 60%),
            radial-gradient(1000px 500px at 90% 0%, rgba(34,211,238,0.08), transparent 60%),
            linear-gradient(180deg, var(--surface-a), var(--surface-b));
        }
      `}</style>
    </main>
  );
};

export default ZekoLanding;
