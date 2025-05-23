import { TinySlider } from '@/components'
import { currency, useLayoutContext } from '@/states'
import { Fragment } from 'react'
import { Button, Card, CardBody, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Image, Row } from 'react-bootstrap'
import { renderToString } from 'react-dom/server'
import { BsArrowLeft, BsArrowRight, BsGeoAlt, BsPatchCheckFill } from 'react-icons/bs'
import { FaFacebookSquare, FaLinkedin, FaShareAlt, FaTwitterSquare } from 'react-icons/fa'
import { FaCopy} from 'react-icons/fa6'
import { type TinySliderSettings } from 'tiny-slider'
import { type HotelsListType } from '../data'
import 'tiny-slider/dist/tiny-slider.css'
import { Link } from 'react-router-dom'

const HotelListCard = ({ hotel }: { hotel: HotelsListType }) => {
  const { address, features, images, name, price, sale, schemes } = hotel

  const { dir } = useLayoutContext()

  const listSliderSettings: TinySliderSettings = {
    nested: 'inner',
    autoplay: false,
    controls: true,
    autoplayButton: false,
    autoplayButtonOutput: false,
    controlsText: [renderToString(<BsArrowLeft size={16} />), renderToString(<BsArrowRight size={16} />)],
    arrowKeys: true,
    items: 1,
    autoplayDirection: dir === 'ltr' ? 'forward' : 'backward',
    nav: false,
  }

  return (
    <Card className="shadow p-2">
      <Row className="g-0">
        <Col md={5} className="position-relative">
          {sale && (
            <div className="position-absolute top-0 start-0 z-index-1 m-2">
              <div className="badge text-bg-danger">{sale}</div>
            </div>
          )}

          <div className="tiny-slider arrow-round arrow-xs arrow-dark overflow-hidden rounded-2">
            <TinySlider settings={listSliderSettings}>
              {images.map((image, idx) => (
                <div key={idx}>
                  <Image 
                    src={image} 
                    alt="Card image" 
                    style={{ width: '100%', height: '280px', objectFit: 'cover' }} 
                    className="rounded-2 w-100"
                  />

                </div>
              ))}
            </TinySlider>
          </div>
        </Col>
        <Col md={7}>
          <CardBody className="py-md-2 d-flex flex-column h-100 position-relative">
            <div className="d-flex justify-content-between align-items-center">
              <ul className="list-inline mb-1">
                
                
              
              </ul>
              <ul className="list-inline mb-0 z-index-2">
                
                <Dropdown className="list-inline-item dropdown">
                  <DropdownToggle
                    className="arrow-none btn btn-sm btn-light btn-round"
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
            <small className="items-center mb-2">
              <BsGeoAlt className="me-2" />
              {address}
            </small>
            
            <h5 className="card-title mb-1">
              <Link to="/hotels/detail">{name}</Link>
            </h5>
            
            <ul className="nav nav-divider mt-3">
              {features.map((feature, idx) => (
                <li key={idx} className="nav-item">
                  {feature}
                </li>
              ))}
            </ul>
            <ul className="list-group list-group-borderless small mb-0 mt-2">
              {schemes ? (
                <Fragment>
                  {schemes.map((scheme, idx) => {
                    return (
                      <li key={idx} className="list-group-item d-flex text-success p-0 items-center">
                        <BsPatchCheckFill className="me-2" />
                        {scheme}
                      </li>
                    )
                  })}
                </Fragment>
              ) : (
                <li className="list-group-item d-flex text-danger p-0 items-center">
                  <BsPatchCheckFill className="me-2" />
                  Non Refundable
                </li>
              )}
            </ul>
            <div className="d-sm-flex justify-content-sm-between align-items-center mt-3 mt-md-auto">
              <div className="d-flex align-items-center">
               <h6 className="fw-semibold mb-0 me-2">
                  As from {currency}
                  {price}
                </h6>

                
                {sale && <span className="text-decoration-line-through mb-0">{currency}1000</span>}
              </div>
              <div className="mt-3 mt-sm-0">
                <Button variant="dark" size="sm" className="mb-0 w-100">
                  Book
                </Button>
              </div>
            </div>
          </CardBody>
        </Col>
      </Row>
    </Card>
  )
}

export default HotelListCard
