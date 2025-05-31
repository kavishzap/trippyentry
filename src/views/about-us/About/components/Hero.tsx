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



        <Row className="justify-content-center mt-8">
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
        margin-top: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .carousel-img {
        width: 220px;
        height: 320px;
        border-radius: 1rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        position: absolute;
        transition: all 0.3s ease-in-out;
      }

      .carousel-img.front {
        z-index: 3;
        transform: scale(1.1);
      }

      .carousel-img.back {
        z-index: 1;
        opacity: 0.7;
      }

      .carousel-img.left {
        transform: rotate(-6deg) translateX(-150px);
      }

      .carousel-img.right {
        transform: rotate(6deg) translateX(150px);
      }

      @media (max-width: 768px) {
        .carousel-img {
          width: 150px;
          height: 220px;
        }

        .carousel-img.left {
          transform: rotate(-4deg) translateX(-80px);
        }

        .carousel-img.right {
          transform: rotate(4deg) translateX(80px);
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
