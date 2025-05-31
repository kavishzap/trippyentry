import { useToggle } from '@/hooks'
import { Button, Col, Container, Offcanvas, OffcanvasBody, OffcanvasHeader, Row } from 'react-bootstrap'
import { FaAngleLeft, FaAngleRight, FaSliders } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import HotelListCard from './HotelListCard'
import HotelListFilter from './HotelListFilter'

import { hotels } from '../data'

const HotelLists = () => {
  const { isOpen, toggle } = useToggle()

  return (
    <section className="pt-0 mb-6">
      <Container>
        <Row className="mb-4">
          <Col xs={12}>
         

            <div className="hstack gap-3 justify-content-between justify-content-md-end">
              <Button
                onClick={toggle}
                variant="primary-soft"
                className="btn-primary-check mb-0 d-xl-none"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasSidebar"
                aria-controls="offcanvasSidebar"
              >
                <FaSliders className="me-1" /> Show filters
              </Button>
              <ul className="nav nav-pills nav-pills-dark" id="tour-pills-tab" role="tablist">
                <li className="nav-item">
                  
                </li>
               
              </ul>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xl={4} xxl={3}>
            <div className="d-none d-xl-block">
              <HotelListFilter />
             
            </div>
            <Offcanvas
              placement="end"
              show={isOpen}
              onHide={toggle}
              className="offcanvas-xl"
              tabIndex={-1}
              id="offcanvasSidebar"
              aria-labelledby="offcanvasSidebarLabel"
            >
              <OffcanvasHeader className="offcanvas-header" closeButton>
                <h5 className="offcanvas-title" id="offcanvasSidebarLabel">
                  Advance Filters
                </h5>
              </OffcanvasHeader>
              <OffcanvasBody className="offcanvas-body flex-column p-3 p-xl-0">
                <HotelListFilter />
              </OffcanvasBody>
             
            </Offcanvas>
          </Col>
          <Col xl={8} xxl={9}>
            <div className="vstack gap-4">
              {hotels.map((hotel, idx) => (
                <HotelListCard key={idx} hotel={hotel} />
              ))}

              <nav className="d-flex justify-content-center" aria-label="navigation">
                <ul className="pagination pagination-primary-soft d-inline-block d-md-flex rounded mb-0">
                  <li className="page-item mb-0">
                    <Link className="page-link" to="" tabIndex={-1}>
                      <FaAngleLeft />
                    </Link>
                  </li>
                  <li className="page-item mb-0">
                    <Link className="page-link" to="">
                      1
                    </Link>
                  </li>
                  <li className="page-item mb-0 active">
                    <Link className="page-link" to="">
                      2
                    </Link>
                  </li>
                  <li className="page-item mb-0">
                    <Link className="page-link" to="">
                      ..
                    </Link>
                  </li>
                  <li className="page-item mb-0">
                    <Link className="page-link" to="">
                      6
                    </Link>
                  </li>
                  <li className="page-item mb-0">
                    <Link className="page-link" to="">
                      <FaAngleRight />
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default HotelLists
