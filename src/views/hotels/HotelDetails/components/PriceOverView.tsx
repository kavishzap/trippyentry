import { currency } from '@/states'
import { Button, Card, CardBody, Col, Image, Row } from 'react-bootstrap'
import { BsArrowRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Sticky from 'react-sticky-el'
import { useViewPort } from '@/hooks'

import offerImg4 from '@/assets/images/offer/04.jpg'

const PriceOverView = () => {

  const { width } = useViewPort()

  return (
    <Sticky
      disabled={width <= 1199}
      topOffset={100}
      bottomOffset={0}
      boundaryElement="aside"
      hideOnBoundaryHit={false}
      stickyStyle={{ transition: '0.2s all linear' }}>
      <Card
      as={CardBody}
      className="border text-center mx-auto"
      style={{ maxWidth: '320px' }} // Adjust width here
    >
      <div className="mb-3">
        <span>Ticket Price Only</span>
        <h4 className="card-title mb-0">{currency}50</h4>
      </div>

      {/* Stack rating + stars and free breakfast info */}
      <div className="mb-3">
        
        <div className="d-flex">
          <BsArrowRight className="me-2" />
          <span className="h6 fw-light">Menu Coupons available</span>
        </div>

        <div className="d-flex">
          <BsArrowRight className="me-2" />
          <span className="h6 fw-light">Transport Facilities</span>
        </div>
      </div>

      <div className="d-grid justify-content-center">
        <Button
          variant="primary-soft"
          size="lg"
          className="mb-0"
          style={{ width: '100px' }}
        >
          Book
        </Button>
      </div>
    </Card>


      <div className="mt-4 d-none d-xl-block">
      <h4>Our Next Event</h4>
      <Card className="shadow rounded-3 overflow-hidden">
        <Row className="g-0 align-items-center">
          <Col sm={6} md={12} lg={6}>
            <Image src={offerImg4} className="card-img rounded-0" />
          </Col>
          <Col sm={6} md={12} lg={6}>
            <CardBody className="p-3">
              <h6 className="card-title">
                <Link to="/event-details" className="stretched-link">
                  Summer Gala Night
                </Link>
              </h6>
              <p className="mb-0">Join us on July 15th for an evening of live music, fine dining, and unforgettable vibes!</p>
            </CardBody>
          </Col>
        </Row>
      </Card>
    </div>

    </Sticky>
  )
}

export default PriceOverView
