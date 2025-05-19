import { Card, Col, Container, Row } from 'react-bootstrap'
import { BsGeoAlt } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs';
import { featuredConcertsData } from '../data'

const FeaturedHotels = () => {
  return (
    <section>
      <Container>
        <Row className="mb-4">
          <Col xs={12} className="text-center">
            <h2 className="mb-0">Featured Events</h2>
          </Col>
        </Row>
        <Row className="gx-3 gy-3 gy-md-4">
          {(featuredConcertsData ?? []).map((hotel, idx) => (
            <Col key={hotel.title + idx} sm={6} xl={3}>
              <Card className="card-img-scale overflow-hidden bg-transparent h-100 mb-0">
                <div className="card-img-scale-wrapper rounded-3" style={{ height: '350px', overflow: 'hidden' }}>
                  <img
                    src={hotel.image}
                    className="card-img"
                    alt="concert image"
                    style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                  />
                  <div className="position-absolute bottom-0 start-0 p-3">
                    <div className="badge text-bg-dark fs-6 rounded-pill stretched-link d-flex">
                      <BsGeoAlt className="me-2" />
                      {hotel.location}
                    </div>
                  </div>
                </div>

                <div className="card-img-scale-wrapper">
                  <h5 className="card-title mt-3">
                    <Link to="/concerts/detail" className="stretched-link">
                      {hotel.title}
                    </Link>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <h6 className="text-primary mb-0">
                        <small className="fw-light">Starting at</small> Rs {hotel.price}
                      </h6>
                      <button className="btn btn-sm btn-outline-primary"><BsArrowRight /></button>
                    </div>
                  </h5>
                </div>
              </Card>

            </Col>
          ))}
        </Row>
        <Container className="position-relative mt-5">
          <div className="bg-light rounded-3 position-relative p-4 p-sm-5">
            <figure className="position-absolute top-50 start-50 d-none d-lg-block translate-middle">
              <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-25">
                <defs>
                  <radialGradient id="lightGlow" cx="0.5" cy="0.5" r="0.6">
                    <stop offset="0%" stopColor="#00f2fe" />
                    <stop offset="100%" stopColor="#4facfe" />
                  </radialGradient>
                </defs>
                <circle cx="70" cy="70" r="60" fill="url(#lightGlow)" />

                <path d="M40 70 L40 50 M50 70 L50 40 M60 70 L60 60 M70 70 L70 30 M80 70 L80 60 M90 70 L90 50 M100 70 L100 40" stroke="white" strokeWidth="4" strokeLinecap="round" />

                <circle cx="70" cy="85" r="6" fill="white" />
                <rect x="67" y="85" width="6" height="20" rx="2" fill="white" />
              </svg>
            </figure>

            <Row className="align-items-center position-relative">
              <Col lg={8}>
                <div className="d-flex">
                  <h3>It's time to enjoy 🎉</h3>
                </div>
                <p className="mb-3 mb-lg-0">
                  Ready for an unforgettable night? We bring you the hottest concerts and live shows across Mauritius — all tailored to your vibe and budget!
                </p>
              </Col>
              <Col lg={4} className="text-lg-end">
                <Link to="/" className="btn btn-lg btn-dark mb-0">
                  View More events...
                </Link>
              </Col>
            </Row>
          </div>
        </Container>
      </Container>
    </section>
  )
}

export default FeaturedHotels
