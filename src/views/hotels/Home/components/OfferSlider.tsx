import { TinySlider } from '@/components'
import { useLayoutContext } from '@/states'
import { Card, CardBody, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { type TinySliderSettings } from 'tiny-slider'
import { renderToString } from 'react-dom/server'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

import offer1 from '@/assets/newImage/heroSection/20-sur-vin-shop-logo.jpg'
import offer2 from '@/assets/newImage/heroSection/mcdo.png'
import offer3 from '@/assets/images/offer/03.jpg'
import offer4 from '@/assets/images/offer/04.jpg'

import 'tiny-slider/dist/tiny-slider.css'

const OfferSlider = () => {
  const { dir } = useLayoutContext()

  const offerSliderSettings: TinySliderSettings = {
    loop: true,
    arrowKeys: true,
    autoplayButton: false,
    autoplayButtonOutput: false,
    nested: 'inner',
    controlsText: [renderToString(<BsArrowLeft size={16} />), renderToString(<BsArrowRight size={16} />)],
    autoplay: true,
    autoplayTimeout: 2500,
    controls: true,
    edgePadding: 10,
    items: 4,
    autoplayDirection: dir !== 'rtl' ? 'forward' : 'backward',
    nav: false,
    responsive: {
      1: {
        items: 2,
        gutter: 10,
      },
      768: {
        items: 3,
        gutter: 20,
      },
      992: {
        items: 4,
        gutter: 30,
      },
    },
  }


  const partners = [
    {
      name: '20/Vin',
      logo: offer1,
      link: '/offer-detail',
    },
    {
      name: "McDonald's",
      logo: offer2,
      link: '/offer-detail',
    },
    {
      name: 'TravelGo',
      logo: offer3,
      link: '/offer-detail',
    },
    {
      name: 'StaySaver',
      logo: offer4,
      link: '/offer-detail',
    },
  ]

  return (
    <section className="pb-2 pb-lg-5">
      <Container>
        <Row className="mb-4">
          <Col xs={12} className="text-center">
            <h2 className="mb-0">Our Partners</h2>
          </Col>
        </Row>
        <div className="tiny-slider arrow-round arrow-blur arrow-hover">
          <TinySlider settings={offerSliderSettings}>
            {partners.map((partner, idx) => (
              <div key={idx}>
                <Card className="border-0 text-center bg-transparent">
                  <CardBody className="d-flex flex-column align-items-center">
                    <div
                      className="rounded-circle overflow-hidden mb-3"
                      style={{
                        width: '100px',
                        height: '100px',
                        border: '2px solid #dee2e6',
                      }}
                    >
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="w-100 h-100"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <h6 className="mb-0">
                      <Link to={partner.link} className="text-dark text-decoration-none">
                        {partner.name}
                      </Link>
                    </h6>
                  </CardBody>
                </Card>
              </div>
            ))}
          </TinySlider>
        </div>
      </Container>
    </section>
  )
}

export default OfferSlider
