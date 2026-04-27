import { BsEnvelope, BsTelephone } from 'react-icons/bs'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { currentYear } from '@/states'

const FooterWithLinks = () => {
  return (
    <footer className="trippy-footer bg-dark text-light position-relative overflow-hidden">
      <div className="trippy-footer__grid" aria-hidden />
      <Container className="position-relative" style={{ zIndex: 1 }}>
        <Row className="g-5 text-center justify-content-center">
          {/* Logo & Contact */}
          <Col xs={12} md={6} lg={4}>
            <Link to="/">
              <img className="mb-3 mt-5" src="/logo.png" alt="logo" style={{ maxHeight: '30px' }} />
            </Link>
            <p className="text-light small fw-semibold mb-2">Never Miss the Drop</p>
            <p className="text-secondary small mb-3">
              Be first to hear about new raves, secret events, and exclusive offers. Stay plugged into the night.
            </p>
            <p className="mb-2 d-flex justify-content-center align-items-center text-secondary small">
              <BsTelephone className="me-2" />
              <Link to="tel:+23055063356" className="text-light text-decoration-none">+230 5506 3356</Link>
            </p>
            <p className="mb-0 d-flex justify-content-center align-items-center text-secondary small">
              <BsEnvelope className="me-2" />
              <Link to="mailto:zeko.mru@gmail.com" className="text-light text-decoration-none">zeko.mru@gmail.com</Link>
            </p>
          </Col>
        </Row>

        {/* Footer Bottom */}
        <hr className="border-secondary" />
        <Row>
          <Col>
            <div className="d-flex flex-column align-items-center text-center text-secondary small py-3">
              <div>
                © {currentYear} trippyentry.com. All rights reserved.
              </div>
            </div>
          </Col>
        </Row>

      </Container>

      <style>{`
        .trippy-footer__grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(46, 242, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 46, 230, 0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: linear-gradient(180deg, black 0%, transparent 85%);
          pointer-events: none;
        }
      `}</style>
    </footer>
  )
}

export default FooterWithLinks
