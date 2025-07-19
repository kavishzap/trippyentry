import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { BsEnvelope, BsGlobe2, BsHeadset, BsInboxesFill, BsPhone } from 'react-icons/bs'
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="pt-4 pt-md-5 mb-5">
      <Container>
        <Row className="mb-5">
          <Col xl={10}>
            <h1>Let's connect and get to know each other</h1>
            <p className="lead mb-0">
              Whether you’ve got questions about an event, need help with your ticket, or just want to say hi—we’re here for you.
              Reach out anytime and let’s make your experience unforgettable!
            </p>
          </Col>
        </Row>
        <Row className="g-4">
          <Col md={6} xl={4}>
            <Card className="card-body shadow text-center align-items-center">
              <div className="icon-lg bg-info bg-opacity-10 text-info rounded-circle mb-2 flex-centered">
                <BsHeadset className=" fs-5" />
              </div>
              <h5>Call us</h5>

              <div className="d-grid gap-3 d-sm-block">
                <Button size="sm" variant="primary-soft me-1">
                  <div className="d-flex align-items-center">
                    {' '}
                    <BsPhone className=" me-2" />
                    +230 5839 3719
                  </div>
                </Button>
                <Button variant="light" size="sm">
                  <BsPhone className=" me-2" />
                  +230 5918 2520
                </Button>
              </div>
            </Card>
          </Col>
          <Col md={6} xl={4}>
            <Card className="card-body shadow text-center align-items-center">
              <div className="icon-lg bg-danger bg-opacity-10 text-danger rounded-circle mb-2 flex-centered">
                <BsInboxesFill className=" fs-5" />
              </div>
              <h5>Email us</h5>

              <Link to="mailto:example@gmail.com" className="btn btn-link text-decoration-underline p-0 mb-0 items-center">
                <BsEnvelope className=" me-1" />
                zeko.mru@gmail.com
              </Link>
            </Card>
          </Col>
          <Col xl={4} className="position-relative">
            <figure className="position-absolute top-0 end-0 z-index-1 mt-n4 ms-n7">
              <svg className="fill-warning" width="77px" height="77px">
                <path d="M76.997,41.258 L45.173,41.258 L67.676,63.760 L63.763,67.673 L41.261,45.171 L41.261,76.994 L35.728,76.994 L35.728,45.171 L13.226,67.673 L9.313,63.760 L31.816,41.258 L-0.007,41.258 L-0.007,35.725 L31.816,35.725 L9.313,13.223 L13.226,9.311 L35.728,31.813 L35.728,-0.010 L41.261,-0.010 L41.261,31.813 L63.763,9.311 L67.676,13.223 L45.174,35.725 L76.997,35.725 L76.997,41.258 Z" />
              </svg>
            </figure>
            <Card className="card-body shadow text-center align-items-center">
              <div className="icon-lg bg-orange bg-opacity-10 text-orange rounded-circle mb-2 flex-centered">
                <BsGlobe2 className=" fs-5" />
              </div>
              <h5>Social media</h5>

              <ul className="list-inline mb-0 items-center d-flex gap-2">
                <li className="list-inline-item">
                  <Link
                    className="btn btn-sm bg-instagram p-2 mb-0 flex-centered text-white"
                    to="https://www.instagram.com/zekomru/"
                    target="_blank"
                  >
                    <FaInstagram />
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link
                    className="btn btn-sm bg-primary p-2 mb-0 flex-centered text-white"
                    to="https://www.facebook.com/share/1C33xLMwhG/?mibextid=wwXIfr"
                    target="_blank"
                  >
                    <FaFacebook />
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link
                    className="btn btn-sm bg-dark p-2 mb-0 flex-centered text-white"
                    to="https://www.tiktok.com/@zekomru"
                    target="_blank"
                  >
                    <FaTiktok />
                  </Link>
                </li>
              </ul>

            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Hero
