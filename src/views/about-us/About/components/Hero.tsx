import { Col, Container, Image, Row } from 'react-bootstrap'

import element6 from '@/assets/images/element/06.svg'
import element7 from '@/assets/images/element/07.svg'
import element8 from '@/assets/images/element/08.svg'
import poster1 from '@/assets/images/about/Poster1.jpeg'
import poster2 from '@/assets/images/about/Poster2.jpeg'
import poster3 from '@/assets/images/about/Poster3.jpeg'


const Hero = () => {
  return (
    <section className="position-relative py-5">
      <Container>
        <Row className="mb-5">
          <Col xl={10} className="mx-auto text-center">
            <h1>Experience the Magic of Live Music — We'll Get You There</h1>
            <p className="lead">
              From VIP to last-minute deals, we help fans catch the biggest concerts, festivals, and live shows. Your next unforgettable night starts here.
            </p>
            <div className="hstack gap-3 flex-wrap justify-content-center">
              <h6 className="bg-mode shadow rounded-2 fw-normal py-2 px-4 items-center gap-1">
                <Image src={element6} className="h-20px me-2" />
                Global Customers
              </h6>
              <h6 className="bg-mode shadow rounded-2 fw-normal py-2 px-4 items-center gap-1">
                <Image src={element7} className="h-20px me-2" />
                Happy Customers
              </h6>
              <h6 className="bg-mode shadow rounded-2 fw-normal py-2 px-4 items-center gap-1">
                <Image src={element8} className="h-20px me-2" />
                Subscribers
              </h6>
            </div>
          </Col>
        </Row>

    

        <Row className="justify-content-center">
          <Col md={10} className="position-relative">
            <div className="image-carousel-static">
              <Image src={poster1} className="carousel-img back left" />
              <Image src={poster2} className="carousel-img back right" />
              <Image src={poster3} className="carousel-img front" />
            </div>
          </Col>
        </Row>
      </Container>

     
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .image-carousel-static {
              position: relative;
              margin-top: 200px;
              width: 100%;
              height: auto;
              display: flex;
              justify-content: center;
              align-items: center;
              padding-top: 2rem;
              padding-bottom: 2rem;
            }

            .carousel-img {
              position: absolute;
              border-radius: 1rem;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
              transition: transform 0.3s ease;
              max-width: 250px;
              height: auto;
            }

            .carousel-img.front {
              z-index: 3;
              transform: scale(1.2);
            }

            .carousel-img.back {
              z-index: 1;
              opacity: 0.8;
            }

            .carousel-img.left {
              transform: rotate(-8deg) translateX(-180px);
            }

            .carousel-img.right {
              transform: rotate(8deg) translateX(180px);
            }

            @media (max-width: 768px) {
              .carousel-img {
                max-width: 180px;
              }

              .carousel-img.left {
                transform: rotate(-5deg) translateX(-100px);
              }

              .carousel-img.right {
                transform: rotate(5deg) translateX(100px);
              }

              .carousel-img.front {
                transform: scale(1.05);
              }
            }
          `
        }}
      />
    </section>
  )
}

export default Hero
