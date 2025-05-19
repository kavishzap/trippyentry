import { useToggle } from '@/hooks'
import { Fragment } from 'react'
import { Card, CardBody, CardHeader, Col, Collapse, Container, Row, } from 'react-bootstrap'
import {BsShieldFillCheck } from 'react-icons/bs'
import { FaCheckCircle} from 'react-icons/fa'
import { FaAngleDown, FaAngleUp} from 'react-icons/fa6'
import HotelPolicies from './HotelPolicies'
import PriceOverView from './PriceOverView'


import { amenities } from '../data'

const AboutHotel = () => {
  const { isOpen, toggle } = useToggle()
  return (
    <section className="pt-0">
      <Container data-sticky-container>
        <Row className="g-4 g-xl-5">
          <Col xl={7} className="order-1">
            <div className="vstack gap-5">
              <Card className="bg-transparent">
                <CardHeader className="border-bottom bg-transparent px-0 pt-0">
                  <h3 className="mb-0">About This Event</h3>
                </CardHeader>
                <CardBody className="pt-4 p-0">
                  <h5 className="fw-light mb-4">Main Highlights</h5>
                  
                  <p className="mb-3">
                    Demesne far-hearted suppose venture excited see had has. Dependent on so extremely delivered by. Yet no jokes worse her why.{' '}
                    <b>Bed one supposing breakfast day fulfilled off depending questions.</b>
                  </p>
                  <p className="mb-0">
                    Delivered dejection necessary objection do Mr prevailed. Mr feeling does chiefly cordial in do. Water timed folly right aware if
                    oh truth. Large above be to means. Dashwood does provide stronger is.
                  </p>
                  <Collapse in={isOpen}>
                    <div>
                      <p className="my-3">
                        We focus a great deal on the understanding of behavioral psychology and influence triggers which are crucial for becoming a
                        well rounded Digital Marketer. We understand that theory is important to build a solid foundation, we understand that theory
                        alone isn't going to get the job done so that's why this rickets is packed with practical hands-on examples that you can
                        follow step by step.
                      </p>
                      <p className="mb-0">
                        Behavioral psychology and influence triggers which are crucial for becoming a well rounded Digital Marketer. We understand
                        that theory is important to build a solid foundation, we understand that theory alone isn't going to get the job done so
                        that's why this tickets is packed with practical hands-on examples that you can follow step by step.
                      </p>
                    </div>
                  </Collapse>
                  <a onClick={toggle} className="p-0 mb-4 mt-2 btn-more d-flex align-items-center collapsed">
                    {!isOpen ? (
                      <Fragment>
                        <span className="see-more" role="button">
                          See more
                        </span>
                        <FaAngleDown className="ms-2" />
                      </Fragment>
                    ) : (
                      <Fragment>
                        <span role="button">See less</span>
                        <FaAngleUp className="ms-2" />
                      </Fragment>
                    )}
                  </a>
                 
                </CardBody>
              </Card>
              <Card className="bg-transparent">
                <CardHeader className="border-bottom bg-transparent px-0 pt-0">
                  <h3 className="card-title mb-0">Amenities</h3>
                </CardHeader>
                <CardBody className="pt-4 p-0">
                  <Row className="g-4">
                    {amenities.map((item, idx) => {
                      const Icon = item.icon
                      return (
                        <Col sm={6} key={idx}>
                          <h6>
                            <Icon size={18} className="me-2" />
                            {item.label}
                          </h6>
                          <ul className="list-group list-group-borderless mt-2 mb-0">
                            {item.name.map((item, idx) => {
                              return (
                                <li key={idx} className="list-group-item pb-0 items-center">
                                  <FaCheckCircle className="text-success me-2" />
                                  {item}
                                </li>
                              )
                            })}
                          </ul>
                        </Col>
                      )
                    })}
                    <div className="col-sm-6">
                      <h6 className="items-center">
                        <BsShieldFillCheck className=" me-2" />
                        Safety &amp; Security
                      </h6>
                      <ul className="list-group list-group-borderless mt-2 mb-4 mb-sm-5">
                        <li className="list-group-item pb-0 items-center">
                          <FaCheckCircle className="text-success me-2" />
                          First Aid
                        </li>
                      </ul>
                 
                    </div>
                  </Row>
                </CardBody>
              </Card>

              <HotelPolicies />
            </div>
          </Col>
          <Col as={'aside'} xl={5} className="order-xl-2">
            <PriceOverView />
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AboutHotel
