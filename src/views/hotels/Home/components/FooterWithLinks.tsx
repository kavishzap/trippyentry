import { BsEnvelope, BsTelephone } from 'react-icons/bs'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logoLight from '@/assets/newImage/heroSection/ZEKO_LOGO_WHITE-11-10-11-removebg-preview (1) 1.png'
import logoWhite from '@/assets/LOGO_WHITE.png'
import logoBlack from '@/assets/LOGO_BLACK.png'
import { currentYear } from '@/states'

const FooterWithLinks = () => {
  return (
    <footer className="bg-dark text-light">
      <Container>
        <Row className="g-5 text-center justify-content-center">
          {/* Logo & Contact */}
          <Col xs={12} md={6} lg={4}>
            <Link to="/">
              <img className="mb-3 mt-5" src={logoLight} alt="zeko Logo" style={{ maxHeight: '30px' }} />
            </Link>
            <p className="text-secondary small">
              Stay in the loop with the latest concert updates, special announcements, and exclusive offers. Be the first to know — subscribe now and never miss a beat!
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
              <div className="mb-2">
                © {currentYear} zekomru.com. All rights reserved.
              </div>
              <div className="mt-2">
                <div className="text-secondary mb-2">Powered by</div>
                <div style={{ position: 'relative', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Image 
                    src={logoWhite} 
                    alt="Powered by logo" 
                    className="dark-mode-item" 
                    style={{ 
                      height: '60px', 
                      width: 'auto',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                  <Image 
                    src={logoBlack} 
                    alt="Powered by logo" 
                    className="light-mode-item" 
                    style={{ 
                      height: '60px', 
                      width: 'auto',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>

      </Container>
    </footer>
  )
}

export default FooterWithLinks
