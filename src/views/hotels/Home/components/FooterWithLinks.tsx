import { BsEnvelope, BsTelephone } from 'react-icons/bs'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logoLight from '@/assets/newImage/heroSection/ZEKO_LOGO_WHITE-11-10-11-removebg-preview (1) 1.png'
import { currentYear } from '@/states'

const FooterWithLinks = () => {
  return (
    <footer className="bg-dark text-light">
      <Container>
        <Row className="g-5 text-center justify-content-center mt-5">
          {/* Logo & Contact */}
          <Col xs={12} md={6} lg={4}>
            <Link to="/">
              <img className="mb-3" src={logoLight} alt="zeko Logo" style={{ maxHeight: '30px' }} />
            </Link>
            <p className="text-secondary small">
              Stay in the loop with the latest concert updates, special announcements, and exclusive offers. Be the first to know — subscribe now and never miss a beat!
            </p>
            <p className="mb-2 d-flex justify-content-center align-items-center text-secondary small">
              <BsTelephone className="me-2" />
              <Link to="tel:+23059182520" className="text-light text-decoration-none">+230 5918 2520</Link>
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
            <div className="d-flex justify-content-center text-center text-secondary small py-3">
              © {currentYear} zekomru.com. All rights reserved.
            </div>
          </Col>
        </Row>

      </Container>
    </footer>
  )
}

export default FooterWithLinks
