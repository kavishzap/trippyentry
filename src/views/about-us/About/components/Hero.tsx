import { Col, Container, Image, Row } from 'react-bootstrap'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import element6 from '@/assets/images/element/06.svg'
import element7 from '@/assets/images/element/07.svg'
import element8 from '@/assets/images/element/08.svg'
import poster1 from '@/assets/newImage/heroSection/WhatsApp Image 2025-06-25 at 09.53.11_639e5b43.jpg'
import poster4 from '@/assets/newImage/heroSection/YF_artwork 1.png'
import poster6 from '@/assets/newImage/heroSection/bob.png'

const posters = [
  { id: 1, src: poster1 },
  { id: 2, src: poster6 },
  { id: 3, src: poster4 },
]

const Hero = () => {
  const [order, setOrder] = useState(posters)

  useEffect(() => {
    const interval = setInterval(() => {
      setOrder((prev) => [prev[2], prev[0], prev[1]])
    }, 2500)

    return () => clearInterval(interval)
  }, [])
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



        {/* Posters with Framer Motion */}
        <Row className="justify-content-center mt-8">
          <Col md={10} className="position-relative">
            <div className="image-carousel-static">
              <AnimatePresence>
                {order.map((poster, index) => (
                  <motion.img
                    key={poster.id}
                    src={poster.src}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: index === 1 ? 1.1 : 0.9,
                      rotate: index === 0 ? -6 : index === 2 ? 6 : 0,
                      x: index === 0 ? -180 : index === 2 ? 180 : 0,
                      zIndex: index === 1 ? 3 : 1,
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.6 }}
                    className="carousel-img"
                  />
                ))}
              </AnimatePresence>
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
