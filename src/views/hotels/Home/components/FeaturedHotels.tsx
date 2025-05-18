import { Card, Col, Container, Row } from 'react-bootstrap'
import { BsGeoAlt } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import { featuredConcertsData } from '../data'

const FeaturedHotels = () => {
  return (
    <section>
      <Container>
        <Row className="mb-4">
          <Col xs={12} className="text-center">
            <h2 className="mb-0">Featured Hotels</h2>
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
                      <h6 className="text-success mb-0">
                        <small className="fw-light">Starting at</small> Rs {hotel.price}
                      </h6>
                      <button className="btn btn-sm btn-outline-primary">View</button>
                    </div>
                  </h5>
                </div>
              </Card>

            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default FeaturedHotels
