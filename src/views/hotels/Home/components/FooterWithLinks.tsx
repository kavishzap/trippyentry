import { BsEnvelope, BsTelephone } from 'react-icons/bs'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { currentYear, supportEmail, supportLink } from '@/states'

const FooterWithLinks = () => {
  return (
    <footer className="trippy-footer position-relative overflow-hidden">
      <div className="trippy-footer__glow" aria-hidden />
      <div className="trippy-footer__grid" aria-hidden />
      <Container className="trippy-footer__inner position-relative">
        <Row className="g-4 g-lg-5 align-items-lg-center trippy-footer__main pt-4 pt-md-5 pb-2">
          <Col xs={12} lg={6} className="text-center text-lg-start">
            <Link to="/" className="trippy-footer__logo-link d-inline-block">
              <img className="mb-3 trippy-footer__logo-img" src="/new_logo.png" alt="Trippy Entry" />
            </Link>
            <p className="trippy-footer__tagline small fw-semibold mb-2">Never Miss the Drop</p>
            <p className="trippy-footer__muted small mb-0 trippy-footer__desc mx-auto mx-lg-0">
              Be first to hear about new raves, secret events, and exclusive offers. Stay plugged into the night.
            </p>
          </Col>
          <Col xs={12} lg={6} className="text-center text-lg-end mt-4 mt-lg-0">
            <h3 className="trippy-footer__contact-title h6 text-uppercase mb-3">Contact us</h3>
            <p className="mb-2 d-flex justify-content-center align-items-center justify-content-lg-end small trippy-footer__muted">
              <BsTelephone className="me-2 trippy-footer__icon flex-shrink-0" />
              <Link to="tel:+23059182520" className="trippy-footer__link text-decoration-none trippy-footer__link--break">
                +230 5918 2520
              </Link>
            </p>
            <p className="mb-0 d-flex justify-content-center align-items-center justify-content-lg-end small trippy-footer__muted">
              <BsEnvelope className="me-2 trippy-footer__icon flex-shrink-0" />
              <a
                href={supportLink}
                className="trippy-footer__link text-decoration-none trippy-footer__link--break"
              >
                {supportEmail}
              </a>
            </p>
          </Col>
        </Row>

        <hr className="trippy-footer__hr" />
        <Row>
          <Col>
            <div className="d-flex flex-column align-items-center text-center small trippy-footer__muted py-3">
              <div>© {currentYear} trippyentry.com. All rights reserved.</div>
              <div className="mt-2">
                <a href={supportLink} className="trippy-footer__link text-decoration-none small">
                  {supportEmail}
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <style>{`
        .trippy-footer {
          --tf-gold: #d4af37;
          --tf-parchment: #c9b896;
          --tf-muted: rgba(201, 184, 150, 0.82);
          background: linear-gradient(180deg, #030201 0%, #000000 35%, #000000 100%);
          border-top: 1px solid rgba(212, 175, 55, 0.38);
          color: var(--tf-parchment);
        }
        .trippy-footer__glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(ellipse 90% 70% at 50% 0%, rgba(212, 175, 55, 0.12), transparent 55%);
          opacity: 1;
        }
        .trippy-footer__grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(212, 175, 55, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232, 213, 163, 0.035) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: linear-gradient(180deg, black 0%, transparent 82%);
          pointer-events: none;
        }
        .trippy-footer__inner {
          z-index: 1;
        }
        .trippy-footer__logo-img {
          max-width: 180px;
          height: auto;
        }
        @media (min-width: 992px) {
          .trippy-footer__logo-img {
            max-width: 200px;
          }
        }
        .trippy-footer__desc {
          max-width: 26rem;
        }
        @media (min-width: 992px) {
          .trippy-footer__desc {
            max-width: 32rem;
          }
        }
        .trippy-footer__contact-title {
          color: #f0e6b8 !important;
          letter-spacing: 0.2em;
          font-weight: 600;
        }
        .trippy-footer__link--break {
          word-break: break-word;
        }
        .trippy-footer__tagline {
          color: #f0e6b8 !important;
          letter-spacing: 0.06em;
        }
        .trippy-footer__muted {
          color: var(--tf-muted) !important;
        }
        .trippy-footer__icon {
          color: rgba(212, 175, 55, 0.75);
        }
        .trippy-footer__link {
          color: #e8d5a3 !important;
          font-weight: 600;
        }
        .trippy-footer__link:hover {
          color: #f6e4ba !important;
        }
        .trippy-footer__logo-link:hover img {
          filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.35));
        }
        .trippy-footer__hr {
          margin: 2rem 0 0;
          border: 0;
          border-top: 1px dotted rgba(212, 175, 55, 0.42);
          opacity: 1;
        }
      `}</style>
    </footer>
  )
}

export default FooterWithLinks
