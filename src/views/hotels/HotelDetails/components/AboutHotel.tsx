import {Col, Container, Row, } from 'react-bootstrap'
import HotelPolicies from './HotelPolicies'

const AboutHotel = () => {
  return (
    <section className="pt-0">
      <Container data-sticky-container>
        <Row className="g-4 g-xl-5">
          <Col xl={7} className="order-1">
            <div className="vstack gap-5">

              <HotelPolicies />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AboutHotel
