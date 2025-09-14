import { Card, Col, Container, Row } from "react-bootstrap";
import {
  BsEnvelope,
  BsGlobe2,
  BsHeadset,
  BsInboxesFill,
  BsPhone,
} from "react-icons/bs";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { motion } from "framer-motion";

const ContactHero = () => {
  return (
    <section className="contact-section pt-4 pt-md-5 mb-5 position-relative overflow-hidden">
      <Container>
        <Row className="mb-5">
          <Col xl={10}>
            <h1 className="contact-title mb-2">
              Let&apos;s connect and get to know{" "}
              <span className="contact-title-white">each other</span>
            </h1>
            <p className="lead mb-0 contact-sub">
              Whether you’ve got questions about an event, need help with your
              ticket, or just want to say hi—we’re here for you. Reach out
              anytime and let’s make your experience unforgettable!
            </p>
          </Col>
        </Row>

        {/* ✅ align-items-stretch + d-flex cols ensures equal-height cards */}
        <Row className="g-4 align-items-stretch">
          {/* Call us */}
          <Col md={6} xl={4} className="d-flex">
            <motion.div
              className="w-100"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Card className="contact-card contact-info h-100 text-center p-4 p-md-4 d-flex flex-column">
                <div className="contact-icon">
                  <BsHeadset />
                </div>
                <h5 className="mt-2">Call us</h5>

                {/* Actions pinned with mt-auto keeps heights consistent */}
                <div className="actions d-flex flex-wrap justify-content-center gap-2 mt-5">
                  <a
                    href="tel:+23055063356"
                    className="contact-chip"
                    aria-label="Call +230 5839 3719"
                  >
                    <BsPhone className="me-2" /> +230 5506 3356
                  </a>
                </div>
              </Card>
            </motion.div>
          </Col>

          {/* Email us */}
          <Col md={6} xl={4} className="d-flex">
            <motion.div
              className="w-100"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              <Card className="contact-card contact-danger h-100 text-center p-4 p-md-4 d-flex flex-column">
                <div className="contact-icon">
                  <BsInboxesFill />
                </div>
                <h5 className="mt-2">Email us</h5>

                {/* ✅ Hard-center the email link */}
                <div className="actions d-flex justify-content-center  mt-5">
                  <a
                    href="mailto:zeko.mru@gmail.com"
                    className="contact-link"
                    aria-label="Email zeko.mru@gmail.com"
                  >
                    <BsEnvelope className="me-2" />
                    zeko.mru@gmail.com
                  </a>
                </div>
              </Card>
            </motion.div>
          </Col>

          {/* Social media */}
          <Col xl={4} className="d-flex position-relative">
            <motion.div
              className="w-100"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
            >
              <Card className="contact-card contact-orange h-100 text-center p-4 p-md-4 d-flex flex-column">
                <div className="contact-icon">
                  <BsGlobe2 />
                </div>
                <h5 className="mt-2">Social media</h5>

                <div className="actions d-flex justify-content-center gap-2  mt-5">
                  <a
                    className="social-btn ig"
                    href="https://www.instagram.com/zekomru/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    title="@zekomru"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    className="social-btn fb"
                    href="https://www.facebook.com/share/1C33xLMwhG/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    title="ZEKO MRU"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    className="social-btn tt"
                    href="https://www.tiktok.com/@zekomru"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="TikTok"
                    title="@zekomru"
                  >
                    <FaTiktok />
                  </a>
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* Styles */}
      <style>{`
  /* Inherit page background */
  .contact-section { background: transparent; }
.contact-title{
  background: linear-gradient(90deg, var(--title-grad-a, #60a5fa), var(--title-grad-b, #22d3ee));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* force white just for the span */
.contact-title .contact-title-white{
  background: none !important;
  -webkit-background-clip: initial;
  -webkit-text-fill-color: #fff; /* Safari/Chromium */
  color: #fff;                   /* Firefox/others */
}
  .contact-title {
    line-height: 1.15;
    letter-spacing: .2px;
    /* keep your title gradient if you like — or make it plain by removing these 2 lines */
    background: linear-gradient(90deg, var(--title-grad-a, #ffffffff), var(--title-grad-b, #ffffffff));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .contact-sub { color: var(--body-muted, #6b7280); }

  /* Equal height + neutral cards */
  .contact-card {
    border: 1px solid var(--panel-border, rgba(0,0,0,0.06));
    box-shadow: var(--panel-shadow, 0 12px 28px rgba(0,0,0,0.08));
    border-radius: 1rem;
    transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
    position: relative;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    min-height: 260px;
  }
  @media (min-width: 1200px) {
    .contact-card { min-height: 280px; }
  }
  .contact-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 36px rgba(0,0,0,0.12);
    border-color: rgba(0,0,0,0.08);
  }

  /* Remove colored glow overlays */
  .contact-card::after { content: none !important; }

  /* Neutral icon pill (no color gradient) */
  .contact-icon {
    width: 64px; height: 64px;
    border-radius: 9999px;
    display: grid; place-items: center;
    margin-inline: auto; margin-bottom: .5rem;
    font-size: 24px;
    box-shadow: 0 8px 18px rgba(0,0,0,.06);
    background: var(--icon-bg, rgba(0,0,0,0.06));
    color: var(--icon-fg, #111827);
    border: 1px solid color-mix(in srgb, var(--icon-bg, rgba(0,0,0,0.06)) 35%, transparent);
  }

  /* Chips / links */
  .contact-chip,
  .contact-chip:visited {
    display: inline-flex; align-items: center; gap: .25rem;
    padding: .5rem .75rem; border-radius: .75rem; text-decoration: none;
    font-weight: 600; border: 1px solid rgba(0,0,0,.12);
    color: inherit; background: rgba(0,0,0,.04);
    backdrop-filter: saturate(1.1) blur(4px);
    transition: transform .2s ease, background .2s ease, border-color .2s ease;
  }
  .contact-chip:hover { transform: translateY(-1px); background: rgba(0,0,0,.06); }

  .contact-link,
  .contact-link:visited {
    display: inline-flex; align-items: center;
    font-weight: 600; text-decoration: none;
    padding: .25rem 0;
    color: var(--link-fg, #0ea5e9);
    border-bottom: 2px solid rgba(14,165,233,.3);
    transition: color .2s ease, border-color .2s ease, transform .2s ease;
  }
  .contact-link:hover { color: var(--link-fg-hover, #38bdf8); border-color: rgba(56,189,248,.5); transform: translateY(-1px); }

  /* Social buttons (brand colors kept) */
  .social-btn {
    width: 40px; height: 40px; border-radius: 10px;
    display: grid; place-items: center;
    color: #fff; text-decoration: none;
    transition: transform .2s ease, filter .2s ease;
    box-shadow: 0 8px 20px rgba(0,0,0,.2);
  }
  .social-btn:hover { transform: translateY(-2px) scale(1.03); filter: saturate(1.1); }
  .social-btn.ig { background: linear-gradient(135deg,#f58529,#feda77,#dd2a7b,#8134af,#515bd4); }
  .social-btn.fb { background: #1877f2; }
  .social-btn.tt { background: #000000; }

  /* Light/Dark tokens */
  :where([data-bs-theme="light"] .contact-section, .light .contact-section) {
    --body-muted: #475569;
    --panel-bg: #ffffff;
    --panel-border: rgba(0,0,0,0.06);
    --panel-shadow: 0 12px 28px rgba(0,0,0,0.08);
    --icon-bg: rgba(0,0,0,0.06);
    --icon-fg: #111827;
    --title-grad-a: #3b82f6; /* only affects the page title, not cards */
    --title-grad-b: #06b6d4;
    --link-fg: #0ea5e9; --link-fg-hover: #0284c7;
  }
  :where([data-bs-theme="dark"] .contact-section, .dark .contact-section) {
    --body-muted: #9ca3af;
    --panel-bg: #0b1220;
    --panel-border: rgba(255,255,255,0.08);
    --panel-shadow: 0 18px 48px rgba(0,0,0,0.55);
    --icon-bg: rgba(255,255,255,0.08);
    --icon-fg: #e5e7eb;
    --title-grad-a: #ffffffff; --title-grad-b: #ffffffff; /* only the page title */
    --link-fg: #38bdf8; --link-fg-hover: #7dd3fc;
  }

  @media (max-width: 576px) {
    .contact-card { padding: 1.25rem; }
  }
`}</style>
    </section>
  );
};

export default ContactHero;
