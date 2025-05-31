import { GlightBox } from '@/components'
import { useToggle } from '@/hooks'
import {Card, Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalHeader, Row } from 'react-bootstrap'
import {BsEyeFill, BsFullscreen, BsGeoAlt, BsPinMapFill} from 'react-icons/bs'
import { FaFacebookSquare, FaShareAlt, FaTwitterSquare } from 'react-icons/fa'
import { FaCopy, FaLinkedin } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import gallery14 from '@/assets/images/about/Poster1.jpeg'

const HotelGallery = () => {
  const { isOpen, toggle } = useToggle()

 

  return (
    <>
      <section className="py-0 pt-sm-5">
        <Container className="position-relative">
          <Row className="mb-3">
            <Col xs={12}>
              <div className="d-lg-flex justify-content-lg-between mb-1">
                <div className="mb-2 mb-lg-0">
                  <h1 className="fs-2">Maritime Balaclava</h1>
                  <p className="fw-bold mb-0 items-center flex-wrap">
                    <BsGeoAlt className=" me-2" />
                    5855 W Century Blvd, Los Angeles - 90045
                    <Link
                      to=""
                      onClick={toggle}
                      className="ms-3 text-decoration-underline items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#mapmodal"
                    >
                      <BsEyeFill className="me-1" />
                      View On Map
                    </Link>
                  </p>
                </div>
                <ul className="list-inline text-end">
                  <li className="list-inline-item">
                  
                  </li>
                  <Dropdown className="list-inline-item dropdown">
                    <DropdownToggle
                      className="btn btn-sm btn-light px-2 arrow-none"
                      role="button"
                      id="dropdownShare"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <FaShareAlt className="fa-fw" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-end min-w-auto shadow rounded" aria-labelledby="dropdownShare">
                      
                        <DropdownItem href="">
                          <FaTwitterSquare className="me-2" />
                          Twitter
                        </DropdownItem>
                 
                        <DropdownItem href="">
                          <FaFacebookSquare className="me-2" />
                          Facebook
                        </DropdownItem>
                   
                        <DropdownItem href="">
                          <FaLinkedin className="me-2" />
                          LinkedIn
                        </DropdownItem>
                    
                        <DropdownItem href="">
                          <FaCopy className="me-2" />
                          Copy link
                        </DropdownItem>
                  
                    </DropdownMenu>
                  </Dropdown>
                </ul>
              </div>
            </Col>
          </Row>
         
        </Container>
      </section>

      <section className="card-grid pt-0">
        <Container>
          <Row className="g-2">
            <Col md={6}>
              <GlightBox data-glightbox data-gallery="gallery" image={gallery14}>
                <Card
                  className="card-grid-lg card-element-hover card-overlay-hover overflow-hidden"
                  style={{ backgroundImage: `url(${gallery14})`, backgroundPosition: 'center left', backgroundSize: 'cover' }}
                >
                  <div className="hover-element position-absolute w-100 h-100">
                    <BsFullscreen
                      size={28}
                      className=" fs-6 text-white position-absolute top-50 start-50 translate-middle bg-dark rounded-1 p-2 lh-1"
                    />
                  </div>
                </Card>
              </GlightBox>
            </Col>
          </Row>
        </Container>
      </section>

      <Modal size="lg" centered show={isOpen} onHide={toggle} className="fade">
        <ModalHeader>
          <h5 className="modal-title" id="mapmodalLabel">
            View Our Hotel Location
          </h5>
          <button type="button" onClick={toggle} className="btn-close" />
        </ModalHeader>
        <div className="modal-body p-0">
          <iframe
            className="w-100"
            height={400}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878428698!3d40.74076684379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sin!4v1586000412513!5m2!1sen!2sin"
            style={{ border: 0 }}
            title="map"
            aria-hidden="false"
            tabIndex={0}
          />
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-sm btn-primary mb-0 items-center">
            <BsPinMapFill className="me-2" />
            View In Google Map
          </button>
        </div>
      </Modal>
    </>
  )
}

export default HotelGallery
