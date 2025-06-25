import { Col, Container, Row } from 'react-bootstrap'
import { FaTicketAlt, FaShuttleVan, FaConciergeBell, FaHeadset } from 'react-icons/fa'

import bgImg5 from '@/assets/newImage/heroSection//pic3.jpg'
// import avatar1 from '@/assets/images/avatar/01.jpg'
// import avatar2 from '@/assets/images/avatar/02.jpg'
// import avatar3 from '@/assets/images/avatar/03.jpg'
// import avatar4 from '@/assets/images/avatar/04.jpg'
// import element1 from '@/assets/images/element/01.svg'

const FeaturedHoliday = () => {
  return (
    <section className="pb-0 pb-xl-5">
      <Container>
        <Row className="g-4 justify-content-between align-items-center">
          <Col lg={5} className="position-relative">
            <figure className="position-absolute top-0 start-0 translate-middle z-index-1 ms-4">
              <svg className="fill-primary" width="77px" height="77px">
                <path d="M76.997,41.258 L45.173,41.258 L67.676,63.760 L63.763,67.673 L41.261,45.171 L41.261,76.994 L35.728,76.994 L35.728,45.171 L13.226,67.673 L9.313,63.760 L31.816,41.258 L-0.007,41.258 L-0.007,35.725 L31.816,35.725 L9.313,13.223 L13.226,9.311 L35.728,31.813 L35.728,-0.010 L41.261,-0.010 L41.261,31.813 L63.763,9.311 L67.676,13.223 L45.174,35.725 L76.997,35.725 L76.997,41.258 Z" />
              </svg>
            </figure>


            <img src={bgImg5} className="rounded-3 position-relative" style={{ maxHeight: '550px', width: '100%', objectFit: 'cover' }} />


            {/* <div className="position-absolute bottom-0 start-0 z-index-1 mb-4 ms-5">
              <div className="bg-body d-flex d-inline-block rounded-3 position-relative p-3">
                <img src={element1} className="position-absolute top-0 start-0 translate-middle w-40px" />

                <div className="me-4">
                  <h6 className="fw-light">Client</h6>

                  <ul className="avatar-group mb-0">
                    <li className="avatar avatar-sm">
                      <img className="avatar-img rounded-circle" src={avatar1} alt="avatar" />
                    </li>
                    <li className="avatar avatar-sm">
                      <img className="avatar-img rounded-circle" src={avatar2} alt="avatar" />
                    </li>
                    <li className="avatar avatar-sm">
                      <img className="avatar-img rounded-circle" src={avatar3} alt="avatar" />
                    </li>
                    <li className="avatar avatar-sm">
                      <img className="avatar-img rounded-circle" src={avatar4} alt="avatar" />
                    </li>
                    <li className="avatar avatar-sm">
                      <div className="avatar-img rounded-circle bg-primary">
                        <span className="text-white position-absolute top-50 start-50 translate-middle small">1K+</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h6 className="fw-light mb-3">Rating</h6>
                  <h6 className="m-0 d-flex">
                    4.5
                    <FaStar size={18} className="text-warning ms-1" />
                  </h6>
                </div>
              </div>
            </div> */}
          </Col>

          <Col lg={6}>
            <h2 className="mb-3 mb-lg-5 text-center text-lg-start">Why Choose Us?</h2>
            <p className="mb-3 mb-lg-5 text-center text-lg-start">
              Elevate your event experience with zeko.com — from quick ticketing to food deals and smooth rides, we make your concerts unforgettable!
            </p>

            <Row className="g-4">
              <Col sm={6} className="text-center text-sm-start">
                <div className="icon-lg bg-success bg-opacity-10 text-success rounded-circle flex-centered mx-auto mx-sm-0">
                  <FaTicketAlt />
                </div>
                <h5 className="mt-2">Easy Ticket Booking</h5>
                <p className="mb-0">Book your concert tickets quickly and easily with just a few clicks.</p>
              </Col>

              <Col sm={6} className="text-center text-sm-start">
                <div className="icon-lg bg-danger bg-opacity-10 text-danger rounded-circle flex-centered mx-auto mx-sm-0">
                  <FaShuttleVan />
                </div>
                <h5 className="mt-2">Transport to Your Event</h5>
                <p className="mb-0">Get convenient shuttle rides and transport options to venues.</p>
              </Col>

              <Col sm={6} className="text-center text-sm-start">
                <div className="icon-lg bg-warning bg-opacity-10 text-warning rounded-circle flex-centered mx-auto mx-sm-0">
                  <FaConciergeBell />
                </div>
                <h5 className="mt-2">Food & Drink Coupons</h5>
                <p className="mb-0">Enjoy exclusive discounts on food and beverages at the event.</p>
              </Col>

              <Col sm={6} className="text-center text-sm-start mb-5">
                <div className="icon-lg bg-info bg-opacity-10 text-info rounded-circle flex-centered mx-auto mx-sm-0">
                  <FaHeadset />
                </div>
                <h5 className="mt-2">24 / 7 Support</h5>
                <p className="mb-0">Our support team is here round-the-clock to help you anytime.</p>
              </Col>
            </Row>
          </Col>

        </Row>
      </Container>
    </section>
  )
}

export default FeaturedHoliday
